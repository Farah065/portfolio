import Image from 'next/image';

function Icon(props) {
    function openWindow() {
        if (!props.windows.includes(props.id)) {
            props.setWindows([...props.windows, props.id]);
        }
        else {
            const index = props.windows.indexOf(props.id);
            if (index !== -1) {
                let arr = [...props.windows];
                arr.push(arr.splice(index, 1)[0]);
                props.setWindows(arr);
            }
        }
    }

    return (
        <button className="flex flex-col items-center w-max" onDoubleClick={openWindow}>
            <Image
                priority
                src={props.src}
                className="w-12"
                height="0"
                width="0"
                alt={props.alt}
            />
            <h6 className="font-medium text-sm text-wrap break-words max-w-18">{props.title}</h6>
        </button>
    );
}

export default Icon;