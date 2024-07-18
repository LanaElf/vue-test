<template>
    <dialog id="addUserModal" class="add-user-modal">
      <form method="dialog" >
          <button class="modal-close-button">
            х
          </button>

          <div class="modal-header">Добавление пользователя</div>

          <div class="add-user-container">
            <div class="user-param">
                <label for="newUserName" class="user-param__label">Имя</label>
                <input id="newUserName" class="user-param__field"
                       v-model="usersStore.currentUser.name"
                />
                </div>

                <div class="user-param">
                  <label for="newUserName" class="user-param__label">Телефон</label>
                  <input id="newUserName" class="user-param__field"
                         v-model="usersStore.currentUser.phone"
                  />
                </div>

                <div class="user-param">
                  <label for="selectHead" class="user-param__label">Начальник</label>
                  <select id="selectHead" class="user-param__field"
                          v-model="usersStore.currentUser.head.id"
                  >
                    <option></option>
                    <option v-for="user in usersStore.users" v-bind:value=user.id >
                      {{ user.name }}
                    </option>
                  </select>
                </div>
            </div>

            <button @click="usersStore.addUser" class="blue-button modal-save-button">Сохранить</button>
      </form>
    </dialog>
</template>

<script>
import { useUsersStore } from '@/stores/users'

export default {
  name: 'AddUserModal',

  data () {
    return {
      usersStore: useUsersStore(),
    }
  },
}
</script>

<style scoped>
.add-user-modal {
  border-radius: 6px;
  border: none;
  position: relative;
  padding: 0;
}
.add-user-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 40px;
}
.modal-close-button {
  position: absolute;
  right: 15px;
  top: 15px;
  border-radius: 50%;
  color: #00a0e3;
  font-weight: 600;
  background-color: #fff;
  border: none;
  width: 20px;
  height: 20px;
}
.modal-header {
  color: #fff;
  background: #00a0e3;
  font-weight: 600;
  font-size: 1.1em;
  padding: 15px;
  width: 350px;

}
.user-param {
    display: grid;
    grid-template-columns: 1fr 2fr;
}
.user-param__label {
    text-align: right;
    padding-right: 10px;
    align-self: center;
}
.user-param__field {
    line-height: 25px;
    border-radius: 6px;
    border: 2px solid #00a0e3;
}
select.user-param__field {
    height: 30px;
}
select.user-param__field option {
    font-size: 14px;
}
.modal-save-button {
    margin-bottom: 40px;
    padding: 10px 15px;
}
</style>