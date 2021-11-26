<template>
  <div>
    <section class="headcontainer" v-if="isLoading">
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

      <div class="container" v-if="next_step">
        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-7 review-title-back">
            <div v-if="registration_success">
              <Success />
            </div>
            <div v-else>
              <h5 class="title">
                Enter confirmation code to complete registration!
              </h5>

              <div class="loginForm">
                <small
                  id="backend-validation"
                  v-if="confirmation_code_error"
                  class="form-text"
                  style="
                    text-align: left !important;
                    margin-bottom: 5px;
                    color: red;
                  "
                  >{{ confirmation_code_error }}</small
                >
                <form
                  class="formArea"
                  id="myForm"
                  @submit.prevent="submitConfirmationCode"
                >
                  <div class="row">
                    <div class="col-lg-12 formGroup">
                      <input
                        name="confirmation"
                        id="confirmation"
                        v-model="confirmation_code"
                        placeholder="Enter Confirmation Code ..."
                      />
                    </div>
                    <div class="col-lg-12 text-center">
                      <div class="row">
                        <div class="buttonholder">
                          <div>
                            <button
                              type="button"
                              @click="redricttoRegister('register')"
                              class="primary-btn2 mb-3 mb-sm-0 lgin-cs"
                            >
                              Register
                            </button>
                            <button
                              type="submit"
                              class="primary-btnr mb-3 mb-sm-0"
                            >
                              Confirm
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="col-md-3"></div>
        </div>
      </div>

      <div class="container" v-else>
        <div class="row">
          <div class="col-md-2"></div>
          <div
            class="col-md-7 review-title-back"
            v-if="user_type == 'notSelected'"
          >
            <div class="container">
              <div class="row">
                <div class="col-md-2"></div>
                <div class="col-md-8">
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
                <div class="col-md-2"></div>
              </div>
            </div>
          </div>

          <div
            class="col-md-7 review-title-back"
            v-if="user_type == 'institution'"
          >
            <h5
              style="
                text-align: center !important;
                margin-bottom: 0.5rem;
                color: #002347;
              "
            >
              Register your institution!
            </h5>
            <div class="loginForm">
              <small
                id="backend-validation"
                v-if="backend_validation_error"
                class="form-text"
                style="
                  text-align: left !important;
                  margin-bottom: 5px;
                  color: red;
                "
                >{{ backend_validation_error }}</small
              >
              <form
                class="formArea"
                id="myForm"
                @submit.prevent="authformsubmit"
              >
                <div class="row">
                  <div class="col-lg-12 formGroup">
                    <div>
                      <small
                        v-if="errors.haverror && errors.institution_name"
                        id="name"
                        class="form-text"
                        style="
                          text-align: left !important;
                          margin-bottom: 5px;
                          color: red;
                        "
                        >{{ errors.institution_name }}</small
                      >
                      <input
                        id="name"
                        name="name"
                        v-model="institution.institution_name"
                        placeholder="Enter Inistutation Name ..."
                      />

                      <small
                        data-v-20a312bd=""
                        id="emailHelp"
                        class="form-text text-muted"
                        >Example: Start School And College, Hello Coching
                        Center</small
                      >

                      <small
                        id="phone"
                        v-if="errors.haverror && errors.institution_contract"
                        class="form-text"
                        style="
                          text-align: left !important;
                          margin-bottom: 5px;
                          color: red;
                        "
                        >{{ errors.institution_contract }}</small
                      >
                      <input
                        name="phone"
                        type="number"
                        id="phone"
                        pattern=".{11}"
                        v-model="institution.institution_contract"
                        title="Field must be 11 characters long"
                        placeholder="Enter Institution Phone Number ..."
                      />

                      <small
                        id="address"
                        v-if="errors.haverror && errors.institution_address"
                        class="form-text"
                        style="
                          text-align: left !important;
                          margin-bottom: 5px;
                          color: red;
                        "
                        >{{ errors.institution_address }}</small
                      >
                      <input
                        id="address"
                        name="name"
                        v-model="institution.institution_address"
                        placeholder="Enter Inistutation Address ..."
                      />
                    </div>

                    <small
                      id="email"
                      v-if="errors.haverror && errors.email"
                      class="form-text"
                      style="
                        text-align: left !important;
                        margin-bottom: 5px;
                        color: red;
                      "
                      >{{ errors.email }}</small
                    >
                    <input
                      name="email"
                      id="email"
                      v-model="institution.email"
                      placeholder="Enter Inistutation Email ..."
                      pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$"
                    />

                    <small
                      id="password"
                      v-if="errors.haverror && errors.password"
                      class="form-text"
                      style="
                        text-align: left !important;
                        margin-bottom: 5px;
                        color: red;
                      "
                      >{{ errors.password }}</small
                    >
                    <input
                      type="password"
                      id="password"
                      name="password"
                      v-model="institution.password"
                      placeholder="Enter password"
                    />

                    <div>
                      <small
                        id="conPassword"
                        v-if="errors.haverror && errors.con_password"
                        class="form-text"
                        style="
                          text-align: left !important;
                          margin-bottom: 5px;
                          color: red;
                        "
                        >{{ errors.con_password }}</small
                      >
                      <input
                        type="password"
                        id="conPassword"
                        name="password"
                        v-model="institution.con_password"
                        placeholder="Enter password again"
                      />
                    </div>
                  </div>
                  <div class="col-lg-12 text-center">
                    <div class="row">
                      <div class="buttonholder">
                        <div>
                          <button
                            type="button"
                            @click="redricttoLogin('login')"
                            class="primary-btn2 mb-3 mb-sm-0 lgin-cs"
                          >
                            Login
                          </button>
                          <button
                            type="submit"
                            class="primary-btnr mb-3 mb-sm-0"
                          >
                            Register
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div class="col-md-7 review-title-back" v-if="user_type == 'parent'">
            <h5
              style="
                text-align: center !important;
                margin-bottom: 0.5rem;
                color: #002347;
              "
            >
              Register as parent!
            </h5>
            <div class="loginForm">
              <small
                id="backend-validation"
                v-if="backend_validation_error"
                class="form-text"
                style="
                  text-align: left !important;
                  margin-bottom: 5px;
                  color: red;
                "
                >{{ backend_validation_error }}</small
              >
              <form
                class="formArea"
                id="myForm"
                @submit.prevent="authformsubmit"
              >
                <div class="row">
                  <div class="col-lg-12 formGroup">
                    <div>
                      <small
                        v-if="errors.haverror && errors.parent_name"
                        id="name"
                        class="form-text"
                        style="
                          text-align: left !important;
                          margin-bottom: 5px;
                          color: red;
                        "
                        >{{ errors.parent_name }}</small
                      >
                      <input
                        id="name"
                        name="name"
                        v-model="institution.parent_name"
                        placeholder="Enter parent Name ..."
                      />

                      <small
                        id="phone"
                        v-if="errors.haverror && errors.parent_contact"
                        class="form-text"
                        style="
                          text-align: left !important;
                          margin-bottom: 5px;
                          color: red;
                        "
                        >{{ errors.parent_contact }}</small
                      >
                      <input
                        name="phone"
                        type="number"
                        id="phone"
                        pattern=".{11}"
                        v-model="institution.parent_contact"
                        title="Field must be 11 characters long"
                        placeholder="Enter parent phone number ..."
                      />

                      <small
                        id="address"
                        v-if="errors.haverror && errors.parent_address"
                        class="form-text"
                        style="
                          text-align: left !important;
                          margin-bottom: 5px;
                          color: red;
                        "
                        >{{ errors.parent_address }}</small
                      >
                      <input
                        id="address"
                        name="name"
                        v-model="institution.parent_address"
                        placeholder="Enter parent Address ..."
                      />
                    </div>

                    <small
                      id="email"
                      v-if="errors.haverror && errors.email"
                      class="form-text"
                      style="
                        text-align: left !important;
                        margin-bottom: 5px;
                        color: red;
                      "
                      >{{ errors.email }}</small
                    >
                    <input
                      name="email"
                      id="email"
                      v-model="institution.email"
                      placeholder="Enter Your Email ..."
                      pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$"
                    />

                    <small
                      id="password"
                      v-if="errors.haverror && errors.password"
                      class="form-text"
                      style="
                        text-align: left !important;
                        margin-bottom: 5px;
                        color: red;
                      "
                      >{{ errors.password }}</small
                    >
                    <input
                      type="password"
                      id="password"
                      name="password"
                      v-model="institution.password"
                      placeholder="Enter password"
                    />

                    <div>
                      <small
                        id="conPassword"
                        v-if="errors.haverror && errors.con_password"
                        class="form-text"
                        style="
                          text-align: left !important;
                          margin-bottom: 5px;
                          color: red;
                        "
                        >{{ errors.con_password }}</small
                      >
                      <input
                        type="password"
                        id="conPassword"
                        name="password"
                        v-model="institution.con_password"
                        placeholder="Enter password again"
                      />
                    </div>
                  </div>
                  <div class="col-lg-12 text-center">
                    <div class="row">
                      <div class="buttonholder">
                        <div>
                          <button
                            type="button"
                            @click="redricttoLogin('login')"
                            class="primary-btn2 mb-3 mb-sm-0 lgin-cs"
                          >
                            Login
                          </button>
                          <button
                            type="submit"
                            class="primary-btnr mb-3 mb-sm-0"
                          >
                            Register
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div class="col-md-7 review-title-back" v-if="user_type == 'student'">
            <h5
              style="
                text-align: center !important;
                margin-bottom: 0.5rem;
                color: #002347;
              "
            >
              Register as student!
            </h5>
            <div class="loginForm">
              <small
                id="backend-validation"
                v-if="backend_validation_error"
                class="form-text"
                style="
                  text-align: left !important;
                  margin-bottom: 5px;
                  color: red;
                "
                >{{ backend_validation_error }}</small
              >
              <form
                class="formArea"
                id="myForm"
                @submit.prevent="authformsubmit"
              >
                <div class="row">
                  <div class="col-lg-12 formGroup">
                    <div>
                      <small
                        v-if="errors.haverror && errors.student_name"
                        id="name"
                        class="form-text"
                        style="
                          text-align: left !important;
                          margin-bottom: 5px;
                          color: red;
                        "
                        >{{ errors.student_name }}</small
                      >
                      <input
                        id="name"
                        name="name"
                        v-model="institution.student_name"
                        placeholder="Enter student name ..."
                      />

                      <small
                        id="phone"
                        v-if="errors.haverror && errors.student_contact"
                        class="form-text"
                        style="
                          text-align: left !important;
                          margin-bottom: 5px;
                          color: red;
                        "
                        >{{ errors.student_contact }}</small
                      >
                      <input
                        name="phone"
                        type="number"
                        id="phone"
                        pattern=".{11}"
                        v-model="institution.student_contact"
                        title="Field must be 11 characters long"
                        placeholder="Enter student phone number ..."
                      />

                      <small
                        id="address"
                        v-if="errors.haverror && errors.student_address"
                        class="form-text"
                        style="
                          text-align: left !important;
                          margin-bottom: 5px;
                          color: red;
                        "
                        >{{ errors.student_address }}</small
                      >
                      <input
                        id="address"
                        name="name"
                        v-model="institution.student_address"
                        placeholder="Enter student address ..."
                      />
                    </div>

                    <small
                      id="email"
                      v-if="errors.haverror && errors.email"
                      class="form-text"
                      style="
                        text-align: left !important;
                        margin-bottom: 5px;
                        color: red;
                      "
                      >{{ errors.email }}</small
                    >
                    <input
                      name="email"
                      id="email"
                      v-model="institution.email"
                      placeholder="Enter student Email ..."
                      pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$"
                    />

                    <small
                      id="password"
                      v-if="errors.haverror && errors.password"
                      class="form-text"
                      style="
                        text-align: left !important;
                        margin-bottom: 5px;
                        color: red;
                      "
                      >{{ errors.password }}</small
                    >
                    <input
                      type="password"
                      id="password"
                      name="password"
                      v-model="institution.password"
                      placeholder="Enter password"
                    />

                    <div>
                      <small
                        id="conPassword"
                        v-if="errors.haverror && errors.con_password"
                        class="form-text"
                        style="
                          text-align: left !important;
                          margin-bottom: 5px;
                          color: red;
                        "
                        >{{ errors.con_password }}</small
                      >
                      <input
                        type="password"
                        id="conPassword"
                        name="password"
                        v-model="institution.con_password"
                        placeholder="Enter password again"
                      />
                    </div>
                  </div>
                  <div class="col-lg-12 text-center">
                    <div class="row">
                      <div class="buttonholder">
                        <div>
                          <button
                            type="button"
                            @click="redricttoLogin('login')"
                            class="primary-btn2 mb-3 mb-sm-0 lgin-cs"
                          >
                            Login
                          </button>
                          <button
                            type="submit"
                            class="primary-btnr mb-3 mb-sm-0"
                          >
                            Register
                          </button>
                        </div>
                      </div>
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
import Success from "~/components/success";
import Loading from "~/components/loading";

export default {
  components: { Success, Loading },
  mounted() {
    this.$axios.$get("https://ipapi.co/json/").then((data) => {
      this.internetInfo = {
        ip: data.ip,
        country: data.country,
        city: data.city,
        latitude: data.latitude,
        longitude: data.longitude,
        org: data.org,
      };
      console.log(this.internetInfo, "uer datass");
    });

    if (this.$cookies.get("insadmin-auth-token")) {
      this.$router.push("/dashboard");
      // this.pushToNavist({ title: "Dashboard", link: "/dashboard" });
    } else if (this.$cookies.get("parent-auth-token")) {
      this.$router.push("/parent/dashboard");
      // this.pushToNavist({ title: "Dashboard", link: "/parent/dashboard" });
    } else if (this.$cookies.get("student-auth-token")) {
      this.$router.push("/stusdent/dashboard");
      // this.pushToNavist({ title: "Dashboard", link: "/student/dashboard" });
    } else {
      this.pushToNavist({ id:4, title: "Login", link: "/login" });
      this.pushToNavist({ id: 5, title: "Signup", link: "/register" });
    }
  },
  data: () => ({
    user_type: "notSelected",
    institution: {},
    confirmation_code: "",
    internetInfo: "",
    next_step: false,
    errors: {
      haverror: false,
    },
    backend_validation_error: "",
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
    recent_submitted_institution: "",
    confirmation_code_error: "",
    registration_success: false,
    isLoading: false,
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
    redricttoLogin() {
      this.$router.push("/login");
    },
    authformsubmit() {
      if (this.user_type == "institution") {
        if (!this.institution.institution_name) {
          this.errors.haverror = true;
          this.errors.institution_name = "Institution name is require!";
        }

        if (!this.institution.institution_contract) {
          this.errors.haverror = true;
          this.errors.institution_contract = "Institution contact is require!";
        }

        if (!this.institution.institution_address) {
          this.errors.haverror = true;
          this.errors.institution_address = "Institution address is require!";
        }

        if (!this.institution.email) {
          this.errors.haverror = true;
          this.errors.email = "Institution email is require!";
        }

        if (!this.institution.password) {
          this.errors.haverror = true;
          this.errors.password = "Password is require!";
        }

        if (!this.institution.con_password) {
          this.errors.haverror = true;
          this.errors.con_password = "Confirm password is require!";
        }

        if (
          this.institution.password &&
          this.institution.con_password &&
          this.institution.password != this.institution.con_password
        ) {
          this.errors.haverror = true;
          this.errors.con_password = "Password is not same";
          this.errors.password = "Password is not same";
        }

        if (!this.errors.haverror) {
          this.institution.register_ip = this.internetInfo;
          let uniqueids =
            this.institution.institution_name.substring(0, 2) +
            Math.random().toString(36).substring(7) +
            this.institution.institution_contract.substring(0, 2) +
            this.institution.institution_address.substring(0, 2);
          this.institution.uniqueId = uniqueids;
          this.$axios
            .$post("/api/institution/registerinstitution", this.institution)
            .then((res) => {
              if (!res.success) {
                if (res.message.code == 11000) {
                  this.backend_validation_error =
                    "Phone number already used please check or Try to reset Password!!!";
                } else {
                  this.backend_validation_error =
                    "Phone number already used please check or Try to reset Password!!!";
                }
                setTimeout(() => {
                  this.backend_validation_error = "";
                  this.institution.institution_contract = "";
                  this.institution.email = "";
                }, 5000);
              } else if (res.success) {
                window.scrollTo({ top: 0 });
                this.isLoading = true;
                setTimeout(() => {
                  this.isLoading = false;
                  this.recent_submitted_institution = res.institution;
                  this.next_step = true;
                }, 4000);
              }
            });
        }

        if (this.errors.haverror) {
          setTimeout(() => {
            this.errors = { haverror: false };
          }, 5000);
        }
      } else if (this.user_type == "parent") {
        if (!this.institution.parent_name) {
          this.errors.haverror = true;
          this.errors.parent_name = "Parent name is require!";
        }

        if (!this.institution.parent_contact) {
          this.errors.haverror = true;
          this.errors.parent_contact = "Parent contact is require!";
        }

        if (!this.institution.parent_address) {
          this.errors.haverror = true;
          this.errors.parent_address = "Parent address is require!";
        }

        if (!this.institution.email) {
          this.errors.haverror = true;
          this.errors.email = "Parent name email is require!";
        }

        if (!this.institution.password) {
          this.errors.haverror = true;
          this.errors.password = "Password is require!";
        }

        if (!this.institution.con_password) {
          this.errors.haverror = true;
          this.errors.con_password = "Confirm password is require!";
        }

        if (
          this.institution.password &&
          this.institution.con_password &&
          this.institution.password != this.institution.con_password
        ) {
          this.errors.haverror = true;
          this.errors.con_password = "Password is not same";
          this.errors.password = "Password is not same";
        }

        if (!this.errors.haverror) {
          this.institution.register_ip = this.internetInfo;
          let uniqueids =
            this.institution.parent_name.substring(0, 2) +
            Math.random().toString(36).substring(7) +
            this.institution.parent_contact.substring(0, 2) +
            this.institution.parent_address.substring(0, 2);
          this.institution.uniqueId = uniqueids;
          this.$axios
            .$post("/api/parent/registerparent", this.institution)
            .then((res) => {
              if (!res.success) {
                if (res.message.code == 11000) {
                  this.backend_validation_error =
                    "Phone number already used please check or Try to reset Password!!!";
                } else {
                  this.backend_validation_error =
                    "Phone number already used please check or Try to reset Password!!!";
                }
                setTimeout(() => {
                  this.backend_validation_error = "";
                  this.institution.parent_contact = "";
                  this.institution.email = "";
                }, 5000);
              } else if (res.success) {
                window.scrollTo({ top: 0 });
                this.isLoading = true;
                setTimeout(() => {
                  this.isLoading = false;
                  this.recent_submitted_institution = res.data;
                  this.next_step = true;
                }, 4000);
              }
            });
        }

        if (this.errors.haverror) {
          setTimeout(() => {
            this.errors = { haverror: false };
          }, 5000);
        }
      } else if (this.user_type == "student") {
        if (!this.institution.student_name) {
          this.errors.haverror = true;
          this.errors.student_name = "Student name is require!";
        }

        if (!this.institution.student_contact) {
          this.errors.haverror = true;
          this.errors.student_contact = "Student contact is require!";
        }

        if (!this.institution.student_address) {
          this.errors.haverror = true;
          this.errors.student_address = "Student address is require!";
        }

        if (!this.institution.email) {
          this.errors.haverror = true;
          this.errors.email = "Student email is require!";
        }

        if (!this.institution.password) {
          this.errors.haverror = true;
          this.errors.password = "Password is require!";
        }

        if (!this.institution.con_password) {
          this.errors.haverror = true;
          this.errors.con_password = "Confirm password is require!";
        }

        if (
          this.institution.password &&
          this.institution.con_password &&
          this.institution.password != this.institution.con_password
        ) {
          this.errors.haverror = true;
          this.errors.con_password = "Password is not same";
          this.errors.password = "Password is not same";
        }

        if (!this.errors.haverror) {
          this.institution.register_ip = this.internetInfo;
          let uniqueids =
            this.institution.student_name.substring(0, 2) +
            Math.random().toString(36).substring(7) +
            this.institution.student_contact.substring(0, 2) +
            this.institution.student_address.substring(0, 2);
          this.institution.uniqueId = uniqueids;
          this.$axios
            .$post("/api/student/registerstudent", this.institution)
            .then((res) => {
              if (!res.success) {
                if (res.message.code == 11000) {
                  this.backend_validation_error =
                    "Phone number already used please check or Try to reset Password!!!";
                } else {
                  this.backend_validation_error =
                    "Phone number already used please check or Try to reset Password!!!";
                }
                setTimeout(() => {
                  this.backend_validation_error = "";
                  this.institution.student_contact = "";
                  this.institution.email = "";
                }, 5000);
              } else if (res.success) {
                window.scrollTo({ top: 0 });
                this.isLoading = true;
                setTimeout(() => {
                  this.isLoading = false;
                  this.recent_submitted_institution = res.data;
                  this.next_step = true;
                }, 4000);
              }
            });
        }

        if (this.errors.haverror) {
          setTimeout(() => {
            this.errors = { haverror: false };
          }, 5000);
        }
      }
    },
    submitConfirmationCode() {
      if (!this.confirmation_code) {
        this.confirmation_code_error = "You have to enter five Digit Code!!";

        setTimeout(() => {
          this.confirmation_code_error = "";
        }, 5000);
      } else if (this.confirmation_code) {
        if (this.user_type == "institution") {
          this.$axios
            .$post("/api/institution/submit-confirmation-code", {
              confirmation_code: this.confirmation_code,
              institution_contract: this.recent_submitted_institution
                .institution_contract,
              id: this.recent_submitted_institution.id,
            })
            .then((res) => {
              if (!res.success) {
                this.confirmation_code_error = res.message;
                setTimeout(() => {
                  this.confirmation_code_error = "";
                }, 5000);
              } else if (res.success) {
                this.registration_success = true;
                setTimeout(() => {
                  this.$router.push("/login");
                }, 5000);
              }
            });
        } else if (this.user_type == "parent") {
          console.log("Yes here", this.recent_submitted_institution);
          this.$axios
            .$post("/api/parent/submit-confirmation-code", {
              confirmation_code: this.confirmation_code,
              parent_contact: this.recent_submitted_institution.parent_contact,
              id: this.recent_submitted_institution.id,
            })
            .then((res) => {
              if (!res.success) {
                this.confirmation_code_error = res.message;
                setTimeout(() => {
                  this.confirmation_code_error = "";
                }, 5000);
              } else if (res.success) {
                this.registration_success = true;
                setTimeout(() => {
                  this.$router.push("/login");
                }, 5000);
              }
            });
        } else if (this.user_type == "student") {
          this.$axios
            .$post("/api/student/submit-confirmation-code", {
              confirmation_code: this.confirmation_code,
              student_contact: this.recent_submitted_institution
                .student_contact,
              id: this.recent_submitted_institution.id,
            })
            .then((res) => {
              if (!res.success) {
                this.confirmation_code_error = res.message;
                setTimeout(() => {
                  this.confirmation_code_error = "";
                }, 5000);
              } else if (res.success) {
                this.registration_success = true;
                setTimeout(() => {
                  this.$router.push("/login");
                }, 5000);
              }
            });
        }
      }
    },
  },
};
</script>

<style scoped>
.form-text {
  margin-top: -0.6rem;
  margin-bottom: 0.8rem;
  text-align: left;
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

/* animation css */
</style>
