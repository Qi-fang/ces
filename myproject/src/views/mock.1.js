// 引入mockjs
import Mock from 'mockjs'
// 获取 mock.Random 对象
const Random = Mock.Random;
// mock一组数据
Mock.mock('http://localhost:8081/test/city', 'get', () => {
	let citys = []
	for (let i = 0; i < 10; i++) {
		let obj = {
			ID: Random.natural(), //模拟id
			ranking: i + 1, //模拟排名
			total: Random.natural(),
			money: Random.natural(),
			phone: /^1[385][1-9]\d{8}/, //模拟电话号码
			canme: Random.cname(), //模拟中文名
			date: Random.datetime('yyyy-MM-dd A HH:mm'), //模拟时间
			thumbnail_pic_s: Random.dataImage('300x250', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
			id: i + 1,
			city: Random.city(),
			color: Random.color()
		}
		citys.push(obj)
	}
	return {
		cityList: citys
	}
})
// post请求,带参数,参数会在data中返回,会返回url,type,body三个参数,可以把data打印出来看看
Mock.mock('http://localhost:8081/test/cityInfo', 'post', (data) => {
	// 请求传过来的参数在body中,传回的是json字符串,需要转义一下
	const info = JSON.parse(data.body)
	return {
		img: Random.image('200x100', '#4A7BF7', info.name)
	}
})
