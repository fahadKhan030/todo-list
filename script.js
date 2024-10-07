let todoTextInput = document.querySelector("#todoText");
const addBtnEl = document.querySelector("#addTaskButton");
let tasksListEl = document.getElementById("task-container");
const completedButton = document.getElementById("completedButton");
const progressButton = document.getElementById("progressButton");

let inProgressTasks = [];
let completedTasks = [];
let currentView = "progress";

function renderTasks() {
  tasksListEl.innerHTML = "";

  if (currentView === "progress" && inProgressTasks.length > 0) {
    let progressTask = document.createElement("div");
    progressTask.className = "progressTask";
    let h3 = document.createElement("h3");
    h3.innerHTML = "Progress Task";
    progressTask.appendChild(h3);

    inProgressTasks.forEach((task) => {
      let li = document.createElement("li");
      li.innerHTML = `
        <p>${task}</p>
        <span><img src="./images/close.png" class="close" /></span>
      `;
      progressTask.appendChild(li);
    });

    tasksListEl.appendChild(progressTask);
  }

  if (currentView === "completed" && completedTasks.length > 0) {
    let completedTask = document.createElement("div");
    completedTask.className = "completedTask";
    let h3 = document.createElement("h3");
    h3.innerHTML = "Completed Task";
    completedTask.appendChild(h3);

    completedTasks.forEach((task) => {
      let li = document.createElement("li");
      li.innerHTML = `<p>${task}</p>`;
      completedTask.appendChild(li);
    });

    tasksListEl.appendChild(completedTask);
  }
}

function addTask() {
  if (todoTextInput?.value == "") {
    alert("You must write something!");
  } else {
    inProgressTasks.push(todoTextInput.value);
    todoTextInput.value = "";
    renderTasks();
    saveData();
  }
}

function toggleTask(task) {
  let taskIndex = inProgressTasks.indexOf(task);
  if (taskIndex > -1) {
    inProgressTasks.splice(taskIndex, 1);
    completedTasks.push(task);
  } else {
    taskIndex = completedTasks.indexOf(task);
    completedTasks.splice(taskIndex, 1);
    inProgressTasks.push(task);
  }
  renderTasks();
  saveData();
}

function removeTask(task) {
  let taskIndex = inProgressTasks.indexOf(task);
  if (taskIndex > -1) {
    inProgressTasks.splice(taskIndex, 1);
  } else {
    taskIndex = completedTasks.indexOf(task);
    completedTasks.splice(taskIndex, 1);
  }
  renderTasks();
  saveData();
}

todoTextInput.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

addBtnEl.addEventListener("click", () => {
  addTask();
});

tasksListEl.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      let taskText = e.target.querySelector("p").textContent;
      toggleTask(taskText);
    } else if (e.target.tagName === "IMG") {
      let taskText =
        e.target.parentElement.parentElement.querySelector("p").textContent;
      removeTask(taskText);
    }
  },
  false
);

completedButton.addEventListener("click", () => {
  currentView = "completed";
  renderTasks();
});

progressButton.addEventListener("click", () => {
  currentView = "progress";
  renderTasks();
});

function saveData() {
  localStorage.setItem("inProgressTasks", JSON.stringify(inProgressTasks));
  localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
}

function loadData() {
  inProgressTasks = JSON.parse(localStorage.getItem("inProgressTasks")) || [];
  completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];
  renderTasks();
}

loadData();
