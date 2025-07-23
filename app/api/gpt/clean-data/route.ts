import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    // Mock cleaned data for demo
    const mockData = {
      sellers: [
        { name: 'Ali Ahmed', sales: 25000, returns: 2000, net: 23000 },
        { name: 'Sara Khan', sales: 30000, returns: 1500, net: 28500 },
        { name: 'Usman Shah', sales: 18000, returns: 500, net: 17500 },
      ],
      totals: {
        sales: 73000,
        returns: 4000,
        net: 69000,
      },
    }

    return NextResponse.json({ formatted: mockData })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to clean data' },
      { status: 500 }
    )
  }
}