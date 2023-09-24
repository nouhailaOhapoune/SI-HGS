import './App.css';
import LoginComponent from "./pages/LoginPage/components/LoginComponent/LoginComponent";
import {Routes,Route} from "react-router-dom";
import SignupComponent from "./pages/SignupPage/components/SignupComponent/SignupComponent";
import HomePage from "./pages/AccueilPage/HomePage";
import CongratsPage from "./pages/CongratsPage";
import EmployeesPage from "./pages/EmployeesPage/EmployeesPage";
import InternsPage from "./pages/InternsPage/InternsPage";
import {useEffect, useState} from "react";
import {UserContext} from "./pages/LoginPage/UserContext";
import HolidaysPage from "./pages/HolidaysPage/HolidaysPage";
import DocumentsPage from "./pages/DocumentsPage/DocumentsPage";
import LoanPage from "./pages/LoanPage/LoanPage";



function App() {
    const [userData, setUserData] = useState(() => {
        // Check if data exists in localStorage
        const localData = localStorage.getItem("userData");
        return localData ? JSON.parse(localData) : { nomComplet: '', jobTitle: '' };
    });

    useEffect(() => {
        // Save to local storage whenever userData changes
        localStorage.setItem("userData", JSON.stringify(userData));
    }, [userData]);

    return (
      <>
          <UserContext.Provider value={{ ...userData, setUserData }}>
                <Routes>
                    <Route path="/" element={<LoginComponent  />} />
                    <Route path="/signup" element={<SignupComponent/>} />
                    <Route path="/congrats" element={<CongratsPage/>} />
                    <Route path="/home" element={<HomePage/>} />
                    <Route path="/employees" element={<EmployeesPage/>} />
                    <Route path="/interns" element={<InternsPage/>} />
                    <Route path="/holidays" element={<HolidaysPage/>} />
                    <Route path="/documents" element={<DocumentsPage/>} />
                    <Route path="/loanManagement" element={<LoanPage/>} />
                </Routes>
          </UserContext.Provider>
      </>
  );
}

export default App;
