import Layout from '../components/Layout';

export default function About() {
  return (
    <Layout title="About Us - Christ the King Anglican">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">About Us</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Our Mission</h2>
      <p className="text-gray-600 mb-6">
        Christ the King Anglican is a vibrant community dedicated to worship, fellowship, and service. We are part of the Anglican tradition, committed to sharing the love of Christ through our ministries, outreach, and gatherings.
      </p>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Our History</h2>
      <p className="text-gray-600 mb-6">
        Founded in 1995, our church has grown into a welcoming home for people of all ages and backgrounds. We hold weekly services, Bible studies, and community events to foster spiritual growth and connection.
      </p>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Join Us</h2>
      <p className="text-gray-600">
        We’d love to meet you! Check out our <a href="/rotas" className="text-blue-500 underline">service schedule</a> or <a href="/contact" className="text-blue-500 underline">get in touch</a> to learn more.
      </p>
    </Layout>
  );
}
