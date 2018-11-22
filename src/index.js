
import request from './request';

function get(url) {
  return request({
    url: url,
    method: 'GET'
  });
}

function post(url, content) {
  return request({
    url: url,
    method: 'POST',
    data: {
      content
    }
  });
}

const Services = {
  get,
  post //, update, delete, etc. ...
};

export default Services;
