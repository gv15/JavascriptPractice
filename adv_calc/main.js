window.addEventListener("load", initEvent);

var textBox;

function initEvent() {
    textBox = document.querySelector('#box');
    textBox.setAttribute('readonly',true);
    var numbers = document.querySelectorAll(".num");
    var oprs = document.querySelectorAll('.opr');
    var calc = document.querySelector('#calc');
    for(var i = 0; i < numbers.length; i++) {
        numbers[i].addEventListener("click", appendNumber);
    }

    for(var i = 0; i < oprs.length; i++) {
        oprs[i].addEventListener("click", appendOperators);
    }
    document.querySelector(".clear").addEventListener('click', function(){
        textBox.value = '';
    })
    document.querySelector(".del").addEventListener('click', function(){
        textBox.value = textBox.value.substring(0, textBox.value.length-1);
    })
    document.querySelector(".calc").addEventListener('click', function(){
        var result = eval(textBox.value);
        textBox.value = isNaN(result)?"Error in expression click C to re-enter the expression":result;
    })
    document.querySelector('.euler').addEventListener('click', function(){
        if(!(textBox.value.charAt(textBox.value.length-1)=='e')){
            textBox.value+=this.innerText;
        }
    })
}

function appendNumber() {
    var num = this.innerText;
    textBox.value += num;
}

function appendOperators() {
    var oprs = {
        '+':true,
        '-':true,
        '*':true,
        '/':true,
        '%':true
    }
    var currentLength = textBox.value.length;
    if(oprs[textBox.value.charAt(currentLength-1)]){
        textBox.value = textBox.value.substring(0,currentLength-1)+this.innerText
    }
    else{
    textBox.value += this.innerText;
    }
}