<template>
    <v-container>
        <div v-for="module in modules" :key="module.name">
            <h2>{{module.name}}</h2>
            <ul>
                <li v-for="folder in module.folders" :key="folder.name">
                    {{folder.name}}
                </li>
            </ul>
        </div>
    </v-container>
</template>

<script lang="ts">
    import { Component, Emit, Prop, Vue } from 'vue-property-decorator'
    import { IModuleData } from "@/data/models";
    import LocalStorageServer from "@/data/localStorageServer";

    @Component({})
    export default class HelloWorld extends Vue {
        @Prop() msg!: string;

        modules: IModuleData[];

        constructor() {
            super();
            const server = new LocalStorageServer();
            this.modules = server.getData();
        }

        @Emit('something2')
        saySomething() {
            this.$emit('anything');
        }
    }

</script>
