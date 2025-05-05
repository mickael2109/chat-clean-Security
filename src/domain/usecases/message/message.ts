import { messageRepository } from "../../../application/repository/messageRepository";
import { addMessage, setMessage } from "../../../redux/message/messageSlice";
import { AppDispatch } from "../../../redux/store";
import { dataMessageInterface } from '../../../types/MessageInterface';


export const getMessageSenderWithReceiver = (senderId: string, receiverId: string) => async (dispatch: AppDispatch): Promise<void> => {
  try {
    const data = await messageRepository.getMsgBySenderAndReceiver(senderId, receiverId);
    dispatch(setMessage(data));
  } catch (error) {
    console.error("Erreur lors du recupération des messages", error);
  }
};


export const sendMessageSenderByReceiver = (dataMessageInterface: dataMessageInterface) => async (dispatch: AppDispatch): Promise<void> => {
  try {
    const data = await messageRepository.sendMessage(dataMessageInterface);
    dispatch(addMessage(data));
  } catch (error) {
    console.error("Erreur lors du l'envoie de message", error);
  }
};
