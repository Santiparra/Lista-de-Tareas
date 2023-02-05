import './main.scss';
import{Todo} from './modules/Tasks'
import{initDisplay,reloadProjects,todoPanel,refreshDisplay}from './modules/UI'
import { getTodayTodos, storage } from './modules/storage';
initDisplay();
refreshDisplay(storage.get('inbox'));
reloadProjects();
