let url = "http://rap2api.taobao.org/app/mock/166163/index/hotLists#"

let axios = require("axios")

axios.get(url,{
  pageNum:1,
  pageSize: 10
}).then( (res)=> {
  console.log(res.data.lists)
})