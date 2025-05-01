<template>
  <transition name="fade">
    <div v-if="notification" class="notification" :class="notification.type">
      <div class="notification-content">
        <span v-if="notification.type === 'success'" class="notification-icon">✓</span>
        <span v-else-if="notification.type === 'error'" class="notification-icon">✗</span>
        <span v-else-if="notification.type === 'info'" class="notification-icon">ℹ</span>
        <span v-else-if="notification.type === 'warning'" class="notification-icon">⚠</span>
        <span class="notification-message">{{ notification.message }}</span>
      </div>
      <button class="notification-close" @click="closeNotification">×</button>
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Notification',
  computed: {
    ...mapState(['notification'])
  },
  methods: {
    closeNotification() {
      this.$store.commit('clearNotification')
    }
  }
}
</script>

<style scoped>
.notification {
  position: fixed;
  top: 1rem;
  right: 1rem;
  padding: 0.75rem 1rem;
  border-radius: 0.25rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1000;
  min-width: 300px;
  max-width: 500px;
}

.notification-content {
  display: flex;
  align-items: center;
}

.notification-icon {
  margin-right: 0.75rem;
  font-size: 1.25rem;
}

.notification-message {
  font-size: 0.875rem;
}

.notification-close {
  background: none;
  border: none;
  color: inherit;
  font-size: 1.25rem;
  cursor: pointer;
  opacity: 0.7;
  padding: 0;
  margin-left: 1rem;
}

.notification-close:hover {
  opacity: 1;
}

.notification.success {
  background-color: var(--success);
  color: white;
}

.notification.error {
  background-color: var(--danger);
  color: white;
}

.notification.info {
  background-color: var(--info);
  color: white;
}

.notification.warning {
  background-color: var(--warning);
  color: var(--text);
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style> 