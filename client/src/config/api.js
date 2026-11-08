/**
 * Centralized API configuration for TrustMatrix AI Nexus
 * Automatically switches between local development (http://localhost:5000)
 * and production deployment (Vercel, Render, Railway) where the API is served
 * on the same origin or via VITE_API_URL environment variable.
 */

const getApiBase = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL.replace(/\/+$/, '');
  }
  
  if (typeof window !== 'undefined') {
    // If running in browser on localhost or 127.0.0.1, use port 5000
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return 'http://localhost:5000';
    }
    // In production on Vercel or any custom domain, use relative path (same origin)
    return '';
  }
  
  return 'http://localhost:5000';
};

export const API_BASE = getApiBase();
export default API_BASE;
