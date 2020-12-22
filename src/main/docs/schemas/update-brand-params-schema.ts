export const updateBrandParamsSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    title: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    keywords: {
      type: 'string'
    },
    isActive: {
      type: 'boolean'
    },
    adWordsRemarketingCode: {
      type: 'string'
    },
    lomadeeCampaignCode: {
      type: 'string'
    },
    score: {
      type: 'number'
    },
    linkId: {
      type: 'string'
    }
  },
  required: ['id','name', 'title', 'description', 'keywords', 'isActive', 'adWordsRemarketingCode', 'lomadeeCampaignCode', 'score', 'linkId']
}
