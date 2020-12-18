import { AddBrandRepositorySpy, LoadBrandsRepositorySpy, throwError, UpdateBrandRepositorySpy } from '@/data/test'
import { DbUpdateBrand } from './db-update-brand'
import { mockAddBrandParams } from '@/domain/test/mock-brand/mock-brand'

type SutTypes = {
  sut: DbUpdateBrand
  updateBrandRepositorySpy: UpdateBrandRepositorySpy
  addBrandRepositorySpy: AddBrandRepositorySpy
  loadBrandsRepositorySpy: LoadBrandsRepositorySpy
}

const makeSut = (): SutTypes => {
  const updateBrandRepositorySpy = new UpdateBrandRepositorySpy()
  const addBrandRepositorySpy = new AddBrandRepositorySpy()
  const loadBrandsRepositorySpy = new LoadBrandsRepositorySpy()
  const sut = new DbUpdateBrand(updateBrandRepositorySpy)
  return {
    sut,
    updateBrandRepositorySpy,
    addBrandRepositorySpy,
    loadBrandsRepositorySpy
  }
}

describe('DbUpdateBrand Usecase', () => {
  test('Should call UpdateBrandRepository with correct values', async () => {
    const { sut, addBrandRepositorySpy, loadBrandsRepositorySpy, updateBrandRepositorySpy } = makeSut()
    const brandData = mockAddBrandParams()
    await addBrandRepositorySpy.add(brandData)
    var brandsData = await loadBrandsRepositorySpy.loadAll()
    brandsData[0].name += 'updated'
    const brandsDataName = brandsData[0].name
    const brand = await sut.update(brandsData[0])
    expect(brand.name).toEqual(brandsDataName)
    expect(updateBrandRepositorySpy.brandModel).toEqual(brand)
  })

  test('Should throw if UpdateBrandRepository throws', async () => {
    const { sut, updateBrandRepositorySpy } = makeSut()
    jest.spyOn(updateBrandRepositorySpy, 'update').mockImplementationOnce(throwError)
    const brandData = mockAddBrandParams()
    const promise = sut.update(brandData)
    await expect(promise).rejects.toThrow()
  })
})
