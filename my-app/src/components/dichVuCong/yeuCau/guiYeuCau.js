import React, { useEffect, useState } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectLogin } from "../../../store/loginSlice";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import toolDate from "../../../tool/toolDate";


function GuiYeuCau() {
    const [num, setNum] = useState(0);
    const { user: { ThongTinCaNhan } } = useSelector(selectLogin);
    const [danhSachXacNhan, setDanhSachXacNhan] = useState([]);
    const [messages, setMessages] = useState({});
    const [problem, setProblem] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "userId": `${ThongTinCaNhan}`
                })
            };
            const response = await fetch('https://backendcnpmem.herokuapp.com/api/xinXacNhanCongDan',
                requestOptions)
            let data = await response.json();
            data = toolDate(data)
            setDanhSachXacNhan(data);
        }
        fetchData();
    }, [ThongTinCaNhan, messages]);
    const createNotification = (type) => {
        switch (type) {
            case 'success':
                NotificationManager.success('đã gửi yêu cầu', 'Thành công');
                break;
            case 'error':
                NotificationManager.error('đã có lỗi gì đó xảy ra', 'Thất bại', 3000);
                break;
            default :
                alert("kill me, i'm here");
        }
    }

    const handleClick = () => {
        const fetchData = async () => {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {
                        "problem": `${problem}`,
                        "number": `${num / 5000}`,
                        "ThongTinCaNhan": `${ThongTinCaNhan}`
                    }
                )
            };
            const response = await fetch('https://backendcnpmem.herokuapp.com/api/createXinXacNhan', requestOptions)
            const data = await response.json();
            console.log(data);
            setMessages(data);
            if (data !== null) createNotification('success');
            else createNotification('error')
        }
        fetchData();
        let a = Array.from(document.getElementsByClassName("reset"));
        setNum(0);
        a.forEach(e => {
            e.value = "";
        });
    }

    return (
        <>
            <div className="divv" style={{ textAlign: "center" }}><h1>Lập xác nhận</h1></div>
            <Container>
                <div className="d-flex flex-row justify-content-around divv">
                    <div className="box2 divv">
                        <Form id="create-course-form">
                            <Form.Group className="mb-3">
                                <Form.Label>Loại đơn</Form.Label>
                                <Form.Select className="reset" value={problem} onChange={e => setProblem(e.target.value)}>
                                    <option value="Xác nhận hộ nghèo">Xác nhận hộ nghèo</option>
                                    <option value="Xác nhận miễn nghĩa vụ quân sự">Xác nhận miễn nghĩa vụ quân sự</option>
                                    <option value="Xác nhận tạm trú tạm vắng">Xác nhận tạm trú tạm vắng</option>
                                    <option value="Công chứng căn cước/cmnd">Công chứng căn cước/cmnd</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Số lượng</Form.Label>
                                <Form.Control
                                    className="reset"
                                    type="number"
                                    placeholder="Nhập số lượng"
                                    min={1} max={10}
                                    onChange={(e) => {
                                        setNum(e.target.value * 5000);
                                    }}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Lệ phí/đơn</Form.Label>
                                <Form.Control placeholder={`${num} đồng`} disabled />
                            </Form.Group>

                            <div style={{ alignItems: "center", textAlign: "center", margin: 20 }}>
                                <Button variant="primary" type="button" onClick={handleClick}>
                                    Xác nhận
                                </Button>
                            </div>
                        </Form>
                    </div>
                    <div className="divv">
                        <Table striped bordered hover variant="dark" >
                            <thead>
                                <tr>
                                    <th colSpan={6} style={{ textAlign: "center" }}>
                                        Thông tin các lần đề nghị
                                    </th>
                                </tr>
                                <tr>
                                    <th>thứ tự</th>
                                    <th>Loại đơn</th>
                                    <th>Số lượng</th>
                                    <th>Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                {danhSachXacNhan ? danhSachXacNhan.map((don, key) => (
                                    <tr>
                                        <td>{key + 1}</td>
                                        <td>{don.problem}</td>
                                        <td>{don.number}</td>
                                        <td>{(don.status === 2) ? "từ chối xử lý" :
                                            (don.status === 1) ? "đã xử lý" : "đang xử lý"}</td>
                                    </tr>
                                )) : <></>}
                            </tbody>
                        </Table>
                    </div>
                </div>
                <NotificationContainer />
            </Container>
        </>
    );
}

export default GuiYeuCau;