export default defineNuxtRouteMiddleware((to, from) => {
  return navigateTo("/user/uploader");
});