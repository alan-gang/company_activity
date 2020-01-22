require = function t(i, n, e) {
    function o(s, r) {
        if (!n[s]) {
            if (!i[s]) {
                var c = "function" == typeof require && require;
                if (!r && c) return c(s, !0);
                if (a) return a(s, !0);
                var d = new Error("Cannot find module '" + s + "'");
                throw d.code = "MODULE_NOT_FOUND", d
            }
            var h = n[s] = {
                exports: {}
            };
            i[s][0].call(h.exports, function(t) {
                var n = i[s][1][t];
                return o(n || t)
            }, h, h.exports, t, i, n, e)
        }
        return n[s].exports
    }
    for (var a = "function" == typeof require && require, s = 0; s < e.length; s++) o(e[s]);
    return o
}({
    LanguageData: [function(t, i, n) {
        "use strict";

        function e(t) {
            return window.i18n.languages[t]
        }

        function o(t) {
            t && (s ? s.replace(t) : s = new a({
                phrases: t,
                allowMissing: !0
            }))
        }
        cc._RF.push(i, "61de062n4dJ7ZM9/Xdumozn", "LanguageData");
        var a = t("polyglot.min"),
            s = null;
        window.i18n || (window.i18n = {
            languages: {},
            curLang: ""
        }), i.exports = {
            init: function(t) {
                if (!t || t !== window.i18n.curLang) {
                    var i = null;
                    t ? (i = e(t), window.i18n.curLang = t) : i = e(window.i18n.curLang), o(i)
                }
            },
            t: function(t, i) {
                if (s) return s.t(t, i)
            },
            inst: s,
            updateSceneRenderers: function() {
                for (var t = cc.director.getScene().children, i = [], n = 0; n < t.length; ++n) {
                    var e = t[n].getComponentsInChildren("LocalizedLabel");
                    Array.prototype.push.apply(i, e)
                }
                for (var o = 0; o < i.length; ++o) i[o].updateLabel();
                for (var a = [], s = 0; s < t.length; ++s) {
                    var r = t[s].getComponentsInChildren("LocalizedSprite");
                    Array.prototype.push.apply(a, r)
                }
                for (var c = 0; c < a.length; ++c) a[c].updateSprite(window.i18n.curLang)
            }
        }, cc._RF.pop()
    }, {
        "polyglot.min": "polyglot.min"
    }],
    LocalizedLabel: [function(t, i, n) {
        "use strict";
        cc._RF.push(i, "744dcs4DCdNprNhG0xwq6FK", "LocalizedLabel");
        var e = t("LanguageData");
        cc.Class({
            extends: cc.Component,
            editor: {
                executeInEditMode: !0,
                menu: "i18n/LocalizedLabel"
            },
            properties: {
                dataID: {
                    get: function() {
                        return this._dataID
                    },
                    set: function(t) {
                        this._dataID !== t && (this._dataID = t, this.updateLabel())
                    }
                },
                _dataID: ""
            },
            onLoad: function() {
                e.inst || e.init(), this.fetchRender()
            },
            fetchRender: function() {
                var t = this.getComponent(cc.Label);
                if (t) return this.label = t, void this.updateLabel()
            },
            updateLabel: function() {
                this.label ? e.t(this.dataID) && (this.label.string = e.t(this.dataID)) : cc.error("Failed to update localized label, label component is invalid!")
            }
        }), cc._RF.pop()
    }, {
        LanguageData: "LanguageData"
    }],
    LocalizedSprite: [function(t, i, n) {
        "use strict";
        cc._RF.push(i, "f34ac2GGiVOBbG6XlfvgYP4", "LocalizedSprite");
        var e = t("SpriteFrameSet");
        cc.Class({
            extends: cc.Component,
            editor: {
                executeInEditMode: !0,
                inspector: "packages://i18n/inspector/localized-sprite.js",
                menu: "i18n/LocalizedSprite"
            },
            properties: {
                spriteFrameSet: {
                    default: [],
                    type: e
                }
            },
            onLoad: function() {
                this.fetchRender()
            },
            fetchRender: function() {
                var t = this.getComponent(cc.Sprite);
                if (t) return this.sprite = t, void this.updateSprite(window.i18n.curLang)
            },
            getSpriteFrameByLang: function(t) {
                for (var i = 0; i < this.spriteFrameSet.length; ++i)
                    if (this.spriteFrameSet[i].language === t) return this.spriteFrameSet[i].spriteFrame
            },
            updateSprite: function(t) {
                if (this.sprite) {
                    var i = this.getSpriteFrameByLang(t);
                    !i && this.spriteFrameSet[0] && (i = this.spriteFrameSet[0].spriteFrame), this.sprite.spriteFrame = i
                } else cc.error("Failed to update localized sprite, sprite component is invalid!")
            }
        }), cc._RF.pop()
    }, {
        SpriteFrameSet: "SpriteFrameSet"
    }],
    SpriteFrameSet: [function(t, i, n) {
        "use strict";
        cc._RF.push(i, "97019Q80jpE2Yfz4zbuCZBq", "SpriteFrameSet");
        var e = cc.Class({
            name: "SpriteFrameSet",
            properties: {
                language: "",
                spriteFrame: cc.SpriteFrame
            }
        });
        i.exports = e, cc._RF.pop()
    }, {}],
    "audio-manager": [function(t, i, n) {
        "use strict";
        cc._RF.push(i, "aeda5yJA8pDHrrICUAWiy6R", "audio-manager");
        var e = cc.Class({
            extends: cc.Component,
            properties: {
                beep: {
                    default: null,
                    url: cc.AudioClip
                },
                go: {
                    default: null,
                    url: cc.AudioClip
                },
                goal: {
                    default: null,
                    url: cc.AudioClip
                },
                award: {
                    default: null,
                    url: cc.AudioClip
                },
                trans: {
                    default: null,
                    url: cc.AudioClip
                }
            },
            statics: {
                instance: null
            },
            onLoad: function() {
                e.instance = this
            },
            playBeep: function() {
                window.settings.SOUND && cc.audioEngine.playEffect(this.beep, !1)
            },
            playGo: function() {
                window.settings.SOUND && cc.audioEngine.playEffect(this.go, !1)
            },
            playGoal: function() {
                window.settings.SOUND && cc.audioEngine.playEffect(this.goal, !1)
            },
            playAward: function() {
                window.settings.SOUND && cc.audioEngine.playEffect(this.award, !1)
            },
            playTrans: function() {
                window.settings.SOUND && cc.audioEngine.playEffect(this.trans, !1)
            },
            stopAllSound: function() {
                cc.audioEngine.stopAll()
            }
        });
        cc._RF.pop()
    }, {}],
    background: [function(t, i, n) {
        "use strict";
        cc._RF.push(i, "0e222J6uf1O564QXcZVRzwB", "background"), cc.Class({
            extends: cc.Component,
            properties: {
                backanim: {
                    default: [],
                    type: [cc.Animation]
                },
                backanimName: {
                    default: [],
                    type: [cc.String]
                },
                trackanim: cc.Animation,
                trackanimName: ""
            },
            onLoad: function() {},
            start: function() {},
            update: function(t) {},
            startMoving: function() {
                this.startBackgroundMove(), this.startTrackMove()
            },
            stopMoving: function() {
                this.stopBackgroundMove(!1), this.stopTrackMove(!1)
            },
            resetPosition: function() {
                this.stopBackgroundMove(!0), this.stopTrackMove(!0)
            },
            startBackgroundMove: function() {
                var t = this;
                this.backanim.forEach(function(i, n) {
                    if (i && t.backanimName[n]) {
                        var e = i.getAnimationState(t.backanimName[n]);
                        e && (e.speed = 1, e.wrapMode = cc.WrapMode.Loop), i.stop(t.backanimName[n]), i.play(t.backanimName[n])
                    }
                })
            },
            stopBackgroundMove: function(t) {
                var i = this;
                this.backanim.forEach(function(n, e) {
                    if (i.backanim && i.backanimName[e]) {
                        var o = n.getAnimationState(i.backanimName[e]);
                        o && (o.wrapMode = cc.WrapMode.Normal, o.speed = 1), t ? n.play(i.backanimName[e], o.duration) : n.stop(i.backanimName[e])
                    }
                })
            },
            startTrackMove: function() {
                if (this.trackanim && this.trackanimName) {
                    var t = this.trackanim.getAnimationState(this.trackanimName);
                    t && (t.speed = 1, t.wrapMode = cc.WrapMode.Loop), this.trackanim.stop(this.trackanimName), this.trackanim.play(this.trackanimName)
                }
            },
            stopTrackMove: function(t) {
                if (this.trackanim && this.trackanimName) {
                    var i = this.trackanim.getAnimationState(this.trackanimName);
                    i && (i.wrapMode = cc.WrapMode.Normal, i.speed = 1), t ? this.trackanim.play(this.trackanimName, i.duration) : this.trackanim.stop(this.trackanimName)
                }
            }
        }), cc._RF.pop()
    }, {}],
    carsound: [function(t, i, n) {
        "use strict";
        cc._RF.push(i, "72e3fH6riBHHaMRlTkI0wZi", "carsound"), cc.Class({
            extends: cc.Component,
            properties: {
                carFast: {
                    default: null,
                    url: cc.AudioClip
                },
                carMed: {
                    default: null,
                    url: cc.AudioClip
                },
                carSlow: {
                    default: null,
                    url: cc.AudioClip
                },
                carIgnition: {
                    default: null,
                    url: cc.AudioClip
                }
            },
            onLoad: function() {
                this.carFastId = -1, this.carSlowId = -1, this.carMedId = -1, this.carIgnitionId = -1
            },
            start: function() {},
            stopEffect: function() {
                cc.audioEngine.stopEffect(this.carIgnitionId), cc.audioEngine.stopEffect(this.carFastId), cc.audioEngine.stopEffect(this.carSlowId), cc.audioEngine.stopEffect(this.carMedId)
            },
            playCarFast: function() {
                window.settings.SOUND && -1 == cc.audioEngine.getState(this.carFastId) && (this.stopEffect(), this.carFastId = cc.audioEngine.playEffect(this.carFast, !0))
            },
            playCarMed: function() {
                window.settings.SOUND && -1 == cc.audioEngine.getState(this.carMedId) && (this.stopEffect(), this.carMedId = cc.audioEngine.playEffect(this.carMed, !0, .3))
            },
            playCarSlow: function() {
                window.settings.SOUND && -1 == cc.audioEngine.getState(this.carSlowId) && (this.stopEffect(), this.carSlowId = cc.audioEngine.playEffect(this.carSlow, !0, .2))
            },
            playCarIgnition: function() {
                window.settings.SOUND && (this.stopEffect(), this.carSlowId = cc.audioEngine.playEffect(this.carIgnition, !0, .2))
            },
            stopAllSound: function() {
                cc.audioEngine.stopAll()
            }
        }), cc._RF.pop()
    }, {}],
    competitor: [function(t, i, n) {
        "use strict";
        cc._RF.push(i, "69cb9kZziFMBYnlrCClDgYG", "competitor");
        var e = t("carsound");
        cc.Class({
            extends: cc.Component,
            properties: {
                id: {
                    default: 0,
                    type: cc.Integer
                },
                initPosOffset: {
                    default: 0,
                    type: cc.Integer
                },
                anim: cc.Animation,
                animName: {
                    default: ""
                },
                carSound: {
                    default: null,
                    type: e
                }
            },
            onLoad: function() {
                var t = this;
                this.state = 0, this.adjPos = 0, this.frameIndex = 0, this.randomIndex = 0, this.isStart = !1, this.offsetSign = 0, this.adjustPosTimer = -1, this.carSoundId = -1, this.node.on("sound-changed", function(i) {
                    console.log("sound-changed", i), i.detail || t.carSound && t.carSound.stopAllSound()
                })
            },
            start: function() {
                console.log("competitor start")
            },
            update: function(t) {
                if (this.isStart && (this.frameIndex++, this.state != window.COMPETITOR_STATE.SPEED_STATE_NORMAL && this.state != window.COMPETITOR_STATE.SPEED_STATE_DOWN && this.state != window.COMPETITOR_STATE.SPEED_STATE_UP && this.state != window.COMPETITOR_STATE.SPEED_STATE_KEEP || this.frameIndex == this.randomIndex && (this.randomSpeed(), this.randomIndex = this.getRandomInt(this.frameIndex + 60, this.randomIndex + 240))), this.state == window.COMPETITOR_STATE.SPEED_STATE_NORMAL) this.node.x = this.node.x + this.getSpeedDistance(window.SPEED_LEVEL.LEVEL1), this.node.x > this.getBorder(window.CANVAS_BORDER.RIGHT) && this.changeSpeedState(window.COMPETITOR_STATE.SPEED_STATE_KEEP, "_med");
                else if (this.state == window.COMPETITOR_STATE.SPEED_STATE_DOWN) this.node.x = this.node.x - this.getSpeedDistance(window.SPEED_LEVEL.LEVEL1), this.node.x < this.getBorder(window.CANVAS_BORDER.LEFT) && this.changeSpeedState(window.COMPETITOR_STATE.SPEED_STATE_KEEP, "_slow");
                else if (this.state == window.COMPETITOR_STATE.SPEED_STATE_UP) this.node.x > this.getBorder(window.CANVAS_BORDER.RIGHT) ? this.changeSpeedState(window.COMPETITOR_STATE.SPEED_STATE_KEEP, "_med") : this.node.x = this.node.x + this.getSpeedDistance(window.SPEED_LEVEL.LEVEL2);
                else if (this.state == window.COMPETITOR_STATE.SPEED_STATE_FINISH) this.node.x < cc.winSize.width / 2 + 200 ? this.node.x = this.node.x + 25 : (console.log("competitor finish, id:", this.id), this.pauseAnimation(), this.node.dispatchEvent(new cc.Event.EventCustom("racing-completed", !0)));
                else if (this.state == window.COMPETITOR_STATE.SPEED_STATE_KEEP) this.node.x = this.node.x;
                else if (this.state == window.COMPETITOR_STATE.SPEED_STATE_ADJUST)
                    if (this.node.x > this.adjPos) {
                        this.changeSpeedState(window.COMPETITOR_STATE.SPEED_STATE_DOWN, "_slow", !1);
                        var i = this.node.x - this.getSpeedDistance(window.SPEED_LEVEL.LEVEL4);
                        this.node.x = i - this.adjPos < 0 ? this.adjPos : i
                    } else if (this.node.x < this.adjPos) {
                    this.changeSpeedState(window.COMPETITOR_STATE.SPEED_STATE_UP, "_fast", !1);
                    var n = this.node.x + this.getSpeedDistance(window.SPEED_LEVEL.LEVEL2);
                    this.node.x = n - this.adjPos > 0 ? this.adjPos : n
                } else console.log("ADJUST FINISH"), this.changeSpeedState(window.COMPETITOR_STATE.SPEED_STATE_OFFSET, "_med"), this.node.dispatchEvent(new cc.Event.EventCustom("finish-adjust", !0));
                else if (this.state == window.COMPETITOR_STATE.SPEED_STATE_OFFSET) {
                    this.frameIndex % 30 == 0 && (this.offsetSign = this.getRandomInt(0, 1));
                    var e = 1;
                    0 == this.offsetSign && (e = -1);
                    var o = this.node.x + .5 * e;
                    o > this.adjPos + 20 ? (this.node.x = this.adjPos + 20, this.offsetSign = 0) : o < this.adjPos - 20 ? (this.node.x = this.adjPos - 20, this.offsetSign = 1) : this.node.x = o
                }
            },
            getSpeedDistance: function(t) {
                switch (t) {
                    case window.SPEED_LEVEL.LEVEL1:
                        return (this.getRandomInt(0, 8) + 2) / 5;
                    case window.SPEED_LEVEL.LEVEL2:
                        return (this.getRandomInt(0, 12) + 4) / 4;
                    case window.SPEED_LEVEL.LEVEL3:
                        return (this.getRandomInt(0, 6) + 2) / 4;
                    case window.SPEED_LEVEL.LEVEL4:
                        return (this.getRandomInt(0, 8) + 4) / 4;
                    default:
                        return 0
                }
            },
            getBorder: function(t) {
                if (t == window.CANVAS_BORDER.RIGHT) {
                    var i = this.getRandomInt(5, 8);
                    return cc.winSize.width / 2 - cc.winSize.width / 40 * i
                }
                if (t == window.CANVAS_BORDER.LEFT) {
                    var n = this.getRandomInt(1, 4);
                    return -cc.winSize.width / 2 + cc.winSize.width / 40 * n
                }
                return 0
            },
            randomSpeed: function() {
                var t = this.getRandomInt(1, 80) + this.getRandomInt(1, 80) + this.getRandomInt(this.node.x < 0 ? 10 : 1, this.node.x < 0 ? 30 : 10);
                t < 95 ? this.changeSpeedState(window.COMPETITOR_STATE.SPEED_STATE_DOWN, "_slow") : t >= 95 && t < 143 ? this.changeSpeedState(window.COMPETITOR_STATE.SPEED_STATE_NORMAL, "_med") : t >= 143 && this.changeSpeedState(window.COMPETITOR_STATE.SPEED_STATE_UP, "_fast")
            },
            getRandomInt: function(t, i) {
                return Math.floor(Math.random() * (i - t + 1)) + t
            },
            resetPos: function() {
                console.log("reset competitor position"), this.node.x = -cc.winSize.width / 2 + this.initPosOffset, this.adjPos = 0, this.carSound && this.carSound.stopAllSound()
            },
            startAnimating: function() {
                if (console.log("startAnimating"), this.isStart = !0, this.frameIndex = 0, this.randomIndex = this.getRandomInt(30, 120), null != this.anim) {
                    var t = this.animName + "_med";
                    this.anim.getAnimationState(t);
                    this.state = window.COMPETITOR_STATE.SPEED_STATE_NORMAL, this.anim.stop(t), this.anim.play(t), this.carSound && this.carSound.playCarMed()
                }
            },
            stopAnimating: function() {
                if (console.log("stopAnimating"), this.isStart = !1, null != this.anim) {
                    var t = this.animName + "_slow",
                        i = this.anim.getAnimationState(t);
                    this.state = window.COMPETITOR_STATE.SPEED_STATE_STOP, i.speed = 1, i.wrapMode = cc.WrapMode.Normal, this.anim.play(t, i.duration), this.carSound && this.carSound.stopAllSound()
                } - 1 != this.adjustPosTimer && (clearTimeout(this.adjustPosTimer), this.adjustPosTimer = -1)
            },
            pauseAnimation: function() {
                if (console.log("pauseAnimation"), this.isStart = !1, null != this.anim) {
                    var t = this.animName + "_med";
                    this.anim.getAnimationState(t);
                    this.state = window.COMPETITOR_STATE.SPEED_STATE_STOP, this.anim.play(t), this.anim.stop(t), this.carSound && this.carSound.stopAllSound()
                }
            },
            changeSpeedState: function(t, i) {
                var n = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
                if (null != this.anim) {
                    var e = this.animName + i,
                        o = this.anim.getAnimationState(e);
                    this.carSound && ("_med" == i ? this.carSound.playCarMed() : "_slow" == i ? this.carSound.playCarSlow() : "_fast" == i && this.carSound.playCarFast()), n && (this.state = t), o.isPlaying || (o.speed = 1, o.wrapMode = cc.WrapMode.Loop, this.anim.play(e))
                }
            },
            speedAdjust: function(t) {
                var i = this;
                console.log("speedAdjust, id:%d, current:%d, pos:%d", this.id, this.node.x, t, this.node.x < t), this.adjPos = t;
                var n = Math.abs(this.node.x - this.adjPos),
                    e = 3 * Math.abs(cc.winSize.width - n);
                this.randomSpeed(), -1 != this.adjustPosTimer && (clearTimeout(this.adjustPosTimer), this.adjustPosTimer = -1), this.adjustPosTimer = setTimeout(function() {
                    i.changeSpeedState(window.COMPETITOR_STATE.SPEED_STATE_ADJUST, "_med")
                }, e)
            },
            getPos: function() {
                return [this.id, this.node.x]
            },
            setPos: function(t) {
                this.node.x = t
            },
            playCarIgnition: function() {
                this.carSound && this.carSound.playCarIgnition()
            }
        }), cc._RF.pop()
    }, {
        carsound: "carsound"
    }],
    dashboard: [function(t, i, n) {
        "use strict";
        cc._RF.push(i, "7d3f3NvfIxKpIbSeuxBDI7T", "dashboard");
        var e = t("audio-manager");
        cc.Class({
            extends: cc.Component,
            properties: {
                positionNum: {
                    default: [],
                    type: [cc.Label]
                },
                greenLights: {
                    default: [],
                    type: [cc.Node]
                },
                gameNumber: {
                    default: null,
                    type: cc.Label
                },
                soundOn: {
                    default: null,
                    type: cc.Button
                },
                soundOff: {
                    default: null,
                    type: cc.Button
                }
            },
            start: function() {},
            setPositionRank: function(t) {
                this.positionNum.forEach(function(i, n) {
                    i && t[n] && (i.string = t[n])
                })
            },
            setGameNumber: function(t) {
                this.gameNumber && (this.gameNumber.string = t ? "第" + t.toString() + "期" : "")
            },
            enableGreenLights: function(t) {
                for (var i = 0; i < this.greenLights.length; i++) this.greenLights[i] && (this.greenLights[i].active = !1);
                for (var n = 0; n < t; n++) this.greenLights[n] && (this.greenLights[n].active = !0)
            },
            soundControl: function() {
                this.soundOn && (this.soundOn.node.active = !window.settings.SOUND), this.soundOff && (this.soundOff.node.active = window.settings.SOUND), window.settings.SOUND = !window.settings.SOUND, window.settings.SOUND || e.instance.stopAllSound();
                var t = new cc.Event.EventCustom("sound-changed", !0);
                t.detail = window.settings.SOUND, this.node.dispatchEvent(t)
            }
        }), cc._RF.pop()
    }, {
        "audio-manager": "audio-manager"
    }],
    gamemainview: [function(t, i, n) {
        "use strict";

        function e(t) {
            if (Array.isArray(t)) {
                for (var i = 0, n = Array(t.length); i < t.length; i++) n[i] = t[i];
                return n
            }
            return Array.from(t)
        }
        cc._RF.push(i, "c25de0xKsBJMpduc1IuTsu+", "gamemainview");
        var o = t("competitor"),
            a = t("dashboard"),
            s = t("audio-manager"),
            r = t("rankingscreen");
        cc.Class({
            extends: cc.Component,
            properties: {
                line: {
                    default: null,
                    type: cc.Node
                },
                stepX: {
                    default: 10,
                    type: cc.Integer
                },
                lineOffset: {
                    default: 0,
                    type: cc.Integer
                },
                numberList: {
                    default: [],
                    type: [cc.Node]
                },
                numberOffset: {
                    default: 0,
                    type: cc.Integer
                },
                competitors: {
                    default: [],
                    type: [o]
                },
                dashboard: {
                    default: null,
                    type: a
                },
                darkBg: {
                    default: null,
                    type: cc.Node
                },
                darkPole: {
                    default: null,
                    type: cc.Node
                },
                normalPole: {
                    default: null,
                    type: cc.Node
                },
                rankingScreen: {
                    default: null,
                    type: r
                },
                gametransitionAnim: {
                    default: null,
                    type: cc.Animation
                }
            },
            onLoad: function() {
                this.linePosX = 0, this.frameIndex = 0, this.isStart = !1, this.isFinish = !1, this.isAdjust = !1, this.competitorPos = [], this.competitorCompletedCount = 0, this.rankingScreenTimer = -1, this.lastPositionTimer = -1, this.rankingScreenTransitionTimer = -1, this.playGoal = !1;
                var t = this;
                this.linePosX = 0 - cc.winSize.width / 2 + this.lineOffset, this.node.on("finish-adjust", function(i) {
                    console.log("finish-adjust"), t.competitorCompletedCount++, t.competitorCompletedCount == t.competitors.length && (console.log("ADJUST OVER"), t.isFinish || (t.isFinish = !0, t.line.x = cc.winSize.width / 2 + 30, t.getCompetitorPos(), t.competitorFinish()))
                })
            },
            start: function() {
                this.resetStartPos()
            },
            update: function(t) {
                this.isStart && (this.frameIndex++, this.lineMoving(), this.numbersMoving(), this.frameIndex % 30 == 0 && this.getCurrentRanking(), window.END_GAME && (this.isAdjust || (this.isAdjust = !0, this.competitorAdjust())))
            },
            resetStartLinePos: function() {
                this.line && (this.line.x = this.linePosX)
            },
            lineMoving: function() {
                if (this.line && this.line.x > 0 - cc.winSize.width / 2 - 200 && (this.line.x = this.line.x - this.stepX, this.isFinish)) {
                    this.line.x <= -cc.winSize.width / 2 - 100 && (this.isStart = !1, this.node.dispatchEvent(new cc.Event.EventCustom("background-completed", !0)));
                    var t = this.getFirstPos();
                    this.line.x - this.line.width / 2 <= t && (this.playGoal || (this.playGoal = !0, s.instance.playGoal()))
                }
            },
            numbersMoving: function() {
                var t = this;
                this.numberList && this.numberList.forEach(function(i) {
                    i && (i.x = i.x - t.stepX)
                })
            },
            startMoving: function() {
                this.frameIndex = 0, this.competitorCompletedCount = 0, this.isStart = !0, this.isFinish = !1, this.isAdjust = !1, this.competitorPos = [], this.showDarkBg(!1), this.startCompetitorMoving()
            },
            resetStartPos: function() {
                if (console.log("resetStartPos"), this.resetStartLinePos(), this.resetNumberPos(), this.resetCompetitorPos(), this.stopCompetitorMoving(), this.showDarkBg(!1), this.rankingScreen && this.rankingScreen.closeRankingScreen(), -1 != this.rankingScreenTimer && (clearTimeout(this.rankingScreenTimer), this.rankingScreenTimer = -1), -1 != this.lastPositionTimer && (clearTimeout(this.lastPositionTimer), this.lastPositionTimer = -1), -1 != this.rankingScreenTransitionTimer && (clearTimeout(this.rankingScreenTransitionTimer), this.rankingScreenTransitionTimer = -1), this.dashboard) {
                    var t = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"];
                    this.dashboard.setPositionRank(t)
                }
                this.playGoal = !1
            },
            resetNumberPos: function() {
                var t = this;
                this.numberList && this.numberList.forEach(function(i) {
                    i && (i.x = -cc.winSize.width / 2 + t.numberOffset)
                })
            },
            resetCompetitorPos: function() {
                this.competitors && this.competitors.forEach(function(t) {
                    t && t.resetPos()
                })
            },
            startCompetitorMoving: function() {
                this.competitors && this.competitors.forEach(function(t) {
                    t && t.startAnimating()
                })
            },
            stopCompetitorMoving: function() {
                this.competitors && this.competitors.forEach(function(t) {
                    t && t.stopAnimating()
                })
            },
            showLastPosition: function() {
                var t = Math.max.apply(Math, e(this.competitorPos)),
                    i = cc.winSize.width / 2 - 200 - t;
                this.line.x = cc.winSize.width / 2 - 200, console.log("showAllFinallyPos", t, i), this.showDarkBg(!0);
                for (var n = 0; n < this.competitors.length; n++) this.competitors[n].setPos(this.competitorPos[n] + i);
                this.getCurrentRanking()
            },
            showAllFinallyPos: function() {
                var t = this;
                this.gameTransition(), this.lastPositionTimer = setTimeout(function() {
                    t.showLastPosition()
                }, 800)
            },
            gameTransition: function() {
                this.gametransitionAnim && (s.instance.playTrans(), this.gametransitionAnim.stop("game_transition_ani"), this.gametransitionAnim.play("game_transition_ani"))
            },
            showRankingScreen: function() {
                var t = this,
                    i = [];
                window.FINALRANK.length == this.competitors.length && (i.push(window.FINALRANK[0]), i.push(window.FINALRANK[1]), i.push(window.FINALRANK[2])), -1 != this.rankingScreenTimer && (clearTimeout(this.rankingScreenTimer), this.rankingScreenTimer = -1), -1 != this.rankingScreenTransitionTimer && (clearTimeout(this.rankingScreenTransitionTimer), this.rankingScreenTransitionTimer = -1), this.rankingScreenTransitionTimer = setTimeout(function() {
                    t.gameTransition()
                }, 4200), this.rankingScreenTimer = setTimeout(function() {
                    t.rankingScreen && t.rankingScreen.setRank(i)
                }, 5e3)
            },
            showDarkBg: function(t) {
                this.darkBg && (this.darkBg.active = t), this.darkPole && (this.darkPole.active = t), this.normalPole && (this.normalPole.active = !t)
            },
            competitorFinish: function() {
                this.competitors && this.competitors.forEach(function(t) {
                    t && t.changeSpeedState(window.COMPETITOR_STATE.SPEED_STATE_FINISH, "_med")
                })
            },
            getFirstPos: function() {
                var t = [];
                return this.competitors && this.competitors.forEach(function(i) {
                    if (i) {
                        var n = i.getPos();
                        t.push({
                            id: n[0],
                            pos: n[1]
                        })
                    }
                }), (t = t.sort(function(t, i) {
                    return t.pos < i.pos ? 1 : -1
                }))[0].pos
            },
            getCurrentRanking: function() {
                var t = [];
                this.competitors && this.competitors.forEach(function(i) {
                    if (i) {
                        var n = i.getPos();
                        t.push({
                            id: n[0],
                            pos: n[1]
                        })
                    }
                });
                var i = [];
                (t = t.sort(function(t, i) {
                    return t.pos < i.pos ? 1 : -1
                })).forEach(function(t) {
                    i.push(t.id < 10 ? "0" + t.id : t.id)
                }), this.dashboard && this.dashboard.setPositionRank(i)
            },
            competitorAdjust: function() {
                console.log("competitorAdjust"), this.competitors && this.competitors.forEach(function(t) {
                    t && t.changeSpeedState(window.COMPETITOR_STATE.SPEED_STATE_KEEP, "_med")
                });
                var t = [];
                this.competitors && this.competitors.forEach(function(i) {
                    if (i) {
                        var n = i.getPos();
                        t.push({
                            id: n[0],
                            pos: n[1]
                        }), console.log("id:%d, pos:%d", n[0], n[1])
                    }
                }), t = t.sort(function(t, i) {
                    return t.pos < i.pos ? 1 : -1
                });
                for (var i = 0, n = 0; n < t.length; n++)
                    if (0 == n) i = t[n].pos;
                    else {
                        if (Math.abs(t[n].pos - i) < 60)
                            for (var e = n; e < t.length; e++) t[e].pos = t[e].pos - 60;
                        i = t[n].pos
                    }
                var o = 0;
                t[t.length - 1].pos < -cc.winSize.width / 2 + cc.winSize.width / 40 * 2 && (o = -cc.winSize.width / 2 + cc.winSize.width / 40 * 2 - t[t.length - 1].pos);
                for (var a = 0; a < t.length; a++) t[a].pos = t[a].pos + o;
                console.log("after allPos", t);
                var s = window.FINALRANK;
                if (window.FINALRANK.length != this.competitors.length) {
                    s = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
                    for (var r = 0; r < s.length; r++) s[r] = t[r].id
                }
                if (console.log("order", s), this.competitors)
                    for (var c = 0; c < t.length; c++) this.competitors[s[c] - 1].speedAdjust(t[c].pos)
            },
            getCompetitorPos: function() {
                var t = this;
                this.competitors && this.competitors.forEach(function(i) {
                    if (i) {
                        var n = i.getPos();
                        t.competitorPos[n[0] - 1] = n[1], console.log("getCompetitorPos:", t.competitorPos[n[0] - 1])
                    }
                })
            },
            getCompetitorNum: function() {
                return this.competitors.length
            },
            playCompetitorIgnition: function() {
                this.competitors && this.competitors.forEach(function(t) {
                    t && t.playCarIgnition()
                })
            }
        }), cc._RF.pop()
    }, {
        "audio-manager": "audio-manager",
        competitor: "competitor",
        dashboard: "dashboard",
        rankingscreen: "rankingscreen"
    }],
    game: [function(t, i, n) {
        "use strict";
        cc._RF.push(i, "8a999vsSB1BYanxJs/tXVxD", "game");
        var e = t("background"),
            o = t("gamemainview"),
            a = t("dashboard"),
            s = t("audio-manager"),
            r = t("waitingview");
        cc.Class({
            extends: cc.Component,
            properties: {
                background: {
                    default: null,
                    type: e
                },
                gamemainview: {
                    default: null,
                    type: o
                },
                dashboard: {
                    default: null,
                    type: a
                },
                countdownAnmiation: {
                    default: null,
                    type: cc.Node
                },
                waitingView: {
                    default: null,
                    type: r
                }
            },
            onLoad: function() {
                this.isStart = !1, this.competitorCompletedCount = 0, this.createGameTimer = -1;
                var t = this;
                this.node.on("background-completed", function(t) {
                    console.log("background-completed")
                }), this.node.on("racing-completed", function(i) {
                    console.log("racing-completed"), t.competitorCompletedCount++, t.competitorCompletedCount == t.gamemainview.competitors.length && (console.log("RACING OVER"), t.finishBackground(), t.gamemainview.showAllFinallyPos(), t.gamemainview.showRankingScreen(), window.CocosPK10.PK10Callback && window.CocosPK10.PK10Callback({
                        action: "race_over",
                        success: !0
                    }))
                }), this.node.on("finish-game", function(i) {
                    console.log("finish-game"), t.stopMovingnReset(), window.CocosPK10.PK10Callback && window.CocosPK10.PK10Callback({
                        action: "finish_game",
                        success: !0
                    })
                }), this.node.on("create-game", function(i) {
                    var n = null;
                    "function" == typeof i.detail.callback && (n = i.detail.callback);
                    var e = t.createGame(i.detail.number, i.detail.count);
                    n && (window.CocosPK10.PK10Callback = n), window.CocosPK10.PK10Callback && window.CocosPK10.PK10Callback({
                        action: "create_game",
                        success: e
                    })
                }), this.node.on("end-game", function(i) {
                    var n = i.detail.rank,
                        e = null;
                    "function" == typeof i.detail.callback && (e = i.detail.callback), e && (window.CocosPK10.PK10Callback = e), t.isStart ? t.checkRankVaild(n) ? (window.END_GAME = !0, Array.isArray(n) && n.forEach(function(t) {
                        window.FINALRANK.push(t < 10 ? "0" + t.toString() : t.toString())
                    }), window.CocosPK10.PK10Callback && window.CocosPK10.PK10Callback({
                        action: "end_game",
                        success: !0
                    })) : (console.log("rank parameter is invalid"), window.CocosPK10.PK10Callback && window.CocosPK10.PK10Callback({
                        action: "end_game",
                        success: !1
                    })) : (console.log("Game doesn't start"), window.CocosPK10.PK10Callback && window.CocosPK10.PK10Callback({
                        action: "end_game",
                        success: !1
                    }))
                }), this.node.on("terminal-game", function(i) {
                    console.log("terminal-game");
                    var n = null;
                    "function" == typeof i.detail.callback && (n = i.detail.callback), t.stopMovingnReset(), n && (window.CocosPK10.PK10Callback = n), window.CocosPK10.PK10Callback && window.CocosPK10.PK10Callback({
                        action: "terminal_game",
                        success: !0
                    })
                })
            },
            start: function() {
                console.log("game start"), window.PK10NODE.game = this.node, console.log("callback:", window.CocosPK10.PK10Callback), window.CocosPK10.PK10Callback && window.CocosPK10.PK10Callback({
                    action: "loaded_game",
                    success: !0
                }), this.enableWaitingView(!0)
            },
            enableWaitingView: function(t, i) {
                this.waitingView && (this.waitingView.showWaiting(t), this.waitingView.setCountdownSec(i))
            },
            createGame: function(t, i) {
                var n = this;
                if (!this.isStart && Number.isInteger(i)) {
                    console.log("createGame", i), this.gameReset(i > 3), this.dashboard && this.dashboard.setGameNumber(t), -1 != this.createGameTimer && (clearInterval(this.createGameTimer), this.createGameTimer = -1);
                    var e = function() {
                        console.log("count down", i);
                        0 == i ? (clearInterval(n.createGameTimer), n.createGameTimer = -1, n.gameStart(), n.dashboard && n.dashboard.enableGreenLights(3), n.enableWaitingView(!1), n.enableCountdownAnimation(!0, 5), s.instance.playGo()) : i > 5 ? n.enableWaitingView(!0, i) : i <= 5 && i >= 1 ? (n.enableWaitingView(!1), n.enableCountdownAnimation(!0, 5 - i), s.instance.playBeep(), i <= 3 && i >= 1 && n.dashboard && n.dashboard.enableGreenLights(4 - i), 3 == i && n.gamemainview && n.gamemainview.playCompetitorIgnition()) : i < 0 && (clearInterval(n.createGameTimer), n.createGameTimer = -1), i--
                    };
                    return e(), this.createGameTimer = setInterval(e, 1e3), !0
                }
                return console.log("Can not create the Game"), console.log("isStart", this.isStart), console.log("countDown", i), !1
            },
            update: function(t) {},
            enableCountdownAnimation: function(t, i) {
                if (this.countdownAnmiation) {
                    var n = this.countdownAnmiation.getComponent(cc.Animation);
                    n && (t ? n.play("countdown_ani", i) : n.stop("countdown_ani"), this.countdownAnmiation.active = t)
                }
            },
            stopMovingnReset: function() {
                this.background && this.background.stopMoving(), this.gamemainview && (this.gamemainview.isStart = !1, this.gamemainview.stopCompetitorMoving()), this.gameReset(!0)
            },
            gameReset: function(t) {
                this.isStart = !1, this.competitorCompletedCount = 0, window.END_GAME = !1, window.FINALRANK = [], -1 != this.createGameTimer && (clearInterval(this.createGameTimer), this.createGameTimer = -1), this.gamemainview && this.gamemainview.resetStartPos(), this.dashboard && this.dashboard.enableGreenLights(0), this.background && this.background.resetPosition(), this.enableCountdownAnimation(!1), this.enableWaitingView(t)
            },
            checkRankVaild: function(t) {
                var i = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
                if (null == t) return !1;
                if (t.length != this.gamemainview.getCompetitorNum()) return !1;
                for (var n = 0; n < i.length; n++)
                    if (-1 == t.indexOf(i[n])) return !1;
                return !0
            },
            gameStart: function() {
                this.isStart || (this.isStart = !0, this.competitorCompletedCount = 0, this.background && this.background.startMoving(), this.gamemainview && (this.gamemainview.resetStartPos(), this.gamemainview.startMoving()))
            },
            finishBackground: function() {
                this.isStart = !1, this.background && (this.isStart = !1, this.background.stopMoving())
            }
        }), window.CocosPK10 || (window.CocosPK10 = {}), window.createGame = function(t, i, n) {
            window.CocosPK10.createGame(t, i, n)
        }, window.endGame = function(t, i) {
            window.CocosPK10.endGame(t, i)
        }, window.terminalGame = function(t) {
            window.CocosPK10.terminalGame(t)
        }, window.CocosPK10.createGame = function(t, i, n) {
            var e = new cc.Event.EventCustom("create-game", !0);
            e.detail = {
                number: t,
                count: i,
                callback: n
            }, window.PK10NODE.game.dispatchEvent(e)
        }, window.CocosPK10.endGame = function(t, i) {
            var n = new cc.Event.EventCustom("end-game", !0);
            n.detail = {
                rank: t,
                callback: i
            }, window.PK10NODE.game.dispatchEvent(n)
        }, window.CocosPK10.terminalGame = function(t) {
            var i = new cc.Event.EventCustom("terminal-game", !0);
            i.detail = {
                callback: t
            }, window.PK10NODE.game.dispatchEvent(i)
        }, cc._RF.pop()
    }, {
        "audio-manager": "audio-manager",
        background: "background",
        dashboard: "dashboard",
        gamemainview: "gamemainview",
        waitingview: "waitingview"
    }],
    "global.def": [function(t, i, n) {
        "use strict";
        cc._RF.push(i, "598abJuZY9EfLZzsIOT/Opt", "global.def"), window.VERSION = "1.0.0.3", window.COMPETITOR_STATE = {
            SPEED_STATE_STOP: 0,
            SPEED_STATE_NORMAL: 1,
            SPEED_STATE_DOWN: 2,
            SPEED_STATE_UP: 3,
            SPEED_STATE_FINISH: 4,
            SPEED_STATE_KEEP: 5,
            SPEED_STATE_ADJUST: 6,
            SPEED_STATE_OFFSET: 7
        }, window.SPEED_LEVEL = {
            LEVEL1: 0,
            LEVEL2: 1,
            LEVEL3: 2,
            LEVEL4: 3
        }, window.CANVAS_BORDER = {
            RIGHT: 0,
            LEFT: 1
        }, window.PK10NODE = {}, window.FINALRANK = [], window.END_GAME = !1, window.cb = null, window.settings = {
            SOUND: !0
        }, window.logger = function() {
            var t = null,
                i = {};
            return i.enableLogger = function(i) {
                null != t && 3325 == i && (window.console.log = t)
            }, i.disableLogger = function() {
                t = console.log, window.console.log = function() {}
            }, i
        }(), window.logger.disableLogger(), cc._RF.pop()
    }, {}],
    mask: [function(t, i, n) {
        "use strict";
        cc._RF.push(i, "3c681AOdPJAwpELH541AiUB", "mask"), cc.Class({
            extends: cc.Component,
            properties: {},
            onLoad: function() {},
            onBtnMaskClick: function() {
                console.log("mask click")
            }
        }), cc._RF.pop()
    }, {}],
    "polyglot.min": [function(t, i, n) {
        "use strict";
        cc._RF.push(i, "e26fd9yy65A4q3/JkpVnFYg", "polyglot.min");
        var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        };
        ! function(t, o) {
            "function" == typeof define && define.amd ? define([], function() {
                return o(t)
            }) : "object" == (void 0 === n ? "undefined" : e(n)) ? i.exports = o(t) : t.Polyglot = o(t)
        }(void 0, function(t) {
            function i(t) {
                t = t || {}, this.phrases = {}, this.extend(t.phrases || {}), this.currentLocale = t.locale || "en", this.allowMissing = !!t.allowMissing, this.warn = t.warn || d
            }

            function n(t) {
                var i, n, e, o = {};
                for (i in t)
                    if (t.hasOwnProperty(i)) {
                        n = t[i];
                        for (e in n) o[n[e]] = i
                    }
                return o
            }

            function o(t) {
                var i = /^\s+|\s+$/g;
                return t.replace(i, "")
            }

            function a(t, i, n) {
                var e, a, s;
                return null != n && t ? (a = t.split(u), s = a[r(i, n)] || a[0], e = o(s)) : e = t, e
            }

            function s(t) {
                var i = n(p);
                return i[t] || i.en
            }

            function r(t, i) {
                return l[s(t)](i)
            }

            function c(t, i) {
                for (var n in i) "_" !== n && i.hasOwnProperty(n) && (t = t.replace(new RegExp("%\\{" + n + "\\}", "g"), i[n]));
                return t
            }

            function d(i) {
                t.console && t.console.warn && t.console.warn("WARNING: " + i)
            }

            function h(t) {
                var i = {};
                for (var n in t) i[n] = t[n];
                return i
            }
            i.VERSION = "0.4.3", i.prototype.locale = function(t) {
                return t && (this.currentLocale = t), this.currentLocale
            }, i.prototype.extend = function(t, i) {
                var n;
                for (var o in t) t.hasOwnProperty(o) && (n = t[o], i && (o = i + "." + o), "object" == (void 0 === n ? "undefined" : e(n)) ? this.extend(n, o) : this.phrases[o] = n)
            }, i.prototype.clear = function() {
                this.phrases = {}
            }, i.prototype.replace = function(t) {
                this.clear(), this.extend(t)
            }, i.prototype.t = function(t, i) {
                var n, e;
                return "number" == typeof(i = null == i ? {} : i) && (i = {
                    smart_count: i
                }), "string" == typeof this.phrases[t] ? n = this.phrases[t] : "string" == typeof i._ ? n = i._ : this.allowMissing ? n = t : (this.warn('Missing translation for key: "' + t + '"'), e = t), "string" == typeof n && (i = h(i), e = a(n, this.currentLocale, i.smart_count), e = c(e, i)), e
            }, i.prototype.has = function(t) {
                return t in this.phrases
            };
            var u = "||||",
                l = {
                    chinese: function(t) {
                        return 0
                    },
                    german: function(t) {
                        return 1 !== t ? 1 : 0
                    },
                    french: function(t) {
                        return t > 1 ? 1 : 0
                    },
                    russian: function(t) {
                        return t % 10 == 1 && t % 100 != 11 ? 0 : t % 10 >= 2 && t % 10 <= 4 && (t % 100 < 10 || t % 100 >= 20) ? 1 : 2
                    },
                    czech: function(t) {
                        return 1 === t ? 0 : t >= 2 && t <= 4 ? 1 : 2
                    },
                    polish: function(t) {
                        return 1 === t ? 0 : t % 10 >= 2 && t % 10 <= 4 && (t % 100 < 10 || t % 100 >= 20) ? 1 : 2
                    },
                    icelandic: function(t) {
                        return t % 10 != 1 || t % 100 == 11 ? 1 : 0
                    }
                },
                p = {
                    chinese: ["fa", "id", "ja", "ko", "lo", "ms", "th", "tr", "zh"],
                    german: ["da", "de", "en", "es", "fi", "el", "he", "hu", "it", "nl", "no", "pt", "sv"],
                    french: ["fr", "tl", "pt-br"],
                    russian: ["hr", "ru"],
                    czech: ["cs"],
                    polish: ["pl"],
                    icelandic: ["is"]
                };
            return i
        }), cc._RF.pop()
    }, {}],
    rankingscreen: [function(t, i, n) {
        "use strict";
        cc._RF.push(i, "6ec1dS0Lt9GqpJcD03e3n4f", "rankingscreen");
        var e = t("audio-manager");
        cc.Class({
            extends: cc.Component,
            properties: {
                cars: {
                    default: [],
                    type: [cc.Prefab]
                },
                carTextNumbers: {
                    default: [],
                    type: [cc.Label]
                }
            },
            onLoad: function() {
                this.currentCars = [], this.displayTimer = -1
            },
            start: function() {},
            closeRankingScreen: function() {
                this.node.active = !1, this.clearAll()
            },
            clearAll: function() {
                this.currentCars && (this.currentCars.forEach(function(t) {
                    t.destroy()
                }), this.currentCars = [], this.carTextNumbers && this.carTextNumbers.forEach(function(t, i) {
                    t.string = ""
                })), -1 != this.displayTimer && (clearTimeout(this.displayTimer), this.displayTimer = -1)
            },
            setRank: function(t) {
                if (t && 3 == t.length) {
                    this.node.active = !0, this.clearAll(), this.carTextNumbers && this.carTextNumbers.forEach(function(i, n) {
                        i.string = t[n]
                    });
                    var i = cc.instantiate(this.cars[t[0] - 1]),
                        n = cc.instantiate(this.cars[t[1] - 1]),
                        o = cc.instantiate(this.cars[t[2] - 1]);
                    this.currentCars.push(i), this.currentCars.push(n), this.currentCars.push(o), this.node.addChild(i), i.setPosition(cc.p(0, -77)), this.node.addChild(n), n.setPosition(cc.p(-593, 46)), this.node.addChild(o), o.setPosition(cc.p(588, 106)), -1 != this.displayTimer && (clearTimeout(this.displayTimer), this.displayTimer = -1), e.instance.playAward(), this.displayTimer = setTimeout(function() {
                        window.PK10NODE.game.dispatchEvent(new cc.Event.EventCustom("finish-game", !0))
                    }, 5e3)
                }
            }
        }), cc._RF.pop()
    }, {
        "audio-manager": "audio-manager"
    }],
    waitingview: [function(t, i, n) {
        "use strict";
        cc._RF.push(i, "46371rBkoNGvYs9NLLdWrmT", "waitingview"), cc.Class({
            extends: cc.Component,
            properties: {
                countdownSec: {
                    default: null,
                    type: cc.Label
                }
            },
            onLoad: function() {},
            start: function() {
                console.log("waiting start"), window.onReady && window.onReady({
                    action: "ready",
                    success: !0
                })
            },
            setCountdownSec: function(t) {
                this.countdownSec && (this.countdownSec.string = t ? t.toString() : "")
            },
            showWaiting: function(t) {
                this.node.active = t
            }
        }), cc._RF.pop()
    }, {}]
}, {}, ["LanguageData", "LocalizedLabel", "LocalizedSprite", "SpriteFrameSet", "polyglot.min", "audio-manager", "background", "carsound", "competitor", "dashboard", "game", "gamemainview", "global.def", "mask", "rankingscreen", "waitingview"]);