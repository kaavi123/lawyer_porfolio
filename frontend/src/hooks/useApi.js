import { useState, useEffect } from 'react'
import axios from 'axios'

const BASE = '/api'

export function useFetch(endpoint) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    axios.get(`${BASE}${endpoint}`)
      .then(res => { setData(res.data); setLoading(false) })
      .catch(err => { setError(err.message); setLoading(false) })
  }, [endpoint])

  return { data, loading, error }
}

export async function submitInquiry(formData) {
  const res = await axios.post(`${BASE}/inquiry`, formData)
  return res.data
}
