var rl3chall = {
    10:{desp(){return `时间碎片效果指数/${format(this.eff())}<br>奖励:黑洞零维自动化`},eff(){return n(1.1)}},
    11:{desp(){return `所有维度倍率基于维度序数获得减益.(/${format(this.eff())}^x)<br>奖励:黑洞一维自动化`},eff(){return n(3)}},
    20:{desp(){return `新增变量*时间速率*.每当你购买一个物质维度时,该时间速率/${format(this.eff())},因此产生的时间速率减益每秒^0.8.时间速率最低为e-10.<br>奖励:时间零维自动化`},eff(){return n(1.1)},update(){player.c20Nerf = player.c20Nerf.pow(n(0.8).pow(diff))}},
}

function enterRl3Chall(id){
    if(!confirm("你确定要进入挑战么?这会强制进行一次塌缩重置,并且你不能从中获取塌缩点数.")) return
    player.activeChall = []
    var row = Math.floor(id/10)
    var col = id - row*10
    if(row<=3){
        for(i=col;i>=0;i--) player.activeChall.push(row*10+i)   
    }else if(row==4){
        for(i=1;i<=3;i++) player.activeChall.push(i*10+col)
    }else if(row==5){
        for(i in rl3chall) player.activeChall.push(i)
    }
    doRl3(true)
    player.chall = id
}
function exitRl3Chall(force = false){
    if(player.chall == null) return
    if(!confirm("你确定要退出挑战么?这会强制进行一次塌缩重置,并且你不能从中获取塌缩点数.同样的,你无法完成这个挑战.")) return
    doRl3(true)
    player.chall = null
    player.activeChall = []
}
function inRl3Chall(id){
    return player.activeChall.includes(id)
}
function hasRl3Chall(id){
    return player.challComp.includes(id)
}
function getRl3ChallEff(id){
    return rl3chall[id].eff()
}

function checkRl3Chall(){
    if(!player.chall) return
    if(rl3chall[player.chall].specialGoal){
        if(rl3chall[player.chall].specialGoal()){
            if(!player.challComp.includes(player.chall)){player.challComp.push(player.chall);exitRl3Chall(true)}
        }
    }else if(!player.challComp.includes(player.chall)) if(player.mass.gte(getRl3Req())){player.challComp.push(player.chall);exitRl3Chall(true)}
}

function updaterl3cha(){
    checkRl3Chall()
    if(player.activeChall) for(i in player.activeChall) if(rl3chall[player.activeChall[i]].update) rl3chall[player.activeChall[i]].update()
    if(SecondTab!="塌缩挑战") return close("rl3chall")
    open(`rl3chall`)
    for(i in rl3chall){
        i = Number(i)
        w(`c`+i,`c${i}<br> ${rl3chall[i].desp()} <br>${player.chall==i?"*您在该挑战中*":inRl3Chall(i)?"*该挑战被其他挑战触发*":hasRl3Chall(i)?"该挑战已完成":"该挑战未启用"}`)
        if(player.chall == i) red(`c`+i,[`upg`])
        else if(inRl3Chall(i)) grey(`c`+i,[`upg`])
        else if(hasRl3Chall(i)) lime(`c`+i,[`upg`])
        else normal(`c`+i,[`upg`])
    }
    if(player.mass.lt(getRl3Req())) red(`rl3`,[`dim`])
    else normal(`rl3`,[`dim`])
    if(!hasRl3Upgrade(14)) red(`tab_rl3dim`,[`tab`])
    else normal(`tab_rl3dim`,[`tab`])
}