$(function () {
  /* 获取一级分类 */
  $.ajax({
    type: 'get',
    url: '/category/queryTopCategory',
    data: {},
    dataType: "json",
    success: function (result) {
      // console.log(result);
      /* 调用模板 */
      var html = template("yijiTempl", result);
      $(".box_left ul").html(html);
      getTwo(result.rows[0].id)
    }
  });



  /* 获取二级分类 */

  /* 封装函数调动给每次点击调用  */
  function getTwo(id) {
    $.ajax({
      type: "get",
      url: "/category/querySecondCategory",
      data: {
        "id": id
      },
      dataType: 'json',
      success: function (result) {
        // console.log(result);
        var htmll = template("erjiTempl", result);
        $(".box_right ul").html(htmll);
      }
    });

  }


  // 动态生成的元素无法直接添加事件，一般考虑使用事件委托
  $(".box_left_ul").on("click", "a", function () {
    // 修改样式
    $(this).parent().siblings().removeClass("active");
    $(this).parent().addClass("active");
    var id = $(this).data("id");
    // 每次点击都会调用这个函数
    getTwo(id);
  })


});