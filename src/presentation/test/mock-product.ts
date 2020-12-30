import { ProductModel } from '@/domain/models/product/product'
import { mockProductModel } from '@/domain/test/mock-product/mock-product'
import { AddProduct, AddProductParams } from '@/domain/usecases/product/add-product'
import { LoadProductById } from '@/domain/usecases/product/load-product-by-id'
import { LoadProductRefById } from '@/domain/usecases/product/load-product-by-ref-id'
import { LoadProducts } from '@/domain/usecases/product/load-products'
import { RemoveProduct } from '@/domain/usecases/product/remove-product'
import { UpdateProductResult } from '@/domain/usecases/product/update-product'

export class AddProductSpy implements AddProduct {
  addProductParams: AddProductParams
  productModel = mockProductModel()

  async add (data: AddProductParams): Promise<ProductModel> {
    this.addProductParams = data
    return Promise.resolve(this.productModel)
  }
}

export class RemoveProductSpy implements RemoveProduct {
  id: string
  async removeById (id: string): Promise<void> {
    this.id = id
    return Promise.resolve()
  }
}

export class LoadProductsSpy implements LoadProducts {
  productModels = [].concat(mockProductModel())
  async load (): Promise<ProductModel[]> {
    return Promise.resolve(this.productModels)
  }
}

export class LoadProductsByIdSpy implements LoadProductById {
  productModel = mockProductModel()
  id: string

  async loadById (id: string): Promise<ProductModel> {
    this.id = id
    return Promise.resolve(this.productModel)
  }
}

export class LoadProductsByRefIdSpy implements LoadProductRefById {
  productModel = mockProductModel()
  refId: string

  async loadByRefId (refId: string): Promise<ProductModel> {
    this.refId = refId
    return Promise.resolve(this.productModel)
  }
}

export class UpdateProductSpy implements UpdateProductResult {
  productModel = mockProductModel()
  async update (product: ProductModel): Promise<ProductModel> {
    this.productModel = product
    return Promise.resolve(this.productModel)
  }
}
