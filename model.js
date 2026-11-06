function addTask(tasks,title){const nextId=tasks.length===0?1:Math.max(...tasks.map(task=>task.id))+1;return[...tasks,{id:nextId,title,status:"todo"}]}
function completeTask(tasks,id){return tasks.map(task=>task.id===id?{...task,status:"done"}:task)}
function filterByStatus(tasks,status){return tasks.filter(task=>task.status===status)}
function advanceTask(tasks,id){const next={todo:"in-progress","in-progress":"done",done:"done"};return tasks.map(task=>task.id===id?{...task,status:next[task.status]}:task)}
function deleteTask(tasks,id){return tasks.filter(task=>task.id!==id)}
function countByStatus(tasks,status){return filterByStatus(tasks,status).length}
export{addTask,advanceTask,completeTask,countByStatus,deleteTask,filterByStatus};