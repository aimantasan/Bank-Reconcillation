<template>
  <div>
    <LayoutsBreadcrumb />
    <hr />
    <br />
    <rs-card class="p-4" style="display: flex; flex-direction: column; gap: 20px;">
      <h4 style="display: flex; align-items: center" class="mb-2">
        <span>Upload Bank Statement</span>
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
            id="file-upload"
            label="Bank Statement (.csv)"
            type="file"
            accept=".csv"
            :classes="{
              outer: 'flex-1 w-full',
              fieldset: 'border-0',
              options: 'flex gap-5',
            }"
            @change="handleFileUpload"
          />
          <rs-button class="ml-2 mb-3" @click="handleFileUpload">
            <Icon class="mr-1 " name="material-symbols:drive-folder-upload-rounded"></Icon>
            Upload File
          </rs-button>
        </div>
      </div>
    </rs-card>

    <!-- <rs-card class="p-4" style="display: flex; flex-direction: column; gap: 20px;">
      <h4 style="display: flex; align-items: center" class="mb-2">
        <span>Upload Bank Statement</span>
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
            id="file-upload"
            label="Bank Statement (.csv)"
            type="file"
            accept=".csv"
            :classes="{
              outer: 'flex-1 w-full',
              fieldset: 'border-0',
              options: 'flex gap-5',
            }"
            @change="handleFileUpload"
          />
          <rs-button class="ml-2 mb-3" @click="handleFileFailUpload">
            <Icon class="mr-1 " name="material-symbols:drive-folder-upload-rounded"></Icon>
            Upload File
          </rs-button>
        </div>
      </div>
    </rs-card> -->

  </div>
</template>
<script setup>
import { ref } from 'vue';
const { $swal, $router } = useNuxtApp();

const handleFileUpload = () => {
  $swal.fire({
          title: "Success",
          text: ` File uploaded successfully`,
          icon: "success",
          timer: 2000,
        });
};

const handleFileFailUpload = () => {
  $swal.fire({
          title: "Failed",
          text: ` File has been uploaded previously`,
          icon: "error",
          timer: 2000,
        });
};

</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1px; /* Adjust the padding value as per your preference */
  margin-left: 8px; /* Maintain the same left margin as before */
}

.copy-button {
  margin-left: auto;
}

.extracted-row-text {
  font-size: 14px; /* Adjust the font size as per your requirement */
}
</style>
