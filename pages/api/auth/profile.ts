import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return res.status(200).json({
      profile: {
        id: 'usr_101',
        name: 'John Doe',
        email: 'john.doe@association.org',
        membership: 'Executive Member',
        loyaltyPoints: 4500,
      },
    });
  }
  return res.status(405).json({ message: 'Method Not Allowed' });
}
