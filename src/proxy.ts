import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { pathname, searchParams } = url;

  // 1. Handle legacy tracking query parameters (e.g. ?replytocom=)
  if (searchParams.has('replytocom')) {
    searchParams.delete('replytocom');
    
    // Redirect cleanly to avoid index contamination
    // If it's the hello-world path, redirect directly to /blog
    if (pathname === '/hello-world' || pathname === '/hello-world/') {
      url.pathname = '/blog';
    }
    
    url.search = searchParams.toString();
    return NextResponse.redirect(url, 301);
  }

  // 2. Redirect legacy URLs to their modern equivalents (single hop, no redirect chains)
  const redirectsMap: Record<string, string> = {
    '/home': '/',
    '/home/': '/',
    '/index': '/',
    '/index/': '/',
    '/about-us': '/about',
    '/about-us/': '/about',
    '/our-fleet': '/fleet',
    '/our-fleet/': '/fleet',
    '/contact-us': '/contact',
    '/contact-us/': '/contact',
    '/hello-world': '/blog',
    '/hello-world/': '/blog',
  };

  if (pathname in redirectsMap) {
    url.pathname = redirectsMap[pathname];
    return NextResponse.redirect(url, 301);
  }

  // Redirect /author/* to / (homepage) in a single hop
  if (pathname.startsWith('/author/')) {
    url.pathname = '/';
    return NextResponse.redirect(url, 301);
  }

  // 3. Return a proper HTTP 410 Gone for legacy WordPress routes that have no equivalents
  const isLegacy410 = [
    /^\/category\//,
    /^\/tag\//,
    /^\/feed\/?$/,
    /^\/comments\//,
    /^\/xmlrpc\.php/,
    /^\/wp-login\.php/,
    /^\/wp-admin/,
    /^\/wp-content/,
    /^\/wp-includes/,
  ].some((regex) => regex.test(pathname));

  if (isLegacy410) {
    return new NextResponse(
      `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>410 Gone - LookRides</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; text-align: center; padding: 100px 20px; background-color: #f7f9fc; color: #333; }
            h1 { font-size: 48px; margin-bottom: 10px; color: #0b132b; }
            p { font-size: 18px; margin-bottom: 30px; color: #555; }
            a { display: inline-block; padding: 12px 24px; background-color: #0b132b; color: #fff; text-decoration: none; border-radius: 6px; font-weight: bold; }
            a:hover { background-color: #1c2541; }
          </style>
        </head>
        <body>
          <h1>410 Gone</h1>
          <p>The page you are looking for has been permanently removed.</p>
          <a href="/">Go to LookRides Homepage</a>
        </body>
      </html>`,
      {
        status: 410,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
        },
      }
    );
  }

  // 4. Admin portal authorization checks
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    let supabaseResponse = NextResponse.next({ request });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return request.cookies.getAll(); },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
            supabaseResponse = NextResponse.next({ request });
            cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options));
          },
        },
      }
    );

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = '/admin/login';
      redirectUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(redirectUrl);
    }

    // Verify the user has admin privileges
    if (user.user_metadata?.is_admin !== true) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = '/admin/login';
      return NextResponse.redirect(redirectUrl);
    }

    return supabaseResponse;
  }

  return NextResponse.next({ request });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, favicon.svg (favicon files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|favicon.svg).*)',
  ],
};
