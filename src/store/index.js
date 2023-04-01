import vuex from 'vuex'
// 引入子模块
import app from './modules/app'
import tab from './modules/tab'

const store = new vuex.Store({
  modules: {
    app,
    tab
  }
})

export default store
