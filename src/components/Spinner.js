import React, { useEffect, useState } from 'react';
import logoAnimation from '../img/AnimatedLogo.mp4';

const Spinner = () => {
    const [showSpinner, setShowSpinner] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSpinner(false);
        }, 2000); 

        return () => clearTimeout(timer); 
    }, []);

    return (
        showSpinner ? (
            <div
                id="spinner"
                className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
            >
                <video
                    src={logoAnimation}
                    autoPlay
                    loop
                    muted
                    style={{ width: "200px", height: "200px", objectFit: "contain" }}
                />
            </div>
        ) : null
    );
};

export default Spinner;
