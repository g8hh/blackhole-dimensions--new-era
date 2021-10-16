var player = {};
var saveName = "BlackholeDimensions-NewEra-1";
var saveStr = "";
var toClearSave = false
var cleared = false

function load(save = null){
    if(localStorage.getItem(saveName)!=null) saveStr = JSON.parse(LZString.decompressFromBase64(localStorage.getItem(saveName)));
    if(save!=null) saveStr = JSON.parse(LZString.decompressFromBase64(save))
    calcPlayer();
    //window.alert("test")
    fixSave()
    player.version = 0.24
};
function save(){
    if(toClearSave){
        localStorage.clear(saveName)
        location.reload()
        cleared = true
        toClearSave = false
    }
    else if(!cleared){
        saveStr = LZString.compressToBase64(JSON.stringify(player));
        localStorage.setItem(saveName,saveStr);
    }
};

function fixSave(){
    if(saveStr.version < 0.23){
        if(!player.cp.eq(0)) doRl3(true)
        player.ce = n(0)
        for(i in basicDimNums){
            player.cd[i].num = n(0)
            player.cd[i].level = n(0)
            player.cd[i].procmult = n(1)
        }
        player.cd[0].procmult = n(0)
    }
};