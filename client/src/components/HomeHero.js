import React from 'react';
import '../css/HomeHero.css'

function HomeHero(props){

    return(
        <section className="hero home-hero">
            <div className="hero-body home-hero-body">

                <div className='hero-content'>
                    <div>
                        <h1 className="title">
                            Macbook Air
                        </h1>
                        <h2 className="subtitle">
                            On Sale Now
                        </h2>
                        <h2 className="subtitle">
                            $1399.99
                        </h2>
                    </div>
                    <img className={'hero-img'} src="/static/laptop.jpg" alt=""/>
                </div>

            </div>
        </section>
    );
}

export default HomeHero;