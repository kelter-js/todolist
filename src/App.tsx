import Todolist from './Components/TodolistCointainer';
import { tasks } from './utils/constants';
import VisuallyHidden from './Common/VisuallyHidden';

const App = () => {
  return (
    <>
      <header>
        <VisuallyHidden>
          To do list application
        </VisuallyHidden>
      </header>
      <main>
        <Todolist title='Technologies' tasks={tasks} />
      </main>
    </>
  );
}

export default App;
