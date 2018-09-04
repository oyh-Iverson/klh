mui.init({
				swipeBack: true //启用右滑关闭功能
			});
			(function($) {
				$('#scroll').scroll({
					indicators: true //是否显示滚动条
				});
				var segmentedControl = document.getElementById('segmentedControl');
				$('.mui-input-group').on('change', 'input', function() {
					if (this.checked) {
						var styleEl = document.querySelector('input[name="style"]:checked');
						var colorEl = document.querySelector('input[name="color"]:checked');
						if (styleEl && colorEl) {
							var style = styleEl.value;
							var color = colorEl.value;
							segmentedControl.className = 'mui-segmented-control' + (style ? (' mui-segmented-control-' + style) : '') + ' mui-segmented-control-' + color;
						}
					}
				});
			})(mui);
    Vue.use(VueLazyload,{
        preLoad: 1.3,
        error: '../img/dai.png',
        loading: '../img/loading.gif',
        attempt: 3
    })
    var app = new Vue({
        el:"#invitedRecord",
        data:{
            invitationArr:[],
            invitationArr2:[],
            lenderZheng:true, // true 升序  false   降序
            mondyZheng:true, // true 升序  false   降序
            bigNumber:-1, //0 时间排序  1佣金排序
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
        mounted(){
            this.getInvitation();
            this.getInvitation2();
        },
        methods:{
            changeA(e){
                if(this.invitationArr && this.invitationArr.length > 0){
                    this.bigNumber = e;
                    this.invitationArr.sort(this.compare);
                    if(e === 0){//放款时间
                        this.lenderZheng = !this.lenderZheng;
                    }else if(e === 1){//佣金
                        this.mondyZheng = !this.mondyZheng;
                    }
                }
			
            },
            
            compare(val1,val2){//倒叙
                if(this.bigNumber === 0){
                    if(this.lenderZheng === true){//进件事件排序
                        if(val1.createTime){
                            val1 = val1.createTime;
                        }else{
                            val1 = val1.lenderTime;
                        }
                        if(val2.createTime){
                            val2 = val2.createTime;
                        }else{
                            val2 = val2.lenderTime;
                        }
                        val1 = val1.replace(/[-,:]/g,"").trim().replace(/\s/g,"");
                        val2 = val2.replace(/[-,:]/g,"").trim().replace(/\s/g,"");
                        return val1-val2;
                    }else{
                        if(val1.createTime){
                            val1 = val1.createTime;
                        }else{
                            val1 = val1.lenderTime;
                        }
                        if(val2.createTime){
                            val2 = val2.createTime;
                        }else{
                            val2 = val2.lenderTime;
                        }
                        val1 = val1.replace(/[-,:]/g,"").trim().replace(/\s/g,"");
                        val2 = val2.replace(/[-,:]/g,"").trim().replace(/\s/g,"");
                        return val2-val1;
                    }
                }else if(this.bigNumber === 1){
                    if(this.mondyZheng === true){//进件事件排序
                        console.log(this.mondyZheng)
                        if(val1.monthRate && val1.lenderMoney){
                            val1 = val1.monthRate*val1.lenderMoney;
                        }else{
                            val1 = 0;
                        }
                        if(val2.monthRate && val2.lenderMoney){
                            val2 = val2.monthRate*val2.lenderMoney;
                        }else{
                            val2 = 0;
                        }
                        return val1-val2;
                    }else{
                        console.log(this.mondyZheng)
                        if(val1.monthRate && val1.lenderMoney){
                            val1 = val1.monthRate*val1.lenderMoney;
                        }else{
                            val1 = 0;
                        }
                        if(val2.monthRate && val2.lenderMoney){
                            val2 = val2.monthRate*val2.lenderMoney;
                        }else{
                            val2 = 0;
                        }
                        return val2-val1;
                    }
                }


            },
            //获取邀请记录
            getInvitation(){
                var self = this;
                var userId = localStorage.getItem("userId") || "";
                var urlStr = Util.baseUrl + '/DuG/api/basics/loan/findInviteList.do';
                var md5Str = Util.basekey;
                $.ajax({
                    type:"get",
                    url:urlStr,
                    async:true,
                    timeout: 1000,
                    //dataType:'json',
                    data:{
                        key:md5Str,
                        auth: Util.base32Encode('key'),
                        token: md5(md5Str),
                        userID:userId,
                        page:0,
                        rows:10,
                    },
                    success:function (res) {
                    	 console.log("这是一级↓");
                    	//console.log(res);
                        //获取成功
                        if(res.ret_code == '0'){
                            if(res.ret_data && res.ret_data.length > 0){
                                self.invitationArr = res.ret_data;
                                var ret_data = res.ret_data; 
                                console.log(res);
                                self.showRecord = true;
                                console.log(res.ret_data);
                                
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
                            $.toast(res.ret_msg);
                        }
                    },
                    error: function(){
                        $.toast('网路请求失败，请稍后重试');
                    }
                })
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
                    timeout : 5000,
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
                            $.toast(res.ret_msg);
                        }
                    },
                    error: function(res){
                        $.toast('网路请求失败，请稍后重试');
                    }
                })
            }

        },
})