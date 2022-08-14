import React, { useState } from "react";
import { Button, Container, FloatingLabel, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectLogin } from "../store/loginSlice";
import { NotificationContainer, NotificationManager } from 'react-notifications';

function GopY() {
    const createNotification = (type) => {
        switch (type) {
            case 'success':
                NotificationManager.success('đã góp ý', 'Thành công');
                break;
            case 'error':
                NotificationManager.error('đã có lỗi gì đó xảy ra', 'Thất bại', 3000);
                break;
            default :
                alert("kill me, i'm here");
        }
    }

    const { user: { ThongTinCaNhan } } = useSelector(selectLogin);
    const [title1, setTitle1] = useState("");
    const [comment, setComment] = useState("");
    const handleClick = () => {
        const fetchData = async () => {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {
                        "ThongTinCaNhan": `${ThongTinCaNhan}`,
                        "title": `${title1}`,
                        "comment": `${comment}`
                    }
                )
            };
            const response = await fetch('https://backendcnpmem.herokuapp.com/api/createGopY', requestOptions)
            const data = await response.json();
            console.log(data);
            if (data !== null) createNotification('success');
            else createNotification('error')
        }
        fetchData();
        document.getElementById("create-course-form").reset();
        setTitle1("")
    }

    return (<>
        <div style={{ textAlign: "center" }}><h1>Hòm thư góp ý</h1></div>
        <Container>
            <div className="box2 box-width-1 mx-auto">
                <Form id="create-course-form"  >
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Tiêu đề</Form.Label>
                        <Form.Control type="input" placeholder="Tiêu đề" value={title1}
                            onChange={e => setTitle1(e.target.value)} />
                    </Form.Group>
                    <Form.Label>Nội dung cụ thể:</Form.Label>
                    <FloatingLabel controlId="floatingTextarea2" label="Nội dung"
                        aria-valuetext={comment} onChange={e => setComment(e.target.value)}>
                        <Form.Control
                            as="textarea"
                            placeholder="Leave a comment here"
                            style={{ height: '150px' }}
                        />
                    </FloatingLabel>
                    <div style={{ alignItems: "center", textAlign: "center", margin: 20 }}>
                        <Button variant="primary" type="button" onClick={handleClick}>
                            Gửi
                        </Button>
                    </div>

                </Form>
            </div>
            <NotificationContainer />
        </Container>
    </>)
}
export default GopY;