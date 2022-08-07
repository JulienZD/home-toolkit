export abstract class BaseEntity<T> {
  constructor(partial: Partial<T>) {
    Object.assign(this, partial);
  }

  id!: number;
  createdAt!: Date;
  updatedAt!: Date;
}
