<#import "blocks/templateOfHomePage.ftlh" as t>
<@t.template user>
    <div class="page-body" id="page-body">
        <div id="page-title" class="todo-title">
            <span class="icon-sun"></span>
            Мой день
        </div>
        <div class="todo-new" id = "todo-new">
            <input id="new" type="text" placeholder="Новая задача" />
            <input id="csrf" type="hidden" name="_csrf" value="${_csrf.token}">
            <input id="csrf_name" type="hidden" name="_csrf" value="${_csrf.headerName}">
            <div id="add" class="todo-add">+</div>
        </div>
        <div id="tasks" class="todo-list">
        <#list tasks as task>

            <#if task.user.id == user.id>
            <div id="${task.id}" class="todo-task-container">
                <#if task.complete>
                <div class="todo-task todo-task-complete todo-task-changing">
                    <#else>
                <div  class="todo-task todo-task-changing">
                </#if>


                    <label class="todo-checkbox">
                         <#if task.complete>
                            <input type="checkbox" checked/>
                         <#else>
                             <input type="checkbox"/>
                         </#if>
                        <div class="todo-checkbox-div"></div>
                    </label>
                    <div class="todo-task-title">${task.title}</div>
                    <div class="todo-task-edit">...</div>
                </div>
            </div>
            </#if>

        <#else>
            <h1 style="text-align: center">Не найдено</h1>
        </#list>
        </div>
    </div>

        <#--    <h1 style="text-align: center">Личный кабинет</h1>-->
        <#--    <hr>-->
        <#--    <br>-->
        <#--    <div style="text-align: center">-->
        <#--        <img src="/static/images/avatar.png"-->
        <#--             style="border:2px solid black; border-radius: 20px" height="120">-->
        <#--        <div class="todo-new">-->
        <#--            <input id="new" type="text" placeholder="Новая задача" />-->
        <#--            <div id="add" class="todo-add">+</div>-->
        <#--        </div>-->
<#--            <div id="tasks" class="todo-list">-->

<#--                <div class="todo-task-container">-->

<#--                    <div  class="todo-task">-->
<#--                        <label class="todo-checkbox">-->
<#--                            <input type="checkbox"/>-->
<#--                            <div class="todo-checkbox-div"></div>-->
<#--                        </label>-->
<#--                        <div class="todo-task-title">${task.title}</div>-->
<#--                        <div class="todo-task-edit">...</div>-->
<#--                    </div>-->
<#--                </div>-->

<#--            </div>-->

<#--        <#if user.isAdmin()>-->
<#--            <a class="btn btn-dark mb-3" style="text-align: center; width: 100%"-->
<#--               href="/admin">-->
<#--                Панель администратора-->
<#--            </a><br>-->
<#--        </#if>-->
<#--        <a class="btn btn-dark mb-3" style="text-align: center; width: 100%"-->
<#--           href="/my/products">-->
<#--            Мои товары-->
<#--        </a>-->
<#--        <form action="/logout" method="post">-->
<#--&lt;#&ndash;            <input type="hidden" name="_csrf" value="${_csrf.token}"/>&ndash;&gt;-->
<#--            <button type="submit" style="text-align: center; width: 100%" class="btn btn-danger mb-2">-->
<#--                Выйти из аккаунта-->
<#--            </button>-->
<#--        </form>-->
<#--    </div>-->
</@t.template>