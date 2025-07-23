import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const supabase = await createClient()
    
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: userData } = await supabase
      .from('users')
      .select('tenant_id')
      .eq('id', user.id)
      .single()

    const trackingNumber = `${body.courier.toUpperCase()}${Date.now()}`

    const { data: dispatch, error } = await supabase
      .from('courier_dispatches')
      .insert({
        tenant_id: userData?.tenant_id,
        tracking_number: trackingNumber,
        courier: body.courier,
        customer_name: body.customer_name,
        customer_phone: body.customer_phone,
        customer_address: body.customer_address,
        destination_city: body.destination_city,
        cod_amount: body.cod_amount || 0,
        status: 'pending',
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({
      success: true,
      tracking_number: dispatch.tracking_number,
      dispatch,
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to create dispatch' },
      { status: 500 }
    )
  }
}