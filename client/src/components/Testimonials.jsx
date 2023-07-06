import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import NewTestimony from "./NewTestimony";
import axios from "axios";
import AuthContext from "@/context/AuthContext";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get(
        "https://ocean-allies-production.up.railway.app/api/testimony"
      );
      setTestimonials(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const hardcodedTestimonials = [
    {
      id: 1,
      name: "Noah Wilson",
      image: "/img/empresario.jpg",
      active: true,
      comment:
        "Ocean Allies has been a true guardian of marine life. Their relentless efforts to protect and save marine animals are commendable.",
    },
    {
      id: 2,
      name: "Matthew Johnson",
      image: "/img/hombreasd.jpg",
      active: true,
      comment:
        "I am grateful for the work Ocean Allies does to preserve our oceans. Their dedication to marine conservation is inspiring.",
    },
    {
      id: 3,
      name: "Michael Wright",
      image: "/img/empresario2.jpg",
      active: true,
      comment:
        "Ocean Allies is making a significant impact on the marine ecosystem. Their commitment to safeguarding marine wildlife is unparalleled.",
    },
    {
      id: 4,
      name: "John Smith",
      image: "/img/chino.jpg",
      active: true,
      comment:
        "Thanks to Ocean Allies, countless marine animals have been given a second chance at life. Their rescue and rehabilitation efforts are remarkable.",
    },
    {
      id: 5,
      name: "Maria Rodriguez",
      image: "/img/negra.jpg",
      active: true,
      comment:
        "I wholeheartedly support Ocean Allies mission to protect and restore the marine environment.They are true champions of the ocean.",
    },
    {
      id: 6,
      name: "Carlos Sanchez",
      image: "/img/hombre2.jpg",
      active: true,
      comment:
        "Ocean Allies tireless advocacy for marine conservation is making a difference. They are raising awareness and inspiring positive change.",
    },
    {
      id: 7,
      name: "Laura Davis",
      active: true,
      image: "/img/mujer2.jpg",
      comment:
        "Bringing ideas to life and leading cross-functional teams to deliver successful products is what I do best. I thrive in dynamic and fast-paced environments.",
    },
    {
      id: 8,
      name: "Michael Thompson",
      image: "/img/hombre3.jpg",
      active: true,
      comment:
        "The work Ocean Allies does to combat ocean pollution and promote sustainable practices is vital for the future of our planet.",
    },
    {
      id: 9,
      name: "Sophia Lee",
      image: "/img/mujer4.jpg",
      active: true,
      comment:
        "I ve witnessed firsthand the impact Ocean Allies has on marine ecosystems. Their dedication to preserving the beauty and biodiversity of our oceans is unmatched.",
    },
    {
      id: 10,
      name: "David Wilson",
      image: "/img/hombre5.jpg",
      active: true,
      comment:
        "Ocean Allies commitment to marine education and community outreach is empowering the next generation of ocean stewards.",
    },
  ];

  const combinedTestimonials = [...hardcodedTestimonials, ...testimonials];

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

  const getMaxCommentLength = () => {
    let maxLength = 0;
    combinedTestimonials.forEach((testimonial) => {
      if (testimonial.comment.length > maxLength) {
        maxLength = testimonial.comment.length;
      }
    });
    return maxLength;
  };

  const maxCommentLength = getMaxCommentLength();

  return (
    <div className="py-10">
      <h1 className="text-2xl font-bold text-center mb-8">Testimonials</h1>
      {isLoggedIn && <NewTestimony />}
      <Carousel
        responsive={responsive}
        autoPlay={true}
        infinite
        containerclassName="carousel-container"
        item
        className="carousel-item"
      >
        {combinedTestimonials.map((testimonial) => {
          if (!testimonial.active) {
            return null; // No renderizar el testimonio si active es false
          }

          return (
            <div key={testimonial.id} className="p-5 bg-white carousel-item">
              <div className="text-center">
                <div className="flex flex-col items-center">
                  <div className="mb-4">
                    {testimonial.image ? (
                      <Image
                        src={testimonial.image}
                        alt="avatar"
                        width={100}
                        height={100}
                        className="rounded-full shadow-1-strong"
                      />
                    ) : (
                      <img
                        src="/img/user.png"
                        alt="Imagen por defecto"
                        width={120}
                        height={120}
                        className="rounded-full shadow-1-strong"
                      />
                    )}
                  </div>
                  <h5 className="text-lg font-bold mb-3">{testimonial.name}</h5>
                </div>
              </div>
              <p className="text-gray-500 my-4">
                <i className="fas fa-quote-left pe-2"></i>
                {testimonial.comment}
              </p>
            </div>
          );
        })}
      </Carousel>

      <style jsx>{`
        .carousel-container {
          max-width: 960px;
          margin: 0 auto;
        }
        .carousel-item {
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: ${maxCommentLength * 1.5}px;
          width: auto;
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
