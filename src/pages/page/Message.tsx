import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/store";
import { selectClientsReceiver, selectClientsSender } from "../../redux/client/clientSelectors";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getClientRecever } from "../../domain/usecases/client/getClient";
import { getMessageSenderWithReceiver, sendMessageSenderByReceiver } from "../../domain/usecases/message/message";
import { selectAllMessageSenderWithReceiver } from "../../redux/message/messageSelectors";
import { dataMessageInterface } from "../../types/MessageInterface";
import { SweetAlert } from "../../utils/sweetAlert";
import { MdSend } from "react-icons/md";
import Cookies from 'js-cookie';
import { decryptMessage } from "../../application/cryptage/decrypt";


const Message = () => {
    const { id } = useParams();
    const privateKey = Cookies.get('___chat-key');

    const dispatch = useAppDispatch();
    const clientReceiver = useSelector(selectClientsReceiver);
    const clientSender = useSelector(selectClientsSender);
    const messageSenderWithReceiver =  useSelector(selectAllMessageSenderWithReceiver);

    useEffect(() => {
        if (id && clientSender) {        
            dispatch(getClientRecever(id));
            dispatch(getMessageSenderWithReceiver(clientSender._id, id));
          }
    }, [dispatch, id, clientSender]);


    // État pour la connexion, typé avec loginInterface
    const [messageData, setMessageData] = useState<dataMessageInterface>({
        senderId: clientSender?._id,
        receiverId: clientReceiver?._id,
        content: ""
    });

    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            dispatch(sendMessageSenderByReceiver(messageData));  
            setMessageData({ ...messageData, content: "" })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error:any) {
            console.log("error : ",error.response.data.message);      
            SweetAlert.errorPage(error.response.data.message);
        }
    };

    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const container = chatContainerRef.current;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }, [messageSenderWithReceiver]);
    

    const [decryptedMessages, setDecryptedMessages] = useState<{
        [key: number]: string;
    }>({});
    // Effet pour déchiffrer les messages
    useEffect(() => {
        const decryptAllMessages = async () => {
            if(clientSender && privateKey){
                //
                const newDecryptedMessages: { [key: number]: string } = {};
                
                for (let index = 0; index < messageSenderWithReceiver.length; index++) {
                    const item = messageSenderWithReceiver[index];
                    let message = item.content.forSender
                    if (item.senderId !== clientSender._id) message = item.content.forReceiver
                    try {
                        const decrypted = await decryptMessage(message, privateKey);
                        
                        newDecryptedMessages[index] = decrypted;
                    } catch (err) {
                        console.error(`Erreur de déchiffrement pour le message ${index}:`, err);
                        newDecryptedMessages[index] = "Erreur de déchiffrement";
                    }
                }
                setDecryptedMessages(newDecryptedMessages);
            }
        };

        if (privateKey) {
        decryptAllMessages();
        }
    }, [messageSenderWithReceiver, privateKey, clientSender]);
    
  
    return (
        <div>
            {/* utilisateur receive */}
            <div className="border-b border-[#ffffff17] pb-2 flex flex-row items-center gap-5 ">
                <div className="avatar">
                    <div className="ring-primary ring-offset-base-100 w-8 rounded-full ring-2 ring-offset-2">
                        <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
                    </div>
                </div>
                <div>
                    <div><span className="text-[16px]">{clientReceiver?.username}</span></div>
                    <div><span className="text-[12px] text-gray-500">{clientReceiver?.email}</span></div>
                </div>
            </div>
            <div
                ref={chatContainerRef}
                className="mt-2 h-[80vh] overflow-hidden overflow-y-scroll bg-base-200 "
                >
                {/* chat */}
                {
                    messageSenderWithReceiver.map((item, index) => (
                        <div
                        key={index}
                        className={`chat ${
                            item.senderId === clientSender?._id ? "chat-end" : "chat-start mt-10"
                        }`}
                        >
                        <div className="chat-image avatar">
                            <div className="w-10 rounded-full">
                            <img
                                alt="avatar"
                                src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                            />
                            </div>
                        </div>
                        <div className="chat-header">
                            {item.senderId === clientSender?._id ? "" : clientReceiver?.username}
                        </div>

                        <div className="chat-bubble w-[300px] break-words whitespace-pre-wrap">
                            { decryptedMessages[index] }
                            {/* {
                                item.senderId === clientSender?._id
                                ? item.content.forSender
                                : item.content.forReceiver
                            } */}
                        </div>

                        <div className="chat-footer opacity-50">{item.timestamp}</div>
                        </div>
                    ))
                }
            </div>
            <form onSubmit={sendMessage} className="sign-in-form flex flex-row items-center justify-between gap-4 bg-base-200 p-2   ">
                <div className="input-field flex items-center gap-3 rounded-lg px-3 w-full">
                    <fieldset className="fieldset w-full">
                        <textarea 
                            className="textarea h-24 w-full" 
                            placeholder="Message"
                            onChange={(e) => setMessageData({ ...messageData, content: e.target.value })}
                        >
                        </textarea>
                    </fieldset>
                </div>
                <button type="submit" className="btn btn-primary solid">
                    <i><MdSend /></i>
                </button>
            </form>
            
        </div>
    );
}

export default Message;
