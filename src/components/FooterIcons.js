"use client";

import Image from 'next/image';

function FooterIcons(props) {
    function focusWindow(id) {
        const index = props.order.indexOf(id);
        if (index !== -1) { // check if the index is valid
            let arr = [...props.order]; // copy the array
            arr.push(arr.splice(index, 1)[0]); // remove the element at the found index and append it to the end
            props.setOrder(arr); // update the state
        }
    }

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
            {props.windows && props.windows.map((window) => (
                <div
                    key={window.id}
                    className="border-r-2 border-beige-600 px-1 h-4/5"
                >
                    <button
                        className={props.order[props.order.length - 1] === window.id ?
                            "flex items-center gap-2 bg-beige-500 h-full px-2 border-r-[3px] border-b-[3px] border-beige-600"
                            : "flex items-center gap-2 h-full px-2 border-r-[3px] border-b-[3px] border-beige-400"} // add a border to the focused window's footer icon
                        onClick={() => focusWindow(window.id)}
                    >
                        <Image
                            priority
                            src={"/images/folder.svg"}
                            height="28"
                            width="28"
                            alt={"folder icon"}
                        />
                        <p className="font-medium text-sm">{window.title}</p>
                    </button>
                </div>
            ))}
        </div>
    );
}

export default FooterIcons;