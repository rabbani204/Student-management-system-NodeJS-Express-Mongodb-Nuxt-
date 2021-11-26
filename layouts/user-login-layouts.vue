<template>
  <div>
    <LoginHeader />
    <nuxt />
    <Footer />
  </div>
</template>
<script>
import LoginHeader from "~/components/user/LoginHeader";
// import SideMenu from "~/components/admin/SideMenu";
import Footer from "~/components/user/Footer";
export default {
  head() {
    return {
      link: [
        {
          rel: "stylesheet",
          href: "https://use.fontawesome.com/releases/v5.3.1/css/all.css"
        },
        { rel: "stylesheet", href: "/user/css/style.css" },
        { rel: "stylesheet", href: "/user/css/bootstrap.css" },
        { rel: "stylesheet", href: "/user/css/font.css" }
      ],
      script: [
        // {
        //   src:
        //     "https://cdn.jsdelivr.net/npm/fullcalendar@3.9.0/dist/fullcalendar.min.js"
        // },
        { src: "/user/js/jquery.js" },
        { src: "/user/js/ajax.js" },
        { src: "/user/js/bootstrap.js" }
      ]
    };
  },
  components: {
    LoginHeader,
    // SideMenu,
    Footer
  }
};
</script>
<style>
body {
  font-family: "Literata", serif;
  background: #fff;
}
p {
  font-size: 15px !important;
  font-family: "Literata", serif;
}
</style>
