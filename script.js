let startClock;
let initialClock = "25:00";
let shortBreak = "05:00";
let longBreak = "10:00"

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
        timeToRest();

    }
}

function timeToRest(){
    document.querySelector('h2').textContent = "It's time to rest!";
    document.getElementById('bodyWrap').style.background = "#48A9A6";
    document.querySelector('#startBtn').textContent = 'Reset'
    document.querySelector('#startBtn').setAttribute('onclick', `resetTimer()`)
}

function toUpperCase(str){
    return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
}

function changeStartBtn (state) {
    document.querySelector('#startBtn').textContent = `${toUpperCase(state)}`;
    document.querySelector('#startBtn').setAttribute('onclick', `${state}()`)

}

function start (){
    startClock = setInterval(countdown, 1000);
    changeStartBtn("stop");
}

function stop(){
    clearInterval(startClock)
    changeStartBtn("start");

}

function resetTimer(){
    stop();
    document.querySelector('h2').textContent = "It's time to work!";
    document.getElementById('bodyWrap').style.background = "#D92B33";
    document.querySelector("#clockText").textContent = initialClock;
    document.querySelector('#startBtn').setAttribute('onclick', `start()`)
}

function sBreak(){
    stop();
    document.querySelector('h2').textContent = "It's time to rest!";
    document.getElementById('bodyWrap').style.background = "#48A9A6";
    document.querySelector("#clockText").textContent = shortBreak;
    start();
}

function lBreak(){
    stop();
    document.querySelector('h2').textContent = "It's time to rest!";
    document.getElementById('bodyWrap').style.background = "#48A9A6";
    document.querySelector("#clockText").textContent = longBreak;
    start();
}