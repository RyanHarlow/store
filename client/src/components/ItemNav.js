import React from "react";
import '../css/ItemNav.css'

function ItemNav(props){
    return(
        <div className='item-nav'>

            <div className="dropdown is-hoverable">
                <div className="dropdown-trigger">
                    <button className="button" aria-haspopup="true" aria-controls="dropdown-menu4">
                        <span>Sort</span>
                    </button>
                </div>
                <div className="dropdown-menu" id="dropdown-menu4" role="menu">
                    <div className="dropdown-content">
                        <a href="#" className="dropdown-item">
                            Price high to low
                        </a>
                        <a href="#" className="dropdown-item">
                            Price low to high
                        </a>
                        <a href="#" className="dropdown-item">
                            Most Popular
                        </a>
                    </div>
                </div>
            </div>
            <p>Items 1-28 out of 130</p>
        </div>
    )
}

export default ItemNav;