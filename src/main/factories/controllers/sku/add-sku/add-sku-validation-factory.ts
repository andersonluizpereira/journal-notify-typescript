import { Validation } from '@/presentation/protocols/validation'
import { RequiredFieldValidation } from '@/validation/validators/required-field-validation'
import { ValidationComposite } from '@/validation/validators/validation-composite'

export const makeAddSkuValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['productId','isActive','name','refId','packagedHeight','packagedLength','packagedWidth','packagedWeightKg','height','length','width','weightKg','cubicWeight','isKit','rewardValue','manufacturerCode','commercialConditionId','measurementUnit','unitMultiplier','kitItensSellApart']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
