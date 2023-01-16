<#import "blocks/template.ftlh" as t>
<@t.template user>


    <div class="information-container">

        <div class="information-field">

        </div>
        <div class="authorization-buttons">
            <form action="/tasks" method="get" >
                <button type="submit" style="width: 100%" class="btn btn-dark btn-registration">Приложение</button>
                <input type="hidden" name="_csrf" value="${_csrf.token}">
            </form>
                <a href="/profile">
                    <button type="submit" style="width: 100%" class="btn btn-dark btn-login">Профиль</button>
                    <input type="hidden" name="_csrf" value="${_csrf.token}">
                </a>
            <form action="/logout" method="post" >
                    <button type="submit" style="width: 100%" class="btn btn-dark btn-registration">Выход</button>
                    <input type="hidden" name="_csrf" value="${_csrf.token}">
            </form>
        </div>
    </div>

</@t.template>