<template>
    <v-container>
        <v-row class="text-center">
            <v-col cols="12">
                <h1>This is an about page</h1>
                <div>{{msg}}</div>
                <div>{{upperMsg}}</div>
                <v-btn @click="changeMsg">Click Me</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">

    import { Component, Vue } from 'vue-property-decorator'

    @Component({})
    export default class About extends Vue {
        private msg = 'hello there';

        get upperMsg() {
            return this.msg.toUpperCase();
        }

        changeMsg() {
            this.msg = 'Hi Lilo!'
        }
    }
</script>
