export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">Welcome to healthcare-patient-portal-1745799104223</h1>
      <p className="text-lg mb-8">Secure patient management system with appointment scheduling, medical records, prescription tracking, and communication features. Compliant with healthcare regulations.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
          <h2 className="text-xl font-bold mb-2">Documentation</h2>
          <p>Check out the documentation to get started</p>
        </div>
        <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
          <h2 className="text-xl font-bold mb-2">Examples</h2>
          <p>Explore examples to learn more</p>
        </div>
      </div>
    </main>
  )
}