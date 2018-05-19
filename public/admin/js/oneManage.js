$(function () {

  var row = 2; //显示 4 条数据
  dataQuery(row, currentPage = 1);

  /* 发请求渲染页面 */
  function dataQuery(row, currentPage = 1) {
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: currentPage,
        pageSize: row
      },
      dataType: "json",
      success: function (result) {
        console.log(result);
        var html = template("templOneManage", result);
        $(".tbody").html(html);
        /* 调用分页 */
        pageQuery(Math.ceil(result.total / result.size));
      }
    })
  }

  /* 分页逻辑 */
  function pageQuery(totalPages) {
    var options = {
      "bootstrapMajorVersion": 3,
      "totalPages": totalPages,
      /* 这是点击页码触发的事件 */
      "onPageClicked": function (event, originalEvent, type, page) {
        /* 每点击一次都触发渲染一次页面  调用  dataQuery 函数*/
        dataQuery(row, currentPage = page);
      }
    };
    $(".pagination").bootstrapPaginator(options); // $("#pagintor") 
  }
});