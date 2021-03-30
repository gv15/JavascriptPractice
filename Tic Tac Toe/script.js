window.addEventListener("load", initEvents);

var user_choice = "";
var cpu_choice = "";
var count = 0;
var winnerCombination = "";
function initEvents() {
    document.querySelector(".start-btn").addEventListener("click", startGame);
}

function startGame() {
    var options = document.querySelector("#options");
    user_choice = options.value;
    if (user_choice == "X") {
        cpu_choice = "0";
    }
    else {
        cpu_choice = "X";
    }
    // console.log("User Picked", user_choice);
    options.setAttribute('disabled', true);
    buildUI();
}

function buildUI() {
    winnerCombination =
        [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
            [1, 4, 7],
            [2, 5, 8],
            [3, 6, 9],
            [1, 5, 9],
            [3, 5, 7]
        ];
    var ul = document.querySelector("#list");
    ul.style.display = 'flex';
    for (var i = 0; i < 9; i++) {
        var li = document.createElement("li");
        var btn = document.createElement("button");
        btn.setAttribute("num", i + 1);
        btn.className = 'btn';
        li.appendChild(btn);
        ul.appendChild(li);

        btn.addEventListener("click", userMove);
    }

    for (var i = 0; i < winnerCombination.length; i++) {
        for (var j = 0; j < winnerCombination[i].length; j++) {
            winnerCombination[i][j] = document.querySelector('button[num=' + '"' + winnerCombination[i][j] + '"' + ']');
        }
    }

}
function printWinner(winner) {
    var h2 = document.createElement('h2');
    if (winner == cpu_choice) {
        h2.innerText = "CPU Wins!!!!!!!";
    }
    else {
        h2.innerText = "You Win!!!!!!!!"
    }

    document.querySelector('body').appendChild(h2);
    //Disable buttons
    (function () {
        document.querySelectorAll('button').forEach(
            (btn) => {
                btn.setAttribute('disabled', true);
            }
        )
    })()
}

function userMove() {
    
    if (!this.innerText) {
        this.innerText = user_choice;
        var [isWin, winner] = checkifWinner();
        if (isWin) {
            printWinner(winner);
            return;
        }
        if (count < 8) {
            cpuMove();
            var [isWin, winner] = checkifWinner();
            if (isWin) {
                printWinner(winner);
                return;
            }
        }
        count += 2;
    }
    if (count >= 8) {
        (function () {
            //console.log('1st iife called')
            var isAllButtonsFilled = true;
            var btns = document.querySelectorAll(".btn");
            btns.forEach(btn => {
                if(!btn.innerText){

                    isAllButtonsFilled = false;
                }
          })
          if(isAllButtonsFilled && !isWin){
             (function(){
              //   console.log("2nd iife caled");
                var h2 = document.createElement('h2');
                h2.innerText = "DRAW!!!";
                document.querySelector('body').appendChild(h2);
             })()                   
          }
        })()
    }
}
function cpuMove() {
    var isMoveComplete = false;
    while (!isMoveComplete) {
        var a = parseInt(Math.random() * 10);
        if (a == 0) {
            a = 1;
        }

        var button = document.querySelector(`button[num="${a}"]`);
        if (!button.innerText) {
            isMoveComplete = true;
            button.innerText = cpu_choice;
        }
    }
}

function checkifWinner() {
    for (var combination of winnerCombination) {

        var btn1Text = combination[0].innerText;
        var btn2Text = combination[1].innerText;
        var btn3Text = combination[2].innerText;
        //console.log("btn1Text" + combination[0].getAttribute("num") + btn1Text + "btn2Text" + combination[1].getAttribute("num") + btn2Text + "btn3Text" + combination[2].getAttribute("num") + btn3Text);

        if (btn1Text && btn2Text && btn3Text) {
            if (btn1Text == btn2Text && btn2Text == btn3Text) {
                // alert("GameOver" + btn1Text + " " + "is the winner")
                return [true, btn1Text];
            }
        }
    }
    return [false];
}