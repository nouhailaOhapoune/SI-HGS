import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import SideBarComponent from "../../components/SideBarComponent/SideBarComponent";
import DocumentsTable from "./components/DocumentsTable/DocumentsTable";
import AddDocument from "./components/AddDocument/AddDocument";

function DocumentsPage(){
    return(
        <>
            <HeaderComponent />
            <SideBarComponent defaultSelectedKeys={['5']} />
            <AddDocument/>
            <DocumentsTable/>
        </>
    );
}
export default DocumentsPage;