'use strict';

const userInput = document.getElementById('todoText');
const imgButton = document.getElementById('addTask');
const taskList = document.getElementById('task-list');

// Event listener for the add button
imgButton.addEventListener('click', handleClick);

// Event listener for pressing Enter in the input
userInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        handleClick();
    }
});

// Load tasks from localStorage on page load
document.addEventListener('DOMContentLoaded', loadTasks);

function handleClick() {
    const task = userInput.value.trim();

    if (task === '') {
        alert('Please enter a task');
        return;
    }

    addTaskToDOM(task);
    userInput.value = '';

    updateLocalStorage();
}

function addTaskToDOM(task) {
    // Create list item
    const listItem = document.createElement('li');
    listItem.className = 'task-item';

    // Create left container for checkbox and task text
    const leftContainer = document.createElement('div');
    leftContainer.className = 'left-container';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';

    // Create task text
    const taskText = document.createElement('span');
    taskText.textContent = task;
    taskText.className = 'task-text';

    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            taskText.classList.add('completed');
        } else {
            taskText.classList.remove('completed');
        }
        updateLocalStorage();
    });

    leftContainer.appendChild(checkbox);
    leftContainer.appendChild(taskText);

    // Create buttons container for Edit and Delete buttons
    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'buttons-container';

    // Edit button
    const editButton = document.createElement('button');
    editButton.className = 'edit-btn';
    editButton.innerHTML = `<img src="images/edit.svg" alt="edit" class="edit-icon"/>`;
    editButton.addEventListener('click', () => {
        taskText.contentEditable = 'true';
        taskText.focus();
    });

    // Delete button
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-btn';
    deleteButton.innerHTML = `<img src="images/delete.svg" alt="delete" class="delete-icon"/>`;
    deleteButton.addEventListener('click', () => {
        taskList.removeChild(listItem);
        updateLocalStorage();
    });

    buttonsContainer.appendChild(editButton);
    buttonsContainer.appendChild(deleteButton);

    listItem.appendChild(leftContainer);
    listItem.appendChild(buttonsContainer);
    taskList.appendChild(listItem);
}

function updateLocalStorage() {
    const tasks = [];
    // Loop through each task in the DOM and save its text
    document.querySelectorAll('.task-text').forEach(taskTextEl => {
        tasks.push(taskTextEl.textContent);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTaskToDOM(task);
    });
}
