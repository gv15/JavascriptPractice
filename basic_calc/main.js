window.addEventListener("load", bindEvents);
function bindEvents(){
    bindComputationEvents();
    document.getElementById("reset").addEventListener("click", function(){
        var inputBoxArray = document.getElementsByTagName("input");
        for(var i=0; i<inputBoxArray.length; i++){
            inputBoxArray[i].value = ""
        }
    })
}
function bindComputationEvents(){
    var btnArray = document.getElementsByTagName("button");
    for(var i=0; i<btnArray.length; i++){
        if(i!=0){
            btnArray[i].addEventListener("click", printResult);
        }
    }
}

function computeResult(){
    
    var first = Number(document.getElementById("first").value);
    var second = Number(document.getElementById("second").value);
    let functionObj = {
        "add":function(x, y){
            
            return x+y;
        },
        "sub":function(x, y){
            return x-y;
        },
        "mul":function(x, y){
            return x*y;
        },
        "divide":function(x, y){
            return x/y;
        }
        
    }
    
   
    return functionObj[this.id](first, second);
}
function printResult(){
     var result = computeResult.call(this);
    document.getElementById("result").value = isNan(result)?0:result;
}
