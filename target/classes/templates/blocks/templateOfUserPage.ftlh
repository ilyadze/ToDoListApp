<#macro template user>
    <!doctype html>
    <html lang="ru">
    <head>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <link rel="stylesheet" href="/static/css/style.css">
        <link rel="stylesheet" href="/static/css/fonts.css" />
        <link rel="icon" href="/static/images/favicon.png" />

        <title>ToDoList</title>
    </head>
    <body>

    <div class="container">
        <nav id="todo-menu" class="menu">

<#--            <a href="/profile">-->
                <button type="submit" class="user-button">
                    <div class="user-account">
                        <span class="icon-user"></span>
                        ${user.name}

                    </div>

                </button>
<#--            </a>-->
            <a href="/tasks">
            <div class="bar-element search">
                <span class="icon-search"></span>
                <input
                        class="bar-element-search"
                        type="text"
                        placeholder="Поиск задачи"
                />
            </div>
            </a>
            <a href="/tasks">
                <div class="bar-element menu-tasks">
                    <span class="icon-tasks"></span>
                    Задачи
                </div>
            </a>
            <a href="/tasks">
            <div class="bar-element my-day">
                <span class="icon-sun"></span>
                Мой день
            </div>
            </a>

            <a href="/tasks">
            <div class="bar-element important">
                <span class="icon-star"></span>
                Важно
            </div>
            </a>
            <a href="/tasks">
            <div class="bar-element scheduled">
                <span class="icon-calendar"></span>
                Запланировано
            </div>
            </a>
            <a href="/tasks">
            <div class="bar-element not-passed">
                <span class="icon-trash-o"></span>
                Не пройденные
            </div>
            </a>
            <div class="group-tasks">

            </div>
            <div  class="bar-element exit" >
                <form action="/logout" method="post" >
                    <input type="hidden" name="_csrf" value="${_csrf.token}"/>
                    <button  type="submit" class="exit-button" >
                        Выйти из аккаунта
                    </button>
                </form>
            </div>
        </nav>
        <div>
            <#nested/>
        </div>

    </div>
<#--    <script src="js/script.js"></script>-->
    </body>
    </html>
</#macro>
