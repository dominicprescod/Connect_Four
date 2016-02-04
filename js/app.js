console.log('Connect 4 mumma trucker!!');
$(function() {

// creating virtual columns (reference for check win)
var control = [35,36,37,38,39,40,41];
var choices = ['red','black'];//player turns
var a = 0; //switches the turns 
var checkDraw = 0; //counts if the entire boards has been played --->credit Vincent!!
var winnerFound = false;//make sure the aI does not play when winner is found
// var threeInARow = false; //notifies the aI when the player is close to a win
// var awplus = null;
// var awMinus = null;
// var almost = [awplus, awMinus];//global --> both minus and plus 
// var almostWin = null;

var aI = function(){
  if(!(winnerFound) && (players[1] == 'Computer')){

    // if(threeInARow){
    //   setTimeout(function(){
    //     // var almostWin = almost[Math.floor(Math.random()*2)]; //in the aI
    //     if((almostWin == 0)||(almostWin == 1)||(almostWin == 2)||(almostWin == 3)||(almostWin == 4)||(almostWin == 5)||(almostWin == 6)){
    //       $board.eq(control[almostWin]).css('background',choices[a]);
    //     } else {
    //         while(almostWin > 6){
    //           almostWin -= 7;
    //         }
    //         $board.eq(control[almostWin]).css('background',choices[a]);
    //       }
    //     if(a == 0){a = 1;}else{a = 0;}//switches between red and black
    //     control[almostWin] -= 7; //allows the board to not play in a played spot - minus the current index by 7 to get the one right above it
    //     $display.text(players[a]);
    //     var comPLay = new Audio("styles/smb3_thwomp.wav");
    //     comPLay.play();
    //   },500);
    //   console.log('Blocked');
    // } else {
        setTimeout(function(){
          var randomNumber = Math.floor(Math.random()*7); 
          $board.eq(control[randomNumber]).css('background',choices[a]);//sets the board to the current color played red||black
          if(a == 0){a = 1;}else{a = 0;}//switches between red and black
          control[randomNumber] -= 7; //allows the board to not play in a played spot - minus the current index by 7 to get the one right above it
          $display.text(players[a]);
          var comPLay = new Audio("styles/smb3_thwomp.wav");
          comPLay.play();
           checkWinner();
        },500);
      }
  // }
 
}


// Starts the game hiding the board and enlarging the header
$('header').css('height','100%');
$('header').css('width','100%');
$('main').hide();
var $board = $('.board');
// gets all the entire board numbered from 0 to 41 as an array
var $p1 = $('<span>Player 1</span>');
var $p2 = $('<span>Player 2</span>');
var $name1 = $('<input type="name" placeholder="Enter Your Name" id="player1"/>');
var $name2 = $('<input type="name" placeholder="Enter Your Name" id="player2"/>');
var $submit = $('<button>Submit</button>');
var players = [];
var $display = $('<p>');
var $reset = $('<button style="width: 20%">Reset</button>');
// creates a click function for the user icon
$('#users').click(function(){
  $('#computer').hide();
  $('header').append($p1);
  $('header').append($name1);
  $('header').append($p2);
  $('header').append($name2);
  $('header').append($submit);
  $submit.click(function(){ //getting the user names info
    players.push($name1.val());
    players.push($name2.val());
    // console.log(players);
    $('header').css('height','');
    $('header').css('width','');
    $('main').show();
    $('#users').hide();
    $p1.remove();
    $name1.remove();
    $p2.remove();
    $name2.remove();
    $submit.remove();
    $display.text(players[a]);
    $('header').append($display);
    $('header').append($reset);
  });

});

$('#computer').click(function(){//gets the info from the user if they choose to play against the computer
  $('#users').hide();
  $('header').append($p1);
  $('header').append($name1);
  $('header').append($submit);
  $submit.click(function(){
    players.push($name1.val());
    // console.log(players);
    $('header').css('height','');
    $('header').css('width','');
    $('main').show();
    $('#computer').hide();
    $p1.remove();
    $name1.remove();
    $submit.remove();
    players.push('Computer');
    $display.text(players[a]);
    $('header').append($display);
    $('header').append($reset);
  });
});

$reset.click(function(){ //clears the board, resets the first player 
  $board.each(function(index){
    $board.eq(index).css('background','');
  });
  a = 0;
  $display.text(players[a]);
  control = [35,36,37,38,39,40,41]; //resets the columns

});

var checkWinner = function(){
  var win = false;
  $board.each(function(index){
    //loops through red or black
  for(var z = 0; z < choices.length; z++){
    if($board[index].style.background === choices[z]){
      //adding these factors to the current position will get the tiles immediately around the tile in red by adding or subtracting 
      var checks = [1,8,7,6];
      for(var i = 0; i < checks.length; i++){ //ADDITION CHECKS [RIGHT - DOWNRIGHT - DOWN - DOWNLEFT]
        //creating the four tiles indexes reqiured to win
        var a = index;
        var b = a+checks[i];
        var c = b+checks[i];
        var d = c + checks[i];
        // fixing SATAN's bug --> kept evaluating wins beyond the board 40-34-28-22 was able to say if b||c are edge values stop checking for win
        var edgeL = [6,13,20,27,34,41];
        var edgeR = [0,7,14,21,28,35];
        var edgeCheck = false;
        for(var e = 0; e < edgeR.length; e++){
          //because continue will jump out of THIS current loop needed to set a variable outside of the loop that can be changed to check if the criteria is met ie b||c is an edge #
          if((b === edgeL[e])|| (b === edgeR[e])) edgeCheck = true;
          if((c === edgeL[e])|| (c === edgeR[e])) edgeCheck = true;
        }
        // fixing bug that developed from my edgeCheck..wouldnt check for wins on the edge columns..setting the edgeCheck to false when a & d are both edge numbers of the same column
        for(var k = 0; k < edgeR.length; k++){
          for(var l = 0; l < edgeR.length; l++){
            if(a === edgeL[k] && d === edgeL[l]) edgeCheck = false;
            if(a === edgeR[k] && d === edgeR[l]) edgeCheck = false;
          }
        }
        // creating a limit for the board not less than 0 and not greater than 41 if it is the loop moves on to the other factor 
        if( (b < 0) || (c < 0) || (d < 0) ) continue;
        if( (b > 41)  || (c > 41) || (d > 41) ) continue;
        if(edgeCheck) continue; //if edge check is true it activates continue and skips this check
          if( ($board[a].style.background === choices[z]) && ($board[b].style.background === choices[z]) && ($board[c].style.background === choices[z]) && ($board[d].style.background === choices[z]) ){
            $board.eq(a).css('background','green');
            $board.eq(b).css('background','green');
            $board.eq(c).css('background','green');
            $board.eq(d).css('background','green');
            win = true;
            return; //prevents it from running the check twice.
          } /*else if( ($board[a].style.background === choices[z]) && ($board[b].style.background === choices[z]) && ($board[c].style.background === choices[z])){
              almostWin = d;
              threeInARow = true;
          }*/
      }
      for(var i = 0; i < checks.length; i++){ //MINUS CHECKS [LEFT - UPLEFT - UP - UPRIGHT] same as addition!
        var a = index;
        var b = a - checks[i];
        var c = b - checks[i];
        var d = c - checks[i];
        // fixing SATAN's bug --> kept evaluating wins beyond the board like [40-34-28-22] was able to say if b||c are edge values stop checking for win
        var edgeL = [6,13,20,27,34,41];
        var edgeR = [0,7,14,21,28,35];
        var edgeCheck = false;
        for(var e = 0; e < edgeR.length; e++){
          if((b === edgeL[e])|| (b === edgeR[e])) edgeCheck = true;
          if((c === edgeL[e])|| (c === edgeR[e])) edgeCheck = true;
        }
        // fixing bug that developed from my edgeCheck..wouldnt check for wins on the edge columns..setting the edgeCheck to false when a & d are both edge numbers of the same column
         for(var k = 0; k < edgeR.length; k++){
          for(var l = 0; l < edgeR.length; l++){
            if(a === edgeL[k] && d === edgeL[l]) edgeCheck = false;
            if(a === edgeR[k] && d === edgeR[l]) edgeCheck = false;
          }
        }
        if( (b < 0) || (c < 0) || (d < 0) ) continue;
        if( (b > 41)  || (c > 41) || (d > 41) ) continue;
        if(edgeCheck) continue;

          if( ($board[a].style.background === choices[z]) && ($board[b].style.background === choices[z]) && ($board[c].style.background === choices[z]) && ($board[d].style.background === choices[z]) ){
            $board.eq(a).css('background','green');
            $board.eq(b).css('background','green');
            $board.eq(c).css('background','green');
            $board.eq(d).css('background','green');
            win = true;
            return; 
          } /*else if( ($board[a].style.background === choices[z]) && ($board[b].style.background === choices[z]) && ($board[c].style.background === choices[z])){
              almostWin = d;
              threeInARow = true;
          }*/
      }
    }
  }
  });
if(win) {
  winnerFound = true;
  // alert('WIN!');
  choices = []; //stops the user from entering plays on the board
  setTimeout(function(){ //delays the switch so the user can see where they one
  $('header').css('height','100%');
$('header').css('width','100%');
$('main').hide();//same as the starting page enlarges the header and hides the board
var $end = $('<div>');
var $done = $('<button>Done</button>');
var $replay = $('<button>Replay</button>');
$end.append($done);
$end.append($replay);
$('header').append($end);
$reset.remove();
 if(a == 0) { //because a switches after click this sets it back to the current winner insteading of displaying the next player as the winner
      a = 1;
    } else {
     a = 0;
   }
   $display.text(players[a]+' WINS!');
$display.css('font-size','100px');
var courseSound = new Audio("styles/smw_course_clear.wav");
  courseSound.play();
  $done.click(function(){
    $done.remove();
    $replay.remove();
  });
  $replay.click(function(){
    location.reload();
  });
},500);
} else if(checkDraw >= 42){ //same as the winner, does not need a delay to show plays
     choices = [];
      $('header').css('height','100%');
      $('header').css('width','100%');
      $('main').hide();
      var $end = $('<div>');
      var $done = $('<button>Done</button>');
      var $replay = $('<button>Replay</button>');
      $end.append($done);
      $end.append($replay);
      $('header').append($end);
      $reset.remove();
      $display.text('Its a DRAW!');
      $display.css('font-size','100px');
      var drawSound = new Audio("styles/smw_game_over.wav");
      drawSound.play();
      $done.click(function(){
        $done.remove();
        $replay.remove();
      });
      $replay.click(function(){
        location.reload();
      });
  }


}
$('.control').click(function(){
checkDraw++;
//   for(var i = $(this).index(); i < ($(this).index() + 35); i += 7){
    
// // setTimeout(function() {
//     $board.eq(i).css('background',choices[a]);//change back to 'a'
// // }, 5000);
// setTimeout(function() {
//     $board.eq(i).css('background','');//change back to 'a'
// }, 5000);
  // }
  // failed attempt to show animation

  if(control[$(this).index()] >= 0) {
    $board.eq(control[$(this).index()]).css('background',choices[a]);//sets the board to the current color played red||black
    if(a == 0) { //switches between red and black
      a = 1;
    } else {
     a = 0;
   }
    control[$(this).index()] -= 7; //allows the board to not play in a played spot - minus the current index by 7 to get the one right above it
  }
  $display.text(players[a]); //shows the current player
  var coinSound = new Audio("styles/smw_coin.wav"); //plays a sound when the user clicks
  coinSound.play();
  checkWinner(); //checks for winning combination on every play
  aI();
});

});