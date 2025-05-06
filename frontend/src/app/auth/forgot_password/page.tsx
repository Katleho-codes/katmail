
import React from 'react'
import type { Metadata } from 'next';
import ForgotPasswordScreen from '@/components/screens/auth/forgot_password/page';

export const metadata: Metadata = {
    title: 'Forgot password',
    description: '...',
    robots: {
        index: false,
        follow: false,
    },
}

const ForgotPassword = () => {
    return (
        <ForgotPasswordScreen />
    )
}
export default ForgotPassword