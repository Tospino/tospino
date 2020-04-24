import Vue from 'vue'
import Router from 'vue-router'
 
//引导屏
import guidePage from '@/components/guidePage/index.vue'
//登录页
import login from '@/components/login/index.vue'

//忘记密码
import forgetPassword from '@/components/login/forgetPassword/index.vue'
import otp from '@/components/login/forgetPassword/otp.vue'
import forgeSuccess from '@/components/login/forgetPassword/forgeSuccess.vue'
import revisePassword from '@/components/login/forgetPassword/revisePassword.vue'
//注册
import register from '@/components/login/register/index.vue'
import parenPay from '@/components/login/register/parenPay'
import payPassword from '@/components/login/register/payPassword.vue'
import payPasswordTwo from '@/components/login/register/payPasswordTwo.vue'

//分类
import classify from '@/components/tabbar/classify/index.vue'
//购物车
import shoppingCart from '@/components/tabbar/shoppingCart/index.vue'
//我的
import account from '@/components/tabbar/account/index.vue'
//首页母页
import person from '@/components/tabbar/person.vue'

//首页
import home from '@/components/tabbar/home/index.vue'
import commodityDetails from '@/components/tabbar/home/commodityDetails.vue'
import evaluaDetails from '@/components/tabbar/home/evaluaDetails.vue'
import homeItem from '@/components/tabbar/home/homeItem/index.vue'
import flashSale from '@/components/tabbar/home/homeItem/flashSale.vue'
//我的足迹
import footprint from '@/components/tabbar/account/footprint/index.vue'

//确认订单
import confirmOrder from '@/components/confirmOrder/index.vue'
import orderContent from '@/components/confirmOrder/orderContent.vue'
import confirmSuccess from '@/components/confirmOrder/confirmSuccess.vue'
import addBankcar from '@/components/confirmOrder/addBankcar.vue'
import resetPassword from '@/components/confirmOrder/resetPassword.vue'
import passwordSuccess from '@/components/confirmOrder/passwordSuccess.vue'
import parrwordOtp from '@/components/confirmOrder/parrwordOtp.vue'
import orderAddress from '@/components/confirmOrder/orderAddress.vue'


//搜索界面
import search from '@/components/search/index.vue'
import searchRecord from '@/components/search/searchRecord.vue'
import noSearch from '@/components/search/noSearch.vue'
import searchGoodsOne from '@/components/search/searchGoodsOne.vue'
import favoriteRecord from '@/components/tabbar/account/favorites/favoriteRecord'
import searchMyOrder from '@/components/tabbar/account/myOrder/searchMyOrder'
import myOrderGood from '@/components/tabbar/account/myOrder/myOrderGood'



//收藏夹
import favorites from '@/components/tabbar/account/favorites/index.vue'
import resembleGood from '@/components/tabbar/account/favorites/resembleGood'
import searGoodList from '@/components/tabbar/account/favorites/itemComponents/searGoodList'



//我的订单
import myOrderParent from '@/components/tabbar/account/myOrder/myOrderParent'
import myOrder from '@/components/tabbar/account/myOrder/index'
import editAddress from '@/components/tabbar/account/myOrder/editAddress'
import orderDetail from '@/components/tabbar/account/myOrder/orderDetail'
import addressList from '@/components/tabbar/account/myOrder/addressList'
import refund from '@/components/tabbar/account/myOrder/refund'
import returnRefund from '@/components/tabbar/account/myOrder/returnRefund'
import batchRefund from '@/components/tabbar/account/myOrder/batchRefund'
import logistrefund from '@/components/tabbar/account/myOrder/logistrefund'
import logistics from '@/components/tabbar/account/myOrder/logistics'

//售后
import afterSales from '@/components/tabbar/account/afterSales/index'
import afterSalesContent from '@/components/tabbar/account/afterSales/afterSalesContent'
import afterSalesDetail from '@/components/tabbar/account/afterSales/afterSalesDetail'
import afterSalesSteps from '@/components/tabbar/account/afterSales/afterSalesSteps'

//评价
import evaluate from '@/components/tabbar/account/evaluate/index'
import noShopping from '@/components/tabbar/account/evaluate/noShopping'
import evaluateList from '@/components/tabbar/account/evaluate/evaluateList'
import expressedEvaluate from '@/components/tabbar/account/evaluate/expressedEvaluate'
import appendEvaluate from '@/components/tabbar/account/evaluate/appendEvaluate'
import evaluateSuccess from '@/components/tabbar/account/evaluate/evaluateSuccess'
import evaluateDetail from '@/components/tabbar/account/evaluate/evaluateDetail'


//账户设置
import accountSettings from '@/components/tabbar/account/accountSettings/index'
import settingsItem from '@/components/tabbar/account/accountSettings/settingsItem'
import accountAddress from '@/components/tabbar/account/accountSettings/accountAddress'
import addAddress from '@/components/tabbar/account/accountSettings/addAddress'
import accountSecurity from '@/components/tabbar/account/accountSettings/accountSecurity'
import editName from '@/components/tabbar/account/accountSettings/editName'
import editPhone from '@/components/tabbar/account/accountSettings/editPhone'
import acceptOtp from '@/components/tabbar/account/accountSettings/acceptOtp'
import editEmail from '@/components/tabbar/account/accountSettings/editEmail'
import editLogpawo from '@/components/tabbar/account/accountSettings/editLogpawo'
import editPaypawo from '@/components/tabbar/account/accountSettings/editPaypawo'
import companyInformation from '@/components/tabbar/account/accountSettings/companyInformation'
import choiceList from '@/multiplexing/choiceList'
import aboutTospino from '@/components/tabbar/account/accountSettings/aboutTospino'
import helpCenter from '@/components/tabbar/account/accountSettings/aboutItem/helpCenter'
import introduce from '@/components/tabbar/account/accountSettings/aboutItem/introduce'
import privacyPolicy from '@/components/tabbar/account/accountSettings/aboutItem/privacyPolicy'
import userAgreement from '@/components/tabbar/account/accountSettings/aboutItem/userAgreement'
// 账户余额
import accountBalance from '@/components/tabbar/account/accountBalance/index'
import commentDetail from '@/components/tabbar/account/accountBalance/commentDetail'
import comment from '@/components/tabbar/account/accountBalance/comment'
import accountDetails from '@/components/tabbar/account/accountBalance/accountDetails'

//语言
import language from '@/components/tabbar/account/language/index'
import languSubPage from '@/components/tabbar/account/language/subPage'

//消息
import information from '@/components/tabbar/account/information/index'
import inforDetails from '@/components/tabbar/account/information/details'

//扫码
import sweepCode from '@/multiplexing/sweepCode'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '引导页',
      component: guidePage
    },
    {
      path: '/login',
      name: '登录',
      component: login,
    },
    {
      path: '/otp',
      name: '验证码',
      component: otp
    },
    {
      path: '/forgetPassword',
      name: '忘记密码',
      component: forgetPassword,
    },
    {
      path: '/forgeSuccess',
      name: '修改密码成功',
      component: forgeSuccess
    },
    {
      path: '/revisePassword',
      name: '修改密码',
      component: revisePassword
    },
    {
      path: '/register',
      name: '注册',
      component: register
    },

    {
      path: '/parenPay',
      name: '设置支付密码母页',
      component: parenPay,
      children:[
        {
          path: 'payPassword',
          name: '设置支付密码',
          component: payPassword
        },
        {
          path: 'payPasswordTwo',
          name: '确定支付密码',
          component: payPasswordTwo
        },
      ]
    },
    


    {
      path: '/commodityDetails',
      name: '商品详情',
      component: commodityDetails
    },
    {
      path: '/commodityDetails/evaluaDetails',
      name: '商品详情评价',
      component: evaluaDetails
    },


    {
      path: '/footprint',
      name: '我的足迹',
      component: footprint
    },


    // myOrderParent
    {
      path: '/myOrder',
      name: '我的订单母页',
      component: myOrderParent,
      children:[
        {
          path: 'myOrderList',
          name: '我的订单',
          component: myOrder,
        },
        {
          path: 'editAddress',
          name: '我的订单修改地址',   
          component: editAddress,
        },
        {
          path: 'editAddress/addressList',
          name: '地址列表',   
          component: addressList,
        },
        {
          path: 'orderDetail',
          name: '订单详情',   //我的订单,订单详情
          component: orderDetail,
        },
        {
          path: 'orderDetail/returnRefund',
          name: '退货退款页面',   
          component: returnRefund,
        },
        {
          path: 'orderDetail/refund',
          name: '退款页面',   
          component: refund,
        },
        {
          path: 'orderDetail/batchRefund',
          name: '批量退货退款',   
          component: batchRefund,
        },
        {
          path: 'orderDetail/logistrefund',
          name: '包裹仅退款',   
          component: logistrefund,
        },
        {
          path: 'orderDetail/logistics',
          name: '物流信息',   
          component: logistics,
        },
      ]
    },
    
    {
      path: '/evaluate',
      name: '评价',
      component: evaluate,
      children:[
        {
          path: 'noShopping',
          name: '评价没有购物',
          component: noShopping,
        },
        {
          path: 'evaluateList',
          name: '评价列表',
          component: evaluateList,
        },
        {
          path: 'evaluateSuccess',
          name: '评价成功',
          component: evaluateSuccess,
        },
        {
          path: 'evaluateDetail',
          name: '评价详情',
          component: evaluateDetail,
        },
      ]
    },
    {
      path: '/evaluate/evaluateList/expressedEvaluate',
      name: '发表评价',
      component: expressedEvaluate,
    },
    {
      path: '/evaluate/evaluateList/appendEvaluate',
      name: '追加评价',
      component: appendEvaluate,
    },


    {
      path: '/accountSettings',
      name: '账户设置',
      component: accountSettings,
    },
    {
      path: '/accountSettings/settingsItem',
      name: '账户设置子页面',
      component: settingsItem,
      children:[
        {
          path: 'accountAddress',
          name: '收货地址',
          component: accountAddress,
        },
        {
          path: 'accountAddress/addAddress',
          name: '新增地址',
          component: addAddress,
        },
        {
          path: 'accountAddress/addAddress/choiceList',
          name: '选择列表',
          component: choiceList,
        },
        {
          path: 'accountSecurity',
          name: '账户安全',
          component: accountSecurity,
        },
        {
          path: 'accountSecurity/editName',
          name: '修改昵称',
          component: editName,
        },
        {
          path: 'accountSecurity/editPhone',
          name: '修改手机号码',
          component: editPhone,
        },
        {
          path: 'accountSecurity/editPhone/acceptOtp',
          name: '接受验证码',
          component: acceptOtp,
        },
        {
          path: 'accountSecurity/editEmail',
          name: '修改邮箱',
          component: editEmail,
        },
        {
          path: 'accountSecurity/editLogpawo',
          name: '修改登录密码',
          component: editLogpawo,
        },
        {
          path: 'accountSecurity/editPaypawo',
          name: '修改支付密码',
          component: editPaypawo,
        },
        {
          path: 'accountSecurity/companyInformation',
          name: '公司信息',
          component: companyInformation,
        },
        {
          path: 'aboutTospino',
          name: '关于TOSPINO',
          component: aboutTospino,
          children:[
            {
              path: 'helpCenter',
              name: '帮助中心',
              component: helpCenter,
            },
            {
              path: 'introduce',
              name: '平台介绍',
              component: introduce,
            },
            {
              path: 'privacyPolicy',
              name: '隐私政策',
              component: privacyPolicy,
            },
            {
              path: 'userAgreement',
              name: '用户协议',
              component: userAgreement,
            },
          ]
        },
      ]
    },
    
    


    {
      path: '/accountBalance',
      name: '账户余额',
      component: accountBalance,
    },
    {
      path: '/accountBalance/commentDetail',
      name: '评论详情',
      component: commentDetail,
    },
    {
      path: '/accountBalance/commentDetail/comment',
      name: '我的评论',
      component: comment,
    },
    {
      path: '/accountBalance/accountDetails',
      name: '账户明细',
      component: accountDetails,
    },

    

    {
      path: '/afterSales',
      name: '售后',
      component: afterSales,
      children:[
        {
          path: 'afterSalesContent',
          name: '售后内容',
          component: afterSalesContent,
        },
        {
          path: 'afterSalesContent/afterSalesDetail',
          name: '售后详情',
          component: afterSalesDetail,
        },
        {
          path: 'afterSalesContent/afterSalesDetail/afterSalesSteps',
          name: '售后流程',
          component: afterSalesSteps,
        }
      ]
    },
    
    {
      path: '/resembleGood',
      name: '找相似商品',
      component: resembleGood
    },

    {
      path: '/search',
      name: '搜索',
      component: search,
      children:[
        {
          path: 'searchRecord',
          name: '历史记录',
          component: searchRecord
        },
        {
          path: 'noSearch',
          name: '无搜索商品',
          component: noSearch
        },
        {
          path: 'favorites/goodsList',
          name: '收藏夹搜索商品',
          component: searGoodList
        },
        {
          path: 'searchGoodsOne',
          name: '搜索商品1',
          component: searchGoodsOne,
          meta:{
            keepAlive:true,
            isBack :true
          }
        },
        {
          path: 'favorites/favoriteRecord',
          name: '收藏夹历史记录',
          component: favoriteRecord
        },
        {
          path: 'myOrder/searchMyOrder',
          name: '我的订单历史记录',
          component: searchMyOrder
        },
        {
          path: 'myOrder/myOrderGood',
          name: '我的订单搜索商品',
          component: myOrderGood
        },
      ]
    },
    {
      path: '/confirmOrder',
      name: '确认订单',
      component: confirmOrder,
      children:[
        {
          path: 'orderContent',
          name: '确认订单详情',
          component: orderContent
        },
        {
          path: 'confirmSuccess',
          name: '确认订单提交成功',
          component: confirmSuccess
        },
        {
          path: 'addBankcar',
          name: '添加银行卡',
          component: addBankcar
        },
        {
          path: 'resetPassword',
          name: '重置支付密码',
          component: resetPassword
        },
        {
          path: 'passwordSuccess',
          name: '支付密码设置成功',
          component: passwordSuccess
        },
        {
          path: 'parrwordOtp',
          name: '支付密码输入验证码',
          component: parrwordOtp
        },
        {
          path: 'orderAddress',
          name: '确认订单收货地址',
          component: orderAddress,
        },
      ]
    },
    
    {
      path: '/control/home/homeItem',
      name: '主页子页面',
      component: homeItem,
      children:[
        {
          path: 'flashSale',
          name: '限时抢购',
          component: flashSale,
        },
      ]
    },

    {
      path: '/control',
      name: '控制',
      component: person,
      children:[
        {
          path: 'home',
          name: '首页',
          component: home,
          meta:{
            keepAlive:true
          }
        },
        {
          path:'classify',
          name: '分类',
          component: classify,
          meta:{
            keepAlive:true
          }
        },
        {
          path:'shoppingCart',
          name: '购物车',
          component: shoppingCart
        },
        {
          path:'account',
          name: '我的',
          component: account
        }
      ]
    },
    {
      path: '/favorites',
      name: '收藏夹',
      component: favorites
    },

    {
      path: '/language',
      name: '语言',
      component: language
    },
    {
      path: '/language/languSubPage',
      name: '语言选择页',
      component: languSubPage
    },
    

    {
      path: '/information',
      name: '消息',
      component: information
    },
    {
      path: '/information/inforDetails',
      name: '消息详情',
      component: inforDetails
    },

    {
      path: '/sweepCode',
      name: '扫码',
      component: sweepCode
    },

  ],
  
})
// 解决重复点击导航路由报错
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
}