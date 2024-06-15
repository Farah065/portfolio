import Image from 'next/image';

function Icon(props) {
    return (
        <div className="cursor-pointer flex flex-col items-center w-max">
            <Image
                priority
                src={props.src}
                className="w-12"
                height="0"
                width="0"
                alt={props.alt}
            />
            <h6 className="font-medium text-sm text-wrap break-words max-w-18">Projects</h6>
        </div>
    );
}

export default Icon;