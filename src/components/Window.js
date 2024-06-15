"use client";

import React, { useState, useEffect } from 'react';

function Window() {
    const defaultX = window.innerWidth / 2 - 350;
    const defaultY = window.innerHeight / 2 - 250;
    const [position, setPosition] = useState({ x: defaultX, y: defaultY });
    const [isDragging, setIsDragging] = useState(false);
    const [initialPosition, setInitialPosition] = useState({ x: defaultX, y: defaultY });

    useEffect(() => {
        const handleMouseMove = (event) => {
            if (isDragging) {
                const deltaX = event.clientX - initialPosition.x;
                const deltaY = event.clientY - initialPosition.y;
                setPosition({ x: deltaX, y: deltaY });
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, initialPosition]);

    const handleMouseDown = (event) => {
        setIsDragging(true);
        setInitialPosition({ x: event.clientX - position.x, y: event.clientY - position.y });
    };

    return (
        <div
            className="h-[500px] w-[700px] bg-beige-300 absolute border-2 border-coal-400"
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
            }}
        >
            <div
                className="h-8 bg-beige-500 flex items-center border-b border-coal-400"
                onMouseDown={handleMouseDown}
            >
                <h1 className="font-medium ml-2">File Manager</h1>
            </div>
        </div>
    );
}

export default Window;
