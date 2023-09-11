namespace db;

@cds.persistence.exists
entity ZSD_HT_SLEI0033_SHIP_STATUS {
    KEY VBELN : String(10);
    key POSNR : String(6);
    MATNR : String(40);
    ORMNG : String(13);
    LFIMG : String(13);
    VRKME : String(3);
    CHARG : String(10);
    WERKS : String(4);
    ZPACK : String(1);
    ZCOMP : String(1);
    ZCONS : String(1);
    ZSHIPS :String(1);
    ZSHIPL: String(1);
    ZCANLIP : String(1);
    ZZ_STATUSCODE :String(20);
    ZZ_CREATED_BY : String(20);
    ZZ_CREATED_ON : Timestamp;
    ZZ_UPDATE_BY  : String(20);
    ZZ_UPDATE_ON  : Timestamp;
};


