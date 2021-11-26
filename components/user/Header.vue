<template>
  <div>
    <section class="headcontainer">
      <nav class="container navbar navbar-expand-lg navbar-dark bg-transparent">
        <img src="/user/img/logo3.jpg" width="150" alt />
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
            <li class="nav-item" v-for="(item) in navlists" :key="item.id">
              <a class="nav-link" :href="item.link">
                <span
                  class="navtext"
                  style="font-family: 'EB Garamond', serif !important"
                  >{{ item.title }}</span
                >
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <div class="container">
        <div class="row">
          <div class="col-md-12 review-title-back">
            <div class="transparent">
              <p class="text-title">
                Best online service to take care of your students
              </p>
              <h2 class="text-title mt-4 mb-5">Care My Students</h2>

              <a href="#" class="primary-btn2 mb-3 mb-sm-0">Explore Features</a>
              <a href="#" class="primary-btn ml-sm-3 ml-0 buttion-size-match"
                >Get Started</a
              >
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  components: {},
  mounted() {
    if (this.$cookies.get("insadmin-auth-token")) {
      this.pushToNavist({ id:4, title: "Dashboard", link: "/dashboard" });
    } else if (this.$cookies.get("parent-auth-token")) {
      this.pushToNavist({ id:4, title: "Dashboard", link: "/parent/dashboard" });
    } else if (this.$cookies.get("student-auth-token")) {
      this.pushToNavist({ id:4, title: "Dashboard", link: "/student/dashboard" });
    } else {
      this.pushToNavist({ id:4, title: "Login", link: "/login" });
      this.pushToNavist({ id: 5, title: "Signup", link: "/register" });
    }
  },
  data: () => ({
    navlists: [
      {
        id:1,
        title: "Features",
        link: "/features",
      },
      // {
      // 	title: 'Universities',
      // 	link: '/universities'
      // },
      // {
      // 	title: 'Blog',
      // 	link: '/blog'
      // },
      // {
      // 	title: 'Confessions',
      // 	link: '/confess'
      // },
      {
        id:2,
        title: "About",
        link: "/about",
      },
      {
        id:3,
        title: "Contact",
        link: "/contact",
      },
    ],
    registar: false,
  }),
  methods: {
    pushToNavist(item) {
      let found,
        index = 0;
      this.navlists.map((i) => {
        index = index + 1;
        if (i.title == item.title) {
          found = true;
        }
        else if (index == this.navlists.length && !found) {
          this.navlists.push(item);
          index = 0;
          found = false;
        }
      });
    },
  },
};
</script>

<style scoped>
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

.buttion-size-match {
  letter-spacing: 4.1px;
}
</style>
