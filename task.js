window.addEventListener('load', function(event){
    console.log('start');
    var taskInput = document.getElementById("task-input");
    var inputButton = document.getElementById("input-button");
    var taskHolder = document.getElementById("task-holder");
    var listHolder = document.getElementsByClassName("to-do-item")[0];
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
        { title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
        { title: 'Vestibulum eget tortor vel elit efficitur faucibus.'},
        { title: 'Nulla maximus eros ut mauris varius sodales.' },
        { title: 'Maecenas non nunc eu risus bibendum bibendum.'},
        { title: 'Integer commodo odio sed vehicula volutpat.'}

    ];
    console.log('this is a collection:');
    console.log(document.getElementsByClassName("to-do-item"));
    console.log('this is an array:');
    console.log(taskItems);
    if ( 1===5) { // loop an array with foreach
        taskItems.forEach(function(taskItem) {
            let task = document.createElement("li");
            task.innerHTML = taskItem.title;
            // console.log(task);
            listHolder.appendChild(task);
          });
        }
    if ( 1===5 ) { // loop with for..of
        for (taskItem of taskItems) {  // for .. of   -   taskItem contains object
            let task = document.createElement("li");
            task.innerHTML = taskItem.title;
            // console.log(task);
            listHolder.appendChild(task);
          }
        }
    if ( 1===5 ) {
        for (let i = 0; i < 5; i++ ) { // for (let ctr; ; )
            let task = document.createElement("li");
            task.innerHTML = taskItems[ctr].title;
            // console.log(task);
            listHolder.appendChild(task);
          }
        }
    for (index in taskItems) { // for .. in - index is the sequence number of object
        // console.log(arrayObjects[index].title);

        addTaskToList(index, taskItems[index].title);
        //calling out tasks items with title and indesx
    }
    inputButton.addEventListener('click', function(e) {
        // validate if input has value
        if (taskInput.value === '') {
            let noInputMessage = document.createElement ("span");
            noInputMessage.classList.add('errorNotice');
            // next: show error
            taskInput.after(noInputMessage);
            noInputMessage.innerHTML = 'No values for ' + taskInput.name;

        }
        // get value of input
        var newTask = taskInput.value;
        // display
        addTaskToList(taskItems.length, newTask);
        taskItems.push({ title: taskInput.value});
    });
    function addTaskToList(index, title) {
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
              console.log(inputPopUp);
              document.getElementById(window.currentEditId).innerHTML = inputPopUp.value;
              popUp.remove();
            }


            const bodyId = document.getElementById("body_id");

            bodyId.appendChild(popUp);
            popUp.appendChild(inputPopUp);
            inputPopUp.after(buttonPopUp);
            inputPopUp.setAttribute("type", "text");


        }

        deleteButton.onclick = function(event) {
            if (confirm('do you want to delete this?') == true) {
              task.remove();
            }
         }
        let isCompleted = document.createElement('span');
        isCompleted.innerHTML = 'X';
        task.prepend(isCompleted);
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
});
