export default ({ app, redirect, $axios }) => {
  const cookieRes = app.$cookies.get('cookie-name')
  if (!app.$cookies.get('parent-auth-token')) {
    return redirect('/login');
  }
}

// if (!app.$cookies.get('insadmin-auth-token') || !app.$cookies.get('parent-auth-token') || !app.$cookies.get('student-auth-token') ) {
//   return redirect('/login');
// }