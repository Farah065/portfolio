import Icon from "../Icon";

function Folder({ id, windows, setWindows, order, setOrder, defaultPos, defaultSize, maximise, focusWindow }) {
    const generateIcon = (title, id) => <Icon
        src="/images/text.svg" alt="pdf icon" title={title} type="pdf" id={id}
        windows={windows} setWindows={setWindows}
        order={order} setOrder={setOrder}
        defaultPos={defaultPos} defaultSize={defaultSize}
        maximise={maximise} />

    return (
        <>
            <div className="h-9 flex items-center border-b border-coal-400 pr-1">
                <button className="w-8">
                    {"<"}
                </button>
                <button className="w-8">
                    {">"}
                </button>
                <div className="bg-beige-200 border border-coal-400 py-1 px-2 w-full">
                    <p className="text-xs font-medium">
                        C:\Users\farah\Desktop\{windows.find(window => window.id === id).title}
                    </p>
                </div>
            </div>
            <div className="flex-1 flex gap-6 p-4">
                {id === 2 &&
                    <>
                        {generateIcon("Donately", 7)}
                        {generateIcon("Little\nLemon", 8)}
                        {generateIcon("Portfolio", 9)}
                    </>
                }
                {id === 3 &&
                    <>
                        {generateIcon("Advising\nSystem", 10)}
                    </>
                }
                {id === 4 &&
                    <>
                        {generateIcon("JavaDB", 11)}
                        {generateIcon("TLOU:\nLegacy", 12)}
                    </>
                }
                {id === 5 &&
                    <>
                        {generateIcon("Flappy\nPong", 13)}
                        {generateIcon("Last\nPunchline", 14)}
                        {generateIcon("Oathbound", 15)}
                    </>
                }
                {id === 6 &&
                    <>
                        {generateIcon("Chess\nEngine", 16)}
                        {generateIcon("CA", 17)}
                        {generateIcon("OS", 18)}
                        {generateIcon("Prolog\nScheduler", 19)}
                    </>
                }
            </div>
        </>
    );
}

export default Folder;