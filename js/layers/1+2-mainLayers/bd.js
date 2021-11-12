var bdMult = {}
var BDcost = [n(10),n(1000),n(1e9),n(1e64)]
var BDcostMult = [n(100),n(1000),n(1e4),n(1e8)]
function getBCTickspeed(){
    var tickspeed = n(1)
    if(inRl3Chall(20)) tickspeed = tickspeed.div(player.c20Nerf.max(1e-10))
    if(inRl3Chall(21)) tickspeed = tickspeed.div(getRl3ChallTotalEff(21))
    if(inRl3Chall(22)) tickspeed = tickspeed.div(getRl3ChallTotalEff(22))
    if(hasRl3Upgrade(55)) tickspeed = tickspeed.mul(cuEff(55))
    return tickspeed
}

function getMinMass(){
    var min = n(0)
    if(hasRl3Upgrade(25) || inRl3Chall(31)) min = cuEff(25).minMass
    return min
}

function buyMaxbd(){
    for(i in basicDimNums) buybd(i)
    if(hasRl3Upgrade(21)) for(i in basicDimNums) buytd(i)
}
function getAllbdMult(){
    var mult = n(1)
    mult = mult.mul(getRl1Mult())
    mult = mult.mul(getCEEff())
    mult = mult.mul(getENEff())
    return mult
}
function getAnybdMult(dimNum,special = null){
    if(special == "c12"){
        dimNum = Number(dimNum)
        var mult = n(1)
        var level = sc("bd",player.bd[dimNum].level)
        mult = mult.mul(getbdLevelBoostBase(dimNum).pow(level))
        mult = mult.mul(getTSEff(dimNum))
        return mult
    }
    dimNum = Number(dimNum)
    var mult = bdMult.all
    var level = sc("bd",player.bd[dimNum].level)
    mult = mult.mul(getbdLevelBoostBase().pow(level))
    mult = mult.mul(getTSEff(dimNum))
    
    if(inRl3Chall(11)) mult = mult.div(getRl3ChallEff(11).pow(dimNum))
    if(inRl3Chall(13)) if(dimNum < 3) mult = mult.mul(getAnybdMult(dimNum+1,"c12").root(getRl3ChallEff(13)))

    return mult
}
function getbdLevelBoostBase(dimNum){
    var base = n(2)
    if(hasRl3Upgrade(13)) base = base.add(cuEff(13))
    if(hasRl3Upgrade(23)) base = base.add(cuEff(23))
    if(hasRl3Upgrade(33)) base = base.add(cuEff(33))
    if(hasRl3Upgrade(43)) base = base.add(cuEff(43))

    base = base.mul(getAMEff())
    return base
}
function buybd(dimNum){
    var bulkStat = bulkBuy(player.mass,BDcost[dimNum],player.bd[dimNum].level,BDcostMult[dimNum])
    if(bulkStat.bulk.lt(1)) return
    player.bd[dimNum].num = player.bd[dimNum].num.add(bulkStat.bulk)
    player.bd[dimNum].level = player.bd[dimNum].level.add(bulkStat.bulk)
    if(!hasRl4Milestone(1)) player.mass = player.mass.sub(bulkStat.cost)

    if(inRl3Chall(20)) player.c20Nerf = player.c20Nerf.mul(getRl3ChallEff(20).pow(bulkStat.bulk))

}
function updatebd(){
    //计算部分!
    var proc = n(1)
    bdMult.all = getAllbdMult()
    for(i in basicDimNums) bdMult[i] = getAnybdMult(i)
    for(i in basicDimNums){
        i = Number(i)
        if(i<=2) player.bd[i].num = player.bd[i].num.add(player.bd[i+1].num.mul(bdMult[i+1]).root(dimNerf).mul(diff).mul(getBCTickspeed()).div(10))
        player.bd[i].procmult = player.bd[i].procmult.add(player.bd[i].num.mul(bdMult[i]).mul(diff).mul(getBCTickspeed()))
        proc = proc.mul(player.bd[i].procmult)
    }

    //rl2!
    if(!inRl3Chall(24)) proc = proc.pow(getRl2Exp())
    //sc
    proc = sc("mass",proc)

    player.mass = player.mass.add(proc.mul(diff).mul(getBCTickspeed())).max(getMinMass())
    if((!hasRl3Upgrade(52)||player.chall!=null)&&!(player.mirrorize&&hasRl3Upgrade(42))) player.mass = player.mass.min(getMaxMass())
    if(!player.mirrorize) player.mass = player.mass.min("e20000")
    player.bestMass = player.bestMass.max(player.mass)

    //显示部分!
    if(player.bestMass.gte(Number.MAX_VALUE)) w(`BCTickspeed`,`塌缩层级时间速率:x${format(getBCTickspeed(),2,true)}`)
    else w(`BCTickspeed`,``)
    w("massNum",`${format(player.mass,0)}`)
    w("massProc",`(+ ${format(proc,0)} /s)`)
    if(SecondTab!="黑洞维度") return close("bd")
    open("bd")
    for(i in basicDimNums){
        w("bd"+i,getBasicDimDesp("黑洞",i,"物质",bdMult[i],player.bd[i].procmult,player.bd[i].num,sc("bd",player.bd[i].level,false))+"&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+getBasicBuyButtonDesp(showBulkBuy(player.mass,BDcost[i],player.bd[i].level,BDcostMult[i]),"物质"))
        if(bulkBuy(player.mass,BDcost[i],player.bd[i].level,BDcostMult[i]).bulk.gte(1)) grey("bd"+i,["dim"])
        else normal("bd"+i,["dim"])
    }
}