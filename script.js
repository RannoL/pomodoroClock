let startClock;

function countdown () {
    
    let clockText = document.querySelector('#clockText').textContent;
    let arr = clockText.split(":");
    let toSeconds = ((arr[0] * 60 )+ parseInt(arr[1]))-1;
    let minutes = Math.floor(toSeconds/60);
    let seconds = toSeconds - (minutes*60);

    seconds < 10 ? seconds = "0" + seconds : void(0);
    minutes < 10 ? minutes = "0" + minutes : void(0);

    document.querySelector('#clockText').textContent = `${minutes}:${seconds}`;
    console.log({arr,toSeconds, minutes, seconds});

    if(minutes === "00" && seconds === "00"){
        document.querySelector('#clockText').textContent = `00:00`;
        clearInterval(startClock);  
/*         playSound(); */
        document.querySelector('h2').textContent = "It's time to rest!";
        document.getElementById('bodyWrap').style.background = "#48A9A6";

    }
}

function start (){
    startClock = setInterval(countdown, 1000);
    document.querySelector('#startBtn').textContent = "Reset";
}

function stopClock(){
    clearInterval(startClock)
}