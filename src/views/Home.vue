<template>
  <div class="home">
    <v-form>
      <v-textarea append-icon="mdi-pencil"></v-textarea>
    </v-form>

    <HelloWorld msg="Welcome to Your Vue.ts App" @something2="notify('something')" @anything="notify('anything')"/>

    <v-btn dark @click="snackbar = true">Open Snackbar</v-btn>

    <v-snackbar
            v-model="snackbar"
    >
      this is a snack bar
      <v-btn
              color="pink"
              text
              @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>

  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {
  private snackbar = false;
  notify(msg: string) {
    console.log(msg);
    this.snackbar = true;
  }
}
</script>

