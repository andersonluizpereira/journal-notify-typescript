export const updateCategoryParamsSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
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
  required: ['id','name', 'keywords', 'title', 'description', 'fatherCategoryId', 'globalCategoryId', 'showInStoreFront', 'isActive', 'activeStoreFrontLink', 'showBrandFilter', 'score', 'stockKeepingUnitSelectionMode']
}
