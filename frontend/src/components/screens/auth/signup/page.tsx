"use client"
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import useSignup from "@/hooks/auth/useSignup";
import { datetimestamp } from "@/lib/datetime";


import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
const SignupScreen = () => {

    const { signup, loading, errors } = useSignup()


    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordShown, setPasswordShown] = useState(false);

    // Password toggle handler
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    const signupUser = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const payload = { full_name: fullName, email, user_password: password, created_at: datetimestamp };
        await signup(payload);

    }
    return (

        <form>
            <Card>
                <CardHeader>
                    <CardTitle className="text-center">Create account</CardTitle>

                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="space-y-1">
                        <Label htmlFor="fullName">Full name</Label>
                        <input
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            name="fullName"
                            className="bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-[#131515] focus:border-[#131515] block w-full px-3 py-1 shadow-sm"
                        />
                        {errors.fullName && <p className="text-sm text-red-500 font-medium">{errors.fullName}</p>}
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="email">Email</Label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            name="email"
                            className="bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-[#131515] focus:border-[#131515] block w-full px-3 py-1 shadow-sm"
                        />
                        {errors.email && <p className="text-sm text-red-500 font-medium">{errors.email}</p>}
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="password">Password</Label>
                        <div className="flex items-center gap-2 border border-gray-300 mb-2 pr-1 rounded-sm">
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                name="password"
                                className="bg-white outline-0 text-gray-900 text-sm rounded-sm focus:ring-[#131515] focus:border-[#131515] block w-full px-3 py-1 outline-none shadow-none"
                                type={passwordShown ? "text" : "password"}
                            />

                            <Button
                                data-testid="toggle-password"
                                type="button"
                                onClick={togglePassword}
                                className="bg-transparent border-none outline-none shadow-none hover:bg-transparent"
                            >
                                <span>
                                    {!passwordShown ? (
                                        <EyeIcon className="w-6 h-6 text-gray-600" />
                                    ) : (
                                        <EyeSlashIcon className="w-6 h-6 text-gray-600" />
                                    )}
                                </span>
                            </Button>
                        </div>
                        {errors.password && <p className="text-sm text-red-500 font-medium">{errors.password}</p>}
                    </div>


                </CardContent>
                <CardFooter>
                    <Button className="w-full outline-none" type="submit" disabled={loading} onClick={signupUser}>{loading ? 'Signing up...' : 'Continue'}</Button>
                </CardFooter>
            </Card>
        </form>

    )
}
export default SignupScreen