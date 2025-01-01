import { expect } from "@playwright/test";

const mockServerUrl = "http://localhost:3001";

export const overrideResponse = async (request, body) => {
  const response = await request.post(`${mockServerUrl}/override/register`, {
    data: body,
  });
  expect(response.ok()).toBeTruthy();
};

export const resetOverrideResponse = async (request) => {
  const response = await request.post(`${mockServerUrl}/override/reset`);
  expect(response.ok()).toBeTruthy();
};

export const resetDB = async (request) => {
  const response = await request.post(`${mockServerUrl}/resetdb`);
  expect(response.ok()).toBeTruthy();
};
