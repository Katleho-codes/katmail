"use client"
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { useState } from "react";
import toast from "react-hot-toast";


export default function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const [loading, setLoading] = useState(false)
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [passwordShown, setPasswordShown] = useState(false);
    const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);


    // Password toggle handler
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };
    // Confirm password toggle handler
    const toggleConfirmPassword = () => {
        setConfirmPasswordShown(!confirmPasswordShown);
    };


    const router = useRouter();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        try {
            setLoading(false)
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/reset_password`,
                { token, password }
            );
            console.log("res", res)
            if (res.status === 200) {
                toast.success(res.data?.message);
                router.push("/auth")
            }
        } catch (err: any) {
            setMessage(err.response?.data?.error || "Something went wrong");
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className='h-screen flex justify-center items-center'>
            <form>
                <Card className='w-[400px]'>
                    <CardHeader>
                        <CardTitle className="text-center">Reset password</CardTitle>
                        <CardDescription>
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
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
                                    type="button"
                                    onClick={togglePassword}
                                    data-testid="toggle-password"
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

                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="confirmPassword">Confirm password</Label>
                            <div className="flex items-center gap-2 border border-gray-300 mb-2 pr-1 rounded-sm">
                                <input
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    name="password"
                                    className="bg-white outline-0 text-gray-900 text-sm rounded-sm focus:ring-[#131515] focus:border-[#131515] block w-full px-3 py-1 outline-none shadow-none"
                                    type={confirmPasswordShown ? "text" : "password"}
                                />

                                <Button
                                    type="button"
                                    onClick={toggleConfirmPassword}
                                    data-testid="toggle-password"
                                    className="bg-transparent border-none outline-none shadow-none hover:bg-transparent"
                                >
                                    <span>
                                        {!confirmPasswordShown ? (
                                            <EyeIcon className="w-6 h-6 text-gray-600" />
                                        ) : (
                                            <EyeSlashIcon className="w-6 h-6 text-gray-600" />
                                        )}
                                    </span>
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-3">
                        <Button className="w-full outline-none" onClick={handleSubmit} type="submit" disabled={loading}> {loading ? 'Sending reset mail...' : 'Continue'}</Button>
                        <Link className="font-medium text-sm" href="/auth">Back to login</Link>
                    </CardFooter>
                </Card>
                {error && <p className="text-red-500 font-semibold text-center text-sm">{error}</p>}
            </form>
        </div>
    );
}
