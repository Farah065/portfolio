"use client";

import { useState } from "react";

function DateTime() {
    const d = new Date();
    const [date, setDate] = useState(d);
    setInterval(updateTime, 1000); // update the time every second

    function updateTime() {
        setDate(new Date());
    }

    return (
        <>
            <p className="text-xs font-medium">
                {date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
            </p>
            <p className="text-xs font-medium">
                {date.toLocaleDateString()}
            </p>
        </>
    );
}

export default DateTime;