import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, email } = req.body;
    return res.status(201).json({
      message: 'User registered successfully',
      user: { username: username || 'user', email: email || 'user@example.com' },
    });
  }
  return res.status(405).json({ message: 'Method Not Allowed' });
}
