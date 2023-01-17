const sleep = document.querySelector('.js-sleep-text');
const eat = document.querySelector('.js-eat-text');
const hello = document.querySelector('.js-hello-text');
const play = document.querySelector('.js-play-text');
const fire = document.querySelector('.fire');
const death = document.querySelector('.death');
const dragonText = document.querySelector('.main-dragon');
const buttonPlay = document.querySelector('.js-bt-play');
const buttonSleep = document.querySelector('.js-bt-sleep');
const buttonEat = document.querySelector('.js-bt-eat');
const sleepOn = document.querySelector('.dragon-sleep');
const sleepText = document.querySelector('.sleep-text');
const dragon = document.querySelector('.dragon');
const dragonfly1 = document.querySelector('.dragon-fly-1');
const dragonfly2 = document.querySelector('.dragon-fly-2');
buttonEat.disabled = false;
buttonPlay.disabled = false;
buttonSleep.disabled = false;

class Tamagochi {
    constructor(name) {
        this.name = name;
    }
    sayHello(e) {
        e.innerHTML = `Hello, my name is ${this.name}!`;
    }
}

class Dragon extends Tamagochi {
    constructor(name, health, hungry, play, sleep, death, disturbed) {
        super(name);
        this.health = health;
        this.hungry = hungry;
        this.play = play;
        this.sleep = sleep;
        this.death = death;
        this.disturbed = disturbed;
    }
    wantSleep(elem) {
        elem.innerHTML = this.sleep;
        let dragonSleep = setInterval(() => {
            this.sleep = this.sleep - 1;
            elem.innerHTML = this.sleep;
            if (this.sleep < 9) {
                clearInterval(dragonSleep);
                elem.innerHTML = 'dragon need a sleep!';
            }
        }, 1000)
    }
    needToPlay(elem, pl = 0) {
        this.play = this.play + pl;
        elem.innerHTML = this.play;
        let dragonPlay = setInterval(() => {
            this.play = this.play - 10;
            elem.innerHTML = this.play;
            if (this.play < 200) {
                clearInterval(dragonPlay);
            }
        }, 1000)
    }
    needToEat(elem, meat = 0) {
        this.hungry = this.hungry + meat;
        elem.innerHTML = this.hungry;
        let dragonHungry = setInterval(() => {
            this.hungry = this.hungry - 10;
            elem.innerHTML = this.hungry;
            if (this.hungry < 200) {
                clearInterval(dragonHungry);
            }
        }, 1000)
    };
    dragonIsDeath(elem, death, sleepText) {
        let dragonCaput = setInterval(() => {
            if ((this.sleep < 9 && this.hungry < 200 && this.play < 200) || this.hungry <= 200 || this.play <= 200) {
                this.health = 0;
                this.play = 10;
                this.hungry = 10;
                buttonEat.disabled = true;
                buttonPlay.disabled = true;
                buttonSleep.disabled = true;
                death.style.display = 'block';
                elem.style.display = 'none';
                sleepText.innerHTML = 'dragon fell asleep forever...';
                dragonText.innerHTML = 'you are a murderer, you killed the dragon!';
                this.death = true;
                delete this.wantSleep;
                delete this.needToPlay;
                delete this.needToEat;
                delete this.sayHello;
                clearInterval(dragonCaput);
            }
        }, 3000)
    };
}

const smaug = new Dragon('Smaug', 100, 1000, 1000, 24, false, false);
eat.innerHTML = smaug.hungry;
smaug.sayHello(hello);
smaug.wantSleep(sleep);
smaug.needToPlay(play);
smaug.needToEat(eat);
smaug.dragonIsDeath(dragon, death, sleep);

buttonPlay.addEventListener('click', () => {
    if (smaug.death === true) return;
    if (smaug.disturbed === true) return;
    if (smaug.play >= 1000) return;
    buttonEat.disabled = true;
    buttonSleep.disabled = true;
    smaug.disturbed = true;
    smaug.play = smaug.play + 200;
    smaug.hungry = smaug.hungry - 100;
    eat.innerHTML = smaug.hungry;
    dragonFly()
    setTimeout(() => {
        smaug.disturbed = false;
        buttonEat.disabled = false;
        buttonSleep.disabled = false;
    }, 10000);
});

buttonSleep.addEventListener('click', () => {
    if (smaug.death === true) return;
    if (smaug.disturbed === true) return;
    if (smaug.sleep >= 9) return;
    sleep.innerHTML = 'dragon is sleep!';
    buttonEat.disabled = true;
    buttonPlay.disabled = true;
    smaug.disturbed = true;
    sleepOn.style.display = 'block';
    sleepText.style.display = 'block';
    setTimeout(() => {
        smaug.sleep = 24;
        smaug.disturbed = false;
        smaug.wantSleep(sleep);
        sleepOn.style.display = 'none';
        sleepText.style.display = 'none';
        buttonEat.disabled = false;
        buttonPlay.disabled = false;
    }, 10000);

});

function dragonFly() {
    dragon.classList.add("fly-annimation");
    dragonfly1.style.display = 'block';
    dragonfly2.style.display = 'block';
    setTimeout(() => {
        dragonfly1.style.display = 'none';
        dragonfly2.style.display = 'none';
        dragon.classList.remove("fly-annimation");
    }, 10000);
}

buttonEat.addEventListener('click', () => {
    if (smaug.death === true) return;
    if (smaug.hungry >= 1000) return;
    if (smaug.disturbed === true) return;
    buttonSleep.disabled = true;
    buttonPlay.disabled = true;
    smaug.hungry = smaug.hungry + 110;
    fire.style.display = 'block';
    setTimeout(() => {
        fire.style.display = 'none';
        buttonPlay.disabled = false;
        buttonSleep.disabled = false;
    }, 2000);
});