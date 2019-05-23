export enum ClaimServiceTypesEnum {
  FIRST = 'FIRST',
  SECOND = 'SECOND',
  THIRD = 'THIRD',
  FOURTH = 'FOURTH',
  FIFTH = 'FIFTH',
  SIXTH = 'SIXTH',
}

export const CLAIM_SERVICE_TYPES_LABELS = {
  [ClaimServiceTypesEnum.FIFTH]: 'ОБЕСПЕЧЕНИЕ ТАМОЖЕННОГО ТРАНЗИТА',
  [ClaimServiceTypesEnum.SECOND]: 'ЭЛЕКТРОННАЯ ТРАНЗИТНАЯ ДЕКЛАРАЦИЯ',
  [ClaimServiceTypesEnum.THIRD]: 'ПРЕДВАРИТЕЛЬНОЕ ИНФОРМИРОВАНИЕ',
  [ClaimServiceTypesEnum.FOURTH]: '"ТРАНЗИТНАЯ ДЕКЛАРАЦИЯ Т-1',
  [ClaimServiceTypesEnum.FIFTH]: 'УВЕДОМЛЕНИЕ В СИСТЕМЕ AREX',
  [ClaimServiceTypesEnum.SIXTH]: 'ЭКСПОРТНАЯ ДЕКЛАРАЦИЯ EX-1',
};
Object.freeze(CLAIM_SERVICE_TYPES_LABELS);
