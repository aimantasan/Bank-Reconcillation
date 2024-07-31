<script setup>
definePageMeta({
  title: "toyyibPay", 
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
    "Invoice No":"TP03375409293104021219",
    "TransactionNo":"1912021238140141",
    "SettlementReference":"0001100011",
    "Amount Nett (RM)":"1391.00",
    "Medium":"FPX",
    "Name":"Buyer1234",
    "Email":"Buyer1234@email.com",
    "Date":"2019-12-02 12:37:23",
    "Remarks":"Reviewed by manager",
    "Status":"Resolved",
    "Action":"",
  },
  {
    "Invoice No":"TP03375409293104021219",
    "TransactionNo":"1912021238140141",
    "SettlementReference":"0001100011",
    "Amount Nett (RM)":"1391.00",
    "Medium":"CC",
    "Name":"Buyer1234",
    "Email":"Buyer1234@email.com",
    "Date":"2019-12-02 12:37:23",
    "Remarks":"Reviewed by manager",
    "Status":"Unresolved",
    "Action":"",
  },
  {
    "Invoice No":"TP03375409293104021219",
    "TransactionNo":"1912021238140141",
    "SettlementReference":"0001100011",
    "Amount Nett (RM)":"1391.00",
    "Medium":"FPX",
    "Name":"Buyer1234",
    "Email":"Buyer1234@email.com",
    "Date":"2019-12-02 12:37:23",
    "Remarks":"Reviewed by manager",
    "Status":"Pending",
    "Action":"",
  },
  {
    "Invoice No":"TP03375409293104021219",
    "TransactionNo":"1912021238140141",
    "SettlementReference":"0001100011",
    "Amount Nett (RM)":"1391.00",
    "Medium":"CC",
    "Name":"Buyer1234",
    "Email":"Buyer1234@email.com",
    "Date":"2019-12-02 12:37:23",
    "Remarks":"Reviewed by manager",
    "Status":"Resolved",
    "Action":"",
  },
  {
    "Invoice No":"TP03375409293104021219",
    "TransactionNo":"1912021238140141",
    "SettlementReference":"0001100011",
    "Amount Nett (RM)":"1391.00",
    "Medium":"FPX",
    "Name":"Buyer1234",
    "Email":"Buyer1234@email.com",
    "Date":"2019-12-02 12:37:23",
    "Remarks":"Reviewed by manager",
    "Status":"Resolved",
    "Action":"",
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

const saveTransaction = () => {
  // Implement saving logic here, e.g., update data array or send API request
  console.log("Saving transaction with remarks:", remarks.value);
  popupEditAppear.value = false; // Close the modal after saving
  $swal.fire({
          title: "Success",
          text: ` Status and remarks updated successfully`,
          icon: "success",
          timer: 2000,
        });
};

const saveTransactionFailed = () => {
  // Implement saving logic here, e.g., update data array or send API request
  console.log("Saving transaction with remarks:", remarks.value);
  popupEditAppear.value = false; // Close the modal after saving
  $swal.fire({
          title: "Failed",
          text: ` Status and remarks update failed`,
          icon: "error",
          timer: 2000,
        });
};
</script>

<template>
  <div>
    <div class="flex justify-between items-start">
      <div class="text-2xl p-3 font-semibold">
        Unrefined Data from toyyibPay 
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
              <img src="@/assets/img/indicator/C.png" class="max-w-[80%]" />
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
            <template v-slot:Status="data">
              <rs-badge
                :variant="
                  data.text === 'Resolved'
                    ? 'success'
                    : data.text == 'Pending'
                    ? 'warning'
                    : data.text == 'Unresolved'
                    ? 'danger'
                    : 'danger'
                ">
                {{ data.text }}
              </rs-badge>
            </template>
            <template v-slot:Medium="data">
              <rs-badge
                :variant="
                  data.text === 'FPX'
                    ? 'info'
                    : data.text == 'CC'
                    ? 'warning'
                    : 'danger'
                ">
                {{ data.text }}
              </rs-badge>
            </template>
            <template v-slot:Action="data">
              <rs-button @click="openEditModal(data)">
                <Icon class="mr-1" name="material-symbols:edit"></Icon>
              </rs-button>
            </template>
          </rs-table>
        </template>
      </rs-card>
    </rs-card>

    <!-- Modal for Editing -->
    <rs-modal v-model="popupEditAppear" :title="'Transaction Details'" position="center" size="lg" cancel-title="Cancel" :ok-callback="saveTransaction" ok-title="Save" :cancel-callback="saveTransactionFailed">
      <div class="p-4">
        <form v-if="selectedTransaction">
          <div class="grid grid-cols-4 gap-4">
            <!-- Date field on the right side -->
            <div class="col-span-3 flex justify-end">
              <label class="block text-sm font-bold mb-2">Date:</label>
            </div>
            <div class="col-span-1 flex items-center">
              <input type="text" v-model="selectedTransaction.Date" class="border rounded-md w-full p-2" disabled>
            </div>

             <!-- Transaction ID -->
             <div class="col-span-2">
              <label class="block text-sm font-bold mb-2">Transaction No:</label>
              <input type="text" v-model="selectedTransaction.TransactionNo" class="border rounded-md w-full p-2" disabled>
            </div>

            <!-- Reference No -->
            <div class="col-span-2">
              <label class="block text-sm font-bold mb-2">Invoice No:</label>
              <input type="text" v-model="selectedTransaction['Invoice No']" class="border rounded-md w-full p-2" disabled>
            </div>

            <!-- Description -->
            <div class="col-span-3">
              <label class="block text-sm font-bold mb-2">Name:</label>
              <input type="text" v-model="selectedTransaction.Name" class="border rounded-md w-full p-2" disabled>
            </div>

            <!-- Amount -->
            <div class="col-span-1">
              <label class="block text-sm font-bold mb-2">Amount Nett (RM):</label>
              <input type="text" v-model="selectedTransaction['Amount Nett (RM)']" class="border rounded-md w-full p-2" disabled>
            </div>

            <!-- Company Name -->
            <div class="col-span-3">
              <label class="block text-sm font-bold mb-2">Email:</label>
              <input type="text" v-model="selectedTransaction['Email']" class="border rounded-md w-full p-2" disabled>
            </div>

            <!-- Status -->
            <div class="col-span-1">
              <label class="block text-sm font-bold mb-2">Status:</label>
              <div class="relative">
                <select v-model="selectedTransaction['Status']" class="border rounded-md w-full p-2">
                  <option value="Resolved">🟢 Resolved</option>
                  <option value="Pending">🟡 Pending</option>
                  <option value="Unresolved">🔴 Unresolved</option>
                </select>
              </div>
            </div>

            <!-- Comments Log -->
            <div class="col-span-4">
              <label class="block text-sm font-bold mb-2">Comments Log:</label>
              <div class="border rounded-md w-full p-2 bg-gray-100">
                <div v-for="(comment, index) in selectedTransaction.Comments" :key="index" class="mb-2 p-2 border-b last:border-b-0">
                  <p class="text-md font-semibold">{{ comment.date }}</p>
                  <p class="text-sm font-semibold ml-2 p-1">{{ comment.action }}</p>
                  <p class="ml-2 p-1">{{ comment.time }} - {{ comment.text }}</p>
                </div>
              </div>
            </div>

            <!-- Remarks -->
            <div class="col-span-4">
              <label class="block text-sm font-bold mb-2">Remarks:</label>
              <textarea v-model="remarks" rows="4" class="border rounded-md w-full p-2" placeholder="Insert your remarks here"></textarea>
            </div>
          </div>
        </form>
      </div>
    </rs-modal>






  </div>
</template>
