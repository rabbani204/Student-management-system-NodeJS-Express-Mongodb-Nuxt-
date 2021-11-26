<template>
	<div>
		<div class="app flex-row align-items-center">
			<div class="container">
			<div class="row justify-content-center">
				<div class="col-md-6">
					<h2 style="text-align: center">Add Service</h2>
					<p v-if="message" class="msg">{{message}}</p>
					<div class="card mx-4">
						<div class="card-body p-4">
								<form @submit.prevent="onsubmit">
									<div class="form-group">
										<label for="source">Service Id</label>
										<input type="text" v-model="newService.id" class="form-control" id="source" placeholder="ID">
									</div>
									<div class="form-group">
										<label for="source">Service Title</label>
										<input type="text" v-model="newService.title" class="form-control" id="source" placeholder="Title">
									</div>

								<div class="form-group">
									<label for="exampleFormControlTextarea1">Description</label>
									<textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="newService.desc"></textarea>
								</div>
								<div class="form-group">
									<label for="exampleFormControlTextarea1">Image</label>
									<input type="file" v-on:change="uploadimage()" class="form-control" id="source" placeholder="Service Image">
									
								</div>
									<button type="submit" class="submit">Submit</button>
								</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
export default {
	layout:'admin',
	data:()=>({
		newService:{},
		message: ''
	}),
	mounted(){
        // this.$axios.$get('/api/action/getalltopic').then(res=>{
		// 	console.log(res, 'res')
		// 	this.topicList = res.data;
		// 	console.log(this.topicList, 'topl')
		// })
	},
	methods:{
		onsubmit(){
			console.log(this.newService);
			
        //    this.$axios.$post('/api/action/addtopic', this.topic).then(res=>{
		// 	  if( res.success == true){
		// 		this.message = res.message;
		// 		setTimeout(() => {
		// 			this.message = false;
		// 		}, 3000);
		// 	  }
		//    })
		},
		uploadimage(){
			var image ='';
			
			

		}
	}
}
</script>

<style scoped>
.msg{
	color: green;
	text-align: center;
}
.submit{
	display: inline-block;
    background: #002347;
    padding: 0 48px;
    color:  #fdc632;
    font-size: 13px;
    font-weight: 500;
    line-height: 50px;
    border-radius: 5px;
    outline: none !important;
    text-align: center;
    text-transform: uppercase;
    cursor: pointer;
    -webkit-transition: all .3s ease 0s;
    -moz-transition: all .3s ease 0s;
    -o-transition: all .3s ease 0s;
    transition: all .3s ease 0s;
}

</style>
