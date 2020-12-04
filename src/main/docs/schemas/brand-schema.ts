export const brandSchema = {
  type: 'object',
  properties: {
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
    }
  },
  required: ['name', 'title', 'description', 'keywords', 'isActive', 'adWordsRemarketingCode', 'lomadeeCampaignCode']
}
