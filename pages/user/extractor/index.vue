<template>
  <div>
    <LayoutsBreadcrumb />
    <hr />
    <br />
    <rs-card class="p-4" style="display: flex; flex-direction: column; gap: 20px;">
      <h4 style="display: flex; align-items: center" class="mb-2">
        <span>Transaction Details Extractor</span>
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
            @change="handleFileUpload"
          />
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <FormKit
            type="text"
            label="Rows (comma-separated)"
            :classes="{
              outer: 'w-5/6',
              fieldset: 'border-0',
              options: 'flex',
            }"
            v-model="selectedRows"
          />
          <rs-button class="mt-3 mr-10 ml-3" @click="extractRows">
            <Icon class="mr-1 " name="material-symbols:search-rounded"></Icon>
            Search
          </rs-button>
        </div>
      </div>
    </rs-card>

    <div v-if="extractedRows.length" class="p-2">
      
      <rs-card class="p-4">
        <h4 class="mb-2">Extracted Transactions</h4>
        <hr class="mb-4">
        <p v-for="(row, index) in extractedRows" :key="index">
          <rs-card class="p-2" v-if="row.rowNumber !== 'Last Row' && row.rowNumber !== 'New Last Row Value'">
            <strong v-if="row.rowNumber !== 'Last Row' && row.rowNumber !== 'New Last Row Value'">Extracted Row {{ row.rowNumber }}:</strong><br/>
            {{ row.data.name }}<br/>
            {{ row.data.amount }}<br/>
            {{ row.data.accountNumber }}<br/>
            {{ row.data.bankName }}<br/>
            {{ row.data.transactionID }}<br/>
          </rs-card>
          <h5 v-if="row.rowNumber === 'Last Row'">Last Row Value: {{ row.data }}</h5>
          <h5 v-if="row.rowNumber === 'New Last Row Value'">New Last Row Value: {{ row.data }}</h5>
        </p>
        <p>Total Amount: RM {{ totalAmount.toFixed(2) }}</p> <!-- Display total amount -->
        <p>Number of Rows Extracted: {{ rowCount }}</p> <!-- Display row count -->

        <rs-button class="mt-3 mr-10 ml-3" @click="generateNewFile">
          <Icon class="mr-1" name="material-symbols:download"></Icon>
          Generate New File
        </rs-button>
    </rs-card>
    </div>

    <div v-else-if="fileUploaded" class="flex items-center justify-center my-4">
      <div class="mr-4">
        <Icon name="ph:warning-circle" size="30"></Icon>
      </div>
      <p>No rows extracted. Please check your input.</p>
    </div>
    <div v-else class="flex items-center justify-center my-4">
      <div class="mr-4">
        <Icon name="ph:warning-circle" size="30"></Icon>
      </div>
      <p>No file uploaded yet.</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const selectedRows = ref('');
const extractedRows = ref([]);
const fileUploaded = ref(false);
const fileContent = ref(''); // Define fileContent here

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  
  reader.onload = () => {
    fileContent.value = reader.result; // Store file content
    extractedRows.value = []; // Clear previous extracted rows
    const lines = fileContent.value.split('\n');
    // Assuming each row is indexed from 1
    fileUploaded.value = true;
  };
  
  reader.readAsText(file);
};

const totalAmount = ref(0); // Initialize totalAmount as a ref
const rowCount = ref(0); // Initialize rowCount as a ref

const extractRows = () => {
  const rowsToExtract = selectedRows.value.split(',').map(row => parseInt(row.trim()));
  const lines = fileContent.value.split('\n'); // Access fileContent here

  totalAmount.value = 0; // Reset total amount
  
  const rows = rowsToExtract
    .filter(row => row >= 1 && row <= lines.length) // Filter valid row numbers
    .map(row => {
      const rowData = formatRow(lines[row - 1]);
      totalAmount.value += parseFloat(rowData.amount.replace('RM ', '')); // Accumulate amount
      return {
        rowNumber: row, // Include the row number
        data: rowData // Extract and format rows
      };
    });

  const lastRow = lines[lines.length - 1]; // Get the last row
  const lastRowValues = lastRow.split(',').slice(0, 3).join(', '); // Format last row value
  
  // Add the last row with its original value
  rows.push({ rowNumber: 'Last Row', data: lastRowValues });
  
  // Calculate new last row value
  const newSecondValue = parseInt(lastRowValues.split(',')[1]) - rows.length + 1; // Adjusting the calculation
  const newLastRowValues = [
    lastRowValues.split(',')[0],
    newSecondValue,
    (parseFloat(lastRowValues.split(',')[2]) - totalAmount.value).toFixed(2)
  ];
  const newLastRowValue = newLastRowValues.join(', ');

  // Add the new last row with its calculated value
  rows.push({ rowNumber: 'New Last Row Value', data: newLastRowValue });

  extractedRows.value = rows; // Update extracted rows
  
  rowCount.value = rows.length - 2; // Exclude the last and new last rows from the count

  console.log('Total Amount:', totalAmount.value.toFixed(2)); // Log total amount
};

const formatRow = (row) => {
  const data = row.split(',');
  
  const name = data[15];
  const amount = parseFloat(data[9]).toFixed(2);
  const accountNumber = data[13];
  const bankName = data[24];
  const transactionID = data[5];
  
  return {
    name,
    amount: `RM ${amount}`,
    accountNumber,
    bankName,
    transactionID
  };
};

const removeExtractedRows = () => {
  const lines = fileContent.value.split('\n');
  const rowsToExtract = selectedRows.value.split(',').map(row => parseInt(row.trim()));

  const modifiedContent = lines.filter((line, index) => {
    // Check if the current row index is not in the list of rows to be extracted
    return !rowsToExtract.includes(index + 1);
  });

  return modifiedContent.join('\n');
};

// Function to generate a new file with the modified content and trigger download
const generateNewFile = () => {
  const modifiedContent = removeExtractedRows();
  const lastRowValues = extractedRows.value.find(row => row.rowNumber === 'New Last Row Value').data;
  const newLastRowValue = `${lastRowValues},,,,,,,,,,,,,,,,,,,,,`; // Format new last row value

  // Replace the last line with the new last row value
  const lines = modifiedContent.split('\n');
  lines[lines.length - 1] = newLastRowValue;

  const finalContent = lines.join('\n');

  const originalFileName = document.querySelector('input[type="file"]').files[0].name;
  const newFileName = `${originalFileName.split('.')[0]}_new.txt`;

  const blob = new Blob([finalContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', newFileName);
  document.body.appendChild(link);
  link.click();

  // Clean up
  URL.revokeObjectURL(url);
  document.body.removeChild(link);
};
</script>
