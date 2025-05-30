import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/store";
import { selectClientsReceiver, selectClientsSender } from "../../redux/client/clientSelectors";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getClientRecever } from "../../domain/usecases/client/getClient";
import { decryptMessagesUseCase, getMessageSenderWithReceiver, sendMessageSenderByReceiver } from "../../domain/usecases/message/message";
import { selectAllMessageSenderWithReceiver } from "../../redux/message/messageSelectors";
import { dataMessageInterface } from "../../types/MessageInterface";
import { SweetAlert } from "../../utils/sweetAlert";
import { MdSend } from "react-icons/md";
import { getKey } from "../../domain/usecases/key/getKey";
import { io } from "socket.io-client";


const socket = io("http://localhost:3000");

const Message = () => {
    const { id } = useParams();
    const [privateKey, setPrivateKey] = useState("");

    useEffect(() => {
    const fetchKey = async () => {
        const key = await getKey();
        setPrivateKey(key);
    };

    fetchKey();
    }, []);


    socket.on("connect", () => {
        console.log("🟢 Connected to server");
    });

   

    
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
        receiverId: "", // vide au départ
        content: ""
    });

    // Sync receiverId dès que clientReceiver change
    useEffect(() => {
        if (clientReceiver?._id) {
            setMessageData((prev) => ({
                ...prev,
                receiverId: clientReceiver._id,
                content: "" 
            }));
        }
    }, [clientReceiver]);

    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            
            dispatch(sendMessageSenderByReceiver(messageData));  
            setMessageData((prev) => ({ ...prev, content: "" }));

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
    

    socket.on("new_message", (message) => {
        console.log("id");
        const me =  clientSender?._id
        const receiverId = message.receiverId
        if(receiverId === me){
            if (id && clientSender) {        
                dispatch(getClientRecever(id));
                dispatch(getMessageSenderWithReceiver(clientSender._id, id));
            }
        }
        
    });


    const [decryptedMessages, setDecryptedMessages] = useState<{
        [key: number]: string;
    }>({});


    useEffect(() => {
        const processDecryption = async () => {
            if (clientSender && privateKey) {
            const result = await decryptMessagesUseCase({
                messages: messageSenderWithReceiver,
                privateKey,
                clientSenderId: clientSender._id,
            });
            setDecryptedMessages(result);
            }
        };

        processDecryption();
    }, [messageSenderWithReceiver, privateKey, clientSender]);

  
    return (
        <div>
            {/* <div role="alert" className="alert">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info h-6 w-6 shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>12 unread messages. Tap to see.</span>
            </div> */}
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
                            value={messageData.content}
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
