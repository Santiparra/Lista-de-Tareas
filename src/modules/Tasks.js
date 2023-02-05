import {newId} from './storage';
export class Todo {
    constructor(title,description,priority,date){
        this.set(title,description,priority,date);
    }
    set(title,description,priority,date) {
        this.title=title;
        this.description=description;
        this.priority=priority;
        this.date=date;
        this.id=newId();
    }
}