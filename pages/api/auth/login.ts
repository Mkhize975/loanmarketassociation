import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    return res.status(200).json({
      message: 'Login successful',
      token: 'mock_jwt_token_lma_hotel',
      user: { username: req.body?.username || 'member', role: 'admin' },
    });
  }
  return res.status(405).json({ message: 'Method Not Allowed' });
}
