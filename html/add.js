mui.init();

mui.ready(function(){
	//3级联示例 地区
	var cityPicker3 = new mui.PopPicker({
		layer: 3
	});
	cityPicker3.setData(cityData3);
	var showCityPickerButton = document.getElementById('city');
	var cityResult3 = document.getElementById('city');
	showCityPickerButton.addEventListener('tap', function(event) {
		cityPicker3.show(function(items) {
			cityResult3.innerText = (items[0] || {}).text + " " + (items[1] || {}).text + " " + (items[2] || {}).text;
			cityResult3.style.color = "#000";
			//返回 false 可以阻止选择框的关闭
			//return false;
		});
	}, false);
	
	//1级联 宽带类型
	var typeData = [{
			value: 'YD',
			text: '移动'
		}, {
			value: 'DX',
			text: '电信'
		}, {
			value: 'LT',
			text: '联通'
		}, {
			value: 'QT',
			text: '其它'
		}];
	var typePicker = new mui.PopPicker();
	typePicker.setData(typeData);
	var typeBox = document.getElementById("type");
	typeBox.addEventListener('tap', function(event) {
		typePicker.show(function(items) {
			typeBox.innerText = items[0].text;
			typeBox.style.color = "#000";
			//返回 false 可以阻止选择框的关闭
			//return false;
		});
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
		});
	}, false);
});
