import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const createInstance = () => {
  const instance = axios.create({
    baseURL: `${process.env.API_BASE_URL_USER}`,
    timeout: 30000,
  });

  instance.interceptors.request.use(async (request) => {
    request.headers["Content-Type"] = "application/json";
    return request;
  });

  return instance;
};


export const UserInstance = async<T = unknown>(
  config: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  const instance = createInstance();
  return instance(config);
};
