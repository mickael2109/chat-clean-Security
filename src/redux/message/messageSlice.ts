import { createSlice } from "@reduxjs/toolkit";
import { MessageState } from './type';

const initialState: MessageState = {
    status: "idle",
    error: null,
    message: null,
    messages: [],
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload); // ajoute un message
    },
  },
});

export const { setMessage, addMessage } = messageSlice.actions;

export default messageSlice.reducer;


