import { useEffect, useState } from 'react'

const CACHE_KEY = 'ab_user_country'
const CACHE_TTL = 24 * 60 * 60 * 1000 // 24h

const fetchCountry = async () => {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 4000)
    const res = await fetch('https://api.country.is/', { cache: 'no-store', signal: controller.signal })
    clearTimeout(timeout)
    if (!res.ok) throw new Error('geo lookup failed')
    const data = await res.json()
    return data?.country || null
  } catch (e) {
    return null
  }
}

export const useUserLocation = () => {
  const [country, setCountry] = useState(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEY)
      if (cached) {
        const parsed = JSON.parse(cached)
        if (parsed && Date.now() - parsed.ts < CACHE_TTL) return parsed.country
      }
    } catch {}
    return null
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        const cached = localStorage.getItem(CACHE_KEY)
        if (cached) {
          const parsed = JSON.parse(cached)
          if (parsed && Date.now() - parsed.ts < CACHE_TTL) {
            if (!cancelled) {
              setCountry(parsed.country)
              setLoading(false)
            }
            return
          }
        }
      } catch (e) {}

      const c = await fetchCountry()
      if (cancelled) return
      setCountry(c)
      setLoading(false)
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify({ country: c, ts: Date.now() }))
      } catch (e) {}
    }

    load()
    return () => { cancelled = true }
  }, [])

  const isNigeria = country === 'NG'
  const currency = isNigeria ? 'NGN' : 'USD'
  const symbol = isNigeria ? '₦' : '$'

  return { country, loading, isNigeria, currency, symbol }
}
