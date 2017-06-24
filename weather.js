class Weather {
    constructor(request){
        this.request = request;
        this.apiKey = process.env.OPEN_WEATHER_MAP_KEY;
        this.options = {
            url: `http://api.openweathermap.org/data/2.5/weather?id=1857105&units=metric&appid=${this.apiKey}`,
            json: true,
        }
    }

    getTemperetureZone(temperature){
        if(temperature < 13){ // 寒い！！
            return 1;
        } else if (temperature >= 13 && temperature < 20){ // 割と寒い
            return 2;
        }else if (temperature >= 20 && temperature < 25){ // ちょっと肌寒いかも
            return 3;
        }else if (temperature >= 25 && temperature < 29){ // 結構暑い
            return 4;
        }else if (temperature >= 29) { // 暑い！
            return 5;
        }
    }

    getTempereture(){
        return new Promise((resolve) => {
            this.request.get(this.options)
            .then((res) => {
                resolve(res.main.temp_max);
            }).catch((err) => {
                console.error(err);
            });
        });
    }
}
module.exports = Weather;
