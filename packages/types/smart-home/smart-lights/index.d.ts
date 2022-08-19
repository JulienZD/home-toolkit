export interface ISmartLight {
  id: string;
  name: string;
  color: string;
  brightness: number;
  isOn: boolean;
}

export type ISmartLightOperation = Partial<Omit<ISmartLight, "id" | "name">>;

export interface ISmartLightOperationResult {
  lightId: string;
  success: boolean;
  reason?: string;
}
