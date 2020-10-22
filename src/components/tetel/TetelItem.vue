<template>
  <li class="item">
    <div v-if="copiedItem" class="item-main">
      <div class="item-attribute">
        <p>{{ item.id }}</p>
      </div>
      <div class="item-attribute">
        <p>{{ item.partnerctid }}</p>
      </div>
      <div class="item-attribute">
        <p>{{ item.vasarlasid }}</p>
      </div>
      <div class="item-attribute">
        <p>{{ item.mennyiseg }}</p>
      </div>
      <div class="item-attribute">
        <p>{{ item.brutto }}</p>
      </div>
      <div class="item-attribute">
        <p>{{ item.partnerid }}</p>
      </div>
      <div v-if="item.cikknev" class="item-attribute">
        <p>{{ item.cikknev }}</p>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: ["item"],
  data() {
    return {
      copiedItem: null,
      // cikk: null,
    };
  },
  methods: {
    loadCikk() {
      this.error = null;
      fetch(`http://127.0.0.1:5000/cikkek/id/${this.item.partnerctid}`)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((cikk) => {
          this.copiedItem.cikknev = cikk["cikk"].nev;
          this.$emit("add-cikk", this.cikk.nev);
        })
        .catch((err) => {
          // this.isLoading = false;
          this.error = `Failed to fetch cikk data - try again later! (${err})`;
        });
    },
  },
  created() {
    this.copiedItem = this.item;
    this.loadCikk();
  },
};
</script>

<style scoped>
.item:hover {
  background: gray;
  color: white;
}

.item-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-attribute {
  width: 13%;
}

li {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
