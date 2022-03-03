import { createSlice } from "@reduxjs/toolkit";

//made by 선주짱
const initialState = { grid: "column" };

export const gridSlice = createSlice({
  name: "grid",
  initialState,
  reducers: {
    setGrid: (state, action) => {
      state.grid = action.payload;
    },
    resetGrid: (state, action) => {
      state.grid = initialState.grid;
    },
  },
});

export const { setGrid, resetGrid } = gridSlice.actions;

export default gridSlice.reducer;
