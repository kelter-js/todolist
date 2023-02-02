import Todolist from './Components/Todolist';
import { tasks } from './utils/constants';

const App = () => {
  return (<Todolist title="technologies" tasks={tasks}/>);
}

export default App;
