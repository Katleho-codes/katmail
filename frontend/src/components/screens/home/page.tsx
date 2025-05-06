"use client"
import HomeLoggedIn from '@/components/home_logged_in/page'
import NotLoggedIn from '@/components/ui/not_logged_in'

import Sidebar from '@/components/ui/sidebar'
import Spinner from '@/components/ui/spinner'
import useUserLoggedIn from '@/hooks/auth/useUser'

const HomeScreen = () => {
    const { user, isLoggedIn, loading } = useUserLoggedIn()
    return (
        <>
            {
                loading ? (
                    <Spinner />
                ) : isLoggedIn ? (
                    <>
                        <Sidebar />
                        <HomeLoggedIn />
                    </>
                ) : (
                    <NotLoggedIn />
                )
            }
        </>
    )
}

export default HomeScreen