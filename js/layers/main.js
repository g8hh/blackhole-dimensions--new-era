var dimNerf = 2 //维度间产量变为其二次根

function updateMain(){
    updatetd()
    updatebd()
    updateTab()
    updaterl1()
    updaterl2()
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
}

function hotkey()  {  
var a=window.event.keyCode;  
//64+字母序数
if(a==77){  
if(SecondTab == "黑洞维度") buyMaxbd()
if(SecondTab == "时间维度") buyMaxtd()
}
}
document.onkeydown = hotkey;