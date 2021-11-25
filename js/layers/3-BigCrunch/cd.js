var cdMult = {}
var CDcost = [n(1),n(8),n(64),n(256)]
var CDcostMult = [n(2),n(4),n(8),n(16)]
function buyMaxcd(){
    buyCpBooster()
    for(i in basicDimNums) buycd(i)
}
function getCEEffExp(){
    var exp = n(0)
    if(hasRl3Upgrade(14)) exp = exp.add(cuEff(14))
    if(hasRl3Upgrade(24)) exp = exp.add(cuEff(24))
    if(hasRl3Upgrade(34)) exp = exp.add(cuEff(34))
    if(hasRl3Upgrade(44)) exp = exp.add(cuEff(44))
    if(hasRl3Upgrade(54)) exp = exp.add(cuEff(54))
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
    if(inRl3Chall(31)) mult = mult.div(player.mass.add(10).log10())
    mult = mult.mul(getENEff())
    return mult
}
function getAnycdMult(dimNum){
    var mult = cdMult.all
    var level = sc("cd",player.cd[dimNum].level)
    mult = mult.mul(getcdLevelBoostBase(dimNum).pow(level))
    if(dimNum != 0) mult = mult.div(10)  

    if(inRl3Chall(11)) mult = mult.div(getRl3ChallEff(11).pow(dimNum))

    return mult
}
function getcdLevelBoostBase(dimNum){
    dimNum = Number(dimNum)
    var base = n(2)
    if(hasRl3Chall(14)){
        if(hasRl3Upgrade(13)) base = base.add(cuEff(13))
        if(hasRl3Upgrade(23)) base = base.add(cuEff(23))
        if(hasRl3Upgrade(33)) base = base.add(cuEff(33))
        if(hasRl3Upgrade(43)) base = base.add(cuEff(43))
    }
    if(hasRl3Upgrade(53)){
        if(hasRl3Upgrade(33)) base = base.add(cuEff(33).mul(dimNum+1))
    }
    return base
}
function buycd(dimNum){
    if(!hasRl3Upgrade(14)) return
    var bulkStat = bulkBuy(player.cp,CDcost[dimNum],player.cd[dimNum].level,CDcostMult[dimNum])
    if(bulkStat.bulk.lt(1)) return
    player.cd[dimNum].num = player.cd[dimNum].num.add(bulkStat.bulk)
    player.cd[dimNum].level = player.cd[dimNum].level.add(bulkStat.bulk)
    if(!hasRl4Milestone(4)) player.cp = player.cp.sub(bulkStat.cost)
}
function getCpBoosterCostAndCostInc(){
    var cost = n(2)
    var costInc = n(2)
    return {cost:cost,costInc:costInc}
}
function buyCpBooster(){
    if(!hasRl3Upgrade(31)) return
    var cost = getCpBoosterCostAndCostInc().cost
    var costInc = getCpBoosterCostAndCostInc().costInc
    var bulkStat = bulkBuy(player.cp,cost,player.cpBooster,costInc)
    if(bulkStat.bulk.lt(1)) return
    player.cpBooster = player.cpBooster.add(bulkStat.bulk)
    if(!hasRl4Milestone(3)) player.cp = player.cp.sub(bulkStat.cost)
}
function getCuBoosterEffBase(){
    var effBase = n(1.2)
    if(hasRl3Upgrade(41)) effBase = effBase.add(cuEff(41))
    if(hasRl3Chall(32)) effBase = effBase.add(0.05)
    if(player.mirrorize) effBase = effBase.sqrt()
    return effBase
}
function getCpBoosterEff(){
    if(!hasRl3Upgrade(31)) return one
    var effBase = getCuBoosterEffBase()
    var effNum = sc("cpBooster",player.cpBooster)
    if(hasRl3Upgrade(41)) effNum = effNum.add(3)
    var eff = effBase.pow(effNum)
    return eff
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
        if(i<=2) player.cd[i].num = player.cd[i].num.add(player.cd[i+1].num.mul(cdMult[i+1]).root(dimNerf).mul(diff).mul(getBCTickspeed()).div(10))
        player.cd[i].procmult = player.cd[i].procmult.add(player.cd[i].num.mul(cdMult[i]).mul(diff).mul(getBCTickspeed()))
        proc = proc.mul(player.cd[i].procmult)
    }
    proc = sc("ce",proc)
    player.ce = player.ce.add(proc.mul(diff).mul(getBCTickspeed()))

    //显示部分!
    if(SecondTab!="奇点维度") return close("cd")
    open("cd")
    w("ce",`您有 ${format(player.ce,0)} 奇点能量(+ ${format(proc)} /s) 这使得物质维度x${format(getCEEff())}) (奇点效果指数:${format(getCEEffExp(),3)})`)
    for(i in basicDimNums){
        w("cd"+i,getBasicDimDesp("奇点",i,"奇点能量",cdMult[i],player.cd[i].procmult,player.cd[i].num,sc("cd",player.cd[i].level,false))+"&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+getBasicBuyButtonDesp(showBulkBuy(player.cp,CDcost[i],player.cd[i].level,CDcostMult[i]),"塌缩点数"))
        if(bulkBuy(player.cp,CDcost[i],player.cd[i].level,CDcostMult[i]).bulk.gte(1)) grey("cd"+i,["dim"])
        else normal("cd"+i,["dim"])
    }
    var cost = getCpBoosterCostAndCostInc().cost
    var costInc = getCpBoosterCostAndCostInc().costInc
    w("cpBooster",`您有${format(sc("cpBooster",player.cpBooster,false))}个塌缩点倍增器,使得塌缩点x${format(getCpBoosterEff())}(效果底数:${format(getCuBoosterEffBase(),3)}). 购买${format(showBulkBuy(player.cp,cost,player.cpBooster,costInc).bulk)}个 总价格:${format(showBulkBuy(player.cp,cost,player.cpBooster,costInc).cost)}${hasRl3Upgrade(31)?"":" 您必须拥有cu31才能购买/起效!"}`)
    if(!hasRl3Upgrade(31)) red("cpBooster",["dim"])
    else if(bulkBuy(player.cp,cost,player.cpBooster,costInc).bulk.gte(1)) grey("cpBooster",["dim"])
    else normal("cpBooster",["dim"])
    w("cp_quickView1",`您拥有 ${formatWhole(player.cp)} 塌缩点`)
}