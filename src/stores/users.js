import { defineStore } from 'pinia'

export const useUsersStore = defineStore('users', {
    state: () => ({
        users: [
            {
                id: 1,
                name: 'Ivan',
                phone: '+898968685',
                level: 1,
                subs: [],
            },

            {
                id: 2,
                name: 'Maria',
                phone: '+6974674',
                level: 1,
                subs: [],
            }
        ],

        currentUser: {
            id: null,
            name: null,
            phone: null,
            level: null,
            subs: [],
            head: {
                id: null,
                name: null,
                level: null,
            },
        },
    }),

    actions: {
        addUser() {
            let newUser = {
              id: this.users.length + 1,
              name: this.currentUser.name,
              phone: this.currentUser.phone,
              level: this.currentUser.level,
              head: {
                id: this.currentUser.head.id,
                name: this.currentUser.head.name,
                level: this.currentUser.head.level,
                },
              subs: [],
            }

            if (newUser.head.id) {
                const head = this.users.find(user => user.id == newUser.head.id);
                newUser.head.name = head.name;
                newUser.head.level = head.level;

                newUser.level = head.level + 1;

                head.subs.push(newUser.id);

                const headIndex = this.users.indexOf(this.users.find(user => user.id == newUser.head.id), 0);
                this.users.splice(headIndex + 1, 0, newUser);

            } else {
                newUser.level = 1,
                this.users.push(newUser);
            }

            localStorage.setItem('users', JSON.stringify(this.users))
        },

        sortByName() {
            const sorted = this.users.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

            sorted.forEach((user) => {
                if (user.level === 1) {
                    recursiveSort(user);
                }

                function recursiveSort(thisUser) {
                    if (thisUser.subs.length > 0) {
                        const subs = [];

                        thisUser.subs.forEach((subId) => {
                            const sub = sorted.find(thisSub => thisSub.id == subId);
                            subs.push(sub);
                            sorted.splice(sorted.indexOf(sub), 1);
                        })

                        subs.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())).reverse();

                        subs.forEach((sub) => {
                            sorted.splice(sorted.indexOf(thisUser) + 1, 0, sub);
                        })

                        subs.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

                        subs.forEach((sub) => {
                            if (sub.subs) {
                                recursiveSort(sub);
                            };
                        })
                    }
                }
            })
        },
    },
})