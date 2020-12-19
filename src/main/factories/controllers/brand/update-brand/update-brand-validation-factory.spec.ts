import { Validation } from '@/presentation/protocols'
import { RequiredFieldValidation } from '@/validation/validators/required-field-validation'
import { ValidationComposite } from '@/validation/validators/validation-composite'
import { makeUpdateBrandValidation } from './update-brand-validation-factory'

jest.mock('@/validation/validators/validation-composite.ts')

describe('BrandUpdateValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeUpdateBrandValidation()
    const validations: Validation[] = []
    for (const field of ['id', 'name', 'title', 'description', 'keywords', 'isActive', 'adWordsRemarketingCode', 'lomadeeCampaignCode', 'score', 'linkId']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
