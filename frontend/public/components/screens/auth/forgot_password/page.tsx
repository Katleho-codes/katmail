"use client"


import useForgotPassword from '@/hooks/auth/useForgotPassword';
import Link from 'next/link';
import React, { useState } from 'react';




const ForgotPasswordScreen = () => {

    const { forgotPassword, loading, errors } = useForgotPassword()
    const [email, setEmail] = useState("")



    const forgotPass = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const payload = { email };
        await forgotPassword(payload);

    }

    return (
        <div className='h-screen flex justify-center items-center'>
            <form>
                <div className='w-[400px]'>
                    <div>
                        <p className="text-center">Forgot password</p>
                    </div>
                    <div className="space-y-2">
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
                    </div>
                    <div className="flex flex-col gap-3">
                        <button className="w-full outline-none" onClick={forgotPass} type="submit" disabled={loading}> {loading ? 'Sending reset mail...' : 'Continue'}</button>
                        <Link className="font-medium text-sm" href="/auth">Back to login</Link>
                    </div>
                </div>
            </form>

        </div>
    )
}

export default ForgotPasswordScreen
