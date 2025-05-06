"use client";
import { TUser } from "@/lib/types";
import axios from "axios";
import { useEffect, useState } from "react";

const useUserLoggedIn = () => {
    const [user, setUser] = useState<TUser | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/me`,
                    {
                        withCredentials: true,
                    }
                );

                if (response?.data) {
                    setUser(response.data?.user);
                    setIsLoggedIn(true); // User is logged in if data is returned
                } else {
                    setIsLoggedIn(false); // No user data means not logged in
                }
            } catch (error) {
                if (process.env.NODE_ENV != "production")
                    console.error("user not fetched", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { user, isLoggedIn, loading };
};

export default useUserLoggedIn;
