<template>
  <div>
    <h2>vasarlasok</h2>
    <loading-spinner v-if="isLoading"></loading-spinner>

    <div v-else>
      <base-button type="button" @click="exportToExcel"
        >Excel download</base-button
      >

      <ul>
        <li style="display:flex; justify-content: left;">
          <div style="width: 15%">
            <input
              type="text"
              placeholder="search ID"
              v-model="valId"
              @keyup="Search"
            />
          </div>
        </li>

        <li style="display:flex; justify-content: space-between;">
          <div
            style="width: 13%"
            v-for="key of Object.keys(sortedArray[0])"
            :key="key"
            @click="sort(key)"
          >
            <p>
              {{ key }}
            </p>
          </div>
        </li>
        <div v-if="!filteredVasarlasok">
          <vasarlas-item
            v-for="item of sortedArray.slice(0, rowLimit)"
            :key="item.id"
            :item="item"
            @add-bolt="item.boltnev = addBolt"
          ></vasarlas-item>
        </div>
        <div v-else>
          <vasarlas-item
            v-for="item of sortedArray.slice(0, rowLimit)"
            :key="item.id"
            :item="item"
            @add-bolt="item.boltnev = addBolt"
          ></vasarlas-item>
        </div>
      </ul>
    </div>
    <base-button @click="increaseRowLimit">Load more</base-button>
  </div>
</template>

<script>
import XLSX from "xlsx";
import VasarlasItem from "./VasarlasItem";

export default {
  // props: ["row-limit"],
  components: {
    VasarlasItem,
  },
  data() {
    return {
      vasarlas: [],
      rowLimit: 15,
      filteredVasarlasok: null,
      isLoading: false,
      sorted: "id",
      reverseSorted: false,
      valId: "",
    };
  },
  computed: {
    sortedArray() {
      let attribute = this.sorted;
      function compare(a, b) {
        if (a[attribute] < b[attribute]) return -1;
        if (a[attribute] > b[attribute]) return 1;
        return 0;
      }

      if (this.filteredVasarlasok) {
        if (this.reverseSorted) {
          return this.filteredVasarlasok
            .slice()
            .sort(compare)
            .reverse();
        } else {
          return this.filteredVasarlasok.slice().sort(compare);
        }
      } else {
        if (this.reverseSorted) {
          return this.vasarlas
            .slice()
            .sort(compare)
            .reverse();
        } else {
          return this.vasarlas.slice().sort(compare);
        }
      }
    },
  },
  methods: {
    increaseRowLimit() {
      this.rowLimit += 10;
    },
    sort(key) {
      if (this.sorted === key) {
        this.reverseSorted = !this.reverseSorted;
      } else {
        this.sorted = key;
        this.reverseSorted = false;
      }
    },
    Search() {
      if (this.valId.length > 3) {
        this.filteredVasarlasok = this.vasarlas.filter((value) => {
          //Filter array elements
          return this.fuzzyMatch(value.id.toString(), this.valId); //If the containing character returns true
        });
      } else {
        this.filteredVasarlasok = null;
      }
    },
    fuzzyMatch(str, pattern) {
      pattern = pattern.split("").reduce(function(a, b) {
        return a + ".*" + b;
      });
      return new RegExp(pattern).test(str);
    },
    exportToExcel() {
      // On Click Excel download button

      // export json to Worksheet of Excel
      // only array possible
      var vasarlas = XLSX.utils.json_to_sheet(
        this.sortedArray.slice(0, this.rowLimit)
      );

      var wb = XLSX.utils.book_new(); // make Workbook of Excel

      // add Worksheet to Workbook
      // Workbook contains one or more worksheets
      XLSX.utils.book_append_sheet(wb, vasarlas, "vasarlas"); // sheetAName is name of Worksheet

      // export Excel file
      XLSX.writeFile(wb, "vasarlas.xlsx"); // name of the file is 'book.xlsx'
    },
    // FETCH VASARLAS LIST FROM DATABASE
    loadVasarlas() {
      console.log(this.isLoading);
      this.isLoading = true;
      this.error = null;
      fetch("http://127.0.0.1:5000/vasarlas")
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((vasarlas) => {
          this.isLoading = false;
          this.vasarlas = vasarlas["vasarlasok"];
        })
        .catch((err) => {
          this.isLoading = false;
          this.error = `Failed to fetch vasarlas data - try again later! (${err})`;
        });
    },
  },
  created() {
    this.loadVasarlas();
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
