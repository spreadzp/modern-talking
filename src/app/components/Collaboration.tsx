"use client";

import { useState } from "react"; 
import { sendDiscordMessage } from "../hooks/discordMessage";

const Collaboration: React.FC = () => {
    const [isSendingCollaboration, setIsSendingCollaboration] = useState(false)
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try{
            if(name && message) {
                setIsSendingCollaboration(true)
                e.preventDefault();
                console.log("Form submitted:", { name, message });
                const response= await  sendDiscordMessage(`New collaboration proposal from ${name}: ${message}`);
                setName("");
                console.log("🚀 ~ handleSubmit ~ response:", response) 
            }else {
                alert("Please fill all the fields");
            }

        
        setMessage("");
    } catch (error) {
        console.error("Error submitting form:", error);
    }finally{
        setIsSendingCollaboration(false)
    }
    };

    return (
        <div className="collaboration">
            <div className="collaboration-left">
                <h2>Collaboration Proposal</h2>
                <p>
                    Let&apos;s achieve more together! We&apos;re always looking for passionate
                    individuals and teams to collaborate with on exciting projects.
                    Whether you have a unique skillset, a fresh perspective, or a shared
                    vision, we encourage you to submit your proposal below.
                </p>
            </div>
            <div className="collaboration-right">
                <form onSubmit={handleSubmit} className="collaboration-form">
                    <input
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Your Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    ></textarea>
                    <button type="submit" disabled={isSendingCollaboration}>Send proposal</button>
                </form>
            </div>
        </div>
    );
};

export default Collaboration;
