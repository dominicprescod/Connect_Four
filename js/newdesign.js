$(function(){
// ===================================================
// Creating a simple animation with the #4 when the window loads
  var remove = [1,3,5,7,12,13,15];
  var r = 0;

$('td').each(function(i){
  if (i === remove[r]) {
    setTimeout(function(){
      $('td').eq(i).css('background','red');
    }, 500);
    setTimeout(function(){
      $('td').eq(i).css('background','black');
    }, 1000);
    setTimeout(function(){
      $('td').eq(i).css('background','#3FC380');
    }, 1500);
    r++;
  }
});
// ===================================================

$('#radio').click(function(){
      if ($('#button').css('margin-left') === '0px'){
        $('#button').css("margin-left", "70px");
        // $(this).css('background', 'black');
          setTimeout(function(){
            $("#button h5").html('&#xe805')
                          .css({
                            'padding':'6px',
                            'font-size': '17px'
                          });

          },500);
        } else {
          $('#button').css("margin-left", "0px");
          // $(this).css('background', 'white');
          setTimeout(function(){
            $("#button h5").html('&#xe809')
                          .css({
                            'padding':'2px',
                            'font-size': '20px'
                          });
          },500);
      }
  });







});
