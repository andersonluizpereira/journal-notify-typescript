import { Validation } from '@/presentation/protocols'
import { RequiredFieldValidation } from '@/validation/validators/required-field-validation'
import { ValidationComposite } from '@/validation/validators/validation-composite'

export const makeUpdateProductValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['id','name','departmentId','categoryId','brandId','linkId','refId','isVisible','description','descriptionShort','releaseDate','keyWords','title','isActive','taxCode','metaTagDescription','supplierId','showWithoutStock','score']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
