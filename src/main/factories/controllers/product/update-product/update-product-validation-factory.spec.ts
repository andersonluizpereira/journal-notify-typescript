import { Validation } from '@/presentation/protocols'
import { RequiredFieldValidation } from '@/validation/validators/required-field-validation'
import { ValidationComposite } from '@/validation/validators/validation-composite'
import { makeUpdateProductValidation } from './update-product-validation-factory'

jest.mock('@/validation/validators/validation-composite.ts')

describe('ProductUpdateValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeUpdateProductValidation()
    const validations: Validation[] = []
    for (const field of ['id','name','departmentId','categoryId','brandId','linkId','refId','isVisible','description','descriptionShort','releaseDate','keyWords','title','isActive','taxCode','metaTagDescription','supplierId','showWithoutStock','score']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
