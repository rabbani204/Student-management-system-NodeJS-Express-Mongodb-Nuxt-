<template>
  <div class="batches-content">
    <div class="row justify-content-center">
      <div class="col-lg-5 adjust-margin">
        <div class="main_title">
          <h2 class="mb-3">Class-10-A</h2>
          <p class="pragraph">The batch is for class-10 students!!</p>
        </div>
      </div>
    </div>

    <div class="container">
      <button class="primary-btn2 mb-3 mb-sm-0s" @click="gotorightoption()">
        <span>All Batchs</span>
      </button>
      <!-- start form -->

      <table class="table table-striped table-class" id="table-id">
        <thead>
          <tr style="background:#002347!important; color: #fdc632!important;">
            <th>Name</th>
            <th>Contact</th>
            <th>Batch</th>
            <th>Parent-Contact</th>
            <th>Inistutation Name</th>
            <th>Dues</th>
            <th>Update</th>
            <th>Delete</th>
            <th>Send Message</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(student, i) in students" :key="i">
            <td>{{student.student_name}}</td>
            <td>{{student.student_contact}}</td>
            <td>Class-10-A</td>
            <td>{{student.parent_contact}}</td>
            <td>{{student.inistutation}}</td>
            <td>{{student.payments}}</td>
            <td>
              <i class="fas fa-pencil-alt cursor"></i>
            </td>
            <td>
              <i class="fas fa-trash-alt cursor"></i>
            </td>
            <td>
              <i class="fas fa-envelope-open-text cursor"></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 		End of Container -->

    <!--  Developed By Yasser Mas -->
  </div>
</template>
<script>
import CommonHeader from "~/components/user/CommonHeader";
export default {
  layout: "userloged",
  components: { CommonHeader },
    mounted() {
    this.$axios.setHeader(
      "Authorization",
      this.$cookies.get("insadmin-auth-token")
    );

    this.$axios
      .get("/api/institution/checkauth")
      .then((res) => {
        console.log(res.data.data, "res data");
        if (!res.data.data || res.data.data.status) {
          this.$cookies.remove("ins-auth-token");
          this.$cookies.remove("ins-user-data");
          this.$router.push("/login");
        } else if (res.data.data.payment_completed != "completed") {
          this.$router.push("/dashboard/payment-notification");
        } else {
          this.$cookies.set("ins-user-data", res.data, {
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

    this.$axios.get("/api/batch/getallstudent").then((callback) => {
      if (callback) {
        console.log(callback, 'all student')
        this.students = callback.data.data;
      }
    });

    if (this.$route.params.update) {
      this.isSuccess = true;
      setTimeout(() => {
        this.isSuccess = false;
      }, 3500);
    }
  },
  middleware: "authenticated-ins",
  data() {
    return {
      students: []
    };
  },
  methods:{
    gotorightoption(){
      this.$router.push('/dashboard/batches')
    }
  }
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

.cursor{
  cursor: pointer;
}
</style>
