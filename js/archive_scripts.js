var doc = window.document,
  context = doc.querySelector('.js-loop'),
  clones = context.querySelectorAll('.is-clone'),
  disableScroll = false,
  scrollHeight = 0,
  scrollPos = 0,
  clonesHeight = 0,
  i = 0;

function getScrollPos () {
  return (context.pageYOffset || context.scrollTop) - (context.clientTop || 0);
}

function setScrollPos (pos) {
  context.scrollTop = pos;
}

function getClonesHeight () {
  clonesHeight = 0;

  for (i = 0; i < clones.length; i += 1) {
    clonesHeight = clonesHeight + clones[i].offsetHeight;
  }

  return clonesHeight;
}

function reCalc () {
  scrollPos = getScrollPos();
  scrollHeight = context.scrollHeight;
  clonesHeight = getClonesHeight();

  if (scrollPos <= 0) {
    setScrollPos(1); // Scroll 1 pixel to allow upwards scrolling
  }
}

function scrollUpdate () {
  if (!disableScroll) {
    scrollPos = getScrollPos();

    if (clonesHeight + scrollPos >= scrollHeight) {
      // Scroll to the top when you’ve reached the bottom
      setScrollPos(1); // Scroll down 1 pixel to allow upwards scrolling
      disableScroll = true;
    } else if (scrollPos <= 0) {
      // Scroll to the bottom when you reach the top
      setScrollPos(scrollHeight - clonesHeight);
      disableScroll = true;
    }
  }

  if (disableScroll) {
    // Disable scroll-jumping for a short time to avoid flickering
    window.setTimeout(function () {
      disableScroll = false;
    }, 40);
  }
}

// Handling the modal using Lightboxes from JQuery -->
      
function createModal(){
    var jq = document.createElement('script');
    newFunction(jq);
    //Prepping jquery for use in this file
    jQuery(document).ready(function($) {
        // Setting up anything with "lightbox_trigger" to trigger a lightbox on click
    $('.lightbox_trigger').click(function(e) {

        // Code that makes the lightbox appear
        //This prevents new page from opening
        e.preventDefault();

        // getting a reference to the image that should be displayed
        var image_href = $(this).attr("href");
        if ($('#lightbox').length > 0) { // #lightbox exists
            
            //insert img tag with clicked link's href as src value
            $('#content').html('<img src="' + image_href + '" />');
            
            //show lightbox window - you can use a transition here if you want, i.e. .show('fast')
            $('#lightbox').show();
        }
        else { //#lightbox does not exist 

            //create HTML markup for lightbox window
            var lightbox = 
            '<div id="lightbox">' +
                '<p>Click to close</p>' +
                '<div id="content">' + //insert clicked link's href into img src
                    '<img src="' + image_href +'" />' +
                '</div>' +    
            '</div>';
                
            //insert lightbox HTML into page
            $('body').append(lightbox);
        }
    });
    $('body').on('click', '#lightbox', function() {
        $('#lightbox').hide();
    });
    });
}


                

function newFunction(jq) {
    jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js";
    document.getElementsByTagName('head')[0].appendChild(jq);
    // ... give time for script to load, then type (or see below for non wait option)
    jQuery.noConflict();
}

function init () {
  reCalc();
  //createModal();
  context.addEventListener('scroll', function () {
    window.requestAnimationFrame(scrollUpdate);
  }, false);

  window.addEventListener('resize', function () {
    window.requestAnimationFrame(reCalc);
  }, false);
}

if (document.readyState !== 'loading') {
  init()
} else {
  doc.addEventListener('DOMContentLoaded', init, false)
}
