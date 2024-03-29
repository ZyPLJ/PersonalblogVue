import axios from '../axios'

export const getAll = () => {
  return axios({
    url: 'Config',
    method: 'get',
  })
}

export const get = itemId => {
  return axios({
    url: `Config/${itemId}/`,
    method: 'get',
  })
}

export const deleteItem = itemId => {
  return axios({
    url: `Config/${itemId}/`,
    method: 'delete'
  })
}

export const add = data =>{
  return axios({
    url: `Config`,
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    data
  })
}

export const update = data => {
  return axios({
    url: `Config/${data.key}/`,
    method: 'put',
    data
  })
}

export const isshow = (id) =>{
  return axios({
    url: `Config/`+ id,
    method: 'get',
  })
}
