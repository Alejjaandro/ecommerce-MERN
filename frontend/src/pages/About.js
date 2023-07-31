import React from 'react'
import Layout from '../components/Layout'

export const About = () => {
    return (
        <Layout>
            <div className="row contactus ">
                <div className="col-md-6 ">
                    <img
                        src="/imgs/AboutUs.jpg"
                        alt="contactus"
                        style={{ width: "100%" }}
                    />
                </div>
                <div className="col-md-4">
                    <h1 className="bg-dark p-2 text-white text-center">ABOUT US</h1>
                    <p className="text-justify mt-2">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure quo mollitia voluptate sequi id! Ipsa quasi fugiat quisquam eligendi aspernatur eius recusandae repudiandae, aperiam obcaecati odio consequuntur dolor itaque laborum!5
                    </p>
                </div>
            </div>
        </Layout>
    )
}
