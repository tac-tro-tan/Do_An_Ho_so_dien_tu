import React, { useState } from "react";
//import { useForm } from 'react-hook-form';
import './sign.css';
import { Button, Container, Form, FormGroup} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateLogin } from "../store/loginSlice";

function Login(){
    const navigate = useNavigate();
    //fetch dữ liệu database
    const [username,setUsername]=useState("");
    const [pass,setPass]= useState("")
    //lưu bằng redux
    const dispatch = useDispatch();

    function handleClick() {
        const fetchData = async () => {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "cmnd": `${username}`,
                "password": `${pass}` })
            };
            const response = await fetch('https://backendcnpmem.herokuapp.com/api/signinCongDan', requestOptions)
            const data = await response.json();
            dispatch(updateLogin(data)); 
        }
        fetchData();
        navigate("/");
    }
    return (<>
        <div className="divv" style={{textAlign: "center"}}><h1>Đăng nhập</h1></div>
        <Container>
            <div className="box2 box-width-2 mx-auto col d-flex justify-content-center" >
                <Form >   
                    <Form.Group>
                        <Form.Label>CMND/CCCD</Form.Label>
                        <Form.Control
                            type="number"
                            min={0} max={999999999}
                            placeholder="CMND/CCCD"
                            required="required"
                            value={username}
                            onChange={e=>setUsername(e.target.value)}
                        />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Mật khẩu</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Nhập mật khẩu" 
                            value={pass}
                            onChange={e=>setPass(e.target.value)}
                        />
                    </Form.Group>
                    <FormGroup>
                        <Form.Check 
                            type="switch"
                            id="custom-switch"
                            label="Ghi nhớ"
                        />
                    </FormGroup>
                </Form>
                <div className="d-flex flex-column align-self-center">
                    <div style={{alignItems:"center", textAlign:"center", margin:20}}>
                            
                        <Button variant="primary" onClick={handleClick}>
                            Xác nhận
                        </Button>
                    </div>
                    <p className="forgot-password text-right">
                        Quên <a href="#a">mật khẩu?</a>
                    </p>
                </div>
                
            </div>
        </Container>
        </>
    );
}
export default Login;
 