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
  }
}
