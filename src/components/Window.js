"use client";

import React, { useState, useEffect } from 'react';

function Window() {
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({x:0, y:0});
    const [initialPosition, setInitialPosition] = useState({x:0, y:0});

    const defaultSize = {
        width: 700,
        height: 500
    };
    const [isResizing, setIsResizing] = useState(false);
    const [size, setSize] = useState(defaultSize);
    const [initialSize, setInitialSize] = useState(defaultSize);
    const [resizeDirection, setResizeDirection] = useState('');
    
    useEffect(() => {
        // Update the position to center the window after the component mounts
        const defaultPos = {
            x: window.innerWidth / 2 - 350,
            y: window.innerHeight / 2 - 270
        };
        setPosition(defaultPos);
        setInitialPosition(defaultPos);
    }, []);

    useEffect(() => {
        const handleMouseMove = (event) => {
            if (isDragging) {
                const deltaX = event.clientX - initialPosition.x;
                const deltaY = event.clientY - initialPosition.y;
                setPosition({ x: deltaX, y: deltaY });
            } else if (isResizing) {
                const resizeHandlers = {
                    'right': () => {
                        const newWidth = Math.max(initialSize.width + (event.clientX - initialPosition.x), 200);
                        setSize({ ...size, width: newWidth });
                    },
                    'bottom': () => {
                        const newHeight = Math.max(initialSize.height + (event.clientY - initialPosition.y), 150);
                        setSize({ ...size, height: newHeight });
                    },
                    'bottom-right': () => {
                        const newWidth = Math.max(initialSize.width + (event.clientX - initialPosition.x), 200);
                        const newHeight = Math.max(initialSize.height + (event.clientY - initialPosition.y), 150);
                        setSize({ width: newWidth, height: newHeight });
                    },
                    'left': () => {
                        const newWidth = Math.max(initialSize.width - (event.clientX - initialPosition.x), 200);
                        setPosition({ ...position, x: initialPosition.x + (event.clientX - initialPosition.x)});
                        setSize({ ...size, width: newWidth });
                    },
                    'top': () => {
                        const newHeight = Math.max(initialSize.height - (event.clientY - initialPosition.y), 150);
                        setPosition({ ...position, y: initialPosition.y + (event.clientY - initialPosition.y) });
                        setSize({ ...size, height: newHeight });
                    },
                    'top-right': () => {
                        const newWidth = Math.max(initialSize.width + (event.clientX - initialPosition.x), 200);
                        const newHeight = Math.max(initialSize.height - (event.clientY - initialPosition.y), 150);
                        setPosition({ ...position, y: initialPosition.y + (event.clientY - initialPosition.y) });
                        setSize({ width: newWidth, height: newHeight });
                    },
                    'bottom-left': () => {
                        const newWidth = Math.max(initialSize.width - (event.clientX - initialPosition.x), 200);
                        const newHeight = Math.max(initialSize.height + (event.clientY - initialPosition.y), 150);
                        setPosition({ ...position, x: initialPosition.x + (event.clientX - initialPosition.x) });
                        setSize({ width: newWidth, height: newHeight });
                    },
                    'top-left': () => {
                        const newWidth = Math.max(initialSize.width - (event.clientX - initialPosition.x), 200);
                        const newHeight = Math.max(initialSize.height - (event.clientY - initialPosition.y), 150);
                        setPosition({ ...position, x: initialPosition.x + (event.clientX - initialPosition.x), y: initialPosition.y + (event.clientY - initialPosition.y) });
                        setSize({ width: newWidth, height: newHeight });
                    }
                };
                resizeHandlers[resizeDirection]();
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            setIsResizing(false);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, isResizing, initialPosition, initialSize, resizeDirection, size, position]);

    const handleMouseDown = (event) => {
        setIsDragging(true);
        setInitialPosition({ x: event.clientX - position.x, y: event.clientY - position.y });
    };

    const handleResizeMouseDown = (event, direction) => {
        setIsResizing(true);
        setInitialPosition({ x: event.clientX, y: event.clientY });
        setInitialSize({ width: size.width, height: size.height });
        setResizeDirection(direction);
        event.stopPropagation();
    };

    return (
        <div
            className="bg-beige-300 absolute border-2 border-coal-400 no-select"
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                width: `${size.width}px`,
                height: `${size.height}px`
            }}
        >
            <div
                className="h-8 bg-beige-500 flex items-center border-b border-coal-400"
                onMouseDown={handleMouseDown}
            >
                <h1 className="font-medium ml-2">File Manager</h1>
            </div>
            
            {/* Resize handles */}
            <div
                className="absolute -left-1 top-0 h-full w-1 cursor-ew-resize"
                onMouseDown={(e) => handleResizeMouseDown(e, 'left')}
            />
            <div
                className="absolute -right-1 top-0 h-full w-1 cursor-ew-resize"
                onMouseDown={(e) => handleResizeMouseDown(e, 'right')}
            />
            <div
                className="absolute left-0 -top-1 w-full h-1 cursor-ns-resize"
                onMouseDown={(e) => handleResizeMouseDown(e, 'top')}
            />
            <div
                className="absolute left-0 -bottom-1 w-full h-1 cursor-ns-resize"
                onMouseDown={(e) => handleResizeMouseDown(e, 'bottom')}
            />

            {/* Corner handles */}
            <div
                className="absolute -left-1 -top-1 w-2 h-2 cursor-nwse-resize"
                onMouseDown={(e) => handleResizeMouseDown(e, 'top-left')}
            />
            <div
                className="absolute -right-1 -top-1 w-2 h-2 cursor-nesw-resize"
                onMouseDown={(e) => handleResizeMouseDown(e, 'top-right')}
            />
            <div
                className="absolute -left-1 -bottom-1 w-2 h-2 cursor-nesw-resize"
                onMouseDown={(e) => handleResizeMouseDown(e, 'bottom-left')}
            />
            <div
                className="absolute -right-1 -bottom-1 w-2 h-2 cursor-nwse-resize"
                onMouseDown={(e) => handleResizeMouseDown(e, 'bottom-right')}
            />
        </div>
    );
}

export default Window;
