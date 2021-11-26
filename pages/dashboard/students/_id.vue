<template>
  <div class="batches-content">
    <div class="row justify-content-center">
      <div class="col-lg-5 adjust-margin">
        <div class="main_title">
          <h2 class="mb-3">Details Of Student!!</h2>
          <p class="pragraph">Here you can find every single information.</p>
        </div>
      </div>
    </div>

    <div class="container">
      <!-- start form -->
      <div class="row">
        <div class="col-md-1"></div>
        <div class="col-md-10">
          <div class="row">
            <div>
              <button
                type="submit"
                @click="gotoAnother('dashboard')"
                class="primary-btnr mb-3 mb-sm-0"
              >Dashboard</button>
              <button
                type="submit"
                @click="gotoAnother('allstudent')"
                class="primary-btn2 mb-3 mb-sm-0 lgin-cs"
              >All students</button>
            </div>
          </div>

          <div class="single_feature">
            <div class="icon">
              <span class="flaticon-student">
                <!-- <i :class="service.icon"></i> -->
              </span>
            </div>
            <div class="desc">
              <h4 class="mt-3 mb-2">
                <b>Miss Orpa Khan</b>
              </h4>
              <ul class="list-group">
                <li class="list-group-item">Balance: 1000/-</li>
                <li class="list-group-item">Due: 200/-</li>
                <li class="list-group-item">Credit: 30/-</li>
                <li class="list-group-item">Balance: 1000/-</li>
                <li class="list-group-item">Due: 200/-</li>
                <li class="list-group-item">Credit: 30/-</li>
                <li class="list-group-item">Balance: 1000/-</li>
                <li class="list-group-item">Due: 200/-</li>
                <li class="list-group-item">Credit: 30/-</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-md-1"></div>
      </div>
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
  data() {
    return {
      students: [
        {
          name: "Rabbani",
          contact: "01751394949",
          batch: "Class-10 A",
          parentContact: "01303162584",
          inistutation: "ABC",
          payments: "Due-JAN20"
        },
        {
          name: "Rabbani",
          contact: "01751394949",
          batch: "Class-10 A",
          parentContact: "01303162584",
          inistutation: "ABC",
          payments: "Due-JAN20"
        },
        {
          name: "Rabbani",
          contact: "01751394949",
          batch: "Class-10 A",
          parentContact: "01303162584",
          inistutation: "ABC",
          payments: "Due-JAN20"
        }
      ]
    };
  },
  methods: {
    gotoAnother(option) {
      if (option == "dashboard") {
        this.$router.push("/dashboard");
      } else {
        this.$router.push("/dashboard/students");
      }
    }
  }
};
</script>

<style scoped>
.mb-2 {
  margin-bottom: 1rem !important;
}
.container {
  margin-top: 5rem;
}
.batches-content {
  margin-top: 3rem;
  margin-bottom: 5rem;
}

input {
  border: 1px solid #002347;
}
.adjust-margin {
  margin-bottom: -5rem !important;
}

.cursor {
  cursor: pointer;
}
.single_feature {
  margin-top: 1.5rem;
  padding: 5px 36px 3rem 36px !important;
}
</style>
