import React from 'react';
import '../css/Home.css'
import HomeHero from "./HomeHero";
import SideMenu from "./SideMenu";
import ItemNav from './ItemNav'

function Home(props){

    return(
        <div>
            <HomeHero />
            <SideMenu />
            <div className={'main-content-container'}>
            <ItemNav />
            </div>
        </div>
    )
}

export default Home;