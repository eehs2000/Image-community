import { configureStore } from "@reduxjs/toolkit";
import { createBrowserHistory } from "history";
import logger from "redux-logger";
import postsReducer from "./modules/post";
import imageReducer from "./modules/image";
import gridReducer from "./modules/grid";
import usersReducer from "./modules/user";

export const history = createBrowserHistory();

export const store = configureStore({
  reducer: {
    post: postsReducer,
    user: usersReducer,
    image: imageReducer,
    grid: gridReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger),
});
