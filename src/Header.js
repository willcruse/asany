import React from 'react'
import ReactDOM from 'react-dom'

function Header() {
    return(
        <div className="header">
            <svg viewBox="0 0 500 500" preserveAspectRatio="xMinYMin meet">
            {/* M 1 62 C 93 85 139 45 295 65 C 429 84 470 75 500 67 L 500 0 L 0 0 Z */}
                <path d="M 1 62 C 93 85 139 45 295 65 C 429 84 470 75 500 67 L 500 0 L 0 0 Z" style={{stroke: "none"}}></path>
            </svg>

            <h1>Asany</h1>

            <div className="account">
                <div className="user-image"></div>
                <div className="username">Will Cruse</div>
            </div>
        </div>
    );
}

export default Header;