window.addEventListener( 'load', function (event) {
  console.log('start');
    //declare variables from html
    var taskInput = document.getElementById("task_input");
    var setDate = document.getElementById("set_date");
    var inputButton = document.getElementById("input_button");
    var listContainer = document.getElementById("list_container");
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
            //should add task? this.task=[]?
        }
        addTaskToList(index, task) {
            let taskItem = document.createElement("li");
            taskItem.id = "task_item" + index;
            taskItem.classList.add("task_item");
            // console.log(task);
            taskItem.innerHTML = task.title;
            
            this.listContainer.appendChild(taskItem);
            //isCompleted
            let isCompleted = newElementCreation("input", "", "check_box" + index, ["check_box"], 
                [{ attributeName: "type", attributeValue: "checkbox" }], taskItem
            );
            //date
            let taskDate = newElementCreation("span", task.date, "task_date" + index, ["task_date"],
                [{ attributeName: "type", attributeValue: ""}], taskItem
            );
            //edit button
            let editButton = newElementCreation("button", "EDIT", "edit_button" + index, ["edit_button"],
                [{ attributeName: "type", attributeValue: "button"}], taskItem
            );
            //delete button
            let deleteButton = newElementCreation("button", "DELETE", "delete_button" + index, ["delete_button"],
                [{ attributeName: "type", attributeValue: "button"}], taskItem
            );
        }
    }
    let taskManager = new TaskManager(listContainer);
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
    
        for (index in taskObjects) { 
          taskManager.addTaskToList(index, taskObjects[index]);
        }
    });
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
        //validate values
        if (taskInput.value === "" || setDate.value === "") {
            if (taskInput.value === "") {
                let noTaskInput = errorNotice("span", "No Task Input", "error_notice", ["error_notice"]);
                taskInput.after(noTaskInput);
            }

            if (setDate.value === "") {
                let noDateInput = errorNotice("span", "No Date Input", "error_notice", ["error_notice"]);
                setDate.after(noDateInput);
            }
            //returns process when 
            return;
        };

        //add values/task to list
        taskManager.addTaskToList(index, newTaskObject);
    });
    
    //3 main processes for both Pre made and New tasks

        //add

        //edit

        //delete
});
//creating element with 5 properties
//function format newElementCreation("elementType", "innerHTML(text)", "elementId" + index, ["elemenetClass/es"],
//                                   [{ attritbuteName "type", attributeValue "value" }], taskItem);
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