import axios from "axios";

class ApiService {
  get = async(baseUrl: string, endpoint: string, header: object) => await axios.get(`${baseUrl}/${endpoint}`, header)
  getById = async(baseUrl: string, endpoint: string, header: object, id: string) => await axios.get(`${baseUrl}/${endpoint}/${id}`, header)
  post = async(baseUrl: string, endpoint: string, header: object, data: object) => await axios.post(`${baseUrl}/${endpoint}`, data, header)
  put = async(baseUrl: string, endpoint: string, header: object, data: object, id: string) => await axios.put(`${baseUrl}/${endpoint}/${id}`, data, header)
  delete = async(baseUrl: string, endpoint: string, header: object, id: number) => await axios.delete(`${baseUrl}/${endpoint}/${id}`, header)
}

export {ApiService}