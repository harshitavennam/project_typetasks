import {addTask,advanceTask,countByStatus,deleteTask,filterByStatus,type Task,type TaskStatus} from "./model.js";
type TaskFilter="all"|TaskStatus;
let tasks:Task[]=[]; let activeFilter:TaskFilter="all";
const titleInput=document.getElementById("task-title") as HTMLInputElement;
const addButton=document.getElementById("add-task") as HTMLButtonElement;
const taskList=document.getElementById("task-list") as HTMLUListElement;
const filterContainer=document.getElementById("filters") as HTMLDivElement;
const totalCount=document.getElementById("total-count") as HTMLSpanElement;
const emptyState=document.getElementById("empty-state") as HTMLParagraphElement;
const filters:TaskFilter[]=["all","todo","in-progress","done"];
function visibleTasks():Task[]{return activeFilter==="all"?tasks:filterByStatus(tasks,activeFilter);}
function renderFilters():void{
 filterContainer.replaceChildren();
 filters.forEach(status=>{
  const button=document.createElement("button"); button.type="button";
  button.className=activeFilter===status?"filter active":"filter";
  button.textContent=status==="all"?`All (${tasks.length})`:`${status} (${countByStatus(tasks,status)})`;
  button.setAttribute("aria-pressed",String(activeFilter===status));
  button.addEventListener("click",()=>{activeFilter=status;render();}); filterContainer.append(button);
 });
}
function renderTasks():void{
 taskList.replaceChildren(); const shown=visibleTasks(); emptyState.hidden=shown.length>0;
 shown.forEach(task=>{
  const item=document.createElement("li"); item.className="task-row";
  const info=document.createElement("div"); info.className="task-info";
  const title=document.createElement("span"); title.className=task.status==="done"?"task-title completed":"task-title"; title.textContent=task.title;
  const badge=document.createElement("span"); badge.className=`status-badge status-${task.status}`; badge.textContent=task.status; info.append(title,badge);
  const actions=document.createElement("div"); actions.className="task-actions";
  const advance=document.createElement("button"); advance.type="button"; advance.className="advance-button";
  advance.textContent=task.status==="todo"?"Start →":task.status==="in-progress"?"Complete →":"Completed";
  advance.disabled=task.status==="done"; advance.setAttribute("aria-label",`Advance ${task.title}`);
  advance.addEventListener("click",()=>{tasks=advanceTask(tasks,task.id);render();});
  const remove=document.createElement("button"); remove.type="button"; remove.className="delete-button"; remove.textContent="×";
  remove.setAttribute("aria-label",`Delete ${task.title}`); remove.addEventListener("click",()=>{tasks=deleteTask(tasks,task.id);render();});
  actions.append(advance,remove); item.append(info,actions); taskList.append(item);
 });
}
function render():void{totalCount.textContent=String(tasks.length);renderFilters();renderTasks();}
function handleAddTask():void{
 const title=titleInput.value.trim(); if(!title){titleInput.focus();return;}
 tasks=addTask(tasks,title);titleInput.value="";titleInput.focus();activeFilter="all";render();
}
addButton.addEventListener("click",handleAddTask);
titleInput.addEventListener("keydown",(event:KeyboardEvent)=>{if(event.key==="Enter")handleAddTask();});
render();
