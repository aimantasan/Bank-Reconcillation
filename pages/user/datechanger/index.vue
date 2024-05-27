<template>
  <div>
    <LayoutsBreadcrumb />
    <hr />
    <br />
    <rs-card class="p-4" style="display: flex; flex-direction: column; gap: 20px;">
      <h4 style="display: flex; align-items: center" class="mb-2">
        <span>Date Changer</span>
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
            type="file"
            label="Transaction File (.txt)"
            accept=".txt"
            :classes="{
              outer: 'flex-1 w-full',
              fieldset: 'border-0',
              options: 'flex gap-5',
            }"
            @change="handleFileChange"
          />
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <FormKit
            type="text"
            label="New Date (DDMMYYYY)"
            :classes="{
              outer: 'w-5/6',
              fieldset: 'border-0',
              options: 'flex',
            }"
            v-model="newDate"
          />
          <rs-button class="mt-3 mr-10 ml-3" @click="changeDate">
            <Icon class="mr-1 " name="material-symbols:search-rounded"></Icon>
            Change Date
          </rs-button>
        </div>
      </div>
    </rs-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const newDate = ref('');
let originalContent = ''; // Store original file content

const handleFileChange = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    originalContent = e.target.result;
  };

  reader.readAsText(file);
};

const changeDate = () => {
  const rows = originalContent.split('\n'); // Split content into rows
  const updatedRows = [];

  rows.forEach((row, index) => {
    if (index === 0 || index === rows.length - 1 || index % 2 === 0) {
      // Exclude the first row, last row, and rows with even indices
      updatedRows.push(row);
    } else {
      const columns = row.split(',');
      columns[4] = newDate.value; // Assuming the date is at the fifth column
      updatedRows.push(columns.join(','));
    }
  });

  const originalFileName = document.querySelector('input[type="file"]').files[0].name;
  const newFileName = `${originalFileName.split('.')[0]}_new.txt`;

  const updatedContent = updatedRows.join('\n');
  downloadFile(updatedContent, newFileName, 'text/plain');
};



const downloadFile = (content, fileName, contentType) => {
  const blob = new Blob([content], { type: contentType });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
  window.URL.revokeObjectURL(link.href);
};

</script>
