(function (_window) {
    //月 德语映射
    let MonatMap = ['JANUAR', 'FEBRUAR', 'MÄRZ', 'APRIL', 'MAI', 'JUNI', 'JULI', 'AUGUST', 'SEPTEMBER', 'OKTOBER', 'NOVEMBER', 'DEZEMBER'];
    //星期 德语映射
    let WocheMap = ['MONTAG', 'DIENSTAG', 'MITTWOCH', 'DONNERSTAG', 'FREITAG', 'SAMSTAG', 'SONNTAG'];
    _window.COMMOM = {
        //接收时间戳 转换 日期格式
        // DIENSTAG, 5. NOVEMBER 2019
        Time2Str: (val) => {
            let r = WocheMap[new Date(val).getDay()]
                + ', ' + new Date(val).getDate()
                + '. ' + MonatMap[new Date(val).getMonth()]
                + ' ' + new Date(val).getFullYear();
            return r;
        },
        //接收秒  time
        timeFormat: (time) => {
            if (typeof time !== 'number') {
                return time
            }
            let day = Math.floor(time / (60 * 60 * 24))
            if (day < 10) {
                day = '0' + day
            }
            let hour = Math.floor(time / (60 * 60))
            if (hour < 10) {
                hour = '0' + hour
            }
            let min = Math.floor(time % 3600 / 60)
            if (min < 10) {
                min = '0' + min
            }
            let sec = time % 60
            if (sec < 10) {
                sec = '0' + sec
            }
            return [day, hour, min, sec]
        }
    }
})(window)