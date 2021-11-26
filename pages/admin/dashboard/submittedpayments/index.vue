<template>
  <div>
    <div class="breadcrumb bg-color-1">
      <div class="breadcrumb-item active hb-dashboard">
        <span class="text-dark ml-2">
          <strong>Submitted Payments</strong>
        </span>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-auto">
          <a href="/admin/dashboard/services/addnew" class="btn btn-primary">Add New</a>
        </div>
      </div>

      <table
        class="table table-striped table-sm bg-color-8 table-bordered table-responsive-sm mt-3"
      >
        <thead>
          <tr>
            <th>Institution Name</th>
            <th>Sender Name</th>
            <th>uniqueId</th>
            <th>Bkash Number</th>
            <th>Transcation ID</th>
            <th>Recieve</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="payment in payments" :key="payment.id">
            <td>{{ payment.institution_name }}</td>
            <td>{{ payment.payment_sender_name }}</td>
            <td>{{ payment.payment_sender_name }}</td>
            <td>{{ payment.payment_bkash_number }}</td>
            <td>{{ payment.payment_key }}</td>
            <td>
              <a @click="accpetPayments(payment)">
                <i class="fas fa-check-square"></i>
              </a>
            </td>
            <td>
              <button data-toggle="modal" value="sdsd" class="delete" data-target="#myModal">
                <i class="fas fa-trash" aria-hidden="true"></i>
              </button>
            </td>
            <div class="modal fade" id="myModal" role="dialog">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h4 class="modal-title">Confirm Delete</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                  </div>
                  <div class="modal-header">Are you sure you want to delete the entry?</div>
                  <div class="modal-footer">
                    <a href class="btn btn-danger yes">yes</a>
                  </div>
                </div>
              </div>
            </div>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  layout: "admin",

  data: () => ({
    payments: []
  }),
  mounted() {
    this.$axios.$get("/api/admin/submittedpayments").then(res => {
      console.log(res, "res");
      this.payments = res.data;
    });
  },

  methods: {
    accpetPayments(payment) {
      console.log(payment)
      this.$axios.$post("/api/admin/accpetpayment",{id: payment._id}).then(res => {
        if(!res.success){
          console.log('Something went wrong')
        }

        else{
          console.log('success')
        }
      });
    }
  }
};
</script>
<style>
body {
  height: 100px !important;
}
</style>
