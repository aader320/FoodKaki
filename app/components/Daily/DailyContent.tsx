    import React from 'react';



    const DailyContent: React.FC= () => {
    return (
        
        <div className="min-h-screen flex flex-col items-center mt-10">
        <h1 className="text-4xl font-bold text-center mb-4">Chipotle Cheesy CHicken Burger</h1>
        <h2 className="text-xl text-center mb-4">A signature flame-grilled chicken patty topped with smoked beef</h2>
            <div className="  shadow-lg rounded-full flex items-center justify-center">
            <img src="/burger.png" alt="Description of Image" className="  mb-4" />
            </div>

            <div className="m-5  flex items-center space-x-12  "> 
                <div className=" font-bold items-center justify-center rounded-badge shadow-lg bg-green-500 hover:bg-green-600  ">
                    <h1 className="mt-10 flex items-center justify-center text-md md:text-3xl">Home Made</h1>
                        <div className="flex items-center justify-center ">
                            <img src="/burger.png" alt="Description of Image" className="w-full sm:w-1/3 md:w-1/2 lg:w-3/4 mb-20" />
                        </div>
                    </div>

                <div className="m-5  font-bold items-center justify-center rounded-badge shadow-lg  ">
                    <h1 className="mt-10 flex items-center justify-center text-md md:text-3xl">Delivery</h1>
                        <div className="flex items-center justify-center">
                            <img src="/burger.png" alt="Description of Image" className="w-full sm:w-1/3 md:w-1/2 lg:w-3/4 mb-20" />
                        </div>
                </div>

                
            </div>
            <div className='flex space-y-20'> 
            <text className='text-white'> 1</text>
            <text className='text-white'> 1 </text>
            </div>




        </div>
        

    );
    };

    export default DailyContent;