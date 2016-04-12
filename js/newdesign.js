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








});
