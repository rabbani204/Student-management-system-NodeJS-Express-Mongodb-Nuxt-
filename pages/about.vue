<template>
<div>
    <CommonHeader :headerinfo="headerinfo"/>
    <div class="aboutUs">
                <section class="cartholder">
                        <div class="carttitle">
                            <div class="row">
                                <div class="col-md-3">
                                   <h2>10m+</h2>
                                   <h5>Daily User</h5>

                                </div>
                                <div class="col-md-3">
                                      <h2>85k+</h2>
                                      <h5>Paid Members</h5>
                                    </div>
                                    <div class="col-md-3">
                                            <h2>10+</h2>
                                            <h5>Services</h5>
                                        </div>
                                        <div class="col-md-3">
                                                <h2>20+</h2>
                                            <h5>Campus provide</h5>
                                            </div>
                            </div>
                        </div>
                </section>
                <section class="partner">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12 text-center">
                                <h1>Our Partners</h1>
                                <div class="row">
                                    <div class="col-md-4">
                                            <img src="https://a.slack-edge.com/7a5a9/marketing/img/about/logos/logo-panasonic.png" alt="">
                                

                                    </div>
                                    <div class="col-md-4">
                                            <img src="https://a.slack-edge.com/7a5a9/marketing/img/about/logos/logo-panasonic.png" alt="">
                                

                                    </div>
                                    <div class="col-md-4">
                                            <img src="https://a.slack-edge.com/7a5a9/marketing/img/about/logos/logo-panasonic.png" alt="">
                                

                                    </div>
                                    <div class="col-md-6">
                                            <img src="https://a.slack-edge.com/7a5a9/marketing/img/about/logos/logo-panasonic.png" alt="">
                                

                                    </div>
                                    <div class="col-md-6">
                                            <img src="https://a.slack-edge.com/7a5a9/marketing/img/about/logos/logo-panasonic.png" alt="">
                                

                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </section>
                <section class="card1">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-6 text-center">
                                <h1>Building the Project for Use</h1>
                                <p>Connect your conversations with the tools and services that you use to get the job done. With over 1,500 apps.

                                        <li><a href="">Our Partners</a></li>the world's largest SaaS companies and 1000+ products that are shaping the future of work.
                                        
                                        <li><a href="">The Project App </a></li>gives you access to thousands of apps that can extend the capabilities of your Slack team.
                                        
                                        <li><a href="">The Project Fund</a></li>is an $80 million dollar fund that supports developers and small companies building apps for Slack.
                            </div>
                            <div class="col-md-6 text-center">
                                <img src="https://a.slack-edge.com/7a5a9/marketing/img/about/building_the_ecosystem.png" alt="" srcset="">
                            </div>
                        </div>
                    </div>
                </section>
                <section class="card2">
                        <div class="container">
                            <div class="row">
                                    <div class="col-md-6 text-center">
                                            <img src="https://a.slack-edge.com/7a5a9/marketing/img/about/who_we_are.png" alt="" srcset="">
                                        </div>
                                <div class="col-md-6 text-center">
                                    <h1>Who we are and how to join us</h1>
                                    <p>Connect your conversations with the tools and services that you use to get the job done. With over 1,500 apps.
    
                                            <li><a href="">Our Leadership</a></li>the world's largest SaaS companies and 1000+ products that are shaping the future of work.
                                            
                                            <li><a href="">Carrers</a></li>gives you access to thousands of apps that can extend the capabilities of your Slack team.
                                            
                                            <li><a href="">Campus Crowds Use</a></li>is an $80 million dollar fund that supports developers and small companies building apps for Slack.
                                </div>
                                
                            </div>
                        </div>
                    </section>
                    <section class="office">
                        <div class="container">
                            <div class="row">
                                <div class="col-lg-12 text-center">
                                    <h1>Our Office</h1>
                                </div>
                             <div class="col-md-4">
                                    <div class="card" style="width: 18rem;">
                                        <div class="card-body">
                                          <h5 class="card-title">Ashuliya</h5>
                                          <p class="card-text">Dhaka,Bangladesh</p>
                                          <a href="#" class="primary-btn2">Get Directions</a>
                                        </div>
                                      </div>
                                    </div>
                                <div class="col-md-4">
                                    <div class="card" style="width: 18rem;">
                                        <div class="card-body">
                                          <h5 class="card-title">Dubai</h5>
                                          <p class="card-text">WorldWide</p>
                                          <a href="#" class="primary-btn2">Get Directions</a>
                                        </div>
                                      </div>
                                    </div>
                                <div class="col-md-4">
                                    <div class="card" style="width: 18rem;">
                                        <div class="card-body">
                                          <h5 class="card-title">San Andress</h5>
                                          <p class="card-text">America</p>
                                          <a href="#" class="primary-btn2">Get Directions</a>
                                        </div>
                                      </div>
                                    </div>
                            </div>
                        </div>
                    </section>
        </div>
    
</div>
</template>

<script>
import CommonHeader from '~/components/user/CommonHeader'
export default {
    layout: "user",
    components:{ CommonHeader},
    data(){
         return{
             headerinfo : { title:'Who We Are!', description:'Here You can find ourselves'}

         }
     }
}
</script>


<style>
.grid {
  height: 100px;
}
.introholder {
  background-color: #d7ccc8 !important;
  width: 100%;
  height: 330px;
}
.introtitle {
  text-align: center !important;
  padding-top: 4%;
}

.carttitle {
  text-align: center !important;
  margin-top: 50px;
  background-color: #f5f5f5 !important;
  padding: 20px;

}
.carttitle h2 {
  font-style: bold;
}
.partner {
  margin-top: 30px;
  padding: 20px;
}

.partner img {
  margin: 50px;
}
.card1 p {
  padding: 10px;
  margin-top: 20px;
}
.card1 {
  padding: 5px;
  margin-top: 30px;
}
.card2 {
  padding: 5px;
  margin-top: 30px;
}
.office {
  margin-top: 20px;
  background-color: #d7ccc8;
  padding: 5px;
  margin-bottom: 10px;
}
</style>
