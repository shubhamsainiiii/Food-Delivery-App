import React, { useState } from 'react';
import { FaLock } from 'react-icons/fa';

const OtpVerify = () => {
    const [verified, setVerified] = useState(false);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#39244a] via-[#522b53] to-[#5a6a91] px-3 py-12">
            <div className="w-full max-w-sm mx-auto rounded-[2.5rem] p-8 bg-white/10 shadow-2xl backdrop-blur-2xl border border-white/30 relative" style={{ boxShadow: '0 8px 60px 8px rgba(60,24,110,0.4)' }}>
                <h1 className="text-2xl font-bold text-center text-white mb-6">Verify OTP</h1>
                {!verified ? (
                    <form
                        className="space-y-2"
                        onSubmit={e => {
                            e.preventDefault();
                            setVerified(true);
                        }}
                    >
                        <div className="relative mb-8">
                            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70" size={18} />
                            <input
                                type="text"
                                placeholder="Enter OTP"
                                required
                                className="w-full pl-12 pr-4 py-3 rounded-md bg-white/10 text-white border-0 outline-none placeholder-white/60 text-base"
                                style={{ background: 'transparent' }}
                            />
                            <div className="absolute left-0 right-0 bottom-[-2px] border-t border-white/20"></div>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 rounded-xl bg-gradient-to-r from-[#6055dd] via-[#a366d9] to-[#9f3e71] text-white font-semibold tracking-widest text-lg shadow-md hover:opacity-95 transition"
                            style={{ letterSpacing: "1px" }}
                        >
                            Verify
                        </button>
                    </form>
                ) : (
                    <p className="text-center mt-4 text-indigo-100">
                        OTP Verified! You can now reset your password.
                    </p>
                )}
            </div>
        </div>
    );
};

export default OtpVerify;
