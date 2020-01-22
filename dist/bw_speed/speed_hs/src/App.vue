 <template>
  <div id="app">
    <div class="logo"></div>
    <div class="contents">
      <div class="speed-title">
        <div class="desc">网络状态</div>
        <div class="status-wrapper">
          <span class="status good">很好</span>
          <span class="status normal">一般</span>
          <span class="status range">较差</span>
        </div>
      </div>
      <div class="list">
        <ul>
          <li
            class="line-wrapper"
            :class="{first:index==0}"
            v-for="(item, index) in FastLine"
            :key="index"
          >
            <div class="list-left">
              <div
                class="line-number-wrapper"
                :class="item.pingLv==1?'good':item.pingLv==2?'normal':'range'"
              >
                <span class="line-number">线路{{index+1}}</span>
                <span
                  class="number"
                  :class="item.pingLv==1?'good':item.pingLv==2?'normal':'range'"
                >{{item.pingTime}}</span>
                <span class="text">ms</span>
                <span class="spacer"></span>
              </div>
              <div class="line-url-wrapper">
                <span class="login">登录网址:</span>
                <span class="url" @click="gotoUrl(item.host,'h5')">{{item.host}}</span>
                <span class="copy" @click="copyUrl($event,item.host)">复制</span>
              </div>
            </div>
            <div class="list-right" @click="gotoUrl(item.host)">前往</div>
          </li>
        </ul>
      </div>
    </div>
    <textarea
      id="copyWrapper"
      ref="copyWrapper"
      style="opacity: 0;position: fixed;bottom: 0"
      cols="30"
      rows="10"
    ></textarea>
  </div>
</template>

<script>
import axios from "axios";
import $ from "jquery";
export default {
  created() {
    this.GetLine();
  },
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
      if (this.linePingNum && this.linePingNum == this.lineDB.length) return r;
    }
  },
  methods: {
    gotoUrl(url, type) {
      if (type == "h5" && document.documentElement.clientWidth > 1080) return;
      location.href = url;
    },
    //计算 PingLv
    getPingLv(t) {
      if (t < 300) return 1;
      else if (t < 600) return 2;
      else return 3;
    },
    //获取
    async GetLine() {
      let { data } = await axios.get("./line.json");
      this.lineDB = data.map(item => {
        return { host: item, pingTime: "", pingLv: "" };
      });
      this.CalculateLine();
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
            let time = new Date().getTime() - curTime;
            if (textStatus == "parsererror") {
              v["pingTime"] = time;
              v["pingLv"] = this.getPingLv(time);
            } else if (textStatus == "timeout") {
              v["pingTime"] = this.timeout;
              v["pingStatus"] = "Timeout";
              v["pingLv"] = this.getPingLv(this.timeout);
            } else {
              v["pingTime"] = this.timeout;
              v["pingStatus"] = "DNS error";
              v["pingLv"] = this.getPingLv(this.timeout);
            }
            this.lineUpdata();
          }
        });
      });
    },
    copyUrl(e, val) {
      if (e.target.innerHTML == "复制成功") return;
      e.target.innerHTML = "复制成功";
      document.querySelector("#copyWrapper").innerHTML = val;
      document.querySelector("#copyWrapper").select();
      document.execCommand("copy");
    }
  }
};
</script>
<style lang="less">
@import url("App.less");
</style>