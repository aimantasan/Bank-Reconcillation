<script setup>
import { useUserStore } from "~/stores/user";

definePageMeta({
  title: "Login",
  layout: "empty",
});

const userStore = useUserStore();
const { $swal,$router } = useNuxtApp();
const config = useRuntimeConfig();

const otpNumber = ref("");
const token = useRoute().query.token;
const email = useRoute().query.email;
const username = useRoute().query.username

function decodeUserNo(encodedUserNo) {
  return atob(encodedUserNo); // Using atob() for Base64 decoding
}

if (!token) {
  navigateTo(`/auth/login`);
}

const { data: validateToken } = await useFetch(
  `${config.public.apiURL}/auth/validateToken`,
  {
    method: "GET",
    query: {
      token: token,
    },
  }
);
if (validateToken.value.statusCode != 200) {
  $swal
    .fire({
      icon: "error",
      title: "Error has occured!",
      text: validateToken.value.message,
    })
    .then(() => {
      return navigateTo(`/auth/login`);
    });
}

const login = async () => {
  try {
    const { data: response } = await useFetch(
      `${config.public.apiURL}/auth/verifyOTP`,
      {
        method: "GET",
        query: {
          token: token,
          otp: otpNumber.value,
        },
      }
    );

    if (response.value.statusCode == 200) {
      // Save token to pinia store
      userStore.setUsername(response.value.body.username);
      userStore.setEmail(response.value.body.email);
      userStore.setRoles(response.value.body.roles);
      userStore.setAccessToken(response.value.body.accessToken);
      userStore.setRefreshToken(response.value.body.refreshToken);
      userStore.setIsAuthenticated(true);

      $swal.fire({
            title: "Success",
            text: "The OTP Code has been validated.",
            icon: "success",
            timer: 2000,
          });

      return navigateTo(`/`);
    } else {
      $swal.fire({
        icon: "error",
        title: "Error has occured!",
        text: response.value.message,
      });

      return navigateTo(`/auth/login`);
    }
  } catch (e) {
    console.log(e);
  }
};

let resendTimer;
var timeout = false;
const resendCooldown = ref(60); // Initial cooldown in seconds

function startResendTimer() {
  resendTimer = setInterval(() => {
    resendCooldown.value -= 1;
    if (resendCooldown.value <= 0) {
      clearInterval(resendTimer);
      timeout = true;
    }
  }, 1000);
}

function resetResendCooldown() {
  resendCooldown.value = 60; // Reset cooldown to 60 seconds
}

function formatResendMessage() {
  return `Resend OTP Code will be available in <strong>${resendCooldown.value}</strong> seconds`;
}

onMounted(() => {
  resetResendCooldown();
  startResendTimer();
});

const resendOTP = async () => {

  try {
    const { data: response } = await useFetch(
      `${config.public.apiURL}/auth/sendOTPEmail`,
      {
        method: "POST",
        body: JSON.stringify({
          OTPusername: decodeUserNo(username),
        }),
      }
    );

    if (response.value.statusCode == 200) {
      $swal.fire({
            title: "Email Sent",
            text: `An OTP Code has been send to ${decodeUserNo(email)}`,
            icon: "success",
            timer: 2000,
          });
        
          $router.go(0);

    } else {
      $swal.fire({
        icon: "error",
        title: "Error has occured!",
        text: "Please contact administrator for details",
      });
    }
  } catch (e) {
    console.log(e);
  }
};
</script>

<template>
  <div
    class="flex-none md:flex justify-center text-center items-center h-screen"
  >
    <div class="w-full md:w-3/4 lg:w-1/2 xl:w-2/6">
      <rs-card class="h-screen md:h-auto px-10 md:px-16 py-12 md:py-20 mb-0">
        <div class="flex gap-3 justify-center">
          <img
            class="w-[210px] block dark:hidden"
            src="@/assets/img/logo/logo-colour.svg"
            alt="toyyibpay"
          />
        </div>
        <br />
        <FormKit
          type="otp"
          v-model="otpNumber"
          label="One-Time Password"
          :help="'We\'ve sent the OTP Code to your email at ' + decodeUserNo(email) + '. Insert the  OTP Code to continue'"
          digits="6"
          class="items-center"
        />
        <div class="grid grid-cols-2">
          <br />
          <FormKit
            type="button"
            input-class="w-full"
            outer-class="col-span-2"
            @click="login"
          >
            Submit OTP Code
          </FormKit>
        </div>
        <div>
          <!-- Display timer message when resend cooldown is active -->
          <template v-if=!timeout>
            <p v-html="formatResendMessage()"></p>
          </template>
          <!-- Display resend link when cooldown is over -->
          <template v-else><strong><a class="text-black-300 cursor-pointer" @click.prevent="resendOTP">Resend OTP Code</a></strong>
            
          </template>
        </div>
      </rs-card>
    </div>
  </div>
</template>
