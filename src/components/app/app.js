import './app.css';
import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

import AppHeader from '../app-header';
import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../footer/footer';

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
  const [todoData, setTodoData] = useState([createTask('0', 10000), createTask('1', 10000), createTask('2', 10000)]);
  const [filter, setFilter] = useState('all'); // all active completed

  const start = (id) => {
    setTodoData((todoData) => {
      const idx = todoData.findIndex((todo) => todo.id === id);
      const task = todoData[idx];
      if (!task.start) {
        task.start = true;
        task.mainTimer = setInterval(() => {
          if (task.timeBase <= 0) {
            clearInterval(task.mainTimer);
          }
          task.timeBase -= 1000; // Уменьшаем таймер
          todoData[id] = task;
          return todoData;
        }, 1000);
      }
      return todoData;
    });
  };

  const stop = (id) => {
    setTodoData((todoData) => {
      const idx = todoData.findIndex((todo) => todo.id === id);
      const task = todoData[idx];
      if (task.start) {
        task.start = false;
        clearInterval(task.mainTimer);
      }
      return todoData;
    });
  };

  const changeStatus = (id, status, value) => {
    setTodoData((todoData) => {
      const idx = todoData.findIndex((todo) => todo.id === id);
      const newTask = { ...todoData[idx] };
      newTask[status] = value;
      return [...todoData.slice(0, idx), newTask, ...todoData.slice(idx + 1)];
    });
  };

  const onCompleted = (id) => {
    setTodoData((todoData) => {
      const idx = todoData.findIndex((todo) => todo.id === id);
      const newTask = { ...todoData[idx], completed: !todoData[idx].completed };
      return [...todoData.slice(0, idx), newTask, ...todoData.slice(idx + 1)];
    });
  };

  const onFilterChanged = (name) => {
    setFilter(name);
  };

  const deleteTask = (id) => {
    setTodoData((todoData) => {
      const idx = todoData.findIndex((todo) => todo.id === id);
      return [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
    });
  };

  //
  const editeTask = (id, label) => {
    setTodoData((todoData) => {
      const idx = todoData.findIndex((todo) => todo.id === id);
      const task = todoData[idx];
      task.label = label;
      task.edit = false;
      return [...todoData.slice(0, idx), task, ...todoData.slice(idx + 1)];
    });
  };

  const cancelEditing = () => {
    setTodoData((todoData) => {
      const tasks = [...todoData];
      tasks.forEach((task) => {
        task.edit = false;
        return task;
      });
      return tasks;
    });
  };

  const deleteCompletedTask = () => {
    const tasks = [...todoData];
    tasks.forEach((task) => {
      if (task.completed) {
        deleteTask(task.id);
      }
    });
  };

  const onEditTask = (id) => {
    changeStatus(id, 'edit', true);
    // setTodoData((todoData) => {
    //   const idx = todoData.findIndex((todo) => todo.id === id);
    //   const newTask = { ...todoData[idx], edit: !todoData[idx].completed };
    //   return [...todoData.slice(0, idx), newTask, ...todoData.slice(idx + 1)];
    // });
  };

  const addTask = (label, min, sec) => {
    setTodoData((todoData) => {
      const timeBase = getMilisec(sec, min);
      const task = createTask(label, timeBase);
      return [...todoData, task];
    });
  };

  useEffect(() => {
    document.addEventListener('keydown', ({ key }) => {
      console.log(key);
      if (key === 'Escape') {
        cancelEditing();
      }
    });
    // document.addEventListener('mousedown', ({ target }) => {
    //   if (!target.classList.contains('edit-element')) {
    //     cancelEditing();
    //   }
    // });
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
