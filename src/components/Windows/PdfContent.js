"use server";

import Image from 'next/image';

function PdfContent() {
    return (
        <>
            <div className="page">
                <h1>About</h1>
                <br />
                <Image
                    priority
                    src="/images/folder.svg"
                    height={0}
                    width={0}
                    alt="folder icon"
                    style={{ width: '30%', float: 'right', margin: '0 0 1em 1em' }}
                />
                <p>
                    Hello! I'm Farah, a 3rd year Computer Science Engineering student at the German University in Cairo.<br /><br />
                    I'm a self-taught frontend developer with an eye for detail and a passion for creating beautiful and functional websites.<br />
                    My technical skills include proficiency in HTML, CSS, and JavaScript. I prefer working with React, but I'm also familiar with Next.js. Additionally, I design all my projects using Figma.<br /><br />
                    Beyond frontend development, I have a strong foundation in Object-Oriented Programming (OOP) with Java and a deep enthusiasm for game development. I've gained hands-on experience with Unity and C#.<br /><br />
                    I'm always looking for opportunities to further develop my skills and gain experience in the field, so take a look at my projects and feel free to reach out!<br /><br />
                    You can find me on <a href="https://www.linkedin.com/in/farah065/" target="_blank" rel="noreferrer"><span className="underline">LinkedIn</span></a> and <a href="https://github.com/farah065" target="_blank" rel="noreferrer"><span className="underline">Github</span></a> {":)"}
                </p>
            </div>
        </>
    );
}

export default PdfContent;