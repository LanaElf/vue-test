<template>
  <div class="container">
    <h2>Пользователи</h2>

    <button @click="openAddModal" class="add-user-button blue-button">Добавить</button>

    <ul class="users">
      <li class="users-header user">
        <div @click="usersStore.sortByName()" class="user-name" title="Сортировка по алфавиту">Имя</div>
        <div class="user-phone">Телефон</div>
        <div class="user-head">Начальник</div>
        <div class="user-head">Подчиненные</div>
      </li>
      <li v-for="user in usersStore.users" class="user-container">
        <div :id=user.id class="user" :class="{ sub: hasHead(user) }">
          <div class="user-name" :style="{
            'margin-left': 10*(user.level - 1) + 'px',
            'border-left': 2*(user.level - 1) + 'px solid #00a0e3',
            }">{{ user.name }}</div>
          <div class="user-phone">{{ user.phone }}</div>
          <div class="user-head">
            <button v-if="hasHead(user)" @click="showHead(user.head.id)" class="show-button blue-button">
              {{ user.head.name }}
            </button>
          </div>
          <div class="user-subs">
            <button v-if="hasSubs(user)" @click="showSubs(user.subs)" class="show-button blue-button">
              Показать
            </button>
          </div>
        </div>
      </li>
    </ul>

    <div class="explanation">
      <p>Пытаясь реализовать неограниченную вложенность, я пришла к имитации вложенности - вложенности фактически нет,
      но в каждом объекте-пользователе хранятся id, имя и уровень начальника (level, самый высокий уровень - 1, глубже - увеличивается на 1), и массив с id подчиненных.</p>
      <p>При добавлении новый подчиненный встает сразу под начальником.</p>
      <p>Величина отступа и толщина бордера вычисляются по значению level.</p>
      <p>Cделала кнопки для нахождения и визуального выделения начальника и подчиненных. Мне кажется так удобнее, потому что из-за вложенностей бывает трудно сходу найти беглым взглядом всех подчиненных одного уровня, например.</p>
      <p>Предположила, что отсутствие реальных вложенностей и необходимости в рекурсивном компоненте может хорошо сказаться на производительности.
        Хотя, вероятно, может создать другие проблемы.</p>
    </div>

    <AddUserModal/>
  </div>
</template>

<script>
import { useUsersStore } from '@/stores/users'
import  AddUserModal  from '@/components/AddUserModal'

export default {
  name: 'Users',
  components: {
    AddUserModal: AddUserModal,
  },

  data () {
    return {
      usersStore: useUsersStore(),
    }
  },

  methods: {
    openAddModal() {
      document.getElementById('addUserModal').showModal();
    },

    hasHead(user) {
      if (user.head) {
        return user.head.id ? true : false;
      } else {
        return false;
      }
    },

    hasSubs(user) {
      return user.subs.length > 0 ? true : false;
    },

    showHead(headId) {
      document.querySelectorAll('.user').forEach((user) => {
        user.classList.remove('detectedHead');
        user.classList.remove('detectedSub');
      });

      document.getElementById(headId).classList.add('detectedHead');
    },

    showSubs(subs) {
      document.querySelectorAll('.user').forEach((user) => {
        user.classList.remove('detectedSub');
        user.classList.remove('detectedHead');
      })

      subs.forEach((subId) => {
        document.getElementById(subId).classList.add('detectedSub');
      })
    },
  },

  mounted() {
    if (localStorage.getItem('users')) {
      try {
        this.usersStore.users = JSON.parse(localStorage.getItem('users'));
      } catch(e) {
        localStorage.removeItem('users');
      }
    };
  },
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
a {
  color: #42b983;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.users {
  width: 650px;
  display: flex;
  flex-direction: column;
  border: 3px solid #00a0e3;
  border-radius: 6px;

}
.user {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  width: 100%;
  align-items: center;
  transition: 0.3s
}
.sub.user {
  background: #d5eff3;
}
.user.detectedHead {
  background: pink;
}
.user.detectedSub {
  background: yellow;
}
.users > :not(:last-child) {
  border-bottom: 3px solid #00a0e3;
}
.users-header {
  color: #fff;
  font-weight: 600;
  background-color: #00a0e3;
}
.users-header .user-name {
  cursor: pointer;
}
.user-name,
.user-phone,
.user-head,
.user-subs {
  padding: 10px;
  box-sizing: border-box;
  height: 100%;
}
.user-name,
.user-phone,
.user-head {
  border-right: 3px solid #00a0e3;
}

.add-user-button {
  margin-bottom: 20px;
  padding: 10px 20px;
}
.show-button {
  padding: 3px 10px;
}

.explanation {
  width: 650px;
  margin: 40px 0;
  line-height: 1.5em;
}
</style>
