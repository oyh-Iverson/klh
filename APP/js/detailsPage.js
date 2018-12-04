var app = new Vue({
        el: '#detailsPage',
        data: {
            rating:4,
            loanUrl:"",
            isTrue: false,
            active: true,
            isActive:false,
            //showMsg: false,
            inviteAmount: 0,
            moneyAmount: 0,
//          linkArr: [
//              {text: "生成专属推荐二维码/链接"},
//              {text: "邀请好友使用贷款产品"},
//              {text: "好友成功获得首次放款"},
//              {text: "获得佣金，上不封顶"},
//          ],
            phoneArr: [
                {phone: '****', number: '0'}
            ],
            showArr: [
            	
            ],
            datas:[],
            requestData1: {
                minQuota: '0',  // 最小贷款金额
                maxQuota: '50000',  // 最大贷款金额
                minTerm:  '0',  // 最小贷款期限
                maxTerm:  '36',  // 最大贷款期限
                label:    '-1',  // 贷款分类 热门
                page:     '1',  // 请求页数
            },
            dataObj: 
               {
               	minQuota:"",
               	maxQuota:"",
               	avgQuota:"",
               	unitMonthRate:"",
               	monthRate:"",
               	successRate:"",
               	minTerm:"",
               	maxTerm:"",
               	unitTerm:"",
               	applyCount:""
               },
            
            //showMsg: false,
            numbers: 0,
            iconShow: false,
            requestData: {
                page:     '0',  // 请求页数
            },
            commentInfo:[] //用户评论
        },
        
        mounted(){
           this.queryDetails();
           this.getData3();
        },
        methods:{
            queryDetails(){
                var self = this;
                var urlStr = Util.baseUrl + '/DuG/api/basics/loan/findLoanModel.do';
                var id = Util.getQueryString("id");
                var userId = localStorage.getItem('userId') || '';
                var md5Str = Util.basekey + userId + id;
                if(userId && userId !=""){
                    $.ajax({
                        type:"post",
                        url: urlStr,
                        async:true,
                        //dataType:'json',
                        data: {
                            userId: userId,
                            id: id,
                            key: Util.basekey,
                            auth: Util.base32Encode('key,userId,id'),
                            token: md5(md5Str)
                        },
                        success: function(res){
                        	console.log(res);
                            // 请求成功
                            if (res.ret_code == '0') {                           	
                                self.dataObj = res.ret_data;
                              	self.dataObj.applyCondition = self.dataObj.applyCondition.split("|~|");
                                self.rating =  Number(self.dataObj.rating);
                                sessionStorage.setItem('loanName',res.ret_data.loanName);
                            } else{
                                $.toast(res.ret_msg);
                            }
                        },
                        error: function(res){
                            $.toast('网路请求失败，请稍后重试');
                        }
                    })
                }else{
                    window.location.href = "login.html";
                }
            },
            closeShare(){
                this.isTrue = false;
            },
            //跳转消息
            xiaoxis:function(){
            	window.location.href = "xiaoxi.html";
            },
            //收藏
            shoucang:function(id){
            	var self= this;
        		self.isActive = !self.isActive;
        		// 添加收藏
                var urlStr1 = Util.baseUrl + '/DuG/api/basics/loan/createLoanCollection.do';
                // 取消收藏
                var urlStr2 = Util.baseUrl + '/DuG/api/basics/loan/removeLoanCollection.do';
                var userId = localStorage.getItem('userId') || '';
                var md5Str = Util.basekey
                						+userId
                						+id;
                var urlStr = '';
                var msg = '';
                if(self.isActive == true){
                	urlStr = urlStr1;
                	msg = '收藏成功';
                	console.log('收藏成功');
                }else{
                	urlStr = urlStr2;
                	msg = '取消成功';
                	console.log('取消成功');
                }
                $.ajax({
                	type:"post",
                    url: urlStr,
                    async:true,
                    data:{
                    	userId: userId,
                        id: id,
                        key: Util.basekey,
                        auth: Util.base32Encode('key,userId,id'),
                        token: md5(md5Str)
                    },
                    success:function(res){
                    	console.log(res);
                    },
                    error: function(res){
                        $.toast('网路请求失败，请稍后重试');
                    }
                })
            	
            },
            slectBtn(e){
              if(e === 0){
                  this.iconShow = false;
              }else{
                  this.iconShow = true;
                  this.commentList();
              }

            },
            //推荐产品
               getData3: function(){           	
                var self = this;
                var urlStr = Util.baseUrl + '/DuG/api/basics/loan/findScreenLoanList.do';
                var md5Str = Util.basekey;
                var userType = localStorage.getItem("userType");
        				console.log(userType);
        				var showType = "";
        				if(userType == 3){
        					showType = 0;
        				}else{
        					showType = 1;
        				}
        				console.log(showType);
                $.ajax({
                    type:"get",
                    url: urlStr,
                    async:true,
                    //dataType:'json',
                    data: {                       	
							key: Util.basekey,
                        	auth: Util.base32Encode('key'),
                        	token: md5(md5Str),
                        	// userID:userId
                        	newLoan: null,
                        	confirmLoan:null,
                        	showType:showType,
                        	shortTerm:null,
                        	largeLoan:null,
                        	minQuota:null,
                        	maxQuota:null,
                        	minTerm:null,
                        	maxTerm:null,
                        	page:2,
                        	rows:10,
                    },
                    success: function(res){
                        // 请求成功  
                      // console.log(res);
                        if (res.code == '0') {                                                                       
                        var data = res.data; 
                        console.log(data); 
                        //console.log(data);
                        //随机四个谁
                        if(data!=""){
                        	function getRandomArrayElements(arr, count) {
    							var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
    							while (i-- > min) {
       								index = Math.floor((i + 1) * Math.random());
        							temp = shuffled[index];
        							shuffled[index] = shuffled[i];
        							shuffled[i] = temp;
    							}						
    							return shuffled.slice(min);
							}
                        	self.datas = getRandomArrayElements(data, 4);
                        	console.log( self.datas); 	
                        }
						
                          
                        } else{
                            $.toast(res.ret_msg);
                        }
                    },
                    error: function(res){
                        $.toast('网路请求失败，请稍后重试');
                    }
                })
            },
            //点击推荐
            detailsClick(id,n){
            	 var self = this;
					var urlStr = Util.baseUrl + '/DuG/api/user/user/saveFunctionClick.do';
					var userID = localStorage.getItem('userId') || '';
					console.log(userID);
					var functionNum="为您推荐_详情页_"+name;
					var sourceType= "1";
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
                        	window.location.href = 'detailsPage.html?id='+ id;  
                        },
                        error: function(res){
                            $.toast('网路请求失败，请稍后重试');
                        }
					 
					});
                    
                   //window.location.href = 'detailsPage.html?id='+ id+'&number='+n; 
                    
								
               

						},
            // 立即申请 点击事件
            moneyApply(){
                var self = this;
                var urlStr = Util.baseUrl + '/DuG/api/basics/loan/createLoanApply.do';
                var id = Util.getQueryString("id");
                var userId = localStorage.getItem('userId') || '';
                var md5Str = Util.basekey + userId + id;
                console.log(userId);
                if(userId && userId !=""){
                    $.ajax({
                        type:"post",
                        url: urlStr,
                        async:true,
                        //dataType:'json',
                        data: {
                            userId: userId,
                            id: id,
                            key: Util.basekey,
                            auth: Util.base32Encode('key,userId,id'),
                            token: md5(md5Str)
                        },
                        success: function(res){
                        	console.log(res);
                            // 请求成功
                            if (res.ret_code == '0') {
                                if(self.dataObj.loanUrl){
                                	//console.log(self.dataObj.loanUrl);
                                    window.location.href = self.dataObj.loanUrl;
                                }else{
                                    //window.location.href = "login.html";
                                }

                            } else{
                                $.toast(res.ret_msg);
                            }
                        },
                        error: function(res){
                            $.toast('网路请求失败，请稍后重试');
                        }
                    })
                }else{
                    window.location.href = "login.html";
                }

            },

        },

    });