import {format} from "date-fns"

let mapValue=(localStorage.storage===undefined)?null:JSON.parse(localStorage.storage);

export var storage=new Map(mapValue);

if(localStorage.storage===undefined){
storage.set('inbox',[]);
}
getTodayTodos();


var lastId=JSON.parse(localStorage.getItem('last todo id'));

if(lastId===undefined)
lastId=0;



export function addTodoToStorage(todo,storageId){
    storage.set(storageId,storage.get(storageId).concat([todo]));
    sortByPriority(storage.get(storageId));
    localStorage.storage = JSON.stringify(Array.from(storage.entries()));
}
 
function sortByPriority(todos){
    todos.sort((a,b)=>a.priority-b.priority);
}



function getTodoIndexById(storageId,todoId){
    return storage.get(storageId).findIndex(e=>e.id==todoId);
}

export function getStorgeById(id){
    return storage.get(id);
}
export function newId(){
    localStorage.setItem('last todo id',++lastId)
    return lastId;
}

export function editTodoInStorage(todoNewData,todoId,storageId){
    let todoInd=getTodoIndexById(storageId,todoId);
    storage.get(storageId)[todoInd].title=todoNewData[0];
    storage.get(storageId)[todoInd].description=todoNewData[1];
    storage.get(storageId)[todoInd].priority=todoNewData[2];
    storage.get(storageId)[todoInd].date=todoNewData[3];
    localStorage.storage = JSON.stringify(Array.from(storage.entries()));
}


export function removeFromStorage(todoId,storageId){
    let todoInd=getTodoIndexById(storageId,todoId);
    storage.get(storageId).splice(todoInd,todoInd+1);
    localStorage.storage = JSON.stringify(Array.from(storage.entries()));
}

export function newStorage(storageId){
    storage.set(storageId,[]);
    localStorage.storage = JSON.stringify(Array.from(storage.entries()));
}

export function removeStorage(storageId){
    storage.delete(storageId);
    localStorage.storage = JSON.stringify(Array.from(storage.entries()));
}

export function getTodayTodos(){
    let todayTodos=[];
    let todayDate=format(Date.now(),'yyyy-MM-dd')
    let itr=storage.keys();
    let key=itr.next().value;
    while(key!==undefined){
        if(key=='today'){
            key=itr.next().value;
            continue;
        }
        storage.get(key).forEach(todo=>{
            if(todo.date==todayDate)todayTodos.push(todo);
        })
        key=itr.next().value;
    }
    sortByPriority(todayTodos);
    storage.set('today',todayTodos);
    return todayTodos;
}