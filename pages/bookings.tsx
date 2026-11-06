import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle, CircleX, Clock3 } from 'lucide-react';
import { getLoanApplications, LoanApplication } from '../lib/db';

const filters = ['All', 'Approved', 'Pending', 'Rejected'] as const;

type FilterType = (typeof filters)[number];

export default function BookingsPage() {
  const [applications, setApplications] = useState<LoanApplication[]>([]);
  const [filter, setFilter] = useState<FilterType>('All');

  useEffect(() => {
    setApplications(getLoanApplications());
  }, []);

  const visibleApplications =
    filter === 'All'
      ? applications
      : applications.filter((application) => application.status === filter);

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">Applications</p>
            <h1 className="mt-2 text-4xl font-black">Track your loan progress</h1>
          </div>
          <Link href="/hotels" className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-3 font-semibold text-white shadow-lg shadow-sky-200 transition hover:bg-sky-700">
            Explore products <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {filters.map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                filter === status ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead className="bg-slate-100 text-xs uppercase tracking-[0.2em] text-slate-500">
                <tr>
                  <th className="px-6 py-4">Applicant</th>
                  <th className="px-6 py-4">Loan type</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Submitted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {visibleApplications.map((application) => (
                  <tr key={application.id} className="hover:bg-slate-50">
                    <td className="px-6 py-5">
                      <div className="font-semibold">{application.applicantName}</div>
                      <div className="text-sm text-slate-500">{application.email}</div>
                    </td>
                    <td className="px-6 py-5 text-slate-700">{application.loanType}</td>
                    <td className="px-6 py-5 font-semibold">R{application.amount.toLocaleString()}</td>
                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                          application.status === 'Approved'
                            ? 'bg-emerald-100 text-emerald-700'
                            : application.status === 'Pending'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-rose-100 text-rose-700'
                        }`}
                      >
                        {application.status === 'Approved' ? <CheckCircle className="h-3.5 w-3.5" /> : application.status === 'Pending' ? <Clock3 className="h-3.5 w-3.5" /> : <CircleX className="h-3.5 w-3.5" />}
                        {application.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-slate-600">{new Date(application.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
