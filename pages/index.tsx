export interface LoanProduct {
  id: number;
  name: string;
  category: 'Personal' | 'Home' | 'Vehicle' | 'Business' | 'Student';
  rate: number;
  term: number;
  amount: number;
  description: string;
  badge: string;
  features: string[];
  image: string;
}

export interface LoanApplication {
  id: number | string;
  applicantName: string;
  email: string;
  loanType: string;
  amount: number;
  status: 'Approved' | 'Pending' | 'Rejected';
  createdAt: string;
}

export const loanProducts: LoanProduct[] = [
  {
    id: 1,
    name: 'Flex Personal Loan',
    category: 'Personal',
    rate: 9.8,
    term: 36,
    amount: 150000,
    badge: 'Most popular',
    description: 'Flexible funding for debt consolidation, home improvements, or unexpected expenses.',
    features: ['From 9.8% APR', 'Up to 36 months', 'Fast approval', 'No hidden fees'],
    image: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 2,
    name: 'HomeValue Mortgage',
    category: 'Home',
    rate: 7.4,
    term: 240,
    amount: 2500000,
    badge: 'Best rate',
    description: 'Affordable long-term financing for new homes, renovations, and property investment.',
    features: ['Competitive rates', '240-month terms', 'Property-backed security', 'Dedicated advisor'],
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 3,
    name: 'DriveNow Auto Loan',
    category: 'Vehicle',
    rate: 8.9,
    term: 72,
    amount: 450000,
    badge: 'Quick funding',
    description: 'Finance your next car or truck with transparent rates and simple monthly repayments.',
    features: ['Up to 72 months', 'New and used vehicles', 'Same-week approval', 'Optional balloon structure'],
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 4,
    name: 'Growth Business Loan',
    category: 'Business',
    rate: 11.2,
    term: 60,
    amount: 1200000,
    badge: 'For SMEs',
    description: 'Working capital and expansion financing designed for small and growing businesses.',
    features: ['Tailored for SMEs', 'Up to R1.2M', 'Flexible repayment', 'Business support team'],
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 5,
    name: 'StudyForward Education Loan',
    category: 'Student',
    rate: 6.9,
    term: 84,
    amount: 300000,
    badge: 'Student friendly',
    description: 'Support tuition, accommodation, and study essentials with a lower-cost student plan.',
    features: ['Low student rate', 'Up to 84 months', 'Grace period option', 'Flexible repayment'],
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
  },
];

export const initialApplications: LoanApplication[] = [
  {
    id: 1,
    applicantName: 'Aphiwe Mokoena',
    email: 'aphiwe.m@example.com',
    loanType: 'Flex Personal Loan',
    amount: 120000,
    status: 'Approved',
    createdAt: '2026-10-18T12:00:00Z',
  },
  {
    id: 2,
    applicantName: 'Lerato Ndlovu',
    email: 'lerato.n@example.com',
    loanType: 'HomeValue Mortgage',
    amount: 850000,
    status: 'Pending',
    createdAt: '2026-10-20T09:30:00Z',
  },
  {
    id: 3,
    applicantName: 'Thabo Khumalo',
    email: 'thabo.k@example.com',
    loanType: 'DriveNow Auto Loan',
    amount: 240000,
    status: 'Rejected',
    createdAt: '2026-10-21T08:10:00Z',
  },
];

export const initialRestaurants = loanProducts;
export type RestaurantItem = LoanProduct;
export const initialReservations = initialApplications;
export type DiningReservation = LoanApplication;

export interface HotelItem {
  id: number;
  name: string;
  location: string;
  price: number;
  rating: number;
  description: string;
  image: string;
  amenities: string[];
  reviews?: { name: string; comment: string; rating: number }[];
}

export interface BookingItem {
  id: number | string;
  customerName: string;
  email?: string;
  hotelName: string;
  hotelId?: number | string;
  date: string;
  guests?: number;
  status: 'Approved' | 'Pending' | 'Rejected';
}

export function getLoanProductsList(): LoanProduct[] {
  return [...loanProducts];
}

export function getLoanApplicationsList(): LoanApplication[] {
  return [...initialApplications];
}

export function getHotels(): HotelItem[] {
  return loanProducts.map((loan) => ({
    id: loan.id,
    name: loan.name,
    location: loan.category,
    price: loan.amount,
    rating: 4.8,
    description: loan.description,
    image: loan.image,
    amenities: loan.features,
  }));
}

export function getBookings(): BookingItem[] {
  return initialApplications.map((loan) => ({
    id: loan.id,
    customerName: loan.applicantName,
    email: loan.email,
    hotelName: loan.loanType,
    hotelId: loan.id,
    date: loan.createdAt,
    guests: 1,
    status: loan.status,
  }));
}

export function getRestaurants(): RestaurantItem[] {
  return [...loanProducts];
}

export function getReservations(): DiningReservation[] {
  return [...initialApplications];
}
