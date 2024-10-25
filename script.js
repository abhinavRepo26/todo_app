// To-do list object to hold all items
const todoList = JSON.parse(localStorage.getItem("todoList")) || {};
let currentEditId = null; // Tracks the ID being edited or null if creating a new task

const todoValue = document.getElementById("input-box");
const todoAlert = document.getElementById("Alert");
const listItems = document.getElementById("list-items");
const addUpdate = document.getElementById("AddUpdateClick");

function render() {
  listItems.innerHTML = "";
  Object.keys(todoList).forEach((id) => {
    let item = todoList[id];
    const {completed,task} = item;
    const li = document.createElement("li");
    li.className = "inner-item";
    li.innerHTML = ` 
      <span ondblclick="CompleteTask('${id}')" style="${completed ? 'text-decoration: line-through;' : ''};cursor:pointer" >${task} </span>
      <span style="width: 60px; justify-content: space-between; display: flex;">
        <i class="fa-solid fa-pencil" style="font-size: 20px; cursor: pointer; ${completed ? 'visibility:hidden':''}" onclick="EditTask('${id}')"></i>
        <i class="fa-solid fa-trash-can" style="font-size: 20px; cursor: pointer;" onclick="DeleteToDoTask('${id}')"></i>
      </span>`;
    listItems.appendChild(li);
  });
}

// Add or Update a to-do item
function CreateOrUpdateTask() {
  const newTask = todoValue.value.trim();

  if (newTask === "") {
    todoAlert.innerText = "Please enter your todo text!";
    todoValue.focus();
  } else {
    if (currentEditId) {
      // Update existing task
      todoList[currentEditId] = {task:newTask,completed:false} ;
      todoAlert.innerText = "Todo item updated successfully!";
    } else {
      // Create new task
      const id = Date.now().toString();
      todoList[id] = {task:newTask,completed:false} ;
      todoAlert.innerText = "Todo item created successfully!";
    }

    // Clear input and reset state
    todoValue.value = "";
    currentEditId = null;
    addUpdate.innerText = "Add"; // Reset button text to 'Add'

    // Update localStorage and render
    localStorage.setItem("todoList", JSON.stringify(todoList));
    render();
  }
}

// Delete a to-do item
function DeleteToDoTask(id) {
  try {
    delete todoList[id];
    localStorage.setItem("todoList", JSON.stringify(todoList));
    render();
  } catch (e) {
    console.error(e);
  }
}

// Edit a to-do item
function EditTask(id) {
  currentEditId = id;
  todoValue.value = todoList[id].task;
  addUpdate.innerText = "Update"; // Change button text to 'Update'
}


//Complete task
function  CompleteTask(id){
    todoList[id].completed = !todoList[id].completed; 
    localStorage.setItem("todoList", JSON.stringify(todoList));
    render();
}

// Initial render
render();
