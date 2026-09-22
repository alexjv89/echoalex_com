import SiteShell from '@/components/SiteShell';
import './globals.css';

export const metadata = {
  metadataBase: new URL('https://www.echoalex.com'),
  title: {
    default: 'echoalex.com',
    template: '%s | echoalex.com',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/assets/sematic/semantic.min.css" />
      </head>
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
