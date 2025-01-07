import axios from 'axios'

// axios client
export const client = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
})
