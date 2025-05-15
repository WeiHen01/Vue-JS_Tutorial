<script lang="js" setup>
    import { useRouter } from 'vue-router'
    const router = useRouter()
</script>

<template>
    <section class="bg-white">
        <header class = "container mx-auto px-5 py-1 items-center flex justify-between" style="font-family: Poppins">
            <div>
            </div>
            <div class = "flex gap-x-9 items-center">
                <ul class = "flex gap-x-5 font-semibold ">
                    <li>
                        <a href="/" class="text-black hover:text-orange-500 duration-300">Home</a>
                    </li>
                </ul>
                <!-- <button @click="router.push('/Authentication/Login')" class="relative inline-block p-[2px] rounded-full bg-gradient hover:text-white duration-300 hover:cursor-pointer">
                    <span class="block px-6 py-2 rounded-full bg-white text-black font-bold hover:bg-transparent duration-300 hover:text-white">
                        Login
                    </span>
                </button> -->
                <button @click="router.push('/Authentication/Login')" class="relative inline-block p-[2px] rounded-full bg-gradient hover:text-white duration-300 hover:cursor-pointer">
                    <span class="block px-6 py-2 rounded-full bg-white text-black font-bold hover:bg-transparent duration-300 hover:text-white">
                        Login
                    </span>
                </button>
                
            </div>

        </header>
    </section>
</template>