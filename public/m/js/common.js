/* 区域滚动 */
mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});



var lt = {
	// ?name=jack&age=20 >> {name:"jack",age:20}
	getParameter: function (data) {
		data = data.slice(1);
		// code a little   debug a little
		// 拆分
		var arr = data.split("&"); //["name=jack","age=20"];
		var obj = {};
		for (var i = 0; i < arr.length; i++) {
			var item = arr[i].split("="); //["name","jack"]  | ["age","20"]
			obj[item[0]] = item[1];
		}
		return obj;
	}
};