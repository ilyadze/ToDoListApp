<#macro template user>
    <!doctype html>
    <html lang="ru">
    <head>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <link rel="stylesheet" href="/static/css/loginStyle.css">
        <link rel="icon" href="/static/images/favicon.png" />

        <title>ToDoList</title>
    </head>
    <body>
    <nav class="navbar">
        <div class="container-fluid">
<#--            <a href="/">-->
                <span class="navbar-brand mb-0 h1">ToDoList</span>
<#--            </a>-->
            <div>
                <#if user.email??>
                    <div class="dropdown text-end">
                        <a href="/profile">
                            <img src="/static/images/avatar.png" alt="mdo"
                                 width="32" height="32" class="rounded-circle">
                        </a>
                    </div>
                <#else>
                    <button class="btn btn-light" type="button"
                            onclick="window.location.href = '/login'">
                        Войти
                    </button>
                </#if>
            </div>
        </div>
    </nav>
    <div class="container">
        <#nested/>
    </div>

    </body>
    </html>
</#macro>
