<script setup lang="ts">
    import Header from '../Header.vue'
    import { ref, onMounted, watch } from 'vue'
    import axios from 'axios'

    // openmodal
    const isModalOpen = ref(false)

    // Modal control
    const openModal = () => {
        isModalOpen.value = true
    }
    const closeModal = () => {
        isModalOpen.value = false
    }

    const transactions = ref([])
    const userID = sessionStorage.getItem('User_ID');
    const selectedBank = ref('')
    const userbank = ref([])
    const loading = ref(true)
    const error = ref(null)
    
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
    const fetchTransactions = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/trans/user/${userID}`)
            transactions.value = response.data
            console.log(response.data)
        } catch (err) {
            error.value = err.message || 'Failed to fetch banks'
        } finally {
            loading.value = false
        }
    }

    const amount = ref('')
    const date = ref('')
    const usage = ref('')

    const saveTransaction = async() => {
        try{
            const response = await axios.post('http://localhost:5000/api/trans/new', {
                Bank_ID: selectedBank.value,
                User_ID: userID,
                Amount: amount.value,
                Date: date.value,
                Usage: usage.value
            })

            alert('Transaction added successfully!')
        }catch (err) {
            error.value = err.message || 'Failed to fetch banks'
        } finally {
            loading.value = false
        }
    }

    

    const hiddenexistingBankId = ref(null)
    const isEditModalOpen = ref(false)
    const openEditModal = (trans_id) => {
        console.log("Trans: ", trans_id)
        const transToEdit = transactions.value.find(b => b.Trans_ID === trans_id)

        if (transToEdit) {
            isEditModalOpen.value = true
            selectedBank.value = transToEdit.Bank_ID
            amount.value = transToEdit.Amount
            date.value = transToEdit.TransferAt
            usage.value = transToEdit.Usage
            hiddenexistingBankId.value = trans_id
        }
    }
    const closeEditModal = () => (isEditModalOpen.value = false)


    const updateUserTrans = async () => {
        const trans_id = hiddenexistingBankId.value
        console.log("Trans: ", trans_id)
        console.log(usage.value)
        try {
            await axios.put(`http://localhost:5000/api/trans/update/${trans_id}`, {
                Bank_ID: selectedBank.value,
                Amount: amount.value, 
                Usage: usage.value,
                Date:date.value  
            })
            alert('Bank updated successfully.')
            closeEditModal()
            fetchUserBanks()
            fetchTransactions()
        } catch (error) {

        }
    }

    const deleteTrans = async (trans_id) => {
        try {
            await axios.delete(`http://localhost:5000/api/trans/${trans_id}`)
            alert('Bank deleted successfully.')
            closeEditModal()
            fetchUserBanks()
            fetchTransactions()
        } catch (error) {
            alert('Failed to delete transactions.')
        }
    }

    onMounted(() => {
        fetchUserBanks()
        fetchTransactions()
        fetchMonthStats()
    })

    const year = ref(new Date().getFullYear())
    const series = ref([])
    const chartOptions = ref({
        chart: {
            id: 'year-stats',
        },
        xaxis: {
            categories: [],
        },
        title: {
            text: 'Yearly Transaction Totals',
            align: 'center',
        },
    })

    const fetchYearStats = async () => {
        console.log(year.value);
        const yearOnly = year.value.split('-')[0];
        try {
            const { data } = await axios.get(`http://localhost:5000/api/trans/stats/year?year=${yearOnly}`)
            chartOptions.value.xaxis.categories = data.map(d => `Year ${yearOnly}`)
            series.value = [{ name: 'Total', data: data.map(d => d.total) }]
        } catch (err) {
            console.error(err)
        }
    }

    const month = ref(1)
    const yearofmonth = ref(new Date().getFullYear())
    const monthSeries = ref([])
    const monthOptions = ref({
        chart: { id: 'month-chart' },
        xaxis: { categories: [] },
        title: { text: 'Monthly Totals', align: 'center' }
    })

   const fetchMonthStats = async () => {
        try {
            const { data } = await axios.get(`http://localhost:5000/api/trans/stats/month?month=${month.value}&year=${yearofmonth.value}`)
            monthOptions.value.xaxis.categories = [`${month.value}/${yearOnly.value}`];
            monthSeries.value = [
                {
                    name: `Month ${month.value}`,
                    data: [data.total] 
                }
            ]
        } catch (error) {
            console.error('Error fetching month stats:', error)
        }
    }

    
</script>

<template>
    <title>User | Transaction Management</title>
    <Header></Header>
    <div class="p-4 fw-special ">
        <p class="font-bold mb-2" style="font-size: 30px">Transaction</p>
        <hr class="mb-2">
        <button class="bg-blue-500 p-2 text-white hover:bg-blue-600 hover: cursor-pointer rounded-md mb-2" @click="openModal">
            <i class="fa fa-plus mr-2" aria-hidden="true"></i>
            Add new transaction
        </button>
        <div class="w-full flex justify-evenly gap-5 mb-4">
            <div class="w-full bg-gray-200 p-2">
                <p class="font-bold">Monthly Transaction</p>
                <div class="flex items-center gap-2 rounded-md ">
                    <p>Filter:</p>
                    <label class="font-medium">Month:</label>
                    <input v-model.number="month" type="number" min="1" max="12" placeholder="Enter month" class="border px-2 py-1" />
                    <label class="font-medium">Year:</label>
                    <input v-model.number="yearofmonth" type="number" placeholder="2025" class="border px-3 py-1 rounded w-24" />

                    <button @click="fetchMonthStats" class="bg-blue-400 px-2 py-1 rounded-md hover:bg-blue-700 hover:cursor-pointer hover:text-white">
                        <i class="fa fa-search" aria-hidden="true"></i>
                        Search
                    </button>
                    
                </div>
                 <apexchart v-if="monthSeries.length" type="bar" height="300" :options="monthOptions" :series="monthSeries" />
                
                
            </div>
            <div class="w-full bg-gray-200 p-2">
                <p class="font-bold">Yearly Transaction</p>
                <div class="flex items-center gap-2 rounded-md ">
                    <p>Filter:</p>
                    <input type="date" v-model="year" id="year" class="bg-white border-2 ">

                    <button @click="fetchYearStats" class="bg-blue-400 px-2 py-1 rounded-md hover:bg-blue-700 hover:cursor-pointer hover:text-white">
                        <i class="fa fa-search" aria-hidden="true"></i>
                        Search
                    </button>
                </div>
                <apexchart v-if="series.length" type="bar" height="350" :options="chartOptions" :series="series" />
            </div>
        </div>
        <div class="w-full bg-yellow-300 p-2">
            <p>Recent Transaction in 5 days</p>
            <table class="w-full bg-white border border-gray-200 rounded shadow">
                <thead class="bg-gray-100 text-gray-700">
                    <tr>
                        <th class="px-4 py-2 border-b">#</th>
                        <th class="px-4 py-2 border-b">Bank</th>
                        <th class="px-4 py-2 border-b">Account Number</th>
                        <th class="px-4 py-2 border-b">Amount</th>
                        <th class="px-4 py-2 border-b">Transfer at</th>
                        <th class="px-4 py-2 border-b">Usage</th>
                        <th class="px-4 py-2 border-b">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(trans, index) in transactions || []"
                        :key="trans.Trans_ID"
                        class="hover:bg-gray-50"
                    >
                        <td class="px-4 py-2 border-b text-center">{{ index + 1 }}</td>
                        <td class="px-4 py-2 border-b text-center">{{ trans.Bank }}</td>
                        <td class="px-4 py-2 border-b text-center">{{ trans.AccountNumber }}</td>
                        <td class="px-4 py-2 border-b text-center">{{ trans.Amount }}</td>
                        <td class="px-4 py-2 border-b text-center">{{ trans.Usage }}</td>
                        <td class="px-4 py-2 border-b text-center">{{ trans.TransferAt }}</td>
                        <td class="px-4 py-2 border-b text-center flex justify-center gap-3">
                        <button
                            class="bg-blue-500 text-white hover:bg-blue-700 px-2 py-1 rounded-md" @click="openEditModal(trans.Trans_ID)"
                        >
                            <i class="fa fa-edit" aria-hidden="true"></i>
                        </button>
                        <button
                            @click="deleteTrans(trans.Trans_ID)"
                            class="bg-red-500 text-white hover:bg-red-700 px-2 py-1 rounded-md"
                            >
                            <i class="fa fa-trash" aria-hidden="true"></i>
                        </button>
                            
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>


        <!-- Modal -->
        <div
            v-if="isModalOpen"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black" 
            style="background-color: rgba(0, 0, 0, 0.5);"
        >
            <div class="bg-white w-full max-w-3xl p-6 rounded-lg shadow-lg relative">
                <div class="flex justify-between">
                    <h2 class="text-xl font-semibold mb-2">New Transaction</h2>
                    <button @click="closeModal" class="absolute top-2 right-2 p-3 text-gray-500 hover:text-black" >
                        <i class="fa fa-times fa-lg" aria-hidden="true"></i>
                    </button>
                </div>
                <hr class="mb-2">        
                <div class="w-full">
                    <div class="flex items-center mb-2">
                        <div class="w-full">
                            <p>Bank Account:</p>
                        </div>
                        <select id="bank" v-model="selectedBank" class="w-full border-2 rounded-md p-1" >
                            <option disabled value="">-- Please select a bank --</option>
                            <option v-for="bank in userbank" :key="bank.Bank_ID" :value="bank.Bank_ID" >
                                {{ bank.Bank.Name + '-' + bank.AccNum }}
                            </option>
                        </select>
                    </div>
                    <div class="flex items-center mb-2">
                        <div class="w-full">
                            <p>Amount:</p>
                        </div>
                        <input type="number" v-model="amount" name="amount" id="amount" step="0.1" class="w-full border-2 rounded-md p-1">
                    </div>
                    <div class="flex items-center mb-2">
                        <div class="w-full">
                            <p>Transaction Date:</p>
                        </div>
                        <input type="datetime-local" v-model="date" name="bank" class="w-full border-2 rounded-md p-1" step="1"></input>
                    </div>
                    <div class="flex items-center mb-2">
                        <div class="w-full">
                            <p>Usage:</p>
                        </div>
                        <input type="text" name="bank" v-model="usage" class="w-full border-2 rounded-md p-1"></input>
                    </div>
                </div>
                <hr class="mb-2">
                <div class="flex justify-end">
                    <button class="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 hover:cursor-pointer" @click="saveTransaction">
                        <i class="fa fa-save ml-1 mr-1.5" aria-hidden="true"></i>
                        Save
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Edit Modal -->
    <div  v-if="isEditModalOpen" class="fixed inset-0 z-50 flex fw-special items-center justify-center bg-black" style="background-color: rgba(0, 0, 0, 0.5)" >
      <div class="bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg relative">
        <div class="flex justify-between">
          <h2 class="text-xl font-semibold mb-2">Update Transactions</h2>
          <button @click="closeEditModal"
            class="absolute top-2 right-2 p-3 text-gray-500 hover:text-black"
          >
            <i class="fa fa-times fa-lg" aria-hidden="true"></i>
          </button>
        </div>
        <hr class="mb-2" />
        <div class="w-full">
            <div class="flex items-center mb-2">
                <div class="w-full">
                    <p>Bank Account:</p>
                </div>
                <select id="bank" v-model="selectedBank" class="w-full border-2 rounded-md p-1" >
                    <option disabled value="">-- Please select a bank --</option>
                    <option v-for="bank in userbank" :key="bank.Bank_ID" :value="bank.Bank_ID" >
                        {{ bank.Bank.Name + '-' + bank.AccNum }}
                    </option>
                </select>
                <input
                    type="hidden"
                    v-model="hiddenexistingBankId"
                    class="w-full rounded-md p-1"
                />
            </div>
            <div class="flex items-center mb-2">
                <div class="w-full">
                    <p>Amount:</p>
                </div>
                <input type="number" v-model="amount" name="amount" id="amount" step="0.1" class="w-full border-2 rounded-md p-1">
            </div>
            <div class="flex items-center mb-2">
                <div class="w-full">
                    <p>Transaction Date:</p>
                </div>
                <input type="datetime-local" v-model="date" name="bank" class="w-full border-2 rounded-md p-1" step="1"></input>
            </div>
            <div class="flex items-center mb-2">
                <div class="w-full">
                    <p>Usage:</p>
                </div>
                <input type="text" name="bank" v-model="usage" class="w-full border-2 rounded-md p-1"></input>
            </div>
        </div>
        <hr class="mb-3" />
        <div class="w-full flex justify-end">
          <button
            class="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
           @click="updateUserTrans"
          >
            <i class="fa fa-save ml-1 mr-1.5" aria-hidden="true"></i>
            Save
          </button>
        </div>
      </div>
    </div>
</template>