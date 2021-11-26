<template>
  <div class="batches-content">
    <div class="row justify-content-center">
      <div class="col-lg-5 adjust-margin">
        <div class="main_title">
          <AlertScuuess />
          <Loading v-if="loading" />
          <h2 class="mb-3">Add new batch!!</h2>
          <p class="pragraph">Enter the information to add new Batch.</p>
        </div>
      </div>
    </div>

    <div class="container">
      <button class="primary-btn2 mb-3 mb-sm-0s" @click="gotorightoption()">
        <span>All Batchs</span>
      </button>
      <!-- start form -->

      <form @submit.prevent="addData">
        <small
          id="backend-validation"
          v-if="error"
          class="form-text"
          style="text-align: left !important; margin-bottom: 5px; color: red"
          >{{ error }}</small
        >

        <div class="form-group">
          <label for="batchname">Batch Name</label>
          <input
            type="text"
            class="form-control"
            id="batchname"
            v-model="batch.batch_name"
            aria-describedby="emailHelp"
            placeholder="Enter batch name"
          />
          <small id="emailHelp" class="form-text text-muted"
            >Example: Class-10-A, Class-7-B</small
          >
        </div>
        <div class="form-group">
          <label for="aboutbatch">About The Batch</label>
          <textarea
            class="form-control"
            id="aboutbatch"
            v-model="batch.batch_description"
            rows="3"
          ></textarea>
        </div>
        <button
          type="Submit"
          class="primary-btn ml-0"
        >
          Add batch
        </button>
      </form>
    </div>
    <!-- 		End of Container -->

    <!--  Developed By Yasser Mas -->
  </div>
</template>
<script>
import AlertScuuess from "~/components/alert-top";
import Loading from "~/components/loading";
export default {
  layout: "userloged",
  components: { AlertScuuess, Loading },
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

    if (this.$route.params._id && this.$route.params.batch_name) {
      this.batch = this.$route.params;
      this.needUpdate = true;
    }
  },
  middleware: "authenticated-ins",
  data() {
    return {
      needUpdate: false,
      batch: {},
      error: "",
      loading: false,
    };
  },
  methods: {
    addData() {
      console.log('data is adding!!', this.batch)
      if (!this.batch.batch_name) {
        this.error = "Batch name is require!";
        setTimeout(() => {
          this.error = "";
        }, 3500);
      } else {
        if (this.needUpdate) {
          console.log("need update", this.needUpdate);
          this.updateItem();
        } else {
          console.log('data adding here')
          this.$axios.setHeader(
            "Authorization",
            this.$cookies.get("insadmin-auth-token")
          );
          this.$axios.$post("/api/batch", this.batch).then((callback) => {
            if (!callback.success) {
              this.error = callback.message;
              setTimeout(() => {
                this.error = "";
              }, 3500);
            } else {
              console.log('success')
              this.myAlertTop();
              this.batch = {};
            }
          });
        }
      }
    },
    gotorightoption() {
      this.$router.push("/dashboard/batches");
    },

    myAlertTop() {
      $(".myAlert-top").show();
      setTimeout(function () {
        $(".myAlert-top").hide();
      }, 3000);
    },
    updateItem() {
      console.log(this.batch);
      this.$axios.setHeader(
        "Authorization",
        this.$cookies.get("insadmin-auth-token")
      );

      this.$axios
        .post("/api/batch/" + this.batch._id, this.batch)
        .then((callback) => {
          if (!callback.data.data) {
            this.error = "Name can't be empty or duplicate!";

            setTimeout(() => {
              this.error = false;
            }, 3500);
          } else {
            this.loading = true;
            setTimeout(() => {
              this.loading = false;
              this.$router.push({
                name: "dashboard-batches",
                params: { update: true },
              });
            }, 2500);
          }
        });
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
