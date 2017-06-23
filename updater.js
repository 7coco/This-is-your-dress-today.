var Time = require('./time.js');

class Updater {
    constructor(conn) {
        this.conn = conn;
    }
    updateLastSuggestedAt(dressId){
        var time = new Time();
        var conn = this.conn;
        var today = time.getToday();
        var query = "UPDATE `dresses` SET `last_suggested_at` = ? WHERE `id` = ?";
        conn.query(query, [today, dressId]);
    }
}

module.exports = Updater;
