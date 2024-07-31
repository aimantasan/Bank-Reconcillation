<script setup>
definePageMeta({
  title: "Login",
  layout: "empty",
  middleware: ["main"],
});

const { $swal } = useNuxtApp();
const config = useRuntimeConfig();

const username = ref("");

const login = async () => {
  try {
    const { data: response } = await useFetch(
      `${config.public.apiURL}/auth/sendOTPEmail`,
      {
        method: "POST",
        body: JSON.stringify({
          OTPusername: username.value,
        }),
      }
    );

    if (response.value.statusCode == 200) {
      console.log(response);
      $swal.fire({
            title: "Email Sent",
            text: `An OTP Code has been send to ${response.value.body[1]}`,
            icon: "success",
            timer: 2000,
          });

          return navigateTo(`/auth/otp?token=${response.value.body[0]}&email=${encodeUserData(response.value.body[1])}&username=${encodeUserData(username.value)}`);
    } else {
      $swal.fire({
        icon: "error",
        title: "Error has occured!",
        text: "Please fill in the username area",
        //text: response.value.message,
      });
    }
  } catch (e) {
    console.log(e);
  }
};

function generateOTP() {
  // Define the length of the OTP
  const otpLength = 6;

  // Generate a random 6-digit number
  const otp = Math.floor(100000 + Math.random() * 900000);

  // Convert the number to a string and pad with zeros if necessary
  const otpString = otp.toString().padStart(otpLength, "0");

  return otpString;
}

function encodeUserData(userData) {
  return btoa(userData); // Using btoa() for Base64 encoding
}
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
        <p class="text-slate-950 mb-6 mt-2 text-xl">Sign In to your account</p>
        <div class="grid grid-cols-2">
          <FormKit
            type="text"
            v-model="username"
            placeholder="Username"
            :classes="{
              outer: 'col-span-2',
              label: 'text-left',
              messages: 'text-left',
            }"
          />

          <FormKit
            type="button"
            input-class="w-full"
            outer-class="col-span-2"
            @click="login"
          >
            Sign In
          </FormKit>
        </div>
      </rs-card>
    </div>
  </div>
</template>
