import { toDate, isToday, isThisWeek, subDays } from 'date-fns'

export default class project {
    constructor (pTitle) {
        this.pTitle = pTitle;
        this.tasks = [];
    }
//setters
    setPTitle (pTitle) {
        this.pTitle = pTitle
    }

    setTask(tasks) {
        this.tasks = tasks
    }

//getters
    getPTitle () {
        return this.pTitle
    }    

    getTasks () {
        return this.tasks
    }
//date-fns
    getToDoToday() {
        return this.tasks.filter((task) => {
          const taskDate = new Date(task. getDD())
          return isToday(toDate(taskDate))
        })
    }
    
    getToDoThisWeek() {
        return this.tasks.filter((task) => {
          const taskDate = new Date(task. getDD())
          return isThisWeek(subDays(toDate(taskDate), 1))
        })
    }
//task methods (¿Separate module? // credits)    
    getTask(taskTitle) {
        return this.tasks.find((task) => task.getTitle() === taskTitle)
    }
    
    filter(taskTitle) {
        return this.tasks.some((task) => task.getTitle() === taskTitle)
    }
    
    addTask(newTask) {
        if (this.tasks.find((task) => task.getTitle() === newTask.Title)) return
        this.tasks.push(newTask)
    }
    
    deleteTask(taskTitle) {
        this.tasks = this.tasks.filter((task) => task.title !== taskTitle)
    }

}

