mui.init({
	pullRefresh: {
		container: '#pullrefresh',
		down: {
			callback: pulldownRefresh
		},
		up: {
			contentrefresh: '正在加载...',
			callback: pullupRefresh
		}
	}
});

var listBox = document.getElementById("list");
var appID = localStorage.getItem("AppID");
var appKey = localStorage.getItem("AppKey");
var page = 1;
var filter = {
	fields:{"id":true,"name":true,"broadband_type":true,"end_date":true},
    "order": "end_date DESC", 
    "limit": 10,
    "skip" : 0
}

var detailPage = null;
mui('#list').on('tap','li',function(){
	var id = this.getAttribute('id');
	if (!detailPage) {
		detailPage = plus.webview.getWebviewById('detail.html');
	}
	mui.fire(detailPage,'show',{id:id});
	mui.openWindow({
		id: 'detail.html',
		show: {
			aniShow: 'pop-in'
		},
		styles: {
			popGesture: 'hide'
		},
		waiting: {
			autoShow: false
		}
	});
});

//console.log(encodeURIComponent(JSON.stringify(filter)));
/**
 * 下拉刷新具体业务实现
 */
function pulldownRefresh() {
	setTimeout(function() {
		listBox.innerHTML = '';
		page = 1;
		filter.skip = 0;
		mui('#pullrefresh').pullRefresh().refresh(true);
		get();
		mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
	}, 500);
}
var count = 0;
/**
 * 上拉加载具体业务实现
 */
function pullupRefresh() {
	setTimeout(function() {
		filter.skip = (page-1)*filter.limit;
		get();
	}, 500);
}

function get(){
	var now = Date.now();
	var appkey = SHA1(appID+"UZ"+appKey+"UZ"+now)+"."+now;
	mui.ajax("https://d.apicloud.com/mcm/api/Competitor_Info?filter=" + encodeURIComponent(JSON.stringify(filter)),{
			dataType:'json',//服务器返回json格式数据
			type:'get',//HTTP请求类型
			timeout:10000,//超时时间设置为10秒；
			headers:{
				'Content-Type':'application/json',
				"X-APICloud-AppId": appID,
    			"X-APICloud-AppKey": appkey
			},
			success:function(data){
				//服务器返回响应，根据响应结果，分析是否登录成功；
//				console.log(data);
				mui.each(data,function(index,item){
					var li = document.createElement('li');
					li.id = item.id;
					li.className = "mui-table-view-cell";
					li.innerHTML = template('list_temp',item);
					listBox.appendChild(li);
				});
				if(data.length < filter.limit){
					mui('#pullrefresh').pullRefresh().endPullupToRefresh(true); //参数为true代表没有更多数据了。
				}else{
					page++;
					mui('#pullrefresh').pullRefresh().endPullupToRefresh(false); //参数为true代表没有更多数据了。
				}
			},
			error:function(xhr,type,errorThrown){
				//异常处理；
//				console.log(type);
			}
		});
}

template.helper('dateFormat',function(date,format){
	var date = new Date(date);
	return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
});

if (mui.os.plus) {
	mui.plusReady(function() {
		setTimeout(function() {
			mui('#pullrefresh').pullRefresh().pullupLoading();
		}, 1000);

	});
} else {
	mui.ready(function() {
		mui('#pullrefresh').pullRefresh().pullupLoading();
	});
}