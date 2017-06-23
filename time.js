class Time{
    getToday(){
        var dt = new Date();
        var year = dt.getFullYear();
        var month = dt.getMonth() + 1;
        var date = dt.getDate();
        return year + '-' + month + '-' + date + ' 00:00:00';
    }

    getDateByDiffFromToday(diff){
        var dt = new Date();
        var year = dt.getFullYear();
        var month = dt.getMonth() + 1;
        var date = dt.getDate();
        return year + '-' + month + '-' + (date + diff) + ' 00:00:00';
    }
}

module.exports = Time;
