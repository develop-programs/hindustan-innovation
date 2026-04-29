"use client";

import React from "react";
import { Button } from "../ui/button";
import { X } from "lucide-react";

export default function Popups() {
    const [showPopup, setShowPopup] = React.useState(false);
    const [mobile, setMobile] = React.useState("");
    const [error, setError] = React.useState("");

    React.useEffect(() => {
        const timer = window.setTimeout(() => {
            setShowPopup(true);
        }, 1500);

        return () => window.clearTimeout(timer);
    }, []);

    React.useEffect(() => {
        const originalOverflow = document.body.style.overflow;

        if (showPopup) {
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, [showPopup]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const cleaned = mobile.replace(/\D/g, "");
        if (cleaned.length < 10) {
            setError("Please enter a valid mobile number.");
            return;
        }

        setError("");
        // TODO: send `cleaned` to your backend/CRM here
        setShowPopup(false);
    };

    return (
        <div
            className="fixed inset-0 w-full h-full grid place-content-center z-9999999 bg-black/50 backdrop-blur-sm"
            style={{ display: showPopup ? "grid" : "none" }}
        >
            <div className="relative max-w-md w-100 bg-black p-6 rounded-lg shadow-lg outline-2 outline-slate-800/70 text-white">
                <Button
                    className="absolute top-4 right-4"
                    variant="ghost"
                    onClick={() => setShowPopup(false)}
                    aria-label="Close popup"
                >
                    <X color="#fff" />
                </Button>

                <form className="p-2 pt-8 space-y-4" onSubmit={handleSubmit}>
                    <h2 className="text-xl font-semibold">Let us connect with you</h2>
                    <p className="text-sm text-white/80">
                        Share your mobile number and our team will contact you.
                    </p>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="mobile" className="text-sm">
                            Mobile number
                        </label>
                        <input
                            id="mobile"
                            name="mobile"
                            type="tel"
                            inputMode="numeric"
                            autoComplete="tel"
                            placeholder="Enter your mobile number"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            className="w-full rounded-md border border-white/30 bg-transparent px-3 py-2 text-white placeholder:text-white/50 outline-none focus:border-white"
                            required
                        />
                        {error ? <p className="text-xs text-red-400">{error}</p> : null}
                    </div>

                    <Button type="submit" className="w-full">
                        Connect with me
                    </Button>
                </form>
            </div>
        </div>
    );
}
