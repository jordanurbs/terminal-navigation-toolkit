<template>
  <div 
    class="course-cta-card" 
    :class="[`variant-${variant}`, { clickable: makeCardClickable }]"
    @click="handleCardClick"
    :role="makeCardClickable ? 'button' : undefined"
    :tabindex="makeCardClickable ? 0 : undefined"
    @keydown.enter="handleCardClick"
    @keydown.space.prevent="handleCardClick"
  >
    <!-- Trial Badge -->
    <div v-if="showTrialBadge" class="trial-badge">
      <span class="badge-icon">✨</span>
      <span class="badge-text">7-Day Free Trial</span>
    </div>

    <div class="card-content">
      <!-- Image Section -->
      <div v-if="imageUrl" class="card-image">
        <img :src="imageUrl" :alt="imageAlt || courseTitle" loading="lazy">
      </div>

      <!-- Content Section -->
      <div class="card-body">
        <!-- Header -->
        <div class="card-header">
          <h3 class="course-title">{{ courseTitle }}</h3>
          <p v-if="courseSubtitle" class="course-subtitle">{{ courseSubtitle }}</p>
        </div>

        <!-- Description -->
        <p class="course-description" v-html="courseDescription"></p>

        <!-- Bullet Points -->
        <ul v-if="bulletPoints && bulletPoints.length" class="bullet-points">
          <li v-for="(point, index) in bulletPoints" :key="index">
            <span class="bullet-icon">⚓</span>
            <span class="bullet-text">{{ point }}</span>
          </li>
        </ul>

        <!-- Testimonial -->
        <div v-if="testimonialQuote" class="testimonial">
          <p class="testimonial-quote">"{{ testimonialQuote }}"</p>
          <p v-if="testimonialAuthor" class="testimonial-author">— {{ testimonialAuthor }}</p>
        </div>

        <!-- CTA Section -->
        <div class="cta-section">
          <a 
            :href="ctaUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="cta-button"
            :class="{ loading: isLoading }"
            @click.stop="handleCtaClick"
            :aria-label="`${ctaText} - ${courseTitle}`"
          >
            <span v-if="!isLoading" class="button-text">{{ ctaText }}</span>
            <span v-else class="loading-spinner"></span>
          </a>
          
            <div class="supporting-info">
              <p v-if="supportingText" class="supporting-text">{{ supportingText }}</p>
   
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CourseCtaCard',
  props: {
    // Content Props
    courseTitle: {
      type: String,
      required: true
    },
    courseSubtitle: {
      type: String,
      default: ''
    },
    courseDescription: {
      type: String,
      required: true
    },
    bulletPoints: {
      type: Array,
      default: () => []
    },
    
    // Visual Props
    imageUrl: {
      type: String,
      default: ''
    },
    imageAlt: {
      type: String,
      default: ''
    },
    variant: {
      type: String,
      default: 'default',
      validator: (value) => ['default', 'compact', 'featured'].includes(value)
    },
    
    // CTA Props
    ctaUrl: {
      type: String,
      default: 'https://skool.com/aicaptains'
    },
    ctaText: {
      type: String,
      default: 'Start Your 7-Day Free Trial'
    },
    supportingText: {
      type: String,
      default: ''
    },
    
    // Special Features
    showTrialBadge: {
      type: Boolean,
      default: true
    },
    studentCount: {
      type: String,
      default: '350'
    },
    testimonialQuote: {
      type: String,
      default: ''
    },
    testimonialAuthor: {
      type: String,
      default: ''
    },
    makeCardClickable: {
      type: Boolean,
      default: false
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleCtaClick(event) {
      if (!this.isLoading) {
        this.$emit('cta-click', {
          courseTitle: this.courseTitle,
          ctaUrl: this.ctaUrl
        });
      }
    },
    
    handleCardClick(event) {
      if (this.makeCardClickable && !event.target.closest('.cta-button')) {
        window.open(this.ctaUrl, '_blank', 'noopener,noreferrer');
        this.$emit('card-click', {
          courseTitle: this.courseTitle,
          ctaUrl: this.ctaUrl
        });
      }
    }
  }
}
</script>

<style scoped>
.course-cta-card {
  background: linear-gradient(135deg, var(--primary) 0%, #38ada9 100%);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  position: relative;
  transition: all 0.3s ease;
  margin-bottom: 2rem;
}

.course-cta-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
}

.course-cta-card.clickable {
  cursor: pointer;
}

/* Trial Badge */
.trial-badge {
  position: absolute;
  top: 20px;
  right: 20px;
  background: var(--accent);
  color: var(--primary);
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 6px;
  z-index: 10;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}

.badge-icon {
  font-size: 1rem;
}

/* Card Content */
.card-content {
  display: flex;
  background: white;
  margin: 4px;
  border-radius: 8px;
  overflow: hidden;
}

/* Image Section */
.card-image {
  flex: 0 0 40%;
  min-height: 360px;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%);
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.course-cta-card:hover .card-image img {
  transform: scale(1.05);
}

/* Content Body */
.card-body {
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
}

/* Header */
.card-header {
  margin-bottom: 1.5rem;
}

.course-title {
  color: var(--primary);
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  line-height: 1.2;
}

.course-subtitle {
  color: var(--text-light);
  font-size: 1.125rem;
  margin: 0;
  font-weight: 500;
}

/* Description */
.course-description {
  color: var(--text);
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

/* Bullet Points */
.bullet-points {
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem 0;
}

.bullet-points li {
  display: flex;
  align-items: flex-start;
  margin-bottom: 0.75rem;
  color: var(--text);
}

.bullet-icon {
  color: var(--secondary);
  margin-right: 0.75rem;
  font-size: 1.25rem;
  line-height: 1.4;
}

.bullet-text {
  flex: 1;
  line-height: 1.5;
}

/* Testimonial */
.testimonial {
  background: #f8f9fa;
  border-left: 3px solid var(--accent);
  padding: 1rem;
  margin-bottom: 1.5rem;
  border-radius: 4px;
}

.testimonial-quote {
  font-style: italic;
  color: var(--text);
  margin: 0 0 0.5rem 0;
  line-height: 1.5;
}

.testimonial-author {
  color: var(--text-light);
  font-size: 0.875rem;
  margin: 0;
  font-weight: 600;
}

/* CTA Section */
.cta-section {
  margin-top: auto;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--accent);
  color: var(--primary);
  padding: 1rem 2rem;
  border-radius: 6px;
  font-weight: 700;
  font-size: 1rem;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  min-width: 200px;
  border: 2px solid var(--accent);
}

.cta-button:hover {
  background: #e5a92e;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(246, 185, 59, 0.3);
}

.cta-button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(246, 185, 59, 0.3);
}

.cta-button.loading {
  pointer-events: none;
  opacity: 0.8;
}

/* Loading Spinner */
.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid var(--primary);
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Supporting Info */
.supporting-info {
  margin-top: 1rem;
}

.supporting-text {
  color: var(--text-light);
  font-size: 0.875rem;
  margin: 0 0 0.5rem 0;
}

.student-count {
  color: var(--secondary);
  font-size: 0.875rem;
  font-weight: 600;
  margin: 0;
}

/* Variant: Compact */
.variant-compact .card-content {
  flex-direction: column;
}

.variant-compact .card-image {
  flex: none;
  height: 200px;
  min-height: auto;
}

.variant-compact .card-body {
  padding: 1.5rem;
}

.variant-compact .course-title {
  font-size: 1.5rem;
}

.variant-compact .course-subtitle {
  font-size: 1rem;
}

.variant-compact .trial-badge {
  top: auto;
  bottom: 20px;
  right: auto;
  left: 20px;
}

/* Variant: Featured */
.variant-featured {
  border: 3px solid var(--accent);
}

.variant-featured .card-content {
  flex-direction: column;
}

.variant-featured .card-image {
  flex: none;
  min-height: 200px;
  width: 100%;
}

.variant-featured .card-body {
  padding: 2.5rem;
}

.variant-featured .course-title {
  font-size: 2rem;
  color: white;
}

.variant-featured .course-subtitle {
  color: rgba(255, 255, 255, 0.9);
}

.variant-featured .bullet-points {
  text-align: left;
}

.variant-featured .bullet-points li {
  color: var(--text);
}

.variant-featured .trial-badge {
  animation: glow 2s ease-in-out infinite;
}

@keyframes glow {
  0%, 100% { box-shadow: 0 0 10px rgba(246, 185, 59, 0.5); }
  50% { box-shadow: 0 0 20px rgba(246, 185, 59, 0.8); }
}

/* Responsive Design */
@media (max-width: 768px) {
  .card-content {
    flex-direction: column;
  }
  
  .card-image {
    flex: none;
    height: 200px;
    min-height: auto;
  }
  
  .card-body {
    padding: 1.5rem;
  }
  
  .course-title {
    font-size: 1.5rem;
  }
  
  .course-subtitle {
    font-size: 1rem;
  }
  
  .trial-badge {
    top: 10px;
    right: 10px;
    padding: 6px 12px;
    font-size: 0.75rem;
  }
  
  .cta-button {
    width: 100%;
    padding: 0.875rem 1.5rem;
  }
}

/* Print Styles */
@media print {
  .course-cta-card {
    box-shadow: none;
    page-break-inside: avoid;
  }
  
  .cta-button {
    text-decoration: underline;
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .course-cta-card,
  .card-image img,
  .cta-button,
  .trial-badge {
    animation: none;
    transition: none;
  }
}
</style>