//api/basics/applyCash/createApplyCashModel.do    applyCashBalance 申请提现金额        applyCashAccount 到账账户
    var app = new Vue({
        el: '#withdrawal',
        data:{
            accounts:"",
            money:"",
            titleTip:"",
            userPhone:"",
            validateCode:"",
            withdrawal:"javascript:;"
        },
        mounted(){
            this.titleTip = localStorage.getItem("balance");
            this.userPhone = localStorage.getItem("userPhone"); 
            if(!this.userPhone){          	
                    window.location.href="login.html";           
            }
            var lphone = this.userPhone.replace(/(\d{3})\d{4}(\d{4})/,"$1****$2");
            console.log(lphone);
            this.userPhone = lphone;
        },
        methods:{  
            //获取邀请记录
            getData(){
                var self = this;
                var userId = localStorage.getItem("userId") || "";
                var urlStr = Util.baseUrl + '/DuG/api/basics/applyCash/createApplyCashModel.do';
                var md5Str = Util.basekey;
                if(self.accounts == ""){
                    $.toast('请输入提款账户');
                }else{
                    if(self.money == ""){
                        $.toast('请输入提款金额');
                    }else{
                    	if(self.validateCode == ""){
                            $.toast('请输入验证码');
                        }else{
                        	$.ajax({
                                type:"get",
                                url:urlStr,
                                async:true,
                                //dataType:'json',
                                data:{
                                    key:md5Str,
                                    auth: Util.base32Encode('key'),
                                    token: md5(md5Str),
                                    userID:userId,
                                    applyCashBalance:self.money,
                                    applyCashAccount:self.accounts,
                                    validateCode:self.validateCode
                                   
                                },
                                success:function (res) {
                                    if(res.ret_code == '0' && res.ret_msg == "SUCCESFULLY!"){
                                        window.location.href = "applyCash.html"
                                        console.log(res);
                                    }else{
                                        $.toast(res.ret_msg);
                                    }
                                },
                                error: function(res){
                                    $.toast('网路请求失败，请稍后重试');
                                }
                            })
                        }
                        
                    }
                }

            },
            getvalidateCode(){
            	var userId = localStorage.getItem("userId") || "";
            	var urlStr = Util.baseUrl + '/DuG/api/basics/validateCode/findApplyCashValidateCode.do';
                var md5Str = Util.basekey;
            	if(userId == ""){
            		$.toast('请先登录');
            	}else {
            		$.ajax({
                        type:"get",
                        url:urlStr,
                        async:true,
                        //dataType:'json',
                        data:{
                            key:md5Str,
                            auth: Util.base32Encode('key'),
                            token: md5(md5Str),
                            userID:userId
                        },
                        success:function (res) {
                        	$.toast('发送成功');
                        },
                        error: function(res){
                            $.toast('网路请求失败，请稍后重试');
                        }
                    })
            	}
            	
            }
        }

    });