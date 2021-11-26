<template>
 <modal name="hello-world">
  hello, world!
</modal>

</template>

<script>
import VModal from 'vue-js-modal'
 
Vue.use(VModal)
export default {
methods: {
  show () {
    this.$modal.show('hello-world');
  },
  hide () {
    this.$modal.hide('hello-world');
  }
}

}
</script>

<style>

</style>
