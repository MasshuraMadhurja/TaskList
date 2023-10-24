window.addEventListener('load', () => {
  let savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

  if (!Array.isArray(savedTasks)) {
    savedTasks = [];
  }

  

  const form = document.querySelector("#new-task-form");
  const input = document.querySelector("#new-task-input");
  const list_el = document.querySelector("#tasks");
  const form2 = document.querySelector("#new-dateTime-form");
  const dateInput = document.querySelector("#new-date-input");
  const timeInput = document.querySelector("#new-time-input");

  function createTaskElement(taskData) {
    const task_el = document.createElement('div');
    task_el.classList.add('task');

    const task_content_el = document.createElement('div');
    task_content_el.classList.add('content');

    task_el.appendChild(task_content_el);

    const task_input_el = document.createElement('input');
    task_input_el.classList.add('text');
    task_input_el.type = 'text';
    task_input_el.value = taskData.task;
    task_input_el.setAttribute('readonly', 'readonly');

    const task_date_el = document.createElement('input');
    task_date_el.classList.add('task-date');
    task_date_el.type = 'text';
    task_date_el.value = ` ${taskData.taskDate.toLocaleString()}`;
    task_date_el.setAttribute('readonly', 'readonly');

    task_content_el.appendChild(task_input_el);
    task_content_el.appendChild(task_date_el);

    const task_actions_el = document.createElement('div');
    task_actions_el.classList.add('actions');

    const task_edit_el = document.createElement('button');
    task_edit_el.classList.add('edit');
    task_edit_el.innerText = 'Edit';

    const task_delete_el = document.createElement('button');
    task_delete_el.classList.add('delete');
    task_delete_el.innerText = 'Delete';

    task_actions_el.appendChild(task_edit_el);
    task_actions_el.appendChild(task_delete_el);

    task_el.appendChild(task_actions_el);

    list_el.appendChild(task_el);

    task_edit_el.addEventListener('click', () => {
      if (task_edit_el.innerText.toLowerCase() === "edit") {
        task_edit_el.innerText = "Save";
        task_input_el.removeAttribute("readonly");
        task_date_el.removeAttribute("readonly");
        task_input_el.focus();
      } else {
        taskData.task = task_input_el.value;
        task_edit_el.innerText = "Edit";
        task_input_el.setAttribute("readonly", 'readonly');
        updateLocalStorage(savedTasks);
      }
    });

    task_delete_el.addEventListener('click', () => {
      list_el.removeChild(task_el);
      const index = savedTasks.indexOf(taskData);
      if (index !== -1) {
        savedTasks.splice(index, 1);
        updateLocalStorage(savedTasks);
      }
    });
  }

  savedTasks.forEach((taskData) => {
    taskData.taskDate = new Date(taskData.taskDate); // Convert the date string back to a Date object
    createTaskElement(taskData);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const task = input.value;
    const taskDate = dateInput.value;
    const taskTime = timeInput.value;

    if (!task) {
      alert("Please fill out the task");
    } else if (!taskDate || !taskTime) {
      alert("Please pick a date and time");
    } else {
      const taskData = { task, taskDate: new Date(`${taskDate}T${taskTime}`) };
      savedTasks.push(taskData);
      updateLocalStorage(savedTasks);
      createTaskElement(taskData);

      input.value = "";
      dateInput.value = "";
      timeInput.value = "";
    }
  });

  function updateLocalStorage(data) {
    localStorage.setItem('tasks', JSON.stringify(data));
  }
});
