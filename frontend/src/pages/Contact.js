import React from 'react';
import Layout from '../components/Layout';

import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

export const Contact = () => {
    return (
        <Layout>
            <div className="row contactus ">
                <div className="col-md-6 ">
                    <img
                        src="/imgs/ContactUs.jpg"
                        alt="contactus"
                        style={{ width: "100%" }}
                    />
                </div>
                <div className="col-md-4">
                    <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
                    <p className="text-justify mt-2">
                        You have any doubt? Don't hesitate to contact us:
                    </p>
                    <p className="mt-3">
                        <BiMailSend /> : www.example@ecommerceapp.com
                    </p>
                    <p className="mt-3">
                        <BiPhoneCall /> : 601 349 893
                    </p>
                    <p className="mt-3">
                        <BiSupport /> : 952 321 643
                    </p>
                </div>
            </div>        
        </Layout>
    )
}
