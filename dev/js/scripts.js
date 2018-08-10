$(document).ready(function(){
  $(".device").click(function(){
    if($(this).hasClass("current-device")){ return; }
    $(this).siblings(".current-device").removeClass("current-device");
    $(this).addClass("current-device");
  })
});