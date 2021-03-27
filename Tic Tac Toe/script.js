window.addEventListener("load", initEvents);

var user_choice = "";
var cpu_choice = "";
var count = 0;
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
    var ul = document.querySelector("#list");
    ul.style.display = 'flex';
    for (var i = 0; i < 9; i++) {
        var li = document.createElement("li");
        var btn = document.createElement("button");
        btn.setAttribute("num", i+1);
        btn.className = 'btn';
        li.appendChild(btn);
        ul.appendChild(li);
        
        btn.addEventListener("click", userMove);
    }
}

function userMove() {
    if(!this.innerText){
        this.innerText = user_choice;
        if(count<8)
            cpuMove();
    }
   count+=2;
}
function cpuMove(){
    var isMoveComplete = false;
    while(!isMoveComplete){
        var a = parseInt(Math.random()*10);
        if(a==0){
            a = 1;
        }
        console.log(a);
        var button = document.querySelector(`button[num="${a}"]`);
        if(!button.innerText){
            isMoveComplete = true;
            button.innerText = cpu_choice;
        }
    }
}