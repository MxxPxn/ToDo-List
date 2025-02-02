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

    const newTask = {
        text: task,
        completed: false
    };

    addTaskToDOM(newTask);
    userInput.value = '';
    updateLocalStorage();
}

function addTaskToDOM(taskObj) {
    // Create list item
    const listItem = document.createElement('li');
    listItem.className = 'task-item';

    // Create a container for the left side (both checkbox and task text)
    const leftContainer = document.createElement('div');
    leftContainer.className = 'left-container';
    
    // Create separate container for checkbox
    const checkboxContainer = document.createElement('div');
    checkboxContainer.className = 'checkbox-container';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    checkbox.checked = taskObj.completed;

    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            taskText.classList.add('completed');
        } else {
            taskText.classList.remove('completed');
        }
        updateLocalStorage();
    });

    checkboxContainer.appendChild(checkbox);

    // Create separate container for task text
    const taskTextContainer = document.createElement('div');
    taskTextContainer.className = 'task-text-container';

    const taskText = document.createElement('span');
    taskText.textContent = taskObj.text;
    taskText.className = 'task-text';

    if (taskObj.completed) {
        taskText.classList.add('completed');
    }

    // Allow inline editing by making the text editable on click
    taskText.addEventListener('click', () => {
        taskText.contentEditable = 'true';
        taskText.focus();
    });

    taskText.addEventListener('blur', () => {
        taskText.contentEditable = 'false';
        updateLocalStorage();
    });

    taskText.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            taskText.blur();
        }
    });

    taskTextContainer.appendChild(taskText);

    // Append the two separate containers into the left container
    leftContainer.appendChild(checkboxContainer);
    leftContainer.appendChild(taskTextContainer);

    // Create buttons container for Edit and Delete buttons
    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'buttons-container';

    // Edit button (if needed; clicking can focus the task text for editing)
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

    // Append the left container and buttons container to the list item
    listItem.appendChild(leftContainer);
    listItem.appendChild(buttonsContainer);

    // Append the list item to your task list container
    taskList.appendChild(listItem);
}


function updateLocalStorage() {
    const tasks = [];
    // Loop through each task in the DOM and save its text
    document.querySelectorAll('.task-item').forEach(listItem => {
        const taskTextEl = listItem.querySelector('.task-text');
        const checkboxEl = listItem.querySelector('.task-checkbox');
        tasks.push({
            text: taskTextEl.textContent,
            completed: checkboxEl.checked
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(taskObj => {
        addTaskToDOM(taskObj);
    });
}
 document.addEventListener('DOMContentLoaded', loadTasks);