import { ClaimJson } from 'src/app/modules/claims/json/claim.json-interface';
import { ClaimsListJson } from 'src/app/modules/claims/json/claims-list.json-interface';
import { DriverJson } from 'src/app/modules/claims/json/driver.json-interface';
import { Claim } from 'src/app/modules/claims/models/claim';
import { ClaimsList } from 'src/app/modules/claims/models/claims-list';
import { Driver } from 'src/app/modules/claims/models/driver';

export class ClaimsModelsFactory {

  public createDriverFromJson(json: DriverJson): Driver {
    return new Driver(
      json.driver_surname,
      json.driver_name,
      json.driver_patronymic,
      json.driver_birthday,
      json.driver_passport_series,
      json.driver_passport_number,
      json.driver_passport_date,
      json.driver_phone,
    );
  }

  public createClaimFromJson(json: ClaimJson): Claim {
    return new Claim(
      json.id,
      json.number,
      json.timestamp,
      json.state,
      this.createDriverFromJson(json),
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
      json.claims.map(itemJson => this.createClaimFromJson(itemJson)),
      json.total,
    );
  }

}
