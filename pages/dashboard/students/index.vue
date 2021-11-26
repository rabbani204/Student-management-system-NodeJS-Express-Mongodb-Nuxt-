<template>
  <div class="batches-content">
    <div class="row justify-content-center">
      <div class="col-lg-5 adjust-margin">
        <div class="main_title">
          <h2 class="mb-3">All students!!</h2>
          <p class="pragraph">Information of all students.</p>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="container">
          <button
            type="submit"
            @click="gotoAnother('dashboard')"
            class="primary-btn2 mb-3 mb-sm-0 lgin-cs"
          >
            Dashboard
          </button>
          <button
            type="submit"
            @click="gotoAnother('addnew')"
            class="primary-btnr mb-3 mb-sm-0"
          >
            Add student
          </button>
        </div>
      </div>

      <!-- <div class="header_wrap">
        <div class="tb_search">
          <input
            type="text"
            id="search_input_all"
            onkeyup="FilterkeyWord_all_table()"
            placeholder="Search Students.."
            class="form-control"
          />
        </div>
      </div> -->

      <table class="table table-striped table-class" id="table-id">
        <thead>
          <tr style="background: #002347!important; color: #fdc632 !important">
            <th>Name</th>
            <th>Unique Key</th>
            <th>Contact</th>
            <th>Batch</th>
            <th>Parent-Contact</th>
            <th>Inistutation Name</th>
            <th>Dues</th>
            <th>Details</th>
            <th>Update</th>
            <th>Delete</th>
            <th>Send Message</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(student, i) in students" :key="i">
            <td>{{ student.name }}</td>
            <td>{{ student.uniqueKey }}</td>
            <td>{{ student.contact }}</td>
            <td>{{ student.batch }}</td>
            <td>{{ student.parentContact }}</td>
            <td>{{ student.inistutation }}</td>
            <td>{{ student.payments }}</td>
            <td>
              <i class="far fa-eye cursor"></i>
            </td>
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
import CommonHeader from "~/components/user/CommonHeader";
export default {
  layout: "userloged",
  components: { CommonHeader },
  data() {
    return {
      students: [
        {
          name: "Rabbani",
          uniqueKey: "Rab200706054569",
          contact: "01751394949",
          batch: "Class-10 A",
          parentContact: "01303162584",
          inistutation: "ABC",
          payments: "Due-JAN20",
        },
        {
          name: "Rabbani",
          uniqueKey: "Rab200706054569",
          contact: "01751394949",
          batch: "Class-10 A",
          parentContact: "01303162584",
          inistutation: "ABC",
          payments: "Due-JAN20",
        },
        {
          name: "Rabbani",
          uniqueKey: "Rab200706054569",
          contact: "01751394949",
          batch: "Class-10 A",
          parentContact: "01303162584",
          inistutation: "ABC",
          payments: "Due-JAN20",
        },
      ],
    };
  },
  methods: {
    gotoAnother(option) {
      if (option == "dashboard") {
        this.$router.push("/dashboard");
      } else {
        this.$router.push("/dashboard/students/addnew");
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
