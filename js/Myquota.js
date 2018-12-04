
    var app = new Vue({
        el: '#app',
        data: {
           edNb:"",
           edList:[],
           
        },
        mounted: function() {
           var self = this;
           self.data();
        },
        methods: {
        	//可能贷到的额度产品点击
        	kenengClick:function(id,n,name){
        		 var urlStr = Util.baseUrl + '/DuG/api/user/user/saveFunctionClick.do';
					var userID = localStorage.getItem('userId') || '';
					console.log(userID);
					var functionNum="我的额度_"+name;
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
                        	console.log(functionNum);
                        	window.location.href = 'detailsPage.html?id='+ id; 
                        },
                        error: function(res){
                            $.toast('网路请求失败，请稍后重试');
                        }
					 
					});
        		
        	},
        	data(){
        		var self = this;
        		var userType = localStorage.getItem("userType");
        				console.log(userType);
        				var showType = "";
        				if(userType == 3){
        					showType = 0;
        				}else{
        					showType = 1;
        				}
        				console.log(showType);
                var urlStr = Util.baseUrl + '/DuG/api/basics/loan/findScreenLoanList.do';
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
                        showType: showType,
                        page: 0,
                        rows: 10,
                        exclusiveLoan:0
                    },
                    success: function(res){
                        // 请求成功
                      
                        if (res.code == '0') {
                             console.log(res);
                             self.edList = res.data;
                             var datas = res.data;
                             console.log(self.edList);
                             //平均额度
                             var sum=0;
                             for(var i=0;i<datas.length;i++){
                             	sum += parseInt(datas[i].avgQuota);  	
                             };
                             self.edNb = sum;
                             console.log(self.edNb);
                             
                        } else{
                            $.toast(res.ret_msg);
                        }
                    },
                    error: function(res){
                        $.toast('网路请求失败，请稍后重试');
                    }
                })
        	}
        }
    });