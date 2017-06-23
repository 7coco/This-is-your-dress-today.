const Time = require('./time.js');

class Selector {
    constructor(conn) {
        this.conn = conn;
    }
    selectDress(temperature_zone){
        return new Promise((resolve) => {
            var conn = this.conn;
            var time = new Time();
            var today = time.getToday();
            var threeDaysAgo = time.getDateByDiffFromToday(-3);

            var query = '' +
                'SELECT `dresses`.`id` as dress_id, `outerwears`.name as outer_name, `outerwears`.`image_url` as outer_image_url, `underwears`.`image_url` as under_image_url FROM ' +
                    '((`dresses` LEFT JOIN `outerwears` on `dresses`.`outerwear_id` = `outerwears`.`id`) ' +
                    'LEFT JOIN `underwears` on `dresses`.`underwear_id` = `underwears`.`id`) ' +
                    'LEFT JOIN `inners` on `outerwears`.`inner_id` = `inners`.`id` ' +
                    'WHERE `underwears`.`is_washing` = 0 ' +
                        'AND `outerwears`.`is_washing` = 0 ' +
                        'AND `inners`.`is_washing` = 0 ' +
                        'AND `underwears`.`last_weared_at` < ? ' + // 3日以内に着ていない
                        'AND `outerwears`.`last_weared_at` < ? ' +  // 3日以内に着ていない
                        'AND `dresses`.`last_suggested_at` < ? ' +  // 今日提案済みではない
                        'AND `dresses`.`temperature_zone` < ? ';

            conn.query(query, [threeDaysAgo, threeDaysAgo, today, temperature_zone]).then((result) => {
                resolve(result[0][Math.floor(Math.random() * result[0].length)]);
            });
        });
    }

    selectPremiumDress(){

    }
}

module.exports = Selector;
