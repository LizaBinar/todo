import './app.css';
import { Component } from 'react';

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

class App extends Component {
  idCounter = 0;

  maxInput = 20;

  constructor(props) {
    super(props);
    this.state = {
      todoData: [this.createTask('Drink Coffee'), this.createTask('Eat Meat'), this.createTask('Buy E-ON energy')],
      filter: 'all', // all active completed
    };
  }

  createTask = (label) => {
    this.idCounter += 1;

    return {
      label,
      completed: false,
      id: this.idCounter,
      dateCreated: new Date(),
      edit: false,
    };
  };

  addTask = (label) => {
    const task = this.createTask(label);
    this.setState((state) => ({
      todoData: [...state.todoData, task],
    }));
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
      task.edit = false;
      return {
        todoData: [...todoData.slice(0, idx), task, ...todoData.slice(idx + 1)],
      };
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
