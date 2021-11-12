var dimNerf = n(2) //维度间产量变为其二次根
function getDimNerf(){
    var nerf = n(2)
    if(inRl3Chall(13)) nerf = nerf.mul(getRl3ChallEff(13))
    if(inRl3Chall(34)) nerf = nerf.mul(getRl3ChallEff(34))
    return nerf
}

function updateMain(){
    player.t = player.t.add(diff)
    updateTab()
    updatesc()  

    updaterl3cha()

    updatetd()
    updatebd()

    updateAuto()

    updaterl1()
    updaterl2()

    updaterl3()
    updatecd()

    updaterl4()
    updatemd()
    updaterl4milestone()
    updateRl4Chall()

    dimNerf = getDimNerf()
    w("devSpeed",player.devSpeed.eq(1)?"":"调试速度:"+format(player.devSpeed)+"x ")
    w("offlineSpeedup",(player.offlineSpeedup.lte(0)?"":`离线加速剩余:${formatTime(player.offlineSpeedup)}`)+(player.ToggleOfflineSpeedup == "off"&&player.offlineSpeedup.gt(0)? ` 离线加速未启用.(预计加速倍率:x${format(getTimeSpeed(true))})` : (player.offlineSpeedup.lte(0)?"":` 使得游戏速率x${format(getTimeSpeed())}`)))
}

function updateTab(){
    if(FirstTab == "设置"){
        open("subtab_settings")
    }else{
        close("subtab_settings")
    }
    if(FirstTab == "物质维度"){
        open("subtab_md")
    }else{
        close("subtab_md")
    }
    if(player.bestMass.gte(Number.MAX_VALUE)){
        normal("tab_rl3",["tab"])
    }else{
        red("tab_rl3",["tab"])
    }
    if(FirstTab == "塌缩"){
        open("subtab_rl3")
    }else{
        close("subtab_rl3")
    }
    if(hasRl3Chall(51) || player.mirrorize){
        normal("tab_rl4",["tab"])
    }else{
        red("tab_rl4",["tab"])
    }
    if(FirstTab == "镜面"){
        open("subtab_rl4")
    }else{
        close("subtab_rl4")
    }
}

function hotkey(){  
    var a=window.event.keyCode;  
    //64+字母序数
    //alert(a)
    switch(a){
        //M
        case 77:
            if(SecondTab == "黑洞维度") buyMaxbd()
            if(SecondTab == "时间维度") buyMaxtd()
            break;

        //F12
        //case 123:
            player.devSpeed = zero
            while(true) alert("请勿点击F12!请刷新游戏.")
    }
}
document.onkeydown = hotkey;