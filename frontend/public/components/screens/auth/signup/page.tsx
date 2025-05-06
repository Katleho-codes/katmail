"use client"


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
        const createdAt = datetimestamp;
        const payload = { fullName, email, password, createdAt };
        await signup(payload);

    }
    return (

        <form>
            <div>
                <div>
                    <p className="text-center">Create account</p>

                </div>
                <div className="space-y-2">
                    <div className="space-y-1">
                        <label htmlFor="fullName">Full name</label>
                        <input
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            name="fullName"
                            className="bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-[#131515] focus:border-[#131515] block w-full px-3 py-1 shadow-sm"
                        />
                        {errors.full_name && <p className="text-sm text-red-500 font-medium">{errors.full_name}</p>}
                    </div>
                    <div className="space-y-1">
                        <label htmlFor="email">Email</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            name="email"
                            className="bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-[#131515] focus:border-[#131515] block w-full px-3 py-1 shadow-sm"
                        />
                        {errors.email && <p className="text-sm text-red-500 font-medium">{errors.email}</p>}
                    </div>
                    <div className="space-y-1">
                        <label htmlFor="password">Password</label>
                        <div className="flex items-center gap-2 border border-gray-300 mb-2 pr-1 rounded-sm">
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                name="password"
                                className="bg-white outline-0 text-gray-900 text-sm rounded-sm focus:ring-[#131515] focus:border-[#131515] block w-full px-3 py-1 outline-none shadow-none"
                                type={passwordShown ? "text" : "password"}
                            />

                            <button
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
                            </button>
                        </div>
                        {errors.user_password && <p className="text-sm text-red-500 font-medium">{errors.user_password}</p>}
                    </div>


                </div>
                <div>
                    <button className="w-full outline-none" type="submit" disabled={loading} onClick={signupUser}>{loading ? 'Signing up...' : 'Continue'}</button>
                </div>
            </div>
        </form>

    )
}
export default SignupScreen