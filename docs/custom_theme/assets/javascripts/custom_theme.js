$( document ).ready(function() {
  displayLatestWarning();
  makeImagesZoomable();
});

$(window).on('hashchange', function(){
  displayLatestWarning();
});

function displayLatestWarning(){
  $( ".latest-warning" ).css( "display", $(location).attr('href').includes(latestWarningTrigger)?"block":"none" );
}

function makeImagesZoomable(){
  $(':not(a) > img').each(function (index, value){
    $(this).zoomify();
  });
}
