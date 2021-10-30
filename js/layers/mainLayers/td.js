var tdMult = {}
var TDcost = [n(1e8),n(1e16),n(1e64),n(1e216)]
var TDcostMult = [n(10),n(100),(1e8),n(1e10)]
function buyMaxtd(){
    for(i in basicDimNums) buytd(i)
    if(hasRl3Upgrade(21)) for(i in basicDimNums) buybd(i)
}    
function getTSEffExp(){
    var exp = n(0.2)
    exp = exp.mul(getRl1Exp())

    if(inRl3Chall(10)) exp = exp.div(getRl3ChallEff(10))
    if(inRl3Chall(34)) exp = exp.div(getRl3ChallEff(34))

    return exp
}
function getTSEff(dimNum){
    dimNum = Number(dimNum)
    var eff = player.ts.add(1).pow(getTSEffExp()).root((dimNum+1)**0.5)
    if(dimNum == 3) eff = eff.cbrt().div(31.4).sub(1**0.333/31.4).add(1)
    eff = sc("tsEff",eff)
    return eff
}
function getAlltdMult(){
    var mult = n(1)
    mult = mult.mul(getRl1Mult())
    if(hasRl3Upgrade(15)) mult = mult.mul(cuEff(15))
    if(hasRl3Upgrade(51)) mult = mult.mul(cuEff(51))
    mult = mult.mul(getCEEff())
    if(inRl3Chall(31)) mult = mult.div(getRl3ChallTotalEff(31))
    return mult
}
function getAnytdMult(dimNum){
    var mult = tdMult.all
    var level = sc("td",player.td[dimNum].level)
    mult = mult.mul(gettdLevelBoostBase(dimNum).pow(level))    

    if(inRl3Chall(11)) mult = mult.div(getRl3ChallEff(11).pow(dimNum))

    return mult
}
function gettdLevelBoostBase(dimNum){
    var base = n(2)
    if(hasRl3Upgrade(13)) base = base.add(cuEff(13))
    if(hasRl3Upgrade(23)) base = base.add(cuEff(23))
    if(hasRl3Upgrade(33)) base = base.add(cuEff(33))
    if(hasRl3Upgrade(43)) base = base.add(cuEff(43))
    return base
}
function buytd(dimNum){
    if(inRl3Chall(23)) if(dimNum == 3) return

    var bulkStat = bulkBuy(player.mass,TDcost[dimNum],player.td[dimNum].level,TDcostMult[dimNum])
    if(bulkStat.bulk.lt(1)) return
    player.td[dimNum].num = player.td[dimNum].num.add(bulkStat.bulk)
    player.td[dimNum].level = player.td[dimNum].level.add(bulkStat.bulk)
    player.mass = player.mass.sub(bulkStat.cost)

    if(inRl3Chall(20)) player.c20Nerf = player.c20Nerf.mul(getRl3ChallEff(20).pow(bulkStat.bulk))

}
function updatetd(){
    //计算部分!
    var proc = n(1)
    tdMult.all = getAlltdMult()
    for(i in basicDimNums) tdMult[i] = getAnytdMult(i)
    for(i in basicDimNums){
        i = Number(i)
        if(i<=2) player.td[i].num = player.td[i].num.add(player.td[i+1].num.mul(tdMult[i+1]).root(dimNerf).mul(diff).mul(getPreBCTickspeed()).div(10))
        player.td[i].procmult = player.td[i].procmult.add(player.td[i].num.mul(tdMult[i]).mul(diff).mul(getPreBCTickspeed()))
        proc = proc.mul(player.td[i].procmult)
    }
    if(inRl3Chall(30)) proc = powsoftcap(proc,player.mass.pow(0.33),2)
    proc = sc("ts",proc)
    player.ts = player.ts.add(proc.mul(diff).mul(getPreBCTickspeed()))
    

    //显示部分!
    if(SecondTab!="时间维度") return close("td")
    open("td")
    w("ts",`您有 ${format(player.ts,0)} 时间碎片(+ ${format(proc)} /s) ( 效果指数: ${format(getTSEffExp(),3)} ) 这使得黑洞维度时间速率x${format(getTSEff(0))}(对高维效果减弱)`)
    for(i in basicDimNums){
        w("td"+i,getBasicDimDesp("时间",i,"时间碎片",tdMult[i],player.td[i].procmult,player.td[i].num,sc("td",player.td[i].level,false))+"&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+getBasicBuyButtonDesp(showBulkBuy(player.mass,TDcost[i],player.td[i].level,TDcostMult[i]),"物质"))
        if(bulkBuy(player.mass,TDcost[i],player.td[i].level,TDcostMult[i]).bulk.gte(1)) grey("td"+i,["dim"])
        else normal("td"+i,["dim"])
    }
}