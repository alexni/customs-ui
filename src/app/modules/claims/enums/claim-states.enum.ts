export enum ClaimStatesEnum {
  START = 'Start',
  ERROR = 'Error',
  SUCCESS = 'Success',
  REJECT = 'Reject',
}

export const CLAIM_STATES_LABELS = {
  [ClaimStatesEnum.START]: 'в работе',
  [ClaimStatesEnum.ERROR]: 'на доработке',
  [ClaimStatesEnum.SUCCESS]: 'отвергнута',
  [ClaimStatesEnum.REJECT]: 'завершена',
};
Object.freeze(CLAIM_STATES_LABELS);
