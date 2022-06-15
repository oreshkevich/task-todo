const addMessage = document.querySelector('.message');
const addButton = document.querySelector('.add');
const todo = document.querySelector('.todo');

let todoList = [];
if (localStorage.getItem('todo')) {
  todoList = JSON.parse(localStorage.getItem('todo'));
  displayMessages();
}

addButton.addEventListener('click', function () {
  if (!addMessage.value) return;
  let newTodo = {
    todo: addMessage.value,
    checked: false,
    important: false,
  };
  todoList.push(newTodo);
  displayMessages();
  localStorage.setItem('todo', JSON.stringify(todoList));
  addMessage.value = '';
});

function displayMessages() {
  let displayMessages = '';
  if (todoList.length === 0) todo.innerHTML = '';
  todoList.forEach(function (item, i) {
    displayMessages += `
  <li id='li-${i}'>
    <input type='checkbox' id='item-${i}' ${item.checked ? 'checked' : ''}>
    <label for = 'item-${i}' class="${item.important ? 'important' : ''}">${
      item.todo
    }</label>
    <button class="button-del" id='it-${i}' data-parent="${
      item.todo
    }">Del</button>
  </li>
  `;
    todo.innerHTML = displayMessages;
  });
}

todo.addEventListener('change', function (event) {
  let idInput = event.target.getAttribute('id');
  let forLabel = todo.querySelector('[for=' + idInput + ']');
  let valueLabel = forLabel.innerHTML;

  todoList.forEach(function (item) {
    if (item.todo === valueLabel) {
      item.checked = !item.checked;
      localStorage.setItem('todo', JSON.stringify(todoList));
    }
  });
});

todo.addEventListener('contextmenu', function (event) {
  event.preventDefault();
  todoList.forEach(function (item) {
    if (item.todo === event.target.innerHTML) {
      item.important = !item.important;
      displayMessages();
      localStorage.setItem('todo', JSON.stringify(todoList));
    }
  });
});

todo.addEventListener('click', function (event) {
  todoList.forEach(function (item, i) {
    if (item.todo === event.target.dataset.parent) {
      todoList.splice(i, 1);
      displayMessages();
    }
    localStorage.setItem('todo', JSON.stringify(todoList));
  });
});
