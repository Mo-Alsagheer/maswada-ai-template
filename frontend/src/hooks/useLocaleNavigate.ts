import { useNavigate } from 'react-router-dom'
import { useLanguage } from './useLanguage'

/**
 * Custom hook that provides locale-aware navigation functions
 */
export function useLocaleNavigate() {
    const navigate = useNavigate()
    const { locale } = useLanguage()

    /**
     * Navigate to a path with the current locale prefix
     * @param path - The path to navigate to (without locale prefix)
     * @param options - Navigation options (replace, state, etc.)
     */
    const localeNavigate = (path: string | number, options?: { replace?: boolean; state?: any }) => {
        if (typeof path === 'number') {
            navigate(path)
            return
        }

        // Remove leading slash if present
        const cleanPath = path.startsWith('/') ? path.slice(1) : path
        const localizedPath = `/${locale}/${cleanPath}`.replace(/\/$/, '') || `/${locale}`
        
        navigate(localizedPath, options)
    }

    /**
     * Generate a locale-aware path
     * @param path - The path (without locale prefix)
     * @returns The path with locale prefix
     */
    const getLocalePath = (path: string) => {
        const cleanPath = path.startsWith('/') ? path.slice(1) : path
        return `/${locale}/${cleanPath}`.replace(/\/$/, '') || `/${locale}`
    }

    return { localeNavigate, getLocalePath, navigate }
}
