<template>
  <div class="app flex-row align-items-center pace-done">
    <div class="pace pace-inactive">
      <div
        class="pace-progress"
        data-progress-text="100%"
        data-progress="99"
        style="transform: translate3d(100%, 0px, 0px);"
      >
        <div class="pace-progress-inner"></div>
      </div>
      <div class="pace-activity"></div>
    </div>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card-group">
            <div class="card p-4">
              <div class="card-body">
                <h1>Login</h1>
                <p v-if="show" class="danger">{{show}}</p>
                <form @submit.prevent="onsubmit">
                  <p class="text-muted">Sign In to your account</p>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text">
                        <i class="icon-user"></i>
                      </span>
                    </div>
                    <input
                      class="form-control"
                      type="text"
                      placeholder="Username"
                      v-model="user.email"
                    />
                  </div>
                  <div class="input-group mb-4">
                    <div class="input-group-prepend">
                      <span class="input-group-text">
                        <i class="icon-lock"></i>
                      </span>
                    </div>
                    <input
                      class="form-control"
                      type="password"
                      placeholder="Password"
                      v-model="user.password"
                    />
                  </div>
                  <div class="row">
                    <div class="col-6">
                      <button class="btn btn-primary px-4" type="submit">Login</button>
                    </div>
                    <div class="col-6 text-right">
                      <button class="btn btn-link px-0" type="submit">Forgot password?</button>
                    </div>
                  </div>
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
  layout: "admin-raw",
  data: () => ({
    user: {},
    show: ""
  }),
  methods: {
    onsubmit() {
      this.$axios.$post("/api/admin/login", this.user).then(res => {
        console.log(res, "res");
        if (!res.success) {
          this.show = res.message;
          setTimeout(() => {
            this.show = "";
          }, 3000);
        } else {
          this.$cookies.set("admin-auth-token", res.token, {
            path: "/",
            maxAge: 60 * 60 * 24 * 7
          });

          this.$cookies.set("admin-user-data", res.data, {
            path: "/",
            maxAge: 60 * 60 * 24 * 7
          });
          this.$router.push("/admin/dashboard");
        }
      });
    }
  }
};
</script>

<style>
.logo {
  margin-left: 45px;
}

.col-md-6 {
  margin-top: 150px;
}

body {
  background: linear-gradient(45deg, #29b6f6 32%, #81c784 100%) !important;
}
.danger {
  color: red;
}
</style>

