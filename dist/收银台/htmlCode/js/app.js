var Main = {
    data() {
        return {
            payment: "ebank",
            // 网银转账
            forms: {
                money: "500.00", //充值金额
                ordernumber: "123456789123456789", //订单号
                payee: "张三", //收款人
                bankname: "工商银行", //银行信息
                banknumber: "8888 8888 8888 8888 88", //银行卡号
                message: "阿拉蕾" //附言
            },
            d: null,
            h: null,
            m: null,
            s: null,
            endDate: new Date(new Date().getTime() + 1000 * 60 * 10), //倒计时  默认  十分钟

        };
    },
    computed: {
        QRcode_past() {
            return this.d == 0 && this.h == 0 && this.m == 0 && this.s == 0 ? !0 : !1;
        }
    },
    mounted() {
        this.countTime();
    },
    methods: {
        //倒计时
        countTime() {
            //获取当前时间
            var now = new Date();
            //设置截止时间
            var end = this.endDate.getTime();
            //时间差
            var leftTime = end - now;
            //定义变量 d,h,m,s保存倒计时的时间
            if (leftTime >= 0) {
                this.d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
                this.h = Math.floor((leftTime / 1000 / 60 / 60) % 24);
                this.m = Math.floor((leftTime / 1000 / 60) % 60);
                this.s = Math.floor((leftTime / 1000) % 60);
            }
            // console.log(this.s);
            //递归每秒调用countTime方法，显示动态时间效果
            setTimeout(this.countTime, 1000);
        },
        //复制
        copy() {
            this.$message.closeAll();
            var clipboard = new ClipboardJS(".copy");
            clipboard.on("success", e => {
                //复制成功
                this.$message({
                    message: "复制成功",
                    type: "success"
                });
                // e.clearSelection();
                clipboard.destroy(); // 释放内存
            });
            clipboard.on("error", e => {
                // 不支持复制
                this.$message({
                    message: "当前环境不支持自动复制",
                    type: "warning"
                });
            });
        }
    }
};
var Ctor = Vue.extend(Main)
new Ctor().$mount('#app')