(function (documnetDom) {
    var a = {};
    a.config = {
        editable: true,
        lineHeight: 15,
        basePath: "",
        rect: {
            attr: {
                x: 10,
                y: 10,
                width: 100,
                height: 50,
                r: 5,
                fill: "90-#fff-#C0C0C0",
                stroke: "#000",
                "stroke-width": 1
            },
            showType: "image&text",
            type: "state",
            name: {
                text: "state",
                "font-style": "italic"
            },
            text: {
                text: "状态",
                "font-size": 13
            },
            margin: 5,
            props: [],
            img: {}
        },
        path: {
            attr: {
                path: {
                    path: "M10 10L100 100",
                    stroke: "#808080",
                    fill: "none",
                    "stroke-width": 2
                },
                arrow: {
                    path: "M10 10L10 10",
                    stroke: "#808080",
                    fill: "#808080",
                    "stroke-width": 2,
                    radius: 4
                },
                fromDot: {
                    width: 5,
                    height: 5,
                    stroke: "#fff",
                    fill: "#000",
                    cursor: "move",
                    "stroke-width": 2
                },
                toDot: {
                    width: 5,
                    height: 5,
                    stroke: "#fff",
                    fill: "#000",
                    cursor: "move",
                    "stroke-width": 2
                },
                bigDot: {
                    width: 5,
                    height: 5,
                    stroke: "#fff",
                    fill: "#000",
                    cursor: "move",
                    "stroke-width": 2
                },
                smallDot: {
                    width: 5,
                    height: 5,
                    stroke: "#fff",
                    fill: "#000",
                    cursor: "move",
                    "stroke-width": 3
                }
            },
            text: {
                hideValue: "",
                text: "TO {to}",
                cursor: "move",
                background: "#000"
            },
            textPos: {
                x: 0,
                y: -10
            },
            props: {
                text: {
                    name: "text",
                    label: "分支条件",
                    value: "",
                    textType: "conditionInfo",
                    textTypeDes: "分支条件",
                    hideValue: "",
                    editor: function () {
                        return new a.editors.searchPathEditor();
                    }
                }
            }
        },
        tools: {
            attr: {
                left: 30,
                top: 20
            },
            pointer: {},
            path: {},
            states: {},
            save: {
                onclick: function (c) {
                    //alert(c);
                }
            }
        },
        props: {
            attr: {
                top: 10,
                right: 10
            },
            props: {}
        },
        restore: "",
        activeRects: {
            rects: [],
            rectAttr: {
                stroke: "#ff0000",
                "stroke-width": 2
            }
        },
        historyRects: {
            rects: [],
            pathAttr: {
                path: {
                    stroke: "#00ff00"
                },
                arrow: {
                    stroke: "#00ff00",
                    fill: "#00ff00"
                }
            }
        }
    };


    a.util = {
        isLine: function (g, f, e) {
            var d;
            var c;
            if ((g.x - e.x) == 0) {
                d = 1;
            } else {
                d = (g.y - e.y) / (g.x - e.x);
            }
            c = (f.x - e.x) * d + e.y;
            if ((f.y - c) < 10 && (f.y - c) > -10) {
                f.y = c;
                return true;
            }
            return false;
        },
        center: function (d, c) {
            return {
                x: (d.x - c.x) / 2 + c.x,
                y: (d.y - c.y) / 2 + c.y
            }
        },
        nextId: (function () {
            var c = 0;
            return function () {
                return ++c;
            }
        })(),
        connPoint: function (j, d) {
            var c = d,
                e = {
                    x: j.x + j.width / 2,
                    y: j.y + j.height / 2
                };
            var l = (e.y - c.y) / (e.x - c.x);
            l = isNaN(l) ? 0 : l;
            var k = j.height / j.width;
            var h = c.y < e.y ? -1 : 1,
                f = c.x < e.x ? -1 : 1,
                g,
                i;
            if (Math.abs(l) > k && h == -1) {
                g = e.y - j.height / 2;
                i = e.x + h * j.height / 2 / l;
            } else {
                if (Math.abs(l) > k && h == 1) {
                    g = e.y + j.height / 2;
                    i = e.x + h * j.height / 2 / l;
                } else {
                    if (Math.abs(l) < k && f == -1) {
                        g = e.y + f * j.width / 2 * l;
                        i = e.x - j.width / 2;
                    } else {
                        if (Math.abs(l) < k && f == 1) {
                            g = e.y + j.width / 2 * l;
                            i = e.x + j.width / 2;
                        }
                    }
                }
            }
            return {
                x: i,
                y: g
            }
        },
        arrow: function (l, k, d) {
            var g = Math.atan2(l.y - k.y, k.x - l.x) * (180 / Math.PI);
            var h = k.x - d * Math.cos(g * (Math.PI / 180));
            var f = k.y + d * Math.sin(g * (Math.PI / 180));
            var e = h + d * Math.cos((g + 120) * (Math.PI / 180));
            var j = f - d * Math.sin((g + 120) * (Math.PI / 180));
            var c = h + d * Math.cos((g + 240) * (Math.PI / 180));
            var i = f - d * Math.sin((g + 240) * (Math.PI / 180));
            return [
                k, {
                    x: e,
                    y: j
                },
                {
                    x: c,
                    y: i
                }
            ];
        }
    };

    //矩形元素生成函数 p:生成的元素的对象属性，divPaper 生成的画布
    a.rect = function (p, divPaper) {
        //var nodeId="rect" + a.util.nextId();
        var u = this,
            nodeId = "rect" + a.util.nextId(),
            //g = "rect" + a.util.nextId(),
            E = documnetDom.extend(true, {}, a.config.rect, p),
            C = divPaper,
            t,
            e,
            n,
            f,
            x,
            v;
        t = C.rect(E.attr.x, E.attr.y, E.attr.width, E.attr.height, E.attr.r).hide().attr(E.attr);
        e = C.image(a.config.basePath + E.img.src, E.attr.x + E.img.width / 2, E.attr.y + (E.attr.height - E.img.height) / 2, E.img.width, E.img.height).hide();
        n = C.text(E.attr.x + E.img.width + (E.attr.width - E.img.width) / 2, E.attr.y + a.config.lineHeight / 2, E.name.text).hide().attr(E.name);
        f = C.text(E.attr.x + E.img.width + (E.attr.width - E.img.width) / 2, E.attr.y + (E.attr.height - a.config.lineHeight) / 2 + a.config.lineHeight, E.text.text).hide().attr(E.text);

        //拖动时移动触发的事件
        var onMove = function (F, r) {
            try {
                if (!a.config.editable) {
                    return;
                }
                var o = (x + F);
                var G = (v + r);
                q.x = o - E.margin;
                q.y = G - E.margin;
                B();
            } catch (e) {

            }

        };
        //拖动元素开始时触发的事件
        var onStart = function () {
            x = t.attr("x");
            v = t.attr("y");
            t.attr({
                opacity: 0.5 //设置透明度
            });
            e.attr({
                opacity: 0.5
            });
            f.attr({
                opacity: 0.5
            });
        };
        //拖动元素结束时触发的事件
        var onEnd = function () {
            try {
                t.attr({
                    opacity: 1
                });
                e.attr({
                    opacity: 1
                });
                f.attr({
                    opacity: 1
                });
            } catch (e) {

            }

        };
        //拖动 drag(a,b,c) 三个参数 a:move移动时触发的事件，b:start：开始移动时触发的事件,c:end结束时触发的函数
        t.drag(function (r, o) {
            onMove(r, o);
        },
            function () {
                onStart();
            },
            function () {
                onEnd();
            });
        //元素拖动
        e.drag(function (r, o) {
            onMove(r, o);
        },
            function () {
                onStart();
            },
            function () {
                onEnd();
            });
        n.drag(function (r, o) {
            onMove(r, o);
        },
            function () {
                onStart();
            },
            function () {
                onEnd();
            });

        f.drag(function (r, o) {
            onMove(r, o);
        },
            function () {
                onStart();
            },
            function () {
                onEnd();
            });

        var s,
            i = {},
            h = 5,
            q = {
                x: E.attr.x - E.margin,
                y: E.attr.y - E.margin,
                width: E.attr.width + E.margin * 2,
                height: E.attr.height + E.margin * 2
            };
        s = C.path("M0 0L1 1").hide();
        i.t = C.rect(0, 0, h, h).attr({
            fill: "#000",
            stroke: "#fff",
            cursor: "s-resize"
        }).hide().drag(function (r, o) {
            D(r, o, "t");
        },
            function () {
                k(this.attr("x") + h / 2, this.attr("y") + h / 2, "t");
            },
            function () { });
        i.lt = C.rect(0, 0, h, h).attr({
            fill: "#000",
            stroke: "#fff",
            cursor: "nw-resize"
        }).hide().drag(function (r, o) {
            D(r, o, "lt");
        },
            function () {
                k(this.attr("x") + h / 2, this.attr("y") + h / 2, "lt");
            },
            function () { });
        i.l = C.rect(0, 0, h, h).attr({
            fill: "#000",
            stroke: "#fff",
            cursor: "w-resize"
        }).hide().drag(function (r, o) {
            D(r, o, "l");
        },
            function () {
                k(this.attr("x") + h / 2, this.attr("y") + h / 2, "l");
            },
            function () { });
        i.lb = C.rect(0, 0, h, h).attr({
            fill: "#000",
            stroke: "#fff",
            cursor: "sw-resize"
        }).hide().drag(function (r, o) {
            D(r, o, "lb");
        },
            function () {
                k(this.attr("x") + h / 2, this.attr("y") + h / 2, "lb");
            },
            function () { });
        i.b = C.rect(0, 0, h, h).attr({
            fill: "#000",
            stroke: "#fff",
            cursor: "s-resize"
        }).hide().drag(function (r, o) {
            D(r, o, "b");
        },
            function () {
                k(this.attr("x") + h / 2, this.attr("y") + h / 2, "b");
            },
            function () { });
        i.rb = C.rect(0, 0, h, h).attr({
            fill: "#000",
            stroke: "#fff",
            cursor: "se-resize"
        }).hide().drag(function (r, o) {
            D(r, o, "rb");
        },
            function () {
                k(this.attr("x") + h / 2, this.attr("y") + h / 2, "rb");
            },
            function () { });
        i.r = C.rect(0, 0, h, h).attr({
            fill: "#000",
            stroke: "#fff",
            cursor: "w-resize"
        }).hide().drag(function (r, o) {
            D(r, o, "r");
        },
            function () {
                k(this.attr("x") + h / 2, this.attr("y") + h / 2, "r");
            },
            function () { });
        i.rt = C.rect(0, 0, h, h).attr({
            fill: "#000",
            stroke: "#fff",
            cursor: "ne-resize"
        }).hide().drag(function (r, o) {
            D(r, o, "rt");
        },
            function () {
                k(this.attr("x") + h / 2, this.attr("y") + h / 2, "rt");
            },
            function () { });
        var D = function (F, r, G) {
            if (!a.config.editable) {
                return;
            }
            var o = _bx + F,
                H = _by + r;
            switch (G) {
                case "t":
                    q.height += q.y - H;
                    q.y = H;
                    break;
                case "lt":
                    q.width += q.x - o;
                    q.height += q.y - H;
                    q.x = o;
                    q.y = H;
                    break;
                case "l":
                    q.width += q.x - o;
                    q.x = o;
                    break;
                case "lb":
                    q.height = H - q.y;
                    q.width += q.x - o;
                    q.x = o;
                    break;
                case "b":
                    q.height = H - q.y;
                    break;
                case "rb":
                    q.height = H - q.y;
                    q.width = o - q.x;
                    break;
                case "r":
                    q.width = o - q.x;
                    break;
                case "rt":
                    q.width = o - q.x;
                    q.height += q.y - H;
                    q.y = H;
                    break;
            }
            B();

        };
        var k = function (r, o, F) {
            _bx = r;
            _by = o;
        };

        documnetDom([t.node, f.node, n.node, e.node]).bind("click",
            function () {
                if (!a.config.editable) {
                    return;
                }
                w();
                var o = documnetDom(C).data("mod");
                switch (o) {
                    case "pointer":
                        break;
                    case "path":
                        var r = documnetDom(C).data("currNode");
                        //添加箭头判断
                        if (r && r.getId() != nodeId && r.getId().substring(0, 4) == "rect") {
                            //if (this.tagName == "image") {
                            //   documnetDom(C).trigger("addpath", [r, u]);
                            //}
                            documnetDom(C).trigger("addpath", [r, u]);

                        }
                        break;
                }
                //节点触发单击事件
                documnetDom(C).trigger("click", u);
                documnetDom(C).data("currNode", u);
                return false;
            });

        //documnetDom([t.node, f.node, n.node, e.node]).bind("dblclick",
        //    function() {
        //        if (!a.config.editable) {
        //            return;
        //        }

        //        // documnetDom(C).trigger("click", u);
        //        documnetDom(C).trigger("dblclick", u);
        //        //documnetDom(C).data("currNode", u);
        //        return false;
        //    });
        var time;
        //单击事件
        var j = function (o, nodeR) {
            clearTimeout(time);
            time = setTimeout(function () {
                if (!a.config.editable) {
                    return;
                }
                if (nodeR.getId() == nodeId) {
                    if (nodeR.nodeType() == "join" || nodeR.nodeType() == "fork") {
                        documnetDom("#myflow_props").hide();
                    } else {
                        //事务矩形块节点单机触发事件
                        documnetDom(C).trigger("showprops", [E.props, nodeR]);

                    }
                } else {
                    d();
                }
                //console.log("click");
                //单击事件在这里

            }, 300);

        };
        ////双击事件
        //var j1 = function(o, r) {
        //    clearTimeout(time);
        //    if (!a.config.editable) {
        //        return;
        //    }
        //    //必须判断ID
        //    if (r.getId() == nodeId) {
        //        alert("双击事件");
        //    } else {
        //        d();
        //    }

        //};
        //绑定单击事件
        documnetDom(C).bind("click", j);
        //documnetDom(C).bind("dblclick", j1);
        //节点属性名称的更改
        var c = function (o, F, nodeR) {
            if (nodeR.getId() == nodeId) {
                f.attr({
                    text: F
                });
            }
        };

        documnetDom(C).bind("textchange", c);


        function y() {
            return "M" + q.x + " " + q.y + "L" + q.x + " " + (q.y + q.height) + "L" + (q.x + q.width) + " " + (q.y + q.height) + "L" + (q.x + q.width) + " " + q.y + "L" + q.x + " " + q.y;
        }

        function w() {
            s.show();
            for (var o in i) {
                i[o].show();
            }
        }

        function d() {
            s.hide();
            for (var o in i) {
                i[o].hide();
            }
        }

        function B() {
            var F = q.x + E.margin,
                r = q.y + E.margin,
                G = q.width - E.margin * 2,
                o = q.height - E.margin * 2;
            t.attr({
                x: F,
                y: r,
                width: G,
                height: o
            });
            switch (E.showType) {
                case "image":
                    e.attr({
                        x:
                            F + (G - E.img.width) / 2,
                        y: r + (o - E.img.height) / 2
                    }).show();
                    break;
                case "text":
                    t.show();
                    f.attr({
                        x:
                            F + G / 2,
                        y: r + o / 2
                    }).show();
                    break;
                case "image&text"://流程步骤的图形显示样式
                    t.show();
                    //n.attr({
                    //    x:
                    //        F + E.img.width + (G - E.img.width) / 2,
                    //    y: r + a.config.lineHeight / 2
                    //}).show();
                    //f.attr({
                    //    x: F + E.img.width + (G - E.img.width) / 2,
                    //    y: r + (o - a.config.lineHeight) / 2 + a.config.lineHeight
                    //}).show();
                    f.attr({
                        x:
                            F + G / 2,
                        y: r + o / 2
                    }).show();
                    //e.attr({
                    //    x: F + E.img.width / 2,
                    //    y: r + (o - E.img.height) / 2
                    //}).show();
                    break;
            }
            i.t.attr({
                x: q.x + q.width / 2 - h / 2,
                y: q.y - h / 2
            });
            i.lt.attr({
                x: q.x - h / 2,
                y: q.y - h / 2
            });
            i.l.attr({
                x: q.x - h / 2,
                y: q.y - h / 2 + q.height / 2
            });
            i.lb.attr({
                x: q.x - h / 2,
                y: q.y - h / 2 + q.height
            });
            i.b.attr({
                x: q.x - h / 2 + q.width / 2,
                y: q.y - h / 2 + q.height
            });
            i.rb.attr({
                x: q.x - h / 2 + q.width,
                y: q.y - h / 2 + q.height
            });
            i.r.attr({
                x: q.x - h / 2 + q.width,
                y: q.y - h / 2 + q.height / 2
            });
            i.rt.attr({
                x: q.x - h / 2 + q.width,
                y: q.y - h / 2
            });
            s.attr({
                path: y()
            });
            documnetDom(C).trigger("rectresize", u);
        }

        this.toJson = function () {
            var r = "{type:'" + E.type + "',text:{text:'" + f.attr("text") + "'}, attr:{ x:" + Math.round(t.attr("x")) + ", y:" + Math.round(t.attr("y")) + ", width:" + Math.round(t.attr("width")) + ", height:" + Math.round(t.attr("height")) + "}, props:{";
            for (var o in E.props) {
                r += o + ":{";
                for (var attr in E.props[o]) {
                    if (attr == "editor") continue;
                    r += attr + ":'" + E.props[o][attr] + "',";
                }
                if (r.substring(r.length - 1, r.length) == ",") {
                    r = r.substring(0, r.length - 1);
                }
                r += "},";
                // r += o + ":{value:'" + B.props[o].value + "',hideValue:'" + B.props[o].hideValue + "'},";
                // r += o + ":{value:'" + E.props[o].value + "'},";
            }
            if (r.substring(r.length - 1, r.length) == ",") {
                r = r.substring(0, r.length - 1);
            }
            r += "}}";
            return r;
        };
        this.restore = function (o) {
            var r = o;
            E = documnetDom.extend(true, E, o);
            f.attr({
                text: r.text.text
            });
            B();
        };
        this.getBBox = function () {
            return q;
        };
        this.getId = function () {
            return nodeId;
        };
        this.remove = function () {
            t.remove();
            f.remove();
            n.remove();
            e.remove();
            s.remove();
            for (var o in i) {
                i[o].remove();
            }
        };
        this.text = function () {
            return f.attr("text");
        };
        this.attr = function (o) {
            if (o) {
                t.attr(o);
            }
        };
        this.nodeType = function () {
            return E.type;
        };
        B();
    };

    //箭头 divPaper 画布,startNode开始节点，endNode结束节点
    a.path = function (q, divPaper, startNode, endNode) {
        var v = this,
            //z = divPaper,
            //生成箭头路径的属性
            B = documnetDom.extend(true, {}, a.config.path),
            i,
            t,
            f,
            h = B.textPos,
            y,
            w,
            // k = startNode,
            // s = endNode,
            pathId = "path" + a.util.nextId(),
            //g = "path" + a.util.nextId(),
            x;

        //画箭头路径
        function p(G, H, D, L) {
            var F = this,
                M = G,
                r,
                o = D,
                O = L,
                K,
                I,
                N = H;
            switch (M) {
                case "from":
                    r = divPaper.rect(H.x - B.attr.fromDot.width / 2, H.y - B.attr.fromDot.height / 2, B.attr.fromDot.width, B.attr.fromDot.height).attr(B.attr.fromDot);
                    break;
                case "big":
                    r = divPaper.rect(H.x - B.attr.bigDot.width / 2, H.y - B.attr.bigDot.height / 2, B.attr.bigDot.width, B.attr.bigDot.height).attr(B.attr.bigDot);
                    break;
                case "small":
                    r = divPaper.rect(H.x - B.attr.smallDot.width / 2, H.y - B.attr.smallDot.height / 2, B.attr.smallDot.width, B.attr.smallDot.height).attr(B.attr.smallDot);
                    break;
                case "to":
                    r = divPaper.rect(H.x - B.attr.toDot.width / 2, H.y - B.attr.toDot.height / 2, B.attr.toDot.width, B.attr.toDot.height).attr(B.attr.toDot);
                    break;
            }
            if (r && (M == "big" || M == "small")) {
                r.drag(function (Q, P) {
                    C(Q, P);
                },
                    function () {
                        J();
                    },
                    function () {
                        E();
                    });
                var C = function (R, Q) {
                    var P = (K + R),
                        S = (I + Q);
                    F.moveTo(P, S);
                };
                var J = function () {
                    if (M == "big") {
                        K = r.attr("x") + B.attr.bigDot.width / 2;
                        I = r.attr("y") + B.attr.bigDot.height / 2;
                    }
                    if (M == "small") {
                        K = r.attr("x") + B.attr.smallDot.width / 2;
                        I = r.attr("y") + B.attr.smallDot.height / 2;
                    }
                };
                var E = function () { }
            }
            this.type = function (P) {
                if (P) {
                    M = P;
                } else {
                    return M;
                }
            };
            this.node = function (P) {
                if (P) {
                    r = P;
                } else {
                    return r;
                }
            };
            this.left = function (P) {
                if (P) {
                    o = P;
                } else {
                    return o;
                }
            };
            this.right = function (P) {
                if (P) {
                    O = P;
                } else {
                    return O;
                }
            };
            this.remove = function () {
                o = null;
                O = null;
                r.remove();
            };
            this.pos = function (P) {
                if (P) {
                    N = P;
                    r.attr({
                        x: N.x - r.attr("width") / 2,
                        y: N.y - r.attr("height") / 2
                    });
                    return this;
                } else {
                    return N;
                }
            };
            this.moveTo = function (Q, T) {
                this.pos({
                    x: Q,
                    y: T
                });
                switch (M) {
                    case "from":
                        if (O && O.right() && O.right().type() == "to") {
                            O.right().pos(a.util.connPoint(endNode.getBBox(), N));
                        }
                        if (O && O.right()) {
                            O.pos(a.util.center(N, O.right().pos()));
                        }
                        break;
                    case "big":
                        if (O && O.right() && O.right().type() == "to") {
                            O.right().pos(a.util.connPoint(endNode.getBBox(), N));
                        }
                        if (o && o.left() && o.left().type() == "from") {
                            o.left().pos(a.util.connPoint(startNode.getBBox(), N));
                        }
                        if (O && O.right()) {
                            O.pos(a.util.center(N, O.right().pos()));
                        }
                        if (o && o.left()) {
                            o.pos(a.util.center(N, o.left().pos()));
                        }
                        var S = {
                            x: N.x,
                            y: N.y
                        };
                        if (a.util.isLine(o.left().pos(), S, O.right().pos())) {
                            M = "small";
                            r.attr(B.attr.smallDot);
                            this.pos(S);
                            var P = o;
                            o.left().right(o.right());
                            o = o.left();
                            P.remove();
                            var R = O;
                            O.right().left(O.left());
                            O = O.right();
                            R.remove();
                        }
                        break;
                    case "small":
                        if (o && O && !a.util.isLine(o.pos(), {
                            x: N.x,
                            y: N.y
                        },
                            O.pos())) {
                            M = "big";
                            r.attr(B.attr.bigDot);
                            var P = new p("small", a.util.center(o.pos(), N), o, o.right());
                            o.right(P);
                            o = P;
                            var R = new p("small", a.util.center(O.pos(), N), O.left(), O);
                            O.left(R);
                            O = R;
                        }
                        break;
                    case "to":
                        if (o && o.left() && o.left().type() == "from") {
                            o.left().pos(a.util.connPoint(startNode.getBBox(), N));
                        }
                        if (o && o.left()) {
                            o.pos(a.util.center(N, o.left().pos()));
                        }
                        break;
                }
                m();
            }
        }

        //画箭头路径
        function j() {
            var D,
                C,
                E = startNode.getBBox(),
                F = endNode.getBBox(),
                r,
                o;
            r = a.util.connPoint(E, {
                x: F.x + F.width / 2,
                y: F.y + F.height / 2
            });
            o = a.util.connPoint(F, r);
            D = new p("from", r, null, new p("small", {
                x: (r.x + o.x) / 2,
                y: (r.y + o.y) / 2
            }));
            D.right().left(D);
            C = new p("to", o, D.right(), null);
            D.right().right(C);
            this.toPathString = function () {
                if (!D) {
                    return "";
                }
                var J = D,
                    I = "M" + J.pos().x + " " + J.pos().y,
                    H = "";
                while (J.right()) {
                    J = J.right();
                    I += "L" + J.pos().x + " " + J.pos().y;
                }
                var G = a.util.arrow(J.left().pos(), J.pos(), B.attr.arrow.radius);
                H = "M" + G[0].x + " " + G[0].y + "L" + G[1].x + " " + G[1].y + "L" + G[2].x + " " + G[2].y + "z";
                return [I, H];
            };
            this.toJson = function () {
                var G = "[",
                    H = D;
                while (H) {
                    if (H.type() == "big") {
                        G += "{x:" + Math.round(H.pos().x) + ",y:" + Math.round(H.pos().y) + "},";
                    }
                    H = H.right();
                }
                if (G.substring(G.length - 1, G.length) == ",") {
                    G = G.substring(0, G.length - 1);
                }
                G += "]";
                return G;
            };
            this.restore = function (H) {
                var I = H,
                    J = D.right();
                for (var G = 0; G < I.length; G++) {
                    J.moveTo(I[G].x, I[G].y);
                    J.moveTo(I[G].x, I[G].y);
                    J = J.right();
                }
                this.hide();
            };
            this.fromDot = function () {
                return D;
            };
            this.toDot = function () {
                return C;
            };
            this.midDot = function () {
                var H = D.right(),
                    G = D.right().right();
                while (G.right() && G.right().right()) {
                    G = G.right().right();
                    H = H.right();
                }
                return H;
            };
            this.show = function () {
                var G = D;
                while (G) {
                    G.node().show();
                    G = G.right();
                }
            };
            this.hide = function () {
                var G = D;
                while (G) {
                    G.node().hide();
                    G = G.right();
                }
            };
            this.remove = function () {
                var G = D;
                while (G) {
                    if (G.right()) {
                        G = G.right();
                        G.left().remove();
                    } else {
                        G.remove();
                        G = null;
                    }
                }
            }
        }

        B = documnetDom.extend(true, B, q);
        i = divPaper.path(B.attr.path.path).attr(B.attr.path);
        t = divPaper.path(B.attr.arrow.path).attr(B.attr.arrow);
        x = new j();
        x.hide();
        f = divPaper.text(0, 0, B.text.text).attr(B.text).attr({
            text: B.text.text.replace("{from}", startNode.text()).replace("{to}", endNode.text())
        });
        //箭头文本拖动事件
        f.drag(function (r, o) {
            if (!a.config.editable) {
                return;
            }
            f.attr({
                x: y + r,
                y: w + o
            });
        },
            function () {
                y = f.attr("x");
                w = f.attr("y");
            },
            function () {
                var o = x.midDot().pos();
                h = {
                    x: f.attr("x") - o.x,
                    y: f.attr("y") - o.y
                }
            });
        m();
        //箭头绑定的单击事件
        documnetDom([i.node, t.node]).bind("click",
            function () {
                if (!a.config.editable) {
                    return;
                }
                documnetDom(divPaper).trigger("click", v);
                documnetDom(divPaper).data("currNode", v);
                return false;
            });
        //箭头路径的单击事件
        var selectPath = function (r, C) {
            if (!a.config.editable) {
                return;
            }
            //如果箭头是从分支和合并出来的，一部分箭头的属性不显示
            if (C && C.getId() == pathId) {
                if (C.from().nodeType() != "fork") {
                    x.show();
                    documnetDom("#myflow_props").hide();
                } else {
                    x.show();
                    documnetDom(divPaper).trigger("showprops", [B.props, v]);
                }

            } else {
                x.hide();
            }
            var o = documnetDom(divPaper).data("mod");
            switch (o) {
                case "pointer":
                    break;
                case "path":
                    break;
            }
        };
        documnetDom(divPaper).bind("click", selectPath);
        var A = function (o, r) {
            if (!a.config.editable) {
                return;
            }
            if (r && (r.getId() == startNode.getId() || r.getId() == endNode.getId())) {
                documnetDom(divPaper).trigger("removepath", v);
            }
        };
        documnetDom(divPaper).bind("removerect", A);
        var d = function (C, D) {
            if (!a.config.editable) {
                return;
            }
            if (startNode && startNode.getId() == D.getId()) {
                var o;
                if (x.fromDot().right().right().type() == "to") {
                    o = {
                        x: endNode.getBBox().x + endNode.getBBox().width / 2,
                        y: endNode.getBBox().y + endNode.getBBox().height / 2
                    }
                } else {
                    o = x.fromDot().right().right().pos();
                }
                var r = a.util.connPoint(startNode.getBBox(), o);
                x.fromDot().moveTo(r.x, r.y);
                m();
            }
            if (endNode && endNode.getId() == D.getId()) {
                var o;
                if (x.toDot().left().left().type() == "from") {
                    o = {
                        x: startNode.getBBox().x + startNode.getBBox().width / 2,
                        y: startNode.getBBox().y + startNode.getBBox().height / 2
                    }
                } else {
                    o = x.toDot().left().left().pos();
                }
                var r = a.util.connPoint(endNode.getBBox(), o);
                x.toDot().moveTo(r.x, r.y);
                m();
            }
        };
        documnetDom(divPaper).bind("rectresize", d);
        //箭头节点属性名称的更改
        var c = function (r, o, C) {
            try {
                if (C.getId() == pathId) {
                    f.attr({
                        text: o
                    });
                }
            } catch (e) {

            }

        };
        documnetDom(divPaper).bind("textchange", c);
        this.from = function () {
            return startNode;
        };
        this.to = function () {
            return endNode;
        };
        //流程分支箭头的json数据
        this.toJson = function () {
            var r = "{from:'" + startNode.getId() + "',to:'" + endNode.getId() + "', dots:" + x.toJson() + ",type:'" + this.nodeType() + "',text:{text:'" + f.attr("text") + "'},textPos:{x:" + Math.round(h.x) + ",y:" + Math.round(h.y) + "}, props:{";
            for (var o in B.props) {
                //r += o + ":{value:'" + B.props[o].value + "'},";
                // r += o + ":{value:'" + B.props[o].value + "',hideValue:'" + B.props[o].hideValue + "'},";
                r += o + ":{";
                for (var attr in B.props[o]) {
                    if (attr == "editor") continue;
                    r += attr + ":'" + B.props[o][attr] + "',";
                }
                if (r.substring(r.length - 1, r.length) == ",") {
                    r = r.substring(0, r.length - 1);
                }
                r += "},";
            }
            if (r.substring(r.length - 1, r.length) == ",") {
                r = r.substring(0, r.length - 1);
            }
            r += "}}";
            return r;
        };
        this.restore = function (o) {
            var r = o;
            B = documnetDom.extend(true, B, o);
            x.restore(r.dots);
        };
        //移除元素：需要移除元素本身还有元素本身的事件
        this.remove = function () {
            x.remove();
            i.remove();
            t.remove();
            f.remove();
            try {
                documnetDom(divPaper).unbind("click", l);
            } catch (o) {
            }
            try {
                documnetDom(divPaper).unbind("removerect", A);
            } catch (o) {
            }
            try {
                documnetDom(divPaper).unbind("rectresize", d);
            } catch (o) {
            }
            try {
                documnetDom(divPaper).unbind("textchange", c);
            } catch (o) {
            }
        };

        function m() {
            var r = x.toPathString(),
                o = x.midDot().pos();
            i.attr({
                path: r[0]
            });
            t.attr({
                path: r[1]
            });
            f.attr({
                x: o.x + h.x,
                y: o.y + h.y
            });
        }

        this.getId = function () {
            return pathId;
        };
        this.text = function () {
            return f.attr("text");
        };
        this.attr = function (o) {
            if (o && o.path) {
                i.attr(o.path);
            }
            if (o && o.arrow) {
                t.attr(o.arrow);
            }
        }
        this.nodeType = function () {
            //不需要记录到数据库
            if (endNode.nodeType() == "fork") {
                return "endForkPath";
            }
            //需要记到数据库:且开始节点需要变更成分支上一个节点
            if (startNode.nodeType() == "fork") {
                return "startForkPath";
            }
            //不需要记到数据库
            if (startNode.nodeType() == "join") {
                return "startJoinPath";
            }
            //需要记录到数据库，但是结束节点要变成合并节点的下一个节点
            if (endNode.nodeType() == "join") {
                return "endJoinPath";
            }
            //直接记录到数据库
            return "nodePath";
        }
    };


    //元素弹出框
    a.props = function (h, divPaper) {
        var minHeight = $("#content").outerHeight();
        var minWidth = $("#content").outerWidth();
        var j = this,
            c = documnetDom("#myflow_props").hide().draggable({
                handle: "#myflow_props_handle"
            })
            //.resizable(
            //{
            //    start: function(event, ui) {
            //        //if (ui.element.height() < $("#content").outerHeight() + 20 || ui.element.width() < $("#content").outerWidth()+10) {
            //        //    return false;
            //        //}
            //        //documnetDom("#myflow_props").resizable({
            //        //    minHeight: $("#content").outerHeight()+20,    //类型NUMBER,缩放时的最小高度，默认为10
            //        //    minWidth: $("#content").outerWidth()+10     //类型NUMBER,缩放时的最小宽度，默认为10
            //        //});

            //        var minHeight = $("#content").height() + 180;
            //        var minWidth = $("#content").outerWidth() + 10;
            //        $("#myflow_props").resizable({
            //            minHeight: minHeight, //类型NUMBER,缩放时的最小高度，默认为10
            //            minWidth: minWidth //类型NUMBER,缩放时的最小宽度，默认为10
            //        });
            //        event.stopPropagation();

            //    },
            //    stop: function(event, ui) { event.stopPropagation(); }
            //})
            .css(a.config.props.attr).bind("click",
                function (e, r) {
                    event.stopPropagation();
                    // return false;
                }),
            e = c.find("#content"),
            g = divPaper,
            i;
        var d = function (n, m, o) {
            if (i && i.getId() == o.getId()) {
                return;
            }
            i = o;
            documnetDom(e).find(".editor").each(function () {
                var k = documnetDom(this).data("editor");
                if (k) {
                    k.destroy();
                }
            });
            e.empty();
            c.show();
            $("#dialogTital").text(m["text"].value);
            for (var l in m) {
                var t = m[l].textType;
                var bssicInfoHtml = e.find("#" + t);
                if (bssicInfoHtml.length == 0) {
                    var html = '<div style="padding: 10px 0; clear: both;">'
                        + ' <img id="' + t + '_img" src="/Content/Image/workflow/img/sub.png" class="image_btn">' + m[l].textTypeDes + '</div> '
                        + '<div class="col-xs-12" style="border: 0px;">'
                        + '<div class="col-xs-6" style="border-top: 1px solid #ccc;"></div>'
                        + ' <div class="col-xs-6" style="border-top: 1px solid #ccc;"></div></div>'
                        + '<div class="col-xs-12" id="' + t + '">'
                        + '<div class="trr col-xs-12" style="padding: 0;">'
                        + '<div class="col-xs-6 tdd">' + m[l].label + '</div>'
                        + '<div id="p' + l + '" class="col-xs-6 tdd"></div>' +
                        '</div>';

                    e.append(html);
                } else {
                    var html1 = '<div class="trr col-xs-12" style="padding: 0;">'
                        + '<div class="col-xs-6 tdd">' + m[l].label + '</div>' +
                        '<div id="p' + l + '" class="col-xs-6 tdd"></div>';
                    bssicInfoHtml.append(html1);

                }
                if (m[l].editor) {
                    m[l].editor().init(m, l, "p" + l, o, g);
                }
                var rightTd = $("#p" + l);
                var leftTd = $("#p" + l).prev();
                if (rightTd.height() > leftTd.height()) {
                    leftTd.css("height", rightTd.height());
                } else {
                    rightTd.css("height", leftTd.height());
                }
            }
            $(".image_btn").each(function () {
                $(this).bind("click", function () {
                    var divId = this.id.replace("_img", "");
                    $("#" + divId).toggle();
                    if ($("#" + divId).css("display") == "none") {
                        $("#" + this.id).attr('src', "../Content/Image/workflow/img/sum.png");
                    } else {
                        $("#" + this.id).attr('src', "../Content/Image/workflow/img/sub.png");

                    }

                });
            });
            //var minHeight = $("#content").height() + 250;
            $("#myflow_props").css("height", "auto");
        };
        documnetDom(g).bind("showprops", d);
    };

    a.editors = {
        textEditor: function () {
            var d, e, c, g, f;
            this.init = function (i, h, m, l, j) {
                d = i;
                e = h;
                c = m;
                g = l;
                f = j;
                documnetDom('<input  style="width:100%;"/>').val(g.text()).change(function () {
                    i[e].value = documnetDom(this).val();
                    documnetDom(f).trigger("textchange", [documnetDom(this).val(), g]);
                }).appendTo("#" + c);
                documnetDom("#" + c).data("editor", this);
            };
            this.destroy = function () {
                documnetDom("#" + c + " input").each(function () {
                    d[e].value = documnetDom(this).val();
                    documnetDom(f).trigger("textchange", [documnetDom(this).val(), g]);
                });
            }
        }
    };

    //x为画板DIV，r为初始化数据
    a.init = function (x, r) {
        var windowWidth = 800;
        var windowHeight = 800;
        //创建画布
        var divPaper = Raphael(x, windowWidth, windowHeight);
        var nodeArry = {};
        var pathArry = {};
        documnetDom.extend(true, a.config,r, r.restore);    
        documnetDom(document).keydown(function (i) {
            if (!a.config.editable) {
                return;
            }
            if (i.keyCode == 46) {
                var j = documnetDom(divPaper).data("currNode");
                if (j) {
                    if (j.getId().substring(0, 4) == "rect") {
                        documnetDom(divPaper).trigger("removerect", j);
                    } else {
                        if (j.getId().substring(0, 4) == "path") {
                            documnetDom(divPaper).trigger("removepath", j);
                        }
                    }
                    documnetDom(divPaper).removeData("currNode");
                }
            }
        });
        documnetDom(document).dblclick(function () {
            documnetDom(divPaper).data("currNode", null);
            documnetDom(divPaper).trigger("click", {
                getId: function () {
                    return "00000000";
                }
            });
            documnetDom(divPaper).trigger("showprops", [
                a.config.props.props, {
                    getId: function () {
                        return "00000000";
                    }
                }
            ]);
        });
        //移除元素
        var w = function (c, element) {
            if (!a.config.editable) {
                return;
            }
            if (element.getId().substring(0, 4) == "rect") {
                nodeArry[element.getId()] = null;
                element.remove();
            } else {
                if (element.getId().substring(0, 4) == "path") {
                    pathArry[element.getId()] = null;
                    element.remove();
                }
            }
        };
        documnetDom(divPaper).bind("removepath", w);
        //移除矩形
        documnetDom(divPaper).bind("removerect", w);
        //添加矩形
        documnetDom(divPaper).bind("addrect",
            function (j, nodeType, k) {
                //k:节点的属性attr: {x: i.helper.offset().left,y: i.helper.offset().top}
                //判断开始和结束节点，开始和结束节点只能有一个
                for (var nodeR in nodeArry) {
                    if (nodeArry[nodeR]) {
                        if ((nodeArry[nodeR].nodeType() == "start" && nodeArry[nodeR].nodeType() == a.config.tools.states[nodeType].type) || (nodeArry[nodeR].nodeType() == "end" && nodeArry[nodeR].nodeType() == a.config.tools.states[nodeType].type)) {
                            return;
                        }
                    }
                }
                //生成新的节点矩形块
                var i = new a.rect(documnetDom.extend(true, {}, a.config.tools.states[nodeType], k), divPaper);
                nodeArry[i.getId()] = i; //把生成新的节点矩形块放进数组
            });
        //添加箭头路径
        //startNode起始节点
        //endNode目的节点
        var f = function (i, startNode, endNode) {
            //k起始节点：type是end，则不允许添加路径
            //j目的节点:如果是type是start，则不允许添加路径
            if (startNode.nodeType() == "end" || endNode.nodeType() == "start") {
                return;
            }
            var pathStr = "";
            for (var c in pathArry) {
                if (pathArry[c]) {
                    pathStr += pathArry[c].getId() + ":" + pathArry[c].toJson() + ",";
                }
            }
            //两个节点之间只允许有一次关系连线
            if (pathStr.indexOf("from:'" + startNode.getId() + "',to:'" + endNode.getId() + "'") >= 0 || pathStr.indexOf("from:'" + endNode.getId() + "',to:'" + startNode.getId() + "'") >= 0) {
                return;
            }
            //每个节点只允许作为一次起始节点和目的节点（除分支合并除外）
            if (startNode.nodeType() !== "fork" && startNode.nodeType() !== "join" && (startNode.nodeType() !== "start")) {
                if (pathStr.indexOf("from:'" + startNode.getId() + "',to:'") >= 0) {
                    return;
                }
            }
            if (endNode.nodeType() != "fork" && endNode.nodeType() != "join" && (endNode.nodeType() !== "end")) {
                if (pathStr.indexOf("',to:'" + endNode.getId() + "'") >= 0) {
                    return;
                }
            }
            //分支节点只允许作为一次目的节点，但是可以作为多次起始节点
            if (endNode.nodeType() == "fork" || endNode.nodeType() == "countersign" || endNode.nodeType() == "task_single" || endNode.nodeType() == "task_serial" || endNode.nodeType() == "task_parallel") {
                if (pathStr.indexOf("',to:'" + endNode.getId() + "'") >= 0) {
                    return;
                }
            }
            //合并节点只允许作为一次起始节点，但是可以作为多次目的节点
            if (startNode.nodeType() == "join") {
                if (pathStr.indexOf("from:'" + startNode.getId() + "',to:'") >= 0) {
                    return;
                }
            }
            ////分支不能 直接指向合并，合并也不能直接指向分支
            //if ((startNode.nodeType() == "fork" || k.nodeType() == "join") && (j.nodeType() == "fork" || j.nodeType() == "join")) {
            //    return;
            //}

            //生成箭头 divPaper是画布，startNode是起始节点，endNode是结束节点
            var c = new a.path({}, divPaper, startNode, endNode);
            pathArry[c.getId()] = c; //把生成箭头路径放进节点
        };

        documnetDom(divPaper).bind("addpath", f);
        documnetDom(divPaper).data("mod", "point");

        if (a.config.editable) {
            documnetDom("#myflow_tools").draggable({
                handle: "#myflow_tools_handle"
            }).css(a.config.tools.attr);
            documnetDom("#myflow_tools .node").hover(function () {
                documnetDom(this).addClass("mover");
            },
                function () {
                    documnetDom(this).removeClass("mover");
                });
            documnetDom("#myflow_tools .selectable").click(function () {
                documnetDom(".selected").removeClass("selected");
                documnetDom(this).addClass("selected");
                documnetDom(divPaper).data("mod", this.id);
            });
            //拖动工具箱的工具元素
            documnetDom("#myflow_tools .state").each(function () {
                documnetDom(this).draggable({
                    helper: "clone"
                });
            });
            //放置工具箱的工具 添加元素
            documnetDom(x).droppable({
                accept: ".state",
                drop: function (c, i) {
                    documnetDom(divPaper).trigger("addrect", [
                        i.helper.attr("type"), {
                            attr: {
                                x: i.helper.offset().left,
                                y: i.helper.offset().top
                            }
                        }
                    ]);
                }
            });
            documnetDom("#myflow_save").click(function () {
                var i = "{states:{";
                for (var c in nodeArry) {
                    if (nodeArry[c]) {
                        i += nodeArry[c].getId() + ":" + nodeArry[c].toJson() + ",";
                    }
                }
                if (i.substring(i.length - 1, i.length) == ",") {
                    i = i.substring(0, i.length - 1);
                }
                i += "},paths:{";
                for (var c in pathArry) {
                    if (pathArry[c]) {
                        i += pathArry[c].getId() + ":" + pathArry[c].toJson() + ",";
                    }
                }
                if (i.substring(i.length - 1, i.length) == ",") {
                    i = i.substring(0, i.length - 1);
                }
                i += "},props:{props:{";
                for (var c in a.config.props.props) {
                    // i += c + ":{value:'" + a.config.props.props[c].value + "'},";
                    i += c + ":{";
                    for (var attr in a.config.props.props[c]) {
                        if (attr == "editor") continue;
                        i += attr + ":'" + a.config.props.props[c][attr] + "',";
                    }
                    if (i.substring(i.length - 1, i.length) == ",") {
                        i = i.substring(0, i.length - 1);
                    }
                    i += "},";
                }
                if (i.substring(i.length - 1, i.length) == ",") {
                    i = i.substring(0, i.length - 1);
                }
                i += "}}}";
                a.config.tools.save.onclick(i);
            });
            new a.props({}, divPaper);
        }
        //初始化
        if (r.restore) {
            var B = r.restore;
            var z = {};
            //初始化矩形块
            if (B.states) {
                for (var s in B.states) {
                    var d = new a.rect(documnetDom.extend(true, {}, a.config.tools.states[B.states[s].type], B.states[s]), divPaper);
                    d.restore(B.states[s]);
                    z[s] = d;
                    nodeArry[d.getId()] = d;
                }
            }
            //初始化箭头
            if (B.paths) {
                for (var s in B.paths) {
                    var n = new a.path(documnetDom.extend(true, {}, a.config.tools.path, B.paths[s]), divPaper, z[B.paths[s].from], z[B.paths[s].to]);
                    n.restore(B.paths[s]);
                    pathArry[n.getId()] = n;
                }
            }
        }
        //历史节点
        var A = a.config.historyRects;
        //活动节点
        var l = a.config.activeRects;
        if (A.rects.length || l.rects.length) {
            var m = {},
                z = {};
            for (var h in pathArry) {
                if (!z[pathArry[h].from().text()]) {
                    z[pathArry[h].from().text()] = {
                        rect: pathArry[h].from(),
                        paths: {}
                    }
                }
                z[pathArry[h].from().text()].paths[pathArry[h].text()] = pathArry[h];
                if (!z[pathArry[h].to().text()]) {
                    z[pathArry[h].to().text()] = {
                        rect: pathArry[h].to(),
                        paths: {}
                    }
                }
            }
            for (var u = 0; u < A.rects.length; u++) {
                if (z[A.rects[u].name]) {
                    z[A.rects[u].name].rect.attr(A.rectAttr);
                }
                for (var t = 0; t < A.rects[u].paths.length; t++) {
                    if (z[A.rects[u].name].paths[A.rects[u].paths[t]]) {
                        z[A.rects[u].name].paths[A.rects[u].paths[t]].attr(A.pathAttr);
                    }
                }
            }
            for (var u = 0; u < l.rects.length; u++) {
                if (z[l.rects[u].name]) {
                    z[l.rects[u].name].rect.attr(l.rectAttr);
                }
                for (var t = 0; t < l.rects[u].paths.length; t++) {
                    if (z[l.rects[u].name].paths[l.rects[u].paths[t]]) {
                        z[l.rects[u].name].paths[l.rects[u].paths[t]].attr(l.pathAttr);
                    }
                }
            }
        }
        this.getNodeArry = function () {

            return nodeArry;
        };
        this.getPathArry = function () {
            return pathArry;
        };
    };
    //获取业务节点数据集合
    a.getNodeArry = function () {
        return a.init.getNodeArry();
    };
    //获取条件节点的数据集合
    a.getPathArry = function () {
        return a.init.getPathArry();
    };

    documnetDom.fn.myflow = function (jsonData) {
        return this.each(function () {
            a.init(this, jsonData);
        });
    };
    documnetDom.myflow = a;

})(jQuery);