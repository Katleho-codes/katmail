import axios from "axios";
import { useRouter } from "nextjs-toploader/app";
import { useState } from "react";

import toast from "react-hot-toast";
interface ErrorMessages {
    email?: string;
    password?: string;
}
type TResetPassword = {
    token: string;
    password: string;
};

const useResetPassword = () => {
    const [loading, setLoading] = useState(false); // Loading state
    const [errors, setErrors] = useState<ErrorMessages>({}); // Explicitly typed

    const router = useRouter();
    // Prefetch the / page ahead of time
    // router.prefetch("/");
    const resetPassword = async (values: TResetPassword) => {
        setLoading(true);
        setErrors({}); // Reset error before new attempt
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/reset_password`,
                values
            );
            if (response.status === 200) {
                toast.success(`${response?.data?.message}`);
                router.push("/");
            }
        } catch (error: any) {
            if (error?.response.data?.message) {
                toast.error(`${error?.response.data?.message}`);
            } else if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors); // Set validation errors to state
            }
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return { resetPassword, loading, errors };
};

export default useResetPassword;
