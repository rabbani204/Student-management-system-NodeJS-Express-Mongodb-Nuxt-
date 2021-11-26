<template>
  <div class="batches-content">
    <div class="row justify-content-center">
      <div class="col-lg-5 adjust-margin">
        <div class="main_title">
          <h2 class="mb-3">North Soth KG School</h2>
          <p class="pragraph">+8801751394949</p>
        </div>
      </div>
    </div>

    <div class="container">
      <!-- start form -->
      <div class="row">
        <div class="col-md-1"></div>
        <div class="col-md-10">
          <div class="single_feature" v-if="ispaymentcollect">
            <div class="desc">
              <form>
                <div class="form-group">
                  <label for="batchname">Contact Number</label>
                  <input
                    type="text"
                    class="form-control"
                    id="batchname"
                    aria-describedby="emailHelp"
                    placeholder="Enter contact number!!"
                  />
                  <small
                    id="emailHelp"
                    class="form-text text-muted"
                  >Example: 01751******, 01652******</small>
                </div>

                <div class="form-group">
                  <label for="batchname">Contact Email</label>
                  <input
                    type="text"
                    class="form-control"
                    id="batchname"
                    aria-describedby="emailHelp"
                    placeholder="Enter contact email!!"
                  />
                  <small
                    id="emailHelp"
                    class="form-text text-muted"
                  >Example: ykg@***.com, school@***.com</small>
                </div>

                <div class="form-group">
                  <label for="aboutbatch">Description</label>
                  <textarea class="form-control" id="aboutbatch" rows="5"></textarea>
                </div>
                <button
                  type="submit"
                  class="primary-btn ml-sm-3 ml-0 buttion-size-match"
                >Update Now</button>
              </form>
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
      ispaymentcollect: true,
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
    gotorightoption(option) {
      if (option == "dashboard") {
        this.$router.push("/dashboard");
      } else if (option == "allpayment") {
        this.ispaymentcollect = true;
      } else {
        this.ispaymentcollect = false;
      }
    }
    // Need to take ip adress, date, time to store and improve security
  }
};
</script>

<style scoped>
.left-input-field {
  margin-right: 1rem;
  margin-left: 1rem;
  padding-top: 1rem;
}

.middle-input-field {
  margin-right: 1rem;
  padding-top: 1rem;
}

.right-input-field {
  padding-top: 1rem;
}
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
