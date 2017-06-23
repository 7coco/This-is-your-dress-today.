class Updater {
    constructor(conn) {
        this.conn = conn;
    }
    updateLastSuggestedAt(dressId){
        var conn = this.conn;
        var dt = new Date();
        var year = dt.getFullYear();
        var month = dt.getMonth() + 1;
        var date = dt.getDate();
        var today = year + '-' + month + '-' + date + ' 00:00:00';
        var query = "UPDATE `dresses` SET `last_suggested_at` = ? WHERE `id` = ?";
        conn.query(query, [today, dressId]);
    }
}

module.exports = Updater;
