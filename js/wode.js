// $(document).on('click','#guanzuwx', function () {
//    $.popup('.popup-about');
//   
//});

    var app = new Vue({
        el: '#app',
        data: {
            userInfo: {
                name: '实名认证',
                userId: '立即登录',
                userName: '尚未登录',
                isPerfect: '0', // 信息是否完善   0未完善  1已完善
            },
        },
        mounted: function() {
            this.userInfo.name = localStorage.getItem('userPhone') || '实名认证',
            this.userInfo.userId = localStorage.getItem('userId') || '立即登录',
            this.getUserInfo();
            var userPhone = localStorage.getItem('userPhone') || '';
        	var str = "";
        	if (userPhone == '') {
        		
        		str = "<a href='login2.html' class='info_li' title='登录'>立即登录</a>"
        	} else {
        		str = "<div class='info_li' >"+userPhone+"</div>";
        	}
        	$("#userInfo").append(str);
        },
        methods: {
        	//设置
        	shezhi:function(){
        		//console.log("131");
        		window.location.href = "shezhi.html";
        		
        	},
        	//我的消息
        	youjian:function(){
        		
        		window.location.href = "xiaoxi.html";
        		
        	},
        	//反馈意见
        	wodefankui:function(){
        		
        		var urlStr = Util.baseUrl + '/DuG/api/user/user/saveFunctionClick.do';
					var userID = localStorage.getItem('userId') || '';
					console.log(userID);
					var functionNum="反馈意见_我的";
					var sourceType= "0";
					var md5Str = Util.basekey 
										+userID
										+functionNum
										+sourceType;
					$.ajax({						
						type:"post", 
						url: urlStr,
                        async:true,                        
                        data:{
                        	userID: userID,
                        	functionNum:functionNum,
                        	key: Util.basekey,
                            auth: Util.base32Encode('key,userID,functionNum,sourceType'),
                            token: md5(md5Str),
                            sourceType:sourceType
                        },
                        success:function(res){
                        	console.log(res);
                        	console.log(sourceType);
                        	window.location.href = "yjfk.html";
                        },
                        error: function(res){
                            $.toast('网路请求失败，请稍后重试');
                        }
					 
					});
        	},
        	//帮助中心
        	wodeBZ:function(){
        		
        		var urlStr = Util.baseUrl + '/DuG/api/user/user/saveFunctionClick.do';
					var userID = localStorage.getItem('userId') || '';
					console.log(userID);
					var functionNum="帮助中心_我的";
					var sourceType= "0";
					var md5Str = Util.basekey 
										+userID
										+functionNum
										+sourceType;
					$.ajax({						
						type:"post", 
						url: urlStr,
                        async:true,                        
                        data:{
                        	userID: userID,
                        	functionNum:functionNum,
                        	key: Util.basekey,
                            auth: Util.base32Encode('key,userID,functionNum,sourceType'),
                            token: md5(md5Str),
                            sourceType:sourceType
                        },
                        success:function(res){
                        	console.log(res);
                        	console.log(sourceType);
                        	window.location.href = "help.html";
                        },
                        error: function(res){
                            $.toast('网路请求失败，请稍后重试');
                        }
					 
					});
        	},
        	//关注公众号
        	gzh:function(){
        		
        		var urlStr = Util.baseUrl + '/DuG/api/user/user/saveFunctionClick.do';
					var userID = localStorage.getItem('userId') || '';
					console.log(userID);
					var functionNum="关注公众号_我的";
					var sourceType= "0";
					var md5Str = Util.basekey 
										+userID
										+functionNum
										+sourceType;
					$.ajax({						
						type:"post", 
						url: urlStr,
                        async:true,                        
                        data:{
                        	userID: userID,
                        	functionNum:functionNum,
                        	key: Util.basekey,
                            auth: Util.base32Encode('key,userID,functionNum,sourceType'),
                            token: md5(md5Str),
                            sourceType:sourceType
                        },
                        success:function(res){
                        	console.log(res);
                        	console.log(sourceType);
                        	window.location.href = "guanzhuGZH.html";
                        },
                        error: function(res){
                            $.toast('网路请求失败，请稍后重试');
                        }
					 
					});
        		//alert("准备中");
        	},
        	//客服中心
        	
        	kefuzhong:function(){
        		//console.log("112");
        		
        		var urlStr = Util.baseUrl + '/DuG/api/user/user/saveFunctionClick.do';
					var userID = localStorage.getItem('userId') || '';
					console.log(userID);
					var functionNum="客服中心_我的";
					var sourceType= "0";
					var md5Str = Util.basekey 
										+userID
										+functionNum
										+sourceType;
					$.ajax({						
						type:"post", 
						url: urlStr,
                        async:true,                        
                        data:{
                        	userID: userID,
                        	functionNum:functionNum,
                        	key: Util.basekey,
                            auth: Util.base32Encode('key,userID,functionNum,sourceType'),
                            token: md5(md5Str),
                            sourceType:sourceType
                        },
                        success:function(res){
                        	console.log(res);
                        	console.log(sourceType);
                        	window.location.href = "kefu.html";
                        },
                        error: function(res){
                            $.toast('网路请求失败，请稍后重试');
                        }
					 
					});
        	},
        	//
        	heihu:function(){
        		//window.location.href="daikuan2.html";
		    		var self = this;
					var urlStr = Util.baseUrl + '/DuG/api/user/user/saveFunctionClick.do';
					var userID = localStorage.getItem('userId') || '';
					console.log(userID);
					var functionNum="黑户查询_我的";
					var sourceType= "0";
					var md5Str = Util.basekey 
										+userID
										+functionNum
										+sourceType;
					$.ajax({						
						type:"post", 
						url: urlStr,
                        async:true,                        
                        data:{
                        	userID: userID,
                        	functionNum:functionNum,
                        	key: Util.basekey,
                            auth: Util.base32Encode('key,userID,functionNum,sourceType'),
                            token: md5(md5Str),
                            sourceType:sourceType
                        },
                        success:function(res){
                        	console.log(res);
                        	console.log(sourceType);
                        	window.location.href = "NetBlack.html";
                        },
                        error: function(res){
                            $.toast('网路请求失败，请稍后重试');
                        }
					 
					});
        		
        	},
        	//我的额度
        	remendaikuan:function(){
		    		var self = this;
					var urlStr = Util.baseUrl + '/DuG/api/user/user/saveFunctionClick.do';
					var userID = localStorage.getItem('userId') || '';
					console.log(userID);
					var functionNum="我的额度_我的";
					var sourceType= "0";
					var md5Str = Util.basekey 
										+userID
										+functionNum
										+sourceType;
					$.ajax({						
						type:"post", 
						url: urlStr,
                        async:true,                        
                        data:{
                        	userID: userID,
                        	functionNum:functionNum,
                        	key: Util.basekey,
                            auth: Util.base32Encode('key,userID,functionNum,sourceType'),
                            token: md5(md5Str),
                            sourceType:sourceType
                        },
                        success:function(res){
                        	console.log(res);
                        	console.log(sourceType);
                        	window.location.href = "Myquota.html";
                        },
                        error: function(res){
                            $.toast('网路请求失败，请稍后重试');
                        }
					 
					});
        		
        	},
        	//差黑
        	chahei:function(){
        		
        		var urlStr = Util.baseUrl + '/DuG/api/user/user/saveFunctionClick.do';
					var userID = localStorage.getItem('userId') || '';
					console.log(userID);
					var functionNum="查黑记录_我的";
					var sourceType= "0";
					var md5Str = Util.basekey 
										+userID
										+functionNum
										+sourceType;
					$.ajax({						
						type:"post", 
						url: urlStr,
                        async:true,                        
                        data:{
                        	userID: userID,
                        	functionNum:functionNum,
                        	key: Util.basekey,
                            auth: Util.base32Encode('key,userID,functionNum,sourceType'),
                            token: md5(md5Str),
                            sourceType:sourceType
                        },
                        success:function(res){
                        	console.log(res);
                        	console.log(sourceType);
                        	window.location.href = "Credithistory.html";
                        },
                        error: function(res){
                            $.toast('网路请求失败，请稍后重试');
                        }
					 
					});
        		//$.alert("敬请期待");
        	},
        	//收藏
        	shouc:function(){
        		var self = this;
        		
        		var urlStr = Util.baseUrl + '/DuG/api/user/user/saveFunctionClick.do';
					var userID = localStorage.getItem('userId') || '';
					console.log(userID);
					var functionNum="我的收藏_我的";
					var sourceType= "0";
					var md5Str = Util.basekey 
										+userID
										+functionNum
										+sourceType;
					$.ajax({						
						type:"post", 
						url: urlStr,
                        async:true,                        
                        data:{
                        	userID: userID,
                        	functionNum:functionNum,
                        	key: Util.basekey,
                            auth: Util.base32Encode('key,userID,functionNum,sourceType'),
                            token: md5(md5Str),
                            sourceType:sourceType
                        },
                        success:function(res){
                        	console.log(res);
                        	console.log(sourceType);
                        	window.location.href = "shoucang.html";
                        },
                        error: function(res){
                            $.toast('网路请求失败，请稍后重试');
                        }
					 
					});
        		
        	},
            // 获取用户信息
            getUserInfo: function(){
            	var VIPRank = localStorage.getItem('VIPRank');
            	//console.log(VIPRank);
            	if(VIPRank == null || VIPRank == "1"){
            		//mui(".Member")[0].innerHTML="铜牌会员";
            	}else if(VIPRank == "2"){
            		//mui(".Member")[0].innerHTML="银牌会员";
            	}else if(VIPRank == "3"){
            		//mui(".Member")[0].innerHTML="金牌会员";
            	}
            	
                var self = this;
                var urlStr = Util.baseUrl + '/DuG/api/user/user/findUserInfo.do';
                var userId = self.userInfo.userId;
                var md5Str = Util.basekey + userId;
                if (userId == '') {
                    return;
                }

                $.ajax({
                    type:"get",
                    url: urlStr,
                    async:true,
                    //dataType:"json",
                    data: {
                        userId:	userId,		// 用户ID
                        key: Util.basekey,
                        auth: Util.base32Encode('key,userId'),
                        token: md5(md5Str)
                    },
                    success: function(res){
                        res = JSON.parse(res);
                        var ret_data = res.ret_data;
                        self.userInfo.userName = ret_data.userName || '嘟客贷款';
                        self.userInfo.isPerfect = ret_data.isPerfect;
                    },
                    error: function(res){
                        $.toast('网路请求失败，请稍后重试');
                    }
                });
            },
            // 进入个人信息
            enterInfo: function(){
                var userId = localStorage.getItem('userId') || '';
                if (userId == '') {
                    weui.confirm('您还未登录喔~', {
                        title: '提示',
                        buttons: [{
                            label: '取消',
                            type: 'default',
                            onClick: function(){

                            }
                        }, {
                            label: '去登录',
                            type: 'primary',
                            onClick: function(){
                            	var referee = localStorage.getItem('referee') || "";
                                var refereeCode = localStorage.getItem('refereeCode') || "";
                                window.location.href = "login.html?referee="+referee+'&refereeCode='+refereeCode;
                            }
                        }]
                    });
                    return;
                }
                window.location.href = 'info.html';
            },
            enterMy:function () {
                var userId = localStorage.getItem('userId') || '';
                if (userId == '') {
                    weui.confirm('您还未登录喔~', {
                        title: '提示',
                        buttons: [{
                            label: '取消',
                            type: 'default',
                            onClick: function(){

                            }
                        }, {
                            label: '去登录',
                            type: 'primary',
                            onClick: function(){
                            	var referee = localStorage.getItem('referee') || "";
                                var refereeCode = localStorage.getItem('refereeCode') || "";
                                window.location.href = "login.html?referee="+referee+'&refereeCode='+refereeCode;
                            }
                        }]
                    });
                    return;
                }
                window.location.href = 'myCommission.html';
            }
        }
    })
    
    function isLogin(){
    	
    }