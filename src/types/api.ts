export type Update = {
  id: string
  fridge_id: string
  user_id: string | null
  type: 'stock_update' | 'fridge_update'
  subtype: string
  description: string
  created_at: string
}

export type UpdateWithAuthor = Update & {
  author_name: string
  fridge_name: string
}

export interface Fridge {
  id: string
  name: string
  description: string | null
  address: string
  latitude: number | null
  longitude: number | null
  status: 'operational' | 'broken' | 'maintenance'
  is_active: boolean
  maintainer_email: string | null
  created_at: string
  updated_at: string
}

export interface Profile {
  id: string
  display_name: string | null
  email: string | null
  preferred_language: 'en' | 'es'
  created_at: string
  updated_at: string
}

export type NewUpdate = {
  fridge_id: string
  type: 'stock_update' | 'fridge_update'
  subtype: string
  description: string
}
