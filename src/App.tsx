import { useState, useCallback } from "react";
import { v1 } from "uuid";

import { tasks } from "./utils/constants";
import { ITodoListsState } from "./types/interfaces";
import { AddNewTaskListContainer } from "./Components/TodolistStyles";
import Todolist from "./Components/TodolistCointainer";
import {
  AppBar,
  Container,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AddItemForm from "./Components/AddItemForm";
import VisuallyHidden from "./Common/VisuallyHidden";
import styles from "./styles.module.css";

const App = (): JSX.Element => {
  const [todoLists, setTodoLists] = useState<ITodoListsState[]>([
    {
      id: v1(),
      title: "",
      tasks,
    },
    {
      id: v1(),
      title: "some",
      tasks,
    },
  ]);

  const handleAddTodoList = useCallback((title: string) => {
    setTodoLists((state) => [...state, { id: v1(), title, tasks: [] }]);
  }, []);

  const handleTodoListDeletion = useCallback(
    (id: string) => {
      setTodoLists((state) => state.filter((item) => item.id !== id));
    },
    [todoLists]
  );

  const handleTaskListTitleChange = (id: string, title: string) => {
    const [target] = todoLists.filter((item) => item.id === id);

    target.title = title;

    setTodoLists((state) => [...state]);
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
