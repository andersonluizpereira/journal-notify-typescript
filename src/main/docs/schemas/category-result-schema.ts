export const categoryResultSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    keywords: {
      type: 'string'
    },
    title: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    fatherCategoryId: {
      type: 'number'
    },
    globalCategoryId: {
      type: 'number'
    },
    showInStoreFront: {
      type: 'boolean'
    },
    isActive: {
      type: 'boolean'
    },
    activeStoreFrontLink: {
      type: 'boolean'
    },
    showBrandFilter: {
      type: 'boolean'
    },
    score: {
      type: 'number'
    },
    stockKeepingUnitSelectionMode: {
      type: 'string'
    }
  },
  required: ['name', 'keywords', 'title', 'description', 'fatherCategoryId', 'globalCategoryId', 'showInStoreFront', 'isActive', 'activeStoreFrontLink', 'showBrandFilter', 'score', 'stockKeepingUnitSelectionMode']
}
