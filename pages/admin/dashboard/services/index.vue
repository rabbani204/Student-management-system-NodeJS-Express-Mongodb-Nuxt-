<template>
  <div>
    <div class="breadcrumb bg-color-1">
      <div class="breadcrumb-item active hb-dashboard">
        <span class="text-dark ml-2">
          <strong>Service</strong>
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
            <th>Title</th>
            <th>Description</th>
            <th>Image</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="service in serviceList" :key="service.id">
            <td>{{ service.title }}</td>
            <td>{{ service.description }}</td>
            <td>
              <img :src="service.image" style="height:100px;width:100px" />
            </td>
            <td>
              <a @click="updateservice(service)">
                <i class="fa fa-pencil"></i>
              </a>
            </td>
            <td>
              <button data-toggle="modal" value="sdsd" class="delete" data-target="#myModal">
                <i class="fa fa-trash-o" aria-hidden="true"></i>
              </button>
            </td>
            <div class="modal fade" id="myModal" role="dialog">
                    <div class="modal-dialog">

                        
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title">Confirm Delete</h4>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div class="modal-header">
                                Are you sure you want to delete the entry?
                            </div>
                            <div class="modal-footer">
                                <a href="" class="btn btn-danger yes">yes</a>
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
    serviceList: [
      {
        id: 1,
        title: "food delevery",
        description: "Providing all necessary food item at users home",
        image: "/uploads/assets/images/projectDefence.jpg"
      }
    ]
  }),
  mounted() {
    // this.$axios.$get('/api/action/getalltopic').then(res=>{
    // 	console.log(res, 'res')
    // 	this.topicList = res.data;
    // })
  },

  methods: {
    updateservice(topic){
    //    this.$router.push({
    // 	   path:"/admin/dashboard/services/addtopic"+'7678676'
    //    })
    console.log(this.serviceList);
    
    }
  }
};
</script>
<style>
body{
    height: 100px!important;
}
</style>
