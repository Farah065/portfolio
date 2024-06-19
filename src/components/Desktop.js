"use client";

import React, { useState } from "react";
import Icon from "./Icon";
import Window from "./Window";

function Desktop(props) {
    const [windows, setWindows] = useState([]);

    return (
        <div>
            <div className="p-4">
                <Icon src="/images/folder.svg" alt="folder icon" title="projects 1" id={1}
                    windows={windows} setWindows={setWindows} />
                <Icon src="/images/folder.svg" alt="folder icon" title="projects 2" id={2}
                    windows={windows} setWindows={setWindows} />
                <Icon src="/images/folder.svg" alt="folder icon" title="projects 3" id={3}
                    windows={windows} setWindows={setWindows} />
            </div>
            {windows.includes(1) && <Window id={1} windows={windows} setWindows={setWindows} />}
            {windows.includes(2) && <Window id={2} windows={windows} setWindows={setWindows} />}
            {windows.includes(3) && <Window id={3} windows={windows} setWindows={setWindows} />}
            {props.children}
        </div>
    );
}

export default Desktop;