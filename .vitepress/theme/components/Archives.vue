<template>
  <div>
    {{ theme }}
  </div>
</template>

<script lang="ts" setup>
import { useData } from "vitepress";

const { theme } = useData();
</script>

<style lang="scss" scoped></style>
