export function metersToKilometers(viisibilityInMeters: number): string {
  const visibilitiInKilometers = viisibilityInMeters / 1000;
  return `${visibilitiInKilometers.toFixed(0)}km`;
}