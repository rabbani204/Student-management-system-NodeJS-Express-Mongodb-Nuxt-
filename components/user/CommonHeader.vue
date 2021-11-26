<template>
    <div>
        <section class="introholder">
            <div class="introtitle">
                <h1 class="introtitle">{{ headerinfo.title }}</h1>
                <p class="d">{{ headerinfo.description }}</p>
            </div>
        </section>
    </div>
</template>
<script>
export default {
  props:['headerinfo'],
  data(){
    return{


    }
  }
  
}
</script>

<style>
.introholder {
  background-color: #d7ccc8 !important;
  width: 100%;
  height: 330px;
}
.introtitle {
  text-align: center !important;
  padding-top: 4%;
}
</style>
