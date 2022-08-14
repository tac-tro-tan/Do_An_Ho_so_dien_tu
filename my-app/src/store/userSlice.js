// store/userSlice.js

import { createSlice } from "@reduxjs/toolkit";

// Khởi tạo state cho slice, có thể kèm giá trị mặc định ban đầu
const initialState = {
  country: "Thành Phố Đà Nẵng",
  folk: "Kinh",
  nationality: "Việt Nam",
  weeding: 1,
  TienAnTienSu: [
      {
          _id: "62ad7e7cca658a3d78b241d0",
          ThongTinCaNhan: "62ac34491c84db1614a36a45",
          date: "2022-06-16T00:00:00.000Z",
          violationError: "đánh bài",
          penalty: "phạt 100tr",
          __v: 0
      }
  ],
  _id: "62ac34491c84db1614a36a45",
  name: "---",
  date: "1999-07-27T00:00:00.000Z",
  sex: "Nam",
  numberHousehold: 2012454,
  address: "82 Bình Thái 1",
  cmnd: 201785720,
  __v: 0
};

// Cấu hình slice
export const userSlice = createSlice({
  name: "user",  // Tên của slice, mỗi slice đặt 1 tên khác nhau để phân biệt
  initialState,
  // Reducers chứa các hàm xử lý cập nhật state
  reducers: {
    // Hàm có 2 tham số là state hiện tại và action truyền vào
    updateCongDan: (state, action) => {
      // Cập nhật state username với giá trị truyền vào qua action (action.payload)
      // Chạy thử console.log(action) để xem chi tiết giá trị action truyền vào
      state.cmnd = action.payload.cmnd;
      state.name = action.payload.name;
      state.date = action.payload.date;
      state.country = action.payload.country;
      state.sex = action.payload.sex;

      state.weeding = action.payload.weeding;
      state.nationality= action.payload.nationality;
      state.folk = action.payload.folk;
      state.numberHousehold = action.payload.numberHousehold; 

      state.address = action.payload.address;
      state._id = action.payload._id;
      state.__v = action.payload.__v;
      state.TienAnTienSu._id = action.payload.TienAnTienSu._id;
      state.TienAnTienSu.ThongTinCaNhan = action.payload.TienAnTienSu.ThongTinCaNhan;
      state.TienAnTienSu.date = action.payload.TienAnTienSu.date;
      state.TienAnTienSu.violationError = action.payload.TienAnTienSu.violationError;
      state.TienAnTienSu.penalty = action.payload.TienAnTienSu.penalty;
      state.TienAnTienSu.__v = action.payload.TienAnTienSu.__v;
    }
  }
});

// Export action ra để sử dụng cho tiện.
export const { updateCongDan } = userSlice.actions;

// Action là 1 hàm trả về object dạng {type, payload}, chạy thử console.log(updateUsername()) để xem chi tiết

// Hàm giúp lấy ra state mong muốn.
// Hàm này có 1 tham số là root state là toàn bộ state trong store, chạy thử console.log(state) trong nội dung hàm để xem chi tiết
export const selectCongDan = state => state.user;

// Export reducer để nhúng vào Store
export default userSlice.reducer;