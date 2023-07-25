import axios from '../axios'

//获取公告
export const getNotice = ()=>{
    return axios({
        url:'Notice/Get',
        method:'get'
    })
}

//删除公告
export const delNotice = (id)=>{
    return axios({
        url:'Notice/'+ id,
        method:'delete'
    })
}

//添加公告
export const addNotice = (Content)=>{
    return axios({
        url:'Notice',
        method:'get',
        params:{Content}
    })
}
