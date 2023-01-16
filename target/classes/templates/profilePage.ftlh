<#import "blocks/templateOfUserPage.ftlh" as t>
<@t.template user>
    <div class="page-body">
        <div id="page-title" class="todo-title">
            <span class="icon-user"></span>
            Профиль
        </div>
        <div class="settings">
<#--            <form action="/savephoto" method="post" enctype="multipart/form-data">-->
<#--                <div class="profile-image">-->
<#--                <h2>Фото профиля</h2>-->

<#--                <div class="image-avatar">-->
<#--                -->
<#--                    Avatar-->

<#--                    <img src="/images/${user.avatar.id}" alt="avatar" />-->
<#--                </div>-->

<#--                <div class="edit-photo">Изменить фото</div>-->
<#--                </div>-->
<#--                <div class="profile-image">-->
<#--                    <div class="file_upload">-->
<#--                        <div>Файл не выбран</div>-->
<#--                        <input type="file" name="file" id="input-image" />-->
<#--                        <!-- <div class="edit-photo">Изменить фото</div> &ndash;&gt;-->
<#--                        <button>Выбрать</button>-->
<#--                    </div>-->
<#--                    <button type="submit" class="edit-photo">Изменить</button>-->

<#--                </div>-->
                <input type="hidden" name="_csrf" value="${_csrf.token}"/>
<#--            </form>-->
            <form action="/edit" method="post">
                <div class="profile-data">
<#--                    <form action="/registration" method="post">-->
                        <h2>Почта:</h2>
                        <div class="input-data">
    <#--                        <input-->
    <#--                                type="text"-->
    <#--                                placeholder="Введите почту"-->
    <#--                                value="${user.email}"-->
    <#--                        />-->
                            <h2 name="email" required id="email">${user.email}</h2>
                        </div>
    <#--                    <h2>Номер телефона:</h2>-->
    <#--                    <div class="input-data">-->
    <#--                        <input-->
    <#--                                type="text"-->
    <#--                                placeholder="Введите номер телефона"-->
    <#--                                value="${user.phoneNumber}"-->
    <#--                        />-->
    <#--                    </div>-->
                    <hr>
                    <div class="input-data">
                        <h2>Логин:</h2>
                        <h2 name="name" required id="name">${user.name}</h2>
<#--
<#--                            <input type="text" placeholder="Введите логин" value="${user.name}" required id="name" name="name"/>-->
                    </div>


<#--                        <h2>Старый пароль:</h2>-->
    <#--                    <div class="input-data">-->
    <#--                        <input-->
    <#--                                type="password"-->
    <#--                                placeholder="Введите старый пароль"-->
    <#--                        />-->
    <#--                    </div>-->


    <#--                    <h2>Новый пароль:</h2>-->
    <#--                    <div class="input-data">-->
    <#--                        <input-->
    <#--                                type="password"-->
    <#--                                placeholder="Введите новый пароль"-->
    <#--                        />-->
    <#--                    </div>-->


<#--                    </form>-->
<#--                    <#if errorMessage??>-->
<#--                        <h2 style="color: red">${errorMessage}</h2>-->
<#--                    </#if>-->
<#--                    <input type="hidden" name="_csrf" value="${_csrf.token}">-->
<#--                    <button class="submit-button" type="submit">Сохранить</button>-->
                </div>
            </form>
            <div class="profile-tasks profile-data">
                <h2>Количество всех задач</h2>
                <#if tasksLength != 0>
                    <h2>${tasksLength}</h2>
                    <#else >
                    <h2>Задачи отсутствуют</h2>
                </#if>
                <hr>
<#--                <h2>Количество важных задач</h2>-->
<#--                <h2></h2>-->
<#--                <hr>-->
<#--                <h2>Количество не пройденных задач</h2>-->
<#--                <h2></h2>-->
            </div>
        </div>
    </div>
</@t.template>