
export function getMean(historicoDeConsumo: number[]) {
    var numberOfMonths = historicoDeConsumo.length

    if (numberOfMonths < 3) return 0;

    if (numberOfMonths > 12) {
        numberOfMonths = 12;
        historicoDeConsumo = historicoDeConsumo.slice(0,numberOfMonths);
    }
    
    const total = historicoDeConsumo.reduce((total, monthConsumption) => total + parseInt(`${monthConsumption}`), 0);
    
    return Math.round(total / numberOfMonths);
}