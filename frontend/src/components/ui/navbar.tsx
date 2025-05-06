"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Navbar = () => {
    const pathname = usePathname()
    return (
        <nav className="hidden lg:flex h-[4rem] border items-center px-2">
            <div className="mx-auto flex gap-3 items-center">
                <Link href="/subscriptions" className={` ${pathname === "/subscriptions" ? 'text-[#e85d04] font-semibold' : 'text-gray-800'}`}>Emails</Link>
                <Link href="/analytics" className={` ${pathname === "/analytics" ? 'text-[#e85d04] font-semibold' : 'text-gray-800'}`}>Analytics</Link>
                <Link href="/create_sub" className={` ${pathname === "/create_sub" ? 'text-[#e85d04] font-semibold' : 'text-gray-800'}`}>Create new</Link>
            </div>
        </nav>
    )
}

export default Navbar