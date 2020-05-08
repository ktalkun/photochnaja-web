const toolbar = Vue.component('toolbar', {
        template: `
        <v-card tile>
            <v-toolbar class="elevation-0">
                <v-toolbar-title>Photochnaja</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>
        </v-card>
        `,
    }
)

var app = new Vue({
    el: '#app',
    vuetify: new Vuetify(),
});