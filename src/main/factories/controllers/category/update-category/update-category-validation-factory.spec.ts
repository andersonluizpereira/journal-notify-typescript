import { Validation } from '@/presentation/protocols'
import { RequiredFieldValidation } from '@/validation/validators/required-field-validation'
import { ValidationComposite } from '@/validation/validators/validation-composite'
import { makeUpdateCategoryValidation } from './update-category-validation-factory'

jest.mock('@/validation/validators/validation-composite.ts')

describe('CategoryUpdateValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeUpdateCategoryValidation()
    const validations: Validation[] = []
    for (const field of ['id','name', 'keywords', 'title', 'description', 'fatherCategoryId', 'globalCategoryId', 'showInStoreFront', 'isActive', 'activeStoreFrontLink', 'showBrandFilter', 'score', 'stockKeepingUnitSelectionMode']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
