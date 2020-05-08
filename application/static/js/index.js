const toolbar = Vue.component('toolbar', {
        template: `
        <v-card tile>
            <v-toolbar class="elevation-0">
                <v-toolbar-title>Photochnaja</v-toolbar-title>
                <v-spacer></v-spacer>
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
                            v-on:click.stop="item.method"
                        >
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-toolbar>
        </v-card>
        `,
        data() {
            return {
                menu: {
                    menuItems: [
                        {title: 'About', method: this.menuAbout}
                    ]
                },
                showAboutPopup: false
            }
        },
        methods: {
            menuAbout: function (event) {
            },
        }
    }
)

var app = new Vue({
    el: '#app',
    vuetify: new Vuetify(),
});