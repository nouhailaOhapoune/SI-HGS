import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import SideBarComponent from "../../components/SideBarComponent/SideBarComponent";
import AddIntern from "./components/AddIntern/AddIntern";
import InternsTable from "./components/InternsTable/InternsTable";
import SearchBarComponent from "../../components/SearchBarComponent/SearchBarComponent";

function InternsPage(){

    return(
        <>
            <HeaderComponent/>
            <SideBarComponent defaultSelectedKeys={['2']} />
            <AddIntern/>
            <InternsTable/>
        </>
    );
}
export default InternsPage;