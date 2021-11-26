<template>
  <div>
    <!-- <CommonHeader :headerinfo="headerinfo" /> -->
    <section class="feature_area section_gap_top">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-5">
            <div class="main_title">
              <h2 class="mb-3">Our features!</h2>
              <p class="pragraph">See our awesome features..</p>
            </div>
          </div>
        </div>
        <div class="row">
          <!-- Services -->
          <div class="col-lg-4 col-md-5" v-for="service in services" :key="service.id">
            <!-- <router-link :to="{ path: '/features/id' }"> -->
            <div class="single_feature">
              <div class="icon">
                <span class="flaticon-student">
                  <i :class="service.icon"></i>
                </span>
              </div>
              <div class="desc">
                <h4 class="mt-3 mb-2">
                  <b>{{ service.title }}</b>
                </h4>
                <p class="cardpara">{{ service.serviceDiscription }}</p>
              </div>
            </div>
            <!-- </router-link> -->
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import CommonHeader from "~/components/user/CommonHeader";
export default {
  layout: "user",
  components: { CommonHeader },
  data() {
    return {
      services: [
        {
          id: 1,
          icon: "fas fa-layer-group",
          title: "Total Batchs",
          serviceDiscription:
            "You Have total 10 running batch."
        },

        {
          id: 2,
          icon: "fas fa-users",
          title: "Total Students",
          serviceDiscription:
            "You Have total 100  students."
        },
        {
          id: 3,
          icon: "fas fa-file-invoice",
          title: "Payments Running Month",
          serviceDiscription:
            "See all payments"
        },
        {
          id: 3,
          icon: "fas fa-money-check-alt",
          title: "Find Dues",
          serviceDiscription:
            "You have total 100000 BDT Dues"
        },
        {
          id: 3,
          icon: "fas fa-inbox",
          title: "Send Notification",
          serviceDiscription:
            "You have 55 sms left.s"
        },
        {
          id: 3,
          icon: "fas fa-ambulance",
          title: "Emergency contact",
          serviceDiscription:
            "You can contact with us when require or buy sms."
        }
      ],
      headerinfo: {
        title: "Our Features",
        description: "Here u can find our all features"
      }
    };
  }
};
</script>

<style scoped>
.cardpara {
  color: black !important;
}

.pragraph {
  color: rgb(80, 77, 77) !important;
}
</style>
