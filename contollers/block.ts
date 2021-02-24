import * as express from 'express'
import fetch, { Response } from 'node-fetch';

import { createResponse } from '../utils/request.utils';

export const latestAction = async (request: express.Request, response: express.Response) => {
  const result: Response = await fetch('https://cloudflare-eth.com', {
    method: 'POST',
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: 'eth_getBlockByNumber',
      params: ['latest', true],
      id: Math.round(Math.random() * 256),
    }),
    headers: {
      'Content-Type': 'application/json',
    }
  });

  const answer = await createResponse(result)

  response.statusCode = answer.code;
  response.json(answer.response);
}

export const searchAction = async (request: express.Request, response: express.Response) => {
  const { blockID } = request.params;

  if (!blockID || isNaN(+blockID)) {
    response.statusCode = 400;
    response.json({
      status: 'error',
      error: 'Bad block number parameter',
    });
  }

  const result: Response = await fetch('https://cloudflare-eth.com', {
    method: 'POST',
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: 'eth_getBlockByNumber',
      params: [`0x${(+blockID).toString(16)}`, true],
      id: Math.round(Math.random() * 256),
    }),
    headers: {
      'Content-Type': 'application/json',
    }
  });

  const answer = await createResponse(result)

  response.statusCode = answer.code;
  response.json(answer.response);
}