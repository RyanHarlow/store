import React from 'react';
import '../css/SideMenu.css'

function SideMenu(props){
    return(
        <aside className="menu category-menu">
            <p className="menu-label">
                Categories
            </p>
            <ul className="menu-list">
                <li><a>Desktop Computers</a></li>
                <li>
                    <a>Laptops</a>
                    <ul>
                        <li><a>Gaming</a></li>
                        <li><a>Business</a></li>
                        <li><a>Personal</a></li>
                    </ul>
                </li>
                <li><a>Tablets</a></li>
                <li><a>Phones</a></li>
                <li><a>Headphones</a></li>
                <li><a>Mouse</a></li>
                <li><a>Keyboards</a></li>
                <li><a>Monitors</a></li>
            </ul>
        </aside>
    )
}

export default SideMenu;