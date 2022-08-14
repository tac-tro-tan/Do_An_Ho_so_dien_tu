import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { selectLogin } from "../../../store/loginSlice";
import { updateCongDan } from "../../../store/userSlice";
import toolDate from "../../../tool/toolDate";

function CaNhan() {
    const dispatch = useDispatch();
    const { user: { ThongTinCaNhan } } = useSelector(selectLogin);
    //fetch dữ liệu database
    const [congDan, setCongDan] = useState({});
    const [tienAn, setTienAn] = useState([]);
    const [nhanThan, setNhanThan] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "_id": `${ThongTinCaNhan}`
                })
            };
            const response = await fetch('https://backendcnpmem.herokuapp.com/api/readThongTinCaNhan', requestOptions)
            const data = await response.json();
            let k = data.date.split('T')[0];
            data.date= k.split("-").reverse().join("-");
            data.TienAnTienSu = toolDate(data.TienAnTienSu);
            setCongDan(data);
            setTienAn(data.TienAnTienSu);
            dispatch(updateCongDan(data));
        }
        fetchData();
    }, [ThongTinCaNhan]);

    useEffect(() => {
        fetch('https://backendcnpmem.herokuapp.com/api/ThongTinCaNhan')
            .then(res => {
                return res.json();
            })
            .then(d => {
                d.data.forEach(toi => {
                    if (toi.date !== undefined) {
                        let k = toi.date.split('T')[0];
                        toi.date = k.split("-").reverse().join("-");
                    };
    
                })
                d.data = toolDate(d.data);
                setNhanThan(d.data.filter(n => n.numberHousehold === congDan.numberHousehold 
                    && n.cmnd !== congDan.cmnd));
            })
    }, [congDan])
    return (
        <>
            <div className="divv" style={{ textAlign: "center" }}><h1>Thông tin cá nhân</h1></div>
            <Container>
                <div>
                    <h5 className="divv">Thông tin công dân:</h5>
                    <div className="d-flex flex-row justify-content-around divv">
                        <div>
                            <img src={congDan.image} alt="Logo" width="150" height="200" />
                        </div>
                        <div>
                            <p>Họ tên: <strong>{congDan.name}</strong></p>
                            <p>Ngày sinh: <strong>{congDan.date}</strong></p>
                            <p>Quê quán: <strong>{congDan.country}</strong></p>
                            <p>Tình trạng hôn nhân: <strong>{congDan.weeding ? "Đã kết hôn" : "Chưa kết hôn"}</strong></p>
                        </div>
                        <div>
                            <p>Giới tính: <strong>{congDan.sex}</strong></p>
                            <p>Dân tộc: <strong>{congDan.folk}</strong></p>
                            <p>Địa chỉ: <strong>{congDan.address}</strong></p>
                            <p>CMND: <strong>{congDan.cmnd}</strong></p>
                        </div>
                    </div>
                </div>
                <div className="divv">
                    <h5 className="divv">Thông tin nhân thân:</h5>
                    <div className="d-flex flex-column justify-content-around divv">
                        {nhanThan?nhanThan.map((nhan)=>(
                            <div className="d-flex flex-row justify-content-around divv" key={nhan.cmnd}>
                                <div>
                                <img src={nhan.image} alt="Logo"  width="150" height="200"/>
                                </div>
                                <div>
                                    <p>Họ tên: <strong>{nhan.name}</strong></p>
                                    <p>Ngày sinh: <strong>{nhan.date}</strong></p>
                                    <p>Quê quán: <strong>{nhan.country}</strong></p>
                                    <p>Tình trạng hôn nhân: <strong>{nhan.weeding?"Đã kết hôn":"Chưa kết hôn"}</strong></p>
                                </div>
                                <div>
                                    <p>Giới tính: <strong>{nhan.sex?"Nam":"Nữ"}</strong></p>
                                    <p>Dân tộc: <strong>{nhan.folk}</strong></p>
                                    <p>Dịa chỉ: <strong>{nhan.address}</strong></p>
                                    <p>CMND: <strong>{nhan.cmnd}</strong></p>
                                </div>
                            </div> 
                        )):<></>}
                        
                    </div>
                    
                </div>
                <div className="divv">
                    <h5 className="divv">Tiền án tiền sự:</h5>
                    <Table striped bordered hover variant="dark" >
                        <thead>
                            <tr>
                                <th>Ngày vi phạm</th>
                                <th>Hình phạt</th>
                                <th>Lỗi vi phạm</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tienAn.map((toi, key) => (
                                <tr key={key}>
                                    <td>{toi.date}</td>
                                    <td>{toi.penalty}</td>
                                    <td>{toi.violationError}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </Container>
        </>
    );
}

export default CaNhan;