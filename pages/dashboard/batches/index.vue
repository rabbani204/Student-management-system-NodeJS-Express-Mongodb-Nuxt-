<template>
  <div class="batches-content">
    <ConfirmDelete :deleteItem="deleteItems" @sendResponse="recieveResponse" />

    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <div>
              <h5 style="text-align: center !important; color: #002347">
                Send Message
              </h5>
            </div>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="aboutbatch">Enter message to send!!</label>
              <textarea
                class="form-control"
                id="aboutbatch"
                rows="3"
              ></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="primary-btn mb-3 mb-sm-0s"
              data-dismiss="modal"
            >
              Send
            </button>

            <button type="button" class="primary-btn2 mb-3 mb-sm-0s">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="row justify-content-center">
      <div class="col-lg-5 adjust-margin">
        <div class="main_title">
          <h2 class="mb-3">Batches</h2>
          <p class="pragraph">See all batch click on arrow!</p>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="header_wrap">
        <div class="num_rows">
          <div class="form-group">
            <div class="row">
              <div class="container">
                <button
                  class="primary-btn2 mb-3 mb-sm-0s"
                  @click="gotorightoption()"
                >
                  <span>Add New Batch</span>
                </button>
              </div>
            </div>
            <!--		Show Numbers Of Rows 		-->
            <!-- <select class="form-control" name="state" id="maxRows">
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="70">70</option>
              <option value="100">100</option>
              <option value="5000">Show ALL Rows</option>
            </select>-->
          </div>
        </div>
        <div class="tb_search">
          <input
            type="text"
            id="search_input_all"
            onkeyup="FilterkeyWord_all_table()"
            placeholder="Search.."
            class="form-control"
          />
        </div>
      </div>
      <div class="container" style="margin-top: 1.8rem" v-if="isSuccess">
        <div class="row">
          <div class="col-md-8">
            <Success />
          </div>
        </div>
      </div>
      <table class="table table-striped table-class" id="table-id">
        <thead>
          <tr style="background: #002347 !important">
            <th>Title</th>
            <th>Total Students</th>
            <th>Delete</th>
            <th>Update</th>
            <th>Details</th>
            <th>Message Everyone</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(batch, i) in batches" :key="i">
            <td>{{ batch.batch_name }}</td>
            <td>10</td>
            <td>
              <i class="fas fa-trash-alt cursor" @click="deleteItem(batch)"></i>
              <!-- <i class="fas fa-toggle-on"></i>
              <i class="fas fa-toggle-off"></i> -->
            </td>
            <td>
              <i
                class="fas fa-pencil-alt cursor"
                @click="updateItem(batch)"
              ></i>
            </td>
            <td>
              <i class="far fa-eye cursor"></i>
            </td>
            <td>
              <button
                type="button"
                data-toggle="modal"
                data-target="#exampleModal"
              >
                <i class="fas fa-envelope-open-text cursor"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!--		Start Pagination -->
      <div class="pagination-container">
        <nav>
          <ul class="pagination">
            <!--	Here the JS Function Will Add the Rows -->
          </ul>
        </nav>
      </div>
      <div class="rows_count">Showing 11 to 20 of 91 entries</div>
    </div>
    <!-- 		End of Container -->

    <!--  Developed By Yasser Mas -->
  </div>
</template>
<script>
import Success from "~/components/success";
import ConfirmDelete from "~/components/confirm-delete";
import SendMessage from "~/components/send-message";

export default {
  layout: "userloged",
  components: { Success, ConfirmDelete, SendMessage },
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

    this.$axios.get("/api/batch").then((callback) => {
      if (callback) {
        this.batches = callback.data.data;
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
      batches: [],
      isSuccess: false,
      deleteItems: {},
    };
  },
  methods: {
    gotorightoption() {
      this.$router.push("/dashboard/batches/addnew");
    },

    deleteItem(item) {
      this.deleteItems.item = item;
      this.deleteItems.title = "Batch";
      this.deleteItems.api = "/api/batch/" + item._id;
      this.deleteItems.role = "insadmin-auth-token";

      $(".deleteAlert").show();
    },

    deleteitemfromarray(id) {
      this.batches = this.batches.filter((e) => e._id !== id);
    },

    recieveResponse(e) {
      console.log("Yes bro");
      if (e) {
        console.log(e, "this is e", this.deleteItems.item._id);
        this.isSuccess = true;
        this.deleteitemfromarray(this.deleteItems.item._id);
        setTimeout(() => {
          this.isSuccess = false;
        }, 3500);
      }
    },

    updateItem(item) {
      this.$router.push({ name: "dashboard-batches-addnew", params: item });
    },

    sendMessage() {
      console.log("clicked");
      $(".mesageAlert").show();
    },
  },
};
</script>

<style scoped>
.batches-content {
  margin-top: 3rem;
  margin-bottom: 5rem;
}

table th,
table td {
  text-align: center;
}

table tr:nth-child(even) {
  background-color: #e4e3e3;
}

th {
  background: #333;
  color: #fff;
}

.pagination {
  margin: 0;
}

.pagination li:hover {
  cursor: pointer;
}

.header_wrap {
  padding: 30px 0;
}
.num_rows {
  width: 20%;
  float: left;
}
.tb_search {
  width: 20%;
  float: right;
}
.pagination-container {
  width: 70%;
  float: left;
}

.rows_count {
  width: 20%;
  float: right;
  text-align: right;
  color: #999;
}
.adjust-margin {
  margin-bottom: -5rem !important;
}

.cursor {
  cursor: pointer;
}
</style>
