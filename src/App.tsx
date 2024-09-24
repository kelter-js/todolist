import { useCallback, useMemo } from "react";
import {
  AppBar,
  Container,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";

import {
  changeTodolistTitle,
  removeTodolist,
  addTodolist,
  removeTaskFromList,
  changeTaskFromListStatus,
  addTaskInTodolist,
} from "./state/todolists-reducer";
import { AddNewTaskListContainer } from "./Components/TodolistStyles";
import { StateType } from "./state/store";
import { TaskData, TodoListsStateData } from "./types/interfaces";
import VisuallyHidden from "./Common/VisuallyHidden";
import Todolist from "./Components/TodolistContainer";
import AddItemForm from "./Components/AddItemForm";

const App = (): JSX.Element => {
  const dispatch = useDispatch();

  const todoLists = useSelector<StateType, Array<TodoListsStateData>>(
    (state) => state.todolists
  );

  const handleAddTodoList = useCallback((title: string) => {
    dispatch(addTodolist(title));
  }, []);

  const handleTodoListDeletion = useCallback(
    (id: string) => {
      dispatch(removeTodolist(id));
    },
    [todoLists]
  );

  const handleTaskListTitleChange = useCallback((id: string, title: string) => {
    dispatch(changeTodolistTitle(title, id));
  }, []);

  const handleRemoveTask = useCallback((listId: string, taskId: string) => {
    dispatch(removeTaskFromList(listId, taskId));
  }, []);

  const handleChangeTaskStatus = useCallback(
    (listId: string, taskId: string) => {
      dispatch(changeTaskFromListStatus(listId, taskId));
    },
    []
  );

  const addTaskInList = useCallback((task: TaskData, listId: string) => {
    dispatch(addTaskInTodolist(task, listId));
  }, []);

  const todoListsToRender = useMemo(
    () =>
      todoLists.map(({ title, tasks, id }) => (
        <Todolist
          deleteTodoList={handleTodoListDeletion}
          title={title}
          tasks={tasks}
          key={id}
          id={id}
          handleTaskListTitleChange={handleTaskListTitleChange}
          onRemoveTask={handleRemoveTask}
          onChangeStatus={handleChangeTaskStatus}
          onAddTask={addTaskInList}
        />
      )),
    [todoLists, handleTodoListDeletion]
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" color="inherit" component="div">
            To do lists
          </Typography>
        </Toolbar>
      </AppBar>

      <header>
        <VisuallyHidden>To do list application</VisuallyHidden>
      </header>

      <Container fixed disableGutters className={"container"} maxWidth="xl">
        <Grid container>
          <AddNewTaskListContainer>
            <AddItemForm onAddItem={handleAddTodoList} />
          </AddNewTaskListContainer>
        </Grid>

        <Grid
          container
          sx={{ flexWrap: "nowrap", overflowX: "scroll", minWidth: "100vw" }}
        >
          {todoListsToRender}
        </Grid>
      </Container>
    </>
  );
};

export default App;
