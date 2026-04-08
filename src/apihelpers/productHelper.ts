import { APIClient } from '../network/apiClient';

/**
 * Helper class for Product-related API calls.
 */
export class ProductHelper {
  private apiClient: APIClient;

  constructor(apiClient: APIClient) {
    this.apiClient = apiClient;
  }

  async getAllProducts() {
    return await this.apiClient.get('/v1/products');
  }

  async getProductById(id: string) {
    return await this.apiClient.get(`/v1/products/${id}`);
  }
}
