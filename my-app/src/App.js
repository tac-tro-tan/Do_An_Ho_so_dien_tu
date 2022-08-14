import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
//import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import 'react-pro-sidebar/dist/css/styles.css';
import 'react-notifications/lib/notifications.css';

import Login from "./components/login.component";
import Nabar from './components/navbar.component';
import Home from './components/Home.component';
import CaNhan from './components/dichVuCong/xemThongTin/caNhan';
import CanBo from './components/dichVuCong/xemThongTin/canBo';
import GuiYeuCau from './components/dichVuCong/yeuCau/guiYeuCau';
import GopY from './components/GopY';
import DatLich from './components/dichVuCong/henLich/datLich';
import SideBer from './components/dichVuCong/sideBar/sideBar';
import DoiMatKhau from './components/dichVuCong/DoiMatKhau';
import Footer from './components/footer/footer';

import { useSelector } from "react-redux";
import GioiThieu from './components/GioiThieu';
import HuongDan from './components/HuongDan';
import { selectLogin } from './store/loginSlice';

function App() {
  const {user:{cmnd}} = useSelector(selectLogin);

  return (<>
    <Router>
      <div className="App">
        <Nabar/>
        <div className="d-flex flex-row">
          {cmnd?<div>
              <SideBer/>
          </div>:<div></div>}
          
          <div className='minibody'>
            <Routes>
              <Route exact path="/" element={<Home/>}/>
              <Route path="/gopy" element={<GopY/>}/>
              <Route path="/huongdan" element={<HuongDan/>}/>
              <Route path="/sign-in" element={<Login/>} />
              <Route path="/thongtincanhan" element={<CaNhan/>} />
              <Route path="/thongtincanbo" element={<CanBo/>} />
              <Route path="/guiyeucau" element={<GuiYeuCau/>} />
              <Route path="/datlichhen" element={<DatLich/>} />
              <Route path="/doimatkhau" element={<DoiMatKhau/>} />
              <Route path="/gioithieu" element={<GioiThieu/>} />
              
            </Routes>
          </div>
        </div>
        <Footer/>
      </div>
    </Router>
    </>
  );
}

export default App;