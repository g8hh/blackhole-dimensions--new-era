var player = {};
var saveName = "BlackholeDimensions-NewEra-1";
var saveStr = "";
var toClearSave = false
var cleared = false

function load(save = null){
    if(localStorage.getItem(saveName)!=null) saveStr = JSON.parse(LZString.decompressFromBase64(localStorage.getItem(saveName)));
    if(save!=null) saveStr = JSON.parse(LZString.decompressFromBase64(save))
    calcPlayer();
    //calc offline tickspeed boost
    if(player.time && player.cheated == "no"){
        if(Number(player.time) > new Date()){alert("检测到存档来自未来...指不准我什么时候就整了下防作弊呢( 已永久禁用离线加速.");player.cheated = "yes";player.offlineSpeedup = n(0)}
        if(new Date() - Number(player.time) >= 10000){
            var gain = ((Number(t.getTime()) - Number(player.time))/1000)**0.9
            alert(`您在${formatTime((Number(t.getTime()) - Number(player.time))/1000)}的离线时间中获得了${formatTime(gain)}的离线加速!`)
            player.offlineSpeedup = player.offlineSpeedup.add(gain)
        }
    }
    player.time = Number(t.getTime())
    //window.alert("test")
    fixSave()
    player.version = 0.272
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