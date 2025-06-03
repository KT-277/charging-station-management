<template>
  <div class="full-section bg-background responsive-padding">
    <div class="card mx-auto max-w-2xl my-12 md:my-16">
      <h2 class="text-center mb-10">
        <i class="mr-2 text-secondary"></i>
        {{ isRegister ? 'Register' : 'Login' }}
      </h2>
      <form @submit.prevent="handleSubmit" class="space-y-8 px-4 sm:px-8">
        <div v-if="isRegister" class="relative">
          <label class="block text-sm font-medium text-gray-700">Full Name</label>
          <div class="mt-2 flex items-center">
            <i class="fas fa-user text-secondary absolute ml-3"></i>
            <input
              v-model="form.fullName"
              type="text"
              required
              placeholder="Enter your full name"
              class="pl-10 w-full"
            />
          </div>
        </div>
        <div class="relative">
          <label class="block text-sm font-medium text-gray-700">Username</label>
          <div class="mt-2 flex items-center">
            <i class="fas fa-user text-secondary absolute ml-3"></i>
            <input
              v-model="form.username"
              type="text"
              required
              placeholder="Enter your username"
              class="pl-10 w-full"
            />
          </div>
        </div>
        <div v-if="isRegister" class="relative">
          <label class="block text-sm font-medium text-gray-700">Email Address</label>
          <div class="mt-2 flex items-center">
            <i class="fas fa-envelope text-secondary absolute ml-3"></i>
            <input
              v-model="form.email"
              type="email"
              required
              placeholder="Enter your email"
              class="pl-10 w-full"
            />
          </div>
        </div>
        <div class="relative">
          <label class="block text-sm font-medium text-gray-700">Password</label>
          <div class="mt-2 flex items-center">
            <i class="fas fa-lock text-secondary absolute ml-3"></i>
            <input
              v-model="form.password"
              type="password"
              required
              placeholder="Enter your password"
              class="pl-10 w-full"
            />
          </div>
        </div>
        <button
          type="submit"
          class="w-full bg-primary text-white py-3 px-6 hover-scale focus:ring-secondary/50"
        >
          {{ isRegister ? 'Register' : 'Login' }}
        </button>
        <p class="text-center text-sm text-gray-600 mt-6">
          {{ isRegister ? 'Already have an account?' : 'No account?' }}
          <a href="#" @click="toggleMode" class="text-secondary font-medium hover:underline hover:text-primary transition duration-200">
            {{ isRegister ? 'Login' : 'Register' }}
          </a>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useToast } from 'vue-toastification';

export default {
  data() {
    return {
      isRegister: false,
      form: {
        username: '',
        password: '',
        fullName: '',
        email: '',
      },
    };
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  methods: {
    async handleSubmit() {
      const url = this.isRegister
        ? 'http://localhost:5000/api/auth/register'
        : 'http://localhost:5000/api/auth/login';
      try {
        const payload = this.isRegister
          ? this.form
          : { username: this.form.username, password: this.form.password };
        const res = await axios.post(url, payload);
        localStorage.setItem('token', res.data.token);
        this.toast.success('Success!', { timeout: 2000 });
        this.$router.push('/chargers');
      } catch (err) {
        this.toast.error(err.response?.data?.message || 'Error', { timeout: 2000 });
      }
    },
    toggleMode() {
      this.isRegister = !this.isRegister;
    },
  },
};
</script>