var tdMult = {}
var TDcost = [n(1e8),n(1e16),n(1e64),n(1e216)]
var TDcostMult = [n(10),n(100),(1e8),n(1e10)]
function buyMaxtd(){
    for(i in basicDimNums) buytd(i)
}
function getTSEffExp(){
    var exp = n(0.2)
    exp = exp.mul(getRl1Exp())
    return exp
}
function getTSEff(dimNum){
    dimNum = Number(dimNum)
    var eff = player.ts.add(1).pow(getTSEffExp()).root((dimNum+1)**0.5)
    if(dimNum == 3) eff = eff.cbrt().div(31.4).add(1)
    eff = powsoftcap(eff,n(1e10),2.5)
    return eff
}
function getAlltdMult(){
    var mult = n(1)
    mult = mult.mul(getRl1Mult())
    return mult
}
function getAnytdMult(dimNum){
    var mult = tdMult.all
    var level = player.td[dimNum].level
    if(level.gte(300)) level = level.div(1.5).add(100)
    level = powsoftcap(level,n(300),1.25)
    mult = mult.mul(gettdLevelBoostBase().pow(level))
    return mult
}
function gettdLevelBoostBase(dimNum){
    var base = n(2)
    return base
}
function buytd(dimNum){
    var bulkStat = bulkBuy(player.mass,TDcost[dimNum],player.td[dimNum].level,TDcostMult[dimNum])
    if(bulkStat.bulk.lt(1)) return
    player.td[dimNum].num = player.td[dimNum].num.add(bulkStat.bulk)
    player.td[dimNum].level = player.td[dimNum].level.add(bulkStat.bulk)
    player.mass = player.mass.sub(bulkStat.cost)
}
function updatetd(){
    //计算部分!
    var proc = n(1)
    tdMult.all = getAlltdMult()
    for(i in basicDimNums) tdMult[i] = getAnytdMult(i)
    for(i in basicDimNums){
        i = Number(i)
        if(i<=2) player.td[i].num = player.td[i].num.add(player.td[i+1].num.mul(tdMult[i+1]).root(dimNerf).mul(diff).div(10))
        player.td[i].procmult = player.td[i].procmult.add(player.td[i].num.mul(tdMult[i]).mul(diff))
        proc = proc.mul(player.td[i].procmult)
    }
    player.ts = player.ts.add(proc.mul(diff))

    //显示部分!
    if(SecondTab!="时间维度") return close("td")
    open("td")
    w("ts",`您有 ${format(player.ts,0)} 时间碎片(+ ${format(proc)} /s) 这使得黑洞维度x${format(getTSEff(0))}(对高维效果减弱)`)
    for(i in basicDimNums) w("td"+i,getBasicDimDesp("时间",i,"时间碎片",tdMult[i],player.td[i].procmult,player.td[i].num)+"&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+getBasicBuyButtonDesp(showBulkBuy(player.mass,TDcost[i],player.td[i].level,TDcostMult[i]),"物质"))
}