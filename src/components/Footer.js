"use client";

import FooterIcons from "./FooterIcons";
import DateTime from "./DateTime";

function Footer(props) {
    return (
        <footer className="absolute bottom-0 bg-beige-400 w-full h-12 border-t-2 border-coal-400 z-50 flex items-center justify-between px-4">
            <div className="h-full">
                <FooterIcons windows={props.windows} order={props.order} setOrder={props.setOrder} />
            </div>
            <div className="text-right">
                <DateTime />
            </div>
    	</footer>
    );
}
  
export default Footer;