'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { FileSpreadsheet, Calendar, Download } from 'lucide-react'
import toast from 'react-hot-toast'

export default function SalesViewPage() {
  const [reports, setReports] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchReports()
  }, [])

  const fetchReports = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      const { data: userData } = await supabase
        .from('users')
        .select('tenant_id')
        .eq('id', user?.id)
        .single()

      const { data, error } = await supabase
        .from('sales_reports')
        .select('*')
        .eq('tenant_id', userData?.tenant_id)
        .order('report_date', { ascending: false })

      if (error) throw error
      setReports(data || [])
    } catch (error) {
      toast.error('Failed to load reports')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Sales Reports</h1>
      
      {reports.length === 0 ? (
        <div className="card text-center py-12">
          <FileSpreadsheet className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-400 mb-4">No sales reports found</p>
          <a href="/sales/upload" className="button-primary">
            Upload First Report
          </a>
        </div>
      ) : (
        <div className="grid gap-4">
          {reports.map((report) => (
            <div key={report.id} className="card">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <h3 className="font-semibold">
                      {new Date(report.report_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {report.seller_data?.length || 0} sellers
                    </p>
                  </div>
                </div>
                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <Download className="w-5 h-5" />
                </button>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-sm text-gray-400">Total Sales</p>
                  <p className="font-semibold">PKR {report.totals?.sales?.toLocaleString() || 0}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-sm text-gray-400">Returns</p>
                  <p className="font-semibold">PKR {report.totals?.returns?.toLocaleString() || 0}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-sm text-gray-400">Net Amount</p>
                  <p className="font-semibold">PKR {report.totals?.net?.toLocaleString() || 0}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}