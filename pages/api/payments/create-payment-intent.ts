import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { amount, currency = 'usd' } = req.body;
    return res.status(201).json({
      clientSecret: `pi_mock_${Date.now()}_secret_${Math.random().toString(36).substring(7)}`,
      amount: amount || 15000,
      currency,
      status: 'requires_payment_method',
    });
  }
  return res.status(405).json({ message: 'Method Not Allowed' });
}
