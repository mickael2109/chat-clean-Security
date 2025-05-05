import { MessageInterface } from "../../types/MessageInterface";



export interface MessageState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    message : MessageInterface | null;
    messages: MessageInterface[] 
}

