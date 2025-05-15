<script setup>
    import { useRouter } from 'vue-router'
    const router = useRouter()
    import UserHeader from './Header.vue'
</script>

<template>
    <div>
        <UserHeader></UserHeader>
        <title>User | Dashboard</title>
        <div class="bg-white p-4 text-black fw-special">
            <p class="font-bold mb-2" style="font-size: 30px">Dashboard</p>
            <p>Recent Transaction</p>
        </div>
    </div>
</template>