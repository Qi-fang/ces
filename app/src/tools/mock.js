// 引入mockjs
import Mock from 'mockjs'
// 获取 mock.Random 对象
const Random = Mock.Random;
// mock一组数据
Mock.mock('http://localhost:8081/test/city', 'get', () => {
	let citys = []
	for (let i = 0; i < 20; i++) {
		let obj = {
			ID: Random.natural(1, 100000), //模拟id
			ranking: i + 1, //模拟排名
			d_total: Random.natural(100, 990),
			w_total: Random.natural(1000, 9900),
			m_total: Random.natural(10000, 99000),
			all_total: Random.natural(100000, 990000),
			d_money: Random.natural(1, 100),
			w_money: Random.natural(10, 500),
			m_money: Random.natural(100, 1000),
			all_money: Random.natural(1000, 10000),
			phone: Random.natural(13000000000, 18999999999), //模拟电话号码
			cname: Random.cname(), //模拟中文名
			title: Random.csentence(1, 15), //模拟标题
			content: Random.csentence(1, 50), //模拟内容
			picture: Random.dataImage('300x250', 'mock的图片'), //模拟博客图片
			date: Random.datetime('yyyy-MM-dd A HH:mm'), //模拟时间
			img: Random.dataImage('300x250', 'mock的图片'),//活动通知图片
			new_content: Random.csentence(1, 50),//活动内容详情
			friends_title: Random.csentence(1, 15),//博客圈内容标题
			friends_content: Random.csentence(1, 50),//博客圈内容详情
			friends_picture: Random.dataImage('90x90', 'mock的图片'), //模拟博客朋友圈图片
			image: Random.dataImage('300x250', 'mock的图片'),//彩金兑换图片
			bg: Random.dataImage('420x250', 'mock的图片'),//博客背景图
			background: Random.dataImage('300x250', 'mock的图片'),//头像
			picture: Random.dataImage('300x250', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
			token: Random.natural(6, 12)
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
