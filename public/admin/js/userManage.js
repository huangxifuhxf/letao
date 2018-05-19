$(function () {

  /* 设置默认的页数 */

  var row = 4; //每页渲栏多少条

  /* 首次次调用 */
  loderPage(row, currentPage = 1);

  /* 发请求渲染页面 */
  function loderPage(row, currentPage = 1) {
    $.ajax({
      type: "get",
      url: "/user/queryUser",
      data: {
        page: currentPage, // 当前页面
        pageSize: row //渲染多少条
      },
      dataType: "json",
      success: function (result) {
        console.log(result);
        var html = template("templUser", result);
        $(".tbody").html(html);
        /* 总数 / 当前的条数 */
        setPage(Math.ceil(result.total / result.size));
      }
    })
  }

  /* 分页编辑 */
  function setPage(totalPages) {
    var options = {
      "bootstrapMajorVersion": 3, //版本修改 根据自己bootstrap 版本决定
      "totalPages": totalPages, //设置总页数
      "onPageClicked": function (event, originalEvent, type, page) {
        /* 点击页码数改变当前页面的数据 */
        console.log(page);
        /* 调用页面 */
        loderPage(row, currentPage = page); //在这里从新被赋值
      }
    };
    $(".pagination").bootstrapPaginator(options); // $("#pagintor") 
  }


  /* 修改用户管理状态 */
  $(".tbody").on("click", ".openBtn", function () {
    var that = this;
    var id = $(this).data('id');
    var isDelete = $(this).text() == "开启" ? 0 : 1;
    $.ajax({
      type: "post",
      url: '/user/updateUser',
      data: {
        "id": id,
        "isDelete": isDelete
      },
      dataType: "json",
      success: function (result) {
        if (result.success) {
          isDelete == 0 ? $(that).text('禁用') : $(that).text('开启');
          isDelete == 1 ? $(that).parent().siblings('.state').text('已禁用') : $(that).parent().siblings('.state').text('已启用');
          $(that).toggleClass("btn-success btn-danger");
        }
      }
    })
  })

});