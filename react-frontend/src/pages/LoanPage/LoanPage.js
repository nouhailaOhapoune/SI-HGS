import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import SideBarComponent from "../../components/SideBarComponent/SideBarComponent";
import LoanTable from "./components/LoanTable/LoanTable";
import AddLoan from "./components/AddLoan/AddLoan";

function LoanPage(){
    return(
        <>
            <HeaderComponent />
            <SideBarComponent defaultSelectedKeys={['4']} />
            <AddLoan/>
            <LoanTable/>
        </>
    );
}
export default LoanPage;