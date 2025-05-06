"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from 'nextjs-toploader/app';


const NotLoggedIn = () => {
    const router = useRouter();
    // Prefetch the auth page ahead of time
    const handleLoginClick = () => {
        router.push("/auth");
    };
    return (
        <div className="h-screen flex justify-center items-center gap-3">

            <>
                <Button
                    type="button"
                    onClick={handleLoginClick}
                    className="bg-gray-950 outline-none text-gray-50 cursor-pointer"
                >
                    Login
                </Button>
            </>
        </div>
    )
}

export default NotLoggedIn