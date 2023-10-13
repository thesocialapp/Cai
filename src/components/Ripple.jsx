import React, { useState } from "react";
import './Ripple.css';

export default function Ripple() {
    const [ripples, setRipples] = useState([]);
    const rippleDuration = 1000; // Adjust the duration as needed

    const addRipple = (event) => {
        const { clientX, clientY } = event;
        const ripple = {
        x: clientX,
        y: clientY,
        key: Date.now(), // Unique key for React
        };

        setRipples((prevRipples) => [...prevRipples, ripple]);

        // Automatically remove the ripple after the animation duration
        setTimeout(() => {
        setRipples((prevRipples) => prevRipples.filter((r) => r.key !== ripple.key));
        }, rippleDuration);
    };


    return (
        <div className="ripple-container">
            {
                ripples.map((ripple) => (
                    <div
                        key={ripple.key}
                        className="ripple"
                        style={{
                            top: ripple.y,
                            left: ripple.x,
                            animationDuration: `${rippleDuration}ms`,
                        }}
                    />
                ))
            }
        </div>
    )
}