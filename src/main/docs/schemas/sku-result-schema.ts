export const skuResultSchema = {
  type: 'object',
  properties: {
    productId: {
      type: 'string'
    },
    isActive: {
      type: 'boolean'
    },
    name: {
      type: 'string'
    },
    refId: {
      type: 'string'
    },
    packagedHeight: {
      type: 'number'
    },
    packagedLength: {
      type: 'number'
    },
    packagedWidth: {
      type: 'number'
    },
    packagedWeightKg: {
      type: 'number'
    },
    height: {
      type: 'number'
    },
    length: {
      type: 'number'
    },
    width: {
      type: 'number'
    },
    weightKg: {
      type: 'number'
    },
    cubicWeight: {
      type: 'number'
    },
    isKit: {
      type: 'boolean'
    },
    rewardValue: {
      type: 'number'
    },
    manufacturerCode: {
      type: 'number'
    },
    commercialConditionId: {
      type: 'number'
    },
    measurementUnit: {
      type: 'string'
    },
    unitMultiplier: {
      type: 'number'
    },
    kitItensSellApart: {
      type: 'boolean'
    }
  },
  required: ['productId','isActive','name','refId','packagedHeight','packagedLength','packagedWidth','packagedWeightKg','height','length','width','weightKg','cubicWeight','isKit','rewardValue','manufacturerCode','commercialConditionId','measurementUnit','unitMultiplier','kitItensSellApart']
}
