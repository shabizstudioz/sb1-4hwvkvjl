import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const trackingNumber = searchParams.get('tracking_number')
    
    if (!trackingNumber) {
      return NextResponse.json({ error: 'Tracking number required' }, { status: 400 })
    }

    const supabase = await createClient()
    
    const { data, error } = await supabase
      .from('courier_dispatches')
      .select('*')
      .eq('tracking_number', trackingNumber)
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Shipment not found' },
      { status: 404 }
    )
  }
}