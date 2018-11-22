/**
 * Axios Request Wrapper
 * ---------------------
 *
 */

import axios from 'axios';
import { isBrowser, isMobile, deviceDetect, isTablet } from 'react-device-detect';

// import constants from 'shared/constants'

/**
 * Create an Axios Client with defaults
 */
const client = axios.create({
  headers: {
    token: 'thisIsmyToken',
    crossDomain: true,
    device: {
      isMobile,
      isBrowser,
      isTablet,
      deviceData: deviceDetect() // This fucntion returns an object
    }
  }
});

/**
 * Request Wrapper with default success/error actions
 */
const request = function(options) {
  const onSuccess = function(response) {
    console.debug('Request Successful!', response);
    return response.data;
  };

  const onError = function(error) {
    console.error('Request Failed:', error.config);

    if (error.response) {
      // Request was made but server responded with something
      // other than 2xx
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
      console.error('Headers:', error.response.headers);
    } else {
      // Something else happened while setting up the request
      // triggered the error
      console.error('Error Message:', error.message);
    }

    return Promise.reject(error.response || error.message);
  };

  return client(options)
    .then(onSuccess)
    .catch(onError);
};

export default request;
