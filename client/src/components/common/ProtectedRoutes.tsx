import { useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";


type ProtectedRoutesProps = {
    children: React.ReactNode;
}

export function ProtectedRoutes({ children }: ProtectedRoutesProps) {
    const { isSignedIn, isLoaded } = useAuth();
    if (!isLoaded) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!isSignedIn) {
        return <Navigate to="/sign-in" replace />;
    }

    return (
        <>
            {children}
        </>
    );
}