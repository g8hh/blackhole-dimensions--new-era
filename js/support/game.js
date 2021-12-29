function getTimeSpeed(force = false){
    var tickspeed = n(1)
    if((player.ToggleOfflineSpeedup == "on" && player.offlineSpeedup.gt(0)) || force){
        var boost = player.offlineSpeedup.add(1).root(2.5).div(10).max(2)
        if(force) return boost
        tickspeed = tickspeed.mul(boost)
        player.offlineSpeedup = player.offlineSpeedup.sub(boost.sub(1).mul(5).mul(diff))
    }
    player.offlineSpeedup = player.offlineSpeedup.max(0)
    return tickspeed
}

function loop(){
    //deltatime-计算时间间隔
    t = new Date()
    var realDiff = OmegaNum((Number(t.getTime())-timestart)/1000)
    diff=OmegaNum(Math.min((Number(t.getTime())-timestart)/1000,1/20))
    if(realDiff.gte(diff)) player.offlineSpeedup = player.offlineSpeedup.add(realDiff.sub(diff).add(1).pow(0.925).sub(1))
    var offlineBoost = getTimeSpeed().mul(player.devSpeed)
    diff=diff.mul(offlineBoost)
    timestart=t.getTime()
    //计算结束 真-输出是diff
    game(diff)
}
function game(diff){
    updateMain()
    if(!stopSaving) if(!player.devSpeed.eq(0)) save()
    player.time = Number(t.getTime())
}

var tickdelay = setInterval(loop,1000/30)