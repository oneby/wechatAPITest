'use strict'

var Koa = require('koa');
var sha1 = require('sha1');
var config = {
	wechat: {
		appID: 'wx9e3f1c63dc2d1353',
		appSecret: '91a02e6f8de18e99e1c91a5b55f345f7',
		token: 'weixin'
	}
}

var app = new Koa();

app.use(function *(next) {
	console.log(this.query)
	
	var token = config.wechat.token;
	var signature = this.query.signature;
	var nonce = this.query.nonce;
	var timestamp = this.query.timestamp;
	var echostr = this.query.echostr
	var str = [token, timestamp, nonce].sort().join('');
	var sha = sha1(str);
	
	if(sha === signature) {
		this.body = echostr + '' ;
	}
	else {
		this.body = 'wrong';
	}
	
});
	app.listen(3100);
	
	console.log('Listening: 3100');
