function PDF({ id, windows, setWindows, order, setOrder, defaultPos, defaultSize, maximise, children }) {
    return (
        <>
            {/* pdf controls */}
            <div className="h-9 flex items-center justify-center border-b border-coal-400 pr-1 sticky top-0 w-full bg-beige-300 z-10 gap-8">
                <p className="text-xs">1/3</p>
                <div className="flex items-center justify-center">
                    <button>
                        +
                    </button>
                    <p className="text-xs">
                        100%
                    </p>
                    <button>
                        -
                    </button>
                </div>
            </div>

            {/* pdf pages */}
            <article className="flex justify-center h-[calc(100%-68px)]">
                {children}
            </article>
        </>
        // <>
        //     {windows.find(window => window.id === id).title === "About" &&
        //         <p className="p-2">
        //             Hello! I'm Farah, a 3rd year Computer Science Engineering student at the German University in Cairo.<br /><br />
        //             I'm a self-taught frontend developer with an eye for detail and a passion for creating beautiful and functional websites.<br />
        //             I'm proficient in HTML, CSS, and Javascript. My preferred framework is React, but I'm familiar with Next.js. I also use Figma to create all my designs!<br /><br />
        //             In addition, I'm experienced in OOP, particularly using Java, and have got a love for game development and have experience with Unity and C#.<br /><br />
        //             I'm always looking for opportunities to further develop my skills and gain experience in the field, so take a look at my projects and feel free to reach out!<br /><br />
        //             You can find me on <a href="https://www.linkedin.com/in/farah065/" target="_blank" rel="noreferrer"><span className="underline">LinkedIn</span></a> and <a href="https://github.com/farah065" target="_blank" rel="noreferrer"><span className="underline">Github</span></a> {":)"}
        //         </p>
        //     }
        //     {windows.find(window => window.id === id).title !== "About" &&
        //         <p className="p-2">
        //             {windows.find(window => window.id === id).title}
        //         </p>
        //     }
        // </>
    );
}

export default PDF;