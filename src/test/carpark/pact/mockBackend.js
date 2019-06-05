'use strict';

const axios = require('axios');

exports.getCars = (endpoint) => {
  const url = endpoint.url;
  const port = endpoint.port;

  return axios.request({
    method: 'GET',
    baseURL: `${url}:${port}`,
    url: '/api/cars',
    headers: { 'Accept': 'application/json' }
  })
};

exports.createCar = (endpoint) => {
  const url = endpoint.url;
  const port = endpoint.port;
  const body = endpoint.body;

  return axios.request({
    method: 'POST',
    baseURL: `${url}:${port}`,
    url: '/api/cars',
    data: body,
    headers: { 'Accept': 'application/json' }
  })
};
