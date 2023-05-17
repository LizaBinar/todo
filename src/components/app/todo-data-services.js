import { nanoid } from 'nanoid';

export const createTask = (label, timeBase) => {
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

function del(todoData, id) {
  const idx = todoData.findIndex((todo) => todo.id === id);
  return [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
}

function complet(todoData, id) {
  const idx = todoData.findIndex((todo) => todo.id === id);
  const newTask = { ...todoData[idx], completed: !todoData[idx].completed };
  return [...todoData.slice(0, idx), newTask, ...todoData.slice(idx + 1)];
}

const changeStatus = (todoData, id, status, value) => {
  const idx = todoData.findIndex((todo) => todo.id === id);
  const newTask = { ...todoData[idx] };
  newTask[status] = value;
  return [...todoData.slice(0, idx), newTask, ...todoData.slice(idx + 1)];
};

const makeEdit = (todoData, id, label) => {
  const idx = todoData.findIndex((todo) => todo.id === id);
  const task = todoData[idx];
  task.label = label;
  task.edit = false;
  return [...todoData.slice(0, idx), task, ...todoData.slice(idx + 1)];
};

const notEdit = (todoData) => {
  const tasks = [];
  todoData.forEach((task) => {
    task.edit = false;
    tasks.push(task);
  });
  return tasks;
};

const start = (todoData, task) => {
  const newIdx = todoData.findIndex((todo) => todo.id === task.id);
  if (todoData[newIdx]) {
    todoData[newIdx] = task;
  } else {
    clearInterval(task.mainTimer);
  }
  return todoData;
};

const stop = (todoData, id) => {
  const idx = todoData.findIndex((todo) => todo.id === id);
  const task = todoData[idx];
  if (task.start) {
    task.start = false;
    clearInterval(task.mainTimer);
  }
  return todoData;
};

export const changeTodoData = (todoData, obj) => {
  const { type, task, id, label } = obj;
  todoData = [...todoData];
  switch (type) {
    case 'add':
      return [...todoData, task];
    case 'del':
      return del(todoData, id);
    case 'complet':
      return complet(todoData, id);
    case 'edit':
      return changeStatus(todoData, id, type, true);
    case 'makeEdit':
      return makeEdit(todoData, id, label);
    case 'notEdit':
      return notEdit(todoData);
    case 'start':
      return start(todoData, task);
    case 'stop':
      return stop(todoData, id);
    case 'onStart':
      const newIdx = todoData.findIndex((todo) => todo.id === task.id);
      if (!todoData[newIdx].start) {
        todoData[newIdx].start = true;
        todoData[newIdx].mainTimer = setInterval(() => {
          if (todoData[newIdx].timeBase <= 0) {
            clearInterval(todoData[newIdx].mainTimer);
          }
          todoData[newIdx].timeBase -= 1000; // Уменьшаем таймер
          return start(todoData, { func: 'start', task: todoData[newIdx] });
        }, 1000);
      }
      return todoData;
    default:
      return todoData;
  }
};
