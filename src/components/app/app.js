import './app.css';
import { useEffect, useReducer, useState } from 'react';
import { nanoid } from 'nanoid';

import AppHeader from '../app-header';
import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../footer/footer';

import changeTodoData from './my-timer-state';

const maxInput = 20;

const filterTasks = (tasks, filter) => {
  switch (filter) {
    case 'all':
      return tasks;
    case 'active':
      return tasks.filter((task) => !task.completed);
    case 'completed':
      return tasks.filter((task) => task.completed);
    default:
      return tasks;
  }
};

const createTask = (label, timeBase) => {
  const res = {
    label,
    timeBase,
    start: false,
    completed: false,
    id: nanoid(3),
    dateCreated: new Date(),
    edit: false,
  };
  return res;
};
const getMilisec = (sec = 0, min = 0) => {
  let res = sec * 1000;
  res += min * 60000;
  return res;
};

function App() {
  const [todoData, setTodoData] = useReducer(changeTodoData, [
    createTask('0', 10000),
    createTask('1', 10000),
    createTask('2', 10000),
  ]);
  const [filter, setFilter] = useState('all'); // all active completed

  const start = (id) => {
    const copy = [...todoData];
    const idx = copy.findIndex((todo) => todo.id === id);
    const task = copy[idx];
    if (!task.start) {
      task.start = true;
      task.mainTimer = setInterval(() => {
        if (task.timeBase <= 0) {
          clearInterval(task.mainTimer);
        }
        task.timeBase -= 1000; // Уменьшаем таймер
        setTodoData({ func: 'start', task });
      }, 1000);
    }
  };

  const stop = (id) => {
    setTodoData({ func: 'stop', id });
  };

  const onCompleted = (id) => {
    setTodoData({ func: 'complet', id });
  };

  const onFilterChanged = (name) => {
    setFilter(name);
  };

  const deleteTask = (id) => {
    setTodoData({ func: 'del', id });
  };

  //
  const editeTask = (id, label) => {
    setTodoData({ func: 'makeEdit', id, label });
  };

  const cancelEditing = () => {
    setTodoData({ func: 'notEdit' });
  };

  const deleteCompletedTask = () => {
    todoData.forEach((task) => {
      if (task.completed) {
        deleteTask(task.id);
      }
    });
  };

  const onEditTask = (id) => {
    setTodoData({ func: 'edit', id });
  };

  const addTask = (label, min, sec) => {
    const timeBase = getMilisec(sec, min);
    const task = createTask(label, timeBase);
    setTodoData({ func: 'add', task });
  };

  useEffect(() => {
    document.addEventListener('keydown', ({ key }) => {
      if (key === 'Escape') {
        cancelEditing();
      }
    });
  }, []);

  const visibleTasks = filterTasks(todoData, filter);
  return (
    <section className="base-style">
      <AppHeader />
      <div className="todoapp">
        <NewTaskForm addTask={addTask} maxInput={maxInput} />
        <section className="main">
          <TaskList
            todoData={visibleTasks}
            onDeleted={deleteTask}
            onEditTask={onEditTask}
            editeTask={editeTask}
            onCompleted={onCompleted}
            maxInput={maxInput}
            onStart={start}
            onStop={stop}
          />
          <Footer
            todoData={todoData}
            filter={filter}
            onFilterChanged={onFilterChanged}
            deleteCompletedTask={deleteCompletedTask}
          />
        </section>
      </div>
    </section>
  );
}

export default App;
