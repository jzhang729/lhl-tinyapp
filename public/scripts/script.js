$(document).ready(function () {
  $("a#logout").on("click", function () {
    $.ajax({
      url: "/logout",
      method: "POST",
      success: function () {
        window.location = "/urls"
      }
    })
  })

})
