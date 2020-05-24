let startClock;
let initialClock = "25:00";
let shortBreak = "05:00";
let longBreak = "10:00"

function countdown () {
    
    let clockText = document.querySelector('#clockText').textContent;
    let arr = clockText.split(":");
    
    if(arr[0] <= 0){
        stop();
        return
    }

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

function openSettings(){
    const modal = document.querySelector("#modalWrap");
    const closeSpan = document.querySelector('#close');
    modal.style.display = "block";
    closeSpan.onclick = () => modal.style.display = "none";
    window.onclick = (e) => e.target == modal ? modal.style.display = 'none':void(0)
}

function saveCustoms(){
    const modal = document.querySelector("#modalWrap");
    const cstmTimes = document.querySelector("#cstmTimesForm");

    //2 last values are submits
    for(i = 0; i < cstmTimes.length - 2; i++){
        switch(i){
            case 0:
                console.log("case 0");
                initialClock = cstmTimes.elements[i].value;
                //Otherwise clock would show 1:00
                initialClock < 10 ? initialClock = "0" + initialClock + ":00" 
                : initialClock += ":00";
                break;
            case 1:
                shortBreak = cstmTimes.elements[i].value;
                shortBreak < 10 ? shortBreak = "0" + shortBreak + ":00" 
                :shortBreak+= ":00";
                break;
            case 2:
                longBreak = cstmTimes.elements[i].value;
                longBreak < 10 ? longBreak = "0" + longBreak + ":00" 
                :longBreak+= ":00";
                break;
        }
    }
    modal.style.display ='none';
}