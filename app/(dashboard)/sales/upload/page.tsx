'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, FileSpreadsheet, Sparkles } from 'lucide-react'
import toast from 'react-hot-toast'

export default function SalesUploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [cleanedData, setCleanedData] = useState<any>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    },
    maxFiles: 1,
  })

  const handleProcess = async () => {
    if (!file) return
    
    setLoading(true)
    
    try {
      const formData = new FormData()
      formData.append('file', file)
      
      const response = await fetch('/api/gpt/clean-data', {
        method: 'POST',
        body: formData,
      })
      
      const data = await response.json()
      
      if (!response.ok) throw new Error(data.error)
      
      setCleanedData(data.formatted)
      toast.success('Data cleaned successfully!')
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Upload Sales Data</h1>
      
      <div className="card mb-6">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
            isDragActive ? 'border-accent bg-accent/10' : 'border-white/20 hover:border-white/40'
          }`}
        >
          <input {...getInputProps()} />
          <FileSpreadsheet className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <p className="text-lg mb-2">
            {isDragActive ? 'Drop the file here' : 'Drag & drop your sales file here'}
          </p>
          <p className="text-sm text-gray-400">or click to browse</p>
          {file && (
            <p className="mt-4 text-accent">Selected: {file.name}</p>
          )}
        </div>
      </div>

      {file && !cleanedData && (
        <div className="text-center">
          <button
            onClick={handleProcess}
            disabled={loading}
            className="button-primary flex items-center gap-2 mx-auto"
          >
            <Sparkles className="w-4 h-4" />
            {loading ? 'Processing with AI...' : 'Clean with AI'}
          </button>
        </div>
      )}

      {cleanedData && (
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Cleaned Data</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4">Seller</th>
                  <th className="text-right py-3 px-4">Sales</th>
                  <th className="text-right py-3 px-4">Returns</th>
                  <th className="text-right py-3 px-4">Net</th>
                </tr>
              </thead>
              <tbody>
                {cleanedData.sellers?.map((seller: any, index: number) => (
                  <tr key={index} className="border-b border-white/5">
                    <td className="py-3 px-4">{seller.name}</td>
                    <td className="text-right py-3 px-4">PKR {seller.sales.toLocaleString()}</td>
                    <td className="text-right py-3 px-4">PKR {seller.returns.toLocaleString()}</td>
                    <td className="text-right py-3 px-4 font-medium">
                      PKR {seller.net.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="font-bold">
                  <td className="py-3 px-4">Total</td>
                  <td className="text-right py-3 px-4">
                    PKR {cleanedData.totals?.sales.toLocaleString()}
                  </td>
                  <td className="text-right py-3 px-4">
                    PKR {cleanedData.totals?.returns.toLocaleString()}
                  </td>
                  <td className="text-right py-3 px-4">
                    PKR {cleanedData.totals?.net.toLocaleString()}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}