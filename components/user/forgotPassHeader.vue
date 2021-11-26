<template>
  <div>
    <section class="headcontainer" v-if="isloading">
      <Loading />
    </section>
    <section class="headcontainer" v-else>
      <nav class="container navbar navbar-expand-lg navbar-dark bg-transparent">
        <img src="/user/img/logo3.jpg" width="150" alt />
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <a class="nav-link" href="/">
                <span class="navtext">Home</span>
              </a>
            </li>
            <li class="nav-item" v-for="(item, i) in navlists" :key="i">
              <a class="nav-link" :href="item.link">
                <span class="navtext">{{item.title}}</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <div class="container" v-if="user_type == 'notSelected'">
        <div class="row">
          <div class="col-md-2"></div>

          <div class="col-md-8">
            <div class="container">
              <div class="row">
                <div class="col-md-3"></div>
                <div class="col-md-6" style="margin-top: 6rem;s">
                  <h5
                    style="
                      text-align: center !important;
                      margin-bottom: 1.5rem;
                      color: #002347;
                    "
                  >
                    Who you are?
                  </h5>
                  <div
                    class="user-type admin"
                    @click="user_type = 'institution'"
                  >
                    Institution Admin
                  </div>
                  <div class="user-type parent" @click="user_type = 'parent'">
                    Parent
                  </div>
                  <div class="user-type student" @click="user_type = 'student'">
                    Student
                  </div>
                </div>
                <div class="col-md-3"></div>
              </div>
            </div>
          </div>

          <div class="col-md-2"></div>
        </div>
      </div>

      <div class="container" v-else>
        <div class="row">
          <div class="col-md-2"></div>

          <div class="col-md-7 review-title-back" v-if="forgot_pass == 'success'">
            <Success />
          </div>

          <div class="col-md-7 review-title-back" v-if="forgot_pass == 'phone'">
            <h5 class="title">Enter your {{user_type}} phone number</h5>
            <div class="loginForm">
              <form class="formArea" id="myForm" @submit.prevent="forgotpassformsubmit">
                <div class="row">
                  <div class="col-lg-12 formGroup">
                    <small
                      id="password"
                      v-if="fpasserror"
                      class="form-text"
                      style="text-align: left!important; margin-bottom: 5px; color: red;"
                    >{{fpasserror}}</small>
                    <input
                      type="number"
                      pattern=".{11}"
                      id="number"
                      name="number"
                      v-model="ins_contact"
                      placeholder="Enter your contact"
                    />
                  </div>
                  <div class="col-lg-12 text-center">
                    <div class="row">
                      <div class="buttonholder">
                        <button
                          type="button"
                          @click="gotoLogin('login')"
                          class="primary-btnr mb-3 mb-sm-0"
                        >Register</button>
                        <button type="submit" class="primary-btn2 mb-3 mb-sm-0 lgin-cs">submit</button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div class="col-md-7 review-title-back" v-if="forgot_pass == 'verification_code'">
            <h5 class="title">Enter verification code</h5>
            <div class="loginForm">
              <form class="formArea" id="myForm" @submit.prevent="submitverificationcode()">
                <div class="row">
                  <div class="col-lg-12 formGroup">
                    <small
                      id="password"
                      v-if="fpasserror"
                      class="form-text"
                      style="text-align: left!important; margin-bottom: 5px; color: red;"
                    >{{fpasserror}}</small>
                    <input
                      type="number"
                      pattern=".{5}"
                      id="number"
                      name="number"
                      v-model="verification_code"
                      placeholder="Enter verification code"
                    />
                  </div>
                  <div class="col-lg-12 text-center">
                    <div class="row">
                      <div class="buttonholder">
                        <button
                          type="button"
                          @click="gotoLogin('login')"
                          class="primary-btnr mb-3 mb-sm-0"
                        >Register</button>
                        <button type="submit" class="primary-btn2 mb-3 mb-sm-0 lgin-cs">submit</button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div class="col-md-7 review-title-back" v-if="forgot_pass == 'enter_pass'">
            <h5 class="title">Enter new password</h5>
            <div class="loginForm">
              <form class="formArea" id="myForm" @submit.prevent="submitpassword">
                <div class="row">
                  <div class="col-lg-12 formGroup">
                    <small
                      id="password"
                      v-if="fpasserror"
                      class="form-text"
                      style="text-align: left!important; margin-bottom: 5px; color: red;"
                    >{{fpasserror}}</small>
                    <input
                      type="password"
                      id="number"
                      name="number"
                      v-model="ins.password"
                      placeholder="Enter your password"
                    />

                    <input
                      type="password"
                      id="number"
                      name="number"
                      v-model="ins.con_password"
                      placeholder="Enter your password again"
                    />
                  </div>
                  <div class="col-lg-12 text-center">
                    <div class="row">
                      <div class="buttonholder">
                        <button
                          type="button"
                          @click="gotoLogin('login')"
                          class="primary-btnr mb-3 mb-sm-0"
                        >Register</button>
                        <button type="submit" class="primary-btn2 mb-3 mb-sm-0 lgin-cs">submit</button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div class="col-md-7 review-title-back" v-else></div>
          <div class="col-md-3"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Success from "~/components/success";
import Loading from "~/components/loading";
export default {
  mounted() {},
  components: { Success, Loading },
  data: () => ({
    institution: {},
    user_type:'notSelected',
    ins: {},
    verification_code: "",
    navlists: [
      {
        title: "Features",
        link: "/features"
      },
      // {
      // 	title: 'Universities',
      // 	link: '/universities'
      // },
      // {
      // 	title: 'Blog',
      // 	link: '/blog'
      // },
      // {
      // 	title: 'Confessions',
      // 	link: '/confess'
      // },
      {
        title: "About",
        link: "/about"
      },
      {
        title: "Contact",
        link: "/contact"
      },
      {
        title: "Login",
        link: "/login"
      }
    ],
    forgot_pass: "phone",
    ins_contact: "",
    fpasserror: "",
    isloading: false
  }),
  methods: {
    gotoLogin() {
      this.$router.push("/login");
    },
    forgotpassformsubmit() {
      if (!this.ins_contact) {
        this.fpasserror = "Your phone number is require!";
        setTimeout(() => {
          this.fpasserror = "";
        }, 3000);
      } else {
        var api = "/api/"+this.user_type+"/recoveraccount";
        console.log(api, 'this is api')
        this.$axios
          .$post(api, {
            institution_contract: this.ins_contact
          })
          .then(callback => {
            console.log(callback, 'this is callb')
            if (!callback.success) {
              this.fpasserror = callback.message;
              setTimeout(() => {
                this.fpasserror = "";
              }, 3000);
            } else {
              this.isloading = true;
              setTimeout(() => {
                this.isloading = false;

                this.institution = callback.institution;
                this.forgot_pass = "verification_code";
              }, 4000);
            }
          });
      }
    },
    submitverificationcode() {
      if (!this.verification_code) {
        this.fpasserror = "verification code is require!";
        setTimeout(() => {
          this.fpasserror = "";
        }, 3000);
      } else {
        var api = "/api/"+this.user_type+"/resetverificationsubmit";

        this.institution.verification_code = this.verification_code;
        this.$axios
          .$post(api, this.institution)
          .then(callback => {
            if (!callback.success) {
              this.fpasserror = callback.message;
              setTimeout(() => {
                this.fpasserror = "";
              }, 3000);
            } else {
              this.isloading = true;
              setTimeout(() => {
                this.isloading = false;
                this.forgot_pass = "enter_pass";
              }, 4000);
            }
          });
      }
    },
    submitpassword() {
      if (
        !this.ins.password ||
        !this.ins.con_password ||
        this.ins.password != this.ins.con_password
      ) {
        this.fpasserror = "Both field is required and need to match each other";
        setTimeout(() => {
          this.fpasserror = "";
        }, 3000);
      } else {
        var api = "/api/"+this.user_type+"/changepassword"
        this.institution.password = this.ins.password;
        this.$axios
          .$post(api, this.institution)
          .then(callback => {
            if (!callback.success) {
              this.fpasserror = callback.message;
              setTimeout(() => {
                this.fpasserror = "";
              }, 3000);
            } else {
              this.forgot_pass = "success";
              setTimeout(() => {
                this.$router.push("/login");
              }, 3000);
            }
          });
      }
    }
  }
};
</script>

<style scoped>
.user-type {
  height: 2.8rem;
  padding: 8px;
  margin-bottom: 0.9rem;
  cursor: pointer;
  border-radius: 2%;
}

.admin {
  background-color: #002347;
  color: #fdc632;
}

.parent {
  background-color: #fdc632;
  color: #002347;
}

.student {
  background-color: #002347;
  color: #fdc632;
}

.title {
  margin-left: 4% !important;
}
.dropdown:hover > .dropdown-menu {
  display: block;
}

.dropdown > .dropdown-toggle:active {
  pointer-events: none;
}
.navbar-nav li {
  margin-left: 8px !important;
}
.navbar-nav li :hover {
  transition-delay: 0.1s;
  background-color: #002347;
  border-radius: 20px;
}

.navbar-nav li a :hover {
  color: #fdc632 !important;
}
.lgin-cs {
  letter-spacing: 4.8px !important;
}
</style>
