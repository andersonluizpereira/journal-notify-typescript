export type CategoryModel = {
  id?: string
  name: string
  keywords: string
  title: string
  description: string
  fatherCategoryId: number
  globalCategoryId: number
  showInStoreFront: boolean
  isActive: boolean
  activeStoreFrontLink: boolean
  showBrandFilter: boolean
  score: number
  stockKeepingUnitSelectionMode: string
}
