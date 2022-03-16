import axios from "axios"
import { MAIN_URL } from "./Url"

export function addnewCategory(data) {
    return axios.post(`${MAIN_URL}products/addCategory`, data)
}
export function getAllCategories() {
    return axios.get(`${MAIN_URL}products/getAllCategories`)
}
export function subCategory(data) {
    return axios.post(`${MAIN_URL}products/subCategory`, data)
}

export function deteleSubCat(data) {
    return axios.post(`${MAIN_URL}products/deleteSubCategory`, data)
}