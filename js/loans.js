
    var app = new Vue({
        el: '#mescroll',
        data: {
             daikuanList: [],
             tiptext:"",
             pageNumber:1,
             totalPages:"",
             ToEnd:false,
             Labelstip:true,
        },
        mounted: function() {
        	
        	var self = this;
			if(this.getQueryString('newLoan')!=null && this.getQueryString('newLoan') != ""){
            	localStorage.setItem('newLoan',this.getQueryString('newLoan') || '');
            	localStorage.removeItem("confirmLoan");
            	localStorage.removeItem("shortTerm");
            	localStorage.removeItem("largeLoan");
          };
          if(this.getQueryString('confirmLoan')!=null && this.getQueryString('confirmLoan') != ""){
            	localStorage.setItem('confirmLoan',this.getQueryString('confirmLoan') || '');
            	localStorage.removeItem("newLoan");
            	localStorage.removeItem("shortTerm");
            	localStorage.removeItem("largeLoan");
          };
          if(this.getQueryString('shortTerm')!=null && this.getQueryString('shortTerm') != ""){
            	localStorage.setItem('shortTerm',this.getQueryString('shortTerm') || '');
            	localStorage.removeItem("newLoan");
            	localStorage.removeItem("confirmLoan");
            	localStorage.removeItem("largeLoan");
          };
          if(this.getQueryString('largeLoan')!=null && this.getQueryString('largeLoan') != ""){
            	localStorage.setItem('largeLoan',this.getQueryString('largeLoan') || '');
            	localStorage.removeItem("newLoan");
            	localStorage.removeItem("confirmLoan");
            	localStorage.removeItem("shortTerm");
          };
			self.lan();
			self.fen();
        },
        methods: {
        	getQueryString(name){
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return decodeURI(r[2]); return null;
            },
           // 列表点击事件
            detailsClick(id,n){
                var userId = localStorage.getItem('userId');
                if(userId == "" || userId == null || userId == undefined) {
                	localStorage.setItem("pageID",id)
                    //window.location = "login.html?refereeCode="+this.getQueryString('refereeCode')+'&referee='+this.getQueryString('referee');
                    window.location.href= "login.html";
                }else{     
                   window.location.href = 'detailsPage.html?id='+ id+'&number='+n;                    
				}

			},
			//分页
			fen(){
				var self = this;
					var mescroll = document.getElementById("mescroll");
		 			var mescrollss = mescroll.addEventListener('scroll', function () {
		 		  		var scrollHeight = document.getElementById("mescroll").scrollHeight;
		 		  		var scrollTop = document.getElementById("mescroll").scrollTop;//0-18;
		 		  		var clientHeight = document.getElementById("mescroll").clientHeight; 
		 		   		if (scrollHeight - clientHeight == scrollTop) {
        				//滚动条滚到最底部
       					 //console.log("滚到了最底部");          					 
       					 self.pageNumber++; 
       					 var pageNumber = self.pageNumber;
       					 self.pageNumber = pageNumber;
       					 var totalPages = self.totalPages;
       					 console.log(self.pageNumber);
       					 console.log(totalPages); 
       					 self.lan();
       					  if(self.pageNumber >= totalPages+1){
       					  	self.pageNumber = totalPages;      					  	
       					  	self.ToEnd = true;
       					  };
       					  console.log(self.pageNumber)
       					  //console.log(self.totalPages);
       					  
    					}
				})
         //console.log("123456")
		},
			detailsClicks(id,n){
                event.stopPropagation();
                var userId = localStorage.getItem('userPhone');
                console.log(userId);
                console.log(n);
                if(userId==null){
                	window,location.href='login.html';
                };
                var self = this;
                var urlStr = Util.baseUrl + '/DuG/api/basics/loan/findLoanModel.do';
                var id = id;
                var userId = localStorage.getItem('userId') || '';
                var md5Str = Util.basekey + userId + id;
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
                        var loanUrl=	res.ret_data.loanUrl 
                        console.log(loanUrl);
                       	window.location.href=loanUrl; 
                		var urlStr1 = Util.baseUrl + '/DuG/api/basics/loan/createLoanApply.do';			
                    $.ajax({
                        type:"post",
                        url: urlStr1,
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
                          
//                              if(self.dataObj.loanUrl){
//                              	console.log(self.dataObj.loanUrl);
//                                  //window.location.href = self.dataObj.loanUrl;
//                              }

                            } else{
                                $.toast(res.ret_msg);
                            }
                        },
                        error: function(res){
                            $.toast('网路请求失败，请稍后重试');
                        }
                    })               
                        },
                        error: function(res){
                            $.toast('网路请求失败，请稍后重试');
                        }
                    })
                
						return false;},
            lan(){
                var self = this;
                var newLoan1 = window.localStorage.getItem("newLoan");
                var confirmLoan1 = window.localStorage.getItem("confirmLoan");
                var shortTerm1 = window.localStorage.getItem("shortTerm"); 
                var largeLoan1 = window.localStorage.getItem("largeLoan"); 
                if(newLoan1){
                	self.tiptext = '新口子';               	
                }else if(confirmLoan1){
                	self.tiptext = '一定借到钱';               	
                }else if(shortTerm1){               	
                	self.tiptext = '小额极速贷';
                }else if(largeLoan1){
                	self.tiptext = '大额低息贷';
                };
                var newLoan= "";
                var confirmLoan= "";
                var shortTerm = "";
                var largeLoan = "";
                if(newLoan1==0){
                	newLoan= newLoan1; 
                	confirmLoan= null;	
                }else if(confirmLoan1==0){
                	confirmLoan= confirmLoan1;
                	newLoan= null;
                }else if(shortTerm1==0){
                	shortTerm= shortTerm1;
                	newLoan= null;
                	confirmLoan=null;
                }else if(largeLoan1==0){
                	largeLoan=largeLoan1;
                	shortTerm= null;
                	newLoan= null;
                	confirmLoan=null;
                }
                console.log(newLoan);
                var urlStr = Util.baseUrl + '/DuG/api/basics/loan/findScreenLoanList.do';
                var md5Str = Util.basekey;
                var userType = localStorage.getItem("userType");
        				var showType = "";
        				if(userType == 3){
        					showType = 0;
        				}else{
        					showType = 1;
        				}
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
                        newLoan: newLoan,
                        confirmLoan:confirmLoan,
                        shortTerm:shortTerm,
                        largeLoan:largeLoan,
                        showType:showType,
                        page:this.pageNumber,
                        rows:10,
                    },
                    success: function(res){  
                        // 获取成功
                        console.log(res);
                        if (res.code == '0' && res.data) {
                        	 var data = res.data;
                            for(var i = 0;i<data.length;i++){
                         	var keywords = data[i].keyword;
                         	keywords = keywords.slice('',keywords.length-1); 	
                         	data[i].keyword = keywords.split("|");
                         	console.log(data[i].keyword);
                         }
                        	if(res.data == ""){
                        		
                        		self.ToEnd = true;
                        	}
                          //self.daikuanList = res.data;
                          self.totalPages = Math.ceil(res.count / 10);
                          console.log(self.totalPages);
                          if(self.totalPages == 1 ){
                          	self.ToEnd = true;
                          }
                          self.daikuanList = self.daikuanList.concat(res.data);
                          
                        } else{
                        	
                            $.toast(res.ret_msg);
                        }
                    },
                    error: function(res){
                        $.toast('网路请求失败，请稍后重试');
                    }
                });
                

            },
   
        }
    });
    