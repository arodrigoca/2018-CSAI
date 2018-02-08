function printSomething()
{
    var aux = parseInt(document.getElementById("timer").innerHTML)
    aux = aux + 1;
    document.getElementById("timer").innerHTML = aux;
}

function main()
{
    document.getElementById("timer").innerHTML = 0;
    var timedFunction = setInterval(printSomething, 1000);
}
