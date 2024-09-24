import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { todolistsReducer } from "./todolists-reducer";

const reducer = combineReducers({
  todolists: todolistsReducer,
});

export type StateType = ReturnType<typeof reducer>;

export const store = configureStore({ reducer });
