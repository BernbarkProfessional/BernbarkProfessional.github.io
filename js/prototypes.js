



$(document).ready(function(){
    // function getElementTopLeft(id) {

    //     var ele = document.querySelector(id);
    //     var top = 0;
    //     var left = 0;
       
    //     while(ele != null && ele.tagName != "BODY") {
    //         top += ele.offsetTop;
    //         left += ele.offsetLeft;
    //         ele = ele.offsetParent;
    //     }
       
    //     return { top: top, left: left };
       
    // }
    // const topLeft = getElementTopLeft('#letter-holder');
    
    $('.msg').mouseenter(function () {
        max = 50;
        min = -50;
        $(this).animate({
            top: Math.random() * (max - min) + min 
        }, 200);
        $(this).animate({
            left: Math.random() * (max - min) + min 
        }, 100);
    
    });

    

    $('.msg').each(function(){
        $(this).mouseenter(function(e){
            var elem = $(this);
            
            let leftDistanceFromBorder = getDistanceFromLeftBorder(elem);
            let width = elem.width();
            let height = elem.height();
            /**var w = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;
    
            var h = window.innerHeight
            || document.documentElement.clientHeight
            || document.body.clientHeight;*/
    
            // if(e.clientX-getDistanceFromLeftBorder(elem) <= width && e.clientX-getDistanceFromLeftBorder(elem) >= width/2 && e.clientY-94 <= height && e.clientY-94 >= height/2){
            //     console.log('should move top left')
            //     elem.css({left:'-'+e.clientX+'px'});
            //     elem.css({top:'-'+e.clientY+'px'});
            // }
            // else if(e.clientX-getDistanceFromLeftBorder(elem) <= width/2 && e.clientX-getDistanceFromLeftBorder(elem) >= 0 && e.clientY-94 <= height && e.clientY-94 >= height/2){
                
            //     console.log('should move top right')
            //     elem.css({left:'+'+e.clientX+'px'});
            //     elem.css({top:'-'+e.clientY+'px'});
            // }
           
                console.log("clientX = "+e.clientX);
                console.log("width = " + width);
    
                console.log("clientY = "+e.clientY);
                console.log("height = "+height)
    
                console.log("distance from left side = "+getDistanceFromLeftBorder(elem))
            
        })
        
    });

    $('#letter-holder').mouseleave(function(){
        
        $(".msg").animate({
            top: 0,
            left: 0
        },10);
   })

   
  
//    $(document).mouseleave(function(){
//         $("#cursor").css({opacity:0});
//         console.log(topLeft.top)
//         $(".msg").animate({
//             top: topLeft.top,
//             left: topLeft.left
//         },100);
//    })

  
});

function getDistanceFromLeftBorder(elem){
    // console.log(elem.width() + " width of msg")
    // console.log(window.innerWidth + " window width")
    // console.log(elem.offset().left + " left side of element")
    return window.innerWidth - (elem.offset().left + elem.width());
}
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

 