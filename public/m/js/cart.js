$(function () {
  mui.init({
    pullRefresh: {
      container: "#refreshContainer", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down: {
        height: 50, //可选,默认50.触发下拉刷新拖动距离,
        auto: false, //可选,默认false.首次加载自动下拉刷新一次
        contentdown: "下拉可以刷新", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
        contentover: "释放立即刷新", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
        contentrefresh: "正在刷新...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
        // callback: pullfresh - function //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
        callback: function () {
          /* 后面的只调用函数 结束下拉刷新 */
          setTimeout(() => {
            mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
          }, 1000);

        }
      }
    }
  });
  /* 查询购物车数据 */
  $.ajax({
    type: "get",
    url: "/cart/queryCart",
    data: {},
    dataType: "json",
    success: function (result) {
      console.log(result);
      var html = template("cartPrice", {
        "list": result
      });
      $("#OA_task_2").html(html);
    }
  })

  /* 编辑数据 */
  $(".OA_task_2").on("tap", ".editBtn", function () {
    /* 拿到当前点击的自定义属性集合 */
    var this_obj = this.dataset;
    var that = this;
    var curLi = $(this).parent().parent();
    /* 因为里面有<br> 换行 在之前就是就替换掉 */
    var html = template("editcart", this_obj).replace(/\n/g, "");
    mui.confirm(html, '选择尺码', ["确认", "取消"], function (e) {
      if (e.index == 0) {
        /* 拿到发请求需要的数据 */
        var id = this_obj.productid;
        var num = $(".mui-input-numbox").val();
        var size = $(".lt_size .active").text();
        $.ajax({
          type: "post",
          url: "/cart/updateCart",
          data: {
            "id": id,
            'size': size,
            "num": num
          },
          dataType: "json",
          success: function (result) {
            if (result.success) {
              /* 修改当前列表的数据 */
              curLi.find(".both").text("x" + num + "双");
              curLi.find(".size").text("鞋码：" + size);
              /* 要用jq方法 */
              $(that).data("size", size).data("num", num);
              /* 这个方式 DOM 也可以 */
              // that.dataset.size = size;
              // that.dataset.num = num;
              mui.toast('修改商品成功');
              mui.swipeoutClose(curLi[0]);
            }
          }

        })
      } else {
        /* 结束下拉动画 */
        mui.swipeoutClose(curLi[0]);
      }
    })
    /* 初始化数字输入控件 */
    mui(".mui-numbox").numbox();
  })


  /* 给选择码数 添加样式 */
  $(document).on("tap", ".lt_userSize", function () {
    $(this).addClass("active").siblings().removeClass("active");
  })



  /* 计算总金额 */

  $(".OA_task_2").on("change", ".select", function () {
    totalPrice();
  })


  function totalPrice() {
    /* 拿到数据里面的集合 */
    var chks = $(".select:checked");
    var total = 0;
    for (var i = 0; i < chks.length; i++) {
      var num = $(chks[i]).data("num");
      var price = $(chks[i]).data("price");
      total += (num * price);
    }
    /* 四舍五入取取数 小数后面2位 主要还是看第3位 */
    $(".price_left").text(total.toFixed(2));
  }



});