import Cookies from 'js-cookie';

export const keyRepository = {
  getKey: async (): Promise<string> => {
    return Cookies.get('___chat-key') || "";
  },
};
