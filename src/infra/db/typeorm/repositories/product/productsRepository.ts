import { AddProductRepository, LoadProductByRefIdRepository, RemoveProductRepository, UpdateProductRespository } from '@/data/protocols/db/product'
import { LoadProductByIdRepository } from '@/data/protocols/db/product/load-product-by-id-repository'
import { LoadProductsRepository } from '@/data/protocols/db/product/load-products-repository'
import { ProductModel } from '@/domain/models'
import { AddProductParams } from '@/domain/usecases/product/add-product'

import { getRepository, Repository } from 'typeorm'
import { Product } from '../../entities/product'

export class ProductsRepository implements AddProductRepository, LoadProductsRepository, LoadProductByIdRepository, LoadProductByRefIdRepository, RemoveProductRepository, UpdateProductRespository {
  private readonly productsRepository: Repository<Product>

  constructor () {
    this.productsRepository = getRepository(Product)
  }

  async loadAll (productId?: string): Promise<ProductModel[]> {
    return await this.productsRepository
      .createQueryBuilder().getMany()
  }

  async loadById (id: string): Promise<Product> {
    const product = await this.productsRepository.findOne({
      where: {
        id
      }
    })
    return product
  }

  async loadByRefId (refId: string): Promise<Product> {
    const product = await this.productsRepository.findOne({
      where: {
        refId
      }
    })
    return product
  }

  async add (data: AddProductParams): Promise<ProductModel> {
    const product = this.productsRepository.create(data)
    await this.productsRepository.save(product)
    return product
  }

  async removeById (id: string): Promise<void> {
    const product = await this.productsRepository.findOne({
      where: {
        id
      }
    })
    await this.productsRepository.remove(product)
  }

  async update (product: ProductModel): Promise<ProductModel> {
    await this.productsRepository.merge(product)
    return await this.productsRepository.save(product)
  }
}
