import React, { useCallback, useEffect, useRef, useState } from "react";
import "./Slides.css";

const ImageSlider = ({ slides, parentWidth }) => {
    const timerRef = useRef(null);

    const [currentIndex, setCurrentIndex] = useState(0);

    const goToNext = useCallback(() => {
        const isLast = currentIndex === slides.length - 1;
        const newIndex = isLast ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }, [currentIndex, slides]);

    const goToPrevious = () => {
        const isFirst = currentIndex === 0;
        const newIndex = isFirst ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    useEffect(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => {
            goToNext();
        }, 4000);
        return () => clearTimeout(timerRef.current);
    }, [goToNext]);

    return (
        <div className="slider">
            <div className="left-arrow" onClick={goToPrevious}>
                ❰
            </div>
            <div className="right-arrow" onClick={goToNext}>
                ❱
            </div>
            <div
                className="slide-container"
                style={{
                    transform: `translateX(-${currentIndex * 100}%)`, // Use translateX to slide the images
                }}
            >
                {slides.map((slide, slideIndex) => (
                    <div
                        key={slideIndex}
                        className="slide-inner"
                        style={{ backgroundImage: `url(${slide.url})` }}
                    ></div>
                ))}
            </div>
            <div className="dots-container">
                {slides.map((slide, slideIndex) => (
                    <div
                        className={`dots ${slideIndex === currentIndex ? "active" : ""}`}
                        key={slideIndex}
                        onClick={() => setCurrentIndex(slideIndex)}
                    >
                        •
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageSlider;
