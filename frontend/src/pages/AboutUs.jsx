import { useState } from 'react'

const AboutUs = () => {

    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const [show4, setShow4] = useState(false);

    const toggleShow = (value) => {
        setShow1(false);
        setShow2(false);
        setShow3(false);
        setShow4(false);

        if (value === "value1") { setShow1(!show1) }
        else if (value === "value2") { setShow2(!show2) }
        else if (value === "value3") { setShow3(!show3) }
        else if (value === "value4") { setShow4(!show4) }
    };

    return (
        <div className='bg-gray-200 md:ml-[25%] min-h-screen flex justify-center'>
            <div className='bg-white w-[90%]'>
                {/* WHO WE ARE */}
                <div className='my-10'>
                    <h1 className='md:text-4xl text-2xl m-4 uppercase font-medium'>Who are We</h1>
                    <p className='m-4'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum officiis quam repellendus. Aspernatur veniam fuga incidunt? Deleniti animi, accusantium, id mollitia illo, eos voluptatibus fugiat eveniet officia quia saepe maiores?
                    </p>
                    <div className='my-10 w-full h-full flex justify-center'>
                        <img src="/CompanyLogo.png" alt="" />
                    </div>
                </div>
                {/* WE ARE ..... */}
                <div className='my-20'>
                    <h1 className='md:text-4xl text-2xl m-4 uppercase font-medium'>Our History</h1>
                    <p className='m-4'>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore sit, architecto officia hic eligendi debitis ad magnam iste labore cum cumque saepe exercitationem expedita culpa facilis similique aspernatur sunt optio!
                        Ex iste numquam quam explicabo necessitatibus reiciendis, earum nemo. Possimus, earum non. Accusantium corporis modi delectus nam! Labore illum nostrum possimus beatae impedit quibusdam nihil sed atque dolorum, iste culpa.
                    </p>
                </div>
                {/* VALUES */}
                <div>
                    <h1 className='md:text-4xl text-2xl m-4 uppercase font-medium'>Our Values</h1>
                    <div className="w-full grid grid-cols-2 text-center">
                        <div className={"mr-1 mb-1 md:p-20 p-10 cursor-pointer font-bold bg-[url('/TeamWork.jpg')] bg-cover bg-center hover:opacity-100" + (show1 ? " opacity-100" : " opacity-80")} onClick={() => toggleShow("value1")}>
                            <a href='#value1' className='block w-full bg-white'>Team Work</a>
                        </div>
                        <div className={"mb-1 md:p-20 p-10 cursor-pointer font-bold bg-[url('/CompanyProject.jpg')] bg-cover bg-center hover:opacity-100" + (show2 ? " opacity-100" : " opacity-80")} onClick={() => toggleShow("value2")}>
                            <a href='#value2' className='block w-full bg-white'>Company Project</a>
                        </div>
                        <div className={"mr-1 md:p-20 p-10 cursor-pointer text-center font-bold bg-[url('/Compromise.jpg')] bg-cover bg-center hover:opacity-100" + (show3 ? " opacity-100" : " opacity-80")} onClick={() => toggleShow("value3")}>
                            <a href='#value3' className='block w-full bg-white'>Compromise</a>
                        </div>
                        <div className={"md:p-20 p-10 cursor-pointer font-bold bg-[url('/Environment.jpg')] bg-cover bg-center hover:opacity-100" + (show4 ? " opacity-100" : " opacity-80")} onClick={() => toggleShow("value4")}>
                            <a href='#value4' className='block w-full bg-white'>Environment</a>
                        </div>
                    </div>

                    {show1 && (
                        <div className='p-4 my-4' id='value1'>
                            <h1 className='text-xl font-bold mb-4'>Team Work</h1>
                            <p className='text-s'>
                                At [COMPANY NAME], we understand that the sum is greater than its parts.
                                Our value of team work is rooted in creating a culture where diverse ideas converge, collaboration is encouraged, and collective success is celebrated.
                                Together, we leverage our shared strengths to achieve exceptional results.
                            </p>
                        </div>
                    )}
                    {show2 && (
                        <div className='p-4 my-4' id='value2'>
                            <h1 className='text-xl font-bold mb-4'>Company Project</h1>
                            <p className='text-s'>
                                Every company project at [COMPANY NAME] is a testament to our unwavering commitment to quality and excellence.
                                From inception to delivery, we ensure every detail reflects our high standards and our client&apos;s vision.
                            </p>
                        </div>
                    )}
                    {show3 && (
                        <div className='p-4 my-4' id='value3'>
                            <h1 className='text-xl font-bold mb-4'>Compromise</h1>
                            <p className='text-s'>
                                Compromise is integral to our ethos at [COMPANY NAME].
                                We strive for harmony in decision-making, ensuring that all voices are heard and valued.
                                Through compromise, we find innovative solutions that align with our varied stakeholders goals.
                            </p>
                        </div>
                    )}
                    {show4 && (
                        <div className='p-4 my-4' id='value4'>
                            <h1 className='text-xl font-bold mb-4'>Environment</h1>
                            <p className='text-s'>
                                Our dedication to the environment reflects in our operations at [COMPANY NAME].
                                We prioritize sustainable practices and eco-friendly solutions, aspiring to leave a positive footprint on the planet while delivering top-tier service.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AboutUs