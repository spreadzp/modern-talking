import { SocialNetworks } from "./SocialNetworks";
import StarryBackground from "./StarryBackground";

export default function Footer() {
    return (
        <>
        <StarryBackground />   
        <footer className="text-black text-center p-4">
            <SocialNetworks />
        </footer>
        </>
    );
}
