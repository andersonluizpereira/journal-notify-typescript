import { Validation } from '@/presentation/protocols'
import { RequiredFieldValidation } from '@/validation/validators/required-field-validation'
import { ValidationComposite } from '@/validation/validators/validation-composite'
import { makeAddSkuValidation } from './add-sku-validation-factory'

jest.mock('@/validation/validators/validation-composite.ts')

describe('SkuAddValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddSkuValidation()
    const validations: Validation[] = []
    for (const field of ['productId','isActive','name','refId','packagedHeight','packagedLength','packagedWidth','packagedWeightKg','height','length','width','weightKg','cubicWeight','isKit','rewardValue','manufacturerCode','commercialConditionId','measurementUnit','unitMultiplier','kitItensSellApart']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
