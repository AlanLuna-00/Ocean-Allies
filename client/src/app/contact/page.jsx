import React from 'react';
import Message from '@/components/Message';

const ContactForm = () => {
  return (
    <div className="bg-gray-100 py-8">
      <section className="max-w-4xl mx-auto px-4">
        <div className="bg-white shadow-xl rounded-lg p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4">Contact us</h2>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium,
              modi accusantium ipsum corporis quia asperiores dolorem nisi corrupti
              eveniet dolores ad maiores repellendus enim autem omnis fugiat
              perspiciatis? Ad, veritatis.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="text-center">
              <h3 className="text-lg font-bold mb-2">Address</h3>
              <p className="text-gray-600">New York, 94126, United States</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold mb-2">Phone</h3>
              <p className="text-gray-600">+01 234 567 89</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold mb-2">Email</h3>
              <p className="text-gray-600">info@gmail.com</p>
            </div>
          </div>
          <Message />
        </div>
      </section>
    </div>
  );
};

export default ContactForm;