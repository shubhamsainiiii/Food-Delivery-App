import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-12 px-6">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                    <div className="font-bold mb-4">ORDERIT</div>
                    <div>We offer flexible delivery...</div>
                    <div className="mt-4 space-x-2">
                        <button className="bg-white text-black px-2 py-1 rounded">Play Store</button>
                        <button className="bg-white text-black px-2 py-1 rounded">App Store</button>
                    </div>
                </div>
                <div>
                    <div className="font-semibold mb-2">Know More</div>
                    {['About Us', 'Services', 'FAQs', 'Contact Us'].map(t => <div key={t}>{t}</div>)}
                </div>
                <div>
                    <div className="font-semibold mb-2">Follow Us</div>
                    {['Dribble', 'Behance', 'Linkedin', 'Facebook', 'Instagram', 'Twitter'].map(t => <div key={t}>{t}</div>)}
                </div>
                <div>
                    <div className="font-semibold mb-2">Contact Us</div>
                    <div>contact@example.com</div>
                    <div>2800 Houston, TX</div>
                    <div>+1‑234‑456‑987</div>
                </div>
            </div>
            <div className="text-center text-gray-500 mt-4">
                &copy; {new Date().getFullYear()} Orderit. Design by Shreethemes.
            </div>

        </footer>
    );
}
