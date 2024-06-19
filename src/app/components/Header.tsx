'use client';
import { useEffect, useState } from "react";
import { getIconByName } from "./Icons";
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useSession, signIn, signOut } from "next-auth/react"


import ExternalMenu from "./ExternalMenu";
import SingButtons from "./SingButtons";
import { useSiteStore } from "../hooks/store";
import { getUserByEmail } from "@/server/users";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [jwtToken, setJwtToken] = useState(null);
    const { data: session, status, update } = useSession()
    console.log("🚀 ~ session:", session)
    
    console.log("🚀 ~ Header ~ status:", status)
    console.log("🚀 ~ Header ~ session:", session)


   
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const handleGoogleLogin = (response) => {
        console.log("🚀 ~ handleGoogleLogin ~ response:", response)
        // Here you would typically send the token to your server for verification
        // For demonstration purposes, we'll just set it in the state
        setJwtToken(response.credential);
        // You can now use the JWT token for authentication
    };
    return (
        <header className="  text-white p-4 w-full ">
            <div className="container mx-auto flex place-items-center justify-between">
                <button onClick={toggleMenu}>
                    {getIconByName('Burger')}
                </button>
                <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-[3rem]">
                    <span className="text-[hsl(187,100%,68%)]">
                        Modern Talking
                    </span>{" "}
                </h1>
                <SingButtons />
                {/* <GoogleLogin
                    onSuccess={handleGoogleLogin}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                /> */}

            </div>
            <ExternalMenu
                isOpen={isMenuOpen}
                onClose={toggleMenu}
            />
        </header>
    );
}
