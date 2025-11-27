"use client";

import { useState } from "react";
import { sendDiscordMessage } from "../../../hooks/discordMessage";
import { useKeylessAccounts } from "@/lib/web3/aptos/keyless/useKeylessAccounts";
import Card from "../../shared/Card";
import Title, { TitleEffect, TitleSize } from "../../shared/Title";

const Collaboration: React.FC = () => {
    const [isSending, setIsSending] = useState(false);
    const [message, setMessage] = useState("");
    const [subject, setSubject] = useState("");
    const { activeAccount } = useKeylessAccounts();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            if (message && subject) {
                setIsSending(true);
                e.preventDefault();
                const response = await sendDiscordMessage(`Topic ${subject.toLowerCase()}\n Message: ${message}\n address: ${activeAccount?.accountAddress ? activeAccount.accountAddress.toString() : ""}`);
                setSubject("");
                setMessage("");
                console.log("🚀 ~ handleSubmit ~ response:", response);
            } else {
                alert("Please fill all the fields");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setIsSending(false);
        }
    };

    return (
        <Card className="collaboration">
            <div className="collaboration-left text-yellow-200">
                <Title
                    titleName="Contact Us"
                    titleSize={TitleSize.H2}
                    titleEffect={TitleEffect.Gradient}
                />
                <p>
                    We`re here to help! Whether you have a question, a proposal, or just want to say hello, feel free to reach out. Fill out the form below, and we`ll get back to you as soon as possible.
                </p>
            </div>
            <div className="collaboration-right text-black">
                <form onSubmit={handleSubmit} className="collaboration-form">
                    <input
                        type="text"
                        placeholder="Subject (Question/Proposal)"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Your Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    ></textarea>
                    <button type="submit" disabled={isSending}>Send</button>
                </form>
            </div>
        </Card>
    );
};

export default Collaboration;