var dimNerf = 2 //维度间产量变为其二次根

function updateMain(){
    updatetd()
    updatebd()
    updateTab()
    updaterl1()
    updaterl2()
    updaterl3()
    updatecd()
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
}

function hotkey(){  
    var a=window.event.keyCode;  
    //64+字母序数
    if(a==77){  
        if(SecondTab == "黑洞维度") buyMaxbd()
        if(SecondTab == "时间维度") buyMaxtd()
    }
}
document.onkeydown = hotkey;