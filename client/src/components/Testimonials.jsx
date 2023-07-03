import React from 'react';
import Image from 'next/image';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Testimonials = () => {
    const testimonials = [
        {
            id: 1,
            name: 'Noah Wilson',
            role: 'Assembler Developer',
            image: '/img/empresario.jpg',
            quote:
                'Ocean Allies has been a true guardian of marine life. Their relentless efforts to protect and save marine animals are commendable.',
            rating: 5,
        },
        {
            id: 2,
            name: 'Matthew Johnson',
            role: 'Social Media Creator',
            image: '/img/hombreasd.jpg',
            quote: 'I am grateful for the work Ocean Allies does to preserve our oceans. Their dedication to marine conservation is inspiring.',
            rating: 5,
        },
        {
            id: 3,
            name: 'Michael Wright',
            role: 'Content Creator',
            image: '/img/empresario2.jpg',
            quote:
                'Ocean Allies is making a significant impact on the marine ecosystem. Their commitment to safeguarding marine wildlife is unparalleled.',
            rating: 5,
        },
        {
            id: 4,
            name: 'John Smith',
            role: 'Software Engineer',
            image: '/img/chino.jpg',
            quote: 'Thanks to Ocean Allies, countless marine animals have been given a second chance at life. Their rescue and rehabilitation efforts are remarkable.',
            rating: 4,
        },
        {
            id: 5,
            name: 'Maria Rodriguez',
            role: 'UI/UX Designer',
            image: '/img/negra.jpg',
            quote:
                'I wholeheartedly support Ocean Allies mission to protect and restore the marine environment.They are true champions of the ocean.',
            rating: 4.5,
        },
        {
            id: 6,
            name: 'Carlos Sanchez',
            role: 'Full Stack Developer',
            image: '/img/hombre2.jpg',
            quote:
                'Ocean Allies tireless advocacy for marine conservation is making a difference. They are raising awareness and inspiring positive change.',
            rating: 4.8,
        },
        {
            id: 7,
            name: 'Laura Davis',
            role: 'Product Manager',
            image: '/img/mujer2.jpg',
            quote:
                'Bringing ideas to life and leading cross-functional teams to deliver successful products is what I do best. I thrive in dynamic and fast-paced environments.',
            rating: 4.7,
        },
        {
            id: 8,
            name: 'Michael Thompson',
            role: 'Data Scientist',
            image: '/img/hombre3.jpg',
            quote:
                'The work Ocean Allies does to combat ocean pollution and promote sustainable practices is vital for the future of our planet.',
            rating: 4.6,
        },
        {
            id: 9,
            name: 'Sophia Lee',
            role: 'Digital Marketer',
            image: '/img/mujer4.jpg',
            quote:
                'I ve witnessed firsthand the impact Ocean Allies has on marine ecosystems. Their dedication to preserving the beauty and biodiversity of our oceans is unmatched.',
            rating: 4.9,
        },
        {
            id: 10,
            name: 'David Wilson',
            role: 'Cybersecurity Expert',
            image: '/img/hombre5.jpg',
            quote:
                'Ocean Allies commitment to marine education and community outreach is empowering the next generation of ocean stewards.',
            rating: 4.8,
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
                containerclassName="carousel-container"
                item className="carousel-item"
            >
                {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="p-5 bg-white carousel-item">
                        <div className="text-center">
                            <div className="flex flex-col items-center">
                                <div className="mb-4">
                                    <Image
                                        src={testimonial.image}
                                        alt="avatar"
                                        width={100}
                                        height={100}
                                        className="rounded-full shadow-1-strong"
                                    />
                                </div>
                                <h5 className="text-lg font-bold mb-3">{testimonial.name}</h5>
                            </div>
                            <p>{testimonial.role}</p>
                        </div>
                        <p className="text-gray-500 my-4">
                            <i className="fas fa-quote-left pe-2"></i>
                            {testimonial.quote}
                        </p>
                    </div>
                ))}
            </Carousel>

            <style jsx>{`
                .carousel-container {
                    max-width: 960px;
                    margin: 0 auto;
                }

                .carousel-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: ${maxQuoteLength * 2.5}px;
                    width: 500px;
                    margin: 0 10px;
                    padding: 20px;
                    background-color: #fff;
                    border-radius: 10px;
                    box-shadow: 0 2px 60px rgba(0, 0, 0, 0.1);
                    text-align: center;
                }

                .carousel-item:hover {
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }

                .carousel-item:not(:last-child) {
                    margin-right: 20px;
                }

                .carousel-item:first-child {
                    margin-left: 20px;
                }

                .fas.fa-quote-left {
                    font-size: 20px;
                    position: relative;
                    top: 2px;
                }
            `}</style>
        </div>
    );
};

export default Testimonials;