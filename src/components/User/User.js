import User from './Dashboard.vue'
import BankManage from './Bank/Bank Management.vue'
import TransManage from './Transaction/Transaction.vue'
import Profile from './Profile.vue'

const userRoutes = [
    {
        path: '/User',
        name: 'User',
        component: User,
    },
    {
        path: '/User/Bank/Manage',
        name: 'Bank Management',
        component: BankManage
    },
    {
        path: '/User/Transaction/Manage',
        name: 'Transaction Management',
        component: TransManage
    },
    {
        path: '/User/Profile',
        name: 'Profile',
        component: Profile
    }

]

export default userRoutes;