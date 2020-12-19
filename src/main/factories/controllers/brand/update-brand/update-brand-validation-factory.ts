import { Validation } from '@/presentation/protocols'
import { RequiredFieldValidation } from '@/validation/validators/required-field-validation'
import { ValidationComposite } from '@/validation/validators/validation-composite'

export const makeUpdateBrandValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['id','name', 'title', 'description', 'keywords', 'isActive', 'adWordsRemarketingCode', 'lomadeeCampaignCode', 'score', 'linkId']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
