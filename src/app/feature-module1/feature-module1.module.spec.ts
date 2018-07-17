import { FeatureModule1Module } from './feature-module1.module';

describe('FeatureModule1Module', () => {
  let featureModule1Module: FeatureModule1Module;

  beforeEach(() => {
    featureModule1Module = new FeatureModule1Module();
  });

  it('should create an instance', () => {
    expect(featureModule1Module).toBeTruthy();
  });
});
