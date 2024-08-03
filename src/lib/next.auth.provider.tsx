"use client"

import {SessionProvider} from "next-auth/react";
import {Session} from "next-auth";
import { Providers } from "./providers";

export interface AuthProviderProps {
    children: React.ReactNode;
    session?: Session | null;
}

function AuthProvider({ children  }: Readonly<AuthProviderProps>) { 
    return <SessionProvider  ><Providers>{children}</Providers></SessionProvider> 
}
export default AuthProvider