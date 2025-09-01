<template>
  <div class="course-cta-examples">
    <div class="container">
      <header class="examples-header">
        <h1>CourseCtaCard Component Examples</h1>
        <p>Demonstration of different variants and configurations</p>
      </header>

      <!-- Default Variant -->
      <section class="example-section">
        <h2>Default Variant</h2>
        <CourseCtaCard
          course-title="Terminal Navigation Mastery"
          course-subtitle="From Command Line Intimidation to Terminal Confidence"
          course-description="Master the command line with our comprehensive terminal navigation course. Learn essential commands, file management, and productivity techniques that will transform your development workflow."
          :bullet-points="[
            'Master 50+ essential terminal commands',
            'Learn advanced file navigation techniques', 
            'Boost productivity with aliases and shortcuts',
            'Understand permissions and process management',
            'Get lifetime access to course updates'
          ]"
          image-url="/images/terminal-course-preview.jpg"
          image-alt="Terminal Navigation Mastery Course Preview"
          cta-url="/course/terminal-mastery"
          cta-text="Start Learning Today"
          supporting-text="Join thousands of developers who've mastered the terminal"
          :show-trial-badge="true"
          student-count="2,847"
          @cta-click="handleCtaClick"
        />
      </section>

      <!-- Compact Variant -->
      <section class="example-section">
        <h2>Compact Variant</h2>
        <CourseCtaCard
          variant="compact"
          course-title="Git & GitHub Essentials"
          course-subtitle="Version Control Made Simple"
          course-description="Learn Git fundamentals and GitHub workflow essentials in this focused, hands-on course designed for developers who want to master version control quickly."
          :bullet-points="[
            'Git basics and branching strategies',
            'GitHub collaboration workflows',
            'Merge conflicts and resolution',
            'Pull requests and code reviews'
          ]"
          image-url="/images/git-course-preview.jpg"
          image-alt="Git & GitHub Essentials Course"
          cta-url="https://aicaptains.ai/courses/git-essentials"
          cta-text="Enroll Now"
          supporting-text="No credit card required for trial"
          student-count="1,205"
          testimonial-quote="This course finally made Git click for me. The examples are practical and easy to follow."
          testimonial-author="Sarah Chen, Frontend Developer"
          @cta-click="handleCtaClick"
        />
      </section>

      <!-- Featured Variant -->
      <section class="example-section">
        <h2>Featured Variant</h2>
        <CourseCtaCard
          variant="featured"
          course-title="Full-Stack Developer Bootcamp"
          course-subtitle="Complete Web Development Mastery"
          course-description="The most comprehensive full-stack development course covering modern JavaScript, React, Node.js, databases, and deployment. Build real projects and launch your developer career."
          :bullet-points="[
            'Modern JavaScript ES6+ and TypeScript',
            'React with Hooks and Context API',
            'Node.js and Express server development',
            'MongoDB and PostgreSQL databases',
            'AWS deployment and DevOps basics',
            'Portfolio projects and career guidance'
          ]"
          image-url="/images/fullstack-course-preview.jpg"
          image-alt="Full-Stack Developer Bootcamp"
          cta-url="/course/fullstack-bootcamp"
          cta-text="Join Bootcamp"
          supporting-text="30-day money-back guarantee • Lifetime access"
          :show-trial-badge="true"
          student-count="5,643"
          testimonial-quote="Best investment I've made in my career. Landed my first developer job within 6 months of completing the bootcamp."
          testimonial-author="Mike Rodriguez, Software Engineer at Spotify"
          :make-card-clickable="true"
          :is-loading="isLoading"
          @cta-click="handleCtaClick"
          @card-click="handleCardClick"
        />
      </section>

      <!-- Without Image -->
      <section class="example-section">
        <h2>Text-Only Version</h2>
        <CourseCtaCard
          course-title="DevOps Fundamentals"
          course-subtitle="Infrastructure and Deployment Mastery"
          course-description="Learn essential DevOps practices including CI/CD pipelines, containerization with Docker, Kubernetes orchestration, and cloud deployment strategies."
          :bullet-points="[
            'Docker containerization and best practices',
            'Kubernetes cluster management',
            'CI/CD with GitHub Actions and Jenkins',
            'AWS and Azure cloud deployment',
            'Infrastructure as Code with Terraform'
          ]"
          cta-url="/course/devops-fundamentals"
          cta-text="Master DevOps"
          supporting-text="Includes hands-on labs and real-world projects"
          student-count="892"
          @cta-click="handleCtaClick"
        />
      </section>

      <!-- Loading State Demo -->
      <section class="example-section">
        <h2>Interactive Controls</h2>
        <div class="controls">
          <button @click="toggleLoading" class="btn btn-secondary">
            {{ isLoading ? 'Stop Loading' : 'Simulate Loading' }}
          </button>
          <button @click="showNotification" class="btn btn-primary">
            Test Notification
          </button>
        </div>
      </section>

      <!-- Usage Examples -->
      <section class="example-section">
        <h2>Code Examples</h2>
        <div class="code-examples">
          <div class="code-block">
            <h3>Basic Usage</h3>
            <pre><code>&lt;CourseCtaCard
  course-title="Your Course Title"
  course-description="Course description here"
  :bullet-points="['Feature 1', 'Feature 2', 'Feature 3']"
  cta-url="/your-course-url"
  cta-text="Enroll Now"
  @cta-click="handleCtaClick"
/&gt;</code></pre>
          </div>

          <div class="code-block">
            <h3>Featured Course</h3>
            <pre><code>&lt;CourseCtaCard
  variant="featured"
  course-title="Premium Course"
  course-subtitle="Advanced Training"
  course-description="Detailed description..."
  :bullet-points="bulletPointsArray"
  image-url="/course-image.jpg"
  cta-url="/premium-course"
  :show-trial-badge="true"
  student-count="1,500"
  :make-card-clickable="true"
  testimonial-quote="Amazing course!"
  testimonial-author="Student Name"
  @cta-click="handleEnrollment"
  @card-click="trackCardInteraction"
/&gt;</code></pre>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import CourseCtaCard from './CourseCtaCard.vue'

export default {
  name: 'CourseCtaCardExamples',
  components: {
    CourseCtaCard
  },
  data() {
    return {
      isLoading: false,
      notificationTimeout: null
    }
  },
  methods: {
    handleCtaClick(payload) {
      console.log('CTA Clicked:', payload)
      
      // Simulate API call
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
        this.showNotification('Enrollment successful!', 'success')
      }, 2000)
    },
    
    handleCardClick(payload) {
      console.log('Card Clicked:', payload)
      this.showNotification('Navigating to course page...', 'info')
    },
    
    toggleLoading() {
      this.isLoading = !this.isLoading
    },
    
    showNotification(message = 'Action completed!', type = 'success') {
      // This would integrate with your notification system
      // For now, just console log
      console.log(`Notification [${type}]:`, message)
      
      // Clear existing timeout
      if (this.notificationTimeout) {
        clearTimeout(this.notificationTimeout)
      }
      
      // Auto-clear after 3 seconds
      this.notificationTimeout = setTimeout(() => {
        console.log('Notification cleared')
      }, 3000)
    }
  }
}
</script>

<style scoped>
.course-cta-examples {
  padding: 2rem 0;
  background-color: var(--background);
}

.examples-header {
  text-align: center;
  margin-bottom: 3rem;
}

.examples-header h1 {
  color: var(--primary);
  margin-bottom: 0.5rem;
}

.examples-header p {
  color: var(--text-light);
  font-size: 1.1rem;
}

.example-section {
  margin-bottom: 4rem;
}

.example-section h2 {
  color: var(--primary);
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--secondary);
}

.controls {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.code-examples {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

.code-block {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.code-block h3 {
  color: var(--primary);
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.code-block pre {
  background: #f8f9fa;
  border-radius: 6px;
  padding: 1rem;
  overflow-x: auto;
  margin: 0;
}

.code-block code {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--text);
}

@media (min-width: 768px) {
  .code-examples {
    grid-template-columns: 1fr 1fr;
  }
  
  .controls {
    justify-content: center;
  }
}

@media (max-width: 767px) {
  .course-cta-examples {
    padding: 1rem 0;
  }
  
  .example-section {
    margin-bottom: 2.5rem;
  }
  
  .examples-header {
    margin-bottom: 2rem;
  }
}
</style>