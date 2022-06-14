const addItemBtns = document.getElementsByClassName('add-item-btn');
const saveItemBtns = document.getElementsByClassName('save-item-btn');
const columns = document.getElementsByClassName('column');
const backlogTaskContainer = document.querySelector('#backlog .task-container');
const inprogressTaskContainer = document.querySelector('#inprogress .task-container');
const testingTaskContainer = document.querySelector('#testing .task-container');
const doneTaskContainer = document.querySelector('#done .task-container');

let backlogTasks = [
  'As a user, I am able to search for documents so I can find them more easily ', 
  'As a site visitor, I can compare different type of accounts to see which one suits me best'
];
let inprogressTasks = ['Work on projects', 'Write codes'];
let testingTasks = ['Complete automatic testing'];
let doneTasks = ['Release fix', 'Find existing code', 'Design the webpage'];

/**
 * Generate task elements from the task array and put into the
 * corresponding category of task container
 */
function updateTasks() {
  putTasksInContainer(backlogTaskContainer, backlogTasks);
  putTasksInContainer(inprogressTaskContainer, inprogressTasks);
  putTasksInContainer(testingTaskContainer, testingTasks);
  putTasksInContainer(doneTaskContainer, doneTasks);
}

function generateTask(str) {
  let task = document.createElement('div');
  task.className = 'task';
  task.draggable = 'true';
  task.innerHTML = str;
  task.addEventListener('dragstart', drag);
  return task;
}

function putTasksInContainer(container, tasks) {
  let taskElements = tasks.map(t => generateTask(t));
  taskElements.forEach(te => container.append(te));
}

updateTasks();

/**
 * Implement add new task item functionality
 */
function addItem() {
  let saveBtn = this.nextElementSibling;
  let textarea = this.parentElement.nextElementSibling;

  this.style.visibility = 'hidden';
  saveBtn.style.visibility = 'visible';
  textarea.style.display = 'block';
}

function saveItem() {
  let addBtn = this.previousElementSibling;
  let textarea = this.parentElement.nextElementSibling;
  let taskContainer = this.parentElement.parentElement.previousElementSibling;

  if (textarea.value.length) {
    let task = generateTask(textarea.value);
    taskContainer.append(task);
    textarea.value = '';
  }
  
  this.style.visibility = 'hidden';
  addBtn.style.visibility = 'visible';
  textarea.style.display = 'none';
}

[...addItemBtns].forEach(btn => btn.addEventListener('click', addItem));
[...saveItemBtns].forEach(btn => btn.addEventListener('click', saveItem));

/**
 * Implement Drag and Drop functionality
 */
function drag(e) {
  e.target.id = 'drag-item';
  e.dataTransfer.setData('task', e.target.id);
  console.log('run');
}

function drop(e) {
  e.preventDefault();
  let task = e.dataTransfer.getData('task');
  let taskElement = document.getElementById(task);
  this.children[1].append(taskElement);
  taskElement.removeAttribute('id');
}

function allowDrop(e) {
  e.preventDefault();
  console.log('run');
}

[...columns].forEach(c => {
  c.addEventListener('dragover', allowDrop);
  c.addEventListener('drop', drop);
});
