"use client";
import { useKeylessAccounts } from "@/lib/web3/aptos/keyless/useKeylessAccounts";
import Landing from "./components/pages/Landing/Landing";
import LoginPage from "./login/LoginPage";
import { Metadata } from "next";



function Page() { 
  const { activeAccount } = useKeylessAccounts();
  return (
    <>
      {activeAccount ? <Landing /> : <LoginPage />}
    </>
  );
}
export default Page;
