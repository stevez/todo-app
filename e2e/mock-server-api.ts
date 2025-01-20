import { APIRequestContext, expect } from "@playwright/test";

const mockServerUrl = "http://localhost:3001";

export const overrideResponse = async (request: APIRequestContext, body, headers) => {
  await request.post(`${mockServerUrl}/override/register`, {
    data: body,
    headers,
  });
};

export const resetOverrideResponse = async (request:APIRequestContext, headers) => {
  await request.post(`${mockServerUrl}/override/reset`, {headers});
};

export const resetDB = async (request, headers) => {
  await request.post(`${mockServerUrl}/resetdb`, {headers});
};
