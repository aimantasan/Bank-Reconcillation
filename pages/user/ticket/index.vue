<template>
    <div>
      <LayoutsBreadcrumb />
      <hr />
      <br />
      <rs-card class="p-4" style="display: flex; flex-direction: column; gap: 20px;">
        <div class="flex space-x-4">
      <rs-card class="flex-1 p-1">
        <div class="text-center p-4">
          <strong class="text-md font-bold">Open Tickets</strong>
          <h1 class="text-2xl font-bold">80</h1>
        </div>
      </rs-card>

      <rs-card class="flex-1 p-1">
        <div class="text-center p-4">
          <strong class="text-md font-bold mb-10">Tickets Due Today</strong>
          <h1 class="text-2xl font-bold">80</h1>
        </div>
      </rs-card>

      <rs-card class="flex-1 p-1">
        <div class="text-center p-4">
          <strong class="text-md font-bold mb-10">High Priority Tickets</strong>
          <h1 class="text-2xl font-bold">80</h1>
        </div>
      </rs-card>

      <rs-card class="flex-1 p-1">
        <div class="text-center p-4">
          <strong class="text-md font-bold mb-10">Unassigned Tickets</strong>
          <h1 class="text-2xl font-bold">80</h1>
        </div>
      </rs-card>

      <rs-card class="flex-1 p-1">
        <div class="text-center p-4">
          <strong class="text-md font-bold mb-10">All Tickets</strong>
          <h1 class="text-2xl font-bold">80</h1>
        </div>
      </rs-card>
    </div>
      </rs-card>
  
      <!-- Collapsible High Priority section -->
      <rs-card class="p-4" style="display: flex; flex-direction: column; gap: 20px;">
        <div class="flex justify-between items-center p-2 bg-primary text-white rounded" @click="toggleHighPriority">
          <div class="flex items-center">
            <Icon class="mr-1" name="material-symbols:warning-outline-rounded"></Icon>
            <strong class="text-md ml-4">High Priority</strong>
          </div>
          <div class="flex items-center mr-4">
            <strong class="text-md">{{ highPriorityCount }}</strong>
        </div>
        </div>
        <hr>
        <div v-if="showHighPriority">
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
            <template v-slot:status="data">
              <rs-badge
                :variant="
                data.text === 'Completed'
                  ? 'success'
                  : data.text == 'In Progress'
                  ? 'warning'
                  : 'danger'
                ">
                {{ data.text }}
              </rs-badge>
            </template>
            <template v-slot:priority="data">
              <rs-badge
                :variant="
                data.text === 'Low'
                  ? 'success'
                  : data.text == 'Medium'
                  ? 'warning'
                  : 'danger'
                ">
                {{ data.text }}
              </rs-badge>
            </template>
            <template v-slot:action="rowData">
                <rs-button @click="handleAction(rowData)">
                <Icon :name="getActionIcon(rowData.value.status)" /> <!-- Use computed method to get icon name -->
                </rs-button>
            </template>
          </rs-table>
        </div>
      </rs-card>

      <rs-card class="p-4" style="display: flex; flex-direction: column; gap: 20px;">
        <div class="flex justify-between items-center p-2 bg-warning text-white rounded" @click="toggleHighPriority">
          <div class="flex items-center">
            <Icon class="mr-1" name="material-symbols:eye-tracking"></Icon>
            <strong class="text-md ml-4">Open Tickets</strong>
          </div>
          <div class="flex items-center mr-4">
            <strong class="text-md">{{ highPriorityCount }}</strong>
        </div>
        </div>
        <hr>
        <div v-if="showHighPriority">
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
            <template v-slot:status="data">
              <rs-badge
                :variant="
                data.text === 'Completed'
                  ? 'success'
                  : data.text == 'In Progress'
                  ? 'warning'
                  : 'danger'
                ">
                {{ data.text }}
              </rs-badge>
            </template>
            <template v-slot:priority="data">
              <rs-badge
                :variant="
                data.text === 'Low'
                  ? 'success'
                  : data.text == 'Medium'
                  ? 'warning'
                  : 'danger'
                ">
                {{ data.text }}
              </rs-badge>
            </template>
            <template v-slot:action="rowData">
                <rs-button @click="handleAction(rowData)">
                <Icon :name="getActionIcon(rowData.value.status)" /> <!-- Use computed method to get icon name -->
                </rs-button>
            </template>
          </rs-table>
        </div>
      </rs-card>

      <rs-card class="p-4" style="display: flex; flex-direction: column; gap: 20px;">
        <div class="flex justify-between items-center p-2 bg-success text-white rounded" @click="toggleHighPriority">
          <div class="flex items-center">
            <Icon class="mr-1" name="material-symbols:task-alt"></Icon>
            <strong class="text-md ml-4">Closed</strong>
          </div>
          <div class="flex items-center mr-4">
            <strong class="text-md">{{ highPriorityCount }}</strong>
        </div>
        </div>
        <hr>
        <div v-if="showHighPriority">
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
            <template v-slot:status="data">
              <rs-badge
                :variant="
                data.text === 'Completed'
                  ? 'success'
                  : data.text == 'In Progress'
                  ? 'warning'
                  : 'danger'
                ">
                {{ data.text }}
              </rs-badge>
            </template>
            <template v-slot:priority="data">
              <rs-badge
                :variant="
                data.text === 'Low'
                  ? 'success'
                  : data.text == 'Medium'
                  ? 'warning'
                  : 'danger'
                ">
                {{ data.text }}
              </rs-badge>
            </template>
            <template v-slot:action="rowData">
                <rs-button @click="handleAction(rowData)">
                <Icon :name="getActionIcon(rowData.value.status)" /> <!-- Use computed method to get icon name -->
                </rs-button>
            </template>
          </rs-table>
        </div>
      </rs-card>
      
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  const showHighPriority = ref(false); // Boolean variable to control visibility
  
  const toggleHighPriority = () => {
    showHighPriority.value = !showHighPriority.value; // Toggle visibility
  };
  
  const data = [
    {
      "id":"#8b5404",
      "issue":"Payment Pending on Order #1234",
      "description":"loreum ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      "status":"In Progress",
      "priority":"High",
      "action":""
    },
    {
      "id":"#144bba",
      "issue":"Settlement for A&B Corp",
      "description":"loreum ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      "status":"Completed",
      "priority":"High",
      "action":""
    },
    {
      "id":"#144bba",
      "issue":"Settlement for A&B Corp",
      "description":"loreum ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      "status":"Need Action",
      "priority":"High",
      "action":""
    }
  ];

  const handleAction = (rowData) => {
  if (rowData.status === 'In Progress') {
    // Perform action for "In Progress" status (e.g., marking as completed)
    console.log('Marking as completed:', rowData.issue);
  } else if (rowData.status === 'Completed') {
    // Perform action for "Completed" status (e.g., reviewing)
    console.log('Reviewing:', rowData.issue);
  }
};

// Function to get action button text based on status
// Computed property to get action button text based on status
const getActionIcon = (status) => {
    if (status === 'In Progress') {
      return 'tdesign:task-checked';
    } else if (status === 'Completed') {
      return 'tdesign:task';
    } else if (status === 'Need Action') {
      return 'tdesign:task-add';
    } else {
      return ''; // Return empty string for other statuses
    }
  };

  
  // Computed property to count the number of items with "High" priority
  const highPriorityCount = computed(() => {
    return data.filter(item => item.priority === 'High').length;
  });
  </script>