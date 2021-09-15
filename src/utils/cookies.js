import Cookies from 'js-cookie'
import Config from '@/setting.js'

export const setToken = (value) => Cookies.set(Config.tokenKey, value)
export const getToken = () => Cookies.get(Config.tokenKey)
export const removeToken = () => Cookies.remove(Config.tokenKey)
