"use client";

import Image from 'next/image';

function FooterIcons({ windows, order, maximise }) {
    return (
        <div className="flex items-center h-full">
            <button className="-ml-4 border-r-2 border-beige-600 h-4/5">
                <Image
                    priority
                    src={"/images/settings.svg"}
                    height="40"
                    width="40"
                    alt={"settings icon"}
                />
            </button>
            {windows && windows.map((window) => (
                <div
                    key={window.id}
                    className="border-r-2 border-beige-600 px-1 h-4/5"
                >
                    <button
                        className={order[order.length - 1] === window.id ?
                            "flex items-center gap-2 bg-beige-500 h-full px-2 border-r-[3px] border-b-[3px] border-beige-600"
                            : "flex items-center gap-2 h-full px-2 border-r-[3px] border-b-[3px] border-beige-400"} // add a border to the focused window's footer icon
                        onClick={() => maximise(window.id)}
                    >
                        <Image
                            priority
                            src={window.type === "folder" ? "/images/folder.svg" : "/images/text.svg"}
                            height="28"
                            width="28"
                            alt={window.type === "folder" ? "folder icon" : "pdf icon"}
                        />
                        <p className="font-medium text-sm">{window.title.replace('.pdf','')}</p>
                    </button>
                </div>
            ))}
        </div>
    );
}

export default FooterIcons;