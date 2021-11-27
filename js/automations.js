var automations = {
    bd0:{
        unlocked(){return hasRl3Chall(10)||hasRl4Milestone(2)},
        on:true,
        automate(){
            if(this.unlocked() && this.on) buybd(0)
        }
    },    
    bd1:{
        unlocked(){return hasRl3Chall(10)||hasRl4Milestone(2)},
        on:true,
        automate(){
            if(this.unlocked() && this.on) buybd(1)
        }
    },
    bd2:{
        unlocked(){return hasRl3Chall(11)||hasRl4Milestone(2)},
        on:true,
        automate(){
            if(this.unlocked() && this.on) buybd(2)
        }
    },
    bd3:{
        unlocked(){return hasRl3Chall(11)||hasRl4Milestone(2)},
        on:true,
        automate(){
            if(this.unlocked() && this.on) buybd(3)
        }
    },
    td0:{
        unlocked(){return hasRl3Chall(20)||hasRl4Milestone(2)},
        on:true,
        automate(){
            if(this.unlocked() && this.on) buytd(0)
        }
    },
    td1:{
        unlocked(){return hasRl3Chall(20)||hasRl4Milestone(2)},
        on:true,
        automate(){
            if(this.unlocked() && this.on) buytd(1)
        }
    },
    td2:{
        unlocked(){return hasRl3Chall(21)||hasRl4Milestone(2)},
        on:true,
        automate(){
            if(this.unlocked() && this.on) buytd(2)
        }
    },
    td3:{
        unlocked(){return hasRl3Chall(21)||hasRl4Milestone(2)},
        on:true,
        automate(){
            if(this.unlocked() && this.on) buytd(3)
        }
    },
    rl1:{
        unlocked(){return hasRl3Chall(30)||hasRl4Milestone(2)},
        on:true,
        automate(){
            if(this.unlocked() && this.on){
                if(hasRl3Chall(40)||hasRl4Milestone(2)) player.rl1 = player.rl1.max(player.mass)
                else player.rl1 = player.rl1.max(player.mass.sqrt())
            }
        }
    },
    rl2:{
        unlocked(){return hasRl3Chall(31)||hasRl4Milestone(2)},
        on:true,
        automate(){
            if(this.unlocked() && this.on){
                if(hasRl3Chall(41)||hasRl4Milestone(2)) player.rl2 = player.rl2.max(player.mass)
                else player.rl2 = player.rl2.max(player.mass.sqrt())
            }
        }
    },
    cpBooster:{
        unlocked(){return hasRl4Milestone(3)},
        on:true,
        automate(){
            if(this.unlocked() && this.on){
                buyCpBooster()
            }
        }
    },
    cd:{
        unlocked(){return hasRl4Milestone(4)},
        on:true,
        automate(){
            if(this.unlocked() && this.on){
                buyMaxcd()
            }
        }
    },
    bc:{
        unlocked(){return hasRl4Milestone(6)},
        on:true,
        automate(){
            if(this.unlocked() && this.on && player.mass.gte(getRl3Req())){
                player.cp = player.cp.add(getCPGain().mul(hasRl4Milestone(7)?0.1:0.025).mul(diff))
                player.acp = player.acp.add(getACPGain().mul(hasRl4Milestone(7)?0.1:0.025).mul(diff))
            }
        }
    },
    mi:{
        unlocked(){return hasRl4Milestone(9)},
        on:true,
        automate(){
            if(this.unlocked() && this.on && player.cp.gte(getRl4Req()) && player.rl4chall == null){
                player.mirrorMatter = player.mirrorMatter.add(getMMGain().mul(0.025).mul(diff))
                player.mirrorShard = player.mirrorShard.add(getMSGain().mul(0.025).mul(diff))
                player.mirrorizeTimes = player.mirrorizeTimes.add(mirrorizeTimesGain().mul(0.025).mul(diff))
            }
        }
    },
}

function updateAuto(){
    if(player.auto=="on") for(i in automations) automations[i].automate()
    w("autoStat",player.auto=="on"?"":"<warning class='redText'>自动化已禁用!请检查设置.</warning>")
}