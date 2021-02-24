import { Response } from 'node-fetch';

export const createResponse = async (requestResult: Response): Promise<{
  code: number;
  response: {
    status: 'error' | 'ok';
    error?: string;
    data?: any;
  }
}> => {
  if (requestResult.status >= 500) {
    return {
      code: 500,
      response: {
        status: 'error',
        error: 'Cloudflare service temporary unreachable'
      }
    }
  }

  if (requestResult.status >= 400) {
    return {
      code: 500,
      response: {
        status: 'error',
        error: 'Internal service error',
      }
    }
  }

  const result = await requestResult.json();

  if (result.error) {
    return {
      code: 400,
      response: {
        status: 'error',
        error: result.error.message,
      }
    }
  }

  if (result.result === null) {
    return {
      code: 404,
      response: {
        status: 'error',
        error: 'There is no data for number',
      }
    }
  }

  return {
    code: 200,
    response: {
      status: 'ok',
      data: result.result,
    }
  }
}