import './style.css'
import router from './index';
import { createApp } from 'vue'
import App from './App.vue'
import VueApexCharts from 'vue3-apexcharts'

createApp(App).use(router).component('apexchart', VueApexCharts).mount('#app')
