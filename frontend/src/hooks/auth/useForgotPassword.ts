import { useState } from "react";
import axios from "axios";
import { useRouter } from "nextjs-toploader/app";
import toast from "react-hot-toast";
import { ForgotPasswordValues } from "@/lib/types";

interface ErrorMessages {
    email?: string;
}

const useForgotPassword = () => {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<ErrorMessages>({});
    const router = useRouter();

    const forgotPassword = async (values: ForgotPasswordValues) => {
        setLoading(true);
        setErrors({});
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/forgot_password`,
                values,
                { withCredentials: true }
            );

            if (response.status === 200 || response.status === 201) {
                toast.success(
                    response?.data?.message ||
                        "Check your email for the reset link."
                );
                router.push("/");
            }
        } catch (error: any) {
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else if (error?.response?.data?.errors) {
                setErrors(error.response.data.errors);
            } else {
                toast.error("Something went wrong. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return { forgotPassword, loading, errors };
};

export default useForgotPassword;
