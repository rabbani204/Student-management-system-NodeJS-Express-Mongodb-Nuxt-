<template>
  <div>
    <div class="container servicecontainer">
      <div class="row">
        <div class="col-md-3" v-for="service in services" :key="service.id">
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
              <ul class="list-group">
                <li class="list-group-item">Balance: 1000/-</li>
                <li class="list-group-item">Due: 200/-</li>
                <li class="list-group-item">Credit: 30/-</li>
              </ul>
              <button
                class="primary-btn2 btn-xs"
                @click="gotoAnother(service.navigate)"
              >
                <i
                  class="fas fa-arrow-right fa-2x arrow-fix"
                  style="margin-top: 1rem !important"
                ></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$axios.setHeader(
      "Authorization",
      this.$cookies.get("insadmin-auth-token")
    );

    this.$axios
      .get("/api/institution/checkauth")
      .then((res) => {
        console.log(res.data.data,'res data');
        if (!res.data.data || res.data.data.status ) {
          this.$cookies.remove("ins-auth-token");
          this.$cookies.remove("ins-user-data");
          this.$router.push('/login');
        }
        
        else if (res.data.data.payment_completed != 'completed') {
          this.$router.push('/dashboard/payment-notification');
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
  },
  middleware: "authenticated-ins",
  layout: "userloged",
  data() {
    return {
      hasservice: true,
      services: [
        {
          id: 1,
          icon: "fas fa-layer-group",
          title: "Total Batchs",
          serviceDiscription: "You Have total 10 running batch.",
          navigate: "/dashboard/batches",
        },

        {
          id: 2,
          icon: "fas fa-users",
          title: "Total Students",
          serviceDiscription: "You Have total 100  students.",
          navigate: "/dashboard/students",
        },
        {
          id: 3,
          icon: "fas fa-file-invoice",
          title: "Payments",
          serviceDiscription: "See all payments",
          navigate: "/dashboard/payments",
        },
        {
          id: 3,
          icon: "fas fa-money-check-alt",
          title: "Find Dues",
          serviceDiscription: "You have total 100000 BDT Dues",
          navigate: "/dashboard/dues",
        },
        {
          id: 3,
          icon: "fas fa-inbox",
          title: "Send Notification",
          serviceDiscription: "You have 55 sms left.s",
          navigate: "/dashboard/send-notification",
        },
        {
          id: 3,
          icon: "fas fa-ambulance",
          title: "Emergency Contact",
          serviceDiscription:
            "You can contact with us when require or buy sms.",
          navigate: "/dashboard/emergency-contact",
        },
      ],
    };
  },
  methods: {
    gotoAnother(option) {
      this.$router.push(option);
    },
  },
};
</script>

<style scoped>
body {
  margin: 0;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  text-align: left;
  background-color: #fff;
}

.serviceholder {
  margin-top: 150px;
}
.servicecontainer {
  margin-top: 20px;
  padding: 2px;
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
.availableServices {
  /* background-color: #D7CCC8 !important; */
  width: 100%;
  height: 150px;
}
.servicetitle {
  text-align: center !important;
  padding-top: 4%;
}
.avservice {
  height: 200px;
}
.desc,
button {
  margin-top: 10px;
  text-align: center;
}
.carapara {
  color: black !important;
}
</style>
