<#macro template user>
    <!doctype html>
    <html lang="ru">
    <head>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="_csrf" content="${_csrf.token}"/>
        <meta name="_csrf_header" content="${_csrf.headerName}"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <link rel="stylesheet" href="/static/css/style.css">
        <link rel="stylesheet" href="/static/css/fonts.css" />
        <link rel="icon" href="/static/images/favicon.png" />
<#--        &lt;#&ndash;Java script Vue&ndash;&gt;-->
<#--        <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>-->
<#--        <script src="https://cdn.jsdelivr.net/npm/vue-resource@1.5.1"></script>-->
        <title>ToDoList</title>
    </head>
    <body>

    <div class="container">
        <nav id="todo-menu" class="menu">

            <a href="/profile">
                <button type="submit" class="user-button">
                    <div class="user-account">
                        <span class="icon-user"></span>
                        ${user.name}

                    </div>

                </button>
                </a>

            <div class="bar-element search">
                <span class="icon-search"></span>
                <input
                        id = "search-input"
                        class="bar-element-search"
                        type="text"
                        placeholder="Поиск задачи"
                        onkeyup="findTask()"
                />
            </div>
            <div class="bar-element menu-tasks selected">
                <span class="icon-tasks"></span>
                Задачи
            </div>
            <div class="bar-element my-day">
                <span class="icon-sun"></span>
                Мой день
            </div>
            <div class="bar-element important">
                <span class="icon-star"></span>
                Важно
            </div>
            <div class="bar-element scheduled">
                <span class="icon-calendar"></span>
                Запланировано
            </div>

            <div class="bar-element not-passed">
                <span class="icon-trash-o"></span>
                Не пройденные
            </div>
            <div class="group-tasks">

            </div>
            <form action="/logout" method="post">
<#--                <div  class="bar-element exit" >-->

                        <input type="hidden" name="_csrf" value="${_csrf.token}"/>
                        <button  type="submit" class="exit-button bar-element exit" >
                            Выйти из аккаунта
                        </button>

<#--                </div>-->
            </form>
<#--            <div>-->
<#--                <button >-->

<#--                </button>-->
<#--            </div>-->
        </nav>
        <div>
            <#nested/>
        </div>

    </div>
    <script src="/static/js/script.js"></script>
    </body>
    </html>
</#macro>
