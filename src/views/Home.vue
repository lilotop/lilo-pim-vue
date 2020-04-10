<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.ts App"/>

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

