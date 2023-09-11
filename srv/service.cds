using { db as HT } from '../db/schema';

service Myservice {

    @updateonly entity update_status as projection on HT.ZSD_HT_SLEI0033_SHIP_STATUS{
        *,
        null as Correction: String
    };

}
