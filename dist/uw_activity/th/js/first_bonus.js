var firstBonus = new Vue({
	el: '#first_bonus',
	delimiters: ['${', '}'],
	data: {
		bonus: 0
	},
	computed: {
        isLogin: function isLogin() {
            return main.user.init && main.user.login;
        }
    },
	created: function () {
		this.check();
	},
	methods: {
		check: function() {
			var that = this;
			$.getJSON('/Promos/Detail?id=17&a=Check', function(res) {
				if (res.state) {
					that.bonus = res.data * 1;
                }
			});
		},
        claim: function() {
            var that = this;
            $.getJSON('/Promos/Detail?id=17&a=Claim', function(res) {
                if (res.state) {
                    layer.open({
						content: res.data,
						yes: function yes(index, layero) {
							layer.close(index);
							that.bonus = 0;
							that.check();
						}
					});
                }
            });
        }
	}
});