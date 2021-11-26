<template>
  <div class="batches-content">
    <div class="row justify-content-center">
      <div class="col-lg-5 adjust-margin">
        <div class="main_title">
          <h2 class="mb-3">Contact With Us!</h2>
          <p class="pragraph">You can contact with us when emergency!</p>
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
                @click="gotorightoption('dashboard')"
                class="primary-btn2 mb-3 mb-sm-0 lgin-cs"
              >Dashboard</button>
              <!-- <button
                type="submit"
                @click="gotorightoption('recievepayment')"
                class="primary-btnr mb-3 mb-sm-0"
              >Recieve Due</button>
              <button
                type="submit"
                @click="gotorightoption('allpayment')"
                class="primary-btn2 mb-3 mb-sm-0 lgin-cs"
              >All Due</button>-->
            </div>
          </div>

          <div class="single_feature" v-if="ispaymentcollect">
            <div class="icon">
              <span class="flaticon-student">
                <!-- <i :class="service.icon"></i> -->
              </span>
            </div>
            <div class="desc">
              <div class="row">
                <div class="form-group left-input-field">
                  <!-- <label for="selectbatch">Select Year</label> -->
                  <select class="form-control" id="selectbatch">
                    <option>Select Reason</option>
                    <option>Buy Message</option>
                    <option>Important Software Error</option>
                    <option>complain</option>
                  </select>
                </div>
              </div>
              <form>
                <div class="form-group">
                  <label for="batchname">Massage Subject</label>
                  <input
                    type="text"
                    class="form-control"
                    id="batchname"
                    aria-describedby="emailHelp"
                    placeholder="Enter message subject"
                  />
                  <small id="emailHelp" class="form-text text-muted">Example: Need to buy sms, There have a important bug.</small>
                </div>
                <div class="form-group">
                  <label for="aboutbatch">Message</label>
                  <textarea class="form-control" id="aboutbatch" rows="5"></textarea>
                </div>
                <button
                  type="submit"
                  class="primary-btn ml-sm-3 ml-0 buttion-size-match"
                >Send Message now</button>
              </form>
            </div>
          </div>

          <!-- need to emplement else  -->

          <!-- <div class="single_feature" v-else>
            <div class="icon">
              <span class="flaticon-student" style="margin-top: 2rem; margin-bottom: 2rem;">
                <h3>Enter information to recieve Due!!</h3>
              </span>
            </div>
            <div class="desc">
              <form>
                <div class="form-group">
                  <label for="selectbatch">Select Year</label>
                  <select class="form-control" id="selectbatch">
                    <option>2020</option>
                    <option>2019</option>
                    <option>2018</option>
                    <option>2017</option>
                    <option>2016</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="selectMonth">Select Month</label>
                  <select class="form-control" id="selectMonth">
                    <option>January</option>
                    <option>Febuary</option>
                    <option>March</option>
                    <option>April</option>
                    <option>May</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="studentname">Student Unique ID</label>
                  <input
                    type="text"
                    class="form-control"
                    id="studentname"
                    aria-describedby="emailHelp"
                    placeholder="Enter student Unique ID"
                  />
                  <small id="emailHelp" class="form-text text-muted">Example: Rab2008041245ani</small>
                </div>

                <div class="form-group">
                  <label for="studentcontact">Amount</label>
                  <input
                    type="text"
                    class="form-control"
                    id="studentcontact"
                    aria-describedby="emailHelp"
                    placeholder="Enter paid amount"
                  />
                  <small id="emailHelp" class="form-text text-muted">Example: 500, 1000, 1500</small>
                </div>

                <div class="form-group">
                  <label for="studentcontact">Late Fee</label>
                  <input
                    type="text"
                    class="form-control"
                    id="studentcontact"
                    aria-describedby="emailHelp"
                    placeholder="Enter paid amount"
                  />
                  <small id="emailHelp" class="form-text text-muted">Example: 50, 100, 500</small>
                </div>
                <button
                  type="submit"
                  class="primary-btn ml-sm-3 ml-0 buttion-size-match"
                  style="margin-left: 0rem!important;"
                >Confirm</button>
              </form>
            </div>
          </div>-->
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
