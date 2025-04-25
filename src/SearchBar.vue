<template>
  <div
    style="
      padding: 20px;
      background: transparent;
      position: absolute;
      left: 0px;
    "
  >
    <input
      type="text"
      placeholder="Search todos..."
      class="valo"
      :value="query"
      @input="updateQuery"
      @focus="isFocused = true"
      @blur="isFocused = false"
      :style="{
        padding: '10px',
        borderRadius: '4px',
        backgroundColor: isFocused ? '#FAE8ED' : 'transparent',
        color: isFocused ? '#ffffff' : '#4A3434',
        width: '700px',
        transition: 'border-color 0.3s ease',
        outline: 'none',
        border: '1px solid #C990AB'
      }"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  query: String
})
const emit = defineEmits(['update:query'])

const isFocused = ref(false)

const updateQuery = (e) => {
  emit('update:query', e.target.value)
}
</script>

