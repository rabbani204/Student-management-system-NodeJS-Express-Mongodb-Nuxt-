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
        <!-- Main content -->
        <main class="main">
            <nuxt />
        </main>

    </div>

    <footer class="app-footer">
        <span>
            <a href="#">Diu Book Shop</a> © 2017 creativeLabs.</span>
        <span class="ml-auto">Powered by
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
          rel: "stylesheet", href: "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        },
        { rel: "stylesheet", href: "/admin-assets/css/admin.css" },

		
      ],
      script: [
		// { src:"https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.3"},
		{ src: "/admin-assets/js/admin.js" }
		
      ]
    };
  },
//   components: {
//     Header,
//     SideMenu,
//     Footer
//   }
};
</script>



