<template>
  <div v-if="visible" class="chat-panel-container">
    <div class="chat-panel">
      <div class="chat-panel-header">
        <slot name="header">
          <h2>Chat With Captain JAX</h2>
        </slot>
        <div class="chat-panel-actions">
          <button class="chat-panel-minimize" @click="$emit('minimize')" title="Minimize">_</button>
          <button class="chat-panel-close" @click="close" title="Close">×</button>
        </div>
      </div>
      <div class="chat-panel-body">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatModal',
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  emits: ['close', 'minimize'],
  methods: {
    close() {
      this.$emit('close');
    }
  }
}
</script>

<style scoped>
.chat-panel-container {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 2000;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}
.chat-panel {
  background: #fff;
  border-radius: 12px 12px 8px 12px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  width: 480px;
  height: 600px;
  max-width: 95vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 0;
  overflow: hidden;
}
.chat-panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem 0.5rem 1.5rem;
  border-bottom: 1px solid #e2e8f0;
}
.chat-panel-actions {
  display: flex;
  gap: 0.5rem;
}
.chat-panel-minimize,
.chat-panel-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #8892b0;
  cursor: pointer;
  z-index: 10;
  padding: 0 0.5rem;
  line-height: 1;
}
.chat-panel-minimize:hover,
.chat-panel-close:hover {
  color: #2c3e50;
}
.chat-panel-body {
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
}


</style> 