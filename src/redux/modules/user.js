import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
//다응님 서버
const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_ADDRESS,
});

const initialState = {
  user: {},
  is_login: false,
};

//로그인
export const loginDB = createAsyncThunk(
  "user/loginDB",
  async (data, thunkAPI) => {
    const result = await instance.post("/api/login", data);
    if (result.data.result === "fail") {
      return alert(result.data.msg);
    } else {
      alert("로그인 완료");
      sessionStorage.setItem("user", JSON.stringify(result.data.data));
      return result.data.data;
    }
  }
);

//회원가입
export const registDB = createAsyncThunk(
  "user/registDB",
  async (data, thunkAPI) => {
    await instance
      .post("api/register", data)
      .then(res => {
        if (res.data.result === "fail") {
          return alert(res.data.msg);
        } else {
          alert(res.data.msg);
        }
      })
      .catch(err => console.log(err));
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginCheck: state => {
      state.is_login = true;
      state.user = JSON.parse(sessionStorage.getItem("user"));
    },
    logout: state => {
      sessionStorage.clear();
      state.is_login = false;
      state.user = [];
    },
  },
  extraReducers: {
    [loginDB.pending]: state => {
      state.status = "loading";
    },
    [loginDB.fulfilled]: (state, action) => {
      if (action.payload) {
        state.is_login = true;
      } else {
        state.is_login = false;
      }
      state.status = "success";
      state.user = action.payload;
    },
    [loginDB.rejected]: (state, action) => {
      state.is_login = false;
    },
    [registDB.fulfilled]: (state, action) => {},
  },
});

export const { loginCheck, logout } = userSlice.actions;

export default userSlice.reducer;
