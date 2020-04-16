var QueryString = function() {
        for (var e, t = {}, s = window.location.search.substring(1), n = s.split("&"), o = 0; o < n.length; o++)
            if (e = n[o].split("="), "undefined" == typeof t[e[0]]) t[e[0]] = e[1];
            else if ("string" == typeof t[e[0]]) {
            var a = [t[e[0]], e[1]];
            t[e[0]] = a
        } else t[e[0]].push(e[1]);
        return t
    },
    useragent = (navigator.userAgent || navigator.vendor || window.opera).toLowerCase(),
    isiPhone = /iPhone|iPad|iPod/i.test(useragent),
    isAndroid = /android/i.test(useragent),
    isWindowsPhone = /windows phone/i.test(useragent),
    isOpera = !!window.opera || 0 <= navigator.userAgent.indexOf(" OPR/"),
    isFirefox = "undefined" != typeof InstallTrigger,
    queryString = QueryString(),
    isSafariA = !(queryString.isSafari && "false" == queryString.isSafari) && (0 < Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor") || function(e) {
        return "[object SafariRemoteNotification]" === e.toString()
    }(!window.safari || safari.pushNotification)),
    isChrome = !!window.chrome && !isOpera,
    isIEA = !(queryString.isIE && "false" == queryString.isIE) && !!document.documentMode,
    isEdge = !(queryString.isEdge && "false" == queryString.isEdge) && -1 < navigator.userAgent.indexOf("Edge");

function getChromeVersion() {
    var e = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
    return !!e && parseInt(e[2], 10)
}

function loadScript(e, t) {
    var s = document.createElement("script");
    s.type = "text/javascript", s.readyState ? s.onreadystatechange = function() {
        ("loaded" == s.readyState || "complete" == s.readyState) && (s.onreadystatechange = null, t && t())
    } : s.onload = function() {
        t && t()
    }, s.src = e + "?v=" + currVersion, document.getElementsByTagName("head")[0].appendChild(s)
}

function stopFullScreenPopup() {
    document.getElementById("exitFullscreenButton") && (document.getElementById("exitFullscreenButton").style.display = "none"), document.getElementById("fullscreenButton") && (document.getElementById("fullscreenButton").style.display = "block"), window.resizeTo(widgetSize.width + (window.outerWidth - window.innerWidth), widgetSize.height + (window.outerHeight - window.innerHeight)), window.moveTo((screen.width - widgetSize.width) / 2, (screen.height - widgetSize.height) / 2)
}

function toggleFullScreen() {
    document.msFullscreenElement || document.fullscreen || document.mozFullScreen || document.webkitIsFullScreen ? stopFullScreen() : showFullScreen()
}
document.addEventListener("fullscreenchange", function() {
    document.fullscreen || stopFullScreen()
}, !1), document.addEventListener("mozfullscreenchange", function() {
    document.mozFullScreen || stopFullScreen()
}, !1), document.addEventListener("MSFullscreenChange", function() {
    document.msFullscreenElement || stopFullScreen()
}, !1), document.addEventListener("webkitfullscreenchange", function() {
    document.webkitIsFullScreen || stopFullScreen()
}, !1);

function showFullScreen() {
    var e = document.getElementById("video_container");
    e.requestFullscreen ? e.requestFullscreen() : e.msRequestFullscreen ? e.msRequestFullscreen() : e.mozRequestFullScreen ? e.mozRequestFullScreen() : e.webkitRequestFullscreen && e.webkitRequestFullscreen(), document.getElementById("exitFullscreenButton").style.display = "block"
}

function stopFullScreen() {
    window.fullScreen && document.exitFullscreen ? window.innerHeight === screen.height && document.exitFullscreen() : window.fullScreen && document.msExitFullscreen ? document.msExitFullscreen() : window.fullScreen && document.mozCancelFullScreen ? document.mozCancelFullScreen() : window.fullScreen && document.webkitCancelFullScreen && document.webkitCancelFullScreen(), document.getElementById("exitFullscreenButton") && (document.getElementById("exitFullscreenButton").style.display = "none")
}

function changeToUrl(e) {
    for (var t = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi, s = new RegExp(t), n = e.split(" "), o = 0; o < n.length; o++) n[o].match(s) && (n[o] = "<a target=\"_blank\" href=\"" + n[o] + "\">" + n[o] + "</a>");
    return n.join(" ")
}
var errorTimer, incomingAudio, incomingMessage, enterRoom, estimateDif = function(e) {
        var t = parseInt(e / 1e3, 10),
            s = Math.floor(t / 3600),
            n = Math.floor((t - 3600 * s) / 60),
            i = t - 3600 * s - 60 * n;
        if (s || n || i) {
            var o = 1 == s ? " hour " : " hours ";
            s = s ? s + o : "";
            var a = 1 == n ? " minute " : " minutes ";
            n = n ? n + a : "";
            var r = 1 == i ? " second " : " seconds ";
            return i = i ? i + r : "", s + n + i
        }
        return null
    },
    getCurrentTime = function() {
        var e = convertTimestamp(new Date().getTime(), !0);
        return e
    },
    guestName = function(e) {
        e.charCodeAt(0) + e.charCodeAt(e.length - 1);
        for (var t = 0, n = 0; n < e.length; n++) t += e.charCodeAt(n);
        var o = t % 100;
        return "Visitor-" + parseInt(o + 1)
    },
    getCurrentDateFormatted = function() {
        var e = new Date;
        return ("0" + e.getDate()).slice(-2) + "_" + ("0" + (e.getMonth() + 1)).slice(-2) + "_" + e.getFullYear() + "_" + ("0" + e.getHours()).slice(-2) + ("0" + e.getMinutes()).slice(-2)
    },
    convertTimestamp = function(e, t) {
        var s = new Date,
            n = new Date(e),
            i = s.getFullYear() === n.getFullYear() ? "" : ", " + n.getFullYear(),
            o = ("0" + (n.getMonth() + 1)).slice(-2),
            a = ("0" + n.getDate()).slice(-2),
            r = n.getHours(),
            d = n.getMinutes(),
            c = 12 <= r ? "pm" : "am";
        return hours = r % 12, hours = hours ? hours : 12, d = 10 > d ? "0" + d : d, time = t ? hours + ":" + d + " " + c : hours + ":" + d + " " + c, time
    },
    compareDates = function(e, t) {
        var s = new Date(e);
        s.setHours(0, 0, 0, 0);
        var n = new Date(t);
        return n.setHours(0, 0, 0, 0), s.getTime() === n.getTime()
    },
    escapeHtmlEntities = function(e) {
        return "undefined" == typeof jQuery ? e.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;") : jQuery("<div/>").text(e).html()
    },
    showMessage = function(e, t, s, n, i) {
        if (t) {
            var o = convertTimestamp(new Date().getTime(), !0);
            s = "" !== s && null !== s && "undefined" !== s && void 0 !== s ? s : "" === e ? "" : o;
            var a, r = document.createElement("li"),
                d = "left",
                c = "",
                l = "";
            if ("Me" === e || "Me~" == e.substring(0, 3)) {
                d = "right";
                var g = "";
                if ("Me~" == e.substring(0, 3))
                    if (e = e.substring(3, 300), g = " right-image", "img/small-avatar.jpg" !== i && i) l = "<img class=\"direct-chat-img " + d + "\" src=\"" + i + "\" alt=\"\" />";
                    else {
                        var m = e.match(/\b(\w)/g);
                        l = m.join("").toUpperCase(), l = l ? "<span class=\"acronym-right\">" + l + "</span>" : "<img class=\"direct-chat-img " + d + "\" src=\"img/small-avatar.jpg\" alt=\"\" />"
                    } className = "wd-right-bubble" + g
            } else if ("" === e) {
                var u = "";
                "divider" === n && (u = " divider"), className = "wd-system-bubble" + u
            } else if (playIncomingMessage(), "undefined" === e && (e = "Guest"), c = "wd-chat-name", a = "wd-chat-avatar", className = "wd-left-bubble", i || (i = "/img/small-avatar.jpg"), l = "<img class=\"direct-chat-img " + d + " " + e + "\" src=\"" + i + "\" alt=\"\" />", "He~" == e.substring(0, 3))
                if (e = e.substring(3, 500), "/img/small-avatar.jpg" !== i && i) l = "<img class=\"direct-chat-img " + d + " " + e + "\" src=\"" + i + "\" alt=\"\" />";
                else {
                    var m = e.match(/\b(\w)/g);
                    l = m.join("").toUpperCase();
                    var p = svg1 + l + svg2;
                    image = "data:image/svg+xml;base64," + btoa(p), l = l ? "<img class=\"direct-chat-img " + d + " " + e + "\" src=\"" + image + "\" alt=\"\" />" : "<img class=\"direct-chat-img " + d + " " + e + "\" src=\"/img/small-avatar.jpg\" alt=\"\" />"
                } n = n ? n : "", r.setAttribute("data-system-attribue", n), r.innerHTML = "<div class=\"" + className + "\">" + l + "<span class=\"" + c + "\">" + e + "</span><span class=\"timestamp\">" + s + "</span><div>" + t + "</div>";
            var S = document.getElementById("newdev_chat_ul1");
            S.appendChild(r), S.scrollTop = 999999
        }
    },
    ERROR_TIMER = 1e4,
    toggleError = function(e, t) {
        jQuery("#error_message").show(), jQuery("#error_message_text").html(e), clearTimeout(errorTimer), errorTimer = setTimeout(function() {
            jQuery("#error_message").hide(), jQuery("#error_message_text").html("")
        }, t ? t : ERROR_TIMER)
    },
    toggleNotification = function(e, t) {
        jQuery("#error_message").toggle(t), jQuery("#error_message_text").html(e)
    },
    getCookie = function(e) {
        var t = RegExp(e + "=.[^;]*"),
            s = document.cookie.match(t);
        if (s) {
            var n = s[0].split("="),
                i = n[1];
            return i
        }
        return null
    },
    setCookie = function(e, t, s) {
        var n = e,
            i = t,
            o = new Date,
            a = o.getTime(),
            r = a + 3600000 * parseInt(s);
        o.setTime(r), document.cookie = s ? n + "=" + i + ";expires=" + o.toGMTString() + ";path=/" : n + "=" + i + ";path=/"
    },
    getGuid = function() {
        function e() {
            return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
        }
        return e() + e() + "-" + e() + "-" + e() + "-" + e() + "-" + e() + e() + e()
    };

function playIncomingCall() {
    if (!document.hasFocus()) {
        incomingAudio = new Audio, incomingAudio.preload = "auto", incomingAudio.autoplay = !0, incomingAudio.loop = !0, incomingAudio.src = "../media/ringtone.mp3";
        var e = incomingAudio.play();
        isIEA || void 0 === e || e.then(function() {
            setTimeout(function() {
                incomingAudio && incomingAudio.pause()
            }, 1e4)
        }).catch(function(e) {
            console.log(e)
        })
    }
}

function playIncomingMessage() {
    if (!document.hasFocus()) {
        incomingMessage = new Audio, incomingMessage.preload = "auto", incomingMessage.autoplay = !0, incomingMessage.loop = !1, incomingMessage.src = "../media/msgtone.mp3";
        var e = incomingMessage.play();
        isIEA || void 0 === e || e.then(function() {
            setTimeout(function() {
                incomingMessage && incomingMessage.pause()
            }, 1e3)
        }).catch(function(e) {
            console.log(e)
        })
    }
}

function playEnterRoom() {
    if (!document.hasFocus()) {
        enterRoom = new Audio, enterRoom.preload = "auto", enterRoom.autoplay = !0, enterRoom.loop = !1, enterRoom.src = "../media/msgtone.mp3", enterRoom.play();
        var e = enterRoom.play();
        void 0 !== e && e.then(function() {
            setTimeout(function() {
                enterRoom && enterRoom.pause()
            }, 1e3)
        }).catch(function(e) {
            console.log(e)
        })
    }
}

function stopIncomingCall() {
    if (isIEA) return incomingAudio && (incomingAudio.pause(), incomingAudio.src = ""), !0;
    if (incomingAudio) {
        var e = incomingAudio.pause();
        void 0 !== e && e.then(function() {}).catch(function(e) {
            console.log(e)
        })
    }
}
var myMediaStream, callPC = [],
    remoteStream = [],
    comController = function() {
        var t, s, n, i, o, a, r, d, c, l, g, m, u, p, S, h, f, I, v = this,
            C = {
                offerToReceiveAudio: 1,
                offerToReceiveVideo: 1
            },
            y = QueryString(),
            E = "admin",
            b = y.room ? y.room : E,
            k = "undefined" != typeof isAdmin,
            R = y.isAdmin,
            A = 5000,
            w = [],
            F = 0,
            L = 0,
            M = 0,
            D = null,
            T = 0,
            B = "",
            x = !1;
        this.init = function(e) {
            var t = document.getElementsByClassName("initCall");
            x = e;
            for (var s = 0; s < t.length; s++) t[s].addEventListener("click", this.initCall);
            v.openSocket(), b != E && $("#chatInput").on("keyup", function() {
                var e = this.value.trim();
                e ? d.send(JSON.stringify({
                    action: "typingStatus",
                    status: !0,
                    room: b
                })) : d.send(JSON.stringify({
                    action: "typingStatus",
                    status: !1,
                    room: b
                }))
            })
        }, this.reconnectWebsocket = function(t) {
            console.log("WebSocketClient reconnecting in " + A, t), setTimeout(function() {
                console.log("WebSocketClient: reconnecting..."), v.openSocket()
            }, A)
        }, this.openSocket = function() {
            d = new WebSocket(svConfigs.appWss), d.onclose = function(t) {
                var t = jQEngager.Event("AdminOffline");
                switch (jQEngager(document).trigger(t), jQEngager("#visitors").empty(), t.code) {
                    case 1e3:
                        console.log("WebSocket: closed");
                        break;
                    default:
                        v.reconnectWebsocket(t);
                }
            }, d.onopen = function() {
                console.log("wsChat started!"), c = getCookie("visitorId") ? getCookie("visitorId") : Math.random().toString(36).slice(2).substring(0, 15), l = getCookie("sessionId") ? getCookie("sessionId") : getGuid(), (k || R) && (c = "admin"), setCookie("visitorId", c, 1), setCookie("sessionId", l, 1), b === E ? (d.send(JSON.stringify({
                    action: "subscribe",
                    referrer: document.title,
                    ua: navigator.userAgent,
                    visitorId: c,
                    sessionId: l,
                    room: E,
                    isAdmin: R
                })), d.send(JSON.stringify({
                    action: "online",
                    referrer: document.title,
					m_name: document.getElementById("roomname").value,
					m_id: document.getElementById("sendid").value,
                    m_response: document.getElementById("response").value,
					me_id: document.getElementById("myid").value,
					m_call: document.getElementById("call").value,
					m_accept: document.getElementById("accept").value,
					m_code: document.getElementById("code").value,
					m_message: document.getElementById("message").value,
					m_order: document.getElementById("order").value,
					m_product: document.getElementById("product").value,
					
                    ua: navigator.userAgent,
                    visitorId: c,
                    sessionId: l,
                    room: E,
                    isAdmin: R
                }))) : (d.send(JSON.stringify({
                    action: "subscribe",
                    referrer: document.title,
                    ua: navigator.userAgent,
                    visitorId: c,
                    sessionId: l,
                    room: b,
                    isAdmin: R
                })), d.send(JSON.stringify({
                    action: "ping",
                    room: E,
                    visitorId: b,
                    sessionId: l,
                    isAdmin: R
                }))), d.send(JSON.stringify({
                    action: "giveOnline",
                    room: b
                })), d.send(JSON.stringify({
                    action: "giveCountOnline",
                    room: b
                }));
                var t = jQEngager.Event("CommConnected");
                jQEngager(document).trigger(t), v.showStatusBar("Connected to the chat server!", 5e3)
            }, d.onerror = function() {
                v.showStatusBar("Unable to connect to the chat server! Kindly refresh", 2e4)
            }, d.onmessage = function(i) {
                var o = JSON.parse(i.data);
                if (console.log("onmessage", JSON.stringify(o), o.action, b, o.visitorId), "imOnline" === o.action)
                    if ("admin" === o.visitorId) {
                        console.log("admin is online");
                        var i = jQEngager.Event("AdminOnline", {
                            sessionId: o.sessionId
                        });
                        jQEngager(document).trigger(i);
                        var i = jQEngager.Event("AdminPopupOnline", {
                            sessionId: o.sessionId,
                            pass: o.pass
                        });
                        jQEngager(document).trigger(i)
                    } else {
                        var i = jQEngager.Event("PopupOnline", {
                            sessionId: o.sessionId
                        });
                        jQEngager(document).trigger(i)
                    } if ("whoIsroom" === o.action) {
                    console.log("whoIsroom", o), s = o.count;
                    var i = jQEngager.Event("VisitorsRoom", {
                        count: o.count
                    });
                    jQEngager(document).trigger(i)
                }
                if ("imOffline" === o.action) {
                    if (o.visitors)
                        if ("admin" === o.visitors.visitorId) {
                            console.log("admin is offline");
                            var i = jQEngager.Event("AdminOffline");
                            if (jQEngager(document).trigger(i), o.room !== E) {
                                var i = jQEngager.Event("AdminPopupOffline");
                                jQEngager(document).trigger(i)
                            }
                        } else {
                            var i = jQEngager.Event("PopupLeft", {
                                sessionId: o.visitors.sessionId
                            });
                            jQEngager(document).trigger(i)
                        } if (o.visitorId && "admin" === o.visitorId) {
                        console.log("admin is offline");
                        var i = jQEngager.Event("AdminOffline");
                        if (jQEngager(document).trigger(i), o.room !== E) {
                            var i = jQEngager.Event("AdminPopupOffline");
                            jQEngager(document).trigger(i)
                        }
                    }
                }
                if (o.room === b) switch (o.action) {
                    case "initCall":
                        var i = jQEngager.Event("IncomingCall", {
                            autoaccept: o.autoaccept,
                            sessionId: o.sessionId
                        });
                        jQEngager(document).trigger(i);
                        break;
                    case "initScreenShare":
                        var i = jQEngager.Event("IncomingScreenShare", {
                            autoaccept: o.autoaccept
                        });
                        jQEngager(document).trigger(i);
                        break;
                    case "callRejected":
                        var i = jQEngager.Event("CallEnded");
                        jQEngager(document).trigger(i);
                        break;
                    case "endScreenShare":
                        var i = jQEngager.Event("ScreenShareEnded");
                        jQEngager(document).trigger(i);
                        break;
                    case "endCall":
                        v.handleCallTermination(o.sessionId);
                        break;
                    case "callAccepted":
                        if (o.sessionId in callPC) return;
                        if (o.remoteSessionId == v.getSessionId())
                            if (v.getStream()) {
                                v.startCall(!0, o.sessionId, v.getStream()), clearTimeout(n);
                                var i = jQEngager.Event("CallAccepted");
                                jQEngager(document).trigger(i)
                            } else setTimeout(function() {
                                v.startCall(!0, o.sessionId, v.getStream()), clearTimeout(n);
                                var t = jQEngager.Event("CallAccepted");
                                jQEngager(document).trigger(t)
                            }, 5e3);
                        break;
                    case "startFileTransfer":
                        var i = jQEngager.Event("IncomingFileTransfer", {
                            name: o.name,
                            size: o.size,
                            sessionId: o.sessionId
                        });
                        jQEngager(document).trigger(i);
                        break;
                    case "fileAccepted":
                        var i = jQEngager.Event("FileAccepted");
                        jQEngager(document).trigger(i);
                        break;
                    case "whiteboardSync":
                        var i = jQEngager.Event("WhiteboardSync", {
                            whiteboardData: o.data,
                            sessionId: o.sessionId
                        });
                        jQEngager(document).trigger(i);
                        break;
                    case "fileRejected":
                        var i = jQEngager.Event("FileRejected", {
                            sessionId: o.sessionId
                        });
                        jQEngager(document).trigger(i);
                        break;
                    case "candidate":
                        o.candidate && (callPC[o.sessionId] ? callPC[o.sessionId].addIceCandidate(new RTCIceCandidate(JSON.parse(o.candidate)), function() {
                            console.log("onAddIceCandidateSuccess")
                        }, function(e) {
                            console.log("onAddIceCandidateFailed", e)
                        }) : "");
                        break;
                    case "ssCandidate":
                        o.candidate && (t ? t.addIceCandidate(new RTCIceCandidate(JSON.parse(o.candidate)), function() {
                            console.log("onAddIceCandidateSuccess")
                        }, function(e) {
                            console.log("onAddIceCandidateFailed", e)
                        }) : "");
                        break;
                    case "fileLocalCandidate":
                        o.candidate && S.addIceCandidate(o.candidate, v.onAddIceCandidateSuccess, v.onAddIceCandidateError);
                        break;
                    case "fileCandidate":
                        o.candidate && h.addIceCandidate(o.candidate, v.onAddIceCandidateSuccess, v.onAddIceCandidateError);
                        break;
                    case "remoteDescription":
                        callPC[o.sessionId] && o.remoteSessionId == v.getSessionId() && (!callPC[o.sessionId].remoteDescription && callPC[o.sessionId].setRemoteDescription(new RTCSessionDescription(o.sdp)), callPC[o.sessionId].createAnswer(function(t) {
                            callPC[o.sessionId].setLocalDescription(t);
                            var s = jQEngager.Event("LocalVideoStarted", {
                                stream: v.getStream()
                            });
                            jQEngager(document).trigger(s), d.send(JSON.stringify({
                                action: "localDescription",
                                sdp: t,
                                room: b,
                                sessionId: v.getSessionId(),
                                remoteSessionId: o.sessionId
                            }))
                        }, v.showErrors));
                        break;
                    case "remoteScreenDescription":
                        v.startScreenShare(null, !1), t && (t.setRemoteDescription(new RTCSessionDescription(o.sdp)), t.createAnswer(v.onSetLocalScreenSuccess2, v.showErrors));
                        break;
                    case "localScreenDescription":
                        t ? t.setRemoteDescription(new RTCSessionDescription(o.sdp)) : "";
                        break;
                    case "localDescription":
                        if (o.remoteSessionId == v.getSessionId()) {
                            var a = callPC[o.sessionId].remoteDescription;
                            a || (callPC[o.sessionId] ? callPC[o.sessionId].setRemoteDescription(new RTCSessionDescription(o.sdp)) : "")
                        }
                        break;
                    case "fileRemoteDescription":
                        h.setRemoteDescription(o.sdp), h.createAnswer(v.gotDescription2, v.showErrors);
                        break;
                    case "fileLocalDescription":
                        S.setRemoteDescription(o.sdp);
                        break;
                    case "txt":
                        v.addRemoteChat(o.msg, o.date, o.sessionId);
                        break;
                    case "typingStatus":
                        break;
                    case "newSub":
                        (!roomId || roomId && roomId == o.visitorId) && (v.setRemoteStatus("online", o.sessionId), d.send(JSON.stringify({
                            action: "imOnline",
                            visitorId: c,
                            room: b,
                            pass: x,
                            count: o.count,
                            sessionId: v.getSessionId()
                        })), k && v.showStatusBar("Remote entered room", 1e4));
                        break;
                    case "imOffline":
                        if (1 == o.count && v.setRemoteStatus("offline", o.sessionId), k && o.visitors && jQEngager("#visitors").find("#" + o.visitors.visitorId).remove(), o.visitors && "admin" === o.visitors.visitorId) {
                            var i = jQEngager.Event("AdminOffline");
                            jQEngager(document).trigger(i)
                        }
                        break;
                    case "popupClosed":
                        var i = jQEngager.Event("PopupClosed");
                        jQEngager(document).trigger(i), jQEngager("#visitors").find("#room" + o.visitorId).remove();
                        break;
                    case "RemoteVideoUnmuted":
                        var i = jQEngager.Event("RemoteVideoUnmuted", {
                            sessionId: o.sessionId
                        });
                        jQEngager(document).trigger(i);
                        break;
                    case "RemoteVideoMuted":
                        var i = jQEngager.Event("RemoteVideoMuted", {
                            sessionId: o.sessionId
                        });
                        jQEngager(document).trigger(i);
                        break;
                    case "startRecording":
                        var i = jQEngager.Event("RemoteStartRecording");
                        jQEngager(document).trigger(i);
                        break;
                    case "stopRecording":
                        var i = jQEngager.Event("RemoteStopRecording");
                        jQEngager(document).trigger(i);
                        break;
                    case "ping":
                        if (k) {
                            var r = jQEngager("#visitors").find("#" + o.visitorId),
                                l = jQEngager("#visitors").find("#room" + o.visitorId);
                            if (0 < r.length && 0 === l.length) {
                                var g = r.children().children().children(),
                                    m = {};
                                m.names = guestName(o.sessionId), lsRepUrl && (m.lsRepUrl = lsRepUrl);
                                var u = window.btoa(JSON.stringify(m)),
                                    p = lsRepUrl + "pages/room.html?room=" + o.visitorId + "&p=" + u + "&isAdmin=1",
                                    f = document.createElement("span");
                                f.id = "room" + o.visitorId, f.innerHTML = " <a href=\"" + p + "\" target=\"_blank\">Enter Room</a>", g.append(f);
                                var i = jQEngager.Event("EnterPageNotification");
                                jQEngager(document).trigger(i)
                            }
                        } else if (o.visitorId === c && "admin" === o.room) {
                            var i = jQEngager.Event("AdminPopupOnline", {
                                sessionId: o.sessionId,
                                pass: o.pass
                            });
                            jQEngager(document).trigger(i)
                        }
                        break;
                    case "online":
                        if (k && (!roomId || roomId && roomId == o.visitorId)) {
							
                            jQEngager("#visitors").find("#" + o.visitorId).remove();
							if(o.m_call == 'yes') {
                            var f = document.getElementById('call' + o.m_id ).click() , 
							ff = document.getElementById('roomid' + o.m_id ).setAttribute('data-id', o.me_id);
								}
							else if(o.m_message == 'yes') {
                            var f = document.getElementById('message' + o.m_id ).click();
							ff = document.getElementById('roomid' + o.m_id ).setAttribute('data-id', o.me_id);
								} 
							else if(o.m_order == 'yes') {
                            var f = document.getElementById('order' + o.m_id ).click();
							ff = document.getElementById('order' + o.m_id ).setAttribute('data-id', o.me_id);
								}
                            else if(o.m_response == 'yes') {
                                var f = document.getElementById('response' + o.m_id ).click();
						
                            }
			
							else if(o.m_accept== 'yes') {
                            var f = document.getElementById('accept' + o.m_id ).click();
								ff = document.getElementById('code' + o.m_id ).setAttribute('data-code', o.m_code);		
								}
                            
                            var I = o.ua ? detect.parse(o.ua) : "",
                                C = o.m_id,
                                y = o.m_name;   //HERO
                            f , ff   }
                        if ("admin" === o.visitorId) {
                            var i = jQEngager.Event("AdminOnline", {
                                sessionId: o.sessionId
                            });
                            jQEngager(document).trigger(i)
                        }
                        break;
                    case "checkPopup":
                        var i = jQEngager.Event("CheckPopup");
                        jQEngager(document).trigger(i);
                        break;
                    case "setCallerInfo":
                        var i = jQEngager.Event("CallerInfo", {
                            sessionId: o.sessionId,
                            callerInfo: o.callerInfo,
                            isAdmin: o.isAdmin
                        });
                        jQEngager(document).trigger(i);
                        break;
                    case "sendCallerBack":
                        var i = jQEngager.Event("SendCallerBack", {
                            access: o.access,
                            sessionId: o.sessionId
                        });
                        jQEngager(document).trigger(i);
                        break;
                    case "whoIsonline":
                        var R = o.visitors;
                        for (var A in R)
                            if (R[A]) {
                                console.log(R[A].visitorId);
                                var w = R[A].visitorId;
                                if (k && w !== c && (!roomId || roomId && roomId == w)) {
                                    var f = document.createElement("div");
                                    f.className = "row msg_container base_receive", f.id = w;
                                    var I = R[A].ua ? detect.parse(R[A].ua) : "",
                                        C = I ? I.browser.name : "",
                                        y = I ? I.os.name : "";
                                    f.innerHTML = "<div class=\"col-sm-10 col-xs-10\">                                                                            <div class=\"messages msg_receive\">                                                                                    <p>" + guestName(R[A].sessionId) + " " + R[A].pageRef + "<br/>" + y + " " + C + "</p>                                                                                                                                                                </div>                                                                    </div>", jQEngager("#visitors").append(f), d.send(JSON.stringify({
                                        action: "checkPopup",
                                        visitorId: "admin",
                                        room: w
                                    }))
                                }
                                if ("admin" === R[A]) {
                                    var i = jQEngager.Event("AdminPopupOnline", {
                                        sessionId: R[A].sessionId,
                                        name: R[A].name ? R[A].name : ""
                                    });
                                    jQEngager(document).trigger(i)
                                }
                                if (R[A].visitorId !== c)
                                    if (1 === R[A].isAdmin) {
                                        var i = jQEngager.Event("AdminPopupOnline", {
                                            sessionId: R[A].sessionId,
                                            name: R[A].name ? R[A].name : ""
                                        });
                                        jQEngager(document).trigger(i)
                                    } else {
                                        var i = jQEngager.Event("PopupOnline", {
                                            sessionId: R[A].sessionId,
                                            name: R[A].name ? R[A].name : ""
                                        });
                                        jQEngager(document).trigger(i)
                                    }
                            }
                } else "subRejected" === o.action && v.showStatusBar("Maximum users in a room reached. Communication disallowed", 5e3)
            }
        }, this.popupClosed = function(e) {
            d.send(JSON.stringify({
                action: "popupClosed",
                room: b,
                visitorId: e
            }))
        }, this.getConstraint = function(e, t) {
            var s = e ? e : "initVideo" === this.id ? "Video" : "Audio";
            switch (s) {
                case "Video":
                    var n = t ? {
                        deviceId: {
                            exact: t
                        }
                    } : {
                        facingMode: "user"
                    };
                    i = {
                        video: n,
                        audio: !0
                    };
                    break;
                case "Audio":
                    i = {
                        audio: !0,
                        video: !1
                    };
                    break;
                default:
                    var n = t ? {
                        deviceId: {
                            exact: t
                        }
                    } : {
                        facingMode: "user"
                    };
                    i = {
                        video: n,
                        audio: !0
                    };
            }
            console.log("getConstraint", i)
        }, this.startRecording = function() {
            d.send(JSON.stringify({
                action: "startRecording",
                room: b,
                sessionId: v.getSessionId()
            }))
        }, this.stopRecording = function() {
            d.send(JSON.stringify({
                action: "stopRecording",
                room: b,
                sessionId: v.getSessionId()
            }))
        }, this.initCall = function(t, s, i, o) {
            if (a = !0, v.getConstraint(t, i), v.checkUserMediaSupport) console.log("start call"), v.setLocalMedia(o), d.send(JSON.stringify({
                action: "initCall",
                room: b,
                autoaccept: s,
                sessionId: o
            })), n = setTimeout(function() {
                var t = jQEngager.Event("CallEnded");
                jQEngager(document).trigger(t), v.endCall("Call ended due to lack of response", v.getSessionId())
            }, 6e4);
            else {
                var r = jQEngager.Event("NotSupportedBrowser");
                jQEngager(document).trigger(r)
            }
        }, this.initScreen = function(t) {
            if (a = !0, v.checkUserMediaSupport) console.log("initScreenShare"), d.send(JSON.stringify({
                action: "initScreenShare",
                room: b,
                autoaccept: t
            }));
            else {
                var s = jQEngager.Event("NotSupportedBrowser");
                jQEngager(document).trigger(s)
            }
        }, this.rejectCall = function() {
            d.send(JSON.stringify({
                action: "callRejected",
                msg: "Call rejected by Remote",
                room: b
            }))
        }, this.answerCall = function(e, t) {
            a = !1, v.getConstraint(e), v.setLocalMedia(t)
        }, this.startScreenShare = function(e, s) {
            v.setScreenStream(e), t = new RTCPeerConnection(svConfigs.iceServers), t.onicecandidate = function(t) {
                if (t.candidate) {
                    var e = {
                        candidate: t.candidate.candidate,
                        sdpMLineIndex: t.candidate.sdpMLineIndex,
                        sdpMid: t.candidate.sdpMid
                    };
                    if (isIEA) var s = e;
                    else s = t.candidate;
                    d.send(JSON.stringify({
                        action: "ssCandidate",
                        candidate: JSON.stringify(s),
                        room: b
                    }))
                }
            }, isIEA ? t.onaddstream = function(t) {
                console.log("onaddstream");
                var t = jQEngager.Event("RemoteScreenShareStarted", {
                    stream: t.stream
                });
                jQEngager(document).trigger(t)
            } : t.ontrack = function(t) {
                console.log("ontrack");
                var t = jQEngager.Event("RemoteScreenShareStarted", {
                    stream: t.streams[0]
                });
                jQEngager(document).trigger(t)
            }, s && (t.addStream(v.getScreenStream()), t.createOffer(v.onSetLocalScreenSuccess, v.showErrors, C))
        }, this.startCall = function(e, t, s) {
            a = e, console.log("startCall", t, r), callPC[t] = new RTCPeerConnection(svConfigs.iceServers), console.log("startCall", t, callPC), callPC[t].onicecandidate = function(t) {
                if (t.candidate) {
                    var e = {
                        candidate: t.candidate.candidate,
                        sdpMLineIndex: t.candidate.sdpMLineIndex,
                        sdpMid: t.candidate.sdpMid
                    };
                    if (isIEA) var s = e;
                    else s = t.candidate;
                    d.send(JSON.stringify({
                        action: "candidate",
                        candidate: JSON.stringify(s),
                        room: b,
                        sessionId: v.getSessionId()
                    }))
                }
            }, callPC[t].oniceconnectionstatechange = function() {
                switch (callPC[t].iceConnectionState) {
                    case "disconnected":
                    case "failed":
                        v.handleCallTermination(t), console.log("Ice connection state is failed/disconnected"), v.showStatusBar("Call connection problem", 15e3);
                        break;
                    case "closed":
                        v.handleCallTermination(t), console.log("Ice connection state is 'closed'"), v.showStatusBar("Call connection closed", 15e3);
                }
            }, callPC[t].onsignalingstatechange = function() {
                switch (callPC[t].signalingState) {
                    case "closed":
                        console.log("Signalling state is 'closed'"), v.showStatusBar("Signal lost", 15e3);
                }
            }, isIEA ? (callPC[t].onaddstream = function(s) {
                remoteStream[t] = s.stream;
                var s = jQEngager.Event("RemoteVideoStarted", {
                    stream: s.stream,
                    sessionId: t
                });
                jQEngager(document).trigger(s)
            }, callPC[t].addStream(s)) : (callPC[t].ontrack = function(s) {
                console.log("ontrack"), remoteStream[t] = s.streams[0];
                var s = jQEngager.Event("RemoteVideoStarted", {
                    stream: s.streams[0],
                    sessionId: t
                });
                jQEngager(document).trigger(s)
            }, s.getTracks().forEach(function(e) {
                callPC[t].addTrack(e, s)
            })), a && callPC[t].createOffer(function(n) {
                callPC[t].setLocalDescription(n);
                var i = jQEngager.Event("LocalVideoStarted", {
                    stream: s
                });
                jQEngager(document).trigger(i), d.send(JSON.stringify({
                    action: "remoteDescription",
                    sdp: n,
                    room: b,
                    sessionId: v.getSessionId(),
                    remoteSessionId: t
                }))
            }, v.showErrors, C)
        }, this.checkUserMediaSupport = function() {
            return !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia)
        }, this.showErrors = function(t) {
            switch (console.log("showErrors", t), t.name) {
                case "SecurityError":
                    console.log(t.message), v.showStatusBar("Media sources usage is not supported on this browser/device", 1e4);
                    break;
                case "NotAllowedError":
                    console.log(t.message), v.showStatusBar("We do not have access to your audio/video sources", 1e4);
                    break;
                case "NotFoundError":
                    console.log(t.message), v.showStatusBar("The requested audio/video source cannot be found", 1e4);
                    break;
                case "NotReadableError":
                case "AbortError":
                    console.log(t.message), v.showStatusBar("Unable to use your media sources", 1e4);
            }
        }, this.setStream = function(e) {
            myMediaStream = e
        }, this.gotDevices = function(t) {
            for (var s = [], n = 0; n !== t.length; ++n) {
                var o = t[n],
                    a = {};
                "videoinput" === o.kind && (a.value = o.deviceId, a.text = o.label, s.push(a))
            }
            var r = jQEngager.Event("MediaDevices", {
                devices: s
            });
            jQEngager(document).trigger(r)
        }, this.handleError = function(e) {
            console.log("navigator.getUserMedia error: ", e)
        }, this.checkMediaDevices = function() {
            (isiPhone || isAndroid) && navigator.mediaDevices.enumerateDevices().then(v.gotDevices).catch(v.handleError)
        }, this.onCreateSessionDescriptionError = function(t) {
            v.showErrors(t)
        }, this.gumFailed = function(t) {
            v.showErrors(t)
        }, this.setLocalMedia = function(e) {
            r = e, "undefined" == typeof Promise ? navigator.getUserMedia(i, function(t) {
                v.setStream(t), a || (v.startCall(!1, e, t), v.checkUserMediaSupport ? d.send(JSON.stringify({
                    action: "callAccepted",
                    room: b,
                    sessionId: v.getSessionId(),
                    remoteSessionId: e
                })) : d.send(JSON.stringify({
                    action: "callRejected",
                    msg: "Remote's device does not have the necessary requirements to make call",
                    room: b,
                    sessionId: v.getSessionId(),
                    remoteSessionId: e
                })))
            }, v.gumFailed) : navigator.mediaDevices.getUserMedia(i).then(function(t) {
                v.setStream(t), a || (v.startCall(!1, e, t), v.checkUserMediaSupport ? d.send(JSON.stringify({
                    action: "callAccepted",
                    room: b,
                    sessionId: v.getSessionId(),
                    remoteSessionId: e
                })) : d.send(JSON.stringify({
                    action: "callRejected",
                    msg: "Remote's device does not have the necessary requirements to make call",
                    room: b,
                    sessionId: v.getSessionId(),
                    remoteSessionId: e
                })))
            }).catch(v.gumFailed)
        }, this.addRemoteChat = function(t, s, n) {
            var i = jQEngager.Event("ChatMessage", {
                msg: t,
                date: s,
                sessionId: n
            });
            jQEngager(document).trigger(i)
        }, this.addLocalChat = function(e, t, s) {
            var n = v.randomString(5);
            s && v.sendChatToSocket(e, t, n)
        }, this.setCallerInfo = function(e, t, s) {
            d.send(JSON.stringify({
                action: "setCallerInfo",
                visitorId: c,
                sessionId: e,
                room: b,
                callerInfo: t,
                isAdmin: s
            }))
        }, this.sendCallerBack = function(e, t) {
            d.send(JSON.stringify({
                action: "sendCallerBack",
                visitorId: c,
                room: b,
                access: e,
                sessionId: t
            }))
        }, this.useH264Codec = function(e) {
            var t;
            return t = isFirefox ? e.replace("m=video 9 UDP/TLS/RTP/SAVPF 120 126 97\r\n", "m=video 9 UDP/TLS/RTP/SAVPF 126 120 97\r\n") : e.replace("m=video 9 UDP/TLS/RTP/SAVPF 100 101 107 116 117 96 97 99 98\r\n", "m=video 9 UDP/TLS/RTP/SAVPF 107 101 100 116 117 96 97 99 98\r\n"), t
        }, this.onSetLocalScreenSuccess = function(s) {
            s.sdp = v.useH264Codec(s.sdp), t.setLocalDescription(s);
            var n = jQEngager.Event("LocalScreenStarted", {
                stream: v.getStream()
            });
            jQEngager(document).trigger(n), d.send(JSON.stringify({
                action: "remoteScreenDescription",
                sdp: s,
                room: b
            }))
        }, this.onSetLocalScreenSuccess2 = function(s) {
            s.sdp = v.useH264Codec(s.sdp), t.setLocalDescription(s);
            var n = jQEngager.Event("LocalScreenStarted", {
                stream: v.getStream()
            });
            jQEngager(document).trigger(n), d.send(JSON.stringify({
                action: "localScreenDescription",
                sdp: s,
                room: b
            }))
        }, this.endCall = function(e, t) {
            d.send(JSON.stringify({
                action: "endCall",
                msg: e,
                room: b,
                sessionId: t
            })), clearTimeout(n)
        }, this.toggleVideo = function() {
            var t = v.getStream().getVideoTracks();
            if (0 === t.length) {
                var s = jQEngager.Event("RestartVideo");
                return void jQEngager(document).trigger(s)
            }
            for (var n = 0; n < t.length; ++n) t[n].enabled = !t[n].enabled;
            var o = t[0].enabled ? "VideoUnmuted" : "VideoMuted",
                a = t[0].enabled ? "RemoteVideoUnmuted" : "RemoteVideoMuted",
                s = jQEngager.Event(o);
            jQEngager(document).trigger(s), d.send(JSON.stringify({
                action: a,
                room: b,
                sessionId: v.getSessionId()
            }))
        }, this.toggleAudio = function() {
            var t = v.getStream().getAudioTracks();
            if (0 === t.length) return void console.log("No local audio available.");
            for (var s = 0; s < t.length; ++s) t[s].enabled = !t[s].enabled;
            console.log("Audio " + (t[0].enabled ? "unmuted." : "muted."));
            var n = t[0].enabled ? "AudioUnmuted" : "AudioMuted",
                o = t[0].enabled ? "RemoteAudioUnmuted" : "RemoteAudioMuted",
                a = jQEngager.Event(n);
            jQEngager(document).trigger(a), d.send(JSON.stringify({
                action: o,
                room: b,
                sessionId: l
            }))
        }, this.adminOnline = function() {
            d.send(JSON.stringify({
                action: "imOnline",
                visitorId: "admin",
                room: b,
                pass: x,
                sessionId: v.getSessionId()
            }))
        }, this.adminOffline = function() {
            d.send(JSON.stringify({
                action: "imOffline",
                visitorId: "admin",
                room: b
            }))
        }, this.sendChatToSocket = function(e, t) {
            d.send(JSON.stringify({
                action: "txt",
                msg: e,
                date: t,
                room: b,
                sessionId: v.getSessionId()
            }))
        }, this.sendWhiteboardData = function(e) {
            d.send(JSON.stringify({
                action: "whiteboardSync",
                data: JSON.stringify(e),
                room: b,
                sessionId: v.getSessionId()
            }))
        }, this.addStreamStopListener = function(e, t) {
            var s = "ended";
            "oninactive" in e && (s = "inactive"), e.addEventListener(s, function() {
                t(), t = function() {}
            }, !1), e.getAudioTracks().forEach(function(e) {
                e.addEventListener(s, function() {
                    t(), t = function() {}
                }, !1)
            }), e.getVideoTracks().forEach(function(e) {
                e.addEventListener(s, function() {
                    t(), t = function() {}
                }, !1)
            })
        }, this.stopCall = function(t) {
            callPC[t] && (callPC[t].onicecandidate = null, callPC[t].onsignalingstatechange = null, callPC[t].ontrack = null, callPC[t].oniceconnectionstatechange = null, callPC[t].close(), callPC[t] = null, delete remoteStream[t], delete callPC[t]);
            var s = jQEngager.Event("CallEnded", {
                sessionId: t
            });
            jQEngager(document).trigger(s)
        }, this.handleCallTermination = function(e) {
            if (console.log("handleCallTermination", e), e) v.stopCall(e), v.getVideoSessions() || v.stopMediaStream();
            else {
                for (var t in callPC) v.stopCall(t);
                v.stopMediaStream()
            }
        }, this.handleScreenShareTermination = function() {
            d.send(JSON.stringify({
                action: "endScreenShare",
                msg: "ScreenShare ended",
                room: b
            })), v.stopScreenShareStream()
        }, this.setPing = function(e) {
            d.send(JSON.stringify({
                action: "ping",
                room: E,
                pass: x,
                visitorId: c,
                sessionId: e
            }))
        }, this.setRemoteStatus = function(t, s) {
            if ("online" === t) {
                var n = jQEngager.Event("PopupOnline", {
                    sessionId: s
                });
                jQEngager(document).trigger(n)
            } else {
                var n = jQEngager.Event("CallEnded", {
                    sessionId: s
                });
                jQEngager(document).trigger(n);
                var n = jQEngager.Event("PopupOffline", {
                    sessionId: s
                });
                jQEngager(document).trigger(n)
            }
        }, this.stopMediaStream = function() {
            v.getStream() && v.getStream().getTracks().forEach(function(e) {
                e.stop()
            }), v.setStream(null), myMediaStream = null
        }, this.stopScreenShareStream = function() {
            v.getScreenStream() && v.getScreenStream().getTracks().forEach(function(e) {
                e.stop()
            }), v.setScreenStream(null)
        }, this.showStatusBar = function(e, t) {
            console.log("showStatusBar", e), jQEngager("#statusbar").html(e), jQEngager("#statusbar").show(), setTimeout(function() {
                jQEngager("#statusbar").hide()
            }, t)
        }, this.randomString = function(e) {
            var t = Math.random().toString(36).slice(2).substring(0, e);
            return t
        }, this.getStream = function() {
            return myMediaStream
        }, this.getRemoteStreams = function() {
            return remoteStream
        }, this.getRemoteStream = function(e) {
            return remoteStream[e]
        }, this.getVideoSessions = function() {
            return 0 < Object.keys(callPC).length
        }, this.getCountSessions = function() {
            return Object.keys(callPC).length
        }, this.getScreenStream = function() {
            return o
        }, this.setScreenStream = function(e) {
            o = e
        }, this.getVisitorId = function() {
            return c
        }, this.getSessionId = function() {
            return l
        }, this.getRemoteSessionId = function() {
            return r
        }, this.sendFile = function() {
            var e = fileInput.files[0];
            d.send(JSON.stringify({
                action: "startFileTransfer",
                room: b,
                size: e.size,
                name: e.name,
                sessionId: l
            }))
        }, this.createFileConnection = function() {
            m = null, S = new RTCPeerConnection(svConfigs.iceServers, m), console.log("Created local peer connection object localConnection"), u = S.createDataChannel("sendDataChannel", {
                ordered: !0
            }), u.binaryType = "arraybuffer", console.log("Created send data channel"), u.onopen = v.onSendChannelStateChange, u.onclose = v.onSendChannelStateChange, S.onicecandidate = v.iceCallback1, S.createOffer(v.gotDescription1, v.onCreateSessionDescriptionError)
        }, this.fileAccepted = function(t) {
            d.send(JSON.stringify({
                action: "fileAccepted",
                room: b
            })), v.startFileTransfer(t)
        }, this.fileRejected = function() {
            d.send(JSON.stringify({
                action: "fileRejected",
                room: b,
                sessionId: l
            }))
        }, this.startFileTransfer = function(t) {
            progressBar.max = t.size, h = new RTCPeerConnection(svConfigs.iceServers, m), I = {
                name: t.name,
                size: t.size
            }, h.onicecandidate = v.iceCallback2, h.ondatachannel = v.receiveChannelCallback
        }, this.onCreateSessionDescriptionError = function(e) {
            console.log("Failed to create session description: " + e.toString())
        }, this.sendData = function() {
            var t = fileInput.files[0];
            if (w = [], console.log("file is " + [t.name, t.size, t.type, t.lastModifiedDate].join(" ")), downloadAnchor.textContent = "", 0 === t.size) return void v.closeDataChannels();
            progressBar.max = t.size, B = 0 < t.type.length ? t.type : "text/plain";
            var s = 81920,
                n = !0;
            "number" == typeof u.bufferedAmountLowThreshold && (n = !1, s = 8192, u.bufferedAmountLowThreshold = s);
            var i = function() {
                    u.removeEventListener("bufferedamountlow", i), o(0)
                },
                o = function(a) {
                    var r = new window.FileReader;
                    r.onload = function() {
                        return function(r) {
                            var e = new Int8Array(r.target.result, 0, r.target.result.byteLength);
                            return u.bufferedAmount > s ? void(n ? setTimeout(o, 150, a) : u.addEventListener("bufferedamountlow", i)) : void(u.send(e), progressBar.value = a + r.target.result.byteLength, t.size > a + r.target.result.byteLength ? window.setTimeout(o, 0, a + 16384) : g = !1)
                        }
                    }(t);
                    var d = t.slice(a, a + 16384);
                    r.readAsArrayBuffer(d)
                };
            o(0)
        }, this.closeDataChannels = function() {
            u && u.close(), p && p.close(), S && (S.close(), S = null), h && (h.close(), h = null)
        }, this.gotDescription1 = function(e) {
            S.setLocalDescription(e), console.log("Offer from localConnection \n" + e.sdp), d.send(JSON.stringify({
                action: "fileRemoteDescription",
                sdp: e,
                room: b
            }))
        }, this.gotDescription2 = function(e) {
            h.setLocalDescription(e), console.log("Answer from remoteConnection \n" + e.sdp), d.send(JSON.stringify({
                action: "fileLocalDescription",
                sdp: e,
                room: b
            }))
        }, this.iceCallback1 = function(t) {
            console.log("local ice callback"), t.candidate && (d.send(JSON.stringify({
                action: "fileCandidate",
                candidate: t.candidate,
                room: b
            })), console.log("Local ICE candidate: \n" + event.candidate.candidate))
        }, this.iceCallback2 = function(t) {
            console.log("remote ice callback"), t.candidate && d.send(JSON.stringify({
                action: "fileLocalCandidate",
                candidate: t.candidate,
                room: b
            }))
        }, this.onAddIceCandidateSuccess = function() {
            console.log("AddIceCandidate success.")
        }, this.onAddIceCandidateError = function(e) {
            console.log("Failed to add Ice Candidate: " + e.toString())
        }, this.receiveChannelCallback = function(e) {
            console.log("Receive Channel Callback"), p = e.channel, p.binaryType = "arraybuffer", p.onmessage = v.onReceiveMessageCallback, "open" === p.readyState ? v.onReceiveChannelStateChange() : p.onopen = v.onReceiveChannelStateChange, p.onclose = v.onReceiveChannelStateChange, F = 0, T = 0, downloadAnchor.textContent = "", downloadAnchor.removeAttribute("download"), downloadAnchor.href && (URL.revokeObjectURL(downloadAnchor.href), downloadAnchor.removeAttribute("href")), v.trySending()
        }, this.onReceiveMessageCallback = function(e) {
            var t = new Int8Array(e.data);
            if (w.push(t), F += t.byteLength, progressBar.value = F, F >= I.size) {
                var s = new window.Blob(w, {
                    type: B
                });
                downloadAnchor.href = URL.createObjectURL(s), downloadAnchor.download = I.name, downloadAnchor.textContent = I.name + " (" + I.size + " bytes)", downloadAnchor.style.display = "block", D && (window.clearInterval(D), D = null), v.closeDataChannels()
            }
        }, this.onSendChannelStateChange = function() {
            var e = u.readyState;
            console.log("Send channel state is: " + e), v.trySending()
        }, this.onReceiveChannelStateChange = function() {
            var e = p.readyState;
            console.log("Receive channel state is: " + e), "open" === e && (f = new Date().getTime(), M = f, D = window.setInterval(v.displayStats, 500)), v.trySending()
        }, this.trySending = function() {
            u && "open" === u.readyState && !g && (g = !0, v.sendData())
        }, this.displayStats = function() {
            h && "connected" === h.iceConnectionState && h.getStats(null, function(e) {
                if (null !== D)
                    for (var t in e) {
                        var s = e[t];
                        if ("googCandidatePair" === s.type && "true" === s.googActiveConnection) {
                            var n = s.bytesReceived,
                                i = Math.round(8 * (n - L) / (s.timestamp - M));
                            M = s.timestamp, L = n, i > T && (T = i)
                        }
                    }
            }, function(t) {
                console.log("GetStats failure ", t)
            })
        }
    };
var notifyHandler = function() {
    var e = this;
    this.init = function() {
        return e.isNotificationSupported() ? void("granted" !== Notification.permission && Notification.requestPermission()) : void console.log("Your browser does not support Notifications. Use Latest Chrome/Safari to save the world.")
    }, jQuery(document).on("EnterPageNotification", function() {
        document.hasFocus() || e.showNotification("Visitor has requested a chat.")
    }), jQuery(document).on("IncomingCall", function() {
        document.hasFocus() || e.showNotification("Visitor is calling you.")
    }), this.showNotification = function(t) {
        if (!e.isNotificationSupported()) return void console.log("Your browser does not support Notifications. Use Latest Chrome/Safari to save the world.");
        if ("granted" === Notification.permission) {
            var s = new Notification(t, {
                icon: "/img/logo.png",
                body: "Click to open the page.",
                vibrate: [500, 110, 500, 110, 500]
            });
            s.onclick = function() {
                try {
                    window.focus()
                } catch (e) {
                    console.log(e)
                }
            }, setTimeout(s.close.bind(s), 1e4)
        } else "denied" !== Notification.permission && Notification.requestPermission().then(function(e) {
            "granted" === e && (s = new Notification("Hi there!"))
        })
    }, this.requestPermissions = function() {
        "granted" !== Notification.permission && Notification.requestPermission()
    }, this.isNotificationSupported = function() {
        return "Notification" in window
    }
};