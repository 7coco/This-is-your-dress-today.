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

    updateLastWearedAt(outer_id, under_id){
        var time = new Time();
        var today = time.getToday();
        var conn = this.conn;
        var outerQuery = "UPDATE `outerwears` SET `last_weared_at` = ? WHERE `id` = ?";
        var underQuery = "UPDATE `underwears` SET `last_weared_at` = ? WHERE `id` = ?";
        conn.query(outerQuery, [today, outer_id]);
        conn.query(underQuery, [today, under_id]);
    }
}

module.exports = Updater;
