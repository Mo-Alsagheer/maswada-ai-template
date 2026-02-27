import { SignIn } from "@clerk/clerk-react";


export function SignInPage() {
    return (
        <div className="flex items-center justify-center h-screen">
            <SignIn />
        </div>
    )
}
