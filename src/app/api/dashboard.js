import request from '../utils/request'

export function getRevenueAndTransition(val) {


  let fd = new FormData(); // Currently empty
  fd.append('how', val);


  return request({
    url: '/group__by',
    method: 'post',
    data: fd
  })
}
