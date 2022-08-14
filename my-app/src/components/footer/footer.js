import React from "react";
import {
Box,
Container,
Row,
Column,
Heading,
} from "./FooterStyle";

const Footer = () => {
return (
	<Box>
	<h3 style={{ color: "green",
				textAlign: "center",
				marginTop: "-50px" }}>
		Cơ quan chủ quản: Văn phòng chính phủ
	</h3>
	<Container>
		<Row>
		<Column>
			<Heading>ĐIỀU KHOẢN SỬ DỤNG</Heading>
		</Column>
		<Column>
			<Heading>QUY ĐỊNH BẢO MẬT</Heading>
		</Column>
		<Column>
			<Heading>Tổng đài hỗ trợ: </Heading>
			{/* <FooterLink href="#"></FooterLink> */}
		</Column>
		<Column>
			<Heading>18001096</Heading>
		</Column>
		</Row>
		<div className="row">
            <div className="col-md-12"></div>
            <p>
              © 2018 | Bản quyền thuộc Bộ Kế hoạch và Đầu tư
              <span className="px-5">
			  Email : hotro@dangkykinhdoanh.gov.vn
              </span>
            </p>
			<p>Địa chỉ : 6B Hoàng Diệu, Quận Ba Đình, Hà Nội, Việt Nam</p>
          </div>
	</Container>
	</Box>
);
};
export default Footer;
