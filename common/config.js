let url_config = ""

if(process.env.NODE_ENV === 'development'){
    // 开发环境
    url_config = 'http://192.168.2.246:3333/'
}else{
    // 生产环境
    url_config = 'http://192.168.2.100:3333/'
}

export default url_config