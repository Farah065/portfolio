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

    return (
        <div>
            <div className="p-4 flex flex-col gap-4">
                <Icon src="/images/folder.svg" alt="folder icon" title="projects 1" id={1}
                    windows={windows} setWindows={setWindows}
                    order={order} setOrder={setOrder} />
                <Icon src="/images/folder.svg" alt="folder icon" title="projects 2" id={2}
                    windows={windows} setWindows={setWindows}
                    order={order} setOrder={setOrder} />
                <Icon src="/images/folder.svg" alt="folder icon" title="projects 3" id={3}
                    windows={windows} setWindows={setWindows}
                    order={order} setOrder={setOrder} />
            </div>
            
            {windows.some(window => window.id === 1) &&
                <Window id={1} defaultPos={defaultPos}
                    order={order} setOrder={setOrder}
                    windows={windows} setWindows={setWindows} />}
            {windows.some(window => window.id === 2) &&
                <Window id={2} defaultPos={defaultPos}
                    order={order} setOrder={setOrder}
                    windows={windows} setWindows={setWindows} />}
            {windows.some(window => window.id === 3) &&
                <Window id={3} defaultPos={defaultPos}
                    order={order} setOrder={setOrder}
                    windows={windows} setWindows={setWindows} />}

            <Footer windows={windows} order={order} setOrder={setOrder} />
        </div>
    );
}

export default Desktop;