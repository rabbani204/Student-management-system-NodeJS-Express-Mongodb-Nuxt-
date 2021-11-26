<template>
  <div>
    <header class="app-header navbar">
      <button class="navbar-toggler mobile-sidebar-toggler d-lg-none mr-auto" type="button">
        <span class="navbar-toggler-icon"></span>
      </button>
      <a class="navbar-brand" href="#"></a>
      <button class="navbar-toggler sidebar-toggler d-md-down-none" type="button">
        <span class="navbar-toggler-icon"></span>
      </button>
    </header>

    <div class="app-body">
      <div class="sidebar bg-color-2">
        <nav class="sidebar-nav">
          <ul class="nav font-weight-bold">
            <li class="nav-item">
              <a class="nav-link" href="/admin/dashboard/submittedpayments">
                <i class="icon-speedometer"></i>Payments
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/admin/dashboard/services">
                <i class="icon-speedometer"></i>Services
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/admin/dashboard/blog">
                <i class="icon-speedometer"></i>Blog
              </a>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="/admin/dashboard/user">
                <i class="icon-speedometer"></i>User
              </a>
            </li>

            <li class="nav-item nav-dropdown">
              <a class="nav-link" href="/admin/dashbord/logout">
                <i class="icon-star"></i>Logout
              </a>
            </li>
          </ul>
        </nav>
        <button class="sidebar-minimizer brand-minimizer" type="button"></button>
      </div>

      <!-- Main content -->
      <main class="main">
        <nuxt />
      </main>
    </div>

    <footer class="app-footer">
      <span>
        <a href="#">Diu Book Shop</a> © 2017 creativeLabs.
      </span>
      <span class="ml-auto">
        Powered by
        <a href="#">Diu Book Shop</a>
      </span>
    </footer>
  </div>
</template>

<script>
// import Header from "~/components/admin/Header";
// import SideMenu from "~/components/admin/SideMenu";
// import Footer from "~/components/admin/Footer";
export default {
  head() {
    return {
      link: [
        {
          rel: "stylesheet",
          href: "https://use.fontawesome.com/releases/v5.3.1/css/all.css"
        },
        { rel: "stylesheet", href: "/admin-assets/css/admin.css" }
      ],
      script: [
        // { src:"https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.3"},
        { src: "/admin-assets/js/admin.js" }
      ]
    };
  }
  //   components: {
  //     Header,
  //     SideMenu,
  //     Footer
  //   }
};
</script>
<style >
.app-footer {
  margin-top: 200px !important;
}
</style>




