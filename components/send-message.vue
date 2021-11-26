<template>
  <div>
    <div class="mesageAlert alert alert-danger">
      <div class="alert-icon text-center">
        <!-- <i class="fas fa-exclamation"></i> -->
        <i class="fas fa-exclamation fa-3x" aria-hidden="true"></i>
      </div>
      <div style="margin-bottom: 10px">
        <strong>Are you sure!</strong> You want to delete?
      </div>

      <!-- <ul>
          <li>class 10 A</li>
          <li>Others Information</li>
      </ul> -->
      <div class="container">
        <button
          type="button"
          class="btn btn-info"
          style="margin-left: 3rem; margin-right: 0.5rem"
          @click="hideAlert"
        >
          Cancel
        </button>
        <button type="button" class="btn btn-danger" @click="deleteNow">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["deleteItem"],
  methods: {
    hideAlert() {
      $(".deleteAlert").hide();
    },
    deleteNow() {
      //   console.log("yes Bro!");
      //   console.log(this.deleteItem, "delete item");
      this.$axios.setHeader(
        "Authorization",
        this.$cookies.get(this.deleteItem.role)
      );

      this.$axios.delete(this.deleteItem.api).then(callback=>{
          console.log(callback)
          if( !callback ){
              console.log('something went wrong');
          }

          else{
              console.log('Yes')
              this.$emit('sendResponse', callback)
              this.hideAlert()
          }
      }).catch(err=>{
          console.log(err, 'error');
      })
    },
  },
};
</script>

<style scoped>
.btn {
  cursor: pointer !important;
}
@media only screen and (max-width: 600px) {
  .deleteAlert {
    position: fixed;
    top: 37% !important;
    left: 12% !important;
    width: 75% !important;
  }
}
.deleteAlert {
  padding: 0.8rem;
  position: fixed;
  /* heisght: 5rem; */
  top: 40%;
  left: 37%;
  width: 24%;
}
.alert {
  display: none;
}
</style>