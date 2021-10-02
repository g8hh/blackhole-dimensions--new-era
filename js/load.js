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

function fixSave(){};