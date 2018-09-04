

"use strict";

var customBiz = {
	init: function() {
		var self = this;
		// 初始化日历

		var calendar = new Calendar({
			// swiper滑动容器
			container: "#calendar",
			// 上一月节点
			pre: ".pre",
			// 下一月节点
			next: ".next",
			// 回到今天
			backToToday: ".backToday",
			// 业务数据改变
			dataRequest: function(currdate, callback, _this) {
				// 无日程安排
				var data = [{
					"date": "2018-04-18"
				}, {
					"date": "2018-04-17"
				}, {
					"date": "2018-04-16"
				}];
				callback && callback(data);
			},
			// 点击日期事件
			onItemClick: function(item) {
					var defaultDate = item.date;
				// 设置标题
				setTitle(defaultDate);
				var b = mui("#made")[0];
				
				b.innerHTML = "当前时间是："+defaultDate;
				
			},
			// 滑动回调
			swipeCallback: function(item) {
				var defaultDate = item.date;
				// 设置标题
				setTitle(defaultDate);
				
			},
			// 调试
			isDebug: false
		});
		// 设置标题
		var titleNode = document.querySelector('.mid span');

		function setTitle(date) {
			titleNode.innerText = date;
			var b = mui("#made")[0];
				b.innerHTML = "当前时间是："+date;
				
		}

	}
}

// 初始化
customBiz.init();
