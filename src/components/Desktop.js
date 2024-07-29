"use client";

import React, { useState, useEffect } from "react";
import Icon from "./Icon";
import Window from "./Windows/Window";
import Footer from "./Footer";

function Desktop({ children }) {
    const [windows, setWindows] = useState([]); // array of opened windows in the same order they were opened
    // each window is an object with an id and a title
    const [order, setOrder] = useState([-1]); // array of opened windows with changing order depending on the focused window
    // the last element is the focused window, second to last is behind it, and so on
    // -1 is used to indicate that no window is focused

    const [defaultPos, setDefaultPos] = useState({ x: 0, y: 0 }); // default position of the windows when they open
    const defaultSize = { // default size of the windows when they open
        width: 780,
        height: 500
    };

    // array of objects containing information about all the windows that can be opened
    const windowInfo = [
        {
            id: 1,
            title: "About",
            type: "pdf",
            src: "/images/text.svg",
            alt: "pdf icon"
        },
        {
            id: 2,
            title: "Frontend",
            type: "folder",
            src: "/images/folder.svg",
            alt: "folder icon"
        },
        {
            id: 3,
            title: "Fullstack",
            type: "folder",
            src: "/images/folder.svg",
            alt: "folder icon"
        },
        {
            id: 4,
            title: "Java",
            type: "folder",
            src: "/images/folder.svg",
            alt: "folder icon"
        },
        {
            id: 5,
            title: "Game Dev",
            type: "folder",
            src: "/images/folder.svg",
            alt: "folder icon"
        },
        {
            id: 6,
            title: "Other",
            type: "folder",
            src: "/images/folder.svg",
            alt: "folder icon"
        }
    ];

    useEffect(() => {
        // calculate the default position of the windows
        setDefaultPos({
            x: (window.innerWidth / 2 - 350) + (windows.length * 10),
            y: (window.innerHeight / 2 - 270) + (windows.length * 10)
        });

        // recalculate the default position of the windows when the window is resized
        const handleWindowResize = () => {
            setDefaultPos({
                x: window.innerWidth / 2 - 350,
                y: window.innerHeight / 2 - 270
            });
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, [windows.length]);

    function minimise(id) {
        let arr = [...order];
        const idx = arr.findIndex(el => el == id);
        arr.splice(idx, 1);
        arr.unshift(id); // move window to the beginning of the array to unfocus it
        setOrder(arr);

        // save the current position and size of the window before minimising it
        const pos = windows.find(window => window.id === id).position;
        const size = windows.find(window => window.id === id).size;
        setWindows(prevWindows =>
            prevWindows.map(win =>
                win.id === id ?
                    {
                        ...win,
                        size: { width: 300, height: 200 },
                        position: { x: window.innerWidth / 2, y: window.innerHeight + 200 },
                        prevSize: win.isFullScreen ? win.prevSize : size,
                        prevPos: win.isFullScreen ? win.prevPos : pos, // if the window is fullscreen, don't save the position and size (so as to not mess up un-fullscreening it)
                        isMinimised: true
                    }
                    : win
            )
        );
    }

    function maximise(id) {
        // focus the window
        const index = order.indexOf(id);
        if (index !== -1) {
            let arr = [...order];
            arr.push(arr.splice(index, 1)[0]); // remove the element at the found index and append it to the end
            setOrder(arr);
        }

        if (windows.find(window => window.id === id).isMinimised) { // if the window is minimised, maximise it
            let prevPos;
            let prevSize;
            if (windows.find(window => window.id === id).isFullScreen) { // if the window is fullscreen, set to fullscreen size and position
                prevPos = { x: 0, y: 0 };
                prevSize = { width: window.innerWidth, height: window.innerHeight - 46 };
            }
            else { // otherwise, set to the saved size and position
                prevPos = windows.find(window => window.id === id).prevPos;
                prevSize = windows.find(window => window.id === id).prevSize;
            }

            setWindows(prevWindows =>
                prevWindows.map(window =>
                    window.id === id
                        ? { ...window, size: prevSize, position: prevPos, isMinimised: false }
                        : window
                )
            );
        }
        else if (order[order.length - 1] === id) { // if the window is maximised, minimise it
            minimise(id);
        }
    }

    // generate a window component with the given id
    const generateWindow = (id) => <Window id={id}
        order={order} setOrder={setOrder}
        windows={windows} setWindows={setWindows}
        minimise={minimise} maximise={maximise}
        defaultSize={defaultSize} defaultPos={defaultPos}>
        {children}
    </Window>

    // generate an icon component for each window
    const generateIcons = windowInfo.map((win) =>
        <Icon src={win.src} alt={win.alt} title={win.title} type={win.type} id={win.id} key={win.id}
            windows={windows} setWindows={setWindows}
            order={order} setOrder={setOrder}
            defaultPos={defaultPos} defaultSize={defaultSize}
            maximise={maximise} />
    );

    return (
        <>
            <div className="p-4 grid gap-4 justify-items-center w-max">
                {generateIcons}
            </div>

            {/* desktop folders */}
            {windows.some(window => window.id === 1) && generateWindow(1)} {/* about pdf */}
            {windows.some(window => window.id === 2) && generateWindow(2)} {/* frontend */}
            {windows.some(window => window.id === 3) && generateWindow(3)} {/* fullstack */}
            {windows.some(window => window.id === 4) && generateWindow(4)} {/* Java */}
            {windows.some(window => window.id === 5) && generateWindow(5)} {/* game dev */}
            {windows.some(window => window.id === 6) && generateWindow(6)} {/* other */}

            {/* frontend projects */}
            {windows.some(window => window.id === 7) && generateWindow(7)} {/* little lemon */}
            {windows.some(window => window.id === 8) && generateWindow(8)} {/* donately */}
            {windows.some(window => window.id === 9) && generateWindow(9)} {/* portfolio */}

            {/* fullstack projects */}
            {windows.some(window => window.id === 10) && generateWindow(10)} {/* advising system */}

            {/* java projects */}
            {windows.some(window => window.id === 11) && generateWindow(11)} {/* javaDB */}
            {windows.some(window => window.id === 12) && generateWindow(12)} {/* TLOU: legacy */}

            {/* game dev projects */}
            {windows.some(window => window.id === 13) && generateWindow(13)} {/* flappy pong */}
            {windows.some(window => window.id === 14) && generateWindow(14)} {/* last punchline */}
            {windows.some(window => window.id === 15) && generateWindow(15)} {/* oathbound */}

            {/* other projects */}
            {windows.some(window => window.id === 16) && generateWindow(16)} {/* chess engine */}
            {windows.some(window => window.id === 17) && generateWindow(17)} {/* CA */}
            {windows.some(window => window.id === 18) && generateWindow(18)} {/* OS */}
            {windows.some(window => window.id === 19) && generateWindow(19)} {/* prolog scheduler */}

            <Footer windows={windows} setWindows={setWindows}
                order={order} setOrder={setOrder}
                minimise={minimise} maximise={maximise} />
        </>
    );
}

export default Desktop;