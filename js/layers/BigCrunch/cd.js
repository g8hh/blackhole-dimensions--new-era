var cdMult = {}
var CDcost = [n(1),n(8),n(64),n(256)]
var CDcostMult = [n(2),n(4),(8),n(16)]
function buyMaxcd(){
    for(i in basicDimNums) buycd(i)
}
function getCEEffExp(){
    var exp = n(0)
    if(hasRl3Upgrade(14)) exp = exp.add(cuEff(14))
    if(hasRl3Upgrade(24)) exp = exp.add(cuEff(24))
    if(!hasRl3Upgrade(14)) exp = n(0)
    return exp
}
function getCEEff(){
    var eff = player.ce.add(1).pow(getCEEffExp())
    return eff
}
function getAllcdMult(){
    var mult = n(1)
    if(!hasRl3Upgrade(14)) mult = n(0)
    return mult
}
function getAnycdMult(dimNum){
    var mult = cdMult.all
    var level = player.cd[dimNum].level
    mult = mult.mul(getcdLevelBoostBase().pow(level))
    if(dimNum != 0) mult = mult.div(10)  

    if(inRl3Chall(11)) mult = mult.div(getRl3ChallEff(11).pow(dimNum))

    return mult
}
function getcdLevelBoostBase(dimNum){
    var base = n(2)
    return base
}
function buycd(dimNum){
    if(!hasRl3Upgrade(14)) return
    var bulkStat = bulkBuy(player.cp,CDcost[dimNum],player.cd[dimNum].level,CDcostMult[dimNum])
    if(bulkStat.bulk.lt(1)) return
    player.cd[dimNum].num = player.cd[dimNum].num.add(bulkStat.bulk)
    player.cd[dimNum].level = player.cd[dimNum].level.add(bulkStat.bulk)
    player.cp = player.cp.sub(bulkStat.cost)
}
function updatecd(){
    //计算部分!
    var proc = n(1)
    if(!hasRl3Upgrade(14)) proc = n(0)
    if(hasRl3Upgrade(14)) player.cd[0].num = player.cd[0].num.max(1)
    cdMult.all = getAllcdMult()
    for(i in basicDimNums) cdMult[i] = getAnycdMult(i)
    for(i in basicDimNums){
        i = Number(i)
        if(i<=2) player.cd[i].num = player.cd[i].num.add(player.cd[i+1].num.mul(cdMult[i+1]).root(dimNerf).mul(diff).mul(getPreBCTickspeed()).div(10))
        player.cd[i].procmult = player.cd[i].procmult.add(player.cd[i].num.mul(cdMult[i]).mul(diff).mul(getPreBCTickspeed()))
        proc = proc.mul(player.cd[i].procmult)
    }
    player.ce = player.ce.add(proc.mul(diff).mul(getPreBCTickspeed()))

    //显示部分!
    if(SecondTab!="奇点维度") return close("cd")
    open("cd")
    w("ce",`您有 ${format(player.ce,0)} 奇点能量(+ ${format(proc)} /s) 这使得物质维度x${format(getCEEff())}) (奇点效果指数:${format(getCEEffExp(),3)})`)
    for(i in basicDimNums){
        w("cd"+i,getBasicDimDesp("奇点",i,"奇点能量",cdMult[i],player.cd[i].procmult,player.cd[i].num,sc("cd",player.cd[i].level,false))+"&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+getBasicBuyButtonDesp(showBulkBuy(player.cp,CDcost[i],player.cd[i].level,CDcostMult[i]),"塌缩点数"))
        if(bulkBuy(player.cp,CDcost[i],player.cd[i].level,CDcostMult[i]).bulk.gte(1)) grey("cd"+i,["dim"])
        else normal("cd"+i,["dim"])
    }
}