<template>
  <svg class="icon">
    <use :xlink:href="`#${icon}`" />
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    icon: {
      type: String,
      required: true,
    },
  },
}
</script>

<style>
    svg.icon {
    height: 1em;
    width: 1em;
    margin-bottom: 0.25em;
    }
</style>