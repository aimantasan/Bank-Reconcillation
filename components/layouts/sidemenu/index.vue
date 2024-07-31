<script setup>
import Menu from "~/navigation/index.js";
import RSItem from "~/components/layouts/sidemenu/Item.vue";

// const menuItem = Menu;

const props = defineProps({
  menuItem: {
    type: Array,
    default: () => Menu,
    required: false,
  },
});

onMounted(() => {
  try {
    const el = document.querySelector(".active-menu").closest(".menu-content");
    const elParent = el.parentElement.parentElement;

    if (elParent) {
      elParent.classList.remove("hide");
      elParent.querySelector("a").classList.add("nav-open");
    }
    if (el) el.classList.remove("hide");
  } catch (e) {
    // console.log(e);
    return;
  }
});
</script>

<template>
  <div class="vertical-menu flex flex-col bg-primary text-white/80">
    <div class="py-2 px-4">
      <nuxt-link to="/">
        <div class="flex flex-auto gap-3 justify-center items-center h-[48px]">
          <img
            class="block dark:hidden"
            src="@/assets/img/logo/logo-white.svg"
            alt="toyyibpay"
          />
          <img
            class="hidden dark:block"
            src="@/assets/img/logo/logo-white.svg"
            alt=""
          />
          <!-- <span class="text-xl font-semibold text-primary dark:text-white"
          >Mawar</span
        > -->
        </div>
      </nuxt-link>
    </div>
    <NuxtScrollbar
      class="flex flex-col justify-between my-6"
      style="max-height: 82dvh"
    >
      <RSItem :items="menuItem"></RSItem>
    </NuxtScrollbar>
  </div>
</template>
