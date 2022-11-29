import request from '../index'
import type { Tpet } from '@/store/type'

interface IgetAllPets {
  status: 'success' | 'fail' | 'error'
  data?: Tpet[]
  results?: number
  message?: string
}

enum petsAPI {
  getAllPets = '/api/v1/pets'
}

export function getAllPets(query?: string): Promise<IgetAllPets> {
  const url = query ? petsAPI.getAllPets + query : petsAPI.getAllPets
  return request.get<IgetAllPets>({
    url
  })
}
