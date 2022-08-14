import React from "react";
import { Button, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectLogin } from "../store/loginSlice";
import db from "../faker/dataTinTuc.json";

function Home() {
    const tinTuc = db.tintuc;
    const { user: { name } } = useSelector(selectLogin);
    return (
        <div>
            <Container>
                <div className="mx-auto col text-center scroll-container" >
                    <div style={{ height: "100vh" }}>
                        <h2 className="divv">{name ? name : "Bạn"} có muốn biết thông tin về</h2>
                        <div className="d-flex justify-content-center" >
                            <div className="box2 text-center">
                                <a href="#phapluat" className="lienket"><h3>Pháp luật</h3></a>
                            </div>
                            <div className="box2 text-center">
                                <a href="#chinhtri" className="lienket"><h3>Chính trị</h3></a>
                            </div>
                        </div>
                    </div>



                    <section id="phapluat" className="divv" style={{ alignItems: "center", textAlign: "center", alignSelf: "center", alignContent: "center" }}>
                        <div style={{ textAlign: "center" }}><h2>Pháp luật</h2></div>
                        <div className="d-flex flex-wrap">
                            {
                                tinTuc.map((post, index) => (
                                    <div className="box2 text-center d-flex flex-column box-width-2 align-items-center" key={index}>
                                        <span className="date">{post.date}</span>
                                        <h3>{post.title}</h3>
                                        <h5>{post.description}</h5>
                                        <img src={post.img} alt="ai mà biết được" height={200} width={300} />
                                        <div>
                                            <Button>xem chi tiết</Button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </section>
                    <section id="chinhtri" className="divv" >
                        <div style={{ textAlign: "center" }}><h2>Chính trị</h2></div>
                        <div className="d-flex flex-wrap">
                            {
                                tinTuc.map((post, index) => (
                                    <div className="box2 text-center d-flex flex-column box-width-2 align-items-center" key={index}>
                                        <span className="date">{post.date}</span>
                                        <h3>{post.title}</h3>
                                        <h5>{post.description}</h5>
                                        <img src={post.img} alt="ai mà biết được" height={200} width={300} />
                                        <div>
                                            <Button>xem chi tiết</Button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </section>
                </div>
            </Container>
        </div>
    );
}

export default Home;