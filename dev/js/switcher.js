$(document).ready(function(){ 
  $(".device").click(function(){
    if($(this).hasClass("current-device")){ return; }
    $(this).siblings(".current-device").removeClass("current-device");
    $(this).addClass("current-device");
    if($(this).hasClass("desktop-icon")){ 
      var activeImg = $(this).closest('.project-images').find('img.desktop');
    } else if ($(this).hasClass("mobile-icon")){
      var activeImg = $(this).closest('.project-images').find('img.mobile');
    }
    activeImg.siblings(".current-image").removeClass("current-image");
    activeImg.addClass("current-image");
    setParentMaxHeight();
  });
  setImageMarginTop();
  setParentMaxHeight();
});

$(window).on('load', function(){
  setImageMarginTop();
  setParentMaxHeight();
});

$(window).on('resize', function(){
  setImageMarginTop();
  setParentMaxHeight();
});

var setImageMarginTop = function(){
  window.requestAnimationFrame(function(){
    $(".desktop").each(function(){
      var myHeight = $(this).height();
      $(this).siblings(".mobile").css("margin-top", -myHeight);
    });
  });
};

var setParentMaxHeight = function(){
  window.requestAnimationFrame(function(){
    $(".current-image").each(function(){
      var myHeight = $(this).height();
      $(this).parent().css("max-height", myHeight);
    });
  });
};