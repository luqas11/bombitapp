import axios from 'axios';

import {REQUEST_TIMEOUT} from '../constants';

export type DeviceStatuses = 0 | 1 | 2;

export type SystemData = {
  time_limit: number;
  devices: {
    status: DeviceStatuses;
    current_time: number;
    mean_time: number;
    run_count: number;
    input_status: boolean;
    history: number[];
  }[];
};

type Response = {
  data: SystemData;
};

export type ErrorResponse = {error_code: string; error_message: string};

const axiosInstance = axios.create({
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
 * Sets the base URL to be used in the Axios instance
 * @param ip address where the device is listening, including port (e.g. 192.168.0.11:3004)
 */
export const setBaseURL = async (ip: string) => {
  axiosInstance.defaults.baseURL = 'http://' + ip;
};

/**
 * Gets the device status
 * @returns a device status object
 */
export const getStatus = async () => {
  const {data}: Response = await axiosInstance.get('/status');
  return data;
};

/**
 * Clears the recorded data from a specified device
 * @param deviceId id of the device to be cleared
 */
export const clearHistory = async (deviceId: number) => {
  await axiosInstance.get('/clear-history', {params: {device: deviceId}});
};

/**
 * Change the working time limit for the devices
 * @param timeLimit time to be set as the new limit
 */
export const changeTimeLimit = async (timeLimit: string) => {
  await axiosInstance.get('/change-time-limit', {
    params: {time_limit: timeLimit},
  });
};

/**
 * Resumes a device stopped for exceeding the time limit
 * @param deviceId id of the device to be resumed
 */
export const resume = async (deviceId: number) => {
  await axiosInstance.get('/resume', {
    params: {device: deviceId},
  });
};
