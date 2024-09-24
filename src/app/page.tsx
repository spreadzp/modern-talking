"use client";
import { useKeylessAccounts } from "@/lib/web3/aptos/keyless/useKeylessAccounts";
import Landing from "./components/pages/Landing/Landing";
import LoginPage from "./login/LoginPage";


function Page() {
  const { activeAccount } = useKeylessAccounts();
  return (
    <>
      {activeAccount ? <Landing /> : <LoginPage />}
    </>
  );
}
export default Page;
