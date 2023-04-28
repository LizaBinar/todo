import './app.css';
import { Component } from 'react';
import { nanoid } from 'nanoid';

import AppHeader from '../app-header';
import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../footer/footer';

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

class App extends Component {
  maxInput = 20;

  constructor(props) {
    super(props);
    this.state = {
      todoData: [createTask('0', 10000), createTask('1', 10000), createTask('2', 10000)],
      filter: 'all', // all active completed
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', ({ key }) => {
      if (key === 'Escape') {
        this.cancelEditing();
      }
    });
    document.addEventListener('mousedown', ({ target }) => {
      if (!target.classList.contains('edit-element')) {
        this.cancelEditing();
      }
    });
  }

  start = (id) => {
    const { todoData } = this.state;
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
      }, 1000);
    }
  };

  stop = (id) => {
    const { todoData } = this.state;
    const idx = todoData.findIndex((todo) => todo.id === id);
    const task = todoData[idx];
    if (task.start) {
      task.start = false;
      clearInterval(task.mainTimer);
    }
  };

  onCompleted = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((todo) => todo.id === id);
      const newTask = { ...todoData[idx], completed: !todoData[idx].completed };
      return {
        todoData: [...todoData.slice(0, idx), newTask, ...todoData.slice(idx + 1)],
      };
    });
  };

  onFilterChanged = (name) => {
    this.setState({
      filter: name,
    });
  };

  deleteTask = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((todo) => todo.id === id);
      return {
        todoData: [...todoData.slice(0, idx), ...todoData.slice(idx + 1)],
      };
    });
  };

  editeTask = (id, label) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((todo) => todo.id === id);
      const task = todoData[idx];
      task.label = label;
      task.time = Date.now() + task.timeBase;
      task.edit = false;
      return {
        todoData: [...todoData.slice(0, idx), task, ...todoData.slice(idx + 1)],
      };
    });
  };

  cancelEditing = () => {
    this.setState(({ todoData }) => {
      todoData.map((task) => {
        task.edit = false;
        return task;
      });
      return { todoData };
    });
  };

  deleteCompletedTask = () => {
    const { todoData } = this.state;
    todoData.forEach((task) => {
      if (task.completed) {
        this.deleteTask(task.id);
      }
    });
  };

  onEditTask = (id) => {
    const { todoData } = this.state;
    const idx = todoData.findIndex((todo) => todo.id === id);
    todoData[idx].edit = true;
    this.setState({
      todoData,
    });
  };

  addTask = (label, min, sec) => {
    const timeBase = getMilisec(sec, min);
    const task = createTask(label, timeBase);
    this.setState((state) => ({
      todoData: [...state.todoData, task],
    }));
  };

  render() {
    const { todoData, filter } = this.state;
    const visibleTasks = filterTasks(todoData, filter);
    return (
      <section className="base-style">
        <AppHeader />
        <div className="todoapp">
          <NewTaskForm addTask={this.addTask} maxInput={this.maxInput} />
          <section className="main">
            <TaskList
              todoData={visibleTasks}
              onDeleted={this.deleteTask}
              onEditTask={this.onEditTask}
              editeTask={this.editeTask}
              onCompleted={this.onCompleted}
              maxInput={this.maxInput}
              onStart={this.start}
              onStop={this.stop}
            />
            <Footer
              todoData={todoData}
              filter={filter}
              onFilterChanged={this.onFilterChanged}
              deleteCompletedTask={this.deleteCompletedTask}
            />
          </section>
        </div>
      </section>
    );
  }
}

export default App;
