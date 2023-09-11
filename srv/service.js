const cds = require("@sap/cds");
const { ZSD_HT_SLEI0033_SHIP_STATUS} = cds.entities("db");

const Myservice = async srv => {

    srv.on('CREATE', "update_status", async (req,res) => {
        console.log("hello update any");
        console.log(req.data);
        console.log(req.data.VBELN);
        const Delivery = req.data.VBELN;
        const Item = req.data.POSNR;
        const correction_code = req.data.Correction;

        if (correction_code !== "1"){
            let  shipped = await SELECT `ZSHIPS` .from(ZSD_HT_SLEI0033_SHIP_STATUS).where({VBELN:Delivery, POSNR:Item })
            console.log("zship",shipped);
            const Zship = shipped[0].ZSHIPS;
            if( Zship !== "X"){
                let  packed = await SELECT `ZPACK` .from(ZSD_HT_SLEI0033_SHIP_STATUS).where({VBELN:Delivery, POSNR:Item })
                // let packed = await SELECT `ZPACK` .from(ZSD_HT_SLEI0033_SHIP_STATUS).Where({VBELN:Delivery, POSNR:Item })
                if(packed[0].ZPACK !== "X"){
                    let returndata = await cds
                    .transaction(req)
                    .run([
                        UPDATE(ZSD_HT_SLEI0033_SHIP_STATUS).set({
                            ZPACK: "X"
                        }).where ({ VBELN:Delivery , POSNR:Item })
                    ]).then((resolve,reject)=>{
                        if (typeof resolve !== "undefibned" && resolve >= 1){
                            return req.data
                        }
                        else{
                            req.error(409,"record not found")
                        }
                    })
                    .catch(err => {
                        req.error(500,"error in updating record")
                    });
                   return returndata; 
                }
                else{
                    req.error(409,"Already packed")
                }
            }
            else{
                req.error(409,"already shipped")
            }
        }
        else{
            req.error(409,"invaild dataa")
        }




    });
}

module.exports = Myservice;