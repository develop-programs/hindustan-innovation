"use client";

import React from "react";
import { Button } from "../ui/button";
import { X, Phone, ArrowRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// --- IndexedDB Wrapper Logic ---
const DB_NAME = 'PopupLeadsDB';
const STORE_NAME = 'leads';
const META_STORE = 'metadata';

const initDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, 1);
        request.onupgradeneeded = (e) => {
            const db = (e.target as IDBOpenDBRequest).result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
            }
            if (!db.objectStoreNames.contains(META_STORE)) {
                db.createObjectStore(META_STORE, { keyPath: 'key' });
            }
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
};

const addLeadToDB = async (mobile: string) => {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        tx.objectStore(STORE_NAME).add({ mobile, timestamp: Date.now() });
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => reject(tx.error);
    });
};

const getAllLeadsFromDB = async (): Promise<string[]> => {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const request = tx.objectStore(STORE_NAME).getAll();
        request.onsuccess = () => resolve(request.result.map(r => r.mobile));
        request.onerror = () => reject(request.error);
    });
};

const clearLeadsFromDB = async () => {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        tx.objectStore(STORE_NAME).clear();
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => reject(tx.error);
    });
};

const getLastSentTime = async (): Promise<number> => {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(META_STORE, 'readonly');
        const request = tx.objectStore(META_STORE).get('lastSentTime');
        request.onsuccess = () => {
            if (request.result) resolve(request.result.value);
            else resolve(0);
        };
        request.onerror = () => reject(request.error);
    });
};

const setLastSentTime = async (time: number) => {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(META_STORE, 'readwrite');
        tx.objectStore(META_STORE).put({ key: 'lastSentTime', value: time });
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => reject(tx.error);
    });
};

const checkAndSendEmails = async () => {
    try {
        const leads = await getAllLeadsFromDB();
        if (leads.length === 0) return;

        let lastSent = await getLastSentTime();
        if (lastSent === 0) {
            lastSent = Date.now();
            await setLastSentTime(lastSent);
        }

        const now = Date.now();
        const twentyFourHours = 24 * 60 * 60 * 1000;
        
        if (leads.length >= 100 || (now - lastSent) >= twentyFourHours) {
            const res = await fetch("/api/popup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ leads })
            });
            if (res.ok) {
                await clearLeadsFromDB();
                await setLastSentTime(Date.now());
                console.log("Leads batch sent and DB cleared.");
            }
        }
    } catch (err) {
        console.error("Error checking and sending emails:", err);
    }
};

export default function Popups() {
    const [showPopup, setShowPopup] = React.useState(false);
    const [mobile, setMobile] = React.useState("");
    const [error, setError] = React.useState("");

    React.useEffect(() => {
        const timer = window.setTimeout(() => {
            setShowPopup(true);
        }, 1500);

        // Check initially and set an interval to check every hour while page is open
        checkAndSendEmails();
        const checkerInterval = window.setInterval(() => {
            checkAndSendEmails();
        }, 60 * 60 * 1000);

        return () => {
            window.clearTimeout(timer);
            window.clearInterval(checkerInterval);
        };
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const cleaned = mobile.replace(/\D/g, "");
        if (cleaned.length < 10) {
            setError("Please enter a valid 10-digit number.");
            return;
        }

        setError("");
        
        try {
            await addLeadToDB(cleaned);
            await checkAndSendEmails();
        } catch (err) {
            console.error("Failed to save lead", err);
        }

        setShowPopup(false);
    };

    return (
        <AnimatePresence>
            {showPopup && (
                <div className="fixed inset-0 w-full h-full grid place-content-center z-[9999999]">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowPopup(false)}
                        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
                    />

                    {/* Popup Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        transition={{ type: "spring", damping: 20, stiffness: 200 }}
                        className="relative max-w-[440px] w-[calc(100vw-2rem)]"
                    >
                        {/* Subtle Organic Glows (Matching zinc theme) */}
                        <div className="absolute -top-12 -right-12 w-64 h-64 bg-zinc-500/10 blur-[100px] rounded-full" />
                        <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-zinc-500/5 blur-[100px] rounded-full" />

                        <div className="relative bg-zinc-950/20 backdrop-blur-xl rounded-[2.5rem] border border-white/10 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] overflow-hidden">
                            {/* Curved Header Background */}
                            <div className="absolute top-0 left-0 w-full h-40 bg-linear-to-br from-white/5 to-transparent -z-10" />
                            <svg className="absolute top-32 left-0 w-full h-24 -z-10 text-zinc-950/20" viewBox="0 0 500 150" preserveAspectRatio="none">
                                <path 
                                    d="M0,150 C150,50 350,250 500,150 L500,0 L0,0 Z" 
                                    fill="currentColor" 
                                />
                            </svg>

                            <Button
                                className="absolute top-6 right-6 text-zinc-500 hover:text-zinc-100 hover:bg-white/5 rounded-2xl w-10 h-10 p-0 transition-all z-20"
                                variant="ghost"
                                onClick={() => setShowPopup(false)}
                                aria-label="Close popup"
                            >
                                <X size={20} />
                            </Button>

                            <div className="p-10 pt-12">
                                <form className="relative space-y-8" onSubmit={handleSubmit}>
                                    <div className="space-y-4">
                                        <motion.div 
                                            initial={{ y: 10, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.1 }}
                                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100/5 border border-white/10 text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]"
                                        >
                                            <Sparkles className="w-3 h-3 text-zinc-500" />
                                            Limited Consultation
                                        </motion.div>
                                        
                                        <div className="space-y-2">
                                            <h2 className="text-3xl font-bold tracking-tight text-zinc-100 leading-tight">
                                                Build your project <br />
                                                <span className="text-zinc-400 font-serif italic font-light">
                                                    with our engineers.
                                                </span>
                                            </h2>
                                            <p className="text-zinc-500 text-base leading-relaxed max-w-[280px]">
                                                Share your contact number and our team will reach out shortly.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="relative group">
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-zinc-100 transition-colors">
                                                <Phone size={18} />
                                            </div>
                                            <input
                                                id="mobile"
                                                name="mobile"
                                                type="tel"
                                                inputMode="numeric"
                                                autoComplete="tel"
                                                placeholder="Your mobile number"
                                                value={mobile}
                                                onChange={(e) => setMobile(e.target.value)}
                                                className="w-full h-14 pl-12 pr-6 rounded-2xl border border-white/15 bg-white/5 text-zinc-100 placeholder:text-zinc-2000 outline-none transition-all focus:border-white/20 focus:bg-white/10 focus:ring-4 focus:ring-white/5"
                                                required
                                            />
                                        </div>
                                        {error && (
                                            <motion.p 
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className="text-xs text-red-500 pl-2 flex items-center gap-1 font-medium"
                                            >
                                                <span className="w-1 h-1 rounded-full bg-red-500" />
                                                {error}
                                            </motion.p>
                                        )}
                                    </div>

                                    <div className="space-y-4">
                                        <Button 
                                            type="submit" 
                                            className="w-full h-14 rounded-2xl bg-zinc-100 text-zinc-950 hover:bg-white active:scale-[0.98] transition-all font-bold text-base shadow-xl shadow-black/20 group flex items-center justify-center gap-3"
                                        >
                                            Get a Free Call
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                        
                                        <p className="text-[11px] text-center text-zinc-600 px-6">
                                            Secure & Confidential. <br />
                                            Join 500+ successful enterprises.
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Floating Decorative Elements */}
                        <motion.div 
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-6 -left-6 w-12 h-12 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 flex items-center justify-center -z-10"
                        >
                            <Sparkles className="w-5 h-5 text-zinc-500" />
                        </motion.div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
