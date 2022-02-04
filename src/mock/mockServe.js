import Mock from 'mockjs';
import banner from './banner';
import floor from './floor';
// import axios from 'axios';

Mock.mock('/mock/banner', 'get', { code: 200, data: banner })
Mock.mock('/mock/floor', 'get', { code: 200, data: floor })

// axios.get('/mock/banner').then(
//   response => console.log(response.data),
//   error => console.log(error.message)
//   )
