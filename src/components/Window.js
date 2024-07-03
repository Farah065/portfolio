"use client";

import React, { useState, useEffect } from 'react';

function Window({ id, defaultSize, order, setOrder, windows, setWindows, minimise }) {
    // variables for window dragging
    const [isDragging, setIsDragging] = useState(false); // state to determine if the window is being dragged
    const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 }); // state to store the position of the window when dragging started

    // variables for window resizing
    const minSize = {
        width: 200,
        height: 150
    };
    const [isResizing, setIsResizing] = useState(false); // state to determine if the window is being resized
    const [initialSize, setInitialSize] = useState(defaultSize); // state to store the size of the window when resizing started
    const [resizeDirection, setResizeDirection] = useState(''); // state to store the direction of the resize

    const [initialMouseOffset, setInitialMouseOffset] = useState({ x: 0, y: 0 }); // state to store the initial mouse position when dragging or resizing started

    const [canClose, setCanClose] = useState(false); // state to determine if the window can be closed

    function updateWindowPosition(pos) {
        setWindows(prevWindows =>
            prevWindows.map(window =>
                window.id === id
                    ? { ...window, position: pos }
                    : window
            )
        );
    }
    function getWindowPosition() {
        return windows.find(window => window.id === id).position;
    }

    function updatePrevPosition(pos) {
        setWindows(prevWindows =>
            prevWindows.map(window =>
                window.id === id
                    ? { ...window, prevPos: pos }
                    : window
            )
        );
    }
    function getPrevPosition() {
        return windows.find(window => window.id === id).prevPos;
    }

    function updateWindowSize(size) {
        setWindows(prevWindows =>
            prevWindows.map(window =>
                window.id === id
                    ? { ...window, size: size }
                    : window
            )
        );
    }
    function getWindowSize() {
        return windows.find(window => window.id === id).size;
    }

    function updatePrevSize(size) {
        setWindows(prevWindows =>
            prevWindows.map(window =>
                window.id === id
                    ? { ...window, prevSize: size }
                    : window
            )
        );
    }
    function getPrevSize() {
        return windows.find(window => window.id === id).prevSize;
    }

    function updateFullScreen(value) {
        setWindows(prevWindows =>
            prevWindows.map(window =>
                window.id === id
                    ? { ...window, isFullScreen: value }
                    : window
            )
        );
    }
    function getFullScreen() {
        return windows.find(window => window.id === id).isFullScreen;
    }

    useEffect(() => {
        const handleMouseMove = (event) => {
            if (isDragging) {
                const deltaX = event.clientX - initialMouseOffset.x; // event.clientX is the current mouse x position
                const deltaY = event.clientY - initialMouseOffset.y; // subtracting initial position from current position gives the distance moved by the mouse

                let newX = initialPosition.x + deltaX; // add the distance moved to the initial window position
                let newY = initialPosition.y + deltaY;
                
                const size = getWindowSize();

                newX = Math.max(-size.width + 120, Math.min(newX, window.innerWidth - 50)); // make sure the window does not go too far outside the viewport
                newY = Math.max(-20, Math.min(newY, window.innerHeight - 100));

                updateWindowPosition({ x: newX, y: newY });
            } else if (isResizing) {
                const deltaX = event.clientX - initialMouseOffset.x;
                const deltaY = event.clientY - initialMouseOffset.y;

                // calculate new dimensions and positions
                const resizeCalculations = {
                    'right': () => ({
                        newWidth: Math.max(initialSize.width + deltaX, minSize.width), // add the distance moved to the initial width
                        newHeight: initialSize.height,
                        newX: initialPosition.x,
                        newY: initialPosition.y
                    }),
                    'bottom': () => ({
                        newWidth: initialSize.width,
                        newHeight: Math.max(initialSize.height + deltaY, minSize.height), // make sure the new height is not less than the minimum height
                        newX: initialPosition.x,
                        newY: initialPosition.y
                    }),
                    'bottom-right': () => ({
                        newWidth: Math.max(initialSize.width + deltaX, minSize.width),
                        newHeight: Math.max(initialSize.height + deltaY, minSize.height),
                        newX: initialPosition.x,
                        newY: initialPosition.y
                    }),
                    'left': () => {
                        const newWidth = Math.max(initialSize.width - deltaX, minSize.width); // subtracting because width should decrease when x increases
                        // update position to give the effect of resizing from the left
                        // if new width is greater than the minimum width, displace the window by the distance moved
                        // else, displace the window by the maximum amount possible (difference between initial width and minimum width)
                        const newX = newWidth > minSize.width ? initialPosition.x + deltaX : initialPosition.x + initialSize.width - minSize.width;
                        return {
                            newWidth,
                            newHeight: initialSize.height,
                            newX,
                            newY: initialPosition.y
                        };
                    },
                    'top': () => {
                        const newHeight = Math.max(initialSize.height - deltaY, minSize.height);
                        const newY = newHeight > minSize.height ? initialPosition.y + deltaY : initialPosition.y + initialSize.height - minSize.height;
                        return {
                            newWidth: initialSize.width,
                            newHeight,
                            newX: initialPosition.x,
                            newY
                        };
                    },
                    'top-right': () => {
                        const newHeight = Math.max(initialSize.height - deltaY, minSize.height);
                        const newY = newHeight > minSize.height ? initialPosition.y + deltaY : initialPosition.y + initialSize.height - minSize.height;
                        return {
                            newWidth: Math.max(initialSize.width + deltaX, minSize.width),
                            newHeight,
                            newX: initialPosition.x,
                            newY
                        };
                    },
                    'bottom-left': () => {
                        const newWidth = Math.max(initialSize.width - deltaX, minSize.width);
                        const newX = newWidth > minSize.width ? initialPosition.x + deltaX : initialPosition.x + initialSize.width - minSize.width;
                        return {
                            newWidth,
                            newHeight: Math.max(initialSize.height + deltaY, minSize.height),
                            newX,
                            newY: initialPosition.y
                        };
                    },
                    'top-left': () => {
                        const newWidth = Math.max(initialSize.width - deltaX, minSize.width);
                        const newX = newWidth > minSize.width ? initialPosition.x + deltaX : initialPosition.x + initialSize.width - minSize.width;
                        const newHeight = Math.max(initialSize.height - deltaY, minSize.height);
                        const newY = newHeight > minSize.height ? initialPosition.y + deltaY : initialPosition.y + initialSize.height - minSize.height;
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

                // ensure window doesn't go out of bounds while resizing
                let constrainedX = (resizeDirection === "left" || resizeDirection === "top-left" || resizeDirection === "bottom-left") ?
                    Math.min(newX, window.innerWidth - 50) // minimum x position is window width - 50
                    : (resizeDirection === "right" || resizeDirection === "top-right" || resizeDirection === "bottom-right") ?
                        Math.max(newX, 120 - newWidth) // maximum x position is 120 - new width so 120 pixels of the window are always visible
                        : newX; // for top and bottom resize, x position remains the same

                const constrainedY = (resizeDirection === "top" || resizeDirection === "top-left" || resizeDirection === "top-right") ?
                    (event.clientY - initialMouseOffset.y > 0 ?
                        Math.min(newY, window.innerHeight - 100) // if the mouse is moving down while resizing from the top, maximum y position should keep 100 pixels of the window visible
                        : Math.max(newY, -20)) // if it's moving up, minimum y position should only cut off 20 pixels to keep the title bar visible
                    : newY; // for bottom, left, and right resize, y position remains the same

                // stop resizing if the window hits the border
                const constrainedHeight = resizeDirection === "top" || resizeDirection === "top-left" || resizeDirection === "top-right" ?
                    (constrainedY === -20 ?
                        initialSize.height + initialPosition.y + 20 // if at the top border, the maximum height is the initial height plus the distance from the top border
                        : constrainedY === window.innerHeight - 100 ?
                            initialSize.height - (window.innerHeight - 100 - initialPosition.y) // if at the bottom border, the minimum height is the initial height minus the distance from 100 pixels from the bottom of the screen
                            : newHeight) // if not at the border, the height stays the same
                    : newHeight; // if resizing from the bottom, left, or right, the height stays the same

                const constrainedWidth = (resizeDirection === "left" || resizeDirection === "top-left" || resizeDirection === "bottom-left") && constrainedX === window.innerWidth - 50 ?
                    initialSize.width - (window.innerWidth - 50 - initialPosition.x) // if at the right border, the minimum width is the initial width minus the distance from 50 pixels from the right of the screen
                    : (resizeDirection === "right" || resizeDirection === "top-right" || resizeDirection === "bottom-right") && constrainedX === 50 - newWidth ?
                        initialSize.width - (initialPosition.x + initialSize.width - 50) // if at the left border, the minimum width is the initial width minus the distance between the right edge and 50 pixels from the left of the screen
                        : newWidth;

                // if resizing stopped as a result of being at the left border, prevent changing the position (Math.max(newX, 50 - newWidth) found in constrainedX calculation above)
                // the reason the position continues changing in the first place is because the value is updated before the position is constrained, using newWidth (which is still updating)
                if (constrainedX === 50 - newWidth && constrainedWidth === initialSize.width - (initialPosition.x + initialSize.width - 50)) {
                    constrainedX = initialPosition.x;
                }

                // update the position and size
                updateWindowPosition({ x: constrainedX, y: constrainedY });
                updateWindowSize({ width: constrainedWidth, height: constrainedHeight });
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

    useEffect(() => {
        const handleWindowResize = () => {
            // only update the window size on browser window resize if it's in fullscreen mode and not minimised
            if (getFullScreen() && windows.find(window => window.id === id).isMinimised === false) {
                updateWindowSize({ width: window.innerWidth, height: window.innerHeight });
            }
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, [getFullScreen()]);

    function focusWindow() {
        const index = order.indexOf(id);
        if (index !== -1) { // check if the index is valid
            let arr = [...order]; // copy the array
            arr.push(arr.splice(index, 1)[0]); // remove the element at the found index and append it to the end
            setOrder(arr); // update the state
        }
    }

    function focusWindowClosing() {
        setCanClose(true); // ensure onMouseUp only triggers closeWindow after close button's onMouseDown (prevent accidental closing on drag from fullscreen)
        focusWindow();
    }

    function closeWindow() {
        if (canClose) {
            let arr = [...order];
            arr.splice(-1, 1); // remove the last element (window being closed should be focused, so it's at the end of the array)
            setOrder(arr);
            setWindows(windows.filter(window => window.id !== id)); // remove the window from the windows array
            setCanClose(false);
        }
    }

    function fullScreen() {
        focusWindow();
        if (getFullScreen()) {
            updateWindowSize(getPrevSize());
            updateWindowPosition(getPrevPosition()); // restore the previous size and position
        } else {
            updatePrevSize(getWindowSize());
            updatePrevPosition(getWindowPosition()); //store the size and position before going fullscreen
            updateWindowSize({ width: window.innerWidth, height: window.innerHeight - 46 }); // set the size to the window's inner dimensions (minus the footer height)
            updateWindowPosition({ x: 0, y: 0 }); // set the position to the top left corner
        }
        updateFullScreen(!getFullScreen());
        console.log(windows.find(window => window.id === id));
    }

    // function to handle the mousedown event on the window
    const handleMouseDown = (event) => {
        focusWindow();
        updateFullScreen(false);
        setIsDragging(true);
        setInitialMouseOffset({ x: event.clientX, y: event.clientY });
        if (getFullScreen()) {
            updateWindowSize(getPrevSize()); // restore the previous size before going full screen
            const mouseX = event.clientX / window.innerWidth; // calculate the mouse position as a percentage of the window width
            const sizeDiff = window.innerWidth - getPrevSize().width; // calculate the difference between the fullscreen width and the new width
            const pos = {
                x: mouseX * sizeDiff, // offset the x position depending on the mouse position (if closer to the right, the window should be more to the right etc.)
                y: getWindowPosition().y // keep the y position the same
            }
            updateWindowPosition(pos);
            setInitialPosition(pos); // set that as both the initial and current position
        }
        else {
            setInitialPosition(getWindowPosition()); // normal dragging, set the initial position to the current position
        }
        console.log(windows.find(window => window.id === id));
    };

    // function to handle the mousedown event on the resize handles
    const handleResizeMouseDown = (event, direction) => {
        focusWindow();
        setIsResizing(true);
        setResizeDirection(direction); // direction depends on the resize handle clicked
        setInitialMouseOffset({ x: event.clientX, y: event.clientY });
        setInitialPosition(getWindowPosition());
        setInitialSize(getWindowSize());
        event.stopPropagation();
    };

    return (
        <div
            className={isDragging || isResizing ? "bg-beige-300 absolute border-2 border-coal-400 no-select flex flex-col"
                : "bg-beige-300 absolute border-2 border-coal-400 no-select flex flex-col transition-all duration-300 ease-in-out"}
            style={{
                left: `${getWindowPosition().x}px`,
                top: `${getWindowPosition().y}px`,
                width: `${getWindowSize().width}px`,
                height: `${getWindowSize().height}px`,
                zIndex: order.indexOf(id) + 1
            }}
        >
            <div className="h-8 bg-beige-400 flex items-center border-b border-coal-400">
                <div
                    className="h-full w-full flex items-center"
                    onMouseDown={handleMouseDown}
                >
                    <h1 className="font-medium ml-2">File Manager</h1>
                </div>
                <div className="h-full shrink-0">
                    <button
                        className="w-8 border-l-2 border-coal-400 h-full"
                        onMouseDown={() => focusWindowClosing()}
                        onMouseUp={() => minimise(id)}
                    >
                        -
                    </button>
                    <button
                        className="w-8 border-l-2 border-coal-400 h-full"
                        onClick={() => fullScreen()}
                    >
                        ◻
                    </button>
                    <button
                        className="w-8 border-l-2 border-coal-400 h-full"
                        onMouseDown={() => focusWindowClosing()}
                        onMouseUp={() => closeWindow()}
                    >
                        X
                    </button>
                </div>
            </div>
            <div
                className="flex-1"
                onClick={() => focusWindow()}
            >
                <p className="p-2">Window number {id}</p>
            </div>

            {/* Disable resizing if in fullscreen mode */}
            {!getFullScreen() && <>
                {/* Resize handles */}
                <div
                    className="absolute -left-1 top-0 h-full w-1 cursor-ew-resize"
                    onMouseDown={(e) => handleResizeMouseDown(e, "left")}
                />
                <div
                    className="absolute -right-1 top-0 h-full w-1 cursor-ew-resize"
                    onMouseDown={(e) => handleResizeMouseDown(e, "right")}
                />
                <div
                    className="absolute left-0 -top-1 w-full h-1 cursor-ns-resize"
                    onMouseDown={(e) => handleResizeMouseDown(e, "top")}
                />
                <div
                    className="absolute left-0 -bottom-1 w-full h-1 cursor-ns-resize"
                    onMouseDown={(e) => handleResizeMouseDown(e, "bottom")}
                />

                {/* Corner handles */}
                <div
                    className="absolute -left-1 -top-1 w-2 h-2 cursor-nwse-resize"
                    onMouseDown={(e) => handleResizeMouseDown(e, "top-left")}
                />
                <div
                    className="absolute -right-1 -top-1 w-2 h-2 cursor-nesw-resize"
                    onMouseDown={(e) => handleResizeMouseDown(e, "top-right")}
                />
                <div
                    className="absolute -left-1 -bottom-1 w-2 h-2 cursor-nesw-resize"
                    onMouseDown={(e) => handleResizeMouseDown(e, "bottom-left")}
                />
                <div
                    className="absolute -right-1 -bottom-1 w-2 h-2 cursor-nwse-resize"
                    onMouseDown={(e) => handleResizeMouseDown(e, "bottom-right")}
                />
            </>}
        </div>
    );
}

export default Window;
