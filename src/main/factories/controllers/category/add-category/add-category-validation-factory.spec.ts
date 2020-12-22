import { Validation } from '@/presentation/protocols'
import { RequiredFieldValidation } from '@/validation/validators/required-field-validation'
import { ValidationComposite } from '@/validation/validators/validation-composite'
import { makeAddCategoryValidation } from './add-category-validation-factory'

jest.mock('@/validation/validators/validation-composite.ts')

describe('CategoryAddValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddCategoryValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'keywords', 'title', 'description', 'fatherCategoryId', 'globalCategoryId', 'showInStoreFront', 'isActive', 'activeStoreFrontLink', 'showBrandFilter', 'score', 'stockKeepingUnitSelectionMode']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
