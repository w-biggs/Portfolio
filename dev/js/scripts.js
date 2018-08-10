$(document).ready(function(){
  $(".device").click(function(){
    if($(this).hasClass("current-device")){
      console.log("not switched");
      return;
    } else {
      $(this).siblings(".current-device").removeClass("current-device");
      $(this).addClass("current-device");
      console.log("switched");
    }
  })
});