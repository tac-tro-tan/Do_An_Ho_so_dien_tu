import React, { useEffect, useState } from "react";
import { Button, Container, FloatingLabel, Form, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectLogin } from "../../../store/loginSlice";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import toolDate from "../../../tool/toolDate";


function DatLich() {
    const { user: { ThongTinCaNhan } } = useSelector(selectLogin);
    const [danhSachLichHen, setDanhSachLichHen] = useState([]);
    const [messages, setMessages] = useState({});
    const [problem, setProblem] = useState("");
    const [comment, setComment] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "userId": `${ThongTinCaNhan}`
                })
            };
            const response = await fetch('https://backendcnpmem.herokuapp.com/api/lichHenCongDan',
                requestOptions)
            let data = await response.json();
            data = toolDate(data);
            setDanhSachLichHen(data);
        }
        fetchData();
    }, [ThongTinCaNhan, messages]);

    const createNotification = (type) => {
        switch (type) {
            case 'success':
                NotificationManager.success('đã đặt lịch hẹn', 'Thành công');
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
                body: JSON.stringify({
                    "problem": `${problem}`,
                    "comment": `${comment}`,
                    "date": `${date}`,
                    "time": `${time}`,
                    "ThongTinCaNhan": `${ThongTinCaNhan}`
                })
            };
            const response = await fetch('https://backendcnpmem.herokuapp.com/api/createLichHen', requestOptions)
            const data = await response.json();
            console.log(data);
            setMessages(data);
            if (data !== null) createNotification('success');
            else createNotification('error')
        }
        fetchData();
        let a = Array.from(document.getElementsByClassName("reset"));

        a.forEach(e => {
            e.value = "";
        });
    }


    return (<>
        <div className="divv" style={{ textAlign: "center" }}><h1>Đặt lịch hẹn</h1></div>
        <Container>
            <div className="d-flex flex-column justify-content-around divv">
                <div className="box2 divv">
                    <Form id="create-course-form">
                        <Form.Group className="row">
                            <FloatingLabel className="col" controlId="floatingSelect"
                                label="|   Vấn đề cần giải quyết">
                                <Form.Select className="reset" aria-label="Floating label select example"
                                    value={problem} onChange={e => setProblem(e.target.value)}>
                                    <option value="Giải quyết sai lệch giấy tờ">Giải quyết sai lệch giấy tờ</option>
                                    <option value="Xác nhận vay vốn">Xác nhận vay vốn</option>
                                    <option value="Công chứng giấy tờ đất">Công chứng giấy tờ đất</option>
                                    <option value="Vấn đề khác">Vấn đề khác</option>
                                </Form.Select>
                            </FloatingLabel>
                            <Form.Group className="col">
                                <Form.Label>Chọn thời gian hẹn gặp: 9h sáng - 4h chiều</Form.Label>
                                <Form.Group className="d-flex">
                                    <Form.Control className="reset" type="time" min="09:00" max="18:00" required
                                        value={time} onChange={e => setTime(e.target.value)}></Form.Control>
                                    <Form.Control className="reset" type="date" value={date}
                                        onChange={e => setDate(e.target.value)} />
                                </Form.Group>
                            </Form.Group>
                        </Form.Group>

                        <Form.Label>Nội dung cụ thể:</Form.Label>
                        <FloatingLabel controlId="floatingTextarea2" label="Nội dung">
                            <Form.Control
                                className="reset"
                                as="textarea"
                                placeholder="nội dung"
                                style={{ height: '250px' }}
                                value={comment}
                                onChange={e => setComment(e.target.value)}

                            />
                        </FloatingLabel>
                        <div style={{ alignItems: "center", textAlign: "center", margin: 20 }}>
                            <Button variant="primary" type="button" onClick={handleClick}>
                                Gửi
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
                                <th>Ngày hẹn gặp</th>
                                <th>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            {danhSachLichHen ? danhSachLichHen.map((lichhen, key) => (
                                <tr>
                                    <td>{key + 1}</td>
                                    <td>{lichhen.problem}</td>
                                    <td>{lichhen.date ? lichhen.time + " " + lichhen.date : <p>đang xử lý</p>}</td>
                                    <td>{(lichhen.status === 2) ? "từ chối cuộc hẹn" :
                                        (lichhen.status === 1) ? "chấp nhận cuộc hẹn" : "đang xử lý"}</td>
                                </tr>
                            )) : <></>}
                        </tbody>
                    </Table>
                </div>
            </div>
            <NotificationContainer />
        </Container>
    </>)
}

export default DatLich;