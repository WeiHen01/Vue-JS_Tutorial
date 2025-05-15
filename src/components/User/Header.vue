<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faHome, faInfoCircle, faCogs, faUserShield, faUser, faUsers, faBars, faTimes, faChevronDown, faBuilding, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useRouter } from 'vue-router'
const router = useRouter()

const userID = sessionStorage.getItem('User_ID');
var email = "";
const username = ref('')

// Execute fetching data
const fetchUserData = async () => {
  console.log(userID);
  if (!userID) {
    alert('User ID is not found in session.');
    return;
  }
  try {
    const res = await axios.get(`http://localhost:5000/api/users/get/user/${userID}`);
    console.log('User Data:', res.data);
    console.log(res.data.Result[0].Username)
    username.value = res.data.Result[0].Username;
  } catch (error: any) {
    console.error('Fetch failed:', error.response?.data || error.message);
    alert('Failed to fetch user data.');
  }
};

const logout = () => {
  // Remove User_ID from sessionStorage
  sessionStorage.removeItem('User_ID');

  // Optionally, you can handle any other logout logic here like redirecting, clearing user data, etc.
  console.log('Logged out and User_ID removed from sessionStorage');
  
  // If using Vue Router for navigation, you can do:
  router.push('/Authentication/Login');
};

// State
const isServicesDropdownOpen = ref(false)
const isInfoDropdownOpen = ref(false)
const isProfileDropdownOpen = ref(false)
const isBankDropdownOpen = ref(false)
const isTransDropdownOpen = ref(false)

// Refs
const servicesDropdownRef = ref<HTMLElement | null>(null)
const infoDropdownRef = ref<HTMLElement | null>(null)
const profileDropdownRef = ref<HTMLElement | null>(null)
const bankDropdownRef = ref<HTMLElement | null>(null)
const transDropdownRef = ref<HTMLElement | null>(null)

// Toggles
const toggleServicesDropdown = () => {
  isServicesDropdownOpen.value = !isServicesDropdownOpen.value
}
const toggleBankDropdown = () => {
  isBankDropdownOpen.value = !isBankDropdownOpen.value
}
const toggleTransDropdown = () => {
  isTransDropdownOpen.value = !isTransDropdownOpen.value
}
const toggleInfoDropdown = () => {
  isInfoDropdownOpen.value = !isInfoDropdownOpen.value
}
const toggleProfileDropdown = () => {
  isProfileDropdownOpen.value = !isProfileDropdownOpen.value
}

// Click outside
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as Node
  if (
    servicesDropdownRef.value && !servicesDropdownRef.value.contains(target) &&
    infoDropdownRef.value && !infoDropdownRef.value.contains(target) &&
    profileDropdownRef.value && !profileDropdownRef.value.contains(target) &&
    bankDropdownRef.value && !bankDropdownRef.value.contains(target) &&
    transDropdownRef.value && !transDropdownRef.value.contains(target)
  ) {
    isServicesDropdownOpen.value = false
    isInfoDropdownOpen.value = false
    isProfileDropdownOpen.value = false
    isTransDropdownOpen.value = false
    isBankDropdownOpen.value = false
  }
}


onMounted(() => {
  fetchUserData()
  document.addEventListener('mousedown', handleClickOutside)
})
onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})


</script>

<template>
    <nav className="bg-gray-800 fw-special bg-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div class="flex-shrink-0">
            <a href="/User" class="text-white font-bold text-xl flex items-center">
              <i class="fa-solid fa-dollar-sign mr-2"></i>
              Finance
            </a>
          </div>

          <div class="hidden md:flex items-center justify-center flex-1">
            <div class="flex items-baseline space-x-4">
              <a href="/User" class="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
                <i class="fa fa-home mr-2" aria-hidden="true"></i>
                Home
              </a>
              <div class="relative" ref="servicesDropdownRef">
                <button @click="toggleServicesDropdown" class="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                    <i class="fa fa-bank mr-2" aria-hidden="true"></i>
                    Bank
                    <font-awesome-icon :icon="faChevronDown" class="ml-2" />
                </button>
                <div v-if="isServicesDropdownOpen" class="absolute z-10 left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div class="py-1">
                      <a href="/User/Bank/Manage" class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                          <i class="fa fa-edit mr-2" aria-hidden="true"></i>
                          Bank Management
                      </a>
                   
                    </div>
                </div>
              </div>
              <div class="relative" ref="bankDropdownRef">
                <button @click="toggleBankDropdown" class="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                    <i class="fa-solid fa-money-bill-transfer mr-2"></i>
                    Transaction
                    <font-awesome-icon :icon="faChevronDown" class="ml-2" />
                </button>
                <div v-if="isBankDropdownOpen" class="absolute z-10 left-0 mt-2 w-60 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div class="py-1">
                      <a href="/User/Transaction/Manage" class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                          <i class="fa fa-edit mr-2" aria-hidden="true"></i>
                          Transaction Management
                      </a>
                    
                    </div>
                </div>
              </div>
              
            </div>
          </div>

          <div class="hidden md:flex items-center space-x-1">
            <div class="relative" ref="infoDropdownRef">
                <button @click="toggleInfoDropdown" class="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center" >
                    <i class="fa fa-info-circle" aria-hidden="true"></i>
                </button>
                <div v-if="isInfoDropdownOpen" class="absolute z-10 right-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div class="px-1 py-1 text-black">
                        <p class="mx-2 text-xlg font-bold">About this system</p>
                        <hr class="mx-2 border-t-2" />
                        <div class="p-2 text-xs">
                        <p>Version: 1.0.0</p>
                        <p>Last Updated At: 7 April 2025, 3:40 p.m.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="relative" ref="profileDropdownRef">
              <button
                @click="toggleProfileDropdown"
                class="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
              >
                Welcome, {{ username }}
                <i class="fa fa-chevron-down ml-2" aria-hidden="true"></i>
              </button>
              <div v-if="isProfileDropdownOpen" class="absolute z-10 right-0 mt-2 w-34 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div class="py-1">
                    <a href="/User/Profile" class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                    <font-awesome-icon :icon="faUser" class="mr-2" />
                    Account
                    </a>
                    <hr class="border-t-2 border-black" />
                    <a href="/Authentication/Login" @click.prevent="logout" class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                    <font-awesome-icon :icon="faSignOutAlt" class="mr-2" />
                    Logout
                    </a>
                </div>
                </div>
            </div>
          </div>

          
        </div>

        
      </div>
    </nav>
</template>