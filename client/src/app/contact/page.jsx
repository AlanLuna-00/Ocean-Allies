import React from 'react';
import Message from '@/components/Message';

const ContactForm = () => {
  return (
    <div className=" py-8 bg-slate-300 bg-cover" style={{ backgroundImage: "url(/img/gente-limpiando-basura-naturaleza.jpg)" }}>
      <section className="max-w-4xl mx-auto px-4 ">
      
        <div className=" shadow-xl rounded-lg p-8 bg-neutral-300 bg-opacity-60">
          <div className="mb-8 mx-auto  rounded-lg bg-slate-200 shadow-xl p-6">
            <h2 className="text-3xl font-bold mb-4">Contact Us!</h2>
            <p className="text-gray-600">
            We are thrilled to hear your feedback, questions, or suggestions. At Ocean Allies,
             we are passionate about the aquatic world and strive to provide a space where life and the ocean come together.
             Whether you want to learn more about our projects,
             collaborate with us, or simply share your love for the sea, feel free to get in touch.
            </p>
            <p className="text-gray-600 mt-4">
            We will be delighted to respond to your inquiries and assist you in any way we can.
             We look forward to hearing from you soon!
            </p>
            <h3 className="text-lg font-serif italic  p-8" >Ocean Allies Team.</h3>
          </div>
          
          <Message/>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8 mb-8 mx-auto rounded-lg bg-slate-200 shadow-xl p-6">
            <div className="text-center">
              <h3 className="text-lg font-bold mb-2">Our Address:</h3>
              <p className="text-gray-600">Argentina, 5000</p>
            </div>

            <div className="text-center">
              <h3 className="text-lg font-bold mb-2">Phone:</h3>
              <p className="text-gray-600">+01 234 567 89</p>
            </div>
            
            <div className="text-center">
              <h3 className="text-lg font-bold mb-2">Email</h3>
              <p className="text-gray-600">info@oceanallies.com</p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default ContactForm;