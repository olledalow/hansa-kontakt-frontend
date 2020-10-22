<template>
  <li>
    <div
      @click="itemClicked()"
      class="item"
      :class="[clicked ? 'clicked' : '']"
    >
      <div v-if="copiedItem" class="item-main">
        <div class="item-attribute">
          <p>{{ item.id }}</p>
        </div>
        <div class="item-attribute">
          <p>{{ item.esemenydatumido }}</p>
        </div>
        <div class="item-attribute">
          <p>{{ item.vasarlasosszeg }}</p>
        </div>
        <div class="item-attribute">
          <p>{{ item.penztargepazonosito }}</p>
        </div>
        <div class="item-attribute">
          <p>{{ item.partnerid }}</p>
        </div>
        <div class="item-attribute">
          <p>{{ item.boltid }}</p>
        </div>
        <div v-if="copiedItem.boltnev" class="item-attribute">
          <p>{{ copiedItem.boltnev }}</p>
        </div>
      </div>
      <div v-if="clicked">
        <base-button>
          <router-link :to="/tetel/ + item.id">See details</router-link>
        </base-button>
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
      clicked: false,
      valWord: "",
    };
  },
  methods: {
    itemClicked() {
      this.clicked = !this.clicked;
    },
    // FETCH VASARLAS LIST FROM DATABASE
    loadBolt() {
      this.error = null;
      fetch(`http://127.0.0.1:5000/bolt/id/${this.item.boltid}`)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((bolt) => {
          this.copiedItem.boltnev = bolt["bolt"].nev;
          this.$emit("add-bolt", this.bolt.nev);
        })
        .catch((err) => {
          this.error = `Failed to fetch bolt data - try again later! (${err})`;
        });
    },
  },
  created() {
    this.copiedItem = this.item;
    this.loadBolt();
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

.clicked {
  background-color: #360032ba;
  color: white;
  border: 1px solid white;
}

a {
  color: white;
  text-decoration: none;
}
</style>
