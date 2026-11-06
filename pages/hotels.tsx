import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Banknote, Search, SlidersHorizontal } from 'lucide-react';
import { loanProducts } from '../lib/db';

const categories = ['All', 'Personal', 'Home', 'Vehicle', 'Business', 'Student'] as const;

export default function ProductsPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<(typeof categories)[number]>('All');

  const filteredProducts = useMemo(() => {
    return loanProducts.filter((loan) => {
      const matchesCategory = category === 'All' || loan.category === category;
      const matchesQuery = !query || [loan.name, loan.category, loan.description].join(' ').toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">Loan products</p>
            <h1 className="mt-2 text-4xl font-black">Choose the right finance option</h1>
          </div>
          <Link href="/bookings" className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-3 font-semibold text-white shadow-lg shadow-sky-200 transition hover:bg-sky-700">
            View applications <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search products, categories, or loan types"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none ring-0 transition focus:border-sky-500 focus:bg-white"
              />
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600">
                <SlidersHorizontal className="h-4 w-4" />
                Filter
              </div>
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value as (typeof categories)[number])}
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-sky-500 focus:bg-white"
              >
                {categories.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((loan) => (
            <div key={loan.id} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <img src={loan.image} alt={loan.name} className="h-48 w-full object-cover" />
              <div className="p-6">
                <div className="mb-3 flex items-center justify-between">
                  <span className="rounded-full bg-sky-100 px-2.5 py-1 text-xs font-semibold text-sky-700">{loan.category}</span>
                  <span className="text-xs font-medium text-emerald-600">{loan.badge}</span>
                </div>
                <h2 className="text-2xl font-bold">{loan.name}</h2>
                <div className="mt-4 flex items-end gap-2">
                  <span className="text-3xl font-black">{loan.rate}%</span>
                  <span className="pb-1 text-sm text-slate-500">APR</span>
                </div>
                <div className="mt-3 flex items-center justify-between text-sm text-slate-600">
                  <span>Up to R{loan.amount.toLocaleString()}</span>
                  <span>{loan.term} months</span>
                </div>
                <p className="mt-4 text-sm text-slate-600">{loan.description}</p>
                <ul className="mt-5 space-y-2 text-sm text-slate-700">
                  {loan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700">
                  Apply for this loan <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
            No loan products match your search yet.
          </div>
        )}
      </div>
    </div>
  );
}
