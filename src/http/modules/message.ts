import axios from '../axios'

//获取留言列表
export const getList = (page=1,pageSize=10)=>{
    return axios({
        url: 'MsgBoard',
        method: 'get',
        params: {page, pageSize}
    })
}

//删除留言
export const delteMsg = (id) =>{
    return axios({
        url:"MsgBoard/" + id,
        method:'delete',
    })
}

//获取留言回复列表
export const getReplyList = (page=1,pageSize=10)=>{
    return axios({
        url: 'MsgBoard/GetMessageReply',
        method: 'get',
        params: {page, pageSize}
    })
}

//删除留言
export const delteMsgReply = (id) =>{
    return axios({
        url:"MsgBoard/DelMessageReply/" + id,
        method:'delete',
    })
}
