"use client";

import React, { useState, useEffect } from "react";
import Icon from "./Icon";
import Window from "./Window";
import Footer from "./Footer";

function Desktop() {
    const [windows, setWindows] = useState([]); // array of opened windows in the same order they were opened
                                                // each window is an object with an id and a title
    const [order, setOrder] = useState([-1]); // array of opened windows with changing order depending on the focused window
                                              // the last element is the focused window, second to last is behind it, and so on
                                              // -1 is used to indicate that no window is focused

    const [defaultPos, setDefaultPos] = useState({ x: 0, y: 0 }); // default position of the windows when they open
    const defaultSize = { // default size of the windows when they open
        width: 700,
        height: 500
    };

    useEffect(() => {
        // calculate the default position of the windows
        setDefaultPos({
            x: window.innerWidth / 2 - 350,
            y: window.innerHeight / 2 - 270
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
    }, []);

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
                        position: { x: window.innerWidth / 2, y: window.innerHeight + 200},
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

        if(windows.find(window => window.id === id).isMinimised) { // if the window is minimised, maximise it
            let prevPos;
            let prevSize;
            if(windows.find(window => window.id === id).isFullScreen) { // if the window is fullscreen, set to fullscreen size and position
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
        else if(order[order.length - 1] === id) { // if the window is maximised, minimise it
            minimise(id);
        }
    }

    return (
        <>
            <div className="p-4 flex flex-col gap-4">
                <Icon src="/images/folder.svg" alt="folder icon" title="projects 1" id={1}
                    windows={windows} setWindows={setWindows}
                    order={order} setOrder={setOrder}
                    defaultPos={defaultPos} defaultSize={defaultSize}
                    maximise={maximise} />
                <Icon src="/images/folder.svg" alt="folder icon" title="projects 2" id={2}
                    windows={windows} setWindows={setWindows}
                    order={order} setOrder={setOrder}
                    defaultPos={defaultPos} defaultSize={defaultSize}
                    maximise={maximise} />
                <Icon src="/images/folder.svg" alt="folder icon" title="projects 3" id={3}
                    windows={windows} setWindows={setWindows}
                    order={order} setOrder={setOrder}
                    defaultPos={defaultPos} defaultSize={defaultSize}
                    maximise={maximise} />
            </div>

            {windows.some(window => window.id === 1) &&
                <Window id={1} defaultSize={defaultSize}
                    order={order} setOrder={setOrder}
                    windows={windows} setWindows={setWindows}
                    minimise={minimise} />}
            {windows.some(window => window.id === 2) &&
                <Window id={2} defaultSize={defaultSize}
                    order={order} setOrder={setOrder}
                    windows={windows} setWindows={setWindows}
                    minimise={minimise} />}
            {windows.some(window => window.id === 3) &&
                <Window id={3} defaultSize={defaultSize}
                    order={order} setOrder={setOrder}
                    windows={windows} setWindows={setWindows}
                    minimise={minimise} />}

            <Footer windows={windows} setWindows={setWindows}
                order={order} setOrder={setOrder}
                minimise={minimise} maximise={maximise} />
        </>
    );
}

export default Desktop;