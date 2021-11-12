var allChallDiff = n(1)

function getAllChallDiff(){
    var diffcultity = one
    if(inRl3Chall(40)) diffcultity = diffcultity.add(1)
    if(inRl3Chall(41)) diffcultity = diffcultity.add(1)
    if(inRl3Chall(42)) diffcultity = diffcultity.add(15)
    if(inRl3Chall(43)) diffcultity = diffcultity.add(5.75)
    if(inRl3Chall(44)) diffcultity = diffcultity.add(1.1)
    if(inRl3Chall(51)) diffcultity = n(0.725)
    return diffcultity
}
var rl3chall = {
    10:{desp(){return `时间碎片效果指数/${format(this.eff())}<br>奖励:黑洞零+一维自动化`},eff(){return n(1.1).pow(allChallDiff)}},
    11:{desp(){return `所有维度倍率基于维度序数获得减益.(/${format(this.eff())}^x)<br>奖励:黑洞二+三维自动化`},eff(){return n(3).pow(allChallDiff.add(1).pow(2.5).sub(4.66))}},
    12:{desp(){return `对于时间扭曲效果的物质计数变为其${format(this.eff())}次根.(即物质在效果公式里开根)<br>奖励:无.`},eff(){return n(2).pow(allChallDiff)}},
    13:{desp(){return `维度互相生产量变为其${format(this.eff())}次根,但同时黑洞低维倍率被黑洞高维购买倍率的${format(this.eff())}次根倍增.<br>奖励:无.`},eff(){return n(2).pow(allChallDiff.pow(0.5))}},
    14:{desp(){return `cX4的挑战都会很有新意(?<br>物质上限变为其1.5次根,挑战目标改为:使时间碎片达到${format(this.eff())}(随物质要求变动).<br>奖励:cu13,23,33,43也对奇点维度生效`},eff(){return getRl3Req().pow(allChallDiff)},specialGoal(){return player.ts.gte(this.eff())}},
    20:{desp(){return `新增变量*时间速率*.每当你购买一个物质维度时,该时间速率/${format(this.eff())},因此产生的时间速率减益每秒^0.8.该减益最低为e-10.(当前:/${format(player.c20Nerf,2,true)})<br>奖励:时间零+一维自动化`},eff(){return n(1.05).pow(allChallDiff)},update(){player.c20Nerf = player.c20Nerf.pow(n(0.8).pow(diff))}},
    21:{desp(){return `新增变量*t*(t=距离上次重置的时间).时间速率除以[(t^${format(this.eff())})/lg(质量+10)+1].(当前:/${format(this.totalEff(),2,true)})<br>奖励:时间二+三维自动化`},eff(){return n(1.25).pow(allChallDiff)},totalEff(){return player.t.pow(this.eff()).div(player.mass.add(10).log10()).add(1)}},
    22:{desp(){return `时间速率除以[${format(this.eff())}/1.1^(t^0.75)+1].<br>(当前:/${format(this.totalEff(),2,true)})<br>奖励:无`},eff(){return n(9).pow(allChallDiff)},totalEff(){return this.eff().div(n(1.1).pow(player.t.pow(0.75))).add(1)}},
    23:{desp(){return `时间三维无法购买.<br>奖励:无`}},
    24:{desp(){return `空间扭曲能且只能加成时间扭曲的物质计数,但其效果^${format(n(2**0.5).root(this.eff()))}(软上限后).时间维度sc1立即出现且强度变为其${format(this.eff().add(1))}倍.<br>奖励:无`},eff(){return n(0.5).mul(allChallDiff)}},
    30:{desp(){return `塌缩要求^${format(this.eff())},时间碎片在达到(质量^0.33)时会受到产量^0.5的减益.<br>奖励:您的时间扭曲的物质计数不再会低于物质^0.5.`},eff(){return n(1.5).pow(allChallDiff.sqrt())}},
    31:{desp(){return `时间维度倍率/lg(物质+10)^^${format(n(0.33).root(this.eff().mul(3).pow(0.5)).add(1))}^${format(this.eff())}(=${format(this.totalEff())}),奇点维度倍率/lg(物质+10).cu25的效果强制启用.<br>奖励:您的空间扭曲的物质计数不再会低于物质^0.5.`},eff(){return n(0.33).mul(allChallDiff)},totalEff(){return player.mass.add(10).log10().tetr(n(0.33).root(this.eff().mul(3).pow(0.5)).add(1)).pow(this.eff())}},
    32:{desp(){return `对黑洞维度和时间维度购买数量的sc2立即开始,且强度变为${format(this.eff().mul(100))}%<br>奖励:塌缩点倍增器底数+0.05.`},eff(){return n(1.25).pow(allChallDiff)}},
    33:{desp(){return `黑洞质量的sc3立即开始,且强度变为${format(this.eff().mul(100))}%<br>奖励:减弱塌缩升级的价格增长(指数/1.3).`},eff(){return n(0.3).mul(allChallDiff)}},
    34:{desp(){return `挑战还有意义么?奇点维度只加成时间维度,维度间产量变为其${format(this.eff())}次根,时间碎片效果变为其${format(this.eff())}次根,塌缩要求变为其${format(this.eff())}次方.<br>奖励:你真的还需要奖励么?空间扭曲sc1改成/2.`},eff(){return n(2.1).pow(allChallDiff.pow(0.5))}},
    40:{desp(){return `元0挑战-触发所有x-0挑战.挑战难度+100%.<br>奖励:c30奖励改为^1.`}},
    41:{desp(){return `元1挑战-触发所有x-1挑战.挑战难度+100%,且t不会低于10.<br>奖励:c31奖励改为^1.`},update(){player.t = player.t.max(10)}},
    42:{desp(){return `元2挑战-触发所有x-2挑战.挑战难度+1500%.<br>奖励:无.`}},
    43:{desp(){return `元3挑战-触发所有x-3挑战.挑战难度+575%.<br>奖励:无.`}},
    44:{desp(){return `元4挑战-触发所有x-4挑战.挑战难度+110%.<br>奖励:看看下方......`}},
    51:{desp(){
        if(!hasRl3Chall(44)) return "这是什么?你无法知道这个挑战的信息.或许这个挑战完成后会有什么新变化?元4挑战可能含有着这个挑战的信息.通过元4再来试试."
        return `时间线在收束...元元挑战-触发所有挑战.挑战难度锁死为72.5%.<br>奖励:击碎镜面世界...?(Tip:未制作.)`
    }},
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
    }else if(id == 51){
        for(i in rl3chall) player.activeChall.push(Number(i))
    }
    doRl3(true)
    player.chall = id
}
function exitRl3Chall(force = false){
    if(player.chall == null) return
    if(!force) if(!confirm("你确定要退出挑战么?这会强制进行一次塌缩重置,并且你不能从中获取塌缩点数.同样的,你无法完成这个挑战.")) return
    doRl3(true)
    player.chall = null
    player.activeChall = []
}
function inRl3Chall(id){
    return player.activeChall.includes(id) || player.chall == id
}
function hasRl3Chall(id){
    return player.challComp.includes(id)
}
function getRl3ChallEff(id){
    return rl3chall[id].eff()
}
function getRl3ChallTotalEff(id){
    return rl3chall[id].totalEff()
}

function checkRl3Chall(){
    if(!player.chall) return
    if(!rl3chall[player.chall]) return
    if(rl3chall[player.chall].specialGoal){
        if(rl3chall[player.chall].specialGoal()){
            if(!player.challComp.includes(player.chall)){player.challComp.push(player.chall);exitRl3Chall(true)}
        }
    }else if(!player.challComp.includes(player.chall)) if(player.mass.gte(getRl3Req())){player.challComp.push(player.chall);exitRl3Chall(true)}
}

function updaterl3cha(){
    allChallDiff = getAllChallDiff()
    checkRl3Chall()
    if(player.activeChall) for(i in player.activeChall) if(rl3chall[player.activeChall[i]]) if(rl3chall[player.activeChall[i]].update) rl3chall[player.activeChall[i]].update()
    if(SecondTab!="塌缩挑战") return close("rl3chall")
    open(`rl3chall`)
    for(i in rl3chall){
        i = Number(i)
        w(`c`+i,`c${i}<br> ${rl3chall[i].desp()} <br>${player.chall==i?"*您在该挑战中*":inRl3Chall(i)?"*该挑战被其他挑战触发*":hasRl3Chall(i)?"该挑战已完成":"该挑战未启用"}`)
        if(i == 51){
            if(player.chall == i) red(`c`+i,[`META`])
            else if(inRl3Chall(i)) grey(`c`+i,[`META`])
            else if(hasRl3Chall(i)) lime(`c`+i,[`META`])
            else normal(`c`+i,[`META`])
        }
        else if(player.chall == i) red(`c`+i,[`upg`])
        else if(inRl3Chall(i)) grey(`c`+i,[`upg`])
        else if(hasRl3Chall(i)) lime(`c`+i,[`upg`])
        else normal(`c`+i,[`upg`])
    }
    if(player.mass.lt(getRl3Req())) red(`rl3`,[`dim`])
    else normal(`rl3`,[`dim`])
    if(!hasRl3Upgrade(14)) red(`tab_rl3dim`,[`tab`])
    else normal(`tab_rl3dim`,[`tab`])
}