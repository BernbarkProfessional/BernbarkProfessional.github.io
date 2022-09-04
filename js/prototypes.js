
    

$(document).ready(function(){
    var $position = $('#msg').offset();

    $('#move').mouseenter(function () {

        $(this).animate({
            top: Math.random() * 300
        }, 100);
        $(this).animate({
            left: Math.random() * 300
        }, 100);
    
    });

    $('move').mouseout(function () {

        $(this).animate({
            top: moveableObjectStartPos.top
        }, 100);
        $(this).animate({
            left: moveableObjectStartPos.left
        }, 100);
    
    });

   $(document).mousemove(function(e) {
    if(e.pageX<=1000){
        $("#cursor").css({left:e.pageX+25, top:e.pageY, opacity:0.5});
    }
    else if(e.pageX>=0){
        $("#cursor").css({left:e.pageX-25, top:e.pageY, opacity:0.5});
    }
    var w = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;

    var h = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;

    if(e.pageX <= w && e.pageX >= w/2 && e.pageY <= h && e.pageY >= h/2){
        console.log("true "+w);
        $('#msg').css({left:'+'+e.pageX+5+'px'});
        $('#msg').css({top:'+'+e.pageY+'px'});
    }
    else{
        console.log(w);
        $('#msg').css({left:'-'+e.pageX+5+'px'});
        $('#msg').css({top:'-'+e.pageY+'px'});
    }
    

   });
   $("#msg").animate({
    top: 50,
    left: 50
    });
   $(document).mouseleave(function(){
        $("#cursor").css({opacity:0});
   })
});

function getWidth() {
    return Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.documentElement.clientWidth
    );
  }
  
  function getHeight() {
    return Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.documentElement.clientHeight
    );
  }