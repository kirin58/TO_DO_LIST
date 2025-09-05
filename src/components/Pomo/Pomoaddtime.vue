<template>
  <div class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-20">
    <div class="bg-white rounded-lg shadow-lg p-6 min-w-[320px] relative">
      <button class="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-lg" @click="$emit('close')">
        &times;
      </button>
      <div class="font-semibold text-lg mb-4">Add Timer</div>
      <input
        type="text"
        v-model="title"
        class="border rounded px-2 py-1 w-full mb-4"
        placeholder="POMO"
      />
      <div class="mb-4">
        <div class="font-medium mb-2">Time Mode</div>
        <div class="flex items-center mb-2">
          <input
            type="radio"
            id="pomo"
            value="pomo"
            v-model="mode"
            class="mr-2"
          />
          <label for="pomo" class="mr-2">Pomo</label>
          <input
            type="number"
            min="1"
            max="99"
            v-model.number="minutes"
            :disabled="mode !== 'pomo'"
            class="border rounded w-12 px-1 py-0.5 text-center mr-1"
          />
          <span>mins</span>
        </div>
        <div class="flex items-center">
          <input
            type="radio"
            id="stopwatch"
            value="stopwatch"
            v-model="mode"
            class="mr-2"
          />
          <label for="stopwatch">Stopwatch</label>
        </div>
      </div>
      <div class="flex justify-end space-x-2">
        <button @click="$emit('close')" class="border px-3 py-1 rounded text-gray-600">Cancel</button>
        <button
          @click="save"
          class="bg-orange-400 text-white px-4 py-1 rounded disabled:opacity-50"
          :disabled="mode === 'pomo' && (!minutes || minutes < 1)"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['close', 'save'],
  data() {
    return {
      title: 'POMO',
      mode: 'pomo',
      minutes: 5,
    };
  },
  methods: {
    save() {
      this.$emit('save', {
        title: this.title,
        mode: this.mode,
        minutes: this.mode === 'pomo' ? this.minutes : null,
      });
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
input[type="radio"] {
  accent-color: #fb923c;
}
</style>