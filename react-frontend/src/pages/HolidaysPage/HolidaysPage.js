import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import SideBarComponent from "../../components/SideBarComponent/SideBarComponent";
import HolidaysTable from "./components/HolidaysTable/HolidaysTable";
import AddHoliday from "./components/AddHoliday/AddHoliday";

function HolidaysPage(){
    return(
        <>
            <HeaderComponent />
            <SideBarComponent defaultSelectedKeys={['3']} />
            <AddHoliday/>
            <HolidaysTable/>
        </>
    );

}
export default HolidaysPage;