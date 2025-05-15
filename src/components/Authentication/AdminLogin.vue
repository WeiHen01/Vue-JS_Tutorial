<script lang="ts" setup>
    import bgImage from '../../assets/Authentication.jpg'
    const backgroundStyle = {
        backgroundImage: `linear-gradient(to bottom, #0950C280, #C9438A80), url(${bgImage})`,
    }
    import { useRouter } from 'vue-router'
    const router = useRouter()
</script>
<template>
    <div className='fw-special'>
        <title>Login</title>
        <div :style="backgroundStyle" className="min-h-screen flex items-center justify-center bg-cover bg-no-repeat">
            <div className="bg-white/30 backdrop-blur-xl p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
                    Login   
                </h2>

                <div className="text-right text-black flex items-center mb-3 justify-end gap-2">
                    You are in: 
                    <p className="border-2 border-black text-black px-2 font-semibold">
                        Administrator
                    </p>
                </div>

                <form className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-black" > Username </label>
                    <input type="type" v-model="username" id="uname" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 placeholder-black" placeholder="Enter your username" required />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-black" > Password </label>
                    <input type="password" v-model="password" id="password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 placeholder-black" placeholder="Enter your password" required />
                </div>

                <div className="flex items-center justify-end">
                    <div className="text-sm text-right">
                    <a href="../Authentication/ForgetPassword" className="font-medium text-indigo-600 hover:text-indigo-500" > Forgot password? </a>
                    </div>
                </div>

                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-2" @click="router.push('/Admin')"> Sign in </button>
                <button type="button" className="w-full flex justify-center py-2 px-4 border border-indigo-600 rounded-md shadow-sm text-sm font-medium text-white bg-transparent hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"> Back </button>
                </form>

                <p className="mt-2 text-center text-sm text-black">
                Wanna login as Normal User?
                    <a href="/Authentication/Login" className="font-medium text-indigo-600 hover:text-indigo-500" > Click here </a>
                </p>
            </div>
        </div>
    </div>
</template>