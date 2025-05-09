"use client"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import axios from "axios"
import dynamic from 'next/dynamic'
import { useEffect } from "react"
import LoginScreen from "./login/page"
import SignupScreen from "./signup/page"
import toast from "react-hot-toast"

// const LoginScreen = dynamic(() =>
//     import('./login/page'), { ssr: false }
// )
// const SignupScreen = dynamic(() =>
//     import('./signup/page'), { ssr: false }
// )

const AuthScreen = () => {
    // const { user, isLoggedIn } = useUserLoggedIn()

    useEffect(() => {
        const logoutUser = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/logout`,
                    {
                        withCredentials: true,
                    }
                );
                if (response?.status === 400) toast.error("You are now logged out")
            } catch (error) {
                if (process.env.NODE_ENV !== "production") {
                    console.error("Error logging out:", error);
                }
            }
        };
        logoutUser()
    }, [])
    return (
        <div className="flex justify-center items-center h-screen">
            <Tabs defaultValue="login" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login" className=" rounded border active:border-emerald-500 focus:border-emerald-500">Login</TabsTrigger>
                    <TabsTrigger value="signup" className=" rounded border active:border-emerald-500 focus:border-emerald-500">Signup</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                    <LoginScreen />
                </TabsContent>
                <TabsContent value="signup">
                    <SignupScreen />
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default AuthScreen