export interface User {
  id: string
  email: string
  role: 'admin' | 'tenant' | 'staff'
  tenant_id?: string
  full_name?: string
  phone?: string
}

export interface Tenant {
  id: string
  name: string
  status: 'active' | 'blocked' | 'suspended'
  plan: 'free' | 'basic' | 'pro' | 'enterprise'
}

export interface Dispatch {
  id: string
  tracking_number: string
  courier: string
  customer_name: string
  customer_phone: string
  customer_address: string
  destination_city: string
  cod_amount: number
  status: string
  created_at: string
}

export interface SalesReport {
  id: string
  report_date: string
  seller_data: any
  totals: {
    sales: number
    returns: number
    net: number
  }
}