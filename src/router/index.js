import { createRouter, createWebHashHistory } from 'vue-router'
import EquipmentList from '@/components/Equipment/EquipmentList.vue'
import SignInComp from '@/components/User/SignInComp.vue'
import SignUpComp from '@/components/User/SignUpComp.vue'
import AddEquipmentComp from '@/components/Equipment/AddEquipment.vue'
import EquipmentViewComp from '@/components/Equipment/EquipmentView.vue'
import EquipmentListByBinder from '@/components/Equipment/EquipmentListByBinder.vue'
import BinderListComp from '@/components/Binder/BinderListComp.vue'
import AudienceCreateComp from '@/components/Binder/CreateAudienceComp.vue'
const routes = [
  
  {
    path: '/equipmentlist',
    name: 'equipmentList',
    component: EquipmentList
  },
  {
    path: '/login',
    name: 'login',
    component: SignInComp
  },
  {
    path: '/registration',
    name: 'registration',
    component: SignUpComp
  },
  {
    path: '/createEquipment/:id',
    name: 'createEquipment',
    component: AddEquipmentComp,
  },
  {
    path: '/equipmentView/:id',
    name: 'EquipmentView',
    component: EquipmentViewComp
  },
  {
    path: '/binderList',
    name: 'BinderList',
    component: BinderListComp
  },
  {
    path: '/equipmentBinder/:id',
    name: 'EquipmentListByBinder',
    component: EquipmentListByBinder
  },
  {
    path: '/createAudience',
    name: 'createAudience',
    component: AudienceCreateComp
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
