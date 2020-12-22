export interface RemoveBrandRepository {
  removeById: (id: string) => Promise<void>
}
