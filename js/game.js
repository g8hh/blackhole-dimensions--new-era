//定义
var t=new Date()
var timestart=new Date()
var diff=0
var devspeed=OmegaNum(1)

function loop(){
    //deltatime-计算时间间隔
    t = new Date()
    diff=OmegaNum(Math.min((Number(t.getTime())-timestart)/1000,1/20)).mul(devspeed)
    timestart=t.getTime()
    //计算结束 真-输出是diff
    game(diff)
}
function game(diff){
    updateMain()
    save()
}

var tickdelay = setInterval(loop,1000/30)