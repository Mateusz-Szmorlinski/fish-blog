import React, { useState, useEffect } from 'react';
import "./Slider.css";
import { Link } from 'react-router-dom';


function ImageSlider({ slides }) {
    const [current, setCurrent] = useState(0);
    const [change, setChange] = useState(true);
    let length = slides.length;

    function nextSlide() {
        setChange(false)
        setCurrent(current === length - 1 ? 0 : current + 1);
    };

    function prevSlide() {
        setChange(false)
        setCurrent(current === 0 ? length - 1 : current - 1);
    };

    function handleDotClick(index) {
        setChange(false)
        setCurrent(index);
    };

    useEffect(() => {
        let timer;
        
        if (change) {
            timer = setInterval(() => {
                setCurrent(prev => prev === length - 1 ? 0 : prev + 1);
            }, 10 * 1000);
        }
    
        return () => {
            if (timer) {
                clearInterval(timer);
            }
        };
    }, [change, length]);

    useEffect(() => {
        let interactionTimer;
        console.log("slider "+slides);
    
        if (!change) {
            // Clear any existing timer and set a new one
            interactionTimer = setTimeout(() => {
                setCurrent(prev => prev === length - 1 ? 0 : prev + 1);
                setChange(true);
            }, 30 * 1000);
        }
    
        // Cleanup the timer when component unmounts or userInteracted changes
        return () => {
            if (interactionTimer) {
                clearTimeout(interactionTimer);
            }
        };
    }, [change]);

    // async function fetchImages() {
    //     try {
    //         let urls = await Promise.all(
    //             slides.map(slide => fetchImageURL("/images/" + slide.image))
    //         );
    //         setimagesURLs(urls);
    //     } catch (error) {
    //         console.error('Error fetching image URL:', error);
    //     }
    // };
  
    // 🛡️ Early return if no slides
    if (!slides || slides.length === 0 || !slides[current]) return null;
    
    
    return (
        <div className='slider'>
            <button className='arrow left' onClick={prevSlide}><img src="./icons/arrow.svg"/></button>
            <button className='arrow right' onClick={nextSlide}><img src="./icons/arrow.svg"/></button>
            <div className='image-wrapper'>
                <img src={slides[current].image}/>
                <Link to={"/posts/" + slides[current].title}>
                <div className='title-wrapper'>
                    <p className='gabriela-font'>{slides[current].title}</p>
                </div>
                </Link>
            </div>
            <div className="dots-container">
                {slides.map((slide, index) => (
                    <span
                        key={index}
                        className={`dot ${current === index ? 'active' : ''}`}
                        onClick={() => handleDotClick(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageSlider;
