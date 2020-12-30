import { Validation } from '@/presentation/protocols'
import { RequiredFieldValidation } from '@/validation/validators/required-field-validation'
import { ValidationComposite } from '@/validation/validators/validation-composite'
import { makeAddProductValidation } from './add-product-validation-factory'

jest.mock('@/validation/validators/validation-composite.ts')

describe('ProductAddValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddProductValidation()
    const validations: Validation[] = []
    for (const field of ['name','departmentId','categoryId','brandId','linkId','refId','isVisible','description','descriptionShort','releaseDate','keyWords','title','isActive','taxCode','metaTagDescription','supplierId','showWithoutStock','adWordsRemarketingCode','lomadeeCampaignCode']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
