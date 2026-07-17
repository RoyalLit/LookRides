'use client';

import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

const WhatsAppButton = dynamic(() => import('@/components/WhatsAppButton'), { ssr: false });
const ScrollAnimations = dynamic(() => import('@/components/ScrollAnimations'), { ssr: false });
const MobileStickyCta = dynamic(() => import('@/components/MobileStickyCta'), { ssr: false });

export default function ClientShell({ children }: { children?: ReactNode }) {
  return (
    <>
      {children}
      <WhatsAppButton />
      <ScrollAnimations />
      <MobileStickyCta />
    </>
  );
}
