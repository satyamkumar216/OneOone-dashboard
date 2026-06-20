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

      console.log('data:', data)
      console.log('error:', error)

      if (data) setEnquiries(data)
      setLoading(false)
    }

    fetchEnquiries()
  }, [])

  if (loading) return <div style={{color:'white',padding:'40px'}}>Loading...</div>

  return (
    <div style={{ background: '#0a0a0f', minHeight: '100vh', padding: '40px', color: 'white' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '32px' }}>
        One'O'One — Enquiries ({enquiries.length})
      </h1>
      {enquiries.length === 0 ? (
        <p style={{ color: 'rgba(255,255,255,0.5)' }}>No enquiries found.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <th style={{ textAlign:'left', padding:'12px', color:'rgba(255,255,255,0.5)', fontSize:'12px' }}>NAME</th>
              <th style={{ textAlign:'left', padding:'12px', color:'rgba(255,255,255,0.5)', fontSize:'12px' }}>EMAIL</th>
              <th style={{ textAlign:'left', padding:'12px', color:'rgba(255,255,255,0.5)', fontSize:'12px' }}>PHONE</th>
              <th style={{ textAlign:'left', padding:'12px', color:'rgba(255,255,255,0.5)', fontSize:'12px' }}>DETAILS</th>
              <th style={{ textAlign:'left', padding:'12px', color:'rgba(255,255,255,0.5)', fontSize:'12px' }}>DATE</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map((e) => (
              <tr key={e.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding:'12px' }}>{e.name}</td>
                <td style={{ padding:'12px' }}>{e.email}</td>
                <td style={{ padding:'12px' }}>{e.phone || '—'}</td>
                <td style={{ padding:'12px' }}>{e.details}</td>
                <td style={{ padding:'12px', color:'rgba(255,255,255,0.4)', fontSize:'12px' }}>
                  {new Date(e.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
