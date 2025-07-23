import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()
    
    // Mock AI response for demo
    const response = {
      message: "I can help you track parcels, format data, and manage couriers. Try asking me to track a shipment or help with data formatting!"
    }

    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}