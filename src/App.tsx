import { useState, useCallback } from 'react';
import { v1 } from 'uuid';

import { tasks } from './utils/constants';
import { ITodoListsState } from './types/interfaces';
import Todolist from './Components/TodolistCointainer';
import VisuallyHidden from './Common/VisuallyHidden';


const App = (): JSX.Element => {
  const [todoLists, setTodoLists] = useState<ITodoListsState[]>([
    {
      id: v1(),
      title: '',
      tasks,
    },
    {
      id: v1(),
      title: 'some',
      tasks,
    }
  ]);

  const handleTodoListDeletion = useCallback((id: string) => {
    setTodoLists(todoLists.filter(item => item.id !== id));
  }, [todoLists]);

  const renderTodoLists = () => {
    return todoLists.map(({ title, tasks, id }) => {
      return (<Todolist
        deleteTodoList={handleTodoListDeletion}
        title={title}
        tasks={tasks}
        key={id}
        id={id}
      />);
    });
  }

  return (
    <>
      <header>
        <VisuallyHidden>
          To do list application
        </VisuallyHidden>
      </header>
      <main>
        {renderTodoLists()}
      </main>
    </>
  );
}

export default App;
