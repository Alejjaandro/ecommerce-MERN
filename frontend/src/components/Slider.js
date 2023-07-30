import { useState } from 'react';

// Styles
import './Slider.css';

// Icons
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';

// Products imgs
import dataImg from '../data/sliderData.json';

function Slider() {

    const productsImg = dataImg.slides;

    const [slide, setSlide] = useState(0);

    const nextSlide = () => {
        /* 
        This condition checks that {slide} doesn't pass the length of dataImg, because it won't show any image.

        We create a sort of loop where {slide} can increment in 1 until it reach {dataImg.length - 1} 
        (-1 because the array idx start in 0, not in 1), once it reach that value, {slide} is set to 0, starting
        the loop again.
        */
        setSlide(
            slide !== productsImg.length - 1 ? slide + 1 : 0
        );
    }

    const prevSlide = () => {
        // Same as above but to decrease.
        setSlide(
            slide !== 0 ? slide - 1 : productsImg.length - 1
        );
    }

    return (
        <div className="slider-container">
            <BsArrowLeftCircleFill className='arrow arrow-left' onClick={prevSlide} />

            {productsImg.map((img, index) => {
                return (
                    <img
                        className={slide === index ? "slide" : "slide slide-hidden"}
                        src={img.src}
                        alt={img.alt}
                        key={index}
                    />
                );
            })}

            <BsArrowRightCircleFill className='arrow arrow-right' onClick={nextSlide} />

            <span className='indicators'>
                {productsImg.map((_, index) => {
                    return (
                        <button
                            key={index}
                            className={slide === index ? "indicator" : "indicator ind-inactive"}
                            onClick={null}
                        >
                        </button>
                    );
                })}

            </span>
        </div>
    );
}

export default Slider;