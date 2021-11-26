<template>
  <div>
    <section class="headcontainer">
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
            <li class="nav-item" v-for="(item) in navlists" :key="item.id">
              <a class="nav-link" :href="item.link">
                <span
                  class="navtext"
                  style="font-family: 'EB Garamond', serif !important"
                  >{{ item.title }}</span
                >
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <div class="container">
        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-8" v-if="user_type == 'notSelected'">
            <div class="container">
              <div class="row">
                <div class="col-md-3"></div>
                <div class="col-md-6">
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

          <div class="col-md-8" v-else>
            <h5
              v-if="user_type == 'institution'"
              style="
                text-align: center !important;
                margin-bottom: 1.5rem;
                color: #002347;
              "
            >
              Login as Institution admin!
            </h5>
            <h5
              v-if="user_type == 'parent'"
              style="
                text-align: center !important;
                margin-bottom: 1.5rem;
                color: #002347;
              "
            >
              Login as Parent!
            </h5>
            <h5
              v-if="user_type == 'student'"
              style="
                text-align: center !important;
                margin-bottom: 1.5rem;
                color: #002347;
              "
            >
              Login as student!
            </h5>
            <div class="loginForm">
              <form
                class="formArea"
                id="myForm"
                @submit.prevent="authformsubmit"
              >
                <div class="row">
                  <small
                    id="phone"
                    v-if="error"
                    class="form-text"
                    style="text-align: left!important; margin-bottom: 5px; color: red; margin-left: 1rem;s"
                    >{{ error }}</small
                  >
                  <div class="col-lg-12 formGroup">
                    <small
                      id="phone"
                      v-if="errors"
                      class="form-text"
                      style="
                        text-align: left !important;
                        margin-bottom: 5px;
                        color: red;
                      "
                      >{{ errors }}</small
                    >
                    <input
                      type="number"
                      name="phone"
                      id="phone"
                      v-model="institution.institution_contract"
                      placeholder="Enter Institution Phone Number ..."
                    />

                    <input
                      type="password"
                      id="password"
                      name="password"
                      v-model="institution.password"
                      placeholder="Enter Your password"
                    />
                  </div>
                  <div class="col-lg-12 text-center">
                    <div class="row">
                      <div class="buttonholder">
                        <button
                          type="button"
                          @click="redrictToRegister('register')"
                          class="primary-btnr mb-3 mb-sm-0"
                        >
                          Register
                        </button>
                        <button
                          type="submit"
                          class="primary-btn2 mb-3 mb-sm-0 lgin-cs"
                        >
                          Login
                        </button>
                      </div>
                    </div>
                    <div style="margin-top: 2rem !important">
                      <a
                        href="/login/forgot-password"
                        style="
                          color: #002347;
                          margin-top: 5rem !important;
                          cursor: pointer;
                        "
                        >Forgot Password?</a
                      >
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="col-md-3"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  mounted() {
    if (this.$cookies.get("insadmin-auth-token")) {
      this.$router.push('/dashboard')
      // this.pushToNavist({ title: "Dashboard", link: "/dashboard" });
    } else if (this.$cookies.get("parent-auth-token")) {
      this.$router.push('/parent/dashboard')
      // this.pushToNavist({ title: "Dashboard", link: "/parent/dashboard" });
    } else if (this.$cookies.get("student-auth-token")) {
      this.$router.push('/stusdent/dashboard')
      // this.pushToNavist({ title: "Dashboard", link: "/student/dashboard" });
    } else {
      this.pushToNavist({ id: 4, title: "Login", link: "/login" });
      this.pushToNavist({ id: 5, title: "Signup", link: "/register" });
    }
  },
  data: () => ({
    user_type: "notSelected",
    institution: {},
    errors: "",
    navlists: [
      {
        id: 1,
        title: "Features",
        link: "/features",
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
        id: 2,
        title: "About",
        link: "/about",
      },
      {
        id: 3,
        title: "Contact",
        link: "/contact",
      },
    ],
    success: false,
    error: "",
  }),
  methods: {
    pushToNavist(item) {
      let found,
        index = 0;
      this.navlists.map((i) => {
        index = index + 1;
        if (i.title == item.title) {
          found = true;
        } else if (index == this.navlists.length && !found) {
          this.navlists.push(item);
          index = 0;
          found = false;
        }
      });
    },
    redrictToRegister() {
      this.$router.push("/register");
    },
    authformsubmit() {
      if (
        !this.institution.institution_contract ||
        !this.institution.password
      ) {
        console.log("error");

        this.errors = "Phone and password is require!";
      }

      if (this.errors) {
        setTimeout(() => {
          this.errors = "";
        }, 3000);
      }
      if (this.institution.institution_contract && this.institution.password) {
        let formData = {};
        let api = "";

        if (this.user_type == "parent") {
          formData = {
            parent_contact: this.institution.institution_contract,
            password: this.institution.password,
          };

          api = "/api/parent/login";
        }

        if (this.user_type == "institution") {
          formData = this.institution;
          api = "/api/institution/login";
        }

        if (this.user_type == "student") {
          formData = {
            student_contact: this.institution.institution_contract,
            password: this.institution.password,
          };

          api = "/api/student/login";
        }

        console.log("api formdata", formData, api);

        this.$axios.$post(api, formData).then((callback) => {
          console.log("this is callback l", callback);
          console.log(callback, "this is callback!");
          if (!callback.success) {
            this.error = "Please check phone number and password!";

            setTimeout(() => {
              this.error = "";
            }, 5000);
          } else {
            let cookie_name = "";
            let cookie_user_data = "";
            let redrict_to = "";

            if (callback.data.role == "insadmin") {
              cookie_name = "insadmin-auth-token";
              cookie_user_data = "ins-user-data";
              redrict_to = "/dashboard";
            }

            if (callback.data.role == "parent") {
              cookie_name = "parent-auth-token";
              cookie_user_data = "parent-user-data";
              redrict_to = "/parent/dashboard";
            }

            if (callback.data.role == "student") {
              cookie_name = "student-auth-token";
              cookie_user_data = "student-user-data";
              redrict_to = "/student/dashboard";
            }

            this.$cookies.set(cookie_name, callback.token, {
              path: "/",
              maxAge: 60 * 60 * 24 * 7,
            });

            this.$cookies.set(cookie_user_data, callback.data, {
              path: "/",
              maxAge: 60 * 60 * 24 * 7,
            });

            this.$router.push(redrict_to);
          }
        });
      }
    },
  },
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

.container {
  padding: 2rem 0rem;
}

h4 {
  margin: 2rem 0rem 1rem;
}

.custom-control-input:checked ~ .custom-control-label::before {
  color: #fff;
  border-color: #002347;
  background-color: #002347;
}
</style>
