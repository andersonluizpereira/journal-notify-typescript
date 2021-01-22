import { SkuModel } from '@/domain/models'

export interface LoadSkuRefById {
  loadByRefId: (refId: string) => Promise<SkuModel>
}
