const sleep = document.querySelector('.sleep');
const eat = document.querySelector('.eat');
const fly = document.querySelector('.fly');
const play = document.querySelector('.play');
const fire = document.querySelector('.fire');
const hello = document.querySelector('.hello');
const death = document.querySelector('.death');
const dragonText = document.querySelector('.main-dragon');
const buttonPlay = document.querySelector('.bt-play');
const buttonSleep = document.querySelector('.bt-sleep');
const buttonEat = document.querySelector('.bt-eat');
const sleepOn = document.querySelector('.dragon-sleep');
const sleepText = document.querySelector('.sleep-text');
const dragon = document.querySelector('.dragon');
const dragonfly1 = document.querySelector('.dragon-fly-1');
const dragonfly2 = document.querySelector('.dragon-fly-2');

class Tamagochi {
    constructor(name){
        this.name = name;
    }
    sayHello(e) {
        e.innerHTML = `Hello, my name is ${this.name}!`;
    }
}

class Dragon extends Tamagochi {
    constructor(name,health,hungry,play,sleep,death,disturbed){
        super(name);
        this.health = health;
        this.hungry = hungry;
        this.play = play;
        this.sleep = sleep;
        this.death = death;
        this.disturbed = disturbed;
    }
    
    wantSleep(elem){
        elem.innerHTML = this.sleep;
        let dragonSleep = setInterval(()=>{
            this.sleep = this.sleep-1;
            elem.innerHTML = this.sleep;
            if(this.sleep<9){
                clearInterval(dragonSleep);
                elem.innerHTML = 'dragon need a sleep!';
            }
        },1000)
    }  
    needToPlay(elem,pl=0){
        // if(this.disturbed==true) return;
        this.play= this.play+pl;
        elem.innerHTML = this.play;
        let dragonPlay = setInterval(()=>{
            this.play = this.play-10;
            elem.innerHTML = this.play;
            
            if(this.play<200){
                clearInterval(dragonPlay);
            }
        },1000)
    }
    needToEat(elem,meat=0){
        this.hungry= this.hungry + meat;
        elem.innerHTML = this.hungry;
        let dragonHungry = setInterval(()=>{
            this.hungry = this.hungry-10;
            elem.innerHTML = this.hungry;
            if(this.hungry<200){
                clearInterval(dragonHungry);
            }
        },1000)
    };
    dragonIsDeath(elem,death,sleepText){
        let dragonCaput =setInterval(()=>{
            
            if((this.sleep<9 && this.hungry<200 && this.play<200) || this.hungry<=200 || this.play<=200){
                this.health=0;
                this.play=10;
                this.hungry=10;
                death.style.display = 'block';
            elem.style.display = 'none';
            sleepText.innerHTML = 'dragon fell asleep forever...';
            dragonText.innerHTML = 'you are a murderer, you killed the dragon!';
            this.death = true;
            delete Smaug.wantSleep;
            delete Smaug.needToPlay;
            delete Smaug.needToEat;
            delete Smaug.sayHello;
            clearInterval(dragonCaput);
        }            
        },3000)
    }; 
}

const Smaug = new Dragon('Smaug',100,1000,1000,24,false,false);
eat.innerHTML=Smaug.hungry;
Smaug.sayHello(hello);
Smaug.wantSleep(sleep);
Smaug.needToPlay(play);
Smaug.needToEat(eat);
Smaug.dragonIsDeath(dragon,death,sleep);

buttonPlay.addEventListener('click',()=>{
    if(Smaug.death==true) return;
    if(Smaug.disturbed==true) return;
    if(Smaug.play>=1000) return;
    Smaug.disturbed = true;
    Smaug.play = Smaug.play+200;
    Smaug.hungry = Smaug.hungry-100;
    eat.innerHTML=Smaug.hungry;
    dragonFly()
    setTimeout(()=>{
        Smaug.disturbed = false;
    },10000);
});

buttonSleep.addEventListener('click',()=>{
    if(Smaug.death==true) return;
    if(Smaug.disturbed===true) return;
    if (Smaug.sleep>=9) return;
    sleep.innerHTML = 'dragon is sleep!';
    Smaug.disturbed = true;
    sleepOn.style.display = 'block';
    sleepText.style.display = 'block';
    setTimeout(()=>{
        Smaug.sleep = 24;
        Smaug.disturbed = false;
        Smaug.wantSleep(sleep);
        sleepOn.style.display = 'none';
        sleepText.style.display = 'none';
    },10000);
    
});

function dragonFly(){
    dragon.classList.add("fly-annimation");
    dragonfly1.style.display = 'block';
    dragonfly2.style.display = 'block';
    setTimeout(()=>{
        dragonfly1.style.display = 'none';
        dragonfly2.style.display = 'none';
        dragon.classList.remove("fly-annimation");
    },10000);
}

buttonEat.addEventListener('click',()=>{
    if(Smaug.death==true) return;
    if(Smaug.hungry>=1000) return;
    if(Smaug.disturbed===true) return;
    Smaug.hungry = Smaug.hungry+110;
    fire.style.display = 'block';
    setTimeout(()=>{
        fire.style.display = 'none';
    },2000);
});