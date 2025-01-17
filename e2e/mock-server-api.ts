import { APIRequestContext, expect } from "@playwright/test";

const mockServerUrl = "http://localhost:3001";

export const overrideResponse = async (request: APIRequestContext, body, headers) => {
  const response = await request.post(`${mockServerUrl}/override/register`, {
    data: body,
    headers,
  });
  expect(response.ok()).toBeTruthy();
};

export const resetOverrideResponse = async (request:APIRequestContext, headers) => {
  const response = await request.post(`${mockServerUrl}/override/reset`, {headers});
  expect(response.ok()).toBeTruthy();
};

export const resetDB = async (request, headers) => {
  const response = await request.post(`${mockServerUrl}/resetdb`, {headers});
  expect(response.ok()).toBeTruthy();
};
