import {format}from "date-fns"
import {addTodoToStorage,getStorgeById,editTodoInStorage,removeFromStorage, storage, newStorage, removeStorage, getTodayTodos}from './storage'
import { Todo } from './Tasks';

const inboxButton=document.querySelector('#inbox');
const todayButton=document.querySelector('#today');
const addProjectButton=document.querySelector('#add-project');
const addTodoButton=document.getElementById('add-todo-button');
const todoPanel=document.querySelector('#todo-panel');
const projectsDisplay=document.querySelector('#projects-block');
const navButtons=[inboxButton,todayButton];

export function initDisplay(){
    inboxButton.setAttribute('class','active-button');

    refreshDisplay(getStorgeById(inbox.id));
    inboxButton.addEventListener('click',()=>{
        changeActive(inboxButton);
        refreshDisplay(getStorgeById(inboxButton.id));
    });

    todayButton.addEventListener('click',()=>{
        changeActive(todayButton);
        refreshDisplay(getTodayTodos());
    });

    addProjectButton.addEventListener('click',()=>{
        createProject();
    });

    addTodoButton.addEventListener('click',()=>{
        todoForm();
    });

}

function changeActive(button){
    navButtons.forEach(e=>e.className=e.className.replace('active-button','').trim());
    button.className += ' active-button ';
}

export function todoForm(){
    var formContainer=document.createElement('div');
    formContainer.setAttribute('id','form-container');
    formContainer.innerHTML=`
        <form>
            <div>
                <label for="name" >Título:</label><span id='title-error'>(min: 1 caracter, max: 15 caracteres).</span>
                <input 
                type="text"
                name="name"
                placeholder="Nombre para tu tarea"
                id="form-title"
                >
            </div>
            <div>
                <label for="description" >Descripción:</label>
                <input 
                type="text"
                name="description"
                placeholder="Describe tu tarea(opcional)"
                id="form-description"
                >
            </div>
            
            <div>
                <label for="priority" id="priority-label" >Prioridad:</label>
                <select name="priority" id="form-priority">
                    <option value="3">Baja</option>
                    <option value="2">Medio</option>
                    <option value="1">Alta</option>
                </select>
            </div>
            <div>
                <label for="due-date" id="date-label" >Fecha: </label>
                <input type="date" id="form-date" name="due-date"
                min="${format(Date.now(),'yyyy-MM-dd')}"
                max="" 
               >
            </div>
                <div class="form-button add">Agregar</div>
                <div class="form-button cancel">Cancelar</div>
        </form>
    `;
    
    document.body.appendChild(formContainer);
    var add=document.querySelector('.add');
    var canel=document.querySelector('.cancel');
    add.addEventListener('click', function(){
        newTodo(formContainer);
    }, false);
    canel.addEventListener('click',()=>{
        formContainer.remove();
    });
}

function newTodo(form){
    var title=form.querySelector('#form-title').value;
    var description=form.querySelector('#form-description').value;
    var priority=form.querySelector('#form-priority').value;
    var dueDate=form.querySelector('#form-date').value;
    var todo=new Todo(title,description,priority,dueDate);
    if(title.length>15||title.length<1)
    form.querySelector('#title-error').setAttribute('style','display:inline-block')
    else{
    form.querySelector('#title-error').setAttribute('style','display:none');
    form.remove();
    addTodoToStorage(todo,whoseActive());
    refreshDisplay(getStorgeById(whoseActive()));
    }
}

function whoseActive(){
    return document.querySelector('.active-button').id;
}


export function refreshDisplay(todos){
    clearTodoPanel();
    todos.forEach(todo=>{
        let todoHTML=document.createElement('div');
        todoHTML.setAttribute('id',todo.id);
        todoHTML.setAttribute('class','todo');
        todoHTML.innerHTML=`
            <div class="todo-check"></div>
            <div class="todo-title">${todo.title}</div>
            <div class="todo-description">${todo.description}</div>
            <div class="todo-date">${todo.date}</div>
            <div class="todo-priority" style="background-color:${getPriorityColor(todo.priority)}"></div>
            <button class="todo-edit">Editar</button>`;
            addEventListenersForTodo(todoHTML);
        todoPanel.appendChild(todoHTML);
    });
    if(whoseActive()=='today')
    addTodoButton.parentNode.setAttribute('style','display:none;');
    else
    addTodoButton.parentNode.setAttribute('style','display:initial;')
}

function addEventListenersForTodo(todo){
    const edit=todo.querySelector('.todo-edit');
    const check=todo.querySelector('.todo-check');
    edit.addEventListener('click',()=>{
        editForm(todo);
    })

    check.addEventListener('click',()=>{
        removeTodo(todo);
    })
}


function getPriorityColor(priority){
    switch(priority){
        case '1':
            return 'red';
            case '2':
                return 'yellow';
                case '3':
                    return 'springgreen ';
    }
}

function clearTodoPanel(){
    while (todoPanel.lastChild.id !== 'add-todo' ) {
        todoPanel.removeChild(todoPanel.lastChild);
    }
}

function editForm(todo){
    let top='',medium='',low='';
    switch(todo.querySelector('.todo-priority').style.backgroundColor){
        case 'red':
            top='selected';
            break;
        case 'yellow':
            medium='selected';
            break;
        case 'springgreen':
            low='selected';
            break;
        default:
            console.log('error al editar prioridad');

    }
    var formContainer=document.createElement('div');
    formContainer.setAttribute('id','form-container');
    formContainer.innerHTML=`
        <form>
            <div>
                <label for="name" >Titulo:</label><span id='title-error'>(min: 1 caracter, max: 15 caracteres).</span>
                <input 
                type="text"
                name="name"
                value="${todo.querySelector('.todo-title').textContent}"
                id="form-title"
                >
            </div>
            <div>
                <label for="description" >Descripción::</label>
                <input 
                type="text"
                name="description"
                value="${todo.querySelector('.todo-description').textContent}"
                id="form-description"
                >
            </div>
            
            <div>
                <label for="priority" id="priority-label" >Prioridad:</label>
                <select name="priority" id="form-priority">
                    <option value="3" ${low}>Baja</option>
                    <option value="2" ${medium}>Medio</option>
                    <option value="1" ${top}>Alta</option>
                </select>
            </div>
            <div>
                <label for="due-date" id="date-label" >Fecha: </label>
                <input type="date" id="form-date" name="due-date"
                min="${format(Date.now(),'yyyy-MM-dd')}"
                value="${todo.querySelector('.todo-date').textContent}"
               >
            </div>
                <div class="form-button add">Editar</div>
                <div class="form-button cancel">Cancelar</div>
                <div class="todo-id">${todo.id}</div>
        </form>
    `;

    document.body.appendChild(formContainer);
    var add=document.querySelector('.add');
    var cancel=document.querySelector('.cancel');
    add.addEventListener('click', function(){
        editTodo(formContainer);
        formContainer.remove();
    }, false);
    cancel.addEventListener('click',()=>{
        formContainer.remove();
    });
}

function editTodo(form){
    var title=form.querySelector('#form-title').value;
    var description=form.querySelector('#form-description').value;
    var priority=form.querySelector('#form-priority').value;
    var dueDate=form.querySelector('#form-date').value;
    var id=form.querySelector('.todo-id').textContent;
    if(title.length>15||title.length<1)
    form.querySelector('#title-error').setAttribute('style','display:inline-block')
    else{
    form.querySelector('#title-error').setAttribute('style','display:none');
    editTodoInStorage([title,description,priority,dueDate],id,whoseActive());
    refreshDisplay(getStorgeById(whoseActive()));}
}

function removeTodo(todo){
    removeFromStorage(todo.id,whoseActive());
    todo.remove();
}


function createProject(){
    let project=document.createElement('div');
    project.setAttribute('class','project ');
    projectEdit(project);
}

function projectEdit(project){
    addProjectButton.parentNode.insertBefore(project,addProjectButton.nextSibling);
    let input=document.createElement('input');
    let create=document.createElement('button');
    let cancel=document.createElement('button');
    input.setAttribute('class','project-input');
    create.setAttribute('class','project-create');
    cancel.setAttribute('class','project-cancel');
    cancel.textContent='Cancelar';
    input.defaultValue='';
    create.textContent='Hecho';
    project.appendChild(input);
    project.appendChild(create);
    project.appendChild(cancel);
    
    cancel.addEventListener('click',()=>{
        project.remove();
    });
    create.addEventListener('click',()=>{
    if(!storage.has(input.value)){
        if(input.value.length>0&&input.value.length<=15){
        project.setAttribute('id',input.value);
        changeActive(project);
        setProject(project,input.value);
        clearTodoPanel();
        input.remove();
        create.remove();
        newStorage(input.value);
        }
        else{
            alert('Los nombres de los proyectos no pueden tener mas de 15 caracteres')
        }
    }
    else{
        alert('Ya existe un proyecto con este nombre.')
    }
    }
    );
}

function setProject(project,title){
    
    projectsDisplay.appendChild(project);
    project.innerHTML=`
    <div class="project-check"></div>
    <span class="project-title">${title}</span>
    `;
    navButtons.push(project);

    project.querySelector('.project-check').addEventListener('click',()=>{
        changeActive(inbox);
        refreshDisplay(getStorgeById(inbox.id));
        removeFromeNavButtons(project);
        removeStorage(project.id);
        project.remove();
    });
    
    project.querySelector('.project-title').addEventListener('click',()=>{
        changeActive(project);
        refreshDisplay(getStorgeById(project.id));
    })
    

}

function removeFromeNavButtons(button){
    let ind=navButtons.findIndex(e=>e==button);
    navButtons.splice(ind,ind+1);
}


export function reloadProjects(){
    let itr=storage.keys();
    itr.next();itr.next();
    let value=itr.next().value;
    while(value!==undefined){
        retriveProject(value,storage.get(value));
        value=itr.next().value;
    }
}

function retriveProject(title,todos){
    const project=document.createElement('div');
    project.setAttribute('class','project ');
    project.setAttribute('id',title);
    setProject(project,title);

}