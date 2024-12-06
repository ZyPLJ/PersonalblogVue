import axios from '../axios'

// 获取全部标签
export const getAllTag = () => {
    return axios({
      url: 'Tag/All',
      method: 'get',
    })
  }

//分页查询标签
export const getList = (
  onlyPublished = false,
  status = '',
  categoryId = 0,
  search = '',
  sortBy = '',
  TagId = 0,
  page = 1,
  pageSize = 20
) => {
  return axios({
    url: '/Tag/GetPage',
    method: 'get',
    params: {onlyPublished, status, categoryId, search, sortBy,TagId, page, pageSize}
  })
}

//删除单个标签
export const DelTag = itemId =>{
  return axios({
    url: `Tag/${itemId}/`,
    method: 'delete'
  })
}

//新增标签
export const addTag = data => {
  return axios({
    url: `Tag`,
    method: 'post',
    data: {
      TagName: data.Name
    }
  })
}
//编辑标签
export const UpdateTag = (id,data) => {
  return axios({
    url: `Tag`,
    method: 'put',
    data: {
      id: id,
      Name:data.Name
    }
  })
}