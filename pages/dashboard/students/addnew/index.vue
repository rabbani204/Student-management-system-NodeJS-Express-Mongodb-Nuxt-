<template>
  <div class="batches-content col-md-8 offset-md-2">
    <div class="row justify-content-center">
      <div class="col-lg-5 adjust-margin">
        <div class="main_title">
          <AlertScuuess />
          <h2 class="mb-3">Add New Student!</h2>
          <p class="pragraph">Enter the information to add new student.</p>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="container">
          <button
            type="submit"
            @click="gotoAnother('dashboard')"
            class="primary-btnr mb-3 mb-sm-0"
          >
            Dashboard
          </button>
          <button
            type="submit"
            @click="gotoAnother('allstudents')"
            class="primary-btn2 mb-3 mb-sm-0 lgin-cs"
          >
            All students
          </button>
        </div>
      </div>
      <!-- start form -->

      <form @submit.prevent="addstudent">
        <div class="form-group">
          <label for="studentcontact">Student Contact</label>
          <small
            id="phone"
            v-if="errors.student_contact"
            class="form-text"
            style="text-align: left !important; margin-bottom: 5px; color: red"
            >{{ errors.student_contact }}</small
          >
          <input
            type="text"
            class="form-control"
            v-model="student.student_contact"
            @keyup="checkaccount"
            id="studentcontact"
            aria-describedby="emailHelp"
            placeholder="Enter student contact"
          />
          <small id="emailHelp" class="form-text text-muted"
            >Example: 01717******, 01515******</small
          >
        </div>

        <div class="form-group">
          <label for="studentname">Student Name</label>
          <small
            id="phone"
            class="form-text"
            style="text-align: left !important; margin-bottom: 5px; color: red"
            >{{ errors.student_name }}</small
          >
          <input
            type="text"
            class="form-control"
            id="studentname"
            v-model="student.student_name"
            aria-describedby="emailHelp"
            placeholder="Enter student name"
          />
          <small id="emailHelp" class="form-text text-muted"
            >Example: Md. Rakib, Mis Arpa, Mr. Radoan</small
          >
        </div>

        <div class="form-group">
          <label for="selectbatch">Select Batch</label>
          <small
            id="phone"
            v-if="errors.batch"
            class="form-text"
            style="text-align: left !important; margin-bottom: 5px; color: red"
            >{{ errors.batch }}</small
          >

          <select class="form-control" id="selectbatch" v-model="student.batch">
            <option v-for="(batch, i) in batches" :key="i" :value="batch">
              {{ batch.batch_name }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="parentcontact">Parent Contact</label>
          <small
            id="phone"
            v-if="errors.parent_contact"
            class="form-text"
            style="text-align: left !important; margin-bottom: 5px; color: red"
            >{{ errors.parent_contact }}</small
          >
          <input
            type="text"
            class="form-control"
            id="parentcontact"
            @keyup="checkparentaccount"
            v-model="student.parent_contact"
            aria-describedby="emailHelp"
            placeholder="Enter parent contact"
          />
          <small id="emailHelp" class="form-text text-muted"
            >Example: 01717******, 01515******</small
          >
        </div>

        <div class="form-group">
          <label for="inistutation">Other institution name</label>
          <input
            type="text"
            class="form-control"
            id="inistutation"
            v-model="student.other_institution"
            aria-describedby="emailHelp"
            placeholder="Enter Inistution Name"
          />
          <small id="emailHelp" class="form-text text-muted"
            >Example: NFU School and College, Gaibandha Boys School</small
          >
        </div>

        <div class="form-group">
          <label for="aboutbatch">About The student</label>
          <textarea
            class="form-control"
            v-model="student.about_student"
            id="aboutbatch"
            rows="3"
          ></textarea>
        </div>
        <button
          type="submit"
          class="primary-btn ml-sm-3 ml-0 buttion-size-match"
          style="margin-left: 0rem !important"
        >
          Add now
        </button>
      </form>
    </div>
    <!-- 		End of Container -->

    <!--  Developed By Yasser Mas -->
  </div>
</template>
<script>
import AlertScuuess from "~/components/alert-top";
export default {
  layout: "userloged",
  components: { AlertScuuess },
  mounted() {
    this.student.batch  = 'Choose...';
    this.$axios.setHeader(
      "Authorization",
      this.$cookies.get("insadmin-auth-token")
    );

    this.$axios
      .get("/api/institution/checkauth")
      .then((res) => {
        if (!res.data.data || res.data.data.status) {
          this.$cookies.remove("ins-auth-token");
          this.$cookies.remove("ins-user-data");
          this.$router.push("/login");
        } else if (res.data.data.payment_completed != "completed") {
          this.$router.push("/dashboard/payment-notification");
        } else {
          this.activeuser = res.data.data;
          this.getAllBatchs();
          this.$cookies.set("ins-user-data", res.data.data, {
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
          });
        }
      })
      .catch((err) => {
        this.$cookies.remove("ins-auth-token");
        this.$cookies.remove("ins-user-data");
        this.$router.push("/login");
      });

    if (this.$route.params._id && this.$route.params.batch_name) {
      this.batch = this.$route.params;
      this.needUpdate = true;
    }
  },
  data() {
    return {
      student: {},
      activeuser: {},
      parentExist: {},
      batches: [],
      errors: {
        student_name: "",
        student_contact: "",
        batch: "",
        parent_contact: "",
      },
    };
  },
  methods: {
    gotoAnother(option) {
      if (option == "dashboard") {
        this.$router.push("/dashboard");
      } else {
        this.$router.push("/dashboard/students");
      }
    },
    myAlertTop() {
      $(".myAlert-top").show();
      setTimeout(function () {
        $(".myAlert-top").hide();
      }, 3000);
    },
    getAllBatchs() {
      this.$axios.setHeader(
        "Authorization",
        this.$cookies.get("insadmin-auth-token")
      );
      this.$axios
        .get("/api/batch/institution/" + this.activeuser._id)
        .then((callback) => {
          if (callback) {
            console.log(callback.data.data, "bchs");
            this.batches = callback.data.data;
            console.log(this.batches);
          }
        });
    },
    checkaccount() {
      if (this.student.student_contact.length == 11) {
        this.$axios.setHeader(
          "Authorization",
          this.$cookies.get("insadmin-auth-token")
        );

        this.$axios
          .get("/api/student/findbycontact/" + this.student.student_contact)
          .then((callback) => {
            if (callback.data.data) {
              this.student = callback.data.data;
            }
            console.log(this.student);
          })
          .catch((err) => {
            console.log(err)
          });
      }
    },
    checkparentaccount() {
      if (this.student.parent_contact.length == 11) {
        this.$axios.setHeader(
          "Authorization",
          this.$cookies.get("insadmin-auth-token")
        );

        this.$axios
          .get("/api/parent/findbycontact/" + this.student.parent_contact)
          .then((callback) => {
            if (callback.data.data) {
              this.parentExist = callback.data.data;
            }
          });
      }
    },
    addstudent() {
      console.log(this.student, 'this is student')
      if (!this.student.student_name) {
        this.errors.haverror = true;
        this.errors.student_name = "Student name is require!";
      }

      if (!this.student.student_contact) {
        this.errors.haverror = true;
        this.errors.student_contact = "Student contact is require!";
      }
      if (!this.student.batch) {
        this.errors.haverror = true;
        this.errors.batch = "Batch is require!";
      }
      if (!this.student.parent_contact) {
        this.errors.haverror = true;
        this.errors.parent_contact = "Parent contact is require!";
      }

      if (Object.keys(this.parentExist).length) {
        this.student.parent_contact = this.parentExist;
      }

      if (this.errors.haverror) {
        setTimeout(() => {
          this.errors = {
            haverror: false,
            student_name: "",
            student_contact: "",
            batch: "",
            parent_contact: "",
          };
        }, 4000);
      } else {
        this.$axios.setHeader(
          "Authorization",
          this.$cookies.get("insadmin-auth-token")
        );
        this.$axios
          .post("/api/batch/addstudent", this.student)
          .then((callback) => {
            console.log(callback.data, 'submit callback');
            if (callback.data.success) {
              this.myAlertTop();
              this.student = {}
            }

            else{
              this.errors.student_name = "Please check all data."
              this.errors.haverror = true;
            }
          }).catch(error=>{
            console.log(this.errors, 'this is error')
          });
      }
    },
  },
};
</script>

<style scoped>
.batches-content {
  margin-top: 3rem;
  margin-bottom: 5rem;
}

input:focus {
  border: 1px yellow !important;
}

input {
  border: 1px solid #002347;
}
.adjust-margin {
  margin-bottom: -5rem !important;
}
</style>
