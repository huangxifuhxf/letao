$(function () {
  $(".mui-btn-primary").on("tap", function () {
    var userName = $(".lt_name").val().trim();
    var userPwd = $(".lt_pwd").val().trim();
    $.ajax({
      type: "post",
      url: "/user/login",
      data: {
        "username": userName,
        "password": userPwd
      },
      /* 发送请求之前判断的是 */
      beforeSend: function () {
        if (userName == "") {
          mui.toast('请输入用户名');
          return false;
        }
        if (userPwd == "") {
          mui.toast("请输入密码");
          return false;
        }
      },
      success: function (result) {
        console.log(result);
        // 返回  result.succcess == turn说明登录过  直接返回原来的数
        if (result.success) {
          /* 说明有这个值登录成功 */
          if (location.search && location.search.indexOf("?redirectURL=") >= 0) {
            /* 把地址返回去到物品详情页  分割字符串*/
            location.href = location.search.replace("?redirectURL=", "");
          } else {
            /* 提转到商品的购物车 */
            location.href = "cart.html";
          }
        } else {
          /* 登录失败就是没有用户名 */
          mui.toast(result.message);
        }
      }
    })
  });


});