let CurrentVisible ="Sign";
db

function VisiblityManager(element){
    var NewElement = document.getElementById(element)
    var currentElement =document.getElementById(CurrentVisible)
    if(element != CurrentVisible){
        currentElement.style.display ="none";
        NewElement.style.display ="flex";
        CurrentVisible = element;
    }
}