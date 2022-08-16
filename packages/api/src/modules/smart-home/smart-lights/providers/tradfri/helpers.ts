import { Accessory, AccessoryTypes } from 'node-tradfri-client';

export const isLightbulb = (device: Accessory) => device.type === AccessoryTypes.lightbulb;
