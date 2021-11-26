<template>
  <h1>Hello Parent Dashboard!!!</h1>
</template>
<script>
export default {
  middleware: "authenticated-parent",
  mounted() {
    this.$axios.setHeader(
      "Authorization",
      this.$cookies.get("parent-auth-token")
    );
    this.$axios
      .get("/api/parent/checkauth")
      .then((res) => {
        console.log(res, "this is response");
        if (!res.data) {
          this.$router.push("/login");
        }
      })
      .catch((err) => {
        this.$cookies.remove("parent-auth-token");
        this.$cookies.remove("parent-user-data");
        this.$router.push("/login");
        this.$router.push("/login");
      });
  },
  layout: "userloged",
};
</script>
<style scoped>
</style>