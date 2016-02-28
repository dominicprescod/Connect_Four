console.log('Connect Four');
$(function(){
// Necessary mechanics variables
var control     = [35,36,37,38,39,40,41], //allows gameplay for each column (minus by 7 to fill each tile)
    n           = 0, //allows to switch between first and second player (switches to 1||0 throughout the game)
    choices     = ['red','black'], //color choices available
    checks      = [1,8,7,6,-1,-8,-7,-6],//for the winning condition to move in each direction to find a connect
    checkDraw   = 0, //checks the tiles played(amount of times the board has been played) if greater than or equal to 41 the game is a tie
    winnerFound = false, //because the winner checks are done within loops, need an external variable that can be checked in global scope
    players     = [], //used to store the names of the players and activates the aI when choosen provided the second element is 'Computer'
    coinSound   = new Audio("styles/smw_coin.wav"), // sound on click
    compSound   = new Audio("styles/smb3_thwomp.wav"), //sound when aI plays
    courseSound = new Audio("styles/smw_course_clear.wav"), //sound when winner found
    drawSound   = new Audio("styles/smw_game_over.wav"), //sound when the game is drawn
    //checks to make sure that checkWinner() isnt evaluating wins across the edge of the board
    edgeL       = [6,13,20,27,34,41],
    edgeR       = [0,7,14,21,28,35];


// jQuery / DOM elements setting up the user interface
var $header         = $('header'),
    $main           = $('main'),
    $board          = $('.board'),
    $boardControl   = $('.control'),
    $p1             = $('<span>Player 1</span>'),
    $p2             = $('<span>Player 2</span>'),
    $name1          = $('<input type="name" placeholder="Enter Your Name" id="player1"/>'),
    $name2          = $('<input type="name" placeholder="Enter Your Name" id="player2"/>'),
    $submit         = $('<button>Submit</button>'),
    $display        = $('<p>'),
    $choose         = $('h6'),
    $reset          = $('<button>Reset</button>').css('width','20%'),
    $users          = $('#users'),
    $computer       = $('#computer'),
    $div            = $('<div>'),
    $done           = $('<button>Done</button>'),
    $table          = $('<table>'),
    $replay         = $('<button>Replay</button>');
// console.log($p1);

// Starting the game, user has to choose either User or Computer.
// depending on the choice, either enters two names for two players
// or one to play against the computer

// Starting........hides the game and expands the header.
// User can choose play against human or computer, shown by icons
$header.css({'height':'100%','width': '100%'});
$main.hide();

// if user clicks play against human icon
$users.click(function(){//on click do the following..
  $computer.hide();
  $choose.hide();
  $header.append($p1)
         .append($name1)
         .append($p2)
         .append($name2)
         .append($submit);
  // when Submit is clicked ..
  $submit.click(function(){
    players.push($name1.val(),$name2.val()); //push user names in the players array
    $header.css({'height':'','width':''}); //set the header hight and width to null
    $main.show(); //show the board
    $users.hide();//hide the icon
    $p1.remove(); $name1.remove(); $p2.remove(); $name2.remove(); $submit.remove(); // remove the form from the board
    $display.text(players[n]); //set the display to show the next player to make a move
    $header.append($display)
           .append($reset); // add the display and reset button to the header
  });
});

// if user clicks play against the computer icon
$computer.click(function(){
  $users.hide(); //hide the user icon
  $choose.hide();
  $header.append($p1)
        .append($name1)
        .append($submit); //append enter your name and submit button
  // when submit is clicked with the computer choice
  $submit.click(function(){
    players.push($name1.val(),'Computer'); //enters the user name and 'Computer' in the players array
    $header.css({'height':'','width':''}); // sets the header back to normal height and width
    $main.show();//shows the board
    $computer.hide();//hides the icon
    $p1.remove(); $name1.remove(); $submit.remove(); //removes the form
    $display.text(players[n]); //enters the next player in the display tag
    $header.append($display)
           .append($reset);//adds the display and reset button to the header
  });
});

//reset function that sets the board to its original state when clicked
$reset.click(function(){
  control = [35,36,37,38,39,40,41];//set the first play to the lowest number in each "column"
  $board.each(function(index){//for loop substitute
    $board.eq(index).css('background','');//sets all td's to no background -->''
  });
  n = 0; // sets back to 0 to show the first person to play in the players array
  display.text(players[n]);//shows the first player to play
});

var aI = function(){
  //only plays when the 'Computer is the second element in the players array
  // also only plays when ther winnerFound is set to false
  if(!(winnerFound) && (players[1] === 'Computer')){
    // delays game play to give the illusion of the aI contemplating its next move
    setTimeout(function(){
        var randomNumber = Math.floor(Math.random()*7); //provides a random number to be played from 0 - 6
        $board.eq(control[randomNumber]).css('background',choices[n]);//sets the board to the current color played red||black
        checkDraw++; //logs the play to check if there's been a draw
        compSound.play();//plays a sound to signal aI played
        n = (n === 0) ? 1 : 0;//switches between red and black
        control[randomNumber] -= 7; //allows the board to not play in a played spot - minus the current index by 7 to get the one right above it
        $display.text(players[n]); //shows the next player
         checkWinner();
      },500);
  }
}

// Setting up click function on the board
$boardControl.click(function(){
  //checks to see if the column clicked is full
  if(control[$(this).index()] >= 0) {
    $board.eq(control[$(this).index()]).css('background',choices[n]); //sets the available tile to the players color
    coinSound.play();//plays a sound to signal the player move
    n = (n === 0) ? 1 : 0; //switches the display to the next player
    control[$(this).index()] -= 7; //logs the play in the control function
    checkDraw++; //logs the play to check for a draw
  }
  $display.text(players[n]); //shows the next player to play
  checkWinner(); //checks winner
  aI(); //activates the aI move
});

var checkWinner = function(){
// loops through each tile on the board
  $board.each(function(index){
    // switches between the red or black choices checking for a win on each color
    for(var z = 0; z < choices.length; z++){
      // if a tile is played ie red or black it activates the checks
      if($board[index].style.background === choices[z]){
        // loops through the checks incrementing or decrementing the index position of the saved tile taking a snap shot of the four positoins surrounding it
        for(var i = 0; i < checks.length; i++){
            var a = index,
                b = a + checks[i],
                c = b + checks[i],
                d = c + checks[i],
                edgeCheck = false;
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
            // if the four positions saved are all the same color then we have a winner!!
            if( ($board[a].style.background === choices[z]) && ($board[b].style.background === choices[z]) && ($board[c].style.background === choices[z]) && ($board[d].style.background === choices[z]) ){
              // sets each position to green to show the winning tiles
              $board.eq(a).css('background','green');
              $board.eq(b).css('background','green');
              $board.eq(c).css('background','green');
              $board.eq(d).css('background','green');
              winnerFound = true;//deactivates the aI
              displayWinner(); //Shows the current winner
            }
            if(checkDraw >= 42) displayWinner(); //shows that the game is drawn
          }
        }
      }
    });
  }


var displayWinner = function() {
  choices = []; //stops the user from entering plays on the board
  setTimeout(function(){ //delays the switch so the user can see where they one
    $header.css({'height':'100%', 'width': '100%'}); // increases the size of the header
    $main.hide();//removes the game
    $div.append($done)
        .append($replay); //shows a 'Done' & 'Replay' button
    $header.append($div);
    $reset.remove();
    n = (n === 0) ? 1 : 0;//switches to the previous player that won
    // shows that the game has been drawn
    if(checkDraw >= 42){
      $display.text('Its a DRAW!');
      drawSound.play();
    } else {
      $display.text(players[n]+' WINS!');//shows the winner!
      courseSound.play(); // plays the sound when a winner is found
    }

    $display.css({'font-size':'100px','margin-top':'14%'}); //increases the size of the display font
    // click event for the done and replay buttons
    $done.click(function(){
      $done.remove(); $replay.remove();
      $display.text('Thanks for playing!');
      setTimeout(function(){
        location.reload();
      },2500);
    });
    $replay.click(function(){
      location.reload();
    });
  },500);
}

});
