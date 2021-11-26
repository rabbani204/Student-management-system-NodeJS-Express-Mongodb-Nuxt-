<template>
  <div class="batches-content">
    <div class="row justify-content-center">
      <div class="col-lg-5 adjust-margin">
        <div class="main_title">
          <h2 class="mb-3">Send Notification!</h2>
          <p class="pragraph">You can send notification</p>
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
                    <option>Send Notification To</option>
                    <option>All Student</option>
                    <option>Selected Batch</option>
                    <option>Selected Student</option>
                  </select>
                </div>
                <div class="form-group middle-input-field">
                  <!-- <label for="selectbatch">Select Month</label> -->
                  <select class="form-control" id="selectbatch">
                    <option>Select Batch</option>
                    <option>Class-10-A</option>
                    <option>Class-10-B</option>
                    <option>Class-9-A</option>
                  </select>
                </div>
                <div class="form-group right-input-field">
                  <select class="form-control" id="selectbatch">
                    <option>Select Student</option>
                    <option>Mr. Rabbani(Class-10-A)</option>
                    <option>Mr. Khalid(Class-10-B)</option>
                    <option>Mr. Jobbar(Class-6-A)</option>
                  </select>
                </div>
              </div>
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
                  <small id="emailHelp" class="form-text text-muted">Example: Prospond class, Change Class Time</small>
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
