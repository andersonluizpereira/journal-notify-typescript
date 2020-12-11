import { Validation } from '@/presentation/protocols'
import { RequiredFieldValidation } from '@/validation/validators/required-field-validation'
import { ValidationComposite } from '@/validation/validators/validation-composite'
import { makeAddBrandValidation } from './add-brand-validation-factory'

jest.mock('@/validation/validators/validation-composite.ts')

describe('LoginValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddBrandValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'title', 'description', 'keywords', 'isActive', 'adWordsRemarketingCode', 'lomadeeCampaignCode', 'score', 'linkId']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
