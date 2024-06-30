"use client";

import React, { useState } from "react";
import Icon from "./Icon";
import Window from "./Window";
import Footer from "./Footer";

function Desktop() {
    const [windows, setWindows] = useState([]);
    const [order, setOrder] = useState([]);

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
            {windows.some(window => window.id === 1) && <Window id={1} order={order} setOrder={setOrder} 
                                                            windows={windows} setWindows={setWindows} />}
            {windows.some(window => window.id === 2) && <Window id={2} order={order} setOrder={setOrder} 
                                                            windows={windows} setWindows={setWindows} />}
            {windows.some(window => window.id === 3) && <Window id={3} order={order} setOrder={setOrder} 
                                                            windows={windows} setWindows={setWindows} />}
            <Footer windows={windows} order={order} setOrder={setOrder} />
        </div>
    );
}

export default Desktop;