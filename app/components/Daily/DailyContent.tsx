    import React from 'react';



    const DailyContent: React.FC= () => {
    return (
        
        <div className="min-h-screen flex flex-col items-center">
        <h1 className="text-4xl font-bold text-center mb-4">Chipotle Cheesy CHicken Burger</h1>
        <h2 className="text-xl text-center mb-4">A signature flame-grilled chicken patty topped with smoked beef</h2>
            <div className="  shadow-lg rounded-full flex items-center justify-center">
            <img src="/burger.png" alt="Description of Image" className="  mb-4" />
            </div>

            <div className=" mt-20 flex items-center space-x-12 "> 
                <div className="text-5xl font-bold items-center justify-center rounded-badge shadow-lg bg-green-500 hover:bg-green-600  ">
                    <h1 className="mt-20 flex items-center justify-center">Home Made</h1>
                        <div className="flex items-center justify-center">
                            <img src="/burger.png" alt="Description of Image" className="w-1/2 mb-20" />
                        </div>
                    </div>

                <div className="text-5xl font-bold items-center justify-center rounded-badge shadow-lg  ">
                    <h1 className="mt-20 flex items-center justify-center">Delivery</h1>
                        <div className="flex items-center justify-center">
                            <img src="/burger.png" alt="Description of Image" className="w-1/2 mb-20" />
                        </div>
                </div>

                
            </div>
            <div className='flex space-y-80'> 
            <text className='text-white'> 1</text>
            <text className='text-white'> 1 </text>
            </div>




        </div>
        

    );
    };

    export default DailyContent;