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

  if (loading) return (
    <div style={{ background:'#0a0a0f', minHeight:'100vh', 
    display:'flex', alignItems:'center', justifyContent:'center', 
    color:'white' }}>
      Loading enquiries...
    </div>
  )

  return (
    <div style={{ background:'#0a0a0f', minHeight:'100vh', 
    padding:'40px', color:'white', fontFamily:'sans-serif' }}>
      
      <div style={{ marginBottom:'32px' }}>
        <h1 style={{ fontSize:'28px', fontWeight:'600', margin:0 }}>
          One'O'One — Enquiries
        </h1>
        <p style={{ color:'rgba(255,255,255,0.4)', fontSize:'14px', 
        marginTop:'4px' }}>
          {enquiries.length} submission{enquiries.length !== 1 ? 's' : ''}
        </p>
      </div>

      {enquiries.length === 0 ? (
        <div style={{ textAlign:'center', padding:'80px', 
        color:'rgba(255,255,255,0.4)' }}>
          No enquiries yet.
        </div>
      ) : (
        <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
          {enquiries.map((e) => (
            <div key={e.id} style={{ 
              background:'rgba(255,255,255,0.04)', 
              border:'1px solid rgba(255,255,255,0.08)',
              borderRadius:'12px', padding:'24px' 
            }}>
              <div style={{ display:'flex', justifyContent:'space-between', 
              marginBottom:'12px' }}>
                <div>
                  <div style={{ fontSize:'16px', fontWeight:'600' }}>
                    {e.name}
                  </div>
                  <div style={{ color:'rgba(255,255,255,0.5)', fontSize:'13px' }}>
                    {e.email} {e.phone ? `· ${e.phone}` : ''}
                  </div>
                </div>
                <div style={{ color:'rgba(255,255,255,0.3)', fontSize:'12px' }}>
                  {new Date(e.created_at).toLocaleString()}
                </div>
              </div>
              <div style={{ color:'rgba(255,255,255,0.7)', fontSize:'14px', 
              lineHeight:'1.6', borderTop:'1px solid rgba(255,255,255,0.06)', 
              paddingTop:'12px' }}>
                {e.details}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
