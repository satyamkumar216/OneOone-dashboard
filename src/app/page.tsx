'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface Enquiry {
  id: string
  created_at: string
  name: string
  email: string
  phone: string
  details: string
}

export default function Dashboard() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEnquiries = async () => {
      const { data, error } = await supabase
        .from('enquiries')
        .select('*')
        .order('created_at', { ascending: false })
      if (data) setEnquiries(data)
      setLoading(false)
    }
    fetchEnquiries()
  }, [])

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateStr;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-zinc-400 font-light">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-8 border-2 border-[#00f0ff] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm tracking-widest uppercase">Loading Enquiries...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030303] text-white p-6 sm:p-12 relative overflow-hidden">
      {/* Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#8b5cf6]/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-[#00f0ff]/5 blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-8">
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pb-6 border-b border-white/5">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Enquiries Dashboard
            </h1>
            <p className="text-xs text-zinc-500 uppercase tracking-widest font-semibold">
              Viewing submissions from One&apos;O&apos;One Agency ({enquiries.length})
            </p>
          </div>
        </div>

        {/* Enquiries View */}
        {enquiries.length === 0 ? (
          <div className="text-center py-20 bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col items-center space-y-4">
            <div className="p-4 bg-white/5 rounded-full border border-white/10">
              <svg className="w-8 h-8 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white">No submissions found</h3>
            <p className="text-sm text-zinc-500 max-w-xs">
              When prospective clients submit the enquiry form, they will appear here in real time.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="hidden lg:grid grid-cols-12 gap-4 px-6 text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">
              <div className="col-span-2">Date</div>
              <div className="col-span-2">Name</div>
              <div className="col-span-2">Email</div>
              <div className="col-span-2">Phone</div>
              <div className="col-span-4">Details</div>
            </div>

            <div className="space-y-4">
              {enquiries.map((enq) => (
                <div
                  key={enq.id}
                  className="bg-white/[0.02] border border-white/5 hover:border-white/10 rounded-2xl p-6 lg:px-6 lg:py-4 transition-all duration-300 lg:grid lg:grid-cols-12 lg:gap-4 lg:items-center text-sm shadow-md"
                >
                  {/* Date */}
                  <div className="lg:col-span-2 text-zinc-400 text-xs font-mono mb-2 lg:mb-0">
                    {formatDate(enq.created_at)}
                  </div>

                  {/* Name */}
                  <div className="lg:col-span-2 font-semibold text-white mb-1 lg:mb-0">
                    {enq.name}
                  </div>

                  {/* Email */}
                  <div className="lg:col-span-2 text-[#00f0ff] font-medium mb-1 lg:mb-0 break-all select-all">
                    {enq.email}
                  </div>

                  {/* Phone */}
                  <div className="lg:col-span-2 text-zinc-400 mb-4 lg:mb-0 break-all">
                    {enq.phone ? enq.phone : <span className="text-zinc-600 font-light italic">—</span>}
                  </div>

                  {/* Details */}
                  <div className="lg:col-span-4 text-zinc-300 font-light leading-relaxed bg-white/[0.01] border border-white/5 rounded-xl p-3.5 lg:p-0 lg:bg-transparent lg:border-none lg:rounded-none whitespace-pre-wrap">
                    {enq.details}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
