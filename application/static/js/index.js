const popup = Vue.component('popup', {
    template: `
    <v-dialog
        v-model="show"
        v-on:close="show = false"
        v-bind:width="width"
    >
        <v-card>
            <div
                v-for="(section, i) in sections"
                v-bind:key="i"
            >
                <v-card-title>{{ section.title }}</v-card-title>
                <v-card-text v-html="section.body">
                </v-card-text>
                <v-divider v-if="i != sections.length - 1" class="mx-4"></v-divider>
            </div>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="show = false">Ok</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    `,
    props: {
        value: Boolean,
        sections: Array,
        width: String
    },

    computed: {
        show: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit('input', value);
            }
        }
    }
})

class Snack {
    constructor(name, text, isVisible = true, timeout = 6000) {
        this.name = name;
        this.text = text;
        this.isVisible = isVisible;
        this.timeout = timeout;
    }
}

const snackbar = Vue.component('snackbar', {
    template: `
        <v-snackbar
            v-model="snack.isVisible"
            v-bind:timeout.number="snack.timeout"
            v-bind:color="snack.color"
            v-bind:bottom="true"
          >
            {{ snack.text }}
            <v-btn
              dark
              text
              @click="snack.isVisible = false"
            >
              Close
            </v-btn>
          </v-snackbar>
    `,
    props: {
        snack: Object
    },
})

const toolbar = Vue.component('toolbar', {
        template: `
        <v-card tile>
            <v-toolbar class="elevation-0">
                <v-toolbar-title>Photochnaja</v-toolbar-title>
                <v-spacer></v-spacer>
                <div v-if="isAuthenticated">
                    <v-btn
                        v-on:click="uploadFileButton"
                        outlined
                        small
                        color="indigo"
                    >
                    <v-icon>mdi-plus</v-icon>
                    </v-btn>
                    <input
                        v-on:change="uploadFileInput"
                        ref="inputUploadFileRef"
                        hidden
                        type="file"
                        multiple
                        accept="image/*"
                    />
                </div>
                <v-menu :offset-y="true">
                    <template v-slot:activator="{ on }">
                        <v-btn
                            v-on="on"
                            icon
                        >
                        <v-icon>mdi-dots-vertical</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item
                            v-for="(item, i) in menu.menuItems"
                            v-bind:key="i"
                            v-on:click="item.method"
                            v-if="item.isVisible()"
                        >
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
                <popup
                    v-model="showAboutPopup"
                    v-bind:sections="cards['aboutCard'].sections"
                    width="480px"
                ></popup>
            </v-toolbar>
        </v-card>
        `,
        data() {
            return {
                menu: {
                    menuItems: [
                        {
                            title: 'About',
                            method: this.menuAbout,
                            isVisible: () => true
                        },
                        {
                            title: 'Logout',
                            method: this.logout,
                            isVisible: () => (!!store.getters.jwtToken)
                        }
                    ],
                },
                cards: {
                    aboutCard: {
                        sections: [
                            {
                                title: 'Photochnaja',
                                body: 'Photochnaja is a web application for storing your cards. Each card represents a kind of memory. The card consists of a photograph, title, subtitle and description of the memory.'
                            },
                            {
                                title: 'Features',
                                body: `
                                        <ul>
                                            <li>Download and save the card</li>
                                            <li>Edit the card (editing the image, title, subtitle and description)</li>
                                            <li>Download image from card</li>
                                        </ul>
                                    `
                            },
                            {
                                title: 'Authors',
                                body: `
                                        <ul>
                                            <li>Pavel Amelkov</li>
                                            <li>Oleg Bobrov</li>
                                            <li>Kirill Tolkun</li>
                                        </ul>
                                    `
                            }
                        ]
                    }
                },
                showAboutPopup: false
            }
        },
        computed: {
            isAuthenticated: function () {
                return !!store.getters.jwtToken;
            }
        },
        methods: {
            menuAbout: function (event) {
                this.showAboutPopup = true;
            },
            uploadFileButton: function (event) {
                this.$refs.inputUploadFileRef.click();
            },
            uploadFileInput: function (event) {
                let files = event.target.files || event.dataTransfer.files;
                let length = files.length;
                formData = new FormData();
                for (var i = 0; i < files.length; i++) {
                    formData.append(`file[${i}]`, files[i]);
                    formData.append('login', 'testLogin');
                }
                axios
                    .post('http://127.0.0.1:5000/test', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': `Bearer ${this.$store.getters.jwtToken}`
                        }
                    })
                    .then(response => {
                        store.dispatch('setSnack', new Snack('upload', response.data.number_files + ' files were uploaded'))
                    });
                event.target.value = '';
            },
            logout: function (event) {
                this.$store.dispatch('setJwtToken', '');
            }
        }
    }
)

const signupForm = Vue.component('signup-form', {
    template: `
        <form
            v-on:submit.prevent="signup"
            class="mx-auto"
            id="signup-form"
            method="post"
        >
            <v-text-field
                v-model="email"
                type="email"
                name="email"
                placeholder="Email"
                required/>
            <v-text-field
                v-model="login"
                type="text"
                name="login"
                placeholder="Login"
                required/>
            <v-text-field
                v-model="password"
                type="password"
                name="password"
                placeholder="Password"
                required/>
            <v-btn
                block
                large
                outlined
                color="primary"
                form="signup-form"
                type="submit">
                Sing up
            </v-btn>
            <slot></slot>
        </form>
    `,
    data() {
        return {
            email: '',
            login: '',
            password: ''
        };
    },
    methods: {
        signup: function (event) {
            axios
                .post('http://127.0.0.1:5000/signup', {
                    'email': this.email,
                    'login': this.login,
                    'password': this.password
                })
                .then(response => {
                    if (response.status === 201) {
                        this.$emit('registered', response.data);
                    }
                })
        }
    }
})

const signinForm = Vue.component('signin-form', {
    template: `
        <form
            v-on:submit.prevent="signin"
            class="mx-auto"
            id="signin-form"
            method="post">
            <v-text-field
                v-model="login"
                type="text"
                name="login"
                placeholder="Login"
                required/>
            <v-text-field
                v-model="password"
                type="password"
                name="password"
                placeholder="Password"
                required/>
            <v-btn
                block
                large
                outlined
                color="primary"
                form="signin-form"
                type="submit">
                Sign in
            </v-btn>
            <v-alert
                dismissible
                v-model="alert.isVisibleAlert"
                v-bind:type="alert.alertType"
                class="mt-5"
                transition="scale-transition"
            >{{ alert.alertBody }}</v-alert>
            <slot></slot>
        </form>
    `,
    data() {
        return {
            login: '',
            password: '',
            alert: {
                isVisibleAlert: false,
                alertType: 'info',
                alertBody: ''
            }
        };
    },
    methods: {
        signin: function (event) {
            axios
                .post('http://127.0.0.1:5000/signin', {
                    'login': this.login,
                    'password': this.password
                })
                .then(response => (
                    this.$store.dispatch('setJwtToken', response.data.token)
                ))
                .catch(reason => {
                    this.alert.isVisibleAlert = true
                    this.alert.alertType = 'error'
                    this.alert.alertBody = reason.response.data.message
                });
        }
    }
});

const entryFormCard = Vue.component('entry-form-card', {
    template: `
     <v-card
        class="mx-auto"
        max-width="490"
     >
        <v-card-title class="title font-weight-regular justify-space-between">
            <span>{{ currentTitle }}</span>
        </v-card-title>

        <v-window v-model="step" class="pa-5">
            <v-window-item :value="1" >
                <signin-form>
                    <div class="mt-5">
                        New to Photochnaja?
                        <a v-on:click="step++; currentTitle='Sign up'">Join now</a>
                    </div>
                </signin-form>
            </v-window-item>

            <v-window-item :value="2">
                <signup-form v-on:registered="step--"">
                    <div class="mt-5">
                        Already on Photochnaja?
                        <a v-on:click="step--; currentTitle='Sign in'">Sign in</a>
                    </div>
                </signup-form>
            </v-window-item>
        </v-window>

        <v-divider></v-divider>
    </v-card>
    `,
    data() {
        return {
            currentTitle: 'Sign in',
            step: ''
        };
    }
})

const footer = Vue.component('ph-footer', {
    template: `
        <v-footer fixed>
            <v-spacer></v-spacer>
            <div>&copy; {{new Date().getFullYear()}}</div>
        </v-footer>
    `
})

Vue.use(Vuex)
const store = new Vuex.Store({
    plugins: [window.createPersistedState({
        paths: ['jwtToken'],
        storage: window.sessionStorage
    })],
    state: {
        jwtToken: '',
        snacks: {
            'upload': {}
        }
    },
    actions: {
        setJwtToken({commit}, jwtToken) {
            commit('SET_JWT_TOKEN', jwtToken);
        },
        setSnack({commit}, snack) {
            commit('SET_SNACK', snack);
        }
    },
    mutations: {
        SET_JWT_TOKEN(state, jwtToken) {
            state.jwtToken = jwtToken;
        },
        SET_SNACK(state, snack) {
            state.snacks[snack.name] = snack;
        }
    },
    getters: {
        jwtToken(state) {
            return state.jwtToken;
        },
        snacks(state) {
            return state.snacks;
        }
    },
    modules: {}
})

var app = new Vue({
    el: '#app',
    store,
    vuetify: new Vuetify(),
    computed: {
        isAuthenticated: function () {
            return !!this.$store.getters.jwtToken;
        },
        snacks: function () {
            return this.$store.getters.snacks;
        }
    }
});