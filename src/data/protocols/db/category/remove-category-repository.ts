export interface RemoveCategoryRepository {
  removeById: (id: string) => Promise<void>
}
