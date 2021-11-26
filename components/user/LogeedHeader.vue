<template>
  <div>
    <section class="headcontainera">
      <nav class="navbar navbar-expand-lg" style="background: #d7ccc8">
        <img src="/user/img/logo1.jpg" width="150" alt />
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <a class="nav-link" href="/">
                <span class="navtext">Home</span>
              </a>
            </li>
            <li class="nav-item" v-for="(item, i) in navlists" :key="i">
              <a class="nav-link" :href="item.link">
                <span
                  class="navtext"
                  style="font-family: 'EB Garamond', serif !important"
                  >{{ item.title }}</span
                >
              </a>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbardrop"
                data-toggle="dropdown"
              >
                <span class="navtext">
                  <span class="img-br">
                    <img src="/user/img/author2.png" alt="author" srcset />
                  </span>
                  Profile
                </span>
              </a>
              <div class="dropdown-menu">
                <a class="dropdown-item" id="navitem" href="/dashboard/profile">
                  <span
                    style="
                      color: white;
                      font-family: 'EB Garamond', serif !important;
                    "
                    >Profile</span
                  >
                </a>
                <a class="dropdown-item" id="navitem" @click="logout()">
                  <span
                    style="
                      color: white;
                      font-family: 'EB Garamond', serif;
                      cursor: pointer;
                    "
                    >Logout</span
                  >
                </a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </section>
  </div>
</template>

<script>
export default {
  mounted() {},

  data: () => ({
    navlists: [
      {
        title: "Batchs",
        link: "/dashboard/batches",
      },
      {
        title: "Students",
        link: "/dashboard/students",
      },
      {
        title: "Payments",
        link: "/dashboard/payments",
      },
      {
        title: "Dues",
        link: "/dashboard/dues",
      },
      {
        title: "Notification",
        link: "/dashboard/send-notification",
      },
      {
        title: "Emergency Contact",
        link: "/dashboard/emergency-contact",
      },
    ],
  }),

  layout: "user",
  methods: {
    logout() {
      console.log("logout is calling");

      let x = this.$route.path;
      console.log(x.slice(1, 6), "after slice");
      if (x.slice(1, 6) == "dashb") {
        console.log("da");
        this.$cookies.remove("insadmin-auth-token");
        this.$cookies.remove("ins-user-data");
      }

      if (x.slice(1, 6) == "stude") {
        console.log("da");
        this.$cookies.remove("student-auth-token");
        this.$cookies.remove("student-user-data");
      }

      if (x.slice(1, 6) == "paren") {
        console.log("da");
        this.$cookies.remove("parent-auth-token");
        this.$cookies.remove("parent-user-data");
      }

      this.$router.push("/");
    },
  },
};
</script>


<style>
.dropdown:hover > .dropdown-menu {
  display: block;
}

.dropdown > .dropdown-toggle:active {
  pointer-events: none;
}
.navbar-nav li {
  margin-left: 8px !important;
}
.navbar-nav li :hover {
  transition-delay: 0.1s;
  background-color: #002347;
  border-radius: 20px;
}

.navbar-nav li a :hover {
  color: #fdc632 !important;
}
.img-br img {
  height: 30px;
  width: 30px;
}

#navitem :hover {
  color: #fdc632 !important;
}
</style>
