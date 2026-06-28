// =========================
// LOCAL STORAGE
// =========================

let tasks =
JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";

const colors=[

"linear-gradient(135deg,#FFD6E8,#FFF6B7)",

"linear-gradient(135deg,#D4FC79,#96E6A1)",

"linear-gradient(135deg,#A1C4FD,#C2E9FB)",

"linear-gradient(135deg,#FBC2EB,#A6C1EE)",

"linear-gradient(135deg,#F6D365,#FDA085)",

"linear-gradient(135deg,#84FAB0,#8FD3F4)"

];

const stickers = [
"./image/3.jpg",
"./image/4.jpg",
"./image/5.jpg",
"./image/6.jpg",
"./image/7.jpg",
"./image/2.jpg",
"./image/1.jpg",
"./image/8.jpg",
"./image/9.jpg"
];

// =========================
// SAVE
// =========================

function save(){

localStorage.setItem(
"tasks",
JSON.stringify(tasks)
);

}

// =========================
// ADD TASK
// =========================

function addTask(){

const input =
document.getElementById("taskInput");

const text =
input.value.trim();

if(text===""){
    if(

tasks.some(
task=>

task.text
.toLowerCase()===

text.toLowerCase()

)

){

alert(
"This task already exists 😊"
);

return;

}

alert("Please enter a task 😊");

return;

}

tasks.push({

id:Date.now(),

text:text,

completed:false,

color:
colors[
Math.floor(
Math.random()*colors.length
)
],

image:
stickers[
Math.floor(
Math.random()*stickers.length
)
]

});
input.value="";
input.focus();
save();

render();

}

// =========================
// DELETE
// =========================

function deleteTask(id){

if(
!confirm("Delete this task?")
){
return;
}

tasks=
tasks.filter(
task=>task.id!==id
);
save();

render();

}

// =========================
// COMPLETE
// =========================

function toggleTask(id){

const task =
tasks.find(
t=>t.id===id
);

if(!task) return;

task.completed =
!task.completed;

if(task.completed){

showConfetti();

}

save();

render();

}

// =========================
// EDIT
// =========================

function editTask(id){

const task =
tasks.find(
t=>t.id===id
);

if(!task) return;

let newText =
prompt(
"Edit Task",
task.text
);

if(newText===null)
return;

newText =
newText.trim();

if(newText==="")
return;

task.text =
newText;

save();

render();

}

// =========================
// FILTER
// =========================

function setFilter(type){

currentFilter =
type;

document
.querySelectorAll(".filter")
.forEach(btn=>{

btn.classList.remove(
"active"
);

if(
btn.dataset.filter===type
){

btn.classList.add(
"active"
);

}

});

render();

}

// =========================
// RENDER
// =========================

function render(){

const taskList =
document.getElementById(
"taskList"
);

taskList.innerHTML="";

let filtered =
tasks;

if(currentFilter==="active"){

filtered =
tasks.filter(
task=>!task.completed
);

}

if(currentFilter==="completed"){

filtered =
tasks.filter(
task=>task.completed
);

}

document.getElementById(
"taskCount"
).innerHTML =

`Total : ${tasks.length}
&nbsp;&nbsp;&nbsp;
Active : ${
tasks.filter(
t=>!t.completed
).length
}
&nbsp;&nbsp;&nbsp;
Completed : ${
tasks.filter(
t=>t.completed
).length
}`;

if(filtered.length===0){

taskList.innerHTML=

`<div class="empty">

🌈 No Tasks Found 😊

</div>`;

return;

}

filtered.forEach(task=>{

const div =
document.createElement(
"div"
);

div.className =
task.completed
?
"task completed-card"
:
"task";

div.dataset.id =
task.id;

div.style.background =
task.color;
div.style.backgroundSize = "100% 100%";

div.style.backgroundImage =
`url(${task.image})`;

div.innerHTML = `

<div class="task-left">

    <img
        src="${task.image}"
        class="character"
        alt="character">

    <div class="task-info">

        <h3 class="${
            task.completed ? "completed" : ""
        }">

            ${task.text}

        </h3>

        <small style="color:white; font-weight:bold; text-shadow:2px 2px 5px rgba(0,0,0,0.8);">

            ⭐ Disney Mission

        </small>

    </div>

</div>

<div class="actions">

<button
class="complete"
data-id="${task.id}">
✔
</button>

<button
class="edit"
data-id="${task.id}">
✏️
</button>

<button
class="delete"
data-id="${task.id}">
🗑
</button>

</div>

`;

taskList.appendChild(div);

});

}

// =========================
// BUTTON EVENTS
// =========================

document
.getElementById("addBtn")
.addEventListener(
"click",
addTask
);

document
.getElementById("taskInput")
.addEventListener(
"keydown",
function(e){

if(e.key==="Enter"){

addTask();

}

}
);

document
.querySelectorAll(".filter")
.forEach(btn=>{

btn.addEventListener(
"click",
function(){

setFilter(
this.dataset.filter
);

});

});

// =========================
// EVENT DELEGATION
// =========================

document
.getElementById("taskList")
.addEventListener(
"click",
function(e){

const id =
Number(
e.target.dataset.id
);

if(
e.target.classList.contains(
"delete"
)
){

deleteTask(id);

}

if(
e.target.classList.contains(
"complete"
)
){

toggleTask(id);

}

if(
e.target.classList.contains(
"edit"
)
){

editTask(id);

}

}
);

render();
document
.getElementById(
"taskInput"
).focus();
// =========================
// CONFETTI CELEBRATION
// =========================

function showConfetti(){

const emojis=[
"🎉",
"🎊",
"✨",
"⭐",
"🎈",
"💖",
"🌈",
"🌟"
];

for(let i=0;i<80;i++){

createBurst(

50,

window.innerHeight/2,

emojis

);

createBurst(

window.innerWidth-50,

window.innerHeight/2,

emojis

);

}

}

function createBurst(
startX,
startY,
emojis
){

const particle=
document.createElement("div");

particle.innerHTML=

emojis[
Math.floor(
Math.random()*
emojis.length
)
];

particle.style.position="fixed";

particle.style.left=
startX+"px";

particle.style.top=
startY+"px";

particle.style.fontSize=
(35+Math.random()*40)+"px";

particle.style.pointerEvents="none";

particle.style.zIndex="99999";

document.body.appendChild(
particle
);

const angle=
Math.random()*
Math.PI*2;

const distance=
200+
Math.random()*400;

const x=
Math.cos(angle)*
distance;

const y=
Math.sin(angle)*
distance;

particle.animate(

[
{
transform:
"translate(0,0) scale(1)",
opacity:1
},
{
transform:
`translate(${x}px,${y}px) scale(1.8)`,
opacity:0
}
],

{

duration:2200,

easing:"ease-out"

}

);

setTimeout(()=>{

particle.remove();

},2200);

}