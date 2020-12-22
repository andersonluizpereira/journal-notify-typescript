import { Validation } from '@/presentation/protocols'
import { RequiredFieldValidation } from '@/validation/validators/required-field-validation'
import { ValidationComposite } from '@/validation/validators/validation-composite'

export const makeUpdateCategoryValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['id','name', 'keywords', 'title', 'description', 'fatherCategoryId', 'globalCategoryId', 'showInStoreFront', 'isActive', 'activeStoreFrontLink', 'showBrandFilter', 'score', 'stockKeepingUnitSelectionMode']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
