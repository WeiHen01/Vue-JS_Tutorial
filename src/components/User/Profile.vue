<script setup lang="ts">
    import { useRouter } from 'vue-router'
    const router = useRouter()
    import UserHeader from './Header.vue'
    import { ref, onMounted } from 'vue'
    import axios from 'axios'

    const userID = sessionStorage.getItem('User_ID');
    const email = ref('')
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
            email.value = res.data.Result[0].Email;
        } catch (error: any) {
            console.error('Fetch failed:', error.response?.data || error.message);
            alert('Failed to fetch user data.');
        }
    };

    onMounted(() => {
        fetchUserData()
    })
</script>

<template>
    <div>
        <UserHeader></UserHeader>
        <title>User | Profile</title>
        <div class="bg-white p-4 text-black fw-special">

            <div class="flex justify-center w-full mt-4">
                <div class="w-66 bg-blue-600 justify-center align-middle p-2 rounded-md hover:cursor-pointer hover:bg-blue-700 hover: text-white transition-transform duration-200 hover:scale-105 shadow-xl shadow-gray-600">
                    <p class="text-center font-semibold" style="font-size: 25px">Profile</p>
                    <div class="flex justify-center items-center mb-5">
                        <img
                            src="https://static.vecteezy.com/system/resources/thumbnails/027/951/137/small_2x/stylish-spectacles-guy-3d-avatar-character-illustrations-png.png"
                            alt="Bank Logo"
                            class="w-50 h-50 rounded-full object-cover shadow-md"
                        />
                    </div>
                    <p>Username: {{ username }}</p>
                    <p>Email: {{ email }}</p>
                </div>
            </div>
        </div>
    </div>
</template>