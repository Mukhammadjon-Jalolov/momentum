import playList from "./playList.js";
console.log(playList);

function showTime(){
    const vaqt = document.querySelector('.time');
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    vaqt.textContent = currentTime;
    setTimeout(showTime, 1000);
}
showTime();

setInterval(myDayPart, 6000);

function showToday(){
    const sana = document.querySelector('.date');
    const date = new Date();
    const options = {weekday: 'long', month: 'long', day: 'numeric'};
    const currentDate = date.toLocaleDateString('en-En', options);
    sana.textContent = currentDate;
    setTimeout(showToday, 1000);
}
showToday();

const date = new Date();
const hours = date.getHours();
const numday = parseInt(hours/6);

const ism = document.querySelector('.name');

function uploadname(){
    localStorage.setItem('name', ism.value);
}
const nameInput = document.getElementById('nameInput');
nameInput.addEventListener("onchange", uploadname);

if(ism.value === ""){
    ism.placeholder = "[Enter name]";
    //ism.setAttribute("data-i18n", "entername");
}

function setLocalStorage() {
    localStorage.setItem('name', ism.value);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
    if(localStorage.getItem('name')) {
      ism.value = localStorage.getItem('name');
    }
  }
  window.addEventListener('load', getLocalStorage);

let randomitem;
let chosedaypart;
let imgitem;
const bodypart = document.querySelector('body');

function partofday(){
    const daypart = document.getElementById('greetId');

    const parts = ['Goodnight', 'Goodmorning', 'Goodafternoon', 'Goodevening']
    
    daypart.setAttribute("data-i18n", `${parts[numday]}`);
    //daypart.textContent = parts[numday];

    const whatday = ['night', 'morning', 'afternoon', 'evening'];
    chosedaypart = whatday[numday];

    const addr1 = "https://github.com/Mukhammadjon-Jalolov/momentum_images/blob/assets/images/afternoon/01.jpg?raw=true";

    randomitem = Math.floor(Math.random() * 20 + 1);
    imgitem = randomitem.toString();

    if(imgitem.length < 2 && imgitem !== "0"){
        imgitem = "0" + randomitem;
    }

    bodypart.style.background = "url(https://github.com/Mukhammadjon-Jalolov/momentum_images/blob/assets/images/"+ chosedaypart + "/" + imgitem + ".jpg?raw=true)";

    setInterval(myDayPart, 1000);
}
partofday();

function myDayPart(){
    const date = new Date();
    const hours = date.getHours();
    const test = parseInt(hours/6);

    if(numday != test){
        partofday();
    }
}

const allQuotes = [];

async function readQuote(){
    const quotes = 'data.json';
    const res = await fetch(quotes);
    const data = await res.json();
    data.forEach((el) => {
        allQuotes.push(el);
    })

}
readQuote();

function changeQuote(){
    readQuote();
    let current;
    const qt = document.querySelector('.quote');
    const au = document.querySelector('.author');

    let rand = Math.floor(Math.random() * 11);

    if(qt === allQuotes[rand]){
        current = allQuotes[rand+1];
    } else {
        current = allQuotes[rand];
    }

    qt.textContent = current.quote;
    au.textContent = current.owner;
}
const quoteBtn = document.getElementById('Isquote');
quoteBtn.addEventListener("click", changeQuote);

const nextprev = (values) => {
    if(values > 0){
        randomitem === 20 ? randomitem = 1 : randomitem++;
    } else if (values < 0) {
        randomitem === 1 ? randomitem = 20 : randomitem--;
    }

    imgitem = randomitem.toString();

    if(imgitem.length < 2 && imgitem !== "0"){
        imgitem = "0" + randomitem;
    }

    bodypart.style.background = "url(https://github.com/Mukhammadjon-Jalolov/momentum_images/blob/assets/images/"+ chosedaypart + "/" + imgitem + ".jpg?raw=true)";
}

const leftSlide = document.getElementById('slideprev');
const rigthSlide = document.getElementById('slidenext');
leftSlide.addEventListener('click', (evt) => nextprev(-1, evt));
rigthSlide.addEventListener('click', (evt) => nextprev(1, evt));



const musicList = document.getElementById('playListAll');
let single;

playList.forEach((el) => {
    single = document.createElement('li');
    single.classList.add('play-item');
    single.textContent = el.title;

    musicList.append(single);
})





const audio = document.querySelector('audio');
const playbtn = document.querySelector('.play');
const previous = document.querySelector('.play-prev');
const nextsong = document.querySelector('.play-next');
const playingList = document.getElementById('playListAll').children;

let isPlay = false;
let playNum = 0;

function playMusic(){
    if(isPlay){
        audio.pause();
        isPlay = false;
    } else {
        //audio.currentTime = 0;
        audio.src = playList[playNum].src;
        audio.play();
        isPlay = true;

        let playingSong = playingList.item(playNum);
        playingSong.classList.add('item-active');
    }
    playbtn.classList.toggle('pause');
}

function playPrev(){
    playNum === 0 ? playNum = 3 : playNum--;
    audio.src = playList[playNum].src;
    audio.play();
    isPlay = true;
    console.log(playNum);

    for(let i = 0; i < playingList.length; i++){
        playingList[i].classList.remove('item-active');
    }

    let playingSong = playingList.item(playNum);
    playingSong.classList.add('item-active');
}

function playNext(){
    playNum < 3 ? playNum++ : playNum = 0;
    audio.src = playList[playNum].src;
    audio.play();
    isPlay = true;
    console.log(playNum);

    for(let i = 0; i < playingList.length; i++){
        playingList[i].classList.remove('item-active');
    }

    let playingSong = playingList.item(playNum);
    playingSong.classList.add('item-active');
}
const audioelement = document.getElementById('demoaudio');
audioelement.onended = () => {
    playNext();
}

playbtn.addEventListener('click', playMusic);
//pausebtn.addEventListener('click', pauseMusic);

previous.addEventListener('click', playPrev);
nextsong.addEventListener('click', playNext);


const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const humidityData = document.querySelector('.humidity');
const windSpd = document.querySelector('.wind');


const cityupdate = document.querySelector('.city');
const cityvalue = document.getElementById('cityId');

async function getWeather(city, event){
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&appid=0911b3b575935be082b241397218f59a&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${parseInt(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    windSpd.textContent = `Wind speed: ${data.wind.speed}m/s`;
    humidityData.textContent = `Humidity: ${data.main.humidity}%`;
    cityvalue.value = city;
}
getWeather("Minsk");


cityupdate.addEventListener('keypress', (event) => {
    if(event.keyCode === 13){
        event.preventDefault();
        getWeather(cityvalue.value);
    }
});

cityupdate.addEventListener('focusout', () => {
    getWeather(cityvalue.value);
});


const opensettings = document.getElementById('opensettings');

const playerset = document.getElementById('setplayer');
const weatherset = document.getElementById('setweather');
const timeset = document.getElementById('settime');
const dateset = document.getElementById('setdate');
const greetingset = document.getElementById('setgreeting');
const quoteset = document.getElementById('setquote');

playerset.checked = true;
weatherset.checked = true;
timeset.checked = true;
dateset.checked = true;
greetingset.checked = true;
quoteset.checked = true;

const elplayer = document.getElementById('player');
const elweather = document.getElementById('weather');
const eltime = document.getElementById('time');
const eldate = document.getElementById('date');
const elgreeting = document.getElementById('greeting');

const elIsquote = document.getElementById('Isquote');
const elquote = document.getElementById('quote');
const elauthor = document.getElementById('author');

function settingsDo(){
    if(localStorage.getItem('playerset') === "true"){
        playerset.checked = true;
    } else if(localStorage.getItem('playerset') === "false") {
        playerset.checked = false;
        elplayer.style.visibility = "hidden";
    }
    
    if(localStorage.getItem('weatherset') === "true"){
        weatherset.checked = true;
    } else if(localStorage.getItem('weatherset') === "false") {
        weatherset.checked = false;
        elweather.style.visibility = "hidden";
    }
    
    if(localStorage.getItem('timeset') === "true"){
        timeset.checked = true;
    } else if(localStorage.getItem('timeset') === "false") {
        timeset.checked = false;
        eltime.style.visibility = "hidden";
    }
    
    if(localStorage.getItem('dateset') === "true"){
        dateset.checked = true;
    } else if(localStorage.getItem('dateset') === "false") {
        dateset.checked = false;
        eldate.style.visibility = "hidden";
    }
    
    if(localStorage.getItem('greetingset') === "true"){
        greetingset.checked = true;
    } else if(localStorage.getItem('greetingset') === "false") {
        greetingset.checked = false;
        elgreeting.style.visibility = "hidden";
    }
    
    if(localStorage.getItem('quoteset') === "true"){
        quoteset.checked = true;
    } else if(localStorage.getItem('quoteset') === "false") {
        quoteset.checked = false;
        elIsquote.style.visibility = "hidden";
        elquote.style.visibility = "hidden";
        elauthor.style.visibility = "hidden";
    }
}
settingsDo();

playerset.addEventListener('change', (e) => {
    if(e.target.checked == true){
        elplayer.style.visibility = "visible";
        localStorage.setItem('playerset', "true");
    } else {
        elplayer.style.visibility = "hidden";
        localStorage.setItem('playerset', "false");
    }
});

weatherset.addEventListener('change', (e) => {
    if(e.target.checked == true){
        elweather.style.visibility = "visible";
        localStorage.setItem('weatherset', "true");
    } else {
        elweather.style.visibility = "hidden";
        localStorage.setItem('weatherset', "false");
    }
});

timeset.addEventListener('change', (e) => {
    if(e.target.checked == true){
        eltime.style.visibility = "visible";
        localStorage.setItem('timeset', "true");
    } else {
        eltime.style.visibility = "hidden";
        localStorage.setItem('timeset', "false");
    }
});

dateset.addEventListener('change', (e) => {
    if(e.target.checked == true){
        eldate.style.visibility = "visible";
        localStorage.setItem('dateset', "true");
    } else {
        eldate.style.visibility = "hidden";
        localStorage.setItem('dateset', "false");
    }
});

greetingset.addEventListener('change', (e) => {
    if(e.target.checked == true){
        elgreeting.style.visibility = "visible";
        localStorage.setItem('greetingset', "true");
    } else {
        elgreeting.style.visibility = "hidden";
        localStorage.setItem('greetingset', "false");
    }
});

quoteset.addEventListener('change', (e) => {
    if(e.target.checked == true){
        elIsquote.style.visibility = "visible";
        elquote.style.visibility = "visible";
        elauthor.style.visibility = "visible";
        localStorage.setItem('quoteset', "true");
    } else {
        elIsquote.style.visibility = "hidden";
        elquote.style.visibility = "hidden";
        elauthor.style.visibility = "hidden";
        localStorage.setItem('quoteset', "false");
    }
});



opensettings.addEventListener('click', () => {console.log("Settings opened")})

const sozlamabtn = document.getElementById('sozlamalar');
const settingsDiv = document.getElementById('settings');
settingsDiv.classList.add('closed');

sozlamabtn.addEventListener('click', showhideSettings);

function showhideSettings(){
    settingsDiv.classList.toggle('closed');
}