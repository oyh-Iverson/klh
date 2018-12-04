var app = new Vue({
			el: '#Report2',
			data: {
				NOming: true,//未命中
				kenengming:false,//可能命中
				ming:false,//命中
				anq:true,//安全
				jingt:false,//警惕
				weix:false,//危险
				anq2:true,//安全
				jingt2:false,//警惕
				weix2:false,//危险
				anq3:true,//安全
				jingt3:false,//警惕
				weix3:false,//危险
				anq4:true,//安全
				jingt4:false,//警惕
				weix4:false,//危险
				anq5:true,//安全
				jingt5:false,//警惕
				weix5:false,//危险
				anq6:true,//安全
				jingt6:false,//警惕
				weix6:false,//危险
				ricCon:true,//日常显示
				chengCon:true,//成功显示
				duotouCon:true,//多头显示
				huanqianCon:true,//还款显示
				shengqingCon:true,//申请显示
				transform2P:false,//图标旋转
				transform1P:false,//图标旋转
				transform3P:false,//图标旋转
				transform4P:false,//图标旋转
				transform5P:false,//图标旋转
				
				idNname:"小王",
				successRate:"20",
				
				
				conList:{},//总数据
				
				
			},
			mounted: function() {
				var self = this;
				
				self.ReportCon();
				self.echas();
				
			},
			methods: {
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
				huanqian:function(){
					var self = this;
					self.huanqianCon = !self.huanqianCon;
					self.transform4P = !self.transform4P;
				},
				shengqing:function(){
					var self = this;					
					self.shengqingCon = !self.shengqingCon;
					self.transform5P = !self.transform5P;
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
					self = this;
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
          					
					
					var riskInfoApplyID =  window.localStorage.getItem("riskInfoApplyID");
					console.log(riskInfoApplyID);
					//var urlStr = Util.baseUrl + '/DuG/api/risk/riskManange/findRiskInfo.do';
        			var md5Str = Util.basekey
        								+ riskInfoApplyID;
//      								+userPhone;   	

        			$.ajax({
							type:"get",
            				//url: urlStr,
            				async:true,
            				data: {
                				key: Util.basekey,
                				auth: Util.base32Encode('key,riskInfoApplyID'),
                				token: md5(md5Str),
                				riskInfoApplyID: riskInfoApplyID,
//              				idName: idName,
                				
            				},
            				success: function(res){
            					
            					var temp3 = JSON.parse(res);
          					console.log(temp3);
          					var js = temp3.ret_data.riskItems
							self.conList = JSON.parse(js).risk_items;//数据
							console.log(self.conList);
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
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
							console.log(self);
							
            					
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
				
				
			},
});
	