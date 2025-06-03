<template>
  <div class="full-section bg-background responsive-padding">
    <div class="w-full">
      <div class="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h2 class="pt-6">
          <i class="fas fa-map-marked-alt mr-2 text-secondary"></i>
          Charging Stations Map
        </h2>
        <div class="flex gap-4 mt-4 sm:mt-0">
          <button
            @click="$router.push('/chargers')"
            class="bg-primary text-white py-3 px-6 hover-scale focus:ring-secondary/50 flex items-center "
          >
            <i class="fas fa-list mr-2"></i>
            Back to List
          </button>
          <button
            @click="logout"
            class="bg-red-600 text-white px-4 hover-scale focus:ring-red-600/50 flex items-center"
          >
            <i class="fas fa-sign-out-alt"></i>
          </button>
        </div>
      </div>
      <div class="card overflow-hidden">
        <div id="map" class="h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px] xl:h-[900px]"></div>
      </div>
    </div>
  </div>
</template>

<script>
import L from 'leaflet';
import axios from 'axios';
import { useToast } from 'vue-toastification';
import 'leaflet/dist/leaflet.css';

export default {
  data() {
    return {
      chargers: [],
      map: null,
    };
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  methods: {
    async fetchChargers() {
      try {
        const res = await axios.get('http://localhost:5000/api/chargers');
        this.chargers = res.data;
        this.initMap();
      } catch (err) {
        this.toast.error('Failed to fetch chargers', { timeout: 2000 });
      }
    },
    initMap() {
      if (this.map) {
        this.map.remove();
      }
      this.map = L.map('map').setView([37.7749, -122.4194], 10);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(this.map);

      this.chargers.forEach((charger) => {
        L.marker([charger.location.latitude, charger.location.longitude])
          .addTo(this.map)
          .bindPopup(
            `<b>${charger.name}</b><br>Status: ${charger.status}<br>Power: ${charger.powerOutput} kW<br>Connector: ${charger.connectorType}`
          );
      });
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