function toolDate(data) {
    data.forEach(toi => {
        if (toi.date !== undefined) {
            let k = toi.date.split('T')[0];
            toi.date = k.split("-").reverse().join("-");
        };
    })
    return data;
}

export default toolDate;