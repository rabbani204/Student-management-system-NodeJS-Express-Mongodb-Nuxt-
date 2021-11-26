<template>
  <div>
    <div class="myAlert-top alert alert-success">
      <div class="alert-icon text-center">
        <i class="fa fa-check-square fa-3x" aria-hidden="true"></i>
      </div>
      <strong>Success!</strong> You can add more!.
    </div>
  </div>
</template>

<script>
export default {
  mounted() {},
};
</script>

<style scoped>
@media only screen and (max-width: 600px) {
  .myAlert-top {
    position: fixed;
    top: 12% !important;
    left: 12% !important;
    width: 75% !important;
  }
}
.myAlert-top {
  position: fixed;
  /* heisght: 5rem; */
  top: 22%;
  left: 37%;
  width: 24%;
}
.alert {
  display: none;
}
</style>