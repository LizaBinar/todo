import './app.css';
import { useEffect, useReducer, useState } from 'react';

import Footer from '../footer/footer';
import AppHeader from '../app-header/app-header';
import NewTaskForm from '../new-task-form/new-task-form';
import TaskList from '../task-list/task-list';

import { changeTodoData, createTask } from './todo-data-services';

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
    const idx = todoData.findIndex((todo) => todo.id === id);
    const task = todoData[idx];
    setTodoData({ type: 'onStart', task });
  };

  const stop = (id) => {
    setTodoData({ type: 'stop', id });
  };

  const onCompleted = (id) => {
    setTodoData({ type: 'complet', id });
  };

  const onFilterChanged = (name) => {
    setFilter(name);
  };

  const deleteTask = (id) => {
    setTodoData({ type: 'del', id });
  };

  //
  const editeTask = (id, label) => {
    setTodoData({ type: 'makeEdit', id, label });
  };

  const cancelEditing = () => {
    setTodoData({ type: 'notEdit' });
  };

  const deleteCompletedTask = () => {
    todoData.forEach((task) => {
      if (task.completed) {
        deleteTask(task.id);
      }
    });
  };

  const onEditTask = (id) => {
    setTodoData({ type: 'edit', id });
  };

  const addTask = (label, min, sec) => {
    const timeBase = getMilisec(sec, min);
    const task = createTask(label, timeBase);
    setTodoData({ type: 'add', task });
  };

  useEffect(() => {
    document.addEventListener('keydown', ({ key }) => {
      if (key === 'Escape') {
        cancelEditing();
      }
    });
  }, []);

  const visibleTasks = filterTasks(todoData, filter);
  // Например, АппХедер можно было не выносить в компонент.
  // Согласен!
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
