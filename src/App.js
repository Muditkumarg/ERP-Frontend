import DashboardPage from "./component/AdminPannel/DashBord/DashBoard";
import SchoolMasterPage from "./component/AdminPannel/Master/SchoolMaster/SchoolMaster";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SessionMasterPage from "./component/AdminPannel/Master/SessionMaster/SessionMaster";
import DefineFeeLocationMaster from "./component/AdminPannel/Master/DefineFeeLocation/DefineFeeLocationMaster";
import ClassMaster from "./component/AdminPannel/Master/ClassMaster/ClassMaster";
import ClassSectionMaster from "./component/AdminPannel/Master/ClassSectionMaster/ClassSectionMaster";
import StreamMaster from "./component/AdminPannel/Master/StreamMaster/StreamMaster";
import HouseMaster from "./component/AdminPannel/Master/HouseMaster/HouseMaster";
import DoccumentMaster from "./component/AdminPannel/Master/DoccumentMaster/DoccumentMaster";
import AdminSignUp from "./Pages/AdminSignUp/SignUp";
import Login from "./Pages/LoginPage/UserLogin";
import BloodGroupMaster from "./component/AdminPannel/Master/BloodGroupMaster/BloodGroupMaster";
import CastCategoryMaster from "./component/AdminPannel/Master/CastCategryMaster/CastCategoryMaster";
import MaritalStatusMaster from "./component/AdminPannel/Master/MaritalStatusMaster/MaritalStatus";
import ReligionMaster from "./component/AdminPannel/Master/ReligionMaster/Religion";
import StateCityMaster from "./component/AdminPannel/Master/StateCityMaster/StateCityMaster";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/sign-up" element={<AdminSignUp />} />
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/schoolmaster" element={<SchoolMasterPage />} />
          <Route path="/sessionmaster" element={<SessionMasterPage />} />
          <Route
            path="/definefeelocmater"
            element={<DefineFeeLocationMaster />}
          />
          <Route path="/classmaster" element={<ClassMaster />} />
          <Route path="/classsectionmaster" element={<ClassSectionMaster />} />
          <Route path="/streammaster" element={<StreamMaster />} />
          <Route path="/housemaster" element={<HouseMaster />} />
          <Route path="/doccumentmaster" element={<DoccumentMaster />} />
          <Route path="/blood-group-master" element={<BloodGroupMaster />} />
          <Route
            path="/cast-category-master"
            element={<CastCategoryMaster />}
          />
          <Route
            path="/marital-status-master"
            element={<MaritalStatusMaster />}
          />
          <Route path="/religion-master" element={<ReligionMaster />} />
          <Route path="/state-city-master" element={<StateCityMaster />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
