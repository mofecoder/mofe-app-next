export * from './user'
export * from './contest'

type InternalColumn = {
  id: number
  createdAt: Date
  updatedAt: Date
}

export type WithoutInternalColumn<T> = T extends InternalColumn
  ? Omit<T, 'id' | 'createdAt' | 'updatedAt'>
  : never

export type WithInternalColumn<T> = T & InternalColumn

type DateToStringInner<T> = T extends Date ? Exclude<T, Date> | string : T

export type DateToString<T> = {
  [K in keyof T]: DateToStringInner<T[K]>
}
