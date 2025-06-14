const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const alertPlaceholder = document.getElementById("alertPlaceholder");

// alert show
let showAlert = (message, type = "success") => {
  const alertDiv = document.createElement("div");
  alertDiv.innerHTML = `
          <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>`;
  alertPlaceholder.append(alertDiv);
  setTimeout(() => alertDiv.remove(), 3000);
};

// counting tasks number & update
let updateCount = () => {
  taskCount.textContent = taskList.children.length;
};

// save tasks in local storage
let saveTasks = () => {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach((li) => {
    tasks.push({
      text: li.querySelector("span").textContent,
      completed: li.classList.contains("completed"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// load tasks from local storage
let loadTasks = () => {
  const taskSaved = localStorage.getItem("tasks");
  if (taskSaved) {
    JSON.parse(taskSaved).forEach((task) => {
      addTask(task.text, task.completed);
    });
  }
};

// add task with delete & toggle line-through
let addTask = (text = null, completed = false) => {
  const taskText = text || taskInput.value.trim();
  if (taskText === "") {
    showAlert("Task cannot be empty!", "danger");
    return;
  }

  // creating element for task
  const li = document.createElement("li");
  li.className =
    "list-group-item d-flex justify-content-between align-items-center my-1 text-dark";
  if (completed) li.classList.add("completed");

  const span = document.createElement("span");
  span.textContent = taskText;
  span.style.cursor = "pointer";
  span.onclick = () => {
    li.classList.toggle("completed");
    saveTasks();
  };

  // delete task with update, save & alert
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "btn btn-sm btn-danger";
  deleteBtn.textContent = "Delete";
  deleteBtn.onclick = () => {
    li.remove();
    updateCount();
    saveTasks();
    showAlert("Task deleted.", "warning");
  };

  //appen elements
  li.appendChild(span);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);

  // creating empty input after added task
  if (!text) {
    taskInput.value = "";
    showAlert("Task added successfully.");
  }

  updateCount();
  saveTasks();
};

// Load tasks from localStorage on page load
window.onload = loadTasks;
