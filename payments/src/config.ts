export const Config = {
    mpesa: {
      providerName: 'Safaricom',
      simulation: true,
      callbackUrl: process.env.MPESA_CALLBACK_URL || 'http://localhost:8000/payments/callback/mpesa',
    },
    stripe: {
      providerName: 'Stripe Inc.',
      simulation: true,
      callbackUrl: 'http://localhost:3000/payments/callback/stripe',
    },
    paypal: {
      providerName: 'PayPal Holdings',
      simulation: true,
      callbackUrl: 'http://localhost:3000/payments/callback/paypal',
    },
  };
  