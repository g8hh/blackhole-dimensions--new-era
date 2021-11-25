var rl4chall = {
    1:{
        desp(){return `MC1: 挑战难度x${format(this.eff1())} 目标:${format(this.goal())}镜面碎片 奖励:镜面挑战外能获得少量镜面碎片 (先^${format(this.rew1())}再x${format(this.rew2())} 下一级: ^${format(this.rew1(getRl4ChallComp(1).add(1)))}x${format(this.rew2(getRl4ChallComp(1).add(1)))} ) (已完成${format(getRl4ChallComp(1))}/${format(this.maxComp())}次)`},
        goal(){return four.pow(player.rl4ChallComp[1].add(1))},
        eff1(){return n(2.5).add(player.rl4ChallComp[1].mul(1.5))},
        rew1(x = player.rl4ChallComp[1]){return x.div(3).pow(0.5)},
        rew2(x = player.rl4ChallComp[1]){if(x.eq(0)) return zero;return ten.pow(x.div(3).sub(1))},
        maxComp(){return n(2)},
    },
}

function enterRl4Chall(id){
    if(!confirm("您确定要进入挑战么?这会强制进行一次镜面重置,并且你不能从这次重置中获取镜面物质.这么做还会导致您的镜面碎片被清除.*镜面挑战中不能获得镜物质和镜面重置次数*")) return
    player.mirrorShard = zero
    player.challComp = []
    player.activeRl4Chall = []
    player.cu = []
    player.activeRl4Chall.push(id)
    doRl4(true)
    player.rl4chall = id
}
function exitRl4Chall(force = false){
    if(player.rl4chall == null) return
    if(!force) if(!confirm("您确定要退出挑战么?这会强制进行一次镜面重置,同时您会失去您所有的镜面碎片.同样的,您无法完成这个挑战.")) return
    player.mirrorShard = zero
    doRl4(true)
    player.rl4chall = null
    player.activeRl4Chall = []
}
function inRl4Chall(id){
    return player.activeRl4Chall.includes(id) || player.rl4chall == id
}
function hasRl4Chall(id){
    return player.rl4ChallComp.includes(id)
}
function getRl4ChallEff(id,ord = 1){
    return rl4chall[id]["eff"+ord]()
}
function getRl4ChallRew(id,ord = 1){
    return rl4chall[id]["rew"+ord]()
}
function getRl4ChallComp(id){
    return player.rl4ChallComp[id]
}

function checkRl4Chall(){
    if(!player.rl4chall) return
    if(!rl4chall[player.rl4chall]) return
    if(player.mirrorShard.gte(rl4chall[player.rl4chall].goal())){
        compRl4Chall()
    }
}
function compRl4Chall(id = player.rl4chall,resetless = false){        
    player.rl4ChallComp[id] = player.rl4ChallComp[id].add(1).min(rl4chall[id].maxComp())
    if(!resetless) exitRl4Chall(true)
}

function updateRl4Chall(){
    checkRl4Chall()
    if(SecondTab!="镜面挑战") return close("rl4chall")
    open(`rl4chall`)
    for(i in rl4chall){
        var inCha = player.rl4chall == i
        var actCha = inRl4Chall(i)
        w(`mc${i}`,rl4chall[i].desp()+(inCha?"<br>您在该挑战中":actCha?"<br>该挑战被其他挑战触发":""))
        if(inCha) red(`mc${i}`,["dim"])
        else if(actCha) grey(`mc${i}`,["dim"])
        else if(getRl4ChallComp(i).eq(rl4chall[i].maxComp)) lime(`mc${i}`,["dim"])
        else if(getRl4ChallComp(i).gt(0)) normal(`mc${i}`,["dim","lightBlue"])
        else normal(`mc${i}`,["dim"])
    }
}