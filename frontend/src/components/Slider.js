import { useEffect, useState } from 'react';

// Styles
import './styles/Slider.css';

// Icons
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';

// Context
import { useProducts } from '../context/ProductsContext';

export default function Slider() {
    // we extract what we need form context.
    const {getSliderImages, sliderImages} = useProducts();

    useEffect(() => { getSliderImages() }, []);
    
    const [slide, setSlide] = useState(0);
    const nextSlide = () => {
        /* 
        This condition checks that {slide} doesn't pass the length of dataImg, because it won't show any image.

        We create a sort of loop where {slide} can increment in 1 until it reach {dataImg.length - 1} 
        (-1 because the array idx start in 0, not in 1), once it reach that value, {slide} is set to 0, starting
        the loop again.
        */
        setSlide(
            slide !== sliderImages.length - 1 ? slide + 1 : 0
        );
    }

    const prevSlide = () => {
        // Same as above but to decrease.
        setSlide(
            slide !== 0 ? slide - 1 : sliderImages.length - 1
        );
    }

    return (
        <div className="slider-container">
            <BsArrowLeftCircleFill className='arrow arrow-left' onClick={prevSlide} />

            { sliderImages && sliderImages.map((img, index) => {
                return (
                    <img
                        className={slide === index ? "slide" : "slide slide-hidden"}
                        src={img}
                        alt=""
                        key={index}
                    />
                );
            })}

            <BsArrowRightCircleFill className='arrow arrow-right' onClick={nextSlide} />

            <span className='indicators'>
                {sliderImages.map((_, index) => {
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