class Assets {
  constructor (assetType, amount, level, souls, metal, oil, uranium, soulsupgrade, uraniumupgrade, upgrade, harvest, efficiency, variable1, type){
    this.assetType = assetType;
    this.amount = amount;
    this.level = level;
    this.souls = souls;
    this.metal = metal;
    this.oil = oil;
    this.uranium = uranium;
    this.soulsupgrade = soulsupgrade;
    this.uraniumupgrade = uraniumupgrade;
    this.upgrade = upgrade;
    this.harvest = harvest;
    this.efficiency = efficiency;
    this.variable1 = variable1;
    this.type = type;
    this.idle = function() {
      if (!end) {
        if(this.amount > 0) {
          if (this==miner||this==drill) {
            this.variable1 = metalAmount;
          }
          if (this==oilpump||this==oilrig) {
            this.variable1 = oilAmount;
          }
          this.variable1 += (this.efficiency / persek) * this.amount;
          if (this==miner||this==drill) {
            metalAmount = this.variable1;
          }
          if (this==oilpump||this==oilrig) {
            oilAmount = this.variable1;
          }
          objects();
          resources();
        }
      }
    };
    this.personnelupgrade = function() {
      if(soulsAmount >= this.soulsupgrade && uraniumAmount >= this.uraniumupgrade) {
          soulsAmount += -this.soulsupgrade;
          uraniumAmount += -this.uraniumupgrade;
          this.level ++;
          this.efficiency = this.efficiency * this.upgrade;
          this.soulsupgrade = this.soulsupgrade * exponentialtall;
          this.uraniumupgrade = this.uraniumupgrade * exponentialtall;
          soulsFun();
          objects();
          mfdsetup = mfd3;
          mfd();
      }
    };
    this.armoryupgrade = function() {
      if(soulsAmount >= this.soulsupgrade && uraniumAmount >= this.uraniumupgrade) {
        soulsAmount += this.amount * this.metal;
        uraniumAmount += -this.uraniumupgrade;
        this.amount = 0;
        soulsAmount += -this.soulsupgrade;
        this.metal = this.metal * 1.5;
        this.oil = this.oil * 1.5;
        this.uranium = this.uranium * 1.5;
        this.level ++;
        this.souls = this.souls * this.upgrade;
        this.soulsupgrade = this.soulsupgrade * exponentialtall;
        this.uraniumupgrade = this.uraniumupgrade * exponentialtall;
        soulsFun();
        objects();
        mfdsetup = mfd3;
        mfd();
      }
    };
    this.purchasefun = function() {
      if(!clickmax) {
        for (var i = 0; i < clickAmount; i++) {
          if (metalAmount >= this.metal && oilAmount >= this.oil && uraniumAmount >= this.uranium) {
            this.amount ++;
            metalAmount += -this.metal;
            oilAmount += -this.oil;
            uraniumAmount += -this.uranium;
            objects();
            resources();
            mfdsetup = mfd1; //nekter å oppdatere siden om jeg ikke gjentar at den er på mfd1 selv om den alerede er på mfd1, usikker kilde til feil.
            mfd();
          }
        }
      }
      if (clickmax) {
        if (this.uranium == 0) {
          maxtimes =  Math.min(Math.floor(metalAmount / this.metal), Math.floor(oilAmount / this.oil));
          this.amount += maxtimes;
          metalAmount += -this.metal * maxtimes;
          oilAmount += -this.oil * maxtimes;
          objects();
          resources();
          mfdsetup = mfd1; //nekter å oppdatere siden om jeg ikke gjentar at den er på mfd1 selv om den alerede er på mfd1, usikker kilde til feil.
          mfd();
        }
        else{
          maxtimes =  Math.min(Math.floor(metalAmount / this.metal), Math.floor(oilAmount / this.oil), Math.floor(uraniumAmount / this.uranium));
          this.amount += maxtimes;
          metalAmount += -this.metal * maxtimes;
          oilAmount += -this.oil * maxtimes;
          uraniumAmount += -this.uranium * maxtimes;
          objects();
          resources();
          mfdsetup = mfd1; //nekter å oppdatere siden om jeg ikke gjentar at den er på mfd1 selv om den alerede er på mfd1, usikker kilde til feil.
          mfd();
        }
      }
    };
    this.purchasefun2 = function(){
      if (!clickmax) {
        for (var i = 0; i < clickAmount; i++) {
          if (soulsAmount >= this.souls) {
            this.amount ++;
            soulsAmount += -this.souls;
            this.souls = this.souls * increasevar;
          }
        }
      }
      if (clickmax) {
        n = Math.floor((Math.log(increasevar * soulsAmount - soulsAmount + this.souls) - Math.log(this.souls)) / Math.log(increasevar));
        sumPrice = ((Math.pow(increasevar,n)) * this.souls - this.souls) / (increasevar - 1);
        this.amount += n;
        soulsAmount += -sumPrice;
      }
      objects();
      soulsFun();
      mfdsetup = mfd2; //nekter å oppdatere siden om jeg ikke gjentar at den er på mfd1 selv om den alerede er på mfd1, usikker kilde til feil.
      mfd();
    };
  }
}
