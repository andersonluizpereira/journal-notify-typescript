import { AddSkuRepositorySpy, LoadSkusRepositorySpy, throwError, UpdateSkuRepositorySpy } from '@/data/test'
import { DbUpdateSku } from './db-update-sku'
import { mockAddSkuParams } from '@/domain/test/mock-sku/mock-sku'

type SutTypes = {
  sut: DbUpdateSku
  updateSkuRepositorySpy: UpdateSkuRepositorySpy
  addSkuRepositorySpy: AddSkuRepositorySpy
  loadSkusRepositorySpy: LoadSkusRepositorySpy
}

const makeSut = (): SutTypes => {
  const updateSkuRepositorySpy = new UpdateSkuRepositorySpy()
  const addSkuRepositorySpy = new AddSkuRepositorySpy()
  const loadSkusRepositorySpy = new LoadSkusRepositorySpy()
  const sut = new DbUpdateSku(updateSkuRepositorySpy)
  return {
    sut,
    updateSkuRepositorySpy,
    addSkuRepositorySpy,
    loadSkusRepositorySpy
  }
}

describe('DbUpdateSku Usecase', () => {
  test('Should call UpdateSkuRepository with correct values', async () => {
    const { sut, addSkuRepositorySpy, loadSkusRepositorySpy, updateSkuRepositorySpy } = makeSut()
    const skuData = mockAddSkuParams()
    await addSkuRepositorySpy.add(skuData)
    var skusData = await loadSkusRepositorySpy.loadAll()
    skusData[0].name += 'updated'
    const skusDataName = skusData[0].name
    const sku = await sut.update(skusData[0])
    expect(sku.name).toEqual(skusDataName)
    expect(updateSkuRepositorySpy.skuModel).toEqual(sku)
  })

  test('Should throw if UpdateSkuRepository throws', async () => {
    const { sut, updateSkuRepositorySpy } = makeSut()
    jest.spyOn(updateSkuRepositorySpy, 'update').mockImplementationOnce(throwError)
    const skuData = mockAddSkuParams()
    const promise = sut.update(skuData)
    await expect(promise).rejects.toThrow()
  })
})
