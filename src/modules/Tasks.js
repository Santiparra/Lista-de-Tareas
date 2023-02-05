
export default class Task  {
    constructor (title, description, dueDate, priority, state, details) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.state = state;
    this.details = details;
    }
//setters
    settitle(title) {
        this.title = title
      };

    setdesc(description) {
        this.description = description;
    }

    setDD(dueDate) {
        this.dueDate = dueDate
      }    
    setPrior(priority) {
        this.priority = priority
      }
    setstate(state) {
        this.state = state
      }
    setDets(details) {
        this.details = details
    }  
//getters         
    getTitle() {
        return this.title
    }
    getDesc() {
    return this.description
    }
    getDD() {
        return this.dueDate
    }
    getPrior() {
    return this.priority
    }
    getState() {
    return this.state
    }
    getDetails() {
        return this.details
    }  
       
};