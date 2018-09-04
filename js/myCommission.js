var app = new Vue({
        el: '#myCommission',
        data:{
            link:"http://klh.ijiakj.com/dkdk/template/home.html",
            showMsg:false,
            assets:"",
            showAmount:true,
            mos1:false,
            mos2:false,
            eyes:true,
            showRecord:false,
            invitationArr:[],
            invitationArr2:[],
            CP1:false,
            CP2:false,
            CP3:false,
            CP4:false,
            CP5:false,
            CP6:false,
            CP7:false,
            CP8:false,
            CP9:false
            
        },
//      created() {
//      	this.getInvitation();
//          this.getInvitation2();
//      },
        mounted(){
            this.getCommission(); 
            this.getInvitation();
            this.getInvitation2();    
            
        },
        
        methods:{ 

            checkArea(em){
                if (em == "1"){
                    var p = {
						url: location.href, /*获取URL，可加上来自分享到QQ标识，方便统计*/
						desc: '', /*分享理由(风格应模拟用户对话),支持多分享语随机展现（使用|分隔）*/
						title: '', /*分享标题(可选)*/
						summary: '', /*分享摘要(可选)*/
						pics: '', /*分享图片(可选)*/
						flash: '', /*视频地址(可选)*/
						site: '满艺网', /*分享来源(可选) 如：QQ分享*/
						style: '201',
						width: 32,
						height: 32
					};
					//分享到QQ
					var sharesinastring = 'http://connect.qq.com/widget/shareqq/index.html?title=' + $("#title").val() + '&summary=' + $("#url").val() + '&url=' + $("#url").val() + '&site="满艺网"';
					window.location.href = sharesinastring;
                    
                	}
                else if (em == "2"){ 
                	
             	
						
                	
                   console.log("什么情况咯");

                }
                else if (em == "3"){
                var p = {
                       url:location.href,
                        showcount:'0',/*是否显示分享总数,显示：'1'，不显示：'0' */
                        desc:'',/*默认分享理由(可选)*/
                        summary:'',/*分享摘要(可选)*/
                        title:'',/*分享标题(可选)*/
                        site:'满艺网',/*分享来源 如：腾讯网(可选)*/
                        pics:'', /*分享图片的路径(可选)*/
                        style:'203',
                        width:98,
                        height:22
                };
                       //分享到QQ空间
                var sharesinastring = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?title=' + $("#title").val() + '&url=' + $("#url").val() + '&site="满艺网"';
                window.location.href = sharesinastring;
      			}

            },
            //修改修改二维码点击
            qrcodeChange(){//生成二维码        
				window.location.href="QRCode.html";  
            },
            copy(){//复制链接
            	var clipboard = new Clipboard('.btner');
                

                clipboard.on('success', function(e) {
                    $.toast('复制成功');
                });
                clipboard.on('error', function(e) {
                    $.toast('复制失败');
                });
               
            },
            cloneTip(){
                this.showMsg = false;
            },
            invitFriends(){           	
                this.showMsg = true;
                this.twoWM = true;
                this.link =this.link+'?refereeCode='+localStorage.getItem("selfRefereeCode")+'&referee='+localStorage.getItem("referee");

            },
            //新增的日历跳转
            rili(){
            	window.location.href='rili.html';
            },
            
            showMoney(){
                this.showAmount = !this.showAmount;
                this.eyes=!this.eyes;
            },
            //获取佣金资产
            getCommission(){
                var self = this;
                // api/basics/loan/findCountUsersAndabonusMoney.do
                var userId = localStorage.getItem("userId") || "";
                var urlStr = Util.baseUrl + '/DuG/api/basics/loan/findCountUsersAndabonusMoney.do';
                var md5Str = Util.basekey;
                $.ajax({
                    type:"get",
                    url: urlStr,
                    async:true,
                    //dataType:'json',
                    data: {
                        key: Util.basekey,
                        auth: Util.base32Encode('key'),
                        token: md5(md5Str),
                        userID:userId
                    },
                    success: function(res){
                    	console.log(res);
                        // 获取成功
                        if (res.ret_code == '0') {
                            self.assets = res.ret_data;
                            localStorage.setItem("balance",self.assets.balance)
                        } else{
                            //$.toast(res.ret_msg);
                            //$.toast("您还没有登录,3秒后自动跳转登录");
                           
                            	window.location.href="login.html";
                            
                        }
                    },
                    error: function(res){
                        $.toast('网路请求失败，请稍后重试');
                    }
                });
            },
            //获取推广记录
            getInvitation(){            	
                var self = this;
                var userId = localStorage.getItem("userId") || "";
                //一级分拥的接口
                var urlStr = Util.baseUrl + '/DuG/api/basics/loan/findInviteList.do';
                var md5Str = Util.basekey;
                $.ajax({
                    type:"get",
                    url:urlStr,
                    async:true,
                    timeout : 10000,
                    //dataType:'json',
                    data:{
                        key:md5Str,
                        auth: Util.base32Encode('key'),
                        token: md5(md5Str),
                        userID:userId,
                        page:0,
                        rows:2
                        
                    },
                    success:function (res) {
                    	console.log("打印邀请记录的数据↓");
                    	console.log(res);
                        //获取成功
                        if(res.ret_code == '0'){
                        	
                            if(res.ret_data && res.ret_data.length > 0){
                                self.invitationArr = res.ret_data;
                                var ret_data = res.ret_data; 
                                
                                self.showRecord = true;
                                self.mos1 = true;
                                var VIPRank = localStorage.getItem('VIPRank');
      							console.log(VIPRank);
      						if(VIPRank == null || VIPRank == "1"){	
            					
      								self.CP1 = true;
      								self.CP4 = true;
      								self.CP7 = true;
      							
      						}else if(VIPRank == "2"){
      								self.CP2 = true;
      								self.CP5 = true;
      								self.CP8 = true;
      							
      						}else if(VIPRank == "3"){
      								self.CP3 = true;
      								self.CP7 = true;
      								self.CP9 = true;
      						}
                            
                            }else{
                                self.showRecord = false;           
                            }
                        }else{
                            //$.toast(res.ret_msg);
                            //$.toast("您还没有登录,3秒后自动跳转登录");
                            
                            	window.location.href="login.html";
                          
                            
                        }
                    },
                    error: function(res){
                        $.toast('网路请求失败，请稍后重试');
                    }
               });
                
            },
            getInvitation2(){
                var self = this;
                var userId = localStorage.getItem("userId") || "";
                //二级分拥的接口
                var urlStr = Util.baseUrl + '/DuG/api/basics/loan/findInviteList2.do';
                var md5Str = Util.basekey;
                $.ajax({
                    type:"get",
                    url:urlStr,
                    async:true,
                    timeout : 10000,
                    //dataType:'json',
                    data:{
                        key:md5Str,
                        auth: Util.base32Encode('key'),
                        token: md5(md5Str),
                        userID:userId,
                        page:0,
                        rows:2
                    },
                    success:function (res) {
                    	console.log("打印邀请记录的数据22↓");
                    	console.log(res);
                        //获取成功
                        if(res.ret_code == '0'){
                            if(res.ret_data && res.ret_data.length > 0){
                                self.invitationArr2 = res.ret_data;
                                var ret_data = res.ret_data;
                                self.showRecord = true;                               
                                self.mos2= true;
                                var VIPRank = localStorage.getItem('VIPRank');
      							console.log(VIPRank);
      							if(VIPRank == null || VIPRank == "1"){	
            						self.CP1 = true;
      								self.CP4 = true;
      								self.CP7 = true;
      							
      						}else if(VIPRank == "2"){
      								self.CP2 = true;
      								self.CP5 = true;
      								self.CP8 = true;
      							
      						}else if(VIPRank == "3"){
      								self.CP3 = true;
      								self.CP7 = true;
      								self.CP9 = true;
      						}     
                            }else{
                                self.showRecord = false;
                            }
                        }else{
                            //$.toast(res.ret_msg);
                            //$.toast("您还没有登录,3秒后自动跳转登录");
                           
                            	window.location.href="login.html";
                            
                        }
                    },
                    error: function(res){
                        $.toast('网路请求失败，请稍后重试');
                    }
                })
            }
            
        },

    });