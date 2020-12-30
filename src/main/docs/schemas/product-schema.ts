export const productSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    departmentId: {
      type: 'string'
    },
    categoryId: {
      type: 'string'
    },
    brandId: {
      type: 'string'
    },
    linkId: {
      type: 'string'
    },
    refId: {
      type: 'string'
    },
    isVisible: {
      type: 'boolean'
    },
    description: {
      type: 'string'
    },
    descriptionShort: {
      type: 'string'
    },
    releaseDate: {
      type: 'date'
    },
    keyWords: {
      type: 'string'
    },
    title: {
      type: 'string'
    },
    isActive: {
      type: 'boolean'
    },
    taxCode: {
      type: 'number'
    },
    metaTagDescription: {
      type: 'string'
    },
    supplierId: {
      type: 'number'
    },
    showWithoutStock: {
      type: 'boolean'
    },
    score: {
      type: 'number'
    }
  },
  required: ['name','departmentId','categoryId','brandId','linkId','refId','isVisible','description','descriptionShort','releaseDate','keyWords','title','isActive','taxCode','metaTagDescription','supplierId','showWithoutStock','score']
}
