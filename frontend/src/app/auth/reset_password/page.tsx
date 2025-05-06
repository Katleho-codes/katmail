
import ResetPasswordForm from '@/components/screens/auth/reset_password/page';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Reset password',
    description: '...',
    robots: {
        index: false,
        follow: false,
    },
}

const ResetPassword = () => {
    return (
        <ResetPasswordForm />
    )
}

export default ResetPassword