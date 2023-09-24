import React, {useState} from "react";
import SideBarComponent from "../../components/SideBarComponent/SideBarComponent";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import DashboardComponent from "./Components/DashboardComponent/DashboardComponent";

function HomePage(){

    return(
        <>
            <HeaderComponent />
            <SideBarComponent/>
            <DashboardComponent/>
        </>
    );
}

export default HomePage;