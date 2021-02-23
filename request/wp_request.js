const BASE_URL="https://159.75.101.5/renren-fast"; //开发时使用本地接口，在上线时只需要修改此处接口为线上地址即可
// const BASE_URL="http://localhost:8080/renren-fast";
// const SVR_URL="https://lzebaba.club/renren-fast";
const SVR_URL="https://159.75.101.5/renren-fast";

if(process.env.NODE_ENV === 'development'){
    console.log('开发环境')
}else{
    console.log('生产环境')
}

export const myRequest = (options) => { //传入的options是一个json对象
	return new Promise((resolve,reject) => {
		uni.request({
			url: process.env.NODE_ENV === 'development' ? BASE_URL + options.url : SVR_URL + options.url,
			method: options.methods || "GET",
			data: options.data || {},
			dataType: options.dataType || "json",
			header: options.header,
			success: (res) => {
				if (res.data.code === 401) {
					uni.showToast({
						title:"token失效，请重新登录",
					})
					uni.navigateTo({
						url: "/pages_sub/sys/login"
					})
				} else if (res.data.code !== 0){
					return uni.showToast({
						title:"获取数据失败"
					})
				}
				console.log(res)
				resolve(res)
			},
			fail: (err) => {
				uni.showToast({
					title:"接口请求失败"
				})
				console.log(err)
				reject(err)
			},
			complete: (res) => {
				if (res.statusCode === 200) {
					resolve(res)
				} else {
					reject(res)
				}
				console.log(res)
			}
		})
	})
}
