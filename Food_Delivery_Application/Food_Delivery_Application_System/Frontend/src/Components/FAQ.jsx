import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import faqImage from "../assets/faq.svg";

const FAQ = () => {
    const faqs = [
        { q: "I want to track my order", a: "You can track your order in the 'My Orders' section of your account." },
        { q: "I want to manage my order", a: "Go to 'My Orders' to cancel or modify your order before dispatch." },
        { q: "I did not receive Instant Cashback", a: "Instant Cashback reflects within 24 hours. Please wait or contact support." },
        { q: "I am unable to pay using wallet", a: "Ensure your wallet is funded and try again. Contact support if needed." },
        { q: "I want help with returns & refunds", a: "Check our Returns Policy under the Help section for more info." },
    ];

    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="bg-gradient-to-br from-[#faebd7] to-[#f7fafc] py-12 mt-18">
            <div className="max-w-7xl mx-auto">
                {/* Centered Heading */}
                <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
                    Frequently Asked Questions
                </h2>

                {/* FAQ Section Layout */}
                <div className="flex flex-col md:flex-row items-center gap-10">
                    {/* Left Image */}
                    <div className="flex-1 flex justify-center">
                        <img
                            src={faqImage}
                            alt="FAQ Illustration"
                            className="w-[90%] max-w-md object-contain"
                        />
                    </div>

                    {/* Right Accordion */}
                    <div className="flex-1 w-full">
                        {faqs.map((faq, index) => {
                            const isOpen = openIndex === index;

                            return (
                                <div
                                    key={index}
                                    className="mb-4 rounded-2xl overflow-hidden shadow-sm shadow-gray-400 transition-all duration-200 bg-white "
                                >
                                    <button
                                        onClick={() => toggle(index)}
                                        className="w-full flex justify-between items-center px-6 py-5 bg-gray-100 text-gray-900 font-semibold focus:outline-none cursor-pointer"
                                    >
                                        <span>{faq.q}</span>
                                        <ChevronDown
                                            className={`w-5 h-5 transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                                        />
                                    </button>

                                    <div
                                        className={`bg-[#1c2a3a] text-white text-base leading-relaxed px-6 overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-[500px] py-5 opacity-100" : "max-h-0 py-0 opacity-0"
                                            }`}
                                    >
                                        {faq.a}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
