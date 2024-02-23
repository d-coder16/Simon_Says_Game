var soundCorrect = new Audio("90s-game-ui-6-185099.mp3");
var soundIncorrect = new Audio("sound_incorrect.mp3");
var gameflashsound= new Audio("achive-sound-132273.mp3")
var startsound= new Audio("game-start-6104.mp3")
let gameseq=[]
let userseq=[]
let highestscore=0

let started=false;
let btns=["yellow","red","green","blue"]

let level=0;
let h2=document.querySelector("h2");
let h3=document.querySelector("h3");
let start=document.querySelector(".start")
start.addEventListener("click",function(){
  if(started==false)
  {
    start.classList.add("disabled");
    startsound.play();
    h2.innerText=`Game Started`;
    setTimeout(function(){
      started=true;
      levelUP();
      },1000);
      
  }
})

function gameFlash(btn)
{
  gameflashsound.play();
btn.classList.add("Flash");
setTimeout(function(){
  btn.classList.remove("Flash");
},200);
}
function userFlash(btn)
{
  soundCorrect.play();
btn.classList.add("Flash");
setTimeout(function(){
  btn.classList.remove("Flash");
},200);
}

function levelUP()
{
  if(level>highestscore)
  {
    highestscore=level
    h3.innerText=`Highest Score = ${highestscore}`;
  }
  userseq=[];
  level++;
  h2.innerText=`Level ${level}`;

  let randomIdx = Math.floor(Math.random()*3);

  let randomColor=btns[randomIdx];

  let randomBtn=document.querySelector(`.${randomColor}`);
  gameFlash(randomBtn);

  gameseq.push(randomColor);


}
function btnPress()
{
  
  let btn=this;
  userFlash(btn);
  userColor=btn.getAttribute("id");
  userseq.push(userColor);
 

  checkAns(userseq.length-1);
}

function checkAns(idx)
{
  if(userseq[idx]===gameseq[idx])
  {
    if(userseq.length==gameseq.length)
    {
      setTimeout(levelUP,1000);
    }
  }
  else
  {
    document.querySelector("body").style.backgroundColor="red";
    
    setTimeout(function(){
      soundIncorrect.play();
      document.querySelector("body").style.backgroundColor="white";
    },250)
    h2.innerHTML=`Game Over! Your Score was <b>${level-1}<b>. <br> Press "START" Key to Start Again.`
    reset();
  }

}



let allbtns=document.querySelectorAll(".btn");
for(btn of allbtns)
{
  btn.addEventListener("click",btnPress)
}

function reset(){
  start.classList.remove("disabled");
  started=false;
  gameseq=[];
  userseq=[];
  level=0;
}



