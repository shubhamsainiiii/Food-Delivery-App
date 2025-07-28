import React from 'react';

const Stats = () => {
    const stats = [
        { value: '1.5 Lacs+', label: 'Restaurants' },
        { value: '20 Million+', label: 'App Users' },
        { value: '1000+', label: 'Cities' },
        { value: '5 Billion+', label: 'Orders Delivered' }
    ];

    return (
        <section
            className="relative bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: 'url("https://shreethemes.in/orderit/layouts/assets/images/bg/cta1.png")',
                height: '600px',
            }}
        >
            {/* Dark overlay for contrast */}
            <div className="absolute inset-0 bg-white/10 z-0"></div>

            {/* Glassmorphism Box */}
            <div className="absolute inset-15 flex justify-center items-end pb-12 z-10">
                <div className="backdrop-blur-sm bg-white/0 border border-white/30 rounded-xl shadow-sm shadow-gray-300 px-10 py-8 text-center w-[100%] max-w-6xl">
                    <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">
                        Better food for more people
                    </h2>
                    <p className="text-black mb-6 max-w-3xl mx-auto">
                        We offer flexible delivery options tailored to your needs—whether it’s urgent same-day supplies, or specialty products.
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-black">
                        {stats.map((item) => (
                            <div key={item.label}>
                                <h3 className="text-xl font-bold">{item.value}</h3>
                                <p className="text-sm mt-1 text-black">{item.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Stats;
