window.addEventListener('load', function(event){
    console.log('start');
    var taskInput = document.getElementById("task-input");
    var inputButton = document.getElementById("input-button");
    var taskHolder = document.getElementById("task-holder");
    var listHolder = document.getElementsByClassName("to-do-item")[0];
    var dateInput = document.getElementById("set_date");

    // var updateInput = document.getElementsByClassName("text-edit")[0];
    // var updateButton = document.getElementById("update-button");
    window.currentEditId = '';

    // updateButton.addEventListener('click', function(e) {
    //   // get updateInput value
    //   document.getElementById(window.currentEditId).innerHTML = updateInput.value;
    //   // hide pop up
    //   document.getElementById("pop-up").style.display = 'none';
    // });

    var taskItems = [
        { title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          date: '15-07-24'},
        { title: 'Vestibulum eget tortor vel elit efficitur faucibus.',
          date: '15-07-25'},
        { title: 'Nulla maximus eros ut mauris varius sodales.',
          date: '15-07-26'},
        { title: 'Maecenas non nunc eu risus bibendum bibendum.',
          date: '15-07-27'},
        { title: 'Integer commodo odio sed vehicula volutpat.',
          date: '15-07-28'},
        { id: 6, title: 'trial task',
          date: 'date'}
    ];


    var strSavedTaskItems = window.localStorage.getItem('taskItems');
    if (strSavedTaskItems != undefined) {
        let savedItems = JSON.parse(strSavedTaskItems);
        taskItems = savedItems;
    }

    window.lastId = taskItems.reduce(
      (accumulator, currentValue) => {
         if (currentValue > accumulator) {
           return currentValue;
         }
      },
      0
    );

    console.log('this is a collection:');
    console.log(document.getElementsByClassName("to-do-item"));
    console.log('this is an array:');
    console.log(taskItems);
    console.log(taskItems[3].date);
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
    for (index in taskItems) { // for .. in - index is the sequence number of object
        // console.log(arrayObjects[index].title);

        addTaskToList(index, taskItems[index].title, taskItems[index].date);
        // addTaskToList(index, taskItems[index].date);
        //calling out tasks items with title and indesx
    }
    for (index in taskItems) {
        addDatetoTaskList(index, taskItems[index].date);
    }
    inputButton.addEventListener('click', function(e) {
        e.preventDefault();
        //this remove does not work since it is a created element
        //document.getElementById("no_value").classList.remove('errorNotice');

        // check / clear first
        var error = document.getElementById('no_value');
        if (error != undefined) {
            error.remove();
            document.getElementById("task-input").classList.remove('error');
        }

        // validate if input has value
        if (taskInput.value === '' || dateInput.value === '') {
            if (taskInput.value === '') {
                let noInputMessage = document.createElement ("span");
                noInputMessage.classList.add('errorNotice');
                noInputMessage.id = "no_value"
                // next: show error
                taskInput.after(noInputMessage);
                noInputMessage.innerHTML = 'No value' + taskInput.name;
                taskInput.classList.add("error");
            }

            if (dateInput.value === '') {
                let noInputDate = document.createElement ("span");
                noInputDate.classList.add('errorNotice');
                dateInput.after(noInputDate);
                noInputDate.innerHTML = 'No value';
                dateInput.classList.add("error");
            }

            return;
        }

        // get value of input
        var newTask = taskInput.value;
        var setDate = dateInput.value;
        // display
        addTaskToList(taskItems.length, newTask, dateInput.value);
        taskItems.push({ id: ++window.lastId, title: taskInput.value, date: dateInput.value});
        window.localStorage.setItem(
            'taskItems',
            JSON.stringify(taskItems)
        );

        console.log('new tasks');
        console.log(taskItems);
    });

    function addTaskToList(index, title, date) {

        let task = document.createElement("li");
        //add and id to the li
        task.id = "task_item_" + index;
        task.classList.add("task_item");


        let titleSpan = document.createElement('span');
        task.appendChild(titleSpan);
        // task.innerHTML = title;
        titleSpan.innerHTML = title;
        titleSpan.id = 'task_title_' + index;
        titleSpan.classList.add("task_titles");

        let taskDate = document.createElement('span');
        task.appendChild(taskDate);
        taskDate.innerHTML = `~ ${date}`;
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

        editButton.onclick = function() {
            // document.getElementById("pop-up").style.display = 'block';
            window.currentEditId = titleSpan.id;
            let popUp = document.createElement("div");
            popUp.classList.add("edit_pop_up");
            popUp.id = "edit_pop_up";
            let inputPopUp = document.createElement("input");
            inputPopUp.id = "input_pop-up";
            inputPopUp.value = title;
            let buttonPopUp = document.createElement("button");
            buttonPopUp.innerHTML = "UPDATE";
            buttonPopUp.classList.add("button_pop_up");
            buttonPopUp.onclick = function(event) {
              if (inputPopUp.value === '') {
                  let noInputPopUpMessage = document.createElement ("span");
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
            exitButton.onclick = function(event) {

                edit_pop_up.remove();
            }

            const bodyId = document.getElementById("body_id");

            bodyId.appendChild(popUp);
            popUp.appendChild(inputPopUp);
            inputPopUp.after(buttonPopUp);
            inputPopUp.setAttribute("type", "text");
            buttonPopUp.after(exitButton);
        }

        deleteButton.onclick = function(event) {
            if (confirm('do you want to delete this?') == true) {
              task.classList.add("delete_fade");
              // create new array, excluding the deleted task
              let newTaskItems = taskItems.filter( (taskItem) => {
                return taskItem.title != title;
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

        isCompleted.onclick = function(event) {
          if (confirm("Have you completed this task?") == true) {
            editButton.classList.add("completed");
            deleteButton.classList.add("completed");
            editButton.setAttribute("disabled", "disabled");
            deleteButton.setAttribute("disabled", "disabled");
            titleSpan.classList.add("completed_task");
          }
        }
        // isCompleted.onclick = function(event) {
        //     let completedPopUp = document.createElement("div");
        //     completedPopUp.classList.add("edit_pop_up");
        //     completedPopUp.id = "edit_pop_up";
        // }
      }

      document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
          var pop = document.getElementById("edit_pop_up");
          if (pop) {
            pop.remove();
          }
        }
      });
    function alertNoInput(){}

    function addDatetoTaskList(){}

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
