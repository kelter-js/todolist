import { useState, useEffect, ChangeEvent } from "react";
import { Button, Stack, TextField } from "@mui/material";

import {
  TaskData,
  TodoListsStateData,
  TodolistApi,
  TodolistCreationResponse,
  TodolistDeletionResponse,
  TodolistsTasksResponse,
  TodolistUpdateResponse,
} from "../types/interfaces";
import { initialState } from "../state/constants";
import { firstTasks } from "../utils/constants";
import { todolistsApi } from "../api";

export const GetTodoList = () => {
  const [state, setState] = useState<
    TodolistApi[] | TodoListsStateData[] | null
  >(null);

  useEffect(() => {
    todolistsApi
      .get()
      .then((res) => {
        const { data } = res;

        setState(data);
      })
      .catch(() => setState(initialState));
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const CreateTodoList = () => {
  const [response, setResponse] = useState<TodolistCreationResponse | null>(
    null
  );
  const [error, setError] = useState("");
  const [todolistTitle, setTodolistTitle] = useState("");

  const handleCreateTodolist = () => {
    todolistsApi
      .create(todolistTitle)
      .then((res) => {
        const { data } = res;
        setResponse(data);
      })
      .catch(() => {
        setError("Failed to create todolist");
      });
  };

  const handleClearError = () => setError("");

  if (error) {
    return (
      <Stack>
        {error}
        <Button onClick={handleClearError}>Try once more</Button>
      </Stack>
    );
  }

  if (response) {
    return <div>{JSON.stringify(response)}</div>;
  }

  const handleChangeTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTodolistTitle(e.target.value);
  };

  return (
    <div>
      <TextField
        value={todolistTitle}
        label="Task title"
        onChange={handleChangeTaskTitle}
      />

      <Button
        onClick={handleCreateTodolist}
        disabled={todolistTitle.length === 0}
      >
        Create Todolist
      </Button>
    </div>
  );
};

export const UpdateTodoList = () => {
  const [response, setResponse] = useState<TodolistUpdateResponse | null>(null);
  const [error, setError] = useState("");
  const [todolistTitle, setTodolistTitle] = useState("");
  const [todolistId, setTodolistId] = useState("");

  const handleCreateTodolist = () => {
    todolistsApi
      .update(todolistId, todolistTitle)
      .then((res) => {
        const { data } = res;
        setResponse(data);
      })
      .catch(() => {
        setError("Failed to update todolist");
      });
  };

  const handleClearError = () => setError("");

  if (error) {
    return (
      <Stack>
        {error}
        <Button onClick={handleClearError}>Try once more</Button>
      </Stack>
    );
  }

  if (response) {
    return <div>{JSON.stringify(response)}</div>;
  }

  const handleChangeTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTodolistTitle(e.target.value);
  };

  const handleChangeListId = (e: ChangeEvent<HTMLInputElement>) => {
    setTodolistId(e.target.value);
  };

  const isDisabled = todolistId.length === 0 && todolistTitle.length === 0;

  return (
    <div>
      <TextField
        value={todolistTitle}
        label="New title"
        onChange={handleChangeTaskTitle}
      />

      <TextField
        value={todolistId}
        label="Todolsit id"
        onChange={handleChangeListId}
      />

      <Button onClick={handleCreateTodolist} disabled={isDisabled}>
        Update Todolist
      </Button>
    </div>
  );
};

export const DeleteTodoList = () => {
  const [response, setResponse] = useState<TodolistDeletionResponse | null>(
    null
  );

  const [error, setError] = useState("");
  const [todolistId, setTodolistId] = useState("");

  const handleDeleteTodolist = () => {
    todolistsApi
      .delete(todolistId)
      .then((res) => {
        const { data } = res;
        setResponse(data);
      })
      .catch(() => setError("Failed to delete todolist"));
  };

  const handleClearError = () => setError("");

  if (error) {
    return (
      <Stack>
        {error}
        <Button onClick={handleClearError}>Try once more</Button>
      </Stack>
    );
  }

  if (response) {
    return <div>{JSON.stringify(response)}</div>;
  }

  const handleChangeListId = (e: ChangeEvent<HTMLInputElement>) => {
    setTodolistId(e.target.value);
  };

  return (
    <div>
      <TextField
        value={todolistId}
        label="Id of todolist that require to be deleted"
        onChange={handleChangeListId}
      />
      <Button onClick={handleDeleteTodolist} disabled={todolistId.length === 0}>
        Delete Todolist
      </Button>
    </div>
  );
};

export const GetTasks = () => {
  const [state, setState] = useState<
    TodolistsTasksResponse | TaskData[] | null
  >(null);

  useEffect(() => {
    const todoListId = "someKindOfTodoListTestId";
    todolistsApi
      .getTasks(todoListId)
      .then((res) => {
        const { data } = res;
        setState(data);
      })
      .catch(() => setState(firstTasks));
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const DeleteTask = () => {
  const [response, setResponse] = useState<TodolistsTasksResponse | null>(null);
  const [error, setError] = useState("");
  const [todolistId, setTodolistId] = useState("");
  const [taskId, setTaskId] = useState("");

  const handleDeleteTask = () => {
    todolistsApi
      .deleteTask(todolistId, taskId)
      .then((res) => {
        const { data } = res;
        setResponse(data);
      })
      .catch(() => setError("Failed to delete task"));
  };

  const handleClearError = () => setError("");

  if (error) {
    return (
      <Stack>
        {error}
        <Button onClick={handleClearError}>Try once more</Button>
      </Stack>
    );
  }

  if (response) {
    return <div>{JSON.stringify(response)}</div>;
  }

  const handleChangeListId = (e: ChangeEvent<HTMLInputElement>) => {
    setTodolistId(e.target.value);
  };

  const handleChangeTaskId = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskId(e.target.value);
  };

  const isDisabled = todolistId.length === 0 && taskId.length === 0;

  return (
    <div>
      <TextField
        value={todolistId}
        label="Id of todolist from task should be deleted"
        onChange={handleChangeListId}
      />

      <TextField
        value={taskId}
        label="Id of task that require to be deleted"
        onChange={handleChangeTaskId}
      />

      <Button onClick={handleDeleteTask} disabled={isDisabled}>
        Delete Task
      </Button>
    </div>
  );
};

export const CreateTask = () => {
  const [response, setResponse] = useState<TodolistsTasksResponse | null>(null);
  const [error, setError] = useState("");
  const [todolistId, setTodolistId] = useState("");
  const [taskTitle, setTaskTitle] = useState("");

  const handleCreateNewTask = () => {
    todolistsApi
      .createTask(todolistId, taskTitle)
      .then((res) => {
        const { data } = res;

        setResponse(data);
      })
      .catch(() => setError("Failed to create task"));
  };

  const handleClearError = () => setError("");

  if (error) {
    return (
      <Stack>
        {error}
        <Button onClick={handleClearError}>Try once more</Button>
      </Stack>
    );
  }

  if (response) {
    return <div>{JSON.stringify(response)}</div>;
  }

  const handleChangeListId = (e: ChangeEvent<HTMLInputElement>) => {
    setTodolistId(e.target.value);
  };

  const handleChangeTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.target.value);
  };

  const isDisabled = todolistId.length === 0 && taskTitle.length === 0;

  return (
    <div>
      <TextField
        value={todolistId}
        label="Id of todolist where task should be created"
        onChange={handleChangeListId}
      />

      <TextField
        value={taskTitle}
        label="Title of new task"
        onChange={handleChangeTaskTitle}
      />

      <Button onClick={handleCreateNewTask} disabled={isDisabled}>
        Create Task
      </Button>
    </div>
  );
};

export const UpdateTask = () => {
  const [response, setResponse] = useState<TodolistsTasksResponse | null>(null);
  const [error, setError] = useState("");
  const [todolistId, setTodolistId] = useState("");
  const [taskId, setTaskId] = useState("");
  const [taskTitle, setTaskTitle] = useState("");

  const handleUpdateTask = () => {
    todolistsApi
      .updateTask(todolistId, taskId, taskTitle)
      .then((res) => {
        const { data } = res;

        setResponse(data);
      })
      .catch(() => setError("Failed to update task"));
  };

  const handleClearError = () => setError("");

  if (error) {
    return (
      <Stack>
        {error}
        <Button onClick={handleClearError}>Try once more</Button>
      </Stack>
    );
  }

  if (response) {
    return <div>{JSON.stringify(response)}</div>;
  }

  const handleChangeListId = (e: ChangeEvent<HTMLInputElement>) => {
    setTodolistId(e.target.value);
  };

  const handleChangeTaskId = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskId(e.target.value);
  };

  const handleChangeTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.target.value);
  };

  const isDisabled =
    todolistId.length === 0 && taskTitle.length === 0 && taskId.length === 0;

  return (
    <div>
      <TextField
        value={todolistId}
        label="Todolist id where task title should be changed"
        onChange={handleChangeListId}
      />

      <TextField
        value={taskId}
        label="Task id which title should be changed"
        onChange={handleChangeTaskId}
      />

      <TextField
        value={taskTitle}
        label="New title for task"
        onChange={handleChangeTaskTitle}
      />

      <Button onClick={handleUpdateTask} disabled={isDisabled}>
        Update task
      </Button>
    </div>
  );
};
