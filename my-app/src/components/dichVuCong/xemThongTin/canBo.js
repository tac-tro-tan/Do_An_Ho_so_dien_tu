import React, { useState, useEffect } from "react";
import { Container, Form, FormControl, Button, Modal, Tabs, Tab } from "react-bootstrap";
import toolDate from "../../../tool/toolDate";
function CanBo() {
    //fetch dữ liệu database
    const [danhSachCanBo, setDanhSachCanBo] = useState([]);
    const [dataCanBo, setDataCanBo] = useState({
        "role": 3,
        "position": "Cán Bộ",
        "office": "Đà Nẵng",
        "country": "Việt Nam",
        "folk": "Kinh",
        "nationality": "Viet Nam",
        "_id": "62b173d70689932098456bcd",
        "cmnd": 111111111,
        "name": "Admin",
        "date": "1999-05-05T00:00:00.000Z",
        "sex": "Nam",
        "address": "81 Lê Đại Hành",
        "email": "admin@gmail.com",
        "createdAt": "2022-06-21T07:31:35.828Z",
        "updatedAt": "2022-06-21T07:31:35.828Z",
        "__v": 0
    });
    useEffect(() => {
        fetch('https://backendcnpmem.herokuapp.com/api/ThongTinCanBo')
            .then(res => {
                return res.json();
            })
            .then(d => {
                d.data = toolDate(d.data);
                setDanhSachCanBo(d.data);
            })
    }, [])
    //search item
    const [query, setQuery] = useState("");
    // click->dialog
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (post) => {
        setShow(true);
        setDataCanBo(post);
    }

    return (
        <>
            <div className="divv" style={{ textAlign: "center" }}><h1>Thông tin cán bộ</h1></div>
            <Container>
                <div >
                    <Form className="d-flex divv" style={{ width: 1000 }}>
                        <FormControl
                            type="search"
                            placeholder="Tìm kiếm"
                            className="me-2"
                            aria-label="Search"
                            onChange={event => setQuery(event.target.value)}
                        />
                        {/* <Button variant="outline-success">Search</Button> */}
                    </Form>
                    {danhSachCanBo ?
                        danhSachCanBo.filter(post => {
                            if (query === '' || post.name.toLowerCase().includes(query.toLowerCase())) {
                                return post;
                            }
                            return null;
                        }).map((post, index) => (
                            <div className="box2 box-width-1 divv"
                                key={index}
                                onClick={() => {
                                    handleShow(post);
                                }}>
                                <div className="d-flex flex-row justify-content-start">
                                    <div className="divv">
                                        <img src={post.image} alt="ai mà biết được" width={100} height={100} />
                                    </div>
                                    <div className="divv">
                                        <p>Tên: {post.name}</p>
                                        <p>Địa chỉ công tác: {post.office}</p>
                                        <p>Chức vụ: {post.position}</p>
                                    </div>
                                </div>
                            </div>
                        )) : <></>
                    }
                </div>

                <Modal show={show} onHide={handleClose} className="mauDen">
                    <Tabs defaultActiveKey="home">
                        <Tab eventKey="home" title="Thông tin cơ bản">
                            <Modal.Header closeButton>
                                <Modal.Title>Thông tin cán bộ</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div>
                                    <img src={dataCanBo.image} alt="ai mà biết được" width={100} height={100} />
                                    <p>Họ tên: {dataCanBo.name}</p>
                                    <p>Quê quán: {dataCanBo.country}</p>
                                    <p>Ngày sinh: {dataCanBo.date}</p>
                                    <p>Giới tính: {dataCanBo.sex}</p>
                                    <p>Chức vụ: {dataCanBo.position}</p>
                                    <p>địa chỉ công tác: {dataCanBo.office}</p>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="primary" onClick={handleClose}>
                                    Đóng
                                </Button>
                            </Modal.Footer>
                        </Tab>
                        {/* <Tab eventKey="profile" title="Tiểu sử">
                            <Modal.Header closeButton>
                                <Modal.Title>Tiểu sử cán bộ</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div>kill me, i'm here</div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="primary" onClick={handleClose}>
                                    Đóng
                                </Button>
                            </Modal.Footer>
                        </Tab> */}
                    </Tabs>
                </Modal>

            </Container>
        </>
    );
}

export default CanBo;