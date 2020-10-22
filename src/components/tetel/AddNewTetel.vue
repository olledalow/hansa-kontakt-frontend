<template>
  <div>
    <div class="form-element">
      <label for="id">ID</label>
      <input type="number" name="id" v-model="id" />
    </div>

    <div class="form-element">
      <label for="mennyiseg">mennyiseg</label>
      <input type="number" name="mennyiseg" v-model="mennyiseg" />
    </div>

    <div class="form-element">
      <label for="brutto">brutto</label>
      <input type="number" name="brutto" v-model="brutto" />
    </div>

    <div class="form-element">
      <label for="partnerid">partnerid</label>
      <input type="number" name="partnerid" v-model="partnerid" />
    </div>

    <div class="form-element">
      <label for="cikkek">cikkek</label>
      <select id="cikkek" name="cikkek" v-model="cikk">
        <option v-for="cikk of cikkek" :key="cikk.id" :value="cikk.id">{{
          cikk.nev
        }}</option>
      </select>
    </div>
    <base-button @click="addTetel">Hozzáadás</base-button>
  </div>
</template>

<script>
export default {
  props: ["vasarlasid"],
  data() {
    return {
      id: "",
      mennyiseg: "",
      brutto: "",
      partnerid: "",
      cikkek: [],
      cikk: "",
    };
  },
  methods: {
    loadCikkek() {
      this.error = null;
      fetch(`http://127.0.0.1:5000/cikkek`)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((cikkek) => {
          this.cikkek = cikkek["cikkek"];
          console.log(this.cikkek);
        })
        .catch((err) => {
          console.log(err);
          this.error = `Failed to fetch cikkek data - try again later! (${err})`;
        });
    },
    // SEND POST REQUEST TO API, CREATING A NEW CITY
    addTetel() {
      fetch("http://127.0.0.1:5000/vasarlas_tetel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: this.id,
          partnerctid: this.cikk,
          vasarlasid: this.vasarlasid,
          mennyiseg: this.mennyiseg,
          brutto: this.brutto,
          partnerid: this.partnerid,
        }),
      })
        .then((response) => response.text())
        .then((message) => {
          console.log(message);
          this.$router.go();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.loadCikkek();
  },
};
</script>

<style scoped>
.form-element {
  margin: auto;
  text-align: center;
}

label {
  display: block;
}
</style>
