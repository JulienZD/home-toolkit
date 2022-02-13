type SafeRecordModification<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>;
