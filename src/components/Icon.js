import Image from 'next/image';

function Icon(props) {
    function openWindow() {
        if (!props.windows.some(window => window.id === props.id)) { // if some window with the same id doesn't exist
            props.setWindows([...props.windows, {
                id: props.id,
                title: props.title,
                type: props.type,
                size: props.defaultSize, // the current size of the window
                position: props.defaultPos, // the current position of the window
                prevSize: props.defaultSize, // the previous size of the window before fullscreen/minimise
                prevPos: props.defaultPos, // the previous position of the window before fullscreen/minimise
                isMinimised: false,
                isFullScreen: false
            }]);
            props.setOrder([...props.order, props.id]);
        }
        else {
            const index = props.order.indexOf(props.id);
            if (index !== -1) {
                let arr = [...props.order];
                arr.push(arr.splice(index, 1)[0]);
                props.setOrder(arr);
            }
        }
    }

    function handleDoubleClick() {
        // if the window is already open and minimised, maximise it
        if(props.windows.some(window => window.id === props.id) && props.windows.find(window => window.id === props.id).isMinimised === true) {
            props.maximise(props.id);
        }
        else { // if the window is not open or is minimised, open or focus it
            openWindow();
        }
    }

    return (
        <button
            className="flex flex-col items-center w-max gap-1"
            onDoubleClick={handleDoubleClick}
        >
            <Image
                priority
                src={props.src}
                height="48"
                width="48"
                alt={props.alt}
            />
            <h6 className="font-medium text-xs text-wrap break-words whitespace-pre-wrap tracking-tight w-16">
                {props.title}
            </h6>
        </button>
    );
}

export default Icon;