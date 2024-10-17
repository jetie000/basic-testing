import axios from 'axios';
import { throttledGetDataFromApi } from './index';

const mockResponse = { data: { id: 1, title: 'Test Post' } };

jest.mock('axios');

jest.mock('lodash', () => ({
  throttle: jest.fn((fn) => fn),
}));

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    axios.create = jest.fn().mockImplementation(() => axios);
    axios.get = jest.fn().mockImplementation(() => {
      return Promise.resolve(mockResponse);
    });
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi('/posts/1');

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi('/posts/1');

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith('/posts/1');
  });

  test('should return response data', async () => {
    const data = await throttledGetDataFromApi('/posts/1');

    expect(data).toEqual(mockResponse.data);
  });
});
