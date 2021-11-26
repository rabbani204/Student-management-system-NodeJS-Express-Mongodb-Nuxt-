<template>
  <h1>Hello student dashboard!!</h1>
</template>
<script>
export default {
  middleware: "authenticated-student",
  mounted() {
    this.$axios.setHeader("Authorization", this.$cookies.get("student-auth-token"));
    this.$axios
      .get("/api/student/checkauth")
      .then((res) => {
        console.log(res, "this is response");
        if (!res.data.success) {
          this.$cookies.remove("student-auth-token");
          this.$cookies.remove("student-user-data");
          this.$router.push("/login");
        }
      })
      .catch((err) => {
        console.log(err);
        this.$cookies.remove("student-auth-token");
        this.$cookies.remove("student-user-data");
        this.$router.push("/login");
      });
  },
  layout: "userloged",
};
</script>

<style scoped>
</style>