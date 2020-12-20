/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IClearCache, ILoadCache, ISaveCache } from '../protocols/cache'

export const mockClearCache = () => {
  class ClearCacheStub implements IClearCache {
    async clear (): Promise<void> {
      return Promise.resolve()
    }
  }

  return new ClearCacheStub()
}

export const mockLoadCache = () => {
  class LoadCacheStub implements ILoadCache {
    async load (): Promise<any> {
      return null
    }
  }

  return new LoadCacheStub()
}

export const mockSaveCache = () => {
  class SaveCacheStub implements ISaveCache {
    async save (): Promise<void> {
      return Promise.resolve()
    }
  }

  return new SaveCacheStub()
}
