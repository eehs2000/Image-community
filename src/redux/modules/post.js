import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//다웅님 주소
const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_ADDRESS,
});

//sessionStorage에서 유저정보 aka 토큰 받아오기
const token =
  sessionStorage.getItem("user") && //이값이 있을때만 뒤에껄로 쓴다. 없으면 null
  JSON.parse(sessionStorage.getItem("user")).token;

const initialState = {
  post: [],
  minId: 0,
};

//게시글 불러오기
export const loadPost = createAsyncThunk(
  "post/loadPost",
  async (id, thunkAPI) => {
    const result = await instance
      .get(`/api/board/${id}`)
      .then(res => res.data)
      .catch(error => error);

    if (result.data.length === 0) {
      const boardData = {
        lastBoardId: null,
        post: result.data,
      };

      return boardData;
    }
    const board_id = result.data[result.data.length - 1].board_id;

    const boardData = {
      lastBoardId: board_id,
      post: result.data,
    };
    return boardData;
  }
);
// `Bearer ${token}`, 민우님
//`${token}`, 다응님
//게시글 작성
export const addPostDB = createAsyncThunk(
  "post/addPostDB",
  async (data, thunkAPI) => {
    console.log(data.data);
    const result = await instance.post("/api/board", data.data, {
      headers: {
        Authorization: `${token}`,
      },
    });
    console.log(token);
    console.log(result);
  }
);

//게시글 수정
export const updatePostDB = createAsyncThunk(
  "post/updatePostDB",
  async (data, thunkAPI) => {
    await instance.post("api/board{data}", data);
  }
);

//게시글 디테일 정보 (이건 지금은 사용안함 실전때는 필수) useParams 사용? maybe
export const getDetailDB = createAsyncThunk(
  "post/getDetailDB",
  async ({ board_id }, thunkAPI) => {
    const result = await instance
      .get(`/api/board/${board_id}`)
      .then(res => res.data)
      .catch(error => error);
    return console.log(result.data);
  }
);

//게시글 삭제
export const deletePostDB = createAsyncThunk(
  "post/deletePostDB",
  async ({ board_id }) => {
    const result = await instance.delete(`api/board/${board_id}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    console.log(result);
  }
);

export const editPostDB = createAsyncThunk(
  "post/editPostDB",
  async ({ data, board_id }, thunkAPI) => {
    console.log(data);
    console.log(board_id);
    const result = await instance.put(`/api/board/${board_id}`, data, {
      headers: {
        Authorization: `${token}`,
      },
    });
    console.log(result);
  }
);
//좋아요
export const likePostDB = createAsyncThunk(
  "post/likePostDB",
  async ({ board_id, like_id }, thunkAPI) => {
    const result = await instance.post(`/api/board/like/${board_id}`, like_id, {
      headers: {
        Authorization: `${token}`,
      },
    });
    console.log(result);
  }
);
//좋아요 취소
export const cancelLikePostDB = createAsyncThunk(
  "post/cancelLikePostDB",
  async ({ board_id }, thunkAPI) => {
    const result = await instance.delete(
      `/api/board/like/${board_id}`,

      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    console.log(result);
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: {
    [loadPost.fulfilled]: (state, action) => {
      state.post = [...state.post, ...action.payload.post];
      state.minId = action.payload.lastBoardId;
    },
    [getDetailDB.fulfilled]: (state, action) => {
      state.post = action.payload;
      state.minId = action.payload.lastBoardId;
    },
  },
});

export const { setLoading, setNewPaging, setPost } = postSlice.actions;
export default postSlice.reducer;
