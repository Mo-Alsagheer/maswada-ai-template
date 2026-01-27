import { useAuth } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import { Navigate } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";


type ProtectedRouteProps = {
    children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { isSignedIn, isLoaded } = useAuth()
    const { locale } = useLanguage()

    if (!isLoaded) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader />
            </div>
        )
    }

    if (!isSignedIn) {
        return <Navigate to={`/${locale}/sign-in`} replace />
    }

    return (
        <>
            {children}
        </>
    )
}