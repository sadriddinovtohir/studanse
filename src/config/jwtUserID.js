// @/config/jwtUserID.js — hozir qanday yozilgan?
import { jwtDecode } from 'jwt-decode'

export function useUserId() {
    const token = localStorage.getItem('token')
    if (!token) return null
    try {
        const decoded = jwtDecode(token)
        console.log('decoded:', decoded)        // ← shu nima chiqaradi?
        console.log('userId:', decoded.userId)  // ← shu nima chiqaradi?
        return decoded.userId
    } catch {
        return null
    }
}