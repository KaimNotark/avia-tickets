// нужно протестировтаь как сам класс , так и его инстанс
// для этого нужно добавить export к классу Locations

import locationsInstance, { Locations } from '../location'
import { formatDate } from '../../helpers/date'
import api, { Api } from '../../services/apiService'
import { TestScheduler } from 'jest'

const countries = [{ code: 'UKR', name: 'Ukraine' }]

describe('Location store rests', () => {
  test('Check that locatoinInstanse is instance of Location class', () => {
    expect(locationsInstance).toBeInstanceOf(Locations)
  })
  test('Sucsess Locations instance create', () => {
    const instance = new Locations(api, { formatDate })
    expect(instance.countries).toBe(null)
    expect(instance.shortCities).toEqual({})
    expect(instance.formatDate).toEqual(formatDate)
  })

  test('Check correct countries serialize', () => {
    const res = locationsInstance.serializeCountries(countries)
    const expectedData = {
      UKR: { code: 'UKR', name: 'Ukraine' }
    }
    expect(res).toEqual(expectedData)
  })
})