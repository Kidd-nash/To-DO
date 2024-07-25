window.addEventListener( 'load', function (event) {
  console.log('start');
    //declare variables from html
    var taskInput = document.getElementById("task_input");
    var setDate = document.getElementById("set_date");
    var inputButton = document.getElementById("input_button");
    var listContainer = document.getElementById("list_container");
    var debugTasks = document.getElementById('debug_tasks');
    //Display tasks
    class Task {
        constructor(name, date, isCompleted) {
            this.title = name;
            this.date = date;
            this.isCompleted = isCompleted;
        }
    }
    //Manages features in a task
    class TaskManager {
        constructor(listContainer) {
            this.listContainer = listContainer;
            this.currentEditId = null;
            //should add task? this.task=[]?
            this.taskObjects = [];
        }
        // for debug
        showMyTasks = () => {
            console.log(this.taskObjects);
        }
        addTaskToList = (index, task) => {
            let taskManager = this;
            let taskItem = document.createElement("li");
            taskItem.id = "task_item_" + index;
            taskItem.classList.add("task_item");
            // console.log(task);
            // taskItem.innerHTML = task.title;
            this.listContainer.appendChild(taskItem);
            //title/name
            let taskItemTitle = newElementCreation("span", task.title, "task_title_" + index, 
                ["task_title"], [{ attributeName: "type", attributeValue: ""}], taskItem
            );
            //isCompleted
            let isCompleted = newElementCreation("input", "", "check_box_" + index, ["check_box"], 
                [{ attributeName: "type", attributeValue: "checkbox" }], taskItem
            );
            //date
            let taskDate = newElementCreation("span", task.date, "task_date_" + index, ["task_date"],
                [{ attributeName: "type", attributeValue: ""}], taskItem
            );
            //edit button
            let editButton = newElementCreation("button", "EDIT", "edit_button_" + index, ["edit_button"],
                [{ attributeName: "type", attributeValue: "button"}], taskItem
            );
            //delete button
            let deleteButton = newElementCreation("button", "DELETE", "delete_button_" + index, ["delete_button"],
                [{ attributeName: "type", attributeValue: "button"}], taskItem
            );
            if (task.isCompleted) {
                isCompleted.checked = true;
                editButton.setAttribute("disabled", "disabled");
                deleteButton.setAttribute("disabled", "disabled");
            };
            //edit task
            editButton.onclick = function () {
                TaskManager.currentEditId = taskItemTitle.id;
                //div for pop up
                let divPopUp = newElementCreation("div", "", "edit_pop_up", ["edit_pop_up"], 
                    [{ attributeName: "type", attributeValue: ""}], listContainer
                );
                //exit button for pop up
                let exitButton = newElementCreation("button", "&times;", "exit_button", ["exit_button"],
                    [{ attributeName: "type", attributeValue: ""}], divPopUp
                );
                //input for pop up
                let inputPopUp = newElementCreation("input", "", "input_pop_up", ["input_pop_up"], 
                    [
                        { attributeName: "type", attributeValue: "text"}, 
                        { attributeName: "placeholder", attributeValue: "Edit your task here"}
                    ], divPopUp
                );
                //update button for pop up
                let updateButton = newElementCreation("button", "UPDATE", "update_button", ["update_button"],
                    [{ attributeName: "type", attributeValue: "button"}], divPopUp
                );
                updateButton.onclick = function() {
                    if (inputPopUp.value === "") {
                        let noValueInput = errorNotice("span", "No Value Input", "error_notice", 
                        ["error_notice", "error_notice_new"]);
                        inputPopUp.after(noValueInput);
                        return;
                    }
                    //saves the title to a new one
                    taskManager.taskObjects[index].title = inputPopUp.value;
                    document.getElementById(TaskManager.currentEditId).innerHTML = inputPopUp.value;
                    divPopUp.remove();                    
                };
                exitButton.onclick = function () {
                    divPopUp.remove();
                }
            };
            deleteButton.onclick = function () {
                let confirmPopUp = newElementCreation("div", "", "confirm_pop_up", ["confirm_pop_up"], 
                    [{ attributeName: "type", attributeValue: ""}], listContainer
                );
                let exitConfirmationButton = newElementCreation("button", "&times;", "exit_confirmation_button", 
                    ["exit_button"], [{ attributeName: "type", attributeValue: ""}], confirmPopUp
                );
                let confirmMessage = newElementCreation("span", "Are you sure you want to delete this task?", 
                    "confirm_message", ["confirm_message"], 
                    [{ attributeName: "type", attributeValue: ""}], confirmPopUp
                );
                let confirmButton = newElementCreation("button", "OK", "confirm_button", ["confirm_button"],
                    [{ attributeName: "type", attributeValue: "button"}], confirmPopUp
                );
                confirmButton.onclick = function () {

                    taskManager.taskObjects = taskManager.taskObjects.filter((item) => {
                        //console.log(`title ${item.title} compared to ${task.title}`);
                        return item.title != task.title;
                    });

                    taskItem.remove();
                    confirmPopUp.remove();
                };
                exitConfirmationButton.onclick = function () {
                    confirmPopUp.remove();
                }
            };
            isCompleted.onclick = function () {
                let confrimationMessage = (!taskManager.taskObjects[index].isCompleted)
                    ? 'Have you completed this task?'
                    : 'Do you want to uncheck this task?'
                ;
                let updatePopUp = newElementCreation("div", "", "status_pop_up", ["status_pop_up"], 
                    [{ attributeName: "type", attributeValue: ""}], listContainer
                );
                let confirmStatusMessage = newElementCreation("span", confrimationMessage, 
                    "confirm_message", ["confirm_message"], 
                    [{ attributeName: "type", attributeValue: ""}], updatePopUp
                );
                let yesButton = newElementCreation("button", "YES", "update_status_button", ["update_status_button"],
                    [{ attributeName: "type", attributeValue: "button"}], updatePopUp
                );
                let noButton = newElementCreation("button", "NO", "retain_button", ["retain_button"],
                    [{ attributeName: "type", attributeValue: "button"}], updatePopUp
                );
                noButton.addEventListener('click', function() {
                    isCompleted.checked = !isCompleted.checked;
                    updatePopUp.remove();
                    if (!isCompleted.checked) {
                        editButton.removeAttribute("disabled");
                        deleteButton.removeAttribute("disabled");
                    } else {
                        editButton.setAttribute("disabled", "disabled");
                        deleteButton.setAttribute("disabled", "disabled");
                    }
                });
                yesButton.addEventListener('click', function() {
                    taskItem.isCompleted = isCompleted.checked;
                    updatePopUp.remove();
                    if (!isCompleted.checked) {
                        editButton.removeAttribute("disabled");
                        deleteButton.removeAttribute("disabled");
                    } else {
                        editButton.setAttribute("disabled", "disabled");
                        deleteButton.setAttribute("disabled", "disabled");
                    }
                });
                taskManager.taskObjects[index].isCompleted = isCompleted.checked;
            };
        };
    }
    let taskManager = new TaskManager(listContainer);
    debugTasks.addEventListener('click', function() {
        taskManager.showMyTasks();
    })
    //Pre made tasks
        //fetch tasks from api
    async function fetchTasks() {
        const response = await fetch("http://localhost:8080/api/tasks");
        const tasks = await response.json();
        return tasks;
      }
      fetchTasks().then(tasks => {
        // console.log('got tasks');
        // console.log(tasks);
        var taskObjects = tasks["hydra:member"].map(function(item) {
          return { isCompleted: item.completed, title: item.title, date: item.completedAt };
        });
        taskManager.taskObjects = taskObjects;
    
        for (index in taskObjects) { 
          taskManager.addTaskToList(index, taskObjects[index]);
        }
        //New tasks
        inputButton.addEventListener('click', function (e) {
            //set variables/values
            var newTaskName = taskInput.value;
            var newTaskDate = setDate.value;
        
            const newTaskObject = new Task(
                taskInput.value,
                setDate.value,
                false
            );
            //clears errors
            //get element by class 
            var errorNotices = document.getElementsByClassName('error_notice_new');
            while (errorNotices.length > 0) {
                errorNotices[0].remove();
            }
            //validate values
            if (taskInput.value === "" || setDate.value === "") {
                if (taskInput.value === "") {
                    let noTaskInput = errorNotice("span", "No Task Input", "error_notice", ["error_notice", "error_notice_new"]);
                    taskInput.after(noTaskInput);
                }
    
                if (setDate.value === "") {
                    let noDateInput = errorNotice("span", "No Date Input", "error_notice", ["error_notice", "error_notice_new"]);
                    setDate.after(noDateInput);
                }
                //returns process when 
                return;
            };
            //add values/task to list
            taskManager.addTaskToList(taskObjects.length, newTaskObject);
            //push id 
            taskObjects.push({ id: taskObjects.length, title: taskInput.value, date: setDate.value });
        });
    });
});
//creating element with 5 properties
//function format newElementCreation("elementType", "innerHTML(text)", "elementId" + index, ["elemenetClass/es"],
//                                   [{ attritbuteName "type", attributeValue "value" }], parentElement);
function newElementCreation(
    elementType,
    innerHTML,
    elementId,
    elementClasses, 
    elementAttributes,
    parent
) {
    var newElement = document.createElement(elementType);
    if (innerHTML != '') {
        newElement.innerHTML = innerHTML;
    }
    newElement.id = elementId;
    elementClasses.forEach((className) => {
        newElement.classList.add(className);
      });
    elementAttributes.forEach((elementAttribute) => {
        newElement.setAttribute(elementAttribute.attributeName, elementAttribute.attributeValue);
    });
    parent.appendChild(newElement);
    return newElement;
};
function errorNotice(
    elementType,
    innerHTML,
    elementId,
    elementClasses
) {
    var errorElement =document.createElement(elementType);
    if (innerHTML != "") {
        errorElement.innerHTML = innerHTML;
    }
    errorElement.id = elementId;
    elementClasses.forEach((className) => {
        errorElement.classList.add(className);
    });
    return errorElement;
};