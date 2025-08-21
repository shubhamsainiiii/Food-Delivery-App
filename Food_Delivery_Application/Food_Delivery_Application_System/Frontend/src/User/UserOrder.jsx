// import React from 'react'
// import Cartpage from './../Pages/Cartpage';
// import UserSidebar from './UserSidebar';

// const UserOrder = () => {
//     return (
//         <div className='min-h-screen bg-gradient-to-br from-[#fff4e5] to-[#f7fafc]'>
//             <UserSidebar />
//             <Cartpage />
//         </div>
//     )
// }

// export default UserOrder


import React from 'react';
import Cartpage from './../Pages/Cartpage';
import UserSidebar from './UserSidebar';

const UserOrder = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#fff4e5] to-[#f7fafc]">
            <div className="flex">
                {/* Sidebar */}
                <div className="w-[250px] bg-white shadow-md min-h-screen">
                    <UserSidebar />
                </div>

                {/* Main Content */}
                <div className="flex-1 p-4">
                    <Cartpage />
                </div>
            </div>
        </div>
    );
};

export default UserOrder;   
