export interface RemoveProductRepository {
  removeById: (id: string) => Promise<void>
}
