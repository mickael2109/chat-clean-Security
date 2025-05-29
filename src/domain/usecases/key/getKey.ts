import { keyRepository } from "../../../application/repository/keyRepository";

export const getKey = async (): Promise<string> => {
  return await keyRepository.getKey();
};
