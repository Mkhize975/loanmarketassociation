import Link from 'next/link';
import { ArrowRight, BadgeCheck, Banknote, BriefcaseBusiness, ChevronRight, HeartHandshake, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react';
import { loanProducts } from '../lib/db';

const categories = ['All', 'Personal', 'Home', 'Vehicle', 'Business', 'Student'] as const;

export default function HomePage() {
  const featured = loanProducts.slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="bg-gradient-to-r from-sky-900 via-blue-900 to-sky-700 text-white">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-white/10 p-2">
                <Banknote className="h-6 w-6" />
              </div>
              <div>
                <div className="text-lg font-bold">LoanMarket</div>
                <div className="text-xs text-sky-100">Association</div>
              </div>
            </div>
            <div className="hidden gap-6 text-sm md:flex">
              <Link href="/" className="text-sky-100 hover:text-white">Home</Link>
              <Link href="/hotels" className="text-sky-100 hover:text-white">Products</Link>
              <Link href="/bookings" className="text-sky-100 hover:text-white">Applications</Link>
            </div>
            <Link href="/hotels" className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-sky-900 hover:bg-sky-100">
              Apply now
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="bg-gradient-to-br from-slate-100 to-sky-50">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-2 md:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                <ShieldCheck className="h-3.5 w-3.5" />
                Trusted lending partner
              </div>
              <h1 className="text-4xl font-black tracking-tight text-slate-900 md:text-6xl">
                Smart loans for life’s next move.
              </h1>
              <p className="mt-6 max-w-xl text-lg text-slate-600">
                Compare loan products, manage applications, and get funding support with a clear, transparent process built around your goals.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/hotels" className="rounded-xl bg-sky-600 px-6 py-3 font-semibold text-white shadow-lg shadow-sky-200 transition hover:bg-sky-700">
                  Explore products
                </Link>
                <Link href="/bookings" className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-800 transition hover:border-slate-400 hover:bg-slate-100">
                  Track application
                </Link>
              </div>
              <div className="mt-10 flex flex-wrap gap-8 text-sm text-slate-600">
                <div>
                  <div className="text-2xl font-black text-slate-900">R2.4M</div>
                  <div>Average monthly funding</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900">4.9/5</div>
                  <div>Member satisfaction</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900">48h</div>
                  <div>Fast response time</div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-sky-100 bg-white p-6 shadow-xl shadow-sky-100">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Featured offer</p>
                  <h2 className="text-2xl font-bold">HomeValue Mortgage</h2>
                </div>
                <div className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">7.4% APR</div>
              </div>
              <div className="overflow-hidden rounded-2xl">
                <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80" alt="Home loan" className="h-64 w-full object-cover" />
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-slate-50 p-3">
                  <div className="text-xs uppercase text-slate-500">Loan amount</div>
                  <div className="mt-2 text-lg font-bold">R2.5M</div>
                </div>
                <div className="rounded-2xl bg-slate-50 p-3">
                  <div className="text-xs uppercase text-slate-500">Term</div>
                  <div className="mt-2 text-lg font-bold">20 yrs</div>
                </div>
                <div className="rounded-2xl bg-slate-50 p-3">
                  <div className="text-xs uppercase text-slate-500">Approval</div>
                  <div className="mt-2 text-lg font-bold">48h</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">Popular products</p>
              <h2 className="mt-2 text-3xl font-bold">Find the right finance solution</h2>
            </div>
            <Link href="/hotels" className="inline-flex items-center gap-2 text-sm font-semibold text-sky-700">
              View all products <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {featured.map((product) => (
              <div key={product.id} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <img src={product.image} alt={product.name} className="h-48 w-full object-cover" />
                <div className="p-6">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="rounded-full bg-sky-100 px-2.5 py-1 text-xs font-semibold text-sky-700">{product.category}</span>
                    <span className="text-xs font-medium text-emerald-600">{product.badge}</span>
                  </div>
                  <h3 className="text-xl font-bold">{product.name}</h3>
                  <div className="mt-4 flex items-end gap-2">
                    <span className="text-3xl font-black">{product.rate}%</span>
                    <span className="pb-1 text-sm text-slate-500">APR</span>
                  </div>
                  <p className="mt-4 text-sm text-slate-600">{product.description}</p>
                  <ul className="mt-4 space-y-2 text-sm text-slate-600">
                    {product.features.slice(0, 3).map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <BadgeCheck className="h-4 w-4 text-emerald-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-sky-950 py-16 text-white">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-10 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-200">Why members choose us</p>
              <h2 className="mt-2 text-3xl font-bold">Borrow with confidence</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-4">
              {[
                { icon: HeartHandshake, title: 'Human guidance', text: 'Dedicated advisors for every step of your application.' },
                { icon: Sparkles, title: 'Tailored offers', text: 'We match you with the most suitable product for your needs.' },
                { icon: TrendingUp, title: 'Clear savings', text: 'Simple repayments and no confusing small-print surprises.' },
                { icon: BriefcaseBusiness, title: 'Business-ready', text: 'Funding support for growth, working capital, and expansion.' },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} className="rounded-2xl border border-sky-800 bg-sky-900/40 p-6">
                  <div className="mb-4 inline-flex rounded-xl bg-white/10 p-3">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold">{title}</h3>
                  <p className="mt-3 text-sm text-sky-100">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
