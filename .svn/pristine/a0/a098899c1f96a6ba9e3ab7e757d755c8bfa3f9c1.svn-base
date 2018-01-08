import api from 'src/api'

const state = {
  list: {},
  job: {},
  log: {},
  company: {}
}

const getters = {
  departmentList: state => state.list, // 部门
  jobList: state => state.job, // 职位
  logList: state => state.log, // 日志
  companyData: state => state.company // 公司
}
const mutations = {
  DEPARTMENT_DATA: (state, data) => {
    console.log('服务端部门列表结果', data)
    state.list = data
  },
  JOB_DATA: (state, data) => {
    state.job = data
  },
  LOG_DATA: (state, data) => {
    console.log('服务端日志列表结果', data)
    state.log = data
  },
  COMPANY_DATA: (state, data) => {
    state.company = data
  }
}

const actions = {
  isDepartment ({state, commit}, parameter = {}) {
    let url = ''
    if (parameter.pager) {
      url = '/department/pager'
    } else {
      url = '/department/list'
    }
    return api.post(url, parameter).then((res) => {
      let data = res
      data.page = {
        total: res.total,
        pageIndex: res.current,
        pageSize: parameter.pageSize || 20
      }
      commit('DEPARTMENT_DATA', data)
    }).catch((error) => {
      console.log(error)
    })
  },
  isLog ({state, commit}, parameter) {
    return api.post('/log/pager', parameter).then((res) => {
      let data = res
      data.page = {
        total: res.total,
        pageIndex: res.current,
        pageSize: parameter.pageSize || 20
      }
      commit('LOG_DATA', data)
    }).catch((error) => {
      console.log(error)
    })
  },
  isJob ({state, commit}, parameter = {}) {
    let url = ''
    if (parameter.pager) {
      url = '/position/pager'
    } else {
      url = '/position/list'
    }
    return api.post(url, parameter).then((res) => {
      let data = res
      data.page = {
        total: res.total,
        pageIndex: res.current,
        pageSize: parameter.pageSize || 20
      }
      commit('JOB_DATA', data)
    }).catch((error) => {
      console.log(error)
    })
  },
  isCompany ({state, commit}, parameter) {
    return api.post('/company/select', parameter).then((res) => {
      commit('COMPANY_DATA', res.data)
    }).catch((error) => {
      console.log(error)
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
