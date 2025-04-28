export const metadata = {
  title: 'healthcare-patient-portal-1745799104223',
  description: 'Secure patient management system with appointment scheduling, medical records, prescription tracking, and communication features. Compliant with healthcare regulations.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}