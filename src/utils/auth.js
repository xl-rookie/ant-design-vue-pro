// 获取当前用户的权限
export function getCurrentAuthority () {
  return ['damin'] // 假数据
}

// 用于校验权限 ，参数：标准权限
export function check (authority) {
  // 获得当前的权限
  const current = getCurrentAuthority()
  // 和参数权限比较
  return current.some(item => authority.includes(item))
}

// 登录权限
export function isLogin () {
  // 获得当前权限
  const current = getCurrentAuthority()
  // 若返回权限不等于guest，代表已登录
  return current && current[0] !== 'guest'
}
