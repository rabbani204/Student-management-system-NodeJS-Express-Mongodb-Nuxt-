<template>
  <div class="payment-box">
    <h4 class="tittle">
      <b v-if="!success">Pay and enjoy the features!!</b>
      <b v-if="success">Admin will check your payment within 12 hour.!!</b>
    </h4>

    <div class="row">
      <div class="col-md-2"></div>
      <div class="col-md-8">
        <div class="desc" v-if="!success">
          <h4 class="mt-3 mb-2">How can you pay?</h4>
          <ul class="list-group">
            <li class="list-group-item">
              <i class="fas fa-arrow-right" style="color: #fdc632;"></i>
              <span style="margin-left: 5px; color: #002347;">Open your bkash app.</span>
            </li>

            <li class="list-group-item">
              <i class="fas fa-arrow-right" style="color: #fdc632;"></i>
              <span style="margin-left: 5px; color: #002347;">Give payment 1000 BDT.</span>
            </li>

            <li class="list-group-item">
              <i class="fas fa-arrow-right" style="color: #fdc632;"></i>
              <span style="margin-left: 5px; color: #002347;">Use your uniqueID as refrence.</span>
            </li>

            <li class="list-group-item">
              <i class="fas fa-arrow-right" style="color: #fdc632;"></i>
              <span style="margin-left: 5px; color: #002347;">Payment send to 01751394949.</span>
            </li>

            <li class="list-group-item">
              <i class="fas fa-arrow-right" style="color: #fdc632;"></i>
              <span style="margin-left: 5px; color: #002347;">Last fill the form below.</span>
            </li>
          </ul>
        </div>

        <div v-if="success">
          <Success />
        </div>

        <div
          class="desc"
          style="margin-left: 1rem!important; background-color: #d7ccc8; padding: 1rem;"
          v-else
        >
          <h4 class="mt-3 mb-2">Payment completed ?</h4>
          <form @submit.prevent="submitPayment">
            <div class="form-group">
              <small
                id="phone"
                v-if="errors.haverror && errors.name"
                class="form-text"
                style="text-align: left!important; margin-bottom: 5px; color: red;"
              >{{errors.name}}</small>
              <label for="studentname">Your name</label>
              <input
                type="text"
                class="form-control"
                id="studentname"
                v-model="payment.name"
                placeholder="Enter your name"
              />
              <small
                id="emailHelp"
                class="form-text text-muted"
              >Example: Mr. Golam Rabani, Miss. Sumona</small>
            </div>

            <div class="form-group">
              <small
                id="phone"
                v-if="errors.haverror && errors.bkash_number"
                class="form-text"
                style="text-align: left!important; margin-bottom: 5px; color: red;"
              >{{errors.bkash_number}}</small>
              <label for="nkashnum">Your bkash number</label>
              <input
                type="text"
                class="form-control"
                id="nkashnum"
                v-model="payment.bkash_number"
                placeholder="Enter the sender bkash num."
              />
              <small id="emailHelp" class="form-text text-muted">Example: 01751****, 01512****</small>
            </div>

            <div class="form-group">
              <small
                id="phone"
                v-if="errors.haverror && errors.transcation_id"
                class="form-text"
                style="text-align: left!important; margin-bottom: 5px; color: red;"
              >{{errors.transcation_id}}</small>
              <label for="transid">Transcation ID</label>
              <input
                type="text"
                class="form-control"
                id="transid"
                v-model="payment.transcation_id"
                placeholder="Enter your transcation id."
              />
              <small id="emailHelp" class="form-text text-muted">Example: y078asf, 007yubB</small>
            </div>

            <button
              type="submit"
              class="primary-btn ml-sm-3 ml-0 buttion-size-match"
              style="margin-left: 0rem!important;"
            >Send</button>
          </form>
        </div>
      </div>
      <div class="col-md-2"></div>
    </div>
  </div>
</template>

<script>
import Success from "~/components/success";
export default {
  components: { Success },
  middleware: "authenticated-ins",
  layout: "userloged",
  data() {
    return {
      payment: {},
      errors: {
        haverror: false
      },
      success: false
    };
  },
  methods: {
    submitPayment() {
      if (!this.payment.name) {
        this.errors.haverror = true;
        this.errors.name = "Name is require!";
      }

      if (!this.payment.bkash_number) {
        this.errors.haverror = true;
        this.errors.bkash_number = "Sender bkash number is require!";
      }

      if (!this.payment.transcation_id) {
        this.errors.haverror = true;
        this.errors.transcation_id = "Transcation ID is require!";
      }

      if (this.errors.haverror) {
        setTimeout(() => {
          this.errors = { haverror: false };
        }, 4000);
      } else {
        console.log(this.payment)
        this.$axios.setHeader("authorization", this.$cookies.get("auth-token"));
        this.$axios
          .$post("/api/institution/sendpayment", this.payment)
          .then(callback => {
            console.log(callback,'thius is callback')
            if (!callback.success) {
              this.errors.haverror = true;
              this.errors.name = callback.message;

              setTimeout(() => {
                this.errors = { haverror: false };
              }, 4000);
            } else {
              this.success = true;
                window.scrollTo(0,0);
            }
          });
      }
    }
  }
};
</script>

<style scoped>
.payment-box {
  margin: 2rem 0 2rem 0;
}
.tittle {
  text-align: center;
  color: #002347;
}

.desc {
  margin: 1rem 0 1rem 0;
}

.desc,
button {
  margin-top: 10px;
  text-align: center;
}
.list-group-item {
  text-align: left !important;
  margin-left: 1rem !important;
}

.form-group {
  text-align: left !important;
}

.mt-3 {
  font-weight: 500;
}
</style>
