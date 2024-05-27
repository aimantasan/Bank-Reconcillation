<template>
  <div>
    <LayoutsBreadcrumb />
    <hr />
    <br />
    <rs-card class="p-4" style="display: flex; flex-direction: column; gap: 20px;">
      <h4 style="display: flex; align-items: center" class="mb-2">
        <span>DuitNow Santai Duplicate Transaction</span>
        <Icon
          name="ic:outline-info"
          size="16"
          style="cursor: pointer; margin-left: 8px"
          @click="showModalOK = true"
        ></Icon>
      </h4>
      <div style="display: flex; flex-direction: column;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <FormKit
            type="date"
            label="Transaction Date"
            :classes="{
              outer: 'w-5/6',
              fieldset: 'border-0',
              options: 'flex',
            }"
            v-model="selectedDate"
          />
          <rs-button class="mt-3 mr-10 ml-3" @click="generateFunction">
            <Icon class="mr-1" name="ri:ai-generate"></Icon>
            Generate
          </rs-button>
        </div>
        <div style="margin-top: 20px;">
          <p v-if="logMessages.duplicate">{{ logMessages.duplicate }}</p>
          <p v-if="logMessages.formattedDate">{{ logMessages.formattedDate }}</p>
          <p v-if="logMessages.settlement">{{ logMessages.settlement }}</p>
          <p v-if="logMessages.realSettlement">{{ logMessages.realSettlement }}</p>
          <p v-if="logMessages.debt">{{ logMessages.debt }}</p>
        </div>
      </div>
    </rs-card>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
const config = useRuntimeConfig();

// Function to get today's date in yyyy-mm-dd format
const getTodayDate = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  return `${year}-${month}-${day}`;
};

// Function to log the date in the desired format
const logFormattedDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const formattedDate = `${year}-${month}-${day}`;

  return {
    duplicate: `duplicate${day}hb`,
    formattedDate: `${formattedDate}`,
    settlement: `settlement_${day}hb`,
    realSettlement: `real_settlement_${day}hb`,
    debt: `debt_${day}hb`,
  };
};

// Initialize selectedDate with today's date
const selectedDate = ref(getTodayDate());
const logMessages = ref({});

const requestTodayDuplicate = async (formattedDate) => {
  try {
    const { data: response } = await useFetch(
      `${config.public.apiURL}/compliance/getTodayTransaction`,
      {
        method: "POST",
        body: JSON.stringify({
          date: formattedDate
        }),
      }
    );

    if (response.value.statusCode === 200) {
      console.log(response.value.data);
    } else {
      console.log(response.value.message);
    }
  } catch (e) {
    console.log(e);
  }
};

watch(selectedDate, (newDate) => {
  if (newDate) {
    // You can add any additional logic here if needed when the date changes
  }
});

onMounted(() => {
  // Initial log when the component is mounted
  logMessages.value = logFormattedDate(selectedDate.value);
});

const generateFunction = () => {
  if (selectedDate.value) {
    logMessages.value = logFormattedDate(selectedDate.value);
    const formattedDate = logMessages.value.formattedDate;
    requestTodayDuplicate(formattedDate);  // Pass the formatted date to the API request
  }
};
</script>
