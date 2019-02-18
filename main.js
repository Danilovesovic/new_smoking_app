let startBtn = document.querySelector('.btnHolder button');
let today = new Date().getDay()
console.log("Today var: "+today);


let todayTab = document.querySelector('.day'+today);
let varName = 'day' + today;


let hoursDiv = document.querySelector('.hours');
let minutesDiv = document.querySelector('.minutes');
let secondsDiv = document.querySelector('.seconds');
let resetBtn = document.querySelector('#reset');

// global var for stats

let totalCigarNumber = 0;
let todayCigarNumber = 0;
let loop;

displayTodayCigars()
configApp();
if (localStorage.totalCigarNumber) {
    startTimer();    
}

startBtn.addEventListener('click',smokeOne);
resetBtn.addEventListener('click',resetLocalStorage);

function resetLocalStorage() {
    let conf = confirm('Reset all stats ?');
    if(conf){
        localStorage.day0 = 0;
        localStorage.day1 = 0;
        localStorage.day2 = 0;
        localStorage.day3 = 0;
        localStorage.day4 = 0;
        localStorage.day5 = 0;
        localStorage.day6 = 0;
        localStorage.removeItem('lastSmoked');
        localStorage.removeItem('totalCigarNumber');

        location.reload();
    }
}

function smokeOne() {
    this.style.display = "none";
    clearInterval(loop);
    setLastSmoked();
    startTimer();
    // set todayCigs
    if (localStorage[varName]) {
        localStorage[varName] = parseInt(localStorage[varName])+1;
    }else{
        localStorage[varName] = 1;
    }
    displayTodayCigars();
}


function startTimer() {
    let h = 0;
    let m = 0;
    let s = 0;

    let min = 0;
    let sec = 0;

    function display() {
        sec++;
        if (sec >= 60) {
            sec = 0;
            min++;
            if (min >= 60) {
                min = 0;
                h++;
            }
        }
        hoursDiv.innerHTML = h;
        minutesDiv.innerHTML = min;
        secondsDiv.innerHTML = sec;
    }

    if (localStorage.lastSmoked) {
     let now = new Date().getTime();
     let lastTime = parseInt(localStorage.lastSmoked);
     let dif = now - lastTime;
     // calculate h m s from diff
        s = dif / (1000)
        m = Math.floor(s / 60);
        h = Math.floor(m / 60);

         min = Math.floor(m - (h * 60))
         sec = Math.floor(s - (m * 60))     
        // resio genije 
    
        display();
        loop = setInterval(display, 1000);
    }else {
        display();
        loop = setInterval(display, 1000);

    }
    
}

function setLastSmoked(){
    localStorage.lastSmoked = new Date().getTime();
    localStorage.totalCigarNumber = totalCigarNumber + 1;
}

function configApp(){
    // highlight today tab
    // body > div: nth - child(2) > div: nth - child(7)
    todayTab.style.boxShadow = "0px 0px 5px black";
    if (localStorage.totalCigarNumber) {
        totalCigarNumber = parseInt(localStorage.totalCigarNumber);
    }

    if (localStorage.todayCigarNumber) {
        todayCigarNumber = parseInt(localStorage.todayCigarNumber)
    }
}

function displayTodayCigars() {

    let monday = localStorage.day1 || 0;
    let thuesday = localStorage.day2 || 0;
    let wednesday = localStorage.day3 || 0;
    let thursday = localStorage.day4 || 0;
    let friday = localStorage.day5 || 0;
    let suterday = localStorage.day6 || 0;
    let sunday = localStorage.day0 || 0;

    let days = [sunday, monday, thuesday, wednesday, thursday, friday, suterday];

    days.forEach((day, index) => {
        let procentDiv = document.querySelector('.day'+index).querySelector('.procent'); // 0,1,2,3,4,5,6
        procentDiv.style.height = parseInt(day * 2.9) + "%";
        procentDiv.innerHTML = day;


    });

    
}