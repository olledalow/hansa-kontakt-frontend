<template>
  <div>
    <base-card>
      <router-link to="/">Vissza a vasarlasokhoz</router-link>
      <h2>Tételek</h2>

      <base-button @click="addFormToggled = !addFormToggled">{{
        addFormToggled ? "Mégse" : "Új tétel hozzáadása"
      }}</base-button>
      <div v-if="addFormToggled">
        <base-card style="width: 35%">
          <add-new-tetel :vasarlasid="tetel[0].vasarlasid"></add-new-tetel>
        </base-card>
      </div>

      <base-button type="button" @click="exportToExcel"
        >Excel download</base-button
      >

      <div v-if="tetel">
        <ul>
          <li style="display:flex; justify-content: space-between;">
            <div
              style="width: 13%"
              v-for="key of Object.keys(tetel[0])"
              :key="key"
            >
              <p>
                {{ key }}
              </p>
            </div>
          </li>
          <tetel-item
            v-for="item of tetel"
            :key="item.id"
            :item="item"
            @add-cikk="item.cikknev = addCikk"
          ></tetel-item>
        </ul>
      </div>
    </base-card>
  </div>
</template>

<script>
import TetelItem from "./TetelItem.vue";
import AddNewTetel from "./AddNewTetel.vue";
import XLSX from "xlsx";

export default {
  components: {
    TetelItem,
    AddNewTetel,
  },
  data() {
    return {
      id: "",
      tetel: null,
      addFormToggled: false,
    };
  },
  methods: {
    loadTetel() {
      this.error = null;
      fetch(`http://127.0.0.1:5000/vasarlas_tetel/vasarlasid/${this.id}`)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((tetel) => {
          this.tetel = tetel["vasarlas_tetelek"];
        })
        .catch((err) => {
          this.error = `Failed to fetch vasarlas data - try again later! (${err})`;
        });
    },
    exportToExcel() {
      // On Click Excel download button

      // export json to Worksheet of Excel
      // only array possible
      var tetelek = XLSX.utils.json_to_sheet(this.tetel);

      var wb = XLSX.utils.book_new(); // make Workbook of Excel

      // add Worksheet to Workbook
      // Workbook contains one or more worksheets
      XLSX.utils.book_append_sheet(wb, tetelek, "tételek"); // sheetAName is name of Worksheet

      // export Excel file
      XLSX.writeFile(wb, "tetelek.xlsx"); // name of the file is 'book.xlsx'
    },
  },
  created() {
    const id = this.$route.params.id;
    this.id = id;

    this.loadTetel();
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
