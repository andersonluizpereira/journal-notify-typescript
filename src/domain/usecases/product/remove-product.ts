export interface RemoveProduct {
  removeById: (id: string) => Promise<void>
}
