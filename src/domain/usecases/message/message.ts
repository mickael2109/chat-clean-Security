import { decryptMessage } from "../../../application/cryptage/decrypt";
import { messageRepository } from "../../../application/repository/messageRepository";
import { addMessage, setMessage } from "../../../redux/message/messageSlice";
import { AppDispatch } from "../../../redux/store";
import { dataMessageInterface, MessageInterface } from '../../../types/MessageInterface';


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



export const decryptMessagesUseCase = async ({
    messages,
    privateKey,
    clientSenderId,
  }: {
    messages: MessageInterface[];
    privateKey: string;
    clientSenderId: string;
  }): Promise<{ [key: number]: string }> => {
    const decrypted: { [key: number]: string } = {};

    for (let i = 0; i < messages.length; i++) {
      const msg = messages[i];
      const encrypted = msg.senderId === clientSenderId ? msg.content.forSender : msg.content.forReceiver;
      try {
        decrypted[i] = await decryptMessage(encrypted, privateKey);
      } catch (error) {
        decrypted[i] = `Erreur de déchiffrement : ${error}`;
      }
    }

  return decrypted;
};