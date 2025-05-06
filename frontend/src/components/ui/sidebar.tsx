"use client"
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import { Bars4Icon } from "@heroicons/react/24/outline";
import Navbar from "./navbar";
import React from 'react'
import useUserLoggedIn from "@/hooks/auth/useUser";
import useLogoutUser from "@/hooks/auth/useLogout";

const Sidebar = () => {
    const { user, isLoggedIn, loading } = useUserLoggedIn()
    const { logoutUser, logoutLoading, error } = useLogoutUser()
    return (
        <div className="flex items-center h-[4rem] border px-2">
            {/* <Navbar /> */}
            <Sheet>
                <SheetTrigger asChild>
                    <Button className="outline-none bg-white border shadow-none hover:bg-white active:bg-white focus:bg-white border-none">
                        <Bars4Icon className="h-6 w-6 text-slate-800" />
                    </Button>
                </SheetTrigger>
                <SheetContent className="flex flex-col h-full">
                    <SheetHeader>
                        <SheetTitle className="overflow-hidden w-full text-sm text-left">
                            {user?.full_name}
                        </SheetTitle>
                    </SheetHeader>

                    <SheetFooter>
                        <SheetClose asChild>
                            <Button onClick={logoutUser}>
                                {logoutLoading ? 'Loading...' : 'Logout'}
                            </Button>
                        </SheetClose>
                    </SheetFooter>
                </SheetContent>
                <p>Hello</p>
            </Sheet>




        </div>
    )
}

export default Sidebar