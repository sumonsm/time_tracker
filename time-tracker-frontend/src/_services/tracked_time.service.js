import axios from 'axios';
import { apiUrl, authHeader } from '../_helpers';

export const trackedTimeService = {
    fetchItems,
    createItem
};

function fetchItems() {
  const requestOptions = {
    method: 'GET',
    url: `${apiUrl}/v1/tracked_times/`,
    headers: authHeader()
  };
  return axios(requestOptions);
}

function createItem(started, stopped) {
  const requestOptions = {
      method: 'POST',
      url: `${apiUrl}/v1/tracked_times/`,
      headers: authHeader(),
      data: {
        tracked_times: {
          started: started,
          stopped: stopped
        }
      }
  };
  return axios(requestOptions);
}
