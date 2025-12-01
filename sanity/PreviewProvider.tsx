'use client';

import { LiveQueryProvider } from 'next-sanity/preview';
import { sanityPreviewClient } from './client';

type PreviewProviderProps = {
  children: React.ReactNode;
  token: string;
};

/**
 * PreviewProvider component that wraps content with LiveQueryProvider
 * for real-time preview updates when draft mode is enabled
 */
export function PreviewProvider({ children, token }: PreviewProviderProps) {
  if (!token) {
    return <>{children}</>;
  }

  return (
    <LiveQueryProvider
      client={sanityPreviewClient}
      logger={console}
      token={token}
    >
      {children}
    </LiveQueryProvider>
  );
}

