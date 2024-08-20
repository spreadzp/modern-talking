'use client';
import { useState } from "react";
import { getIconByName } from "./Icons"; 
import ExternalMenu from "./ExternalMenu";
import SingButtons from "./SingButtons";  

export default function Header() {
  
    const [isMenuOpen, setIsMenuOpen] = useState(false);   
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }; 
    return (
        <header className="text-white p-4 w-full flex justify-center">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center justify-between w-full md:w-auto mb-4 md:mb-0">
                    <button onClick={toggleMenu} className="focus:outline-none">
                        {getIconByName('Burger')}
                    </button>
                    <div className="w-10"></div>
                    <div className="logo-mt"></div>
                    {/* <Title 
                        titleName="Modern Talking" 
                        titleSize={TitleSize.H1} 
                        titleEffect={TitleEffect.Gradient} 
                    /> */}
                </div>
                <div className="w-full md:w-auto">
                    <SingButtons /> 
                </div>
            </div>
            <ExternalMenu
                isOpen={isMenuOpen}
                onClose={toggleMenu}
            />
        </header>
    );
}