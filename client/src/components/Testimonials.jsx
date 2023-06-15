"use client"
import React from 'react';
import Image from 'next/image';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Testimonials = () => {
    const testimonials = [
        {
            id: 1,
            name: 'Alan Luna',
            role: 'Photographer',
            avatar: '/img/Alan.jpg',
            quote:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus et deleniti nesciunt sint eligendi reprehenderit reiciendis, quibusdam illo, beatae quia fugit consequatur laudantium velit magnam error. Consectetur distinctio fugit doloremque.',
            rating: 5,
        },
        {
            id: 2,
            name: 'Sebastian Aguzzi',
            role: 'TFT Expert',
            avatar: '',
            quote: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus et deleniti nesciunt sint eligendi reprehenderit reiciendis.',
            rating: 5,
        },
        {
            id: 3,
            name: 'Pablo Pissoni',
            role: 'UX Designer',
            avatar: '',
            quote:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus et deleniti nesciunt sint eligendi reprehenderit reiciendis, quibusdam illo, beatae quia fugit consequatur laudantium velit magnam error. Consectetur distinctio fugit doloremque.',
            rating: 5,
        },
    ];

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    };

    const getMaxQuoteLength = () => {
        let maxLength = 0;
        testimonials.forEach((testimonial) => {
            if (testimonial.quote.length > maxLength) {
                maxLength = testimonial.quote.length;
            }
        });
        return maxLength;
    };

    const maxQuoteLength = getMaxQuoteLength();

    return (
        <div className="py-10">
            <h1 className="text-2xl font-bold text-center mb-8">Testimonials</h1>
            <Carousel
                responsive={responsive}
                infinite
                containerClass="carousel-container"
                itemClass="carousel-item"
            >
                {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="p-5 bg-white carousel-item">
                        <div className="text-center">
                            <Image
                                src={testimonial.avatar}
                                alt="avatar"
                                width={150}
                                height={150}
                                className="rounded-full shadow-1-strong mb-4"
                            />
                            <h5 className="text-lg font-bold mb-3">{testimonial.name}</h5>
                            <p>{testimonial.role}</p>
                        </div>
                        <p className="text-gray-500 my-4">
                            <i className="fas fa-quote-left pe-2"></i>
                            {testimonial.quote}
                        </p>
                        <ul className="flex justify-center text-yellow-500 mb-0">
                            {[...Array(testimonial.rating)].map((_, index) => (
                                <li key={index}>
                                    <i className="fas fa-star fa-sm"></i>
                                </li>
                            ))}
                            {[...Array(5 - testimonial.rating)].map((_, index) => (
                                <li key={index}>
                                    <i className="far fa-star fa-sm"></i>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </Carousel>

            <style jsx>{`
                .carousel-container {
                    max-width: 960px;
                    margin: 0 auto;
                }

                .carousel-item {
                    height: ${maxQuoteLength * 1.5}px;
                    weight: 200px;
                    
                }
            `}</style>
        </div>
    );
};

export default Testimonials;