let timer;
let running=false;

let mode="work";

let workTime;
let restTime;

let currentTime;

let round=1;
let totalRounds;

function format(sec){

 const m=Math.floor(sec/60);
 const s=sec%60;

 return String(m).padStart(2,"0")
 + ":"
 + String(s).padStart(2,"0");
}

function updateUI(){

 document.getElementById("timer").textContent=
 format(currentTime);

 document.getElementById("round").textContent=
 `라운드 ${round} / ${totalRounds}`;
}

function vibrate(){

 if(navigator.vibrate){
     navigator.vibrate([300,100,300]);
 }
}

document.getElementById("startBtn")
.addEventListener("click",start);

function start(){

 if(running) return;

 if(!currentTime){

   workTime=
   Number(document.getElementById("work").value);

   restTime=
   Number(document.getElementById("rest").value);

   totalRounds=
   Number(document.getElementById("rounds").value);

   currentTime=workTime;

   document.getElementById("mode").textContent=
   "운동";
 }

 running=true;

 timer=setInterval(tick,1000);
}

function tick(){

 currentTime--;

 updateUI();

 if(currentTime<=0){

   vibrate();

   if(mode==="work"){

      mode="rest";
      currentTime=restTime;

      document.body.className="rest";

      document.getElementById("mode").textContent=
      "휴식";

   }else{

      if(round>=totalRounds){

         clearInterval(timer);

         document.getElementById("mode").textContent=
         "완료 🎉";

         running=false;

         return;
      }

      round++;

      mode="work";

      currentTime=workTime;

      document.body.className="work";

      document.getElementById("mode").textContent=
      "운동";
   }
 }
}