import Image from 'next/image';

function Icon(props) {
    function openWindow() {
        if (!props.windows.some(window => window.id === props.id)) { // if some window with the same id doesn't exist
            props.setWindows([...props.windows, {id: props.id, title: props.title}]);
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

    return (
        <button className="flex flex-col items-center w-max" onDoubleClick={openWindow}>
            <Image
                priority
                src={props.src}
                height="44"
                width="44"
                alt={props.alt}
            />
            <h6 className="font-medium text-xs text-wrap break-words max-w-18">{props.title}</h6>
        </button>
    );
}

export default Icon;