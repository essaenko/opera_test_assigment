import { IBlock } from "../store/types";

export interface IAPIResponse {
  status: 'error' | 'ok';
  error?: string;
  data?: any;
}

export interface IAPIResult {
  error?: string;
  data?: IBlock;
}

export const handleResponse = async (response: Response): Promise<IAPIResult> => {
  const result: IAPIResponse = await response.json();
  
  if (response.status >= 400) {
    return {
      error: result.error,
    }
  } else {
    return {
      data: result.data,
    }
  }
}