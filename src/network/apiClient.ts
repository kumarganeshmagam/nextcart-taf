import { request, APIRequestContext } from '@playwright/test';

/**
 * Utility for making API requests.
 */
export class APIClient {
  private requestContext: APIRequestContext;

  constructor(requestContext: APIRequestContext) {
    this.requestContext = requestContext;
  }

  async get(endpoint: string, headers?: { [key: string]: string }) {
    const response = await this.requestContext.get(endpoint, { headers });
    return response;
  }

  async post(endpoint: string, data: any, headers?: { [key: string]: string }) {
    const response = await this.requestContext.post(endpoint, { data, headers });
    return response;
  }
}
