mui.init({
  pullRefresh: {
    container: "#refreshContainer", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
    //  说明下面是来配置下拉刷新功能
    down: {
      height: 50, //可选,默认50.触发下拉刷新拖动距离,
      auto: false, //可选,默认false.首次加载自动下拉刷新一次
      contentdown: "下拉可以刷新", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
      contentover: "释放立即刷新", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
      contentrefresh: "正在刷新...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
      callback: function () {
        // 让组件隐藏
        setTimeout(function () {
          mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
        }, 2000);
      } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
    },
    up: {
      height: 50, //可选.默认50.触发上拉加载拖动距离
      auto: false, //可选,默认false.自动上拉加载一次
      contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
      contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
      callback: function () {
        setTimeout(function () {
          mui('#refreshContainer').pullRefresh().endPullupToRefresh(false);
        }, 2000);
      } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
    }
  }
});


//   获取用户输入的关键字
var obj = lt.getParameter(location.search);

// 发送数据请求
var getData = function (data) {
  $.ajax({
    type: 'get',
    url: '/product/queryProduct',
    data: data,
    dataType: 'json',
    success: function (result) {
      console.log(result);
      var html = template("productTemp", result);
      $(".lt_product ul").html(html);
    }
  });
}
getData({
  "proName": obj.key,
  page: 1,
  pageSize: 100
});


// 单击超链接实现排序
$(".lt_order > a").on("tap", function () {
  var type = $(this).data("type");

  // 1.如果当前被点击的元素有Active样式，那么就只需要进行箭头样式的切换
  // 2.如果当前被点击的元素没有active样式，那么就先清除别的元素的Active样式，再为当前元素添加active,重置之前Active元素箭头方向向下
  if ($(this).hasClass("active")) {
    // 让span元素的样式进行切换
    $(this).find("span:last-of-type").toggleClass("fa-angle-down fa-angle-up");
  } else {
    // 将之前拥有active样式的a元素的span子元素的箭头方向重置为向下
    // $("[data-type].active").find("span:last-of-type").attr("class","fa fa-angle-down");
    $("[data-type].active").find("span:last-of-type")[0].className = "fa fa-angle-down";
    // 去除之前拥有Active样式的a标签的active样式
    $("[data-type].active").removeClass("active");
    $(this).addClass("active");
  }
  var orderType = $(this).find("span:last-of-type").hasClass("fa-angle-down") ? 2 : 1;


  var data1 = {
    "proName": obj.key,
    page: 1,
    pageSize: 100
  };
  data1[type] = orderType;

  getData(data1);


});

/* 跳转到详情也页面 */
$(".lt_product").on("tap", "a", function () {
  location.href = $(this).attr("href");
})