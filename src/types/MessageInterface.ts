export interface MessageInterface {
    _id: number;
    senderId: string; 
    receiverId: string;
    content: contentMessageInterface;
    timestamp: string;
    decryptedContent: string
}


export interface contentMessageInterface {
    forReceiver: string; 
    forSender: string;
}


export interface dataMessageInterface {
    senderId: string | undefined; 
    receiverId: string | undefined;
    content: string | undefined
}



