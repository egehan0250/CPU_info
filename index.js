const os = require("os");
const chalk = require("chalk");
const Box = require("cli-box");
const si = require('systeminformation');

const cpu = os.cpus();
const cpuModel = cpu[0].model;
const cpuSpeed = cpu[0].speed;
const cpuCores = cpu.length;

const cpuUsage = async () => {
  try {
    const usage = await si.currentLoad();
    return usage.currentload;
  } catch (err) {
    throw err;
  }
};

const cpuAveragePercent = async () => {
  try {
    const start = await si.currentLoad();
    await new Promise(resolve => setTimeout(resolve, 1000));
    const end = await si.currentLoad();
    const idleDifference = end.currentload - start.currentload;
    return 100 - Math.floor(idleDifference);
  } catch (err) {
    throw err;
  }
};

const cpuTemperature = async () => {
    try {
      const data = await si.cpuTemperature();
      const firstCoreTemperature = data.cores[0]?.temperature || "N/A";
      return firstCoreTemperature;
    } catch (err) {
      throw err;
    }
  };
  

const cpuFree = async () => {
  try {
    const data = await si.currentLoad();
    return 100 - data.currentload;
  } catch (err) {
    throw err;
  }
};

const cpuCurrentSpeed = async () => {
    try {
      const data = await si.cpu();
      return data.speed;
    } catch (err) {
      throw err;
    }
  };

const cpuCoreCount = async () => {
  try {
    const data = await si.cpu();
    return data.cores;
  } catch (err) {
    throw err;
  }
};

const cpuFullLoad = async () => {
  try {
    const data = await si.currentLoad();
    return data.currentload;
  } catch (err) {
    throw err;
  }
};

const cpuStatic = async () => {
  try {
    const data = await si.cpu();
    return data;
  } catch (err) {
    throw err;
  }
};
const cpuDynamic = async () => {
    try {
      const data = await si.cpu();
      return data.speed;
    } catch (err) {
      throw err;
    }
  };
  

const cpuGetDynamic = async () => {
    try {
      const data = await si.cpu();
      return data.speed;
    } catch (err) {
      throw err;
    }
  };
  

const cpuGetUsage = async () => {
  try {
    const data = await si.currentLoad();
    return {
      percent: data.currentload,
      seconds: data.ms
    };
  } catch (err) {
    throw err;
  }
};

const cpuGetFree = async () => {
  try {
    const data = await si.currentLoad();
    return 100 - data.currentload;
  } catch (err) {
    throw err;
  }
};

const cpuGetTemperature = async () => {
    try {
      const data = await si.cpuTemperature();
      if (data.cores.length > 0 && data.cores[0].hasOwnProperty('temperature')) {
        return data.cores[0].temperature;
      } else {
        return 'N/A'; 
      }
    } catch (err) {
      throw err;
    }
  };

  const cpuGetCurrentSpeed = async () => {
    try {
      const data = await si.cpu();
      if (data.cpus && data.cpus.length > 0) {
        return data.cpus.map(cpu => cpu.speed);
      } else {
        return ['N/A']; 
      }
    } catch (err) {
      throw err;
    }
  };
  

const cpuGetCoreCount = async () => {
  try {
    const data = await si.cpu();
    return data.cores;
  } catch (err) {
    throw err;
  }
};

const cpuGetFullLoad = async () => {
  try {
    const data = await si.currentLoad();
    return data.currentload;
  } catch (err) {
    throw err;
  }
};

const cpuGetAll = async () => {
    try {
        const cpuModel = cpu[0].model;
        const cpuSpeed = cpu[0].speed;
        const cpuCores = cpu.length;
        const cpuUsageInfo = await cpuUsage();
        const cpuAverageInfo = await cpuAveragePercent();
        const cpuTemperatureInfo = await cpuTemperature();
        const cpuFreeInfo = await cpuFree();
        const cpuCurrentSpeedInfo = await cpuCurrentSpeed();
        const cpuCoreCountInfo = await cpuCoreCount();
        const cpuFullLoadInfo = await cpuFullLoad();
        const cpuStaticInfo = await cpuStatic();
        const cpuDynamicInfo = await cpuDynamic();
        const cpuGetDynamicInfo = await cpuGetDynamic();
        const cpuGetUsageInfo = await cpuGetUsage();
        const cpuGetFreeInfo = await cpuGetFree();
        const cpuGetTemperatureInfo = await cpuGetTemperature();
        const cpuGetCurrentSpeedInfo = await cpuGetCurrentSpeed();
        const cpuGetCoreCountInfo = await cpuGetCoreCount();
        const cpuGetFullLoadInfo = await cpuGetFullLoad();
        
        return {
            cpuModel,
            cpuSpeed,
            cpuCores,
            cpuUsage: cpuUsageInfo,
            cpuAverage: cpuAverageInfo,
            cpuTemperature: cpuTemperatureInfo,
            cpuFree: cpuFreeInfo,
            cpuCurrentSpeed: cpuCurrentSpeedInfo,
            cpuCoreCount: cpuCoreCountInfo,
            cpuFullLoad: cpuFullLoadInfo,
            cpuStatic: cpuStaticInfo,
            cpuDynamic: cpuDynamicInfo,
            cpuGetDynamic: cpuGetDynamicInfo,
            cpuGetUsage: cpuGetUsageInfo,
            cpuGetFree: cpuGetFreeInfo,
            cpuGetTemperature: cpuGetTemperatureInfo,
            cpuGetCurrentSpeed: cpuGetCurrentSpeedInfo,
            cpuGetCoreCount: cpuGetCoreCountInfo,
            cpuGetFullLoad: cpuGetFullLoadInfo,
        };
    } catch (error) {
      throw error;
    }
  };
  
    

async function printAll() {
    const startTime = new Date();
    console.log(chalk.yellowBright(`CPU information retrieval now started...`));
  
    try {
      const cpuInfo = await cpuGetAll();
  
      const CpuBox = new Box({
        w: '100',
        h: 20,
        stringify: false,
        marks: {
          nw: '╭',
          n: '─',
          ne: '╮',
          e: '│',
          se: '╯',
          s: '─',
          sw: '╰',
          w: '│'
        },
        hAlign: 'left',
      }, `C P U   I N F O R M A T I O N
  
    ${chalk.white("CPU Model:")} ${chalk.greenBright(cpuInfo.cpuModel || 'N/A')}
    ${chalk.white("CPU Speed:")} ${chalk.greenBright(cpuInfo.cpuSpeed || 'N/A')}
    ${chalk.white("CPU Cores:")} ${chalk.greenBright(cpuInfo.cpuCores || 'N/A')}
    ${chalk.white("CPU Usage:")} ${chalk.greenBright(cpuInfo.cpuUsage || 'N/A')}%
    ${chalk.white("CPU Average:")} ${chalk.greenBright(cpuInfo.cpuAverage || 'N/A')}%
    ${chalk.white("CPU Temperature:")} ${chalk.greenBright(cpuInfo.cpuTemperature || 'N/A')}°C
    ${chalk.white("CPU Free:")} ${chalk.greenBright(cpuInfo.cpuFree || 'N/A')}%
    ${chalk.white("CPU Current Speed:")} ${chalk.greenBright(cpuInfo.cpuCurrentSpeed || 'N/A')}GHz
    ${chalk.white("CPU Core Count:")} ${chalk.greenBright(cpuInfo.cpuCoreCount || 'N/A')}
    ${chalk.white("CPU Full Load:")} ${chalk.greenBright(cpuInfo.cpuFullLoad || 'N/A')}%
    ${chalk.white("CPU Dynamic:")} ${chalk.greenBright(JSON.stringify(cpuInfo.cpuDynamic || 'N/A', null, 2))}
    ${chalk.white("CPU Get Dynamic:")} ${chalk.greenBright(JSON.stringify(cpuInfo.cpuGetDynamic || 'N/A', null, 2))}
    ${chalk.white("CPU Get Usage:")} ${chalk.greenBright(JSON.stringify(cpuInfo.cpuGetUsage || 'N/A', null, 2))}
    ${chalk.white("CPU Get Free:")} ${chalk.greenBright(cpuInfo.cpuGetFree || 'N/A')}%
    ${chalk.white("CPU Get Temperature:")} ${chalk.greenBright(cpuInfo.cpuGetTemperature || 'N/A')}°C
    ${chalk.white("CPU Get Current Speed:")} ${chalk.greenBright(cpuInfo.cpuGetCurrentSpeed || 'N/A')}GHz
    ${chalk.white("CPU Get Core Count:")} ${chalk.greenBright(cpuInfo.cpuGetCoreCount || 'N/A')}
    ${chalk.white("CPU Get Full Load:")} ${chalk.greenBright(cpuInfo.cpuGetFullLoad || 'N/A')}%
    `).stringify();
  
      const endTime = new Date();
      const elapsedTime = endTime - startTime;
  
      console.log(CpuBox);
      console.log(chalk.yellowBright(`CPU information retrieval took`) + chalk.greenBright(` ${elapsedTime}`) + chalk.yellowBright(` ms`));
    } catch (error) {
      console.error(chalk.red(`An error occurred: ${error.message}`));
    }
  }
  
  printAll();
