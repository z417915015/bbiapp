mui.init();

mui.ready(function(){
	var param = {};//
	
	//3级联示例 地区
	var cityPicker3 = new mui.PopPicker({
		layer: 3
	});
	cityPicker3.setData(cityData3);
	cityPicker3.pickers[0].setSelectedValue('640000');
	var showCityPickerButton = document.getElementById('city');
	var cityResult3 = document.getElementById('city');
	showCityPickerButton.addEventListener('tap', function(event) {
		cityPicker3.show(function(items) {
			cityResult3.innerText = (items[0] || {}).text + " " + (items[1] || {}).text + " " + (items[2] || {}).text;
			cityResult3.style.color = "#000";
			param.city = (items[0] || {}).text + " " + (items[1] || {}).text;
			param.area = (items[2] || {}).text;
			//返回 false 可以阻止选择框的关闭
			//return false;
		});
	}, false);
	
	//1级联 宽带类型
	var typeBox = document.getElementById("type");
	typeBox.addEventListener('tap', function(event) {
		var bts=[{title:"移动"},{title:"电信"},{title:"联通"},{title:"其它"}];
		plus.nativeUI.actionSheet({title:"网络类型",cancel:"取消",buttons:bts},
			function(e){
				if (e.index >0) {
					typeBox.innerText = bts[e.index-1].title;
					typeBox.style.color = "#000";
					param.broadband_type = bts[e.index-1].title;
				}
			}
		);

	}, false);
	
	//日期选择
	var endDateBox = document.getElementById("endDate");
	
	var options = {type:"date"};
	/*
	 * 首次显示时实例化组件
	 * 示例为了简洁，将 options 放在了按钮的 dom 上
	 * 也可以直接通过代码声明 optinos 用于实例化 DtPicker
	 */
	var picker = new mui.DtPicker(options);
	endDateBox.addEventListener('tap', function() {
		picker.show(function(rs) {
			/*
			 * rs.value 拼合后的 value
			 * rs.text 拼合后的 text
			 * rs.y 年，可以通过 rs.y.vaue 和 rs.y.text 获取值和文本
			 * rs.m 月，用法同年
			 * rs.d 日，用法同年
			 * rs.h 时，用法同年
			 * rs.i 分（minutes 的第二个字母），用法同年
			 */
			endDateBox.innerText = rs.text;
			endDateBox.style.color = "#000";
			param.end_date = rs.text;
		});
	}, false);
//	localStorage.setItem("AppID","A6913395502970");
//	localStorage.setItem("AppKey","9D0A90B8-E4AE-F4C7-FFF0-5CE24A68978A");
	var saveBtn = document.getElementById("save");
	var appID = localStorage.getItem("AppID");
	var appKey = localStorage.getItem("AppKey");
	saveBtn.addEventListener('tap',function(){
		var now = Date.now();
		var appkey = SHA1(appID+"UZ"+appKey+"UZ"+now)+"."+now;
		
		param.name = document.getElementById("name").value;
		param.phonenumber = document.getElementById("phone").value;
		param.address = document.getElementById("address").value;
		
		if(param.name == ''){
			mui.alert("姓名不能为空！");
			return;
		}
		plus.nativeUI.showWaiting("保存中...");
		mui.ajax('https://d.apicloud.com/mcm/api/Competitor_Info',{
			data:JSON.stringify(param),
			dataType:'json',//服务器返回json格式数据
			type:'post',//HTTP请求类型
			timeout:10000,//超时时间设置为10秒；
			headers:{
				'Content-Type':'application/json',
				"X-APICloud-AppId": appID,
    			"X-APICloud-AppKey": appkey
			},
			success:function(data){
				//服务器返回响应，根据响应结果，分析是否登录成功；
//				console.log(data);
				plus.nativeUI.closeWaiting();
				mui.alert("保存成功！");
				mui.back();
			},
			error:function(xhr,type,errorThrown){
				//异常处理；
//				console.log(type);
				plus.nativeUI.closeWaiting();
				mui.alert("保存失败！");
			}
		});
	});
});
