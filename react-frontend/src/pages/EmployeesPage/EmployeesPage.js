import SideBarComponent from "../../components/SideBarComponent/SideBarComponent";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import AddEmployee from "./components/AddEmployee/AddEmployee";
import EmployeesTable from "./components/EmployeesTable/EmployeesTable";
import SearchBarComponent from "../../components/SearchBarComponent/SearchBarComponent";

function EmployeesPage(){

    return(
        <>
            <HeaderComponent />
            <SideBarComponent defaultSelectedKeys={['1']} />
            <AddEmployee/>
            <EmployeesTable/>
        </>
    );
}

export default EmployeesPage;