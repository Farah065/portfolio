"use client";

import React, { useState, useEffect } from 'react';

function Window() {
    // variables for window dragging
    const [isDragging, setIsDragging] = useState(false); // state to determine if the window is being dragged
    const [position, setPosition] = useState({x:0, y:0}); // state to store the current position of the window
    const [initialPosition, setInitialPosition] = useState({x:0, y:0}); // state to store the position of the window when dragging started

    // variables for window resizing
    const defaultSize = {
        width: 700,
        height: 500
    };
    const [isResizing, setIsResizing] = useState(false); // state to determine if the window is being resized
    const [size, setSize] = useState(defaultSize); // state to store the current size of the window
    const [initialSize, setInitialSize] = useState(defaultSize); // state to store the size of the window when resizing started
    const [resizeDirection, setResizeDirection] = useState(''); // state to store the direction of the resize

    const [initialMouseOffset, setInitialMouseOffset] = useState({ x: 0, y: 0 }); // state to store the initial mouse position when dragging or resizing started
    
    useEffect(() => {
        // Update the position to center the window after the component mounts
        const defaultPos = {
            x: window.innerWidth / 2 - 350,
            y: window.innerHeight / 2 - 270
        };
        setPosition(defaultPos);
    }, []);

    useEffect(() => {
        const handleMouseMove = (event) => {
            if (isDragging) {
                const deltaX = event.clientX - initialMouseOffset.x; // event.clientX is the current mouse x position
                const deltaY = event.clientY - initialMouseOffset.y; // subtracting initial position from current position gives the distance moved by the mouse
                setPosition({ x: initialPosition.x + deltaX, y: initialPosition.y + deltaY }); // add the distance moved to the initial window position
            } else if (isResizing) {
                const minWidth = 200;
                const minHeight = 150;

                const deltaX = event.clientX - initialMouseOffset.x;
                const deltaY = event.clientY - initialMouseOffset.y;

                // Calculate new dimensions and positions
                const resizeCalculations = {
                    'right': () => ({
                        newWidth: Math.max(initialSize.width + deltaX, minWidth), // add the distance moved to the initial width
                        newHeight: initialSize.height,
                        newX: initialPosition.x,
                        newY: initialPosition.y
                    }),
                    'bottom': () => ({
                        newWidth: initialSize.width,
                        newHeight: Math.max(initialSize.height + deltaY, minHeight), // make sure the new height is not less than the minimum height
                        newX: initialPosition.x,
                        newY: initialPosition.y
                    }),
                    'bottom-right': () => ({
                        newWidth: Math.max(initialSize.width + deltaX, minWidth),
                        newHeight: Math.max(initialSize.height + deltaY, minHeight),
                        newX: initialPosition.x,
                        newY: initialPosition.y
                    }),
                    'left': () => {
                        const newWidth = Math.max(initialSize.width - deltaX, minWidth); // subtracting because width should decrease when x increases
                        // update position to give the effect of resizing from the left
                        // if new width is greater than the minimum width, displace the window by the distance moved
                        // else, displace the window by the maximum amount possible (difference between initial width and minimum width)
                        const newX = newWidth > minWidth ? initialPosition.x + deltaX : initialPosition.x + initialSize.width - minWidth;
                        return {
                            newWidth,
                            newHeight: initialSize.height,
                            newX,
                            newY: initialPosition.y
                        };
                    },
                    'top': () => {
                        const newHeight = Math.max(initialSize.height - deltaY, minHeight);
                        const newY = newHeight > minHeight ? initialPosition.y + deltaY : initialPosition.y + initialSize.height - minHeight;
                        return {
                            newWidth: initialSize.width,
                            newHeight,
                            newX: initialPosition.x,
                            newY
                        };
                    },
                    'top-right': () => {
                        const newHeight = Math.max(initialSize.height - deltaY, minHeight);
                        const newY = newHeight > minHeight ? initialPosition.y + deltaY : initialPosition.y + initialSize.height - minHeight;
                        return {
                            newWidth: Math.max(initialSize.width + deltaX, minWidth),
                            newHeight,
                            newX: initialPosition.x,
                            newY
                        };
                    },
                    'bottom-left': () => {
                        const newWidth = Math.max(initialSize.width - deltaX, minWidth);
                        const newX = newWidth > minWidth ? initialPosition.x + deltaX : initialPosition.x + initialSize.width - minWidth;
                        return {
                            newWidth,
                            newHeight: Math.max(initialSize.height + deltaY, minHeight),
                            newX,
                            newY: initialPosition.y
                        };
                    },
                    'top-left': () => {
                        const newWidth = Math.max(initialSize.width - deltaX, minWidth);
                        const newX = newWidth > minWidth ? initialPosition.x + deltaX : initialPosition.x + initialSize.width - minWidth;
                        const newHeight = Math.max(initialSize.height - deltaY, minHeight);
                        const newY = newHeight > minHeight ? initialPosition.y + deltaY : initialPosition.y + initialSize.height - minHeight;
                        return {
                            newWidth,
                            newHeight,
                            newX,
                            newY
                        };
                    }
                };

                // resizeCalculations is defined as an object with keys as the resize direction
                // square brackets are used to access a specific object property using the resizeDirection state
                // parentheses are used to call the function returned by the object property
                const { newWidth, newHeight, newX, newY } = resizeCalculations[resizeDirection]();

                // update the position and size
                setPosition({ x: newX, y: newY });
                setSize({ width: newWidth, height: newHeight });
            }
        };

        // stop dragging or resizing when the mouse button is released
        const handleMouseUp = () => {
            setIsDragging(false);
            setIsResizing(false);
        };

        // add event listeners for mousemove and mouseup events
        // mousedown is added to the window divs themselves (onMouseDown attribute)
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        // cleanup function to remove event listeners when the component unmounts
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, isResizing, initialMouseOffset, initialPosition, initialSize, resizeDirection]);


    // function to handle the mousedown event on the window
    const handleMouseDown = (event) => {
        setIsDragging(true);
        setInitialMouseOffset({ x: event.clientX, y: event.clientY });
        setInitialPosition({ x: position.x, y: position.y });
    };

    // function to handle the mousedown event on the resize handles
    const handleResizeMouseDown = (event, direction) => {
        setIsResizing(true);
        setResizeDirection(direction); // direction depends on the resize handle clicked
        setInitialMouseOffset({ x: event.clientX, y: event.clientY });
        setInitialPosition({ x: position.x, y: position.y });
        setInitialSize({ width: size.width, height: size.height });
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
