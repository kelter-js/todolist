import { useCallback, useReducer } from "react";
import {
  AppBar,
  Container,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import { AddNewTaskListContainer } from "./Components/TodolistStyles";
import Todolist from "./Components/TodolistCointainer";
import AddItemForm from "./Components/AddItemForm";

import {
  initialState,
  todolistsReducer,
  changeTodolistTitle,
  removeTodolist,
  addTodolist,
} from "./state/todolists-reducer";

import VisuallyHidden from "./Common/VisuallyHidden";
import styles from "./styles.module.css";

const App = (): JSX.Element => {
  const [todoLists, dispatch] = useReducer(todolistsReducer, initialState);

  const handleAddTodoList = useCallback((title: string) => {
    dispatch(addTodolist(title));
  }, []);

  const handleTodoListDeletion = useCallback(
    (id: string) => {
      dispatch(removeTodolist(id));
    },
    [todoLists]
  );

  const handleTaskListTitleChange = (id: string, title: string) => {
    dispatch(changeTodolistTitle(title, id));
  };

  const renderTodoLists = () =>
    todoLists.map(({ title, tasks, id }) => (
      <Todolist
        deleteTodoList={handleTodoListDeletion}
        title={title}
        tasks={tasks}
        key={id}
        id={id}
        handleTaskListTitleChange={handleTaskListTitleChange}
      />
    ));

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
            Photos
          </Typography>
        </Toolbar>
      </AppBar>

      <header>
        <VisuallyHidden>To do list application</VisuallyHidden>
      </header>

      <Container fixed disableGutters className={styles.container}>
        <Grid container>
          <AddNewTaskListContainer>
            <AddItemForm onAddItem={handleAddTodoList} />
          </AddNewTaskListContainer>
        </Grid>
        <Grid container>{renderTodoLists()}</Grid>
      </Container>
    </>
  );
};

export default App;
