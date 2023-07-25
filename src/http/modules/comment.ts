import axios from '../axios'


//获取评论列表
export const getList = (page = 1, pageSize = 10) => {
    return axios({
      url: 'Comment',
      method: 'get',
      params: {page, pageSize}
    })
  }

  export const getListsearch = (page = 1, pageSize = 10,Search) => {
    return axios({
      url: 'Comment',
      method: 'get',
      params: {page, pageSize,Search}
    })
  }


//删除评论
export const delteComment = (id) =>{
    return axios({
        url:"Comment/" + id,
        method:'delete',
    })
}

//批量删除
export const RangeDel = (data)=>{
  return axios({
    url:"Comment/RangeDelComment",
    method:'delete',
    headers: {'Content-Type': 'application/json'},
    data
})
}
