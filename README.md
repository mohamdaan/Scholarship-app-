# Scholarship-app

# fields of each scholarship object
Scholarship {
  id: string | number
  name: string
  amount: number           // base currency units, unformatted
  deadline: string         // ISO "YYYY-MM-DD"
  university: string
  country: string
  level: string
  tags: string[]
  link: string
  description: string
}
