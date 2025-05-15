<script setup>
import Header from '../Header.vue'
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'

// Modal control
const isModalOpen = ref(false)
const openModal = () => (
    isModalOpen.value = true
)

const closeModal = () => {
  accNum.value = ''
  selectedBank.value = ''
  selectedBankType.value = ''
  isModalOpen.value = false
}
const closeEditModal = () => {
  isEditModalOpen.value = false
  accNum.value = ''
  selectedBank.value = ''
  selectedBankType.value = ''
}

const banks = ref([])
const selectedBank = ref('')
const selectedBankType = ref('')
const selectedBankId = ref(null)
const accNum = ref('')
const loading = ref(true)
const error = ref(null)
const userbank = ref([])

const userID = sessionStorage.getItem('User_ID');

const existingBank = ref('')
const existingBankType = ref('')
const hiddenexistingBankId = ref(null)
const existingBankId = ref(null)
const existingaccNum = ref('')

const isEditModalOpen = ref(false)
const openEditModal = (bank_id) => {
  const bankToEdit = userbank.value.find(b => b.Bank_ID === bank_id)
  if (bankToEdit) {
    existingBank.value = bankToEdit.Bank.Bank_ID
    existingBankType.value = bankToEdit.Bank.Type
    existingaccNum.value = bankToEdit.AccNum
    hiddenexistingBankId.value = bank_id
    existingBankId.value = bankToEdit.Bank.Name
    isEditModalOpen.value = true
  }
}


const fetchUserBanks = async() => {
  console.log("User ID: ", userID);
  try {
    const response = await axios.get(`http://localhost:5000/api/bank/user/${userID}`)
    userbank.value = response.data.Result;
    console.log(response.data);
  } catch (err) {
    error.value = err.message || 'Failed to fetch banks'
  } finally {
    loading.value = false
  }
}

// Fetch banks from API
const fetchBanks = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/bank')
    banks.value = response.data
  } catch (err) {
    error.value = err.message || 'Failed to fetch banks'
  } finally {
    loading.value = false
  }
}

// Watch selected bank change and update type
watch(selectedBank, (newVal) => {
  const bank = banks.value.find((b) => b.Bank_ID === newVal)
  selectedBankType.value = bank ? bank.Type : ''
  selectedBankId.value = bank ? bank.Bank_ID : null
})



// Add bank account
const createUserBank = async () => {
  if (!selectedBankId.value || !accNum.value) {
    alert('Please select a bank and enter account number.')
    return
  }
  try {
    const response = await axios.post('http://localhost:5000/api/users/bank', {
      BankID: selectedBankId.value,
      UserID: userID, // Replace with dynamic user id in real app
      AccNum: accNum.value
    })
    alert('Bank added successfully.')
    closeModal()
    accNum.value = ''
    selectedBank.value = ''
    selectedBankType.value = ''
    fetchUserBanks()
  } catch (error) {
    alert('Failed to add bank account.')
  }
}

const updateUserBank = async () => {
  console.log(hiddenexistingBankId.value)
  console.log(existingaccNum.value)
  if (!hiddenexistingBankId.value || !existingaccNum.value) {
    alert('Please select a bank and enter account number.')
    return
  }
  try {
    await axios.put(`http://localhost:5000/api/bank/update/${hiddenexistingBankId.value}`, {
      AccNum: existingaccNum.value,
      UserID: userID
    })
    alert('Bank updated successfully.')
    closeEditModal()
    fetchUserBanks()
    accNum.value = ''
    selectedBank.value = ''
    selectedBankType.value = ''
    editingBankID.value = null
  } catch (error) {
  }
}

const deleteBank = async (bankId, userId) => {
  try {
    await axios.delete(`http://localhost:5000/api/bank/delete/${bankId}/${userId}`)
    alert('Bank deleted successfully.')
    closeEditModal()
    fetchUserBanks()
  } catch (error) {
    alert('Failed to update bank account.')
  }
}

onMounted(() => {
    fetchUserBanks();
    fetchBanks();
})

const bankThemes = {
  'CIMB Clicks': {
    background: 'bg-gradient-to-br from-[#790009] to-[#ee1c24]', // Burgundy to Bright Red
    text: 'text-white',
  },
  'RHB Now': {
    background: 'bg-gradient-to-br from-[#0067B1] to-[#5BC2E7]', // RHB Blue to Light Blue
    text: 'text-white',
  },
  'Hong Leong Connect': {
    background: 'bg-gradient-to-br from-[#A34230] to-[#031A50]', // Red Brown to Navy
    text: 'text-white',
  },
  'Bank Islam Internet Banking': {
    background: 'bg-gradient-to-br from-[#A51C30] to-[#E4D8BC]', // Maroon to Beige
    text: 'text-white',
  },
  'AmOnline (AmBank)': {
    background: 'bg-gradient-to-br from-[#E60000] to-[#FFD700]', // Red to Yellow
    text: 'text-black',
  },
  'HSBC Malaysia Online Banking': {
    background: 'bg-gradient-to-br from-[#DB0011] to-[#FFFFFF]', // Red to White
    text: 'text-black',
  },
  'OCBC Online Banking': {
    background: 'bg-gradient-to-br from-[#E60012] to-[#FFFFFF]', // Red to White
    text: 'text-black',
  },
  'UOB Personal Internet Banking': {
    background: 'bg-gradient-to-br from-[#C8102E] to-[#FFFFFF]', // Red to White
    text: 'text-black',
  },
  'AffinOnline (Affin Bank)': {
    background: 'bg-gradient-to-br from-[#005BAC] to-[#FF0000]', // Blue to Red
    text: 'text-white',
  },
  'Bank Rakyat iRakyat': {
    background: 'bg-gradient-to-br from-[#F9502A] to-[#031A50]', // Orange to Navy
    text: 'text-white',
  },
  'Alliance Online (Alliance Bank)': {
    background: 'bg-gradient-to-br from-[#005BAC] to-[#FFFFFF]', // Blue to White
    text: 'text-black',
  },
  'Public Bank PB engage': {
    background: 'bg-gradient-to-br from-[#E60012] to-[#FFFFFF]', // Red to White
    text: 'text-black',
  },
  'Standard Chartered Online Banking': {
    background: 'bg-gradient-to-br from-[#0072AA] to-[#21AA47]', // Blue to Green
    text: 'text-white',
  },
  'Agrobank Internet Banking': {
    background: 'bg-gradient-to-br from-[#E60012] to-[#FFFFFF]', // Red to White
    text: 'text-black',
  },
  'Touch n Go eWallet': {
    background: 'bg-gradient-to-br from-[#0078D7] to-[#FFD700]', // Blue to Yellow
    text: 'text-black',
  },
  'Boost': {
    background: 'bg-gradient-to-br from-[#FF0000] to-[#FFFFFF]', // Red to White
    text: 'text-black',
  },
  'GrabPay': {
    background: 'bg-gradient-to-br from-[#00B14F] to-[#FFFFFF]', // Green to White
    text: 'text-black',
  },
  'ShopeePay': {
    background: 'bg-gradient-to-br from-[#FF5722] to-[#FFFFFF]', // Orange to White
    text: 'text-black',
  },
  'Setel': {
    background: 'bg-gradient-to-br from-[#4B0082] to-[#FFFFFF]', // Indigo to White
    text: 'text-white',
  },
  'Maybank2u': {
    background: 'bg-gradient-to-br from-[#FFD700] to-[#000000]', // Yellow to Black
    text: 'text-black',
  }


  // fetch graph and charts
  
};


</script>

<template>
  <title>User | Bank Management</title>
  <Header></Header>
  <div class="p-4 fw-special">
    <h2 class="font-bold text-[30px]">Bank Management</h2>
    <p>Recent bank used</p>

    <!-- Carousell here making like credit card-->

    <!-- Credit Card Carousel -->
    <div class="overflow-x-auto whitespace-nowrap py-4 space-x-4 flex">
      <div
        v-for="(bank, index) in userbank || []"
        :key="index"
        :class="[
          'inline-block min-w-[300px] max-w-sm rounded-xl shadow-lg p-4 mx-2 hover:cursor-pointer',
          bankThemes[bank.Bank.Name]?.background || 'bg-gradient-to-br from-gray-500 to-gray-700', 
          
          bankThemes[bank.Bank.Name]?.text || 'text-black'
        ]"
        @click="openEditModal(bank.Bank_ID)"
      >
        <div class="flex justify-between">
          <div class="justify-between items-center mb-2">
            <h3 class="text-lg font-semibold">{{ bank.Bank.Name }}</h3>
            <span class="text-sm">{{ bank.Bank.Type }}</span>
          </div>
          <!-- Card Chip Image -->
          <div class="mt-4">
            <img
              src="https://cdn-icons-png.freepik.com/512/6404/6404078.png"
              alt="Card Chip"
              class="w-10 h-auto mb-2"
            />
          </div>
        </div>

        <div class="text-md tracking-wider">
          {{
            (('*'.repeat(bank.AccNum.length - 4) + bank.AccNum.slice(-4))
              .match(/.{1,4}/g) || [])
              .join(' ')
          }}
        </div>
      </div>
    </div>



    <div class="w-full mt-2">
      <p><strong>Your Bank</strong></p>
      <button
        class="bg-blue-500 p-2 text-white hover:bg-blue-600 rounded-md mb-2"
        @click="openModal"
      >
        <i class="fa fa-plus mr-2" aria-hidden="true"></i>
        Add new bank account
      </button>

      <div class="w-full overflow-y-auto">
        <table class="w-full bg-white border border-gray-200 rounded shadow">
          <thead class="bg-gray-100 text-gray-700">
            <tr>
              <th class="px-4 py-2 border-b">#</th>
              <th class="px-4 py-2 border-b">Account Number</th>
              <th class="px-4 py-2 border-b">Bank</th>
              <th class="px-4 py-2 border-b">Type</th>
              <th class="px-4 py-2 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
                v-for="(bank, index) in userbank || []"
                :key="bank.Bank_ID"
                class="hover:bg-gray-50"
            >
                <td class="px-4 py-2 border-b text-center">{{ index + 1 }}</td>
                <td class="px-4 py-2 border-b text-center">{{ bank.AccNum }}</td>
                <td class="px-4 py-2 border-b text-center">{{ bank.Bank.Name }}</td>
                <td class="px-4 py-2 border-b text-center">{{ bank.Bank.Type }}</td>
                <td class="px-4 py-2 border-b text-center flex justify-center gap-3">
                  <button
                      class="bg-blue-500 text-white hover:bg-blue-700 px-2 py-1 rounded-md"
                      @click="openEditModal(bank.Bank_ID)"
                    >
                    <i class="fa fa-edit" aria-hidden="true"></i>
                  </button>
                  <button
                      class="bg-red-500 text-white hover:bg-red-700 px-2 py-1 rounded-md"
                      @click="deleteBank(bank.Bank_ID, bank.User_ID)"
                    >
                    <i class="fa fa-trash" aria-hidden="true"></i>
                  </button>
                    
                </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black" style="background-color: rgba(0, 0, 0, 0.5)" >
      <div class="bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg relative">
        <div class="flex justify-between">
          <h2 class="text-xl font-semibold mb-2">New Bank</h2>
          <button
            @click="closeModal"
            class="absolute top-2 right-2 p-3 text-gray-500 hover:text-black"
          >
            <i class="fa fa-times fa-lg" aria-hidden="true"></i>
          </button>
        </div>
        <hr class="mb-2" />
        <div class="w-full">
          <!-- Bank -->
          <div class="flex items-center mb-2">
            <div class="w-full">
              <p>Bank:</p>
              <select
                v-model="selectedBank"
                id="bank"
                class="w-full border-2 rounded-md p-1"
              >
                <option disabled value="">-- Please select a bank --</option>
                <option
                  v-for="bank in banks"
                  :key="bank.Bank_ID"
                  :value="bank.Bank_ID"
                >
                  {{ bank.Name }}
                </option>
              </select>
            </div>
          </div>

          <!-- Account Number -->
          <div class="flex items-center mb-2">
            <div class="w-full">
              <p>Account Number:</p>
              <input
                type="text"
                v-model="accNum"
                class="w-full border-2 rounded-md p-1"
              />
            </div>
          </div>

          <!-- Type (auto populated) -->
          <div class="flex items-center mb-2">
            <div class="w-full">
              <p>Type:</p>
              <input
                type="text"
                :value="selectedBankType"
                class="w-full border-2 rounded-md p-1"
                disabled
              />
            </div>
          </div>
        </div>
        <hr class="mb-3" />
        <div class="w-full flex justify-end">
          <button
            class="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            @click="createUserBank"
          >
            <i class="fa fa-save ml-1 mr-1.5" aria-hidden="true"></i>
            Save
          </button>
        </div>
      </div>
    </div>


    <!-- Edit Modal -->
    <div v-if="isEditModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black" style="background-color: rgba(0, 0, 0, 0.5)" >
      <div class="bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg relative">
        <div class="flex justify-between">
          <h2 class="text-xl font-semibold mb-2">Update Bank</h2>
          <button
            @click="closeEditModal"
            class="absolute top-2 right-2 p-3 text-gray-500 hover:text-black"
          >
            <i class="fa fa-times fa-lg" aria-hidden="true"></i>
          </button>
        </div>
        <hr class="mb-2" />
        <div class="w-full">
          <!-- Bank -->
          <div class="flex items-center mb-2">
            <div class="w-full">
              <p>Bank:</p>
              <input
                type="hidden"
                v-model="hiddenexistingBankId"
                class="w-full rounded-md p-1"
              />
              <input
                type="text"
                v-model="existingBankId"
                class="w-full rounded-md p-1"
                disabled
              />
              <!-- <select
                v-model="existingBankId"
                id="existingBankId"
                class="w-full border-2 rounded-md p-1"
                disabled
              >
                <option disabled value="">-- Please select a bank --</option>
                <option
                  v-for="bank in banks"
                  :key="bank.Bank_ID"
                  :value="bank.Bank_ID"
                >
                  {{ bank.Name }}
                </option>
              </select> -->
            </div>
          </div>

          <!-- Account Number -->
          <div class="flex items-center mb-2">
            <div class="w-full">
              <p>Account Number:</p>
              <input
                type="text"
                v-model="existingaccNum"
                class="w-full border-2 rounded-md p-1"
              />
            </div>
          </div>

          <!-- Type (auto populated) -->
          <div class="flex items-center mb-2">
            <div class="w-full">
              <p>Type:</p>
              <input
                type="text"
                :value="existingBankType"
                class="w-full rounded-md p-1"
                disabled
              />
            </div>
          </div>
        </div>
        <hr class="mb-3" />
        <div class="w-full flex justify-end">
          <button
            class="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            @click="updateUserBank"
          >
            <i class="fa fa-save ml-1 mr-1.5" aria-hidden="true"></i>
            Save
          </button>
        </div>
      </div>
    </div>





  </div>
</template>
