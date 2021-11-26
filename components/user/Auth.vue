<template>
    <div>
        <div class="modal fade" id="authmodal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                    <h5 v-if="active == 'register'" class="title">Enter The Information To Register</h5>
                    <h5 v-if="active == 'login'" class="title">Enter The Information To LogIn</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                    <div class="modal-body">
                        <div class="loginForm">
                            <form  class="formArea" id="myForm" @submit.prevent="authformsubmit">
                                <div class="row">
                                    <div class="col-lg-12 formGroup">
                                        <input name="email" v-model="user.email" placeholder="Enter Your Email ..." pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$">
                                        <input name="password" v-model="user.password" placeholder="Enter Your password" required>
                                    </div>
                                    <div class="col-lg-12 text-center">
                                        <div class="row">
                                           <div class="buttonholder">
                                                <div v-if="active == 'register'">
                                                    <button type="submit" @click="changeactive('login')" class="primary-btn2 mb-3 mb-sm-0">Login</button>
                                                    <button type="submit" @click="changeactive('register')" class="primary-btnr mb-3 mb-sm-0">Register</button>
                                                </div>
                                                <div v-if="active == 'login'">
                                                    <button type="submit" @click="changeactive('register')" class="primary-btnr mb-3 mb-sm-0">Register</button>
                                                    <button type="submit" @click="changeactive('login')" class="primary-btn2 mb-3 mb-sm-0">Login</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
	     </div>
    </div>
</template>
<script>
export default {
    data: () => ({
        active: 'login',
        user: {}
    }),
    methods:{
        changeactive(v){
            this.active = v
        },
        authformsubmit(){
            // if( this.active == 'login' ){
            //     this.$axios.$post('/api/user/login', this.user).then((res)=>{
            //         console.log(res,'res')
            //     })
            // }
            // else if( this.active == 'register' ){
            //     this.$axios.$post('/api/user/register', this.user).then((res)=>{
            //         console.log(res,'res')
            //     })
            // }
        }
    }
}
</script>

