export default ({ app, redirect, $axios }) => {
    const cookieRes = app.$cookies.get('cookie-name')
    if (!app.$cookies.get('insadmin-auth-token')) {
      return redirect('/login');
    }
  }
  