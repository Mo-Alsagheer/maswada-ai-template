import { BrowserRouter, Routes, Route } from "react-router-dom"

import { AppLayout } from "@/app/layout/AppLayout"
import { HomePage } from "@/app/pages/HomePage"
import { NotFoundPage } from "@/app/pages/NotFoundPage"
import { SignInPage } from "@/app/pages/SignInPage"
import { SignUpPage } from "@/app/pages/SignUpPage"
import { NotePage } from "@/app/pages/NotePage"
import { ProtectedRoutes } from "@/components/common/ProtectedRoutes";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route element={<ProtectedRoutes><AppLayout /></ProtectedRoutes>}>
          <Route path="/" element={<HomePage />} />
          <Route path="/note/:id" element={<NotePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
