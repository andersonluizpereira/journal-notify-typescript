import { Validation } from '@/presentation/protocols/validation'
import { RequiredFieldValidation } from '@/validation/validators/required-field-validation'
import { ValidationComposite } from '@/validation/validators/validation-composite'

export const makeAddProductValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name','departmentId','categoryId','brandId','linkId','refId','isVisible','description','descriptionShort','releaseDate','keyWords','title','isActive','taxCode','metaTagDescription','supplierId','showWithoutStock','adWordsRemarketingCode','lomadeeCampaignCode']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
