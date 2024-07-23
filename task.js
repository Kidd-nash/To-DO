window.addEventListener('load', function (event) {
  console.log('start');
  var taskInput = document.getElementById("task-input");
  var inputButton = document.getElementById("input-button");
  var taskHolder = document.getElementById("task-holder");
  var listHolder = document.getElementsByClassName("to-do-item")[0];
  var dateInput = document.getElementById("set_date");

  // const myRequest = new Request("http://localhost:8080/api/tasks");


  // async function fetchTasks() {
  //   const response = await fetch("http://localhost:8080/api/tasks");
  //   const tasks = await response.json();
  //   return tasks;
  // }
  
  // fetchTasks().then(tasks => {
  //   console.log('got tasks');
  //   console.log(tasks);

  //   var newTaskObjects = tasks["hydra:member"].map(function(item) {
  //     return { isCompleted: item.completed, title: item.title, date: item.completedAt };
  //   });

  //   for (index in newTaskObjects) { 
  //     addTaskToList(index, newTaskObjects[index]);
  //   }


  //   // switch existing add / edit / delete operations to object/class based operations
  //   // for future replacement
  //   class Task {
  //     constructor(listHolder) {
  //       this.listHolder = listHolder;
  //     }
  //   // todo: add
  //     addTaskToList(index, currentTaskItem) {
  //       let task = document.createElement("li");
  //       task.id = "task_item_" + index;
  //       task.classList.add("task_item");

  //       let titleSpan = document.createElement('span');
  //       task.appendChild(titleSpan);
  //       titleSpan.innerHTML = currentTaskItem.title;
  //       titleSpan.id = 'task_title_' + index;
  //       titleSpan.classList.add("task_titles");

  //       // sample for helper function
  //       // let taskDate = createNewElement('span', 'task_date', [], [], task, currentTaskItem.date);

  //       let taskDate = document.createElement('span');
  //       task.appendChild(taskDate);
  //       taskDate.innerHTML = currentTaskItem.date;
  //       taskDate.id = 'task_date';

  //       this.listHolder.appendChild(task);

  //       let editButton = document.createElement('button');
  //       editButton.innerHTML = 'EDIT';
  //       editButton.classList.add("list_button");

  //       let deleteButton = document.createElement('button');
  //       deleteButton.innerHTML = 'DELETE';
  //       deleteButton.classList.add("list_button");

  //       let isCompleted = document.createElement("input");
  //       isCompleted.id = "completed";
  //       isCompleted.setAttribute("type", "checkbox");

  //       task.prepend(isCompleted);
  //       task.appendChild(editButton);
  //       task.appendChild(deleteButton);

  //       editButton.onclick = () => this.editTask(titleSpan, currentTaskItem, index);
  //       deleteButton.onclick = () => this.deleteTask(task, currentTaskItem);

  //       if (currentTaskItem.isCompleted === true) {
  //           this.setCompletedTask(titleSpan, editButton, deleteButton);
  //           isCompleted.checked = true;
  //       }

  //       isCompleted.onclick = (event) => this.toggleTaskCompletion(event, currentTaskItem, titleSpan, editButton, deleteButton);
  //     }  
  //   // todo: edit
  //     editTask(titleSpan, currentTaskItem, index) {
  //       window.currentEditId = titleSpan.id;
  //       let popUp = document.createElement("div");
  //       popUp.classList.add("edit_pop_up");
  //       popUp.id = "edit_pop_up";

  //       let inputPopUp = document.createElement("input");
  //       inputPopUp.id = "input_pop-up";
  //       inputPopUp.value = currentTaskItem.title;

  //       let buttonPopUp = document.createElement("button");
  //       buttonPopUp.innerHTML = "UPDATE";
  //       buttonPopUp.classList.add("button_pop_up");
  //       buttonPopUp.onclick = (event) => {
  //         if (inputPopUp.value === '') {
  //             let noInputPopUpMessage = document.createElement("span");
  //             noInputPopUpMessage.classList.add('errorNotice');
  //             noInputPopUpMessage.id = "no_value";
  //             inputPopUp.after(noInputPopUpMessage);
  //             noInputPopUpMessage.innerHTML = 'No value';
  //             inputPopUp.classList.add("error");
  //             return;
  //         }
  //         document.getElementById(window.currentEditId).innerHTML = inputPopUp.value;
  //         popUp.remove();
  //       };

  //       let exitButton = document.createElement("button");
  //       exitButton.classList.add("exit_button");
  //       exitButton.innerHTML = "X";
  //       exitButton.onclick = () => popUp.remove();

  //       const bodyId = document.getElementById("body_id");
  //       bodyId.appendChild(popUp);
  //       popUp.appendChild(inputPopUp);
  //       inputPopUp.after(buttonPopUp);
  //       inputPopUp.setAttribute("type", "text");
  //       buttonPopUp.after(exitButton);

  //     }
  //   // todo: delete
      
  //   deleteTask(task, currentTaskItem) {
  //     if (confirm('Do you want to delete this?')) {
  //         task.classList.add("delete_fade");
  //         let newTaskItems = taskItems.filter((taskItem) => taskItem.title !== currentTaskItem.title);

  //         window.localStorage.setItem('taskItems', JSON.stringify(newTaskItems));
  //         setTimeout(() => { task.remove(); }, 2500);
  //     }
  //   }
  //   // todo: add new


  //   // console.log(newTaskObjects);
  //   }
  //   //end of class
  // });
  //end of fetch







  // async function abc()  {
  //   await window
  // .fetch(
  // .then((response) => {
  //   if (!response.ok) {
  //     throw new Error(`HTTP error! Status: ${response.status}`);
  //   }

  //   return response;
  // })
  // .then((response) => {
  //   console.log('success response');
  //   // console.log(response.json());

  //   console.log(response.json());

  // });

  // }

  // abc();



  // var updateInput = document.getElementsByClassName("text-edit")[0];
  // var updateButton = document.getElementById("update-button");
  window.currentEditId = '';

  // updateButton.addEventListener('click', function(e) {
  //   // get updateInput value
  //   document.getElementById(window.currentEditId).innerHTML = updateInput.value;
  //   // hide pop up
  //   document.getElementById("pop-up").style.display = 'none';
  // });

  class Task {
    constructor(title, date, isCompleted) {
      this._title = title;
      this._date = date;
      this._isCompleted = isCompleted;
    }
    get title() {
      return this._title;
    }
    get date() {
      return this._date;
    }
    get isCompleted() {
      return this._isCompleted;
    }
    //method for interchaneable booelan value
  }

  const taskOne = new Task(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "15-07-24",
    true
  );
  console.log(taskOne.title);
  console.log(taskOne.date);


  var taskItems = [
    {
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      date: '15-07-24',
      isCompleted: true
    },
    {
      title: 'Vestibulum eget tortor vel elit efficitur faucibus.',
      date: '15-07-25',
      isCompleted: false
    },
    {
      title: 'Nulla maximus eros ut mauris varius sodales.',
      date: '15-07-26',
      isCompleted: true
    },
    {
      title: 'Maecenas non nunc eu risus bibendum bibendum.',
      date: '15-07-27',
      isCompleted: false
    },
    {
      title: 'Integer commodo odio sed vehicula volutpat.',
      date: '15-07-28',
      isCompleted: false
    },
    {
      id: 6, title: 'trial task',
      date: 'date',
      isCompleted: true
    }
  ];


  // GENERATE NEW ARRAY OF TASKS BASED ON TASK CLASS
  var taskObjects = taskItems.map(function (item) {
    return new Task(item.title, item.date, item.isCompleted);
  });

  var strSavedTaskItems = window.localStorage.getItem('taskItems');
  if (strSavedTaskItems != undefined) {

    let savedItems = JSON.parse(strSavedTaskItems);
    taskItems = savedItems;
  }

  

  // for (let i = 0; i < taskItems.isCompleted.value; i++){
  //   console.log(taskItems.isCompleted.value);
  // }
  // taskItems.forEach(console.log(taskItems.isCompleted););

  window.lastId = taskItems.reduce(
    (accumulator, currentValue) => {
      if (currentValue > accumulator) {
        return currentValue;
      }
    },
    0
  );

  // console.log('this is a collection:');
  // console.log(document.getElementsByClassName("to-do-item"));
  // console.log('this is an array:');
  // console.log(taskItems);
  // console.log(taskItems[3].date);
  // console.log(taskItems[i].isCompleted);
  // if ( 1===5) { // loop an array with foreach
  //     taskItems.forEach(function(taskItem) {
  //         let task = document.createElement("li");
  //         task.innerHTML = taskItem.title;
  //         // console.log(task);
  //         listHolder.appendChild(task);
  //       });
  //     }
  // if ( 1===5 ) { // loop with for..of
  //     for (taskItem of taskItems) {  // for .. of   -   taskItem contains object
  //         let task = document.createElement("li");
  //         task.innerHTML = taskItem.title;
  //         // console.log(task);
  //         listHolder.appendChild(task);
  //       }
  //     }
  // if ( 1===5 ) {
  //     for (let i = 0; i < 5; i++ ) { // for (let ctr; ; )
  //         let task = document.createElement("li");
  //         task.innerHTML = taskItems[ctr].title;
  //         // console.log(task);
  //         listHolder.appendChild(task);
  //       }
  //     }


  // for (index in taskObjects) { // for .. in - index is the sequence number of object
  //   // console.log(arrayObjects[index].title);
  //   addTaskToList(index, taskItems[index]);
  //   // addTaskToList(index, taskItems[index].title, taskItems[index].date, taskItems[index].isCompleted);
  //   // addTaskToList(index, taskItems[index].date);
  //   //calling out tasks items with title and indesx
  // }
  for (index in taskItems) {
    addTaskToList(index, taskItems[index]);
  }
  inputButton.addEventListener('click', function (e) {
    e.preventDefault();
    //this remove does not work since it is a created element
    //document.getElementById("no_value").classList.remove('errorNotice');

    // check / clear first
    var error = document.getElementById('no_value');
    if (error != undefined) {
      error.remove();
      document.getElementById("task-input").classList.remove('error');
    }

    var noDate = document.getElementById('no_date');
    if (noDate != undefined) {
      noDate.remove();
      document.getElementById('set_date').classList.remove('error');
    }

    // validate if input has value
    if (taskInput.value === '' || dateInput.value === '') {
      if (taskInput.value === '') {
        let noInputMessage = document.createElement("span");
        noInputMessage.classList.add('errorNotice');
        noInputMessage.id = "no_value"
        // next: show error
        taskInput.after(noInputMessage);
        noInputMessage.innerHTML = 'No value' + taskInput.name;
        taskInput.classList.add("error");
      }

      if (dateInput.value === '') {
        let noInputDate = document.createElement("span");
        noInputDate.classList.add('errorNotice');
        noInputDate.id = "no_date";
        dateInput.after(noInputDate);
        noInputDate.innerHTML = 'No value';
        dateInput.classList.add("error");
      }

      return;
    }

    // get value of input
    var newTask = taskInput.value;
    var setDate = dateInput.value;

    const newTaskObject = new Task(
      taskInput.value,
      dateInput.value,
      false
    );

    // display
    addTaskToList(taskItems.length, newTaskObject);
    taskItems.push({ id: ++window.lastId, title: taskInput.value, date: dateInput.value });
    window.localStorage.setItem(
      'taskItems',
      JSON.stringify(taskItems)
    );

    console.log('new tasks');
    console.log(taskItems);
  });

  function addTaskToList(index, currentTaskItem) {
    let task = document.createElement("li");
    //add and id to the li
    task.id = "task_item_" + index;
    task.classList.add("task_item");


    let titleSpan = document.createElement('span');
    task.appendChild(titleSpan);
    // task.innerHTML = title;
    titleSpan.innerHTML = currentTaskItem.title;
    titleSpan.id = 'task_title_' + index;
    titleSpan.classList.add("task_titles");

    let taskDate = document.createElement('span');
    task.appendChild(taskDate);
    taskDate.innerHTML = `~ ${currentTaskItem.date}`;
    taskDate.id = 'task_date';

    // console.log(task);
    listHolder.appendChild(task);
    //task.id = "error_message_idx"; // to update

    let editButton = document.createElement('button');
    editButton.innerHTML = 'EDIT';
    editButton.classList.add("list_button");
    let deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'DELETE';
    deleteButton.classList.add("list_button");

    task.appendChild(editButton);
    task.appendChild(deleteButton);

    editButton.onclick = function () {
      // document.getElementById("pop-up").style.display = 'block';
      window.currentEditId = titleSpan.id;
      let popUp = document.createElement("div");
      popUp.classList.add("edit_pop_up");
      popUp.id = "edit_pop_up";
      let inputPopUp = document.createElement("input");
      inputPopUp.id = "input_pop-up";
      inputPopUp.value = currentTaskItem.title;
      let buttonPopUp = document.createElement("button");
      buttonPopUp.innerHTML = "UPDATE";
      buttonPopUp.classList.add("button_pop_up");
      buttonPopUp.onclick = function (event) {
        if (inputPopUp.value === '') {
          let noInputPopUpMessage = document.createElement("span");
          noInputPopUpMessage.classList.add('errorNotice');
          noInputPopUpMessage.id = "no_value"
          // next: show error
          inputPopUp.after(noInputPopUpMessage);
          noInputPopUpMessage.innerHTML = 'No value' + taskInput.name;
          inputPopUp.classList.add("error");
          return;
        }
        console.log(inputPopUp);
        document.getElementById(window.currentEditId).innerHTML = inputPopUp.value;
        popUp.remove();
      }
      // document.getElementById('edit_pop_up').remove();
      let exitButton = document.createElement("button");
      exitButton.classList.add("exit_button");
      exitButton.innerHTML = "X";
      exitButton.onclick = function (event) {

        edit_pop_up.remove();
      }

      const bodyId = document.getElementById("body_id");

      bodyId.appendChild(popUp);
      popUp.appendChild(inputPopUp);
      inputPopUp.after(buttonPopUp);
      inputPopUp.setAttribute("type", "text");
      buttonPopUp.after(exitButton);
    }

    deleteButton.onclick = function (event) {
      if (confirm('do you want to delete this?') == true) {
        task.classList.add("delete_fade");
        // create new array, excluding the deleted task
        let newTaskItems = taskItems.filter((taskItem) => {
          return taskItem.title != currentTaskItem.title;
        });

        // save to memory
        window.localStorage.setItem(
          'taskItems',
          JSON.stringify(newTaskItems)
        );

        // task.remove();
        setTimeout(() => { task.remove(); }, 2500);
      }
    }
    let isCompleted = document.createElement("input"); // checkbox input
    isCompleted.id = "completed";
    isCompleted.setAttribute("type", "checkbox");
    task.prepend(isCompleted);
    if (currentTaskItem.isCompleted === true) {
      setCompletedTask(titleSpan, editButton, deleteButton);
      isCompleted.checked = true;
    };
    // if (currentTaskItem.isCompleted === null) {
    //     enableButton(editButton);
    //     enableButton(deleteButton);
    // }


    isCompleted.onclick = function (event) {
      if (
        currentTaskItem.isCompleted === false
        &&
        confirm("Have you completed this task?") == true
      ) {
        setCompletedTask(titleSpan, editButton, deleteButton);

        currentTaskItem.isCompleted = event.target.checked;
        window.localStorage.setItem(
          'taskItems',
          JSON.stringify(taskItems)
        );

        return;
      }

      if (confirm("Are you sure you want to uncheck?") == true) {
        enableButton(editButton);
        enableButton(deleteButton);
        titleSpan.classList.remove('completed_task');

        currentTaskItem.isCompleted = event.target.checked;
        window.localStorage.setItem(
          'taskItems',
          JSON.stringify(taskItems)
        );
      }
    }
  }

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      var pop = document.getElementById("edit_pop_up");
      if (pop) {
        pop.remove();
      }
    }
  });
  function alertNoInput() { }

  function addDatetoTaskList() { }

  function setCompletedTask(titleSpan, editButton, deleteButton) {
    disableButton(editButton);
    disableButton(deleteButton);
    titleSpan.classList.add("completed_task");
  }

  function disableButton(currentButton) {
    currentButton.classList.add("completed");
    currentButton.setAttribute("disabled", "disabled");
  }

  function enableButton(currentButton) {
    currentButton.classList.remove("completed");
    currentButton.removeAttribute("disabled");
  }


  // TODO
  // var taskStorage = {
  //   defautlList: {
  //
  //   }
  //
  //   getTaskList() {
  //       // check network, get from network, else return default list
  //   }
  //
  //   addTask() {
  //
  //     return id
  //   }
  //
  //   removeTask(id) {
  //
  //   }
  //
  //   updateTask(id) {
  //
  //   }
  //
  //
  // }

});



function createNewElement(
    elementType,
    elementId,
    elementAttributes, // [ { attributeName: 'i.e. type', attributeValue: 'i.e. checkbox' } ]

    elementClasses, // [ 'class 1', 'class 2' ]
    parent,
    innerHTML
) {
  var newElement = document.createElement(elementType);

  newElement.id = elementId;

  elementAttributes.forEach((elementAttribute) => {
    newElement.setAttribute(elementAttribute.attributeName, elementAttribute.attributeValue);
  });
  
  elementClasses.forEach((className) => {
    newElement.classList.add(className);
  });

  parent.appendChild(newElement);

  if (innerHTML != '') {
      newElement.innerHTML = innerHTML;
  }

  return newElement;
}


// methods:
    // add new task to display
    // delete task from display
    // 
// class TaskListDisplayManager() {
//     construct(ListHolder) {

//     }

//     addNewTask() {
//       // display html
//       this.ListHolder.addNewTask(data);
//     }
// }

// class ListHolder() {
//   getAllTasks() {
//     return [];
//   }

//   addNewTask() {
//       fetch() submit to server
//   }
// }


// add task to list function / routine / method
    // create list element
    // inside, create span for text
    // inside, create span for date
    // inside, create edit button; add onclick
    // inside, create delete button; add onclick
    // inside, create checkbox; add onclick



// window.onload

var taskManager = new TaskListDisplayManager();