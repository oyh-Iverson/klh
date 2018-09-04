 $(document).on('click','#guanzuwx', function () {
        $.popup('.popup-about');
    });

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
        		str = "<a href='login.html' class='info_li' title='登录'>立即登录</a>"
        	} else {
        		str = "<div class='info_li' >"+userPhone+"</div>";
        	}
        	$("#userInfo").append(str);
        },
        methods: {
            // 获取用户信息
            getUserInfo: function(){
            	var VIPRank = localStorage.getItem('VIPRank');
            	console.log(VIPRank);
            	if(VIPRank == null || VIPRank == "1"){
            		mui(".Member")[0].innerHTML="铜牌会员";
            	}else if(VIPRank == "2"){
            		mui(".Member")[0].innerHTML="银牌会员";
            	}else if(VIPRank == "3"){
            		mui(".Member")[0].innerHTML="金牌会员";
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