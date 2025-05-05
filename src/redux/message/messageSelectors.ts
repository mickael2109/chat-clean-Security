import { RootState } from "../store";

export const selectAllMessageSenderWithReceiver = (state: RootState) => state.message.messages;
