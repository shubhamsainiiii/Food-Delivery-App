import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQ() {
    const qas = [
        { q: 'How does it work?', a: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
        { q: 'Do I need a designer?', a: 'No, our system is designed for easy use without a designer.' },
        { q: 'What’s the pricing model?', a: 'We offer monthly and yearly subscription options.' },
        { q: 'Can I cancel anytime?', a: 'Yes, you can cancel anytime without any additional charges.' },
        { q: 'Is my data secure?', a: 'Absolutely, we use industry-standard security protocols.' },
    ];

    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="max-w-3xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            {qas.map((item, index) => {
                const isOpen = openIndex === index;

                return (
                    <div key={index} className="mb-4 rounded-2xl overflow-hidden shadow-sm shadow-gray-400">
                        {/* Question */}
                        <button
                            onClick={() => toggle(index)}
                            className="w-full flex justify-between items-center px-6 py-5 bg-gray-100 text-gray-900 font-semibold focus:outline-none"
                        >
                            <span>{item.q}</span>
                            <span className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                                <ChevronDown className="w-5 h-5" />
                            </span>
                        </button>

                        {/* Answer */}
                        <div
                            className={`bg-[#1c2a3a] text-white text-base leading-relaxed px-6 overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px] py-5 opacity-100' : 'max-h-0 py-0 opacity-0'
                                }`}
                        >
                            {item.a}
                        </div>
                    </div>
                );
            })}
        </section>
    );
}
