 <template>
  <div id="app">
    <div class="logo"></div>
    <div class="contents">
      <div class="list">
        <ul>
          <li v-for="(v,i) in lineDB" :key="v.host">
            <div
              :class="['speed'+v.pingLv,{'rec':FastLine&&FastLine.host==v.host}]"
              class="line"
              @click="gotoUrl(v)"
            >
              <span>线路{{i+1}}</span>
              <b>
                <template v-if="v.pingTime<timeout">{{ v.pingTime }}</template>
                <template v-if="v.pingTime>=timeout">{{ v.pingStatus }}</template>
              </b>
              <i v-show="v.pingLv&&v.pingTime<timeout">毫秒</i>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="foot">
      <p>©2018-2019 蓝星 版权所有 all right reserved</p>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  data() {
    return {
      timeout: 9999,
      lineDB: [],
      linePingNum: 0 //ping 记数
    };
  },
  computed: {
    //推荐线路
    FastLine() {
      let r = JSON.parse(JSON.stringify(this.lineDB));
      r.sort((a, b) => {
        return a.pingTime - b.pingTime;
      });
      if (this.linePingNum && this.linePingNum == this.lineDB.length)
        return r[0];
      else return {};
    }
  },
  methods: {
    gotoUrl(row) {
      // console.log(row);
      location.href = row.host;
    },
    //计算 PingLv
    getPingLv(t) {
      if (t < 300) return 1;
      else if (t < 600) return 2;
      else return 3;
    },
    //获取
    GetLine() {
      $.get(
        "./line.json",
        {
          t: new Date().getTime()
        },
        data => {
          let r = [];
          data.forEach(v => {
            r.push({ host: v, pingTime: "", pingLv: "" });
          });
          this.lineDB = r;
          this.CalculateLine();
        }
      );
    },
    //更新
    lineUpdata() {
      this.linePingNum++;
      this.lineDB.splice(0, 0);
    },
    //计算线路速度
    CalculateLine() {
      let curTime = new Date().getTime();
      this.lineDB.forEach(v => {
        $.ajax({
          url: v.host,
          dataType: "jsonp",
          timeout: this.timeout,
          complete: (XMLHttpRequest, textStatus) => {
            // console.log(XMLHttpRequest, textStatus);
            // console.log(textStatus, v.host);
            // timeout       超时
            // error         出错
            // notmodified   未修改
            // parsererror   语法错误
            let time = new Date().getTime() - curTime;
            if (textStatus == "parsererror") {
              //OK
              // console.log(v.host, time);
              v["pingTime"] = time;
              v["pingLv"] = this.getPingLv(time);
            } else if (textStatus == "timeout") {
              //超时
              // console.log(v.host, "timeout");
              v["pingTime"] = this.timeout;
              v["pingStatus"] = "Timeout";
              v["pingLv"] = this.getPingLv(this.timeout);
            } else {
              //域名异常
              // console.log(v.host, time, "DNS error");
              v["pingTime"] = this.timeout;
              v["pingStatus"] = "DNS error";
              v["pingLv"] = this.getPingLv(this.timeout);
            }
            this.lineUpdata();
          }
        });
        //
      });
    }
  },
  mounted() {
    this.GetLine();
  }
};
</script>
<style lang="less">
@import url("App.less");
</style>