<script setup>
useHead({
  title: "Tools | Settlement Tools for Daily Recurring Tasks",
  description: "Home page",
  htmlAttrs: {
    lang: "en",
  },
});

const nuxtApp = useNuxtApp();
const loading = ref(true);

onMounted(() => {
  // Hide loading indicator if not hydrating
  setTimeout(() => {
    loading.value = false;
  }, 1000);

  // Get theme from localStorage
  let theme = localStorage.getItem("theme") || "default";
  document.documentElement.setAttribute("data-theme", theme);
});
</script>

<template>
  <div>
    <VitePwaManifest />
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <Loading v-if="loading" />
      <NuxtPage :key="$route.fullPath" v-else />
    </NuxtLayout>
  </div>
</template>
