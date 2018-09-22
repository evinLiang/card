import Vue from 'vue'
import Router from 'vue-router'
import apply from '@/components/apply/apply'
import record from '@/components/record/record'
import suspend from '@/components/suspend/suspend'
import success from '@/components/success/success'
import binding from '@/components/binding/binding'
import submit from '@/components/submit/submit'
import cards from '@/components/cards/cards'
import realName from '@/components/realName/realName'
import plan from '@/components/plan/plan'
import reservationPlan from '@/components/reservationPlan/reservationPlan'

Vue.use(Router)

export default new Router({
  routes: [
    {
      //默认第一个是active
      path: '/',
      redirect: '/apply'
    },
    {
      path: '/apply',
      name: 'apply',
      component: apply,
      meta: {
      	title: '信用卡代偿'
      }
    },
    {
      path: '/record',
      name: 'record',
      component: record,
      meta: {
      	title: '申请记录'
      }
    },
    {
      path: '/suspend',
      name: 'suspend',
      component: suspend,
      meta: {
      	title: '申请中止代偿'
      }
    },
    {
      path: '/success',
      name: 'success',
      component: success,
      meta: {
      	title: '申请成功'
      }
    },
    {
      path: '/binding',
      name: 'binding',
      component: binding,
      meta: {
      	title: '绑定信用卡'
      }
    },
    {
      path: '/submit',
      name: 'submit',
      component: submit,
      meta: {
      	title: '提交申请'
      }
    },
    {
      path: '/cards',
      name: 'cards',
      component: cards,
      meta: {
        title: '信用卡列表'
      }
    },
    {
      path: '/realName',
      name: 'realName',
      component: realName,
      meta: {
        title: '实名认证'
      }
    },
    {
      path: '/plan',
      name: 'plan',
      component: plan,
      meta: {
        title: '代偿计划'
      }
    },
    {
      path: '/reservationPlan',
      name: 'reservationPlan',
      component: reservationPlan,
      meta: {
        title: '查看预约计划'
      }
    }
  ]
})
