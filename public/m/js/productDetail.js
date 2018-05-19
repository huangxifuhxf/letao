$(function () {
    // 获取当前商品详情数据，实现动态的渲染
    // ,调用公共的js文件获取用户所传入的商品ID
    var id = lt.getParameter(location.search)["id"];
    // 发送ajax请求
    var render = function () {
        $.ajax({
            type: 'get',
            url: '/product/queryProductDetail',
            data: {
                "id": id
            },
            dataType: 'json',
            success: function (result) {
                console.log(result);
                var html = template("proDetailTemp", result);
                $(".lt_main .mui-scroll").html(html);
                // mui组件如果是动态生成的，那么在动态生成之后需要重新初始化
                // 1.轮播图
                mui('.mui-slider').slider({
                    interval: 2000 //自动轮播周期，若为0则不自动播放，默认为0；
                });
                // 2.下拉刷新
                mui.init({
                    pullRefresh: {
                        container: "#refreshContainer", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
                        down: {
                            height: 50, //可选,默认50.触发下拉刷新拖动距离,
                            auto: false, //可选,默认false.首次加载自动下拉刷新一次
                            contentdown: "下拉可以刷新", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                            contentover: "释放立即刷新", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                            contentrefresh: "正在刷新...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                            callback: function () {
                                setTimeout(function () {
                                    render();
                                    /* 上拉后的回掉函数   结束上拉效果 */
                                    mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
                                }, 1000);
                            } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                        }
                    }
                });
                // 3.初始化数字输入框
                mui(".mui-numbox").numbox();
            }
        });
    }
    render();

    //  单击选择尺码  
    // 记住：动态生成的元素不能直接为其添加事件
    // 动态生成的元素需要使用事件委托来绑定事件
    $(document).on("tap", ".lt_userSize", function () {
        // 清除其它span元素的样式
        $(this).siblings().removeClass("active");
        // 添加样式
        $(this).addClass("active");
    });

    // 添加到购物车
    $(".mui-btn-warning").on("tap", function () {
        $.ajax({
            type: "post",
            url: '/cart/addCart',
            data: {
                productId: id,
                num: $(".mui-input-numbox").val(),
                size: $(".lt_userSize.active").text()
            },
            dataType: 'json',
            success: function (result) {
                /* 在那边判断有没有登录   如果有登录 如果没有登录 就跳转地址   */
                // 判断添加是否成功：如果未登陆则无法正确的添加到购物车
                if (result.error && result.error == 400) {
                    mui.toast(result.message);
                    // 让你跳转到登陆页
                    setTimeout(function () {
                        location.href = "login.html?redirectURL=" + location.href;
                    }, 1000);
                } else {
                    // 弹出提示：提示添加成功，是继续逛逛还是查看购物车
                    mui.confirm('是否跳转到购物车？', '添加成功', ["是", "否"], function (e) {
                        if (e.index == 0) {
                            location.href = "cart.html";
                        } else {

                        }
                    })
                }

            }
        });
    });
});