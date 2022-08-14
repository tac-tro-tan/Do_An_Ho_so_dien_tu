import React, { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from "react-router-dom";
import { FaList, FaPassport, FaPhone, FaDoorClosed, FaGripHorizontal } from "react-icons/fa";

function SideBer() {
    const [collap, setCollap] = useState(true);
    const showDropdown = (e) => {
        setCollap(false);
    }
    const hideDropdown = e => {
        setCollap(true);
    }
    const [scrolls, setScrolls] = useState('140')
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 70) {
                setScrolls('70');
            }
            else setScrolls('140');
        }
        window.addEventListener('scroll', handleScroll);
        //Cleanup function
        // xóa event khi hàm unmounted
        return (() => {
            window.removeEventListener('scroll', handleScroll);
        })
    }, []);
    let toptop = { top: `${scrolls}px`, backgroundColor: (collap) ? "transparent" : "#111" };
    return (
        <>
            <div className="sidenav" style={toptop} id="header2">
                <ProSidebar collapsed={collap} onMouseEnter={showDropdown} onMouseLeave={hideDropdown}>
                    <Menu >
                        <MenuItem icon={<FaList />}><Link to="/thongtincanhan">Thông tin cá nhân</Link></MenuItem>
                        <MenuItem icon={<FaList />}><Link to="/thongtincanbo" >Thông tin cán bộ</Link></MenuItem>
                        <MenuItem icon={<FaPhone />}><Link to="/datlichhen" >Đặt lịch hẹn</Link></MenuItem>
                        <MenuItem icon={<FaDoorClosed />}><Link to="/guiyeucau" >Gửi yêu cầu</Link></MenuItem>
                        <MenuItem icon={<FaGripHorizontal />}><Link to="/gopy" >Góp ý</Link></MenuItem>
                        <MenuItem icon={<FaPassport />}><Link to="/doimatkhau" >Đổi mật khẩu</Link></MenuItem>

                    </Menu>
                </ProSidebar>
            </div>
        </>
    );
}

export default SideBer;