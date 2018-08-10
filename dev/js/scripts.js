$(document).ready(function(){
  $(".device").click(function(){
    if($(this).hasClass("current-device")){
      return;
    } else {
      $(this).siblings(".current-device").removeClass("current-device");
      $(this).addClass("current-device");
    }
  })
});