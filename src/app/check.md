| # | Issue | What it covers |
| --- | --- | --- |
| 1 | Exposed Secrets | `.env` only, `.gitignore`, no keys in frontend |
| 2 | Rate Limiting | Per-endpoint limits, 429 responses, recommended libs |
| 3 | Input Validation | Zod/Pydantic schemas, server-side only, parameterized queries |
| 4 | Auth & Authorization | No plain-text passwords, JWT best practices, role checks |
| 5 | SQL Injection | ORM-first, never string concat queries |
| 6 | CORS | No wildcard `*` in production |
| 7 | HTTP Security Headers | `helmet`, CSP, HSTS, clickjacking prevention |
| 8 | File Upload Safety | MIME validation, size limits, UUID renaming |
| 9 | Error Handling | No stack traces to client, structured logging |
| 10 | Dependency Security | `npm audit`, pinned versions |
| 11 | XSS Prevention | No `dangerouslySetInnerHTML`, no `eval()` |
| 12 | Deploy Checklist | Pre-deploy gate before every ship |
| 🤖 | AI/LLM Specific | Prompt injection, token budgets, server-side API keys |
|  |  |  |

> Drop this file as `CLAUDE.md` (Claude Code) or `.cursorrules` / `cursor.md` (Cursor) in your project root.
Every app generated in this project must follow these rules, no exceptions.
> 

---

## 🔐 1. SECRETS & ENVIRONMENT VARIABLES

**Never expose secrets in frontend code.**

- ALL API keys, tokens, database URLs, service credentials, and private config MUST live in `.env` files only.
- `.env` files MUST be listed in `.gitignore` — always generate a `.gitignore` that excludes `.env`, `.env.local`, `.env.*.local`.
- Frontend code (React, Vue, plain JS) must NEVER contain raw secret values. No `const API_KEY = "sk-..."` in client-side files.
- For frameworks like Next.js/Vite: only variables prefixed with `NEXT_PUBLIC_` or `VITE_` belong in the frontend, and those must NEVER be secret keys.
- Backend/server-only secrets must be accessed via `process.env.VAR_NAME` and never returned to the client in API responses.
- Generate a `.env.example` file with all required variable names but empty values, so collaborators know what's needed.
- If a secret must be used client-side (e.g., a Stripe publishable key), comment clearly that it is a **publishable/public** key intentionally exposed.

```
# ✅ Correct
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

# ❌ Wrong — never do this
const stripe = require('stripe')('sk_live_abc123...');
```

---

## 🚦 2. RATE LIMITING

**Every public-facing endpoint must have rate limiting.**

- Apply rate limiting on ALL API routes, especially auth, form submissions, AI completions, file uploads, and any expensive operation.
- Default limits (adjust per use case):
    - Auth endpoints (login, register, password reset): **5 requests / 15 minutes per IP**
    - General API: **60 requests / minute per IP**
    - AI/LLM proxy endpoints: **10 requests / minute per user**
    - File uploads: **5 requests / minute per IP**
- Use libraries appropriate to the stack:
    - Node/Express: `express-rate-limit`
    - Next.js: `next-rate-limit` or middleware with `lru-cache`
    - Python/FastAPI: `slowapi`
    - Python/Flask: `Flask-Limiter`
    - Edge/Vercel: use KV-based counters or Upstash Redis
- Return `429 Too Many Requests` with a `Retry-After` header when limits are hit.
- Never silently swallow rate limit errors on the frontend — show the user a clear message.

```jsx
// ✅ Example: Express rate limiting
import rateLimit from 'express-rate-limit';
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use('/api/', limiter);
```

---

## 🧹 3. INPUT VALIDATION & SANITIZATION

**Never trust user input. Validate and sanitize everything.**

- Validate ALL inputs on the **server side** — client-side validation is UX only, never security.
- Use schema validation libraries:
    - JS/TS: `zod`, `yup`, or `joi`
    - Python: `pydantic`
- Sanitize all string inputs before storing or displaying to prevent XSS.
- Use parameterized queries / ORM methods — NEVER interpolate user input into raw SQL or NoSQL queries.
- Validate: data type, length/size limits, allowed characters, required fields, enum values.
- For file uploads: validate MIME type, file extension, and file size server-side.
- Reject and return clear `400 Bad Request` errors for invalid input — log the attempt.

```tsx
// ✅ Example: Zod schema validation
import { z } from 'zod';
const schema = z.object({
  email: z.string().email().max(254),
  message: z.string().min(1).max(1000).trim(),
});
const result = schema.safeParse(req.body);
if (!result.success) return res.status(400).json({ error: result.error });
```

---

## 🔑 4. AUTHENTICATION & AUTHORIZATION

- Use established auth libraries — never roll your own auth from scratch.
    - Recommended: `NextAuth.js`, `Clerk`, `Supabase Auth`, `Auth0`, `Passport.js`, `lucia-auth`
- Passwords must NEVER be stored in plain text. Use `bcrypt` (min cost 12) or `argon2`.
- JWTs must be signed with a strong secret (`JWT_SECRET` from env, min 32 chars). Set short expiry (`15m`–`1h`).
- Refresh tokens must be stored securely (httpOnly cookies, not localStorage).
- Always verify the user's identity AND their permission to access the requested resource on every request (AuthN + AuthZ).
- Implement account lockout after repeated failed login attempts.
- For admin routes or sensitive operations, add an explicit role/permission check.

```tsx
// ✅ Always check ownership, not just authentication
const post = await db.post.findUnique({ where: { id } });
if (!post || post.authorId !== session.user.id) {
  return res.status(403).json({ error: 'Forbidden' });
}
```

---

## 🛡️ 5. SQL & DATABASE SECURITY

- Always use an ORM (Prisma, Drizzle, SQLAlchemy, Mongoose) or parameterized queries.
- Never construct queries via string concatenation with user data.
- Apply the principle of least privilege: DB user should only have permissions it actually needs.
- Sanitize and validate all fields before any DB write.
- Do not return raw DB errors to the client — they leak schema information.

```tsx
// ✅ Safe parameterized query
const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);

// ❌ Never do this
const user = await db.query(`SELECT * FROM users WHERE email = '${email}'`);
```

---

## 🌐 6. CORS CONFIGURATION

- Do NOT use wildcard  CORS in production.
- Explicitly whitelist only the origins that should access your API.
- Restrict allowed HTTP methods to only what each endpoint needs.

```tsx
// ✅ Explicit CORS
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN,
  methods: ['GET', 'POST'],
  credentials: true,
}));
```

---

## 🪝 7. HTTP SECURITY HEADERS

- Always set security headers. Use `helmet` (Node), `django-csp` (Django), or set manually.
- Required headers:
    - `Content-Security-Policy` — restrict script/style sources
    - `X-Frame-Options: DENY` — prevent clickjacking
    - `X-Content-Type-Options: nosniff`
    - `Strict-Transport-Security` — force HTTPS
    - `Referrer-Policy: strict-origin-when-cross-origin`
- Remove `X-Powered-By` header to avoid leaking framework info.

---

## 📤 8. FILE UPLOAD SECURITY

- Validate file type by MIME type AND extension server-side — never trust the client's claim.
- Set strict file size limits (e.g., 5MB for images, 25MB for documents).
- Store uploaded files outside the web root, or in a cloud bucket (S3, GCS, Cloudinary).
- Never serve user-uploaded files with executable permissions.
- Rename uploaded files to a UUID — never use the original filename directly.
- Scan for malware if handling sensitive or public uploads.

---

## 🚨 9. ERROR HANDLING & LOGGING

- Never return stack traces, raw error messages, or internal paths to the client in production.
- Always return generic error messages to users: `"Something went wrong"` not `"Error: Cannot read property of undefined at /src/routes/user.ts:42"`.
- Log errors server-side with context (timestamp, user ID if available, route, sanitized input).
- Use a logging service (Sentry, Datadog, Logtail) for production error tracking.
- Distinguish between `4xx` (client errors) and `5xx` (server errors) — don't use 500 for validation failures.

---

## 🔒 10. DEPENDENCY SECURITY

- Run `npm audit` / `pip-audit` / `cargo audit` after installing packages and fix high/critical issues.
- Avoid packages that are unmaintained (no updates in 2+ years for security-relevant libs).
- Pin dependency versions in production (`package-lock.json`, `requirements.txt`).
- Do not install packages with excessive permissions or suspicious install scripts without review.

---

## 🧱 11. CONTENT SECURITY POLICY (CSP) FOR FRONTEND

- Do not use `dangerouslySetInnerHTML` in React unless the content is fully sanitized with `DOMPurify`.
- Never use `eval()`, `new Function()`, or `innerHTML` with dynamic user content.
- Avoid inline `<script>` tags — move JS to external files to enable CSP enforcement.

---

## ☁️ 12. DEPLOYMENT CHECKLIST

Before every deploy, ensure:

- [ ]  `.env` is not committed to git
- [ ]  All secrets are set in the hosting platform's environment variable config
- [ ]  Debug mode / development logging is OFF in production
- [ ]  Database is not publicly exposed (use connection pooling behind a private network)
- [ ]  HTTPS is enforced (no HTTP in production)
- [ ]  Rate limiting is active on all public endpoints
- [ ]  CORS is restricted to known origins
- [ ]  Unused API routes are removed or protected

---

## 🤖 AI/LLM-SPECIFIC RULES (if this app uses AI)

- Never send raw user input directly to an LLM without sanitizing it first — prevent prompt injection.
- Always set a `max_tokens` limit on LLM calls to prevent runaway costs.
- Store the API key server-side only — route all LLM calls through your own backend, never from the browser.
- Log LLM usage (token counts) per user so you can detect abuse.
- Implement per-user or per-session token budgets to prevent cost attacks.
- Validate and sanitize LLM output before rendering it in the UI (XSS risk from generated HTML).

---

*These rules apply to every file generated in this project. When in doubt, err on the side of security over convenience.*