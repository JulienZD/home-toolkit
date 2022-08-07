type SafeRecordModification<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>;

type ModifyData<T> = Partial<SafeRecordModification<T>>;

type KeyIn<T> = {
  [K in keyof T]: T[K];
};
