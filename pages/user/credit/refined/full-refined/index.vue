<script setup>
definePageMeta({
  title: "Full Refined Data", 
  middleware: ["auth"],
  requiresAuth: true,
});

import { ref } from 'vue';
const { $swal, $router } = useNuxtApp();

const selectedTransaction = ref(null);
const popupEditAppear = ref(false);
const remarks = ref('');
const selectedDate = ref('2019-12-02');

const openEditModal = (transaction) => {
  selectedTransaction.value = {
    ...transaction.value,
    Comments: [
      { timestamp: '2024-07-10 10:00', text: 'Initial transaction created.', action: 'Aiman' },
      { timestamp: '2024-07-12 15:24', text: 'Reviewed by manager.', action: 'Haziqah' },
      // Add more comments here as needed
    ].map(comment => {
      const [date, time] = comment.timestamp.split(' ');
      return {
        ...comment,
        date,
        time
      };
    }),
  };
  console.log("Selected transaction:", selectedTransaction.value);
  remarks.value = transaction.Remarks; // Populate remarks based on transaction data
  popupEditAppear.value = true;
};


const data = [
  {
    "TransactionID":"1912021238140141",
    "Reference No":"TP03375409293104021219",
    "Description":"Credit",
    "Amount In (RM)":"1391.00",
    "Transaction Amount (RM)":"1391.00",
    "Amount Nett (RM)":"1391.00",
    "Name":"Buyer1234",
    "Email":"Buyer1234@email.com",
    "SettlementReference":"0001100011",
    "Date":"2019-12-02 12:37:23",
  },
  {
    "TransactionID":"1912021238140141",
    "Reference No":"TP03375409293104021219",
    "Description":"Credit",
    "Amount In (RM)":"1391.00",
    "Transaction Amount (RM)":"1391.00",
    "Amount Nett (RM)":"1391.00",
    "Name":"Buyer1234",
    "Email":"Buyer1234@email.com",
    "SettlementReference":"0001100011",
    "Date":"2019-12-02 12:37:23",
  },
  {
    "TransactionID":"1912021238140141",
    "Reference No":"TP03375409293104021219",
    "Description":"Credit",
    "Amount In (RM)":"1391.00",
    "Transaction Amount (RM)":"1391.00",
    "Amount Nett (RM)":"1391.00",
    "Name":"Buyer1234",
    "Email":"Buyer1234@email.com",
    "SettlementReference":"0001100011",
    "Date":"2019-12-02 12:37:23",
  },
  {
    "TransactionID":"1912021238140141",
    "Reference No":"TP03375409293104021219",
    "Description":"Credit",
    "Amount In (RM)":"1391.00",
    "Transaction Amount (RM)":"1391.00",
    "Amount Nett (RM)":"1391.00",
    "Name":"Buyer1234",
    "Email":"Buyer1234@email.com",
    "SettlementReference":"0001100011",
    "Date":"2019-12-02 12:37:23",
  },
  {
    "TransactionID":"1912021238140141",
    "Reference No":"TP03375409293104021219",
    "Description":"Credit",
    "Amount In (RM)":"1391.00",
    "Transaction Amount (RM)":"1391.00",
    "Amount Nett (RM)":"1391.00",
    "Name":"Buyer1234",
    "Email":"Buyer1234@email.com",
    "SettlementReference":"0001100011",
    "Date":"2019-12-02 12:37:23",
  },


];

const customers = [
  {
    name: "IBG",
    totalPurchase: 1524,
    icon: "material-symbols:account-balance-rounded"
  },
  {
    name: "DuitNow",
    totalPurchase: 643,
    icon: "material-symbols:location-on-rounded"
  },
  {
    name: "Total Transactions",
    totalPurchase: 2167,
    icon: ""
  },
];

const transactions = [
  {
    name: "Resolved Review",
    totalTransactions: 9,
    color: "success",
    icon: "carbon:status-resolved"
  },
  {
    name: "Pending Review",
    totalTransactions: 9,
    color: "warning",
    icon: "material-symbols:pending-outline"  
  },
  {
    name: "Unresolved Review",
    totalTransactions: 14,
    color: "danger",
    icon: "codicon:comment-unresolved"
  },
];

const colorClasses = {
  success: 'bg-green-500',
  warning: 'bg-orange-500',
  danger: 'bg-red-600'
};

</script>

<template>
  <div>
    <div class="flex justify-between items-start">
      <div class="text-2xl p-3 font-semibold">
        Full Refined Data
      </div>
      <hr>
    </div>
    <rs-card class="p-2">
      <div class="flex space-x-4 mt-4 p-2">
        <rs-card class="flex-1 p-1 justify-center">
          <div class="text-center p-4">
            <h3 class="text-xl font-bold">Indicator</h3>
            <br>
            <div class="flex justify-center">
              <img src="@/assets/img/indicator/F.png" class="max-w-[80%]" />
            </div>
          </div>
        </rs-card>

        <rs-card class="flex-1 p-1">
          <div class="flex-1 truncate p-4 text-center">
            <h3 class="text-xl font-bold">Total Transaction Amount</h3>
          </div>
          <template #body>
            <div
              v-for="(val, index) in customers"
              :key="index"
              class="flex justify-between items-center rounded-lg bg-[rgb(var(--bg-1))] p-4 first:mt-0 mt-3"
            >
              <div class="flex items-center gap-x-4">
                <Icon class="text-gray-900 text-3xl" :name="val.icon"></Icon>
                <span class="text-gray-900 dark:text-white font-semibold text-xl">
                  {{ val.name }}
                </span>
              </div>
              <span class="text-gray-600 dark:text-gray-50 text-3xl font-bold">
                {{ val.totalPurchase }}
              </span>
            </div>
          </template>
        </rs-card>

        <rs-card class="flex-1 p-1">
          <div class="flex-1 truncate p-4">
            <center class="text-xl font-bold">Total Transactions Conducted</center>
          </div>
          <template #body>
            <div
              v-for="(val, index) in transactions"
              :key="index"
              :class="['flex justify-between items-center rounded-lg', colorClasses[val.color], 'p-4 first:mt-0 mt-3']"
            >
              <div class="flex items-center gap-x-4">
                <Icon class="text-white text-3xl" :name="val.icon"></Icon>
                <span class="text-white dark:text-white font-semibold text-xl">
                  {{ val.name }}
                </span>
              </div>
              <span class="text-white dark:text-white text-3xl font-bold">
                {{ val.totalTransactions }}
              </span>
            </div>
          </template>
        </rs-card>
      </div>
    </rs-card>

    <rs-card class="p-3">
      <div class="flex justify-between items-center mb-4">
        <div class="flex items-center">
          <span class="ml-4 mr-4 font-semibold text-lg">Date:</span>
          <input type="date" v-model="selectedDate" class="border rounded-md font-semibold text-md p-1 flex-grow flex-shrink">
        </div>
        <rs-button @click="extractRows" class="flex items-center mr-2">
          <Icon class="mr-1" name="material-symbols:drive-folder-upload-rounded"></Icon>
          Download Report
        </rs-button>
      </div>
      <rs-card class="p-4 mt-2">
        <template #body>
          <rs-table
            :data="data"
            :options="{
              variant: 'default',
              striped: true,
              borderless: true,
            }"
            :options-advanced="{
              sortable: true,
              responsive: true,
              filterable: false,
            }"
            advanced
          >
          <template v-slot:Description="data">
              <rs-badge
                :variant="
                  data.text === 'Credit'
                    ? 'info'
                    : data.text == 'Debit'
                    ? 'warning'
                    : 'danger'
                ">
                {{ data.text }}
              </rs-badge>
            </template>
          </rs-table>
        </template>
      </rs-card>
    </rs-card>







  </div>
</template>
