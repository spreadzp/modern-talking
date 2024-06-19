'use client'
import { useSession, signIn, signOut } from "next-auth/react"
import { useSiteStore } from "../hooks/store"
import { getUserByEmail } from "@/server/users"
import { useEffect } from "react"

export default   function SingButtons() {
    const { data: session, status, update  } = useSession() 
    const { userAddressWallet, setUserAddressWallet, setCurrentUser } = useSiteStore()
    useEffect(() => {
        if (status === 'authenticated') {
            if (status === 'authenticated') {
                getUserByEmail(session?.user?.email!)
                    .then((user) => {
                        setCurrentUser(user)
                        setUserAddressWallet(user.address)
                    })
            }  
        }
    }, [status, update, session, setUserAddressWallet]);
    if (session) {
        //  {session?.user?.email}
        return (
            <>
                Signed in as {userAddressWallet} <br />
                <button onClick={() => signOut()}>Sign out</button>
            </>
        )
    }
    return (
        <>
            Not signed in <br />
            <button onClick={() => signIn('google')}>Sign in</button>
        </>
    )
}