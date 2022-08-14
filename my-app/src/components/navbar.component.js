import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
    Navbar,
    Nav,
    NavDropdown,
    Container,
    Overlay,
    Popover
} from 'react-bootstrap';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { selectLogin, updateLogin } from "../store/loginSlice";
import React from "react";
import { FaBell } from "react-icons/fa";

function Nabar() {
    //thông báo
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const ref = useRef(null);
    const handleClick1 = (event) => {
        setShow(!show);
        setTarget(event.target);
    };
    const [danhSachThongBao, setDanhSachThongBao] = useState([])
    useEffect(() => {
        fetch('https://backendcnpmem.herokuapp.com/api/ThongBao')
            .then(res => {
                return res.json();
            })
            .then(data => {
                data = data.reverse().slice(0,4);
                data.forEach(toi => {
                    if (toi.createdAt !== undefined) {
                        let k = toi.createdAt.split('T')[0];
                        toi.createdAt = k.split("-").reverse().join("-");
                    };
                })
                setDanhSachThongBao(data);
            })
    }, [show])

    const [scrolls, setScrolls] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 70) {
                setScrolls(true);
            }
            else setScrolls(false);
        }
        window.addEventListener('scroll', handleScroll);
        //Cleanup function
        // xóa event khi hàm unmounted
        return (() => {
            window.removeEventListener('scroll', handleScroll);
        })
    }, []);
    let backgroud = { backgroundColor: (scrolls) ? "#111" : "transparent" };

    // data đăng nhập
    const { user: { name } } = useSelector(selectLogin);
    const dispatch = useDispatch();
    function handleClick() {
        dispatch(updateLogin(""));
    }
    return (
        <>
            <Navbar variant="dark" bg="transparent" expand="lg" >
                <Navbar.Brand href="/"><img
                    src="https://inkythuatso.com/uploads/images/2021/09/logo-cong-an-09-13-27-02.jpg-09-13-27-02.jpg"
                    alt="" width={40} height={40} style={{ marginLeft: 80 }}
                />CỔNG QUẢN LÝ HỒ SƠ CÔNG DÂN ĐIỆN TỬ QUẬN LIÊN CHIỂU</Navbar.Brand>
                <NavDropdown.Divider />
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" >
                </Navbar.Collapse>
            </Navbar>
            {scrolls && <div style={{ height: 70 }}></div>}
            <Navbar variant="dark" fixed={scrolls && "top"} style={backgroud}
            >
                <Container>
                    <Nav className="me-auto" >
                        <Nav.Link as={Link} to="/">TRANG CHỦ</Nav.Link>
                        <Nav.Link as={Link} to="/huongdan">HƯỚNG DẪN</Nav.Link>
                        <Nav.Link as={Link} to="/gioithieu">GIỚI THIỆU</Nav.Link>
                    </Nav>
                    <Nav pullRight>
                        <div ref={ref}>
                            <FaBell ref={target} onClick={handleClick1} style={{ marginRight: "20px", fontSize: "40px" }} />

                            <Overlay
                                show={show}
                                target={target}
                                placement="bottom"
                                container={ref}
                                containerPadding={40}
                            >
                                <Popover id="popover-contained">
                                    {danhSachThongBao ? danhSachThongBao.map((thongBao) => (
                                        <div>
                                            <Popover.Header as="h4" style={{ color: "#000" }}>{thongBao.title}</Popover.Header>
                                            <Popover.Body>
                                                {thongBao.content}<br/>{thongBao.createdAt}
                                            </Popover.Body>
                                        </div>
                                    )) : <></>}
                                </Popover>
                            </Overlay>
                        </div>
                        {name ? <Navbar.Brand >CHÀO MỪNG {name}</Navbar.Brand> : <></>}
                        <Nav.Link as={Link} to="/sign-in" onClick={handleClick}>ĐĂNG {name ? "XUẤT" : "NHẬP"}</Nav.Link>

                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}
export default Nabar;