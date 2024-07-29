function PDF({ id, windows, setWindows, order, setOrder, defaultPos, defaultSize, maximise, children }) {
    function zoomIn() {
        setWindows(prevWindows =>
            prevWindows.map(window =>
                window.id === id && window.zoom < 2
                    ? { ...window, zoom: window.zoom + 0.1 }
                    : window
            )
        );
    }
    
    function zoomOut() {
        setWindows(prevWindows =>
            prevWindows.map(window =>
                window.id === id && window.zoom > 0.6
                    ? { ...window, zoom: window.zoom - 0.1 }
                    : window
            )
        );
    }

    return (
        <>
            {/* pdf controls */}
            <div className="h-9 flex items-center justify-center border-b border-coal-400 pr-1 sticky top-0 w-full bg-beige-300 z-10 gap-8">
                <p className="text-xs">1/1</p>
                <div className="flex items-center justify-center gap-2">
                    <button onClick={() => zoomOut()}>
                        -
                    </button>
                    <p className="text-xs w-[29px] text-center">
                        {Math.floor(windows.find(window => window.id === id).zoom * 100)}%
                    </p>
                    <button onClick={() => zoomIn()}>
                        +
                    </button>
                </div>
            </div>

            {/* pdf pages */}
            <div className="h-[calc(100%-68px)] overflow-auto custom-scrollbar">
                <article className="flex">
                    <div
                        className="flex flex-col gap-4 shrink-0 items-center h-full ml-auto mr-auto p-4"
                        style={{
                            width: `${730 * windows.find(window => window.id === id).zoom}px`,
                            fontSize: `${16 * windows.find(window => window.id === id).zoom}px`
                        }}
                    >
                        {children}
                    </div>
                </article>
            </div>
        </>
    );
}

export default PDF;