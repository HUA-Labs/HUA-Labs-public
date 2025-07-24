import { SimpleI18n } from '@hua-labs/i18n-beginner';

export default function MinimalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <SimpleI18n>
          {children}
        </SimpleI18n>
      </body>
    </html>
  );
} 