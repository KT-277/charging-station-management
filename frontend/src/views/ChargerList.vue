<template>
  <div class="full-section bg-background responsive-padding">
    <div class="w-full">
      <h2 class="mb-8 pt-6">
        <i class="fas fa-charging-station mr-2 text-secondary"></i>
        Charging Stations
      </h2>
      <div class="card mb-8">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div class="relative">
            <label class="block text-sm font-medium text-gray-700">Filter by Status</label>
            <div class="mt-2 flex items-center">
              <i class="fas fa-toggle-on text-secondary absolute ml-3"></i>
              <select
                v-model="filter.status"
                class="pl-10 w-full"
              >
                <option value="">All</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div class="relative">
            <label class="block text-sm font-medium text-gray-700">Power Output (kW)</label>
            <div class="mt-2 flex items-center">
              <i class="fas fa-bolt text-secondary absolute ml-3"></i>
              <input
                v-model="filter.powerOutput"
                type="number"
                placeholder="Min power output"
                class="pl-10 w-full"
              />
            </div>
          </div>
          <div class="relative">
            <label class="block text-sm font-medium text-gray-700">Connector Type</label>
            <div class="mt-2 flex items-center">
              <i class="fas fa-plug text-secondary absolute ml-3"></i>
              <input
                v-model="filter.connectorType"
                type="text"
                placeholder="e.g., Type 2"
                class="pl-10 w-full"
              />
            </div>
          </div>
        </div>
        <div class="flex flex-col sm:flex-row gap-4">
          <button
            @click="showAddForm = true"
            class="bg-primary text-white py-3 px-6 hover-scale focus:ring-secondary/50 flex items-center"
          >
            <i class="fas fa-plus mr-2"></i>
            Add Charger
          </button>
          <button
            @click="$router.push('/map')"
            class="bg-secondary text-white py-3 px-6 hover-scale focus:ring-secondary/50 flex items-center"
          >
            <i class="fas fa-map mr-2"></i>
            View Map
          </button>
          <button
            @click="logout"
            class="bg-red-600 text-white py-3 px-6 hover-scale focus:ring-red-600/50 flex items-center"
          >
            <i class="fas fa-sign-out-alt mr-2"></i>
            Logout
          </button>
        </div>
      </div>
      <div class="card overflow-x-auto">
        <table>
          <thead class="bg-accent/20">
            <tr>
              <th><i class="fas fa-charging-station mr-1"></i> Name</th>
              <th><i class="fas fa-map-marker-alt mr-1"></i> Location</th>
              <th><i class="fas fa-toggle-on mr-1"></i> Status</th>
              <th><i class="fas fa-bolt mr-1"></i> Power Output</th>
              <th><i class="fas fa-plug mr-1"></i> Connector Type</th>
              <th><i class="fas fa-cog mr-1"></i> Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="charger in filteredChargers"
              :key="charger._id"
              class="hover:bg-accent/10 transition duration-300 ease-in-out"
            >
              <td>{{ charger.name }}</td>
              <td>{{ charger.location.latitude }}, {{ charger.location.longitude }}</td>
              <td>{{ charger.status }}</td>
              <td>{{ charger.powerOutput }} kW</td>
              <td>{{ charger.connectorType }}</td>
              <td class="space-x-3">
                <button
                  @click="editCharger(charger)"
                  class="text-secondary font-medium hover:text-primary hover:underline hover-scale inline-flex items-center"
                >
                  <i class="fas fa-edit mr-1"></i> Edit
                </button>
                <button
                  @click="deleteCharger(charger._id)"
                  class="text-red-600 font-medium hover:text-red-700 hover:underline hover-scale inline-flex items-center"
                >
                  <i class="fas fa-trash mr-1"></i> Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        v-if="showAddForm || editingCharger"
        class="mt-8 card"
      >
        <h3 class="mb-6">
          <i class="fas fa-charging-station mr-2 text-secondary"></i>
          {{ editingCharger ? 'Edit Charger' : 'Add Charger' }}
        </h3>
        <form @submit.prevent="saveCharger" class="space-y-6">
          <div class="relative">
            <label class="block text-sm font-medium text-gray-700">Name</label>
            <div class="mt-2 flex items-center">
              <i class="fas fa-charging-station text-secondary absolute ml-3"></i>
              <input
                v-model="form.name"
                required
                placeholder="Charger name"
                class="pl-10 w-full"
              />
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div class="relative">
              <label class="block text-sm font-medium text-gray-700">Latitude</label>
              <div class="mt-2 flex items-center">
                <i class="fas fa-map-marker-alt text-secondary absolute ml-3"></i>
                <input
                  v-model="form.location.latitude"
                  type="number"
                  step="any"
                  required
                  placeholder="e.g., 37.7749"
                  class="pl-10 w-full"
                />
              </div>
            </div>
            <div class="relative">
              <label class="block text-sm font-medium text-gray-700">Longitude</label>
              <div class="mt-2 flex items-center">
                <i class="fas fa-map-marker-alt text-secondary absolute ml-3"></i>
                <input
                  v-model="form.location.longitude"
                  type="number"
                  step="any"
                  required
                  placeholder="e.g., -122.4194"
                  class="pl-10 w-full"
                />
              </div>
            </div>
          </div>
          <div class="relative">
            <label class="block text-sm font-medium text-gray-700">Status</label>
            <div class="mt-2 flex items-center">
              <i class="fas fa-toggle-on text-secondary absolute ml-3"></i>
              <select
                v-model="form.status"
                required
                class="pl-10 w-full"
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
          <div class="relative">
            <label class="block text-sm font-medium text-gray-700">Power Output (kW)</label>
            <div class="mt-2 flex items-center">
              <i class="fas fa-bolt text-secondary absolute ml-3"></i>
              <input
                v-model="form.powerOutput"
                type="number"
                required
                placeholder="e.g., 50"
                class="pl-10 w-full"
              />
            </div>
          </div>
          <div class="relative">
            <label class="block text-sm font-medium text-gray-700">Connector Type</label>
            <div class="mt-2 flex items-center">
              <i class="fas fa-plug text-secondary absolute ml-3"></i>
              <input
                v-model="form.connectorType"
                required
                placeholder="e.g., Type 2"
                class="pl-10 w-full"
              />
            </div>
          </div>
          <div class="flex gap-4">
            <button
              type="submit"
              class="bg-primary text-white py-3 px-6 hover-scale focus:ring-secondary/50 flex items-center"
            >
              <i class="fas fa-save mr-2"></i>
              Save
            </button>
            <button
              type="button"
              @click="cancelForm"
              class="bg-gray-500 text-white py-3 px-6 hover-scale focus:ring-gray-500/50 flex items-center"
            >
              <i class="fas fa-times mr-2"></i>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useToast } from 'vue-toastification';

export default {
  data() {
    return {
      chargers: [],
      showAddForm: false,
      editingCharger: null,
      form: {
        name: '',
        location: { latitude: 0, longitude: 0 },
        status: 'Active',
        powerOutput: 0,
        connectorType: '',
      },
      filter: {
        status: '',
        powerOutput: '',
        connectorType: '',
      },
    };
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  computed: {
    filteredChargers() {
      return this.chargers.filter((charger) => {
        return (
          (!this.filter.status || charger.status === this.filter.status) &&
          (!this.filter.powerOutput || charger.powerOutput >= this.filter.powerOutput) &&
          (!this.filter.connectorType ||
            charger.connectorType.toLowerCase().includes(this.filter.connectorType.toLowerCase()))
        );
      });
    },
  },
  methods: {
    async fetchChargers() {
      try {
        const res = await axios.get('http://localhost:5000/api/chargers');
        this.chargers = res.data;
      } catch (err) {
        this.toast.error('Failed to fetch chargers', { timeout: 2000 });
      }
    },
    async saveCharger() {
      const url = this.editingCharger
        ? `http://localhost:5000/api/chargers/${this.editingCharger._id}`
        : 'http://localhost:5000/api/chargers';
      const method = this.editingCharger ? 'put' : 'post';
      try {
        const res = await axios({
          method,
          url,
          data: this.form,
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        this.toast.success('Charger saved', { timeout: 2000 });
        this.fetchChargers();
        this.cancelForm();
      } catch (err) {
        this.toast.error(err.response?.data?.message || 'Error', { timeout: 2000 });
      }
    },
    editCharger(charger) {
      this.editingCharger = charger;
      this.form = { ...charger };
      this.showAddForm = false;
    },
    async deleteCharger(id) {
      try {
        await axios.delete(`http://localhost:5000/api/chargers/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        this.toast.success('Charger deleted', { timeout: 2000 });
        this.fetchChargers();
      } catch (err) {
        this.toast.error(err.response?.data?.message || 'Error', { timeout: 2000 });
      }
    },
    cancelForm() {
      this.showAddForm = false;
      this.editingCharger = null;
      this.form = {
        name: '',
        location: { latitude: 0, longitude: 0 },
        status: 'Active',
        powerOutput: 0,
        connectorType: '',
      };
    },
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    },
  },
  mounted() {
    this.fetchChargers();
  },
};
</script>