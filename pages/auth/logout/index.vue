<script setup>
import { useUserStore } from "~/stores/user";

definePageMeta({
  title: "Logout",
  layout: "empty",
});

const { $swal } = useNuxtApp();

const userStore = useUserStore();
const config = useRuntimeConfig();

// remove token from pinia store
userStore.setEmail("");
userStore.setRoles([]);
userStore.setAccessToken("");
userStore.setRefreshToken("");
userStore.setIsAuthenticated(false);

window.location.href = "/auth/login";
</script>

<template>
  <div>
    <h1></h1>
  </div>
</template>
