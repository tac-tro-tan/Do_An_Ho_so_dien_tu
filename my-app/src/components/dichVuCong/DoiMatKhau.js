import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectLogin } from "../../store/loginSlice";
import { NotificationContainer, NotificationManager } from 'react-notifications';

function DoiMatKhau() {
    const { user: { _id } } = useSelector(selectLogin);
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordRepeat, setNewPasswordRepeat] = useState("");

    const createNotification = (type) => {
        switch (type) {
            case 'success':
                NotificationManager.success('đã đổi mật khẩu', 'Thành công');
                break;
            case 'error':
                NotificationManager.error('đã có lỗi gì đó xảy ra', 'Thất bại', 3000);
                break;
            default:
                alert("kill me, i'm here");
        }
    }

    const handleClick = () => {
        if (newPassword === newPasswordRepeat) {
            const fetchData = async () => {
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(
                        {
                            "_id": `${_id}`,
                            "password": `${password}`,
                            "newPassword": `${newPassword}`
                        }
                    )
                };
                const response = await fetch('https://backendcnpmem.herokuapp.com/api/updatePass', requestOptions)
                const data = await response.json();
                console.log(data);
                if (data !== null) createNotification('success');
                else createNotification('error')
            }
            fetchData();
        } else createNotification('error')
        let a = Array.from(document.getElementsByClassName("reset"));
        a.forEach(e => {
            e.value = "";
        });
    }



    return (<>
        <div style={{ width: "100vw" }}>
            <div style={{ textAlign: "center" }}><h1>Đổi mật khẩu</h1></div>
            <Container>
                <div className="box2 box-width-2 mx-auto col d-flex justify-content-center" >
                    <Form id="create-course-form">
                        <Form.Group className="mb-3">
                            <Form.Label>Mật khẩu cũ</Form.Label>
                            <Form.Control className="reset" type="password" placeholder="Nhập mật khẩu cũ"
                                value={password} onChange={e => setPassword(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Mật khẩu mới</Form.Label>
                            <Form.Control className="reset" type="password" placeholder="Nhập mật khẩu mới"
                                value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Xác nhận mật khẩu mới</Form.Label>
                            <Form.Control className="reset" type="password" placeholder="Xác nhận mật khẩu mới"
                                value={newPasswordRepeat} onChange={e => setNewPasswordRepeat(e.target.value)} />
                        </Form.Group>
                        {(newPassword === newPasswordRepeat) ? <></> : <p>mật khẩu không khớp</p>}
                        <div style={{ alignItems: "center", textAlign: "center", margin: 20 }}>
                            <Button variant="primary" type="button" onClick={handleClick}>
                                Xác nhận
                            </Button>
                        </div>
                    </Form>
                </div>
                <NotificationContainer />
            </Container>
        </div>
    </>)
}

export default DoiMatKhau;