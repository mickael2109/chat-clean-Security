import { fetchMsgBySenderAndReceiver, fetchSendMessage } from "../../infrastructure/api/messageApi";
import { dataMessageInterface } from "../../types/MessageInterface";


export const messageRepository = {

    // get message
    getMsgBySenderAndReceiver: async (senderId: string, receiverId: string) => {
        return await fetchMsgBySenderAndReceiver(senderId, receiverId);
    },

    // send message
    sendMessage: async (dataMessageInterface: dataMessageInterface) => {
        return await fetchSendMessage(dataMessageInterface);
    },
};


