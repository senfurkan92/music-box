<template>
  <button type="button" @click="aware()">
    Click me!
  </button>
</template>

<script>
export default {
  methods: {
    aware() {
      alert('hi');
    },
  },
};
</script>
