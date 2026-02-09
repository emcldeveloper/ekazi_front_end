import React from "react";
const FooterLogo = () => {
    return (
        <div>
            <a href="{{route('about')}}">
                <img
                    src="/logo1.png"
                    alt="Profile"
                    className="w-64 h-32 object-cover rounded-full"
                />
            </a>

            <p id="footers">
                 
            </p>
        </div>

    )
}
export default FooterLogo;