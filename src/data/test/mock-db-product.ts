import { ProductModel } from '@/domain/models'
import { mockProductModel, mockProductModels } from '@/domain/test/mock-product/mock-product'
import { AddProductParams } from '@/domain/usecases/product/add-product'
import { AddProductRepository, LoadProductByIdRepository, LoadProductByRefIdRepository, LoadProductsRepository, RemoveProductRepository, UpdateProductRespository } from '../protocols/db/product'

export class AddProductRepositorySpy implements AddProductRepository {
  productModel = mockProductModel()
  addProductParams: AddProductParams

  async add (data: AddProductParams): Promise<ProductModel> {
    this.addProductParams = data
    return Promise.resolve(this.productModel)
  }
}

export class LoadProductByRefIdRepositorySpy implements LoadProductByRefIdRepository {
  productModel = mockProductModel()
  id: string

  async loadByRefId (refId: string): Promise<ProductModel> {
    this.id = refId
    return Promise.resolve(this.productModel)
  }
}

export class LoadProductByIdRepositorySpy implements LoadProductByIdRepository {
  productModel = mockProductModel()
  id: string

  async loadById (id: string): Promise<ProductModel> {
    this.id = id
    return Promise.resolve(this.productModel)
  }
}

export class LoadProductsRepositorySpy implements LoadProductsRepository {
  productModels = mockProductModels()

  async loadAll (): Promise<ProductModel[]> {
    return Promise.resolve(this.productModels)
  }
}

export class RemoveProductRepositorySpy implements RemoveProductRepository {
  id: string
  async removeById (id: string): Promise<void> {
    this.id = id
    return Promise.resolve()
  }
}

export class UpdateProductRepositorySpy implements UpdateProductRespository {
  productModel = mockProductModel()
  async update (product: ProductModel): Promise<ProductModel> {
    this.productModel = product
    return Promise.resolve(this.productModel)
  }
}
