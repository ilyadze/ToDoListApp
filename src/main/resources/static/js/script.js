// var tasksApi = Vue.recource('/tasks')
sendRequest();

//Массив задач
const tasks = [];
const pageTasksList = [];

localDate = new Date("1970-01-01T00:00:00");
let lastTaskId = 0;

const dom = {
    body: document.getElementById("page-body"),
    todo_new: document.getElementById("todo-new"),
    new: document.getElementById("new"),
    add: document.getElementById("add"),
    tasks: document.getElementById("tasks"),
    menu: document.getElementById("todo-menu"),
    title: document.getElementById("page-title"),
};


//Отслеживание клика по кнопке добавления задачи
dom.add.onclick = () => {
    const newTaskText = dom.new.value;
    if (newTaskText.length > 105) {
        dom.new.value = "Слишком длинный заголовок";
        return;
    }
    if (newTaskText && !checkTask(newTaskText, tasks)) {
        addTask(newTaskText, tasks);
        dom.new.value = "";
        tasksRender(tasks);
    }
};

//Функция добавления задач
function addTask(title, list) {
    const timestap = Date.now();
    let elementClass;
    document
        .querySelectorAll(".menu .selected")
        .forEach((element) => {elementClass = element});
    let newDate = localDate;
    let newIsImportantStatement = false;
    // console.log(elementClass.classList);
    if (elementClass.classList.contains("not-passed") || elementClass.classList.contains("search")) {
        alert('Нельзя добавить задачу в "Не пройденные" или в "Поиск"');
        return;
    } else if (elementClass.classList.contains("my-day")) {
        let dateNow = new Date();
        dateNow.setHours(26,59,59,0);
        // console.log(dateNow.toISOString())
        newDate = dateNow.toISOString();
    } else if(elementClass.classList.contains("important")) {
        newIsImportantStatement = true;
    }
    lastTaskId++;
    const task = {
        id: timestap,
        taskId: lastTaskId,
        title: title,
        description: "",
        dateTime: newDate,
        isComplete: false,
        isImportant: newIsImportantStatement,
        withDescription: false,
        withSettings: false,
    };
    sendRequestAdd(task);
    list.push(task);
    pageTasksList.push(task);
}

function addTaskFromJson(Json, list) {
    // console.log(typeof Json.dateOfCompletion);
    lastTaskId++;
    const task = {
        id: Json.id,
        taskId: Json.id,
        title: Json.title,
        description: Json.description,
        dateTime: Json.dateOfCompletion,
        isComplete: Json.complete,
        isImportant: Json.important,
        withSettings: false,
    };
    lastTaskId = Json.id;
    list.push(task);
    pageTasksList.push(task);
}




//Проверка существования задачи в массиве задач
function checkTask(title, list) {
    let isHave = false;

    if (!list.length) {
        return false;
    }

    list.forEach((task) => {
        if (task.title == title) {
            alert("Задача уже существует!");
            isHave = true;
            dom.new.value = "";
        }
    });
    return isHave;
}

//Функция вывода списка задач
function tasksRender(list) {
    let elementClass;
    document
        .querySelectorAll(".menu .selected")
        .forEach((element) => {elementClass = element});
    let isScheduled = elementClass.classList.contains("scheduled") || elementClass.classList.contains("icon-calendar");
    if (isScheduled) {
        sortListFromDate(list);
    }
    let datesList = [];
    let htmlList = "";
    list.forEach((task) => {
        let datesTask = ``;
        let descrition = ``;
        let classSettings = `todo-task-settings`;
        if (task.withDescription) {
            descrition = `
            <textarea placeholder="Description..." 
                class="task-description" 
                onkeyup="saveDescription(${task.id})"
                id="${"Description:" + task.id}">${task.description}</textarea>`;
            classSettings = `todo-task-settings todo-task-changing`;
            // console.log("+++");
        }
        if (isScheduled) {
            let date = new Date(task.dateTime);
            date = date.getDate() + ":" + date.getMonth() + ":" + date.getFullYear();
            if (date == "31:11:1969" || date == "01:01:1970" || date == "1:0:1970" ) {
                datesTask = `<div class="title-of-date-tasks"><h3>Прочие</h3></div>`;
            }
            else if(checkOnNowDay(task)) {
                datesTask = `<div class="title-of-date-tasks"><h3>Сегодня</h3></div>`;
            }
            else if (checkOnTommorowDay(task)){
                datesTask = `<div class="title-of-date-tasks"><h3>Завтра</h3></div>`
            }
            else {
                datesTask = `<div class="title-of-date-tasks">
                            <h3>${date}</h3>
                            </div>`
            }
            if (datesList.includes(datesTask)) {
                datesTask = ``;
            }
            else {
                datesList.push(datesTask);
            }
        }
            const taskWithDate =
                task.dateTime == localDate || task.dateTime == "1969-12-31T21:00:00"
                    ? `<input id="date_of_task" type="datetime-local" class="todo-task-input-datetime"">
              <div class="todo-task-add-date">
                +
              </div>`
                    : `${task.dateTime}`;
            const classOfTaskDate =
                task.dateTime == localDate
                    ? `todo-task-date-time`
                    : `todo-task-date-time todo-task-date-time-complete`;
            const checked = task.isComplete ? "checked" : "";
        let taskStatus = `todo-task`;
            if (task.withDescription) {
                taskStatus = `todo-task todo-task-changing`;
            }
            if (task.withSettings == false) {

                const cls = task.isComplete
                    ? `${taskStatus} todo-task-complete`
                    : `${taskStatus}`;

                const taskHtml = `
            ${datesTask}
            <div id="${task.id}" class="todo-task-container">
                <div  class="${cls}">
                <label class="todo-checkbox">
                  <input type="checkbox" ${checked} />
                  <div class="todo-checkbox-div"></div>
                </label>
                <div class="todo-task-title">${task.title}</div>
                <div class="todo-task-edit">...</div>
                </div>
                ${descrition}
              </div>`;
                htmlList = htmlList + taskHtml;
            } else {
                const cls = task.isComplete
                    ? "todo-task todo-task-complete todo-task-changing"
                    : "todo-task todo-task-changing";
                const isImportant = task.isImportant
                    ? `<span class="icon-star"></span>`
                    : `<span class="icon-star-o"></span>`;
                const taskHtml = `
          ${datesTask}
          <div id="${task.id}" class="todo-task-container">
          <div class="${cls}">
            <label class="todo-checkbox">
              <input type="checkbox" ${checked} />
              <div class="todo-checkbox-div"></div>
            </label>
            <div class="todo-task-title">${task.title}</div>
            <div class="todo-task-edit">...</div>
          </div>
          <div id="${task.id}" class="${classSettings}">
            <div class="${classOfTaskDate}">
              ${taskWithDate}
            </div>
            <div class="todo-task-options">
              <div class="todo-task-important">
                ${isImportant}
              </div>
              <div class="todo-task-del">
                <span class="icon-trash-o"></span>
              </div>
            </div>
          </div>
          ${descrition}
        </div>`;
                htmlList = htmlList + taskHtml;
            }
        });
    dom.tasks.innerHTML = htmlList;
}

//Отслеживаем клик по чекбоксу с задачей
dom.tasks.onclick = (event) => {
    const target = event.target;
    if (target.classList.contains("todo-checkbox-div")) {
        const task = target.parentElement.parentElement.parentElement;
        const taskId = task.getAttribute("id");
        changeTaskStatus(taskId, tasks);
        tasksRender(tasks);
    }
    if (target.classList.contains("todo-task-edit")) {
        const task = target.parentElement.parentElement;
        const taskId = task.getAttribute("id");
        changeTaskSettings(taskId, tasks);
        tasksRender(tasks);
    }
    if (target.classList.contains("icon-trash-o")) {
        const task = target.parentElement.parentElement.parentElement;
        const taskId = task.getAttribute("id");
        deleteTask(taskId, tasks);
        tasksRender(tasks);
    }
    if (
        target.classList.contains("icon-star-o") ||
        target.classList.contains("icon-star")
    ) {
        const task = target.parentElement.parentElement.parentElement;
        const taskId = task.getAttribute("id");
        changeIsImportantStatus(taskId, tasks);
        tasksRender(tasks);
    }
    if (target.classList.contains("todo-task-add-date")) {
        dateTime = document.getElementById("date_of_task").value + ":00";
        if (dateTime == ":00") {
            alert("Введите дату!" + dateTime);
        } else {
            if (Date.parse(dateTime) < Date.now()) {
                alert("Задаче можно поставить только дату, которая будет!");
            } else {
                const task = target.parentElement.parentElement.parentElement;
                const taskId = task.getAttribute("id");
                // date = new Date(dateTime);
                changeTaskDate(taskId, tasks, dateTime);
            }
        }
        tasksRender(tasks);
    }
    if (target.classList.contains("todo-task-date-time-complete")) {
        const task = target.parentElement;
        const taskId = task.getAttribute("id");
        changeTaskDate(taskId, tasks, localDate);
        tasksRender(tasks);
    }
    if (target.classList.contains("todo-task-title")) {
        const task = target.parentElement.parentElement;
        const taskId = task.getAttribute("id");
        changeTaskDescriptionStatus(taskId, tasks);
        tasksRender(tasks);
    }
};

//Функция добавления описания
function changeTaskDescriptionStatus(id, list) {
    list.forEach((task) => {
        if (task.id == id) {
            task.withDescription = !task.withDescription;
        }
        // console.log(task);
    });
}
//Функция измения даты выполнения задачи
function changeTaskDate(id, list, dateTime) {
    list.forEach((task) => {
        if (task.id == id) {
            task.dateTime = dateTime;
            sendRequestEdit(task);
        }
    });
    pageTasksList.forEach((task) => {
        if (task.id == id) {
            task.dateTime = dateTime;
        }
    });
}

//Функция измения статуса(по важности) задачи
function changeIsImportantStatus(id, list) {
    list.forEach((task) => {
        if (task.id == id) {
            task.isImportant = !task.isImportant;
            sendRequestEdit(task);
        }
    });
    // pageTasksList.forEach((task) => {
    //     if (task.id == id) {
    //         task.isImportant = !task.isImportant;
    //     }
    // });
}

//Функция изменения статуса задачи
function changeTaskStatus(id, list) {
    list.forEach((task) => {
        if (task.id == id) {
            task.isComplete = !task.isComplete;
            sendRequestEdit(task);
        }
    });
    // pageTasksList.forEach((task) => {
    //     if (task.id == id) {
    //         task.isComplete = !task.isComplete;
    //     }
    // });
}

//Функция проверки открыты ли настройки
function changeTaskSettings(id, list) {
    list.forEach((task) => {
        if (task.id == id) {
            task.withSettings = !task.withSettings;
        }
    });
    // pageTasksList.forEach((task) => {
    //     if (task.id == id) {
    //         task.withSettings = !task.withSettings;
    //     }
    // });
}

//Функция удаления задачи
function deleteTask(id, list) {
    list.forEach((task, idx) => {
        if (task.id == id) {
            list.splice(idx, 1);

            sendRequestDelete(task);
        }
    });
    pageTasksList.forEach((task, idx) => {
        if (task.id == id) {
            pageTasksList.splice(idx, 1);
        }
    });
}

//Отслеживаем клик по меню
dom.menu.onclick = (event) => {
    const target = event.target;
    let htmlTitle = "";

    let length = tasks.length;
    for(let i = 0;i < length;i++) {
        tasks.pop();
    }
    length = pageTasksList.length;
    if (target.classList.contains("user-account") || target.classList.contains("icon-user") || target.classList.contains("group-tasks")) {
        return;
    }
    if (!target.classList.contains("menu")) {
        menuRender(target);
    }
    if (
        target.classList.contains("icon-search") ||
        target.classList.contains("bar-element-search") ||
        target.classList.contains("search")
    ) {
        htmlTitle = `<span class="icon-search"></span>`;
        // h2 id="search-title" class="search-title"></h2>
        // for (let i = 0;i < length;i++) {
        //
        // }

    }
    if (target.classList.contains("my-day") || target.classList.contains("icon-sun") ) {
        htmlTitle = `<span class="icon-sun"></span>
    Мой день`;
        for (let i = 0; i < length; i++) {
            if (checkOnNowDay(pageTasksList[i])) {
                tasks.push(pageTasksList[i]);
            }

        }
        tasksRender(tasks);
    }
    if (target.classList.contains("important") || target.classList.contains("icon-star")) {
        htmlTitle = `<span class="icon-star"></span>
    Важно`;
        for (let i = 0; i < length; i++) {
            if (checkOnImportant(pageTasksList[i])) {
                tasks.push(pageTasksList[i]);
            }

        }
        tasksRender(tasks);
    }
    if (target.classList.contains("scheduled") || target.classList.contains("icon-calendar")) {
        htmlTitle = `<span class="icon-calendar"></span>
        Запланиравано`;
        for (let i = 0; i < length; i++) {
            if (!checkForFutureTask(pageTasksList[i])) {
                tasks.push(pageTasksList[i]);
            }
        }
        let dates = checkDateInTasks();
        tasksRender(tasks);
    }
    if (target.classList.contains("menu-tasks") || target.classList.contains("icon-tasks")) {
        htmlTitle = `<span class="icon-tasks"></span>
        Задачи`;
        for (let i = 0; i < length; i++) {
            tasks.push(pageTasksList[i]);
        }
        tasksRender(tasks);

    }
    if (target.classList.contains("not-passed") || target.classList.contains("icon-trash-o")) {
        htmlTitle = `<span class="icon-trash-o"></span>
        Не пройденные`;
        // console.log("+");
        for (let i = 0; i < length; i++) {
            // console.log("++");
            if (checkForFailedTask(pageTasksList[i])) {
                // console.log("+++");
                tasks.push(pageTasksList[i]);
            }

        }
        tasksRender(tasks);

    }
    if (!target.classList.contains("menu")) {
        dom.title.innerHTML = htmlTitle;
    }
};

//Функция изменения навигационного меню
function menuRender(target) {
    document
        .querySelectorAll(".menu .selected")
        .forEach((element) => element.classList.remove("selected"));
    if (
        target.classList.contains("icon-search") ||
        target.classList.contains("bar-element-search") ||
        target.classList.contains("icon-tasks") ||
        target.classList.contains("icon-sun") ||
        target.classList.contains("icon-star") ||
        target.classList.contains("icon-calendar") ||
        target.classList.contains("icon-trash-o")
    ) {
        target.parentElement.classList.add("selected");
    } else {
        target.classList.add("selected");
    }
}



// Функции выполнения запросов
function sendRequestAdd(task) {
    let token = document.getElementById("csrf").value;
    let nameToken = document.getElementById("csrf_name").value;
    const request = new XMLHttpRequest();
    request.open('POST', '/savetask', true);
    request.setRequestHeader("Content-type", "application/json; charset=utf-8");
    request.setRequestHeader(nameToken, token);
    let json = JSON.stringify(task);
    request.send(json);
}

function sendRequestDelete(task) {
    let token = document.getElementById("csrf").value;
    let nameToken = document.getElementById("csrf_name").value;
    const request = new XMLHttpRequest();
    request.open('POST', '/deletetask', true);
    request.setRequestHeader("Content-type", "application/json; charset=utf-8");
    request.setRequestHeader(nameToken, token);
    let json = JSON.stringify(task);
    request.send(json);
}

function sendRequestEdit(task) {
    let token = document.getElementById("csrf").value;
    let nameToken = document.getElementById("csrf_name").value;
    const request = new XMLHttpRequest();
    request.open('POST', '/edittask', true);
    request.setRequestHeader("Content-type", "application/json; charset=utf-8");
    request.setRequestHeader(nameToken, token);
    let json = JSON.stringify(task);
    request.send(json);
}

function sendRequest(){
    const request = new XMLHttpRequest();
    request.open('GET', '/alltasks');
    request.setRequestHeader("Content-type", "application/string; charset=utf-8");
    request.send();
    request.addEventListener("load" , function ()  {
        if(request.status == 200 ) {
            let data = JSON.parse(request.response);
            // data.forEach(function(el) {
            //     lastTaskId++;
            //     addTaskFromJson(el, tasks);
            // })
            let size = data.length;
            for(let i = 0;i < size;i++) {
                addTaskFromJson(data[i], tasks);
            }
            // addTaskFromJson(data, tasks);
            // console.log(data);
        } else {
            console.error("Что-то пошло не так");
        }
    });
    // tasksRender(tasks);
    // console.log(tasks);
}



//Фильтрации списков задач
function checkOnNowDay(task) {
    if(task.dateTime == localDate) {
        return false;
    }
    task.dateTime = task.dateTime.replace("59.000Z","00");
    if (new Date().getDate() == new Date(task.dateTime).getDate() &&
        new Date().getMonth() == new Date(task.dateTime).getMonth() &&
        new Date().getFullYear() == new Date(task.dateTime).getFullYear()) {
        return true;
    }
    return false;
}
function checkOnTommorowDay(task) {
    if(task.dateTime == localDate) {
        return false;
    }
    task.dateTime = task.dateTime.replace("59.000Z","00");
    var currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    if (currentDate.getDate() == new Date(task.dateTime).getDate() &&
        currentDate.getMonth() == new Date(task.dateTime).getMonth() &&
        currentDate.getFullYear() == new Date(task.dateTime).getFullYear()) {
        return true;
    }
    return false;
}

function checkOnImportant(task) {
    if (task.isImportant) {
        return true;
    }
    return false;
}

function checkForFailedTask(task) {
    if (task.isComplete) {
        return false;
    } else if (task.dateTime == localDate || task.dateTime == "1969-12-31T21:00:00") {
        return false;
    } else if (new Date().getFullYear() > new Date(task.dateTime).getFullYear()) {
        return true;
    } else if (new Date().getFullYear() < new Date(task.dateTime).getFullYear()) {
        return false;
    } else if (new Date().getMonth() > new Date(task.dateTime).getMonth()) {
        return true;
    } else if (new Date().getMonth() < new Date(task.dateTime).getMonth()) {
        return false;
    } else if (new Date().getDate() > new Date(task.dateTime).getDate()) {
        return true;
    } else if (new Date().getDate() < new Date(task.dateTime).getDate()) {
        return false;
    } else if(new Date().getHours() > new Date(task.dateTime).getHours()) {
        return true;
    } else if (new Date().getHours() < new Date(task.dateTime).getHours()) {
        return false;
    } else if(new Date().getMinutes() > new Date(task.dateTime).getMinutes()) {
        return true;
    } else if (new Date().getMinutes() < new Date(task.dateTime).getMinutes()) {
        return false;
    }
    return false;
}

function checkForFutureTask(task) {
    if (task.dateTime == localDate || task.dateTime == "1969-12-31T21:00:00") {
        return false;
    } else if (new Date().getFullYear() > new Date(task.dateTime).getFullYear()) {
        return true;
    } else if (new Date().getFullYear() < new Date(task.dateTime).getFullYear()) {
        return false;
    } else if (new Date().getMonth() > new Date(task.dateTime).getMonth()) {
        return true;
    } else if (new Date().getMonth() < new Date(task.dateTime).getMonth()) {
        return false;
    } else if (new Date().getDate() > new Date(task.dateTime).getDate()) {
        return true;
    } else if (new Date().getDate() < new Date(task.dateTime).getDate()) {
        return false;
    } else if(new Date().getHours() > new Date(task.dateTime).getHours()) {
        return true;
    } else if (new Date().getHours() < new Date(task.dateTime).getHours()) {
        return false;
    } else if(new Date().getMinutes() > new Date(task.dateTime).getMinutes()) {
        return true;
    } else if (new Date().getMinutes() < new Date(task.dateTime).getMinutes()) {
        return false;
    }
    return false;
}

function checkDateInTasks() {
    let dates = [];
    let length = pageTasksList.length;

    for (let i = 0;i < length; i++) {
        let dateTask = new Date(pageTasksList[i].dateTime).getDate().toString() + ":" +
        new Date(pageTasksList[i].dateTime).getMonth().toString() + ":" +
        new Date(pageTasksList[i].dateTime).getFullYear().toString();
        if (!dates.includes(dateTask)) {
            dates.push(dateTask);
        }
    }
    return dates;
}

function equalsTwoDate(firstTask, secondTask) {
    if (firstTask.dateTime == localDate || firstTask.dateTime == "1969-12-31T21:00:00") {
        return false;
    } else if (new Date(firstTask.dateTime).getFullYear() > new Date(secondTask.dateTime).getFullYear()) {
        return true;
    } else if (new Date(firstTask.dateTime).getFullYear() < new Date(secondTask.dateTime).getFullYear()) {
        return false;
    } else if (new Date(firstTask.dateTime).getMonth() > new Date(secondTask.dateTime).getMonth()) {
        return true;
    } else if (new Date(firstTask.dateTime).getMonth() < new Date(secondTask.dateTime).getMonth()) {
        return false;
    } else if (new Date(firstTask.dateTime).getDate() > new Date(secondTask.dateTime).getDate()) {
        return true;
    } else if (new Date(firstTask.dateTime).getDate() < new Date(secondTask.dateTime).getDate()) {
        return false;
    } else if(new Date(firstTask.dateTime).getHours() > new Date(secondTask.dateTime).getHours()) {
        return true;
    } else if (new Date(firstTask.dateTime).getHours() < new Date(secondTask.dateTime).getHours()) {
        return false;
    } else if(new Date(firstTask.dateTime).getMinutes() > new Date(secondTask.dateTime).getMinutes()) {
        return true;
    } else if (new Date(firstTask.dateTime).getMinutes() < new Date(secondTask.dateTime).getMinutes()) {
        return false;
    }
    return false;
}


function sortListFromDate(list) {
    let length = list.length;
    for (let i = 0;i < length - 1; i++) {
        for (let j = i + 1; j < length; j++) {
            if (equalsTwoDate(list[i], list[j])) {
                [list[i],list[j]] = [list[j],list[i]];
            }
        }
    }
    // console.log(list);
}

function findTask() {
    let length = tasks.length;
    for (let i = 0;i < length; i++) {
        tasks.pop();
    }
    let inputValue = document.getElementById("search-input").value;
    pageTasksList.forEach(task => {
        if(task.title.toLowerCase().includes(inputValue.toLowerCase())) {
            tasks.push(task);
        }
    });
    ;
    tasksRender(tasks);
    dom.title.innerHTML = `<span class="icon-search"></span>
                    ${inputValue}`;
}

function saveDescription(id) {
    let length = pageTasksList.length;
    let inputDescription = document.getElementById("Description:" + id).value;
    // console.log(inputDescription.value);
    for (let i = 0; i < length;i++) {
        if (pageTasksList[i].id == id) {
            pageTasksList[i].description = inputDescription.replace(',', '');
            sendRequestEdit(pageTasksList[i]);
            break;
        }
    }
}
