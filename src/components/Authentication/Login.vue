<script lang="js" setup>
    import bgImage from '../../assets/Authentication.jpg'
    const backgroundStyle = {
        backgroundImage: `linear-gradient(to bottom, #0950C280, #C9438A80), url(${bgImage})`,
    }
    import { useRouter } from 'vue-router'
    import { ref } from 'vue'
    import axios from 'axios'
    const router = useRouter()
    
    const username = ref('')
    const password = ref('')
    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/users/login', {
                Username: username.value,
                Password: password.value
            })
            
            sessionStorage.setItem('User_ID', response.data.User_ID);
            alert('Login successfully');
            // Handle successful login, e.g., save token, navigate to dashboard
            console.log(response.data);
            console.log(response.data.User_ID);
            router.push('/User')
        } catch (error) {
            // Handle login error
            console.error('Login failed:', error.response?.data || error.message)
            alert('Login failed. Please check your credentials.')
        }
    }
</script>
<template>
    <div>
        <title>Login</title>
        <div class='fw-special'>
            <title>Login</title>
            <div :style="backgroundStyle" class="min-h-screen flex items-center justify-center bg-cover bg-no-repeat">
                <div class="bg-white/30 backdrop-blur-xl p-8 rounded-lg shadow-md w-full max-w-md">
                    <h2 class="text-3xl font-bold mb-6 text-center text-gray-800">
                        Login   
                    </h2>

                    <form class="space-y-6" @submit.prevent="handleLogin">
                        <div>
                            <label htmlFor="username" class="block text-sm font-medium text-black" > Username </label>
                            <input type="text" v-model="username" id="username" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 placeholder-black" placeholder="Enter your username" required />
                        </div>

                        <div>
                            <label htmlFor="password" class="block text-sm font-medium text-black" > Password </label>
                            <input type="password" v-model="password" id="password" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 placeholder-black" placeholder="Enter your password" required />
                        </div>

                        <div class="flex items-center justify-end">
                            <div class="text-sm text-right">
                            <a href="../Authentication/ForgetPassword" class="font-medium text-indigo-600 hover:text-indigo-500" > Forgot password? </a>
                            </div>
                        </div>

                        <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-2"> Sign in </button>
                        <button type="button" class="w-full flex justify-center py-2 px-4 border border-indigo-600 rounded-md shadow-sm text-sm font-medium text-white bg-transparent hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" @click="router.push('/')"> Back </button>
                    </form>

                    <p class="mt-2 text-center text-sm text-black">
                    Don&apos;t have an account?
                        <a href="/signup" class="font-medium text-indigo-600 hover:text-indigo-500" > Sign up </a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

