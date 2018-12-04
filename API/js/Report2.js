var app = new Vue({
			el: '#Report2',
			data: {
				NOming: false,//未命中
				kenengming:false,//可能命中
				ming:false,//命中
				anq:false,//安全
				jingt:false,//警惕
				weix:false,//危险
				anq2:false,//安全
				jingt2:false,//警惕
				weix2:false,//危险
				anq3:false,//安全
				jingt3:false,//警惕
				weix3:false,//危险
				anq4:false,//安全
				jingt4:false,//警惕
				weix4:false,//危险
				anq5:false,//安全
				jingt5:false,//警惕
				weix5:false,//危险
				anq6:true,//安全
				jingt6:false,//警惕
				weix6:false,//危险
				ricCon:true,//日常显示
				chengCon:true,//成功显示
				duotouCon:true,//多头显示
				huanqianCon:true,//还款显示
				tuijianCon:true,//推荐产品显示
				shengqingCon:true,//申请显示
				transform2P:false,//图标旋转
				transform1P:false,//图标旋转
				transform3P:false,//图标旋转
				transform4P:false,//图标旋转
				transform5P:false,//图标旋转
				transform6P:false,//图标旋转
				idNname:"",
				successRate:"",
				v1:0,
				v2:0,
				v4:0,
				v5:0,
				conList:{},//总数据
				daikuanList:[],
				dataList:[],				
				requestData: {
                minQuota: '0',  // 最小贷款金额
                maxQuota: '50000',  // 最大贷款金额
                minTerm:  '0',  // 最小贷款期限
                maxTerm:  '36',  // 最大贷款期限
                label:    '-1',  // 贷款分类 热门
                page:     '0',  // 请求页数
            	},
            	riskInfoApplyID:"",
				ricNO:false,
				duotNO:false,
				huanqNO:false,
				shenqingNO:false
				
			},
			mounted: function() {
				var self = this;				
				self.getData3();				
				//测试
				if(this.getQueryString('riskInfoApplyID')!=null && this.getQueryString('riskInfoApplyID') != ""){
            	   //localStorage.setItem('refereeCode',this.getQueryString('refereeCode') || '');
            	   self.riskInfoApplyID = this.getQueryString('riskInfoApplyID');
            	   
            	  
            	};
				self.ReportCon();
				//alert(self.riskInfoApplyID);
				
			},
			methods: {
				
				//从连接取riskInfoApplyID
				getQueryString(name){
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return decodeURI(r[2]); return null;
            	},
				//点击日常
				ric:function(){
					var self = this;
					self.ricCon = !self.ricCon;
					self.transform2P = !self.transform2P;
					
				},
				
				//点击成功率
				cheng:function(){
					var self = this;
					self.chengCon = !self.chengCon;
					self.transform1P = !self.transform1P;
					
				},
				//点击多头
				duotou:function(){
					var self = this;
					self.duotouCon = !self.duotouCon;
					self.transform3P = !self.transform3P;
				},
				//还款
				huanqian:function(){
					var self = this;
					self.huanqianCon = !self.huanqianCon;
					self.transform4P = !self.transform4P;
				},
				//申请
				shengqing:function(){
					var self = this;					
					self.shengqingCon = !self.shengqingCon;
					self.transform5P = !self.transform5P;
				},
//				//点击样本
//				yangbens:function(){
//					window.location.href="Report3.html";
//				},
				//点击推荐产品
				tuijie:function(){
				var self = this;	
				self.tuijianCon = !self.tuijianCon;
				self.transform6P = !self.transform6P;
			
				},
				//成功率帮助
				bangzhu1:function(event){
					event.stopPropagation();
					$.alert("本项检测用户在信贷机构的贷款申请成功率");
					
				},
				//日常检测
				bangzhu2:function(event){
					event.stopPropagation();
					$.alert("本项检测用户身份证和手机号是否命中法院失信名单，执行名单，以及用户是否有违章、欠款、信贷逾期等行为。");
				},
				//多头
				bangzhu3:function(event){
					event.stopPropagation();
					$.alert("注意：6个月内建议不超过35个，超过后谨慎申请！本项检测用户6个月内申请平台数次数，既包括成功的也包含了申请不成功的贷款。");
				},
				//还款
				bangzhu4:function(event){
					event.stopPropagation();
					$.alert("该项决定信贷机构会直接认为用户是否在信用不良黑名单内？贷款有过逾期或者被贷款驳回次数过多等都会被列入行业风险名单。");
				},
				//申请材料
				bangzhu5:function(event){
					event.stopPropagation();
					$.alert("该项决定信贷机构会从侧面认为用户资料滥用与否。本项检测用户申请贷款时是否使用专一的材料，是否存在1个贷款人使用多个手机号申请，或多个贷款人使用同一个手机号申请。");
				},
				//推荐
				bangzhu6:function(event){
					event.stopPropagation();
					$.alert("这是为您推荐的火热产品");
				},
				//返回支付首页
				fanhui:function(){
					window.location.href= "NetBlackziliao.html";
				},
				//推荐产品点击
				detailsClick(id,n){
                var userId = localStorage.getItem('userId');
                if(userId == "" || userId == null || userId == undefined) {
                	localStorage.setItem("pageID",id)
                    //window.location = "login.html?refereeCode="+this.getQueryString('refereeCode')+'&referee='+this.getQueryString('referee');
                    window.location.href= "login.html";
                }else{     
                   //window.location.href = 'detailsPage.html?id='+ id+'&number='+n; 
                   window.location.href = 'detailsPage.html?id='+ id;   
								}

						},
				//echarts图
				echas(){
					var myChart = echarts.init(document.getElementById('EChart'));
					option = {
          				title: {
            			text: this.successRate+'%',
            			x: 'center',
            			y: 'center',
            				textStyle: {
              					fontWeight: 'normal',
              					color: '#d5a17d',
              					fontSize: '20'
            				}
          				},
          				color: ['#f6bf96'],

          				legend: {
            				show: false,
           			 		itemGap: 12,
            				data: ['01', '02']
          				},
          				toolbox: {
            				show: false,
            				feature: {
              					mark: {
                					show: true
              					},
              					dataView: {
                					show: true,
                					readOnly: false
              					},
              					restore: {
                					show: true
              					}
            				}
          				},
          				series: [{
            				name: 'Line 1',
            				type: 'pie',
            				clockWise: true,
            				radius: ['50%', '56%'],
            				itemStyle: {
              					normal: {
                					label: {
                  						show: false
                					},
                					labelLine: {
                  						show: false
                					}
              					}
            				},
            			hoverAnimation: false,
            			data: [{
              				value: this.successRate,
              				name: '01',
              				itemStyle: {
                				normal: {
                  					color: {  // 完成的圆环的颜色
                    					colorStops: [{
                      						offset: 0, color: '#f66c05' // 0% 处的颜色
                    					},
                    					{
                      						offset: 1, color: '#f66c05' // 100% 处的颜色
                    					}]
                  					},
                  					label: {
                    					show: false
                  					},
                  					labelLine: {
                    					show: false
                  					}
                				},
              				}
           				},
           				{
              				value: 100-this.successRate,
              				name: 'invisible'
            			}]
          				}
          				]
        			};
         			myChart.setOption(option);
				},
				//获取数据
				ReportCon(){
					var self = this;
//					var str='{"final_score":204,"risk_items":[{"rule_id":31131304,"policy_score":204,"score":88,"policy_mode":"Weighted","decision":"Accept","policy_decision":"Reject","policy_name":"STARK\u501f\u6b3e_\u7f51\u9875","risk_name":"\u8eab\u4efd\u8bc1\u683c\u5f0f\u6821\u9a8c\u9519\u8bef"},{"rule_id":31132364,"policy_score":204,"score":30,"policy_mode":"Weighted","decision":"Accept","policy_decision":"Reject","policy_name":"STARK\u501f\u6b3e_\u7f51\u9875","risk_name":"3\u4e2a\u6708\u5185\u8eab\u4efd\u8bc1\u5173\u8054\u591a\u4e2a\u7533\u8bf7\u4fe1\u606f","risk_detail":[{"frequency_detail_list":[{"data":["15717564202","130\u203b\u203b\u203b\u203b0001","135\u203b\u203b\u203b\u203b9219","170\u203b\u203b\u203b\u203b5122","135\u203b\u203b\u203b\u203b8733","139\u203b\u203b\u203b\u203b6833","153\u203b\u203b\u203b\u203b1066","150\u203b\u203b\u203b\u203b6715","150\u203b\u203b\u203b\u203b6712","111\u203b\u203b\u203b\u203b1111","150\u203b\u203b\u203b\u203b0015","188\u203b\u203b\u203b\u203b0001","188\u203b\u203b\u203b\u203b0000","159\u203b\u203b\u203b\u203b8829","170\u203b\u203b\u203b\u203b0000","138\u203b\u203b\u203b\u203b5678","180\u203b\u203b\u203b\u203b7639","157\u203b\u203b\u203b\u203b2082","130\u203b\u203b\u203b\u203b0000","138\u203b\u203b\u203b\u203b8888"],"detail":"3\u4e2a\u6708\u8eab\u4efd\u8bc1\u5173\u8054\u624b\u673a\u53f7\u6570\uff1a20"}],"type":"frequency_detail"}]},{"rule_id":31132384,"policy_score":204,"score":9,"policy_mode":"Weighted","decision":"Accept","policy_decision":"Reject","policy_name":"STARK\u501f\u6b3e_\u7f51\u9875","risk_name":"3\u4e2a\u6708\u5185\u7533\u8bf7\u4fe1\u606f\u5173\u8054\u591a\u4e2a\u8eab\u4efd\u8bc1","risk_detail":[{"frequency_detail_list":[{"data":["111111111111111111","4503\u203b\u203b\u203b\u203b\u203b\u203b\u203b\u203b\u203b\u203b1936","4503\u203b\u203b\u203b\u203b\u203b\u203b\u203b\u203b\u203b\u203b1939"],"detail":"3\u4e2a\u6708\u624b\u673a\u53f7\u5173\u8054\u8eab\u4efd\u8bc1\u6570\uff1a3"}],"type":"frequency_detail"}]},{"rule_id":31132414,"policy_score":204,"score":10,"policy_mode":"Weighted","decision":"Accept","policy_decision":"Reject","policy_name":"STARK\u501f\u6b3e_\u7f51\u9875","risk_name":"3\u4e2a\u6708\u5185\u7533\u8bf7\u4eba\u8eab\u4efd\u8bc1\u4f5c\u4e3a\u8054\u7cfb\u4eba\u8eab\u4efd\u8bc1\u51fa\u73b0\u7684\u6b21\u6570\u8fc7\u591a","risk_detail":[{"cross_frequency_detail_list":[{"detail":"3\u4e2a\u6708\u5185\u7533\u8bf7\u4eba\u8eab\u4efd\u8bc1\u4f5c\u4e3a\u7b2c\u4e00\u8054\u7cfb\u4eba\u8eab\u4efd\u8bc1\u51fa\u73b0\u7684\u6b21\u6570\uff1a704"}],"type":"cross_frequency_detail"}]},{"rule_id":31132484,"policy_score":204,"score":5,"policy_mode":"Weighted","decision":"Accept","policy_decision":"Reject","policy_name":"STARK\u501f\u6b3e_\u7f51\u9875","risk_name":"7\u5929\u5185\u8bbe\u5907\u6216\u8eab\u4efd\u8bc1\u6216\u624b\u673a\u53f7\u7533\u8bf7\u6b21\u6570\u8fc7\u591a","risk_detail":[{"frequency_detail_list":[{"detail":"7\u5929\u5185\u8eab\u4efd\u8bc1\u7533\u8bf7\u6b21\u6570\uff1a4"}],"type":"frequency_detail"}]},{"rule_id":31132654,"policy_score":204,"score":25,"policy_mode":"Weighted","decision":"Accept","policy_decision":"Reject","policy_name":"STARK\u501f\u6b3e_\u7f51\u9875","risk_name":"7\u5929\u5185\u7533\u8bf7\u4eba\u5728\u591a\u4e2a\u5e73\u53f0\u7533\u8bf7\u501f\u6b3e","risk_detail":[{"platform_detail_dimension":[{"count":5,"detail":[{"count":1,"industry_display_name":"\u4e00\u822c\u6d88\u8d39\u5206\u671f\u5e73\u53f0"},{"count":1,"industry_display_name":"\u5c0f\u989d\u8d37\u6b3e\u516c\u53f8"},{"count":3,"industry_display_name":"P2P\u7f51\u8d37"}],"dimension":"\u501f\u6b3e\u4eba\u8eab\u4efd\u8bc1"},{"count":1,"detail":[{"count":1,"industry_display_name":"\u4e00\u822c\u6d88\u8d39\u5206\u671f\u5e73\u53f0"}],"dimension":"\u501f\u6b3e\u4eba\u624b\u673a"}],"platform_detail":[{"count":1,"industry_display_name":"\u4e00\u822c\u6d88\u8d39\u5206\u671f\u5e73\u53f0"},{"count":1,"industry_display_name":"\u5c0f\u989d\u8d37\u6b3e\u516c\u53f8"},{"count":3,"industry_display_name":"P2P\u7f51\u8d37"}],"description":"7\u5929\u5185\u7533\u8bf7\u4eba\u5728\u591a\u4e2a\u5e73\u53f0\u7533\u8bf7\u501f\u6b3e","type":"platform_detail","platform_count":5}]},{"rule_id":31132664,"policy_score":204,"score":12,"policy_mode":"Weighted","decision":"Accept","policy_decision":"Reject","policy_name":"STARK\u501f\u6b3e_\u7f51\u9875","risk_name":"1\u4e2a\u6708\u5185\u7533\u8bf7\u4eba\u5728\u591a\u4e2a\u5e73\u53f0\u7533\u8bf7\u501f\u6b3e","risk_detail":[{"platform_detail_dimension":[{"count":2,"detail":[{"count":1,"industry_display_name":"\u4e00\u822c\u6d88\u8d39\u5206\u671f\u5e73\u53f0"},{"count":1,"industry_display_name":"\u5c0f\u989d\u8d37\u6b3e\u516c\u53f8"}],"dimension":"\u501f\u6b3e\u4eba\u624b\u673a"},{"count":8,"detail":[{"count":2,"industry_display_name":"\u4e00\u822c\u6d88\u8d39\u5206\u671f\u5e73\u53f0"},{"count":1,"industry_display_name":"\u5c0f\u989d\u8d37\u6b3e\u516c\u53f8"},{"count":5,"industry_display_name":"P2P\u7f51\u8d37"}],"dimension":"\u501f\u6b3e\u4eba\u8eab\u4efd\u8bc1"}],"platform_detail":[{"count":2,"industry_display_name":"\u4e00\u822c\u6d88\u8d39\u5206\u671f\u5e73\u53f0"},{"count":2,"industry_display_name":"\u5c0f\u989d\u8d37\u6b3e\u516c\u53f8"},{"count":5,"industry_display_name":"P2P\u7f51\u8d37"}],"description":"1\u4e2a\u6708\u5185\u7533\u8bf7\u4eba\u5728\u591a\u4e2a\u5e73\u53f0\u7533\u8bf7\u501f\u6b3e","type":"platform_detail","platform_count":9}]},{"rule_id":31132674,"policy_score":204,"score":18,"policy_mode":"Weighted","decision":"Accept","policy_decision":"Reject","policy_name":"STARK\u501f\u6b3e_\u7f51\u9875","risk_name":"3\u4e2a\u6708\u5185\u7533\u8bf7\u4eba\u5728\u591a\u4e2a\u5e73\u53f0\u7533\u8bf7\u501f\u6b3e","risk_detail":[{"platform_detail_dimension":[{"count":15,"detail":[{"count":3,"industry_display_name":"\u4e00\u822c\u6d88\u8d39\u5206\u671f\u5e73\u53f0"},{"count":1,"industry_display_name":"\u94f6\u884c\u6d88\u8d39\u91d1\u878d\u516c\u53f8"},{"count":2,"industry_display_name":"\u5c0f\u989d\u8d37\u6b3e\u516c\u53f8"},{"count":9,"industry_display_name":"P2P\u7f51\u8d37"}],"dimension":"\u501f\u6b3e\u4eba\u8eab\u4efd\u8bc1"},{"count":4,"detail":[{"count":2,"industry_display_name":"\u4e00\u822c\u6d88\u8d39\u5206\u671f\u5e73\u53f0"},{"count":1,"industry_display_name":"\u5c0f\u989d\u8d37\u6b3e\u516c\u53f8"},{"count":1,"industry_display_name":"P2P\u7f51\u8d37"}],"dimension":"\u501f\u6b3e\u4eba\u624b\u673a"}],"platform_detail":[{"count":4,"industry_display_name":"\u4e00\u822c\u6d88\u8d39\u5206\u671f\u5e73\u53f0"},{"count":1,"industry_display_name":"\u94f6\u884c\u6d88\u8d39\u91d1\u878d\u516c\u53f8"},{"count":3,"industry_display_name":"\u5c0f\u989d\u8d37\u6b3e\u516c\u53f8"},{"count":10,"industry_display_name":"P2P\u7f51\u8d37"}],"description":"3\u4e2a\u6708\u5185\u7533\u8bf7\u4eba\u5728\u591a\u4e2a\u5e73\u53f0\u7533\u8bf7\u501f\u6b3e","type":"platform_detail","platform_count":18}]},{"rule_id":31132684,"policy_score":204,"score":2,"policy_mode":"Weighted","decision":"Accept","policy_decision":"Reject","policy_name":"STARK\u501f\u6b3e_\u7f51\u9875","risk_name":"3\u4e2a\u6708\u5185\u7533\u8bf7\u4eba\u5728\u591a\u4e2a\u5e73\u53f0\u88ab\u653e\u6b3e_\u4e0d\u5305\u542b\u672c\u5408\u4f5c\u65b9","risk_detail":[{"platform_detail_dimension":[{"count":1,"detail":[{"count":1,"industry_display_name":"\u4e00\u822c\u6d88\u8d39\u5206\u671f\u5e73\u53f0"}],"dimension":"\u501f\u6b3e\u4eba\u624b\u673a"}],"platform_detail":[{"count":1,"industry_display_name":"\u4e00\u822c\u6d88\u8d39\u5206\u671f\u5e73\u53f0"}],"description":"3\u4e2a\u6708\u5185\u7533\u8bf7\u4eba\u88ab\u653e\u6b3e\u5e73\u53f0\u4e2a\u6570_\u4e0d\u5305\u542b\u672c\u5408\u4f5c\u65b9","type":"platform_detail","platform_count":1}]},{"rule_id":31132804,"policy_score":204,"score":5,"policy_mode":"Weighted","decision":"Accept","policy_decision":"Reject","policy_name":"STARK\u501f\u6b3e_\u7f51\u9875","risk_name":"\u7533\u8bf7\u4eba\u4fe1\u606f\u547d\u4e2d\u4e2d\u98ce\u9669\u5173\u6ce8\u540d\u5355","risk_detail":[{"hit_type_display_name":"\u501f\u6b3e\u4eba\u624b\u673a","fraud_type_display_name":"\u5f02\u5e38\u501f\u6b3e","grey_list_details":[{"evidence_time":1539674360000,"risk_level":"\u4e2d","fraud_type":"suspiciousLoan","fraud_type_display_name":"\u5f02\u5e38\u501f\u6b3e","value":"15717564202"}],"description":"\u624b\u673a\u547d\u4e2d\u4e2d\u98ce\u9669\u5173\u6ce8\u540d\u5355","type":"grey_list"}]},{"rule_id":31236764,"policy_score":204,"score":0,"policy_mode":"Weighted","decision":"Accept","policy_decision":"Reject","policy_name":"STARK\u501f\u6b3e_\u7f51\u9875","risk_name":"3\u4e2a\u6708\u5185\u8eab\u4efd\u8bc1\u5173\u8054\u591a\u4e2a\u624b\u673a\u53f7\u7801","risk_detail":[{"frequency_detail_list":[{"data":["15717564202","130\u203b\u203b\u203b\u203b0001","135\u203b\u203b\u203b\u203b9219","170\u203b\u203b\u203b\u203b5122","135\u203b\u203b\u203b\u203b8733","139\u203b\u203b\u203b\u203b6833","153\u203b\u203b\u203b\u203b1066","150\u203b\u203b\u203b\u203b6715","150\u203b\u203b\u203b\u203b6712","111\u203b\u203b\u203b\u203b1111","150\u203b\u203b\u203b\u203b0015","188\u203b\u203b\u203b\u203b0001","188\u203b\u203b\u203b\u203b0000","159\u203b\u203b\u203b\u203b8829","170\u203b\u203b\u203b\u203b0000","138\u203b\u203b\u203b\u203b5678","180\u203b\u203b\u203b\u203b7639","157\u203b\u203b\u203b\u203b2082","130\u203b\u203b\u203b\u203b0000","138\u203b\u203b\u203b\u203b8888"],"detail":"3\u4e2a\u6708\u8eab\u4efd\u8bc1\u5173\u8054\u624b\u673a\u53f7\u6570\uff1a20"}],"type":"frequency_detail"}]},{"rule_id":31236774,"policy_score":204,"score":0,"policy_mode":"Weighted","decision":"Accept","policy_decision":"Reject","policy_name":"STARK\u501f\u6b3e_\u7f51\u9875","risk_name":"3\u4e2a\u6708\u5185\u624b\u673a\u53f7\u5173\u8054\u591a\u4e2a\u8eab\u4efd\u8bc1","risk_detail":[{"frequency_detail_list":[{"data":["111111111111111111","4503\u203b\u203b\u203b\u203b\u203b\u203b\u203b\u203b\u203b\u203b1936","4503\u203b\u203b\u203b\u203b\u203b\u203b\u203b\u203b\u203b\u203b1939"],"detail":"3\u4e2a\u6708\u5185\u624b\u673a\u53f7\u7801\u5173\u8054\u8eab\u4efd\u8bc1\u6570\uff1a3"}],"type":"frequency_detail"}]},{"rule_id":31238644,"policy_score":204,"score":0,"policy_mode":"Weighted","decision":"Accept","policy_decision":"Reject","policy_name":"STARK\u501f\u6b3e_\u7f51\u9875","risk_name":"1\u4e2a\u6708\u5185\u8eab\u4efd\u8bc1\u5173\u8054\u591a\u4e2a\u5e73\u53f0\u7533\u8bf7\u501f\u6b3e","risk_detail":[{"platform_detail_dimension":[{"count":8,"detail":[{"count":2,"industry_display_name":"\u4e00\u822c\u6d88\u8d39\u5206\u671f\u5e73\u53f0"},{"count":1,"industry_display_name":"\u5c0f\u989d\u8d37\u6b3e\u516c\u53f8"},{"count":5,"industry_display_name":"P2P\u7f51\u8d37"}],"dimension":"\u501f\u6b3e\u4eba\u8eab\u4efd\u8bc1"}],"platform_detail":[{"count":2,"industry_display_name":"\u4e00\u822c\u6d88\u8d39\u5206\u671f\u5e73\u53f0"},{"count":1,"industry_display_name":"\u5c0f\u989d\u8d37\u6b3e\u516c\u53f8"},{"count":5,"industry_display_name":"P2P\u7f51\u8d37"}],"description":"1\u4e2a\u6708\u5185\u8eab\u4efd\u8bc1\u5173\u8054\u591a\u4e2a\u5e73\u53f0\u7533\u8bf7\u501f\u6b3e","type":"platform_detail","platform_count":8}]},{"rule_id":31242244,"policy_score":204,"score":0,"policy_mode":"Weighted","decision":"Accept","policy_decision":"Reject","policy_name":"STARK\u501f\u6b3e_\u7f51\u9875","risk_name":"3\u4e2a\u6708\u5185\u8eab\u4efd\u8bc1\u5173\u8054\u591a\u4e2aP2P\u7f51\u8d37\u7533\u8bf7\u6b21\u6570","risk_detail":[{"frequency_detail_list":[{"detail":"3\u4e2a\u6708\u5185\u8eab\u4efd\u8bc1\u5173\u8054\u591a\u4e2aP2P\u7f51\u8d37\u7533\u8bf7\u6b21\u6570\uff1a21"}],"type":"frequency_detail"}]},{"rule_id":31132104,"policy_score":20,"score":20,"policy_mode":"Weighted","decision":"Accept","policy_decision":"Review","policy_name":"\u7533\u8bf7\u884c\u4e3a\u5f02\u5e38_\u7f51\u9875","risk_name":"1\u5c0f\u65f6\u5185\u8eab\u4efd\u8bc1\u6216\u624b\u673a\u53f7\u7533\u8bf7\u6b21\u6570\u5927\u4e8e\u7b49\u4e8e3","risk_detail":[{"frequency_detail_list":[{"detail":"1\u5c0f\u65f6\u5185\u624b\u673a\u53f7\u7533\u8bf7\u6b21\u6570\uff1a4"}],"type":"frequency_detail"}]}],"final_decision":"REJECT"}';
//       					var temp3 = JSON.parse(str);
//        					console.log(temp3);
//							self.conList = temp3.risk_items; 
//							console.log(self.conList);
//							var bb = self.conList.slice(0,1);//第一个 拿来放一个数组中 
//							var dd = self.conList.slice(1,2);//第二个 拿来放一个数组中 
//							var cc = self.conList.slice(4);//减去四个  剩下放在一个数组中
//							console.log(bb);
//							console.log(bb);
//							console.log(dd);
//							console.log(cc);
//							
//        					//console.log(self.conList[0]); //第一个
//        					//console.log(self.conList[1]);//第二个
//        					//console.log(self.conList[2]); //第一个
//        					//console.log(self.conList[3]);//第二个
//        					//console.log(self.conList[4]); //第一个
//        					//console.log(self.conList[5]);//第二个
//        					console.log(self.conList.risk_detail); // 第三个的risk_detail
//        					var b = self.conList[2].risk_detail;
//        					for(var i=0;i<b.length;i++){
//        						console.log(b[i].type); //找到了各个type
//        						self.jia = b[i].type;
//        						console.log(self.jia);
//        					}
//        					
          					
					
					
					//var riskInfoApplyID =  window.localStorage.getItem("riskInfoApplyID");
					//console.log(this.riskInfoApplyID);
					
					
					var riskInfoApplyID = self.riskInfoApplyID;
					//var riskInfoApplyID = "4DFF11057E0647ED893C9C4ECD4121E1";
					
					var urlStr = Util.baseUrl + '/DuG/api/risk/riskManange/findRiskInfo.do';
        			var md5Str = Util.basekey
        								+ riskInfoApplyID;
//      								+userPhone;   	
										
        			$.ajax({
							type:"get",
            				url: urlStr,
            				async:true,
            				data: {
                				key: Util.basekey,
                				auth: Util.base32Encode('key,riskInfoApplyID'),
                				token: md5(md5Str),
                				riskInfoApplyID: riskInfoApplyID
//              				idName: idName,
                				
            				},
            				success: function(res){
            				var temp3 = JSON.parse(res);
          					console.log(temp3);          					
          					var msg = temp3.ret_msg;
          					if(temp3.ret_code == "0"){
          					var js = temp3.ret_data.riskItems
							self.conList = JSON.parse(js).risk_items;//数据
							console.log(self.conList);							
							//获取policy_score判断    安全  危险
							for(var i =0; i< self.conList.length;i++){
								console.log(self.conList[i]);
								var b = self.conList[i].risk_detail;
								if(b!="" && b!=null){
									for(var j=0;j< b.length;j++){
									//console.log(b[j].type);
									var type = b[j].type;
									//console.log(type);
									//日常
									if(type=="grey_list"){
										self.v1=self.v1+self.conList[i].policy_score;
										
										//console.log(self.v1);	
									}else if(type=="platform_detail"){
										//多头
										self.v2=self.v2+self.conList[i].policy_score;
										
									}else if(type=="discredit_count"){
										//机构
										self.v4=self.v4+self.conList[i].policy_score;
									}else if(type=="frequency_detail"){
										//申请
										self.v5=self.v5+self.conList[i].policy_score;
									}
									
								}
								}else{
									
								}
								
								
							};
//							var cc = self.conList.slice(1);//减去1个  剩下放在一个数组中
//							console.log(cc);
//							
//							for(var i = 0; i<cc.length;i++){
//								//console.log(self.conList[i].risk_detail);
//								//var b = self.conList[i].risk_detail;
//								var b = cc[i].risk_detail;
//								for(var j=0;j< b.length;j++){
//									var type = b[j].type;
//									if(type=="grey_list"){
//										self.v1=self.v1+self.conList[i].policy_score;
//										//console.log(self.v1);	
//									}else if(type=="platform_detail"){
//										//多头
//										self.v2=self.v2+self.conList[i].policy_score;
//										
//									}else if(type=="discredit_count"){
//										//机构
//										self.v4=self.v4+self.conList[i].policy_score;
//									}else if(type=="frequency_detail"){
//										//申请
//										self.v5=self.v5+self.conList[i].policy_score;
//									}
//								}
//								
//								
//							}
							//日常
							//console.log(self.v5);
							if(self.v1>=0&&self.v1<30){
									self.anq2 = true;
									self.ricNO = true;
									//alert(self.ricNO);
											
							}else if(self.v1>30&&self.v1<50){
									self.jingt2 = true;
							}else if(self.v1>50){
									self.weix2 = true;
							};
							//多头
							if(self.v2>=0&&self.v2<30){
									self.anq3 = true;
									self.duotNO = true;
											
							}else if(self.v2>30&&self.v2<50){
									self.jingt3 = true;
							}else if(self.v2>50){
									self.weix3 = true;
							};
							//机构
							if(self.v4>=0&&self.v4<30){
									self.anq4 = true;
									self.huanqNO = true;
											
							}else if(self.v4>30&&self.v4<50){
									self.jingt4 = true;
							}else if(self.v4>50){
									self.weix4 = true;
							};
							//申请
							if(self.v5>=0&&self.v5<30){
									self.anq5 = true;
									self.shenqingNO = true;
											
							}else if(self.v5>30&&self.v5<50){
									self.jingt5 = true;
							}else if(self.v5>50){
									self.weix5 = true;
							};
								
							self.idNname = temp3.ret_data.idName; //名字
							self.successRate = temp3.ret_data.successRate;//成功率
							var finalDecision = temp3.ret_data.finalDecision;//命中率
								if(finalDecision == "PASS"){
									self.NOming=true;
								}else if(finalDecision == "REJECT"){
									self.ming=true;
								}else{
									self.kenengming=true;
								}
							self.echas();
							//console.log(self);
							
          					 }else{
        					 	$.alert(msg, function() {
										 window.location.href= "NetBlackziliao.html";
								});
          					 }
          					
            					
            					//var temp3 = JSON.parse(str.ret_data);
            					//console.log(temp3);
								//self.conList = temp3.riskItems;         					
            					//console.log(self.conList);
            					//var temp = JSON.parse(res);
            					//console.log(temp);
            					//var temp2 = JSON.parse(temp.riskItems);
            					
            				
            					
            				},
            				error: function(res){
                				$.toast('网路请求失败，请稍后重试');
                				
            				},
					});
					
				},
				
				
				// 推荐
				      getData3: function(){           	
                var self = this;
                var urlStr = Util.baseUrl + '/DuG/api/basics/loan/findLoanList.do';
                var md5Str = Util.basekey
                    + self.requestData.minQuota
                    + self.requestData.maxQuota
                    + self.requestData.minTerm
                    + self.requestData.maxTerm
                    + self.requestData.page
                    + '10';
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
                        minQuota: self.requestData.minQuota,
                        maxQuota: self.requestData.maxQuota,
                        minTerm: self.requestData.minTerm,
                        maxTerm: self.requestData.maxTerm,
                        page: self.requestData.page,
                        rows: 10,
                        key: Util.basekey,
                        auth: Util.base32Encode('key,minQuota,maxQuota,minTerm,maxTerm,page,rows'),
                        token: md5(md5Str),
                        showType: showType
                    },
                    success: function(res){
                        // 请求成功
                        console.log(res);                    
                       
                        if (res.ret_code == '0') {   
                         var data = res.ret_data.slice(0,5); //前面5个拿来放一个数组中
                         //console.log(data);
//                       var bb = data.slice(0,5);//第一个 拿来放一个数组中 
//                       console.log(bb);
                         for(var i = 0;i<data.length;i++){
                         	var keywords = data[i].keyword;
                         	keywords = keywords.slice('',keywords.length-1); 	
                         	data[i].keyword = keywords.split("|");
                         	
                         }
                            self.daikuanList = res.ret_data.slice(0,5); 
                            //console.log(self.daikuanList);
                            //localStorage.setItem("indexListData",dataList);                            
                            var len = self.dataList.length;
                            
                        } else{
                            $.toast(res.ret_msg);
                        }
                    },
                    error: function(res){
                        $.toast('网路请求失败，请稍后重试');
                    }
                })
            },
		
			},
});
	