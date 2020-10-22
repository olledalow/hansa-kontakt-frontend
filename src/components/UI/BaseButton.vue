<template>
  <button>
    <slot></slot>
  </button>
</template>

<style scoped>
button {
  font: inherit;
  border: 1px solid #360032;
  background-color: #360032;
  color: white;
  padding: 0.5rem 2rem;
  cursor: pointer;
  margin: 5px;
}

button:hover,
button:active {
  background-color: #5c0556;
  border-color: #5c0556;
}

button:disabled {
  background: #dddddd;
  cursor: default;
}
</style>
