import { ClaimJson } from 'src/app/modules/claims/json/claim.json-interface';
import { ClaimsListJson } from 'src/app/modules/claims/json/claims-list.json-interface';
import { DeclarantJson } from 'src/app/modules/claims/json/declarant.json-interface';
import { DeclarantsListJson } from 'src/app/modules/claims/json/declarants-list.json-interface';
import { Claim } from 'src/app/modules/claims/models/claim';
import { ClaimsList } from 'src/app/modules/claims/models/claims-list';
import { Declarant } from 'src/app/modules/claims/models/declarant';
import { DeclarantsList } from 'src/app/modules/claims/models/declarants-list';

export class ClaimsModelsFactory {

  public createDeclarantFromJson(json: DeclarantJson): Declarant {
    return new Declarant(
      json.id,
      json.surname,
      json.name,
      json.patronymic,
      json.birthday,
      json.passport_series,
      json.passport_number,
      json.passport_date,
      json.phone,
      json.state,
    );
  }

  public createDeclarantsListFromJson(json: DeclarantsListJson): DeclarantsList {
    return new DeclarantsList(
      json.declarants.map(itemJson => this.createDeclarantFromJson(itemJson)),
      json.total,
    );
  }

  public createClaimFromJson(json: ClaimJson): Claim {
    return new Claim(
      json.id,
      json.number,
      json.timestamp,
      json.state,
      this.createDeclarantFromJson(json.declarant),
      json.manager_ids,
      json.is_have_new_message,
      json.service_type,
      json.checkpoint,
      json.service_payer,
      json.carrier,
      json.number_car,
      json.number_trailer,
      json.documents_photos,
      json.comment,
    );
  }

  public createClaimsListFromJson(json: ClaimsListJson): ClaimsList {
    return new ClaimsList(
      json.content.map(itemJson => this.createClaimFromJson(itemJson)),
      json.totalElements,
    );
  }

}
