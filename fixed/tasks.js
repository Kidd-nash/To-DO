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
            this.name = name;
            this.date = date;
            this.isCompleted = isCompleted;
        }
    }
    
    class TaskManager {
        constructor(listContainer) {
            this.listContainer = listContainer;
            //should add task? this.task=[]?
        }
        addTaskToList(index, task) {
            let taskItem = document.createElement("li");
            taskItem.id = "task_item" + index;
            taskItem.classList.add("task_item");
            taskItem.innerHTML = task.title;
            
            this.listContainer.appendChild(taskItem);
            //isCompleted
            let isCompleted = newElementCreation("input", "", "check_box" + index, ["check_box"], 
                [{ attributeName: "type", attributeValue: "checkbox" }], taskItem
            );
            // isCompleted.checked = task.isCompleted;
            // taskItem.prependChild(isCompleted);
            
            //date
            let taskDate = newElementCreation("span", task.date, "task_date" + index, ["task_date"],
                [{ attributeName: "type", attributeValue: ""}], taskItem
            );
            //edit 
            //delete
        }
    }

    let taskManager = new TaskManager(listContainer);
//should fetch be here?
    async function fetchTasks() {
        const response = await fetch("http://localhost:8080/api/tasks");
        const tasks = await response.json();
        return tasks;
      }
      
      fetchTasks().then(tasks => {
        console.log('got tasks');
        console.log(tasks);
    
        var newTaskObjects = tasks["hydra:member"].map(function(item) {
          return { isCompleted: item.completed, title: item.title, date: item.completedAt };
        });
    
        for (index in newTaskObjects) { 
          taskManager.addTaskToList(index, newTaskObjects[index]);
        }
    });
    //Pre made tasks
        //fetch tasks from api

    //New tasks

        //Validate Input (task name, date)

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
