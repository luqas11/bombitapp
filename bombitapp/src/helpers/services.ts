import axios from 'axios';
import {BASE_URL, REQUEST_TIMEOUT} from '../constants';

export type DeviceStatuses = 0 | 1 | 2 | 3;

export type DeviceData = {
  time_limit: number;
  outputs: {
    status: DeviceStatuses;
    current_time: number;
    mean_time: number;
    run_count: number;
    sensor_status: boolean;
    history: number[];
  }[];
};

type Response = {
  data: DeviceData;
};

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: REQUEST_TIMEOUT,
});

axiosInstance.interceptors.request.use(req => {
  console.log('Request ' + req.url);
  return req;
});

axiosInstance.interceptors.response.use(
  res => {
    console.log('Response ' + res.config.url);
    return res;
  },
  err => {
    if (err.code === 'ERR_CANCELED') {
      console.log('Canceled ' + err.config.url);
      return Promise.reject(undefined);
    }
    return Promise.reject(err);
  },
);

/**
 * Gets the device status
 * @returns a device status object
 */
export const getStatus = async () => {
  const {data}: Response = await axiosInstance.get('/status');
  return data;
};
