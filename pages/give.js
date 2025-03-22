import Layout from '../components/Layout';

export default function Give() {
  return (
    <Layout title="Give - Christ the King Anglican">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Support Our Ministry</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Give Online</h2>
      <p className="text-gray-600 mb-6">
        Your generous donations help us continue our mission. Use the PayPal button below to give securely.
      </p>
      <div className="flex justify-center">
        <form action="https://www.paypal.com/donate" method="post" target="_top">
          <input type="hidden" name="business" value="YOUR_PAYPAL_EMAIL" />
          <input type="hidden" name="currency_code" value="USD" />
          <input
            type="image"
            src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif"
            border="0"
            name="submit"
            title="PayPal - The safer, easier way to pay online!"
            alt="Donate with PayPal button"
          />
        </form>
      </div>
    </Layout>
  );
}
