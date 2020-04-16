var QueryString = function() {
    for (var e, t = {}, o = window.location.search.substring(1), s = o.split("&"), n = 0; n < s.length; n++)
        if (e = s[n].split("="), "undefined" == typeof t[e[0]]) t[e[0]] = e[1];
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
var o = document.createElement("script");
o.type = "text/javascript", o.readyState ? o.onreadystatechange = function() {
    ("loaded" == o.readyState || "complete" == o.readyState) && (o.onreadystatechange = null, t && t())
} : o.onload = function() {
    t && t()
}, o.src = e + "?v=" + currVersion, document.getElementsByTagName("head")[0].appendChild(o)
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

    var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};
              
function changeToUrl(e) {
for (var t = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi, o = new RegExp(t), s = e.split(" "), n = 0; n < s.length; n++) s[n].match(o) && (s[n] = "<a target=\"_blank\" href=\"" + s[n] + "\">" + s[n] + "</a>");
return s.join(" ")
}
Date.prototype.toShortFormat = function() {

    var month_names =["Jan","Feb","Mar",
                      "Apr","May","Jun",
                      "Jul","Aug","Sep",
                      "Oct","Nov","Dec"];
    
    var day = this.getDate();
    var month_index = this.getMonth();
    var year = this.getFullYear();
    
    return "" + day + "-" + month_names[month_index] + "-" + year;
}

// Now any Date object can be declared 
var today = new Date();
var errorTimer, incomingAudio, incomingMessage, enterRoom, estimateDif = function(e) {
    var t = parseInt(e / 1e3, 10),
        o = Math.floor(t / 3600),
        i = Math.floor((t - 3600 * o) / 60),
        s = t - 3600 * o - 60 * i;
    if (o || i || s) {
        var n = 1 == o ? " hour " : " hours ";
        o = o ? o + n : "";
        var a = 1 == i ? " minute " : " minutes ";
        i = i ? i + a : "";
        var d = 1 == s ? " second " : " seconds ";
        return s = s ? s + d : "", o + i + s
    }
    return null
},
getCurrentTime = function() {
    var e = convertTimestamp(new Date().getTime(), !0);
    return e
},
guestName = function(e) {
    e.charCodeAt(0) + e.charCodeAt(e.length - 1);
    for (var t = 0, o = 0; o < e.length; o++) t += e.charCodeAt(o);
    var n = t % 100;
    return "Visitor-" + parseInt(n + 1)
},
getCurrentDateFormatted = function() {
    var e = new Date;
    return ("0" + e.getDate()).slice(-2) + "_" + ("0" + (e.getMonth() + 1)).slice(-2) + "_" + e.getFullYear() + "_" + ("0" + e.getHours()).slice(-2) + ("0" + e.getMinutes()).slice(-2)
},
convertTimestamp = function(e, t) {
    var o = new Date,
        i = new Date(e),
        s = o.getFullYear() === i.getFullYear() ? "" : ", " + i.getFullYear(),
        n = ("0" + (i.getMonth() + 1)).slice(-2),
        a = ("0" + i.getDate()).slice(-2),
        d = i.getHours(),
        r = i.getMinutes(),
        l = 12 <= d ? "pm" : "am";
    return hours = d % 12, hours = hours ? hours : 12, r = 10 > r ? "0" + r : r, time = t ? hours + ":" + r + " " + l : hours + ":" + r + " " + l, time
},
compareDates = function(e, t) {
    var o = new Date(e);
    o.setHours(0, 0, 0, 0);
    var i = new Date(t);
    return i.setHours(0, 0, 0, 0), o.getTime() === i.getTime()
},
escapeHtmlEntities = function(e) {
    return "undefined" == typeof jQuery ? e.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;") : jQuery("<div/>").text(e).html()
},
showMessage = function(e, t, o, i, s) {
    if (t) {
        var n = convertTimestamp(new Date().getTime(), !0);
        o = "" !== o && null !== o && "undefined" !== o && void 0 !== o ? o : "" === e ? "" : n;
        var a, d = document.createElement("li"),
            r = "left",
            l = "",
            c = "";
        if ("Me" === e || "Me~" == e.substring(0, 3)) {
            r = "right";
            var g = "";
            if ("Me~" == e.substring(0, 3))
                if (e = e.substring(3, 300), g = " right-image", "img/small-avatar.jpg" !== s && s) c = "<img class=\"direct-chat-img " + r + "\" src=\"" + s + "\" alt=\"\" />";
                else {
                    var m = e.match(/\b(\w)/g);
                    c = m.join("").toUpperCase(), c = c ? "<span class=\"acronym-right\">" + c + "</span>" : "<img class=\"direct-chat-img " + r + "\" src=\"img/small-avatar.jpg\" alt=\"\" />"
                } className = "wd-right-bubble" + g
        } else if ("" === e) {
            var h = "";
            "divider" === i && (h = " divider"), className = "wd-system-bubble" + h
        } else if (playIncomingMessage(), "undefined" === e && (e = "Guest"), l = "wd-chat-name", a = "wd-chat-avatar", className = "wd-left-bubble", s || (s = "/img/small-avatar.jpg"), c = "<img class=\"direct-chat-img " + r + " " + e + "\" src=\"" + s + "\" alt=\"\" />", "He~" == e.substring(0, 3))
            if (e = e.substring(3, 500), "/img/small-avatar.jpg" !== s && s) c = "<img class=\"direct-chat-img " + r + " " + e + "\" src=\"" + s + "\" alt=\"\" />";
            else {
                var m = e.match(/\b(\w)/g);
                c = m.join("").toUpperCase();
                var u = svg1 + c + svg2;
                image = "data:image/svg+xml;base64," + btoa(u), c = c ? "<img class=\"direct-chat-img " + r + " " + e + "\" src=\"" + image + "\" alt=\"\" />" : "<img class=\"direct-chat-img " + r + " " + e + "\" src=\"/img/small-avatar.jpg\" alt=\"\" />"
            } i = i ? i : "", d.setAttribute("data-system-attribue", i), d.innerHTML = "<div class=\"" + className + "\">" + c + "<span class=\"" + l + "\">" + e + "</span>\n<span class=\"timestamp\" style='float:right'>"+ today.toShortFormat() +' '+ o + "</span>\n<div>" + t + "</div>\n\n";
        var p = document.getElementById("newdev_chat_ul1");
        p.appendChild(d), p.scrollTop = 999999
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
        o = document.cookie.match(t);
    if (o) {
        var i = o[0].split("="),
            s = i[1];
        return s
    }
    return null
},
setCookie = function(e, t, o) {
    var i = e,
        s = t,
        n = new Date,
        a = n.getTime(),
        d = a + 3600000 * parseInt(o);
    n.setTime(d), document.cookie = o ? i + "=" + s + ";expires=" + n.toGMTString() + ";path=/" : i + "=" + s + ";path=/"
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
    var t, o, i, s, n, a, d, r, l, c, g, m, h, u, p, v, S, f, w = this,
        I = {
            offerToReceiveAudio: 1,
            offerToReceiveVideo: 1
        },
        b = QueryString(),
        _ = "admin",
        y = b.room ? b.room : _,
        C = "undefined" != typeof isAdmin,
        k = b.isAdmin,
        E = 5000,
        V = [],
        A = 0,
        R = 0,
        x = 0,
        B = null,
        M = 0,
        F = "",
        L = !1;
    this.init = function(e) {
        var t = document.getElementsByClassName("initCall");
        L = e;
        for (var o = 0; o < t.length; o++) t[o].addEventListener("click", this.initCall);
        w.openSocket(), y != _ && $("#chatInput").on("keyup", function() {
            var e = this.value.trim();
            e ? r.send(JSON.stringify({
                action: "typingStatus",
                status: !0,
                room: y
            })) : r.send(JSON.stringify({
                action: "typingStatus",
                status: !1,
                room: y
            }))
        })
    }, this.reconnectWebsocket = function(t) {
        console.log("WebSocketClient reconnecting in " + E, t), setTimeout(function() {
            console.log("WebSocketClient: reconnecting..."), w.openSocket()
        }, E)
    }, this.openSocket = function() {
        r = new WebSocket(svConfigs.appWss), r.onclose = function(t) {
            var t = jQEngager.Event("AdminOffline");
            switch (jQEngager(document).trigger(t), jQEngager("#visitors").empty(), t.code) {
                case 1e3:
                    console.log("WebSocket: closed");
                    break;
                default:
                    w.reconnectWebsocket(t);
            }
        }, r.onopen = function() {
            console.log("wsChat started!"), l = getCookie("visitorId") ? getCookie("visitorId") : Math.random().toString(36).slice(2).substring(0, 15), c = getCookie("sessionId") ? getCookie("sessionId") : getGuid(), (C || k) && (l = "admin"), setCookie("visitorId", l, 1), setCookie("sessionId", c, 1), y === _ ? (r.send(JSON.stringify({
                action: "subscribe",
                referrer: document.title,
                ua: navigator.userAgent,
                visitorId: l,
                sessionId: c,
                room: _,
                isAdmin: k
            })), r.send(JSON.stringify({
                action: "online",
                referrer: document.title,
                ua: navigator.userAgent,
                visitorId: l,
                sessionId: c,
                room: _,
                isAdmin: k
            }))) : (r.send(JSON.stringify({
                action: "subscribe",
                referrer: document.title,
                ua: navigator.userAgent,
                visitorId: l,
                sessionId: c,
                room: y,
                isAdmin: k
            })), r.send(JSON.stringify({
                action: "ping",
                room: _,
                visitorId: y,
                sessionId: c,
                isAdmin: k
            }))), r.send(JSON.stringify({
                action: "giveOnline",
                room: y
            })), r.send(JSON.stringify({
                action: "giveCountOnline",
                room: y
            }));
            var t = jQEngager.Event("CommConnected");
            jQEngager(document).trigger(t), w.showStatusBar("Connected to the chat server!", 5e3)
        }, r.onerror = function() {
            w.showStatusBar("Unable to connect to the chat server! Kindly refresh", 2e4)
        }, r.onmessage = function(s) {
            var n = JSON.parse(s.data);
            if (console.log("onmessage", JSON.stringify(n), n.action, y, n.visitorId), "imOnline" === n.action)
                if ("admin" === n.visitorId) {
                    console.log("admin is online");
                    var s = jQEngager.Event("AdminOnline", {
                        sessionId: n.sessionId
                    });
                    jQEngager(document).trigger(s);
                    var s = jQEngager.Event("AdminPopupOnline", {
                        sessionId: n.sessionId,
                        pass: n.pass
                    });
                    jQEngager(document).trigger(s)
                } else {
                    var s = jQEngager.Event("PopupOnline", {
                        sessionId: n.sessionId
                    });
                    jQEngager(document).trigger(s)
                } if ("whoIsroom" === n.action) {
                console.log("whoIsroom", n), o = n.count;
                var s = jQEngager.Event("VisitorsRoom", {
                    count: n.count
                });
                jQEngager(document).trigger(s)
            }
            if ("imOffline" === n.action) {
                if (n.visitors)
                    if ("admin" === n.visitors.visitorId) {
                        console.log("admin is offline");
                        var s = jQEngager.Event("AdminOffline");
                        if (jQEngager(document).trigger(s), n.room !== _) {
                            var s = jQEngager.Event("AdminPopupOffline");
                            jQEngager(document).trigger(s)
                        }
                    } else {
                        var s = jQEngager.Event("PopupLeft", {
                            sessionId: n.visitors.sessionId
                        });
                        jQEngager(document).trigger(s)
                    } if (n.visitorId && "admin" === n.visitorId) {
                    console.log("admin is offline");
                    var s = jQEngager.Event("AdminOffline");
                    if (jQEngager(document).trigger(s), n.room !== _) {
                        var s = jQEngager.Event("AdminPopupOffline");
                        jQEngager(document).trigger(s)
                    }
                }
            }
            if (n.room === y) switch (n.action) {
                case "initCall":
                    var s = jQEngager.Event("IncomingCall", {
                        autoaccept: n.autoaccept,
                        sessionId: n.sessionId
                    });
                    jQEngager(document).trigger(s);
                    break;
                case "initScreenShare":
                    var s = jQEngager.Event("IncomingScreenShare", {
                        autoaccept: n.autoaccept
                    });
                    jQEngager(document).trigger(s);
                    break;
                case "callRejected":
                    var s = jQEngager.Event("CallEnded");
					
                    jQEngager(document).trigger(s);
                    break;
                case "endScreenShare":
                    var s = jQEngager.Event("ScreenShareEnded");
                    jQEngager(document).trigger(s);  
					
                    break;
                case "endCall": 
                    w.handleCallTermination(n.sessionId);
					$('.wd-chat-box').show();
					$('#wd-widget-content-chat-main').hide();
					
					
                    break;
                case "callAccepted":
                    if (n.sessionId in callPC) return;
                    if (n.remoteSessionId == w.getSessionId())
                        if (w.getStream()) {
                            w.startCall(!0, n.sessionId, w.getStream()), clearTimeout(i);
                            var s = jQEngager.Event("CallAccepted");
                            jQEngager(document).trigger(s)
                        } else setTimeout(function() {
                            w.startCall(!0, n.sessionId, w.getStream()), clearTimeout(i);
                            var t = jQEngager.Event("CallAccepted");
                            jQEngager(document).trigger(t)
                        }, 5e3);
                    break;
                case "startFileTransfer":
                    var s = jQEngager.Event("IncomingFileTransfer", {
                        name: n.name,
                        size: n.size,
                        sessionId: n.sessionId
                    });
                    jQEngager(document).trigger(s);
                    break;
                case "fileAccepted":
                    var s = jQEngager.Event("FileAccepted");
                    jQEngager(document).trigger(s);
                    break;
                case "whiteboardSync":
                    var s = jQEngager.Event("WhiteboardSync", {
                        whiteboardData: n.data,
                        sessionId: n.sessionId
                    });
                    jQEngager(document).trigger(s);
                    break;
                case "fileRejected":
                    var s = jQEngager.Event("FileRejected", {
                        sessionId: n.sessionId
                    });
                    jQEngager(document).trigger(s);
                    break;
                case "candidate":
                    n.candidate && (callPC[n.sessionId] ? callPC[n.sessionId].addIceCandidate(new RTCIceCandidate(JSON.parse(n.candidate)), function() {
                        console.log("onAddIceCandidateSuccess")
                    }, function(e) {
                        console.log("onAddIceCandidateFailed", e)
                    }) : "");
                    break;
                case "ssCandidate":
                    n.candidate && (t ? t.addIceCandidate(new RTCIceCandidate(JSON.parse(n.candidate)), function() {
                        console.log("onAddIceCandidateSuccess")
                    }, function(e) {
                        console.log("onAddIceCandidateFailed", e)
                    }) : "");
                    break;
                case "fileLocalCandidate":
                    n.candidate && p.addIceCandidate(n.candidate, w.onAddIceCandidateSuccess, w.onAddIceCandidateError);
                    break;
                case "fileCandidate":
                    n.candidate && v.addIceCandidate(n.candidate, w.onAddIceCandidateSuccess, w.onAddIceCandidateError);
                    break;
                case "remoteDescription":
                    callPC[n.sessionId] && n.remoteSessionId == w.getSessionId() && (!callPC[n.sessionId].remoteDescription && callPC[n.sessionId].setRemoteDescription(new RTCSessionDescription(n.sdp)), callPC[n.sessionId].createAnswer(function(t) {
                        callPC[n.sessionId].setLocalDescription(t);
                        var o = jQEngager.Event("LocalVideoStarted", {
                            stream: w.getStream()
                        });
                        jQEngager(document).trigger(o), r.send(JSON.stringify({
                            action: "localDescription",
                            sdp: t,
                            room: y,
                            sessionId: w.getSessionId(),
                            remoteSessionId: n.sessionId
                        }))
                    }, w.showErrors));
                    break;
                case "remoteScreenDescription":
                    w.startScreenShare(null, !1), t && (t.setRemoteDescription(new RTCSessionDescription(n.sdp)), t.createAnswer(w.onSetLocalScreenSuccess2, w.showErrors));
                    break;
                case "localScreenDescription":
                    t ? t.setRemoteDescription(new RTCSessionDescription(n.sdp)) : "";
                    break;
                case "localDescription":
                    if (n.remoteSessionId == w.getSessionId()) {
                        var a = callPC[n.sessionId].remoteDescription;
                        a || (callPC[n.sessionId] ? callPC[n.sessionId].setRemoteDescription(new RTCSessionDescription(n.sdp)) : "")
                    }
                    break;
                case "fileRemoteDescription":
                    v.setRemoteDescription(n.sdp), v.createAnswer(w.gotDescription2, w.showErrors);
                    break;
                case "fileLocalDescription":
                    p.setRemoteDescription(n.sdp);
                    break;
                case "txt":
                    w.addRemoteChat(n.msg, n.date, n.sessionId);
                    break;
                case "typingStatus":
                    break;
                case "newSub":
                    (!roomId || roomId && roomId == n.visitorId) && (w.setRemoteStatus("online", n.sessionId), r.send(JSON.stringify({
                        action: "imOnline",
                        visitorId: l,
                        room: y,
                        pass: L,
                        count: n.count,
                        sessionId: w.getSessionId()
                    })), C && w.showStatusBar("Remote entered room", 1e4));
                    break;
                case "imOffline":
                    if (1 == n.count && w.setRemoteStatus("offline", n.sessionId), C && n.visitors && jQEngager("#visitors").find("#" + n.visitors.visitorId).remove(), n.visitors && "admin" === n.visitors.visitorId) {
                        var s = jQEngager.Event("AdminOffline");
                        jQEngager(document).trigger(s)
                    }
					if($('#nd_widget_content')[0]){ 
					
						var logs = $("#newdev_chat_ul1").text();
					
					if (logs.length >= 5 ){
					$(document).ready(function() {
				 var code = getUrlParameter('code') 
						var codes = code.split(','); 
					
					
						
						
						$.ajax({
						url: "log.php",
							type: "post",
							data: { logs: logs, hotel: codes[2], room: codes[1] },
							success: function (data) {
						
						}
					});  }); }
					
					
				$('#nd_widget_content').remove();
					$('.dropdown-us').remove();
					
					
					if(!$('#end_message')[0]){ 
                      $('.nd-widget-container_lead').append('<strong><div id="end_message" style="display: flex; color: red; font-size: 100px; flex-direction: column;  justify-content: center;  align-items: center;  text-align: center;  min-height: 100vh;"><img src="../img/endcall.png"><br>Call Ended</div></strong>');    
				}}
                    break;
                case "popupClosed":
                    var s = jQEngager.Event("PopupClosed");
                    jQEngager(document).trigger(s), jQEngager("#visitors").find("#room" + n.visitorId).remove();
                    break;
                case "RemoteVideoUnmuted":
                    var s = jQEngager.Event("RemoteVideoUnmuted", {
                        sessionId: n.sessionId
                    });
                    jQEngager(document).trigger(s);
                    break;
                case "RemoteVideoMuted":
                    var s = jQEngager.Event("RemoteVideoMuted", {
                        sessionId: n.sessionId
                    });
                    jQEngager(document).trigger(s);
                    break;
                case "startRecording":
                    var s = jQEngager.Event("RemoteStartRecording");
                    jQEngager(document).trigger(s);
                    break;
                case "stopRecording":
                    var s = jQEngager.Event("RemoteStopRecording");
                    jQEngager(document).trigger(s);
                    break;
                case "ping":
                    if (C) {
                        var d = jQEngager("#visitors").find("#" + n.visitorId),
                            c = jQEngager("#visitors").find("#room" + n.visitorId);
                        if (0 < d.length && 0 === c.length) {
                            var g = d.children().children().children(),
                                m = {};
                            m.names = guestName(n.sessionId), lsRepUrl && (m.lsRepUrl = lsRepUrl);
                            var h = window.btoa(JSON.stringify(m)),
                                u = lsRepUrl + "pages/room.html?room=" + n.visitorId + "&p=" + h + "&isAdmin=1",
                                S = document.createElement("span");
                            S.id = "room" + n.visitorId, S.innerHTML = " <a href=\"" + u + "\" target=\"_blank\">Enter Room</a>", g.append(S);
                            var s = jQEngager.Event("EnterPageNotification");
                            jQEngager(document).trigger(s)
                        }
                    } else if (n.visitorId === l && "admin" === n.room) {
                        var s = jQEngager.Event("AdminPopupOnline", {
                            sessionId: n.sessionId,
                            pass: n.pass
                        });
                        jQEngager(document).trigger(s)
                    }
                    break;
                case "online":
                    if (C && (!roomId || roomId && roomId == n.visitorId)) {
                        jQEngager("#visitors").find("#" + n.visitorId).remove();
                        var S = document.createElement("div");
                        S.className = "row msg_container base_receive", S.id = n.visitorId;
                        var f = n.ua ? detect.parse(n.ua) : "",
                            I = f ? f.browser.name : "",
                            b = f ? f.os.name : "";
                        S.innerHTML = "<div class=\"col-sm-10 col-xs-10\">                                                                    <div class=\"messages msg_receive\">                                                                            <p>" + guestName(n.sessionId) + " " + n.referrer + "<br/>" + b + " " + I + "</p>                                                                                                                                                </div>                                                            </div>", jQEngager("#visitors").append(S)
                    }
                    if ("admin" === n.visitorId) {
                        var s = jQEngager.Event("AdminOnline", {
                            sessionId: n.sessionId
                        });
                        jQEngager(document).trigger(s)
                    }
                    break;
                case "checkPopup":
                    var s = jQEngager.Event("CheckPopup");
                    jQEngager(document).trigger(s);
                    break;
                case "setCallerInfo":
                    var s = jQEngager.Event("CallerInfo", {
                        sessionId: n.sessionId,
                        callerInfo: n.callerInfo,
                        isAdmin: n.isAdmin
                    });
                    jQEngager(document).trigger(s);
                    break;
                case "sendCallerBack":
                    var s = jQEngager.Event("SendCallerBack", {
                        access: n.access,
                        sessionId: n.sessionId
                    });
                    jQEngager(document).trigger(s);
                    break;
                case "whoIsonline":
                    var k = n.visitors;
                    for (var E in k)
                        if (k[E]) {
                            console.log(k[E].visitorId);
                            var V = k[E].visitorId;
                            if (C && V !== l && (!roomId || roomId && roomId == V)) {
                                var S = document.createElement("div");
                                S.className = "row msg_container base_receive", S.id = V;
                                var f = k[E].ua ? detect.parse(k[E].ua) : "",
                                    I = f ? f.browser.name : "",
                                    b = f ? f.os.name : "";
                                S.innerHTML = "<div class=\"col-sm-10 col-xs-10\">                                                                            <div class=\"messages msg_receive\">                                                                                    <p>" + guestName(k[E].sessionId) + " " + k[E].pageRef + "<br/>" + b + " " + I + "</p>                                                                                                                                                                </div>                                                                    </div>", jQEngager("#visitors").append(S), r.send(JSON.stringify({
                                    action: "checkPopup",
                                    visitorId: "admin",
                                    room: V
                                }))
                            }
                            if ("admin" === k[E]) {
                                var s = jQEngager.Event("AdminPopupOnline", {
                                    sessionId: k[E].sessionId,
                                    name: k[E].name ? k[E].name : ""
                                });
                                jQEngager(document).trigger(s)
                            }
                            if (k[E].visitorId !== l)
                                if (1 === k[E].isAdmin) {
                                    var s = jQEngager.Event("AdminPopupOnline", {
                                        sessionId: k[E].sessionId,
                                        name: k[E].name ? k[E].name : ""
                                    });
                                    jQEngager(document).trigger(s)
                                } else {
                                    var s = jQEngager.Event("PopupOnline", {
                                        sessionId: k[E].sessionId,
                                        name: k[E].name ? k[E].name : ""
                                    });
                                    jQEngager(document).trigger(s)
                                }
                        }
            } else "subRejected" === n.action && w.showStatusBar("Maximum users in a room reached. Communication disallowed", 5e3)
        }
    }, this.popupClosed = function(e) {
        r.send(JSON.stringify({
            action: "popupClosed",
            room: y,
            visitorId: e
        }))
    }, this.getConstraint = function(e, t) {
        var o = e ? e : "initVideo" === this.id ? "Video" : "Audio";
        switch (o) {
            case "Video":
                var i = t ? {
                    deviceId: {
                        exact: t
                    }
                } : {
                    facingMode: "user"
                };
                s = {
                    video: i,
                    audio: !0
                };
                break;
            case "Audio":
                s = {
                    audio: !0,
                    video: !1
                };
                break;
            default:
                var i = t ? {
                    deviceId: {
                        exact: t
                    }
                } : {
                    facingMode: "user"
                };
                s = {
                    video: i,
                    audio: !0
                };
        }
        console.log("getConstraint", s)
    }, this.startRecording = function() {
        r.send(JSON.stringify({
            action: "startRecording",
            room: y,
            sessionId: w.getSessionId()
        }))
    }, this.stopRecording = function() {
        r.send(JSON.stringify({
            action: "stopRecording",
            room: y,
            sessionId: w.getSessionId()
        }))
    }, this.initCall = function(t, o, s, n) {
        if (a = !0, w.getConstraint(t, s), w.checkUserMediaSupport) console.log("start call"), w.setLocalMedia(n), r.send(JSON.stringify({
            action: "initCall",
            room: y,
            autoaccept: o,
            sessionId: n
        })), i = setTimeout(function() {
            var t = jQEngager.Event("CallEnded");
            jQEngager(document).trigger(t), w.endCall("Call ended due to lack of response", w.getSessionId())
        }, 6e4);
        else {
            var d = jQEngager.Event("NotSupportedBrowser");
            jQEngager(document).trigger(d)
        }
    }, this.initScreen = function(t) {
        if (a = !0, w.checkUserMediaSupport) console.log("initScreenShare"), r.send(JSON.stringify({
            action: "initScreenShare",
            room: y,
            autoaccept: t
        }));
        else {
            var o = jQEngager.Event("NotSupportedBrowser");
            jQEngager(document).trigger(o)
        }
    }, this.rejectCall = function() {
        r.send(JSON.stringify({
            action: "callRejected",
            msg: "Call rejected by Remote",
            room: y
        }))
    }, this.answerCall = function(e, t) {
        a = !1, w.getConstraint(e), w.setLocalMedia(t)
    }, this.startScreenShare = function(e, o) {
        w.setScreenStream(e), t = new RTCPeerConnection(svConfigs.iceServers), t.onicecandidate = function(t) {
            if (t.candidate) {
                var e = {
                    candidate: t.candidate.candidate,
                    sdpMLineIndex: t.candidate.sdpMLineIndex,
                    sdpMid: t.candidate.sdpMid
                };
                if (isIEA) var o = e;
                else o = t.candidate;
                r.send(JSON.stringify({
                    action: "ssCandidate",
                    candidate: JSON.stringify(o),
                    room: y
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
        }, o && (t.addStream(w.getScreenStream()), t.createOffer(w.onSetLocalScreenSuccess, w.showErrors, I))
    }, this.startCall = function(e, t, o) {
        a = e, console.log("startCall", t, d), callPC[t] = new RTCPeerConnection(svConfigs.iceServers), console.log("startCall", t, callPC), callPC[t].onicecandidate = function(t) {
            if (t.candidate) {
                var e = {
                    candidate: t.candidate.candidate,
                    sdpMLineIndex: t.candidate.sdpMLineIndex,
                    sdpMid: t.candidate.sdpMid
                };
                if (isIEA) var o = e;
                else o = t.candidate;
                r.send(JSON.stringify({
                    action: "candidate",
                    candidate: JSON.stringify(o),
                    room: y,
                    sessionId: w.getSessionId()
                }))
            }
        }, callPC[t].oniceconnectionstatechange = function() {
            switch (callPC[t].iceConnectionState) {
                case "disconnected":
                case "failed":
                    w.handleCallTermination(t), console.log("Ice connection state is failed/disconnected"), w.showStatusBar("Call connection problem", 15e3);
                    break;
                case "closed":
                    w.handleCallTermination(t), console.log("Ice connection state is 'closed'"), w.showStatusBar("Call connection closed", 15e3);
            }
        }, callPC[t].onsignalingstatechange = function() {
            switch (callPC[t].signalingState) {
                case "closed":
                    console.log("Signalling state is 'closed'"), w.showStatusBar("Signal lost", 15e3);
            }
        }, isIEA ? (callPC[t].onaddstream = function(o) {
            remoteStream[t] = o.stream;
            var o = jQEngager.Event("RemoteVideoStarted", {
                stream: o.stream,
                sessionId: t
            });
            jQEngager(document).trigger(o)
        }, callPC[t].addStream(o)) : (callPC[t].ontrack = function(o) {
            console.log("ontrack"), remoteStream[t] = o.streams[0];
            var o = jQEngager.Event("RemoteVideoStarted", {
                stream: o.streams[0],
                sessionId: t
            });
            jQEngager(document).trigger(o)
        }, o.getTracks().forEach(function(e) {
            callPC[t].addTrack(e, o)
        })), a && callPC[t].createOffer(function(i) {
            callPC[t].setLocalDescription(i);
            var s = jQEngager.Event("LocalVideoStarted", {
                stream: o
            });
            jQEngager(document).trigger(s), r.send(JSON.stringify({
                action: "remoteDescription",
                sdp: i,
                room: y,
                sessionId: w.getSessionId(),
                remoteSessionId: t
            }))
        }, w.showErrors, I)
    }, this.checkUserMediaSupport = function() {
        return !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia)
    }, this.showErrors = function(t) {
        switch (console.log("showErrors", t), t.name) {
            case "SecurityError":
                console.log(t.message), w.showStatusBar("Media sources usage is not supported on this browser/device", 1e4);
                break;
            case "NotAllowedError":
                console.log(t.message), w.showStatusBar("We do not have access to your audio/video sources", 1e4);
                break;
            case "NotFoundError":
                console.log(t.message), w.showStatusBar("The requested audio/video source cannot be found", 1e4);
                break;
            case "NotReadableError":
            case "AbortError":
                console.log(t.message), w.showStatusBar("Unable to use your media sources", 1e4);
        }
    }, this.setStream = function(e) {
        myMediaStream = e
    }, this.gotDevices = function(t) {
        for (var o = [], s = 0; s !== t.length; ++s) {
            var n = t[s],
                a = {};
            "videoinput" === n.kind && (a.value = n.deviceId, a.text = n.label, o.push(a))
        }
        var d = jQEngager.Event("MediaDevices", {
            devices: o
        });
        jQEngager(document).trigger(d)
    }, this.handleError = function(e) {
        console.log("navigator.getUserMedia error: ", e)
    }, this.checkMediaDevices = function() {
        (isiPhone || isAndroid) && navigator.mediaDevices.enumerateDevices().then(w.gotDevices).catch(w.handleError)
    }, this.onCreateSessionDescriptionError = function(t) {
        w.showErrors(t)
    }, this.gumFailed = function(t) {
        w.showErrors(t)
    }, this.setLocalMedia = function(e) {
        d = e, "undefined" == typeof Promise ? navigator.getUserMedia(s, function(t) {
            w.setStream(t), a || (w.startCall(!1, e, t), w.checkUserMediaSupport ? r.send(JSON.stringify({
                action: "callAccepted",
                room: y,
                sessionId: w.getSessionId(),
                remoteSessionId: e
            })) : r.send(JSON.stringify({
                action: "callRejected",
                msg: "Remote's device does not have the necessary requirements to make call",
                room: y,
                sessionId: w.getSessionId(),
                remoteSessionId: e
            })))
        }, w.gumFailed) : navigator.mediaDevices.getUserMedia(s).then(function(t) {
            w.setStream(t), a || (w.startCall(!1, e, t), w.checkUserMediaSupport ? r.send(JSON.stringify({
                action: "callAccepted",
                room: y,
                sessionId: w.getSessionId(),
                remoteSessionId: e
            })) : r.send(JSON.stringify({
                action: "callRejected",
                msg: "Remote's device does not have the necessary requirements to make call",
                room: y,
                sessionId: w.getSessionId(),
                remoteSessionId: e
            })))
        }).catch(w.gumFailed)
    }, this.addRemoteChat = function(t, o, i) {
        var s = jQEngager.Event("ChatMessage", {
            msg: t,
            date: o,
            sessionId: i
        });
        jQEngager(document).trigger(s)
    }, this.addLocalChat = function(e, t, o) {
        var i = w.randomString(5);
        o && w.sendChatToSocket(e, t, i)
    }, this.setCallerInfo = function(e, t, o) {
        r.send(JSON.stringify({
            action: "setCallerInfo",
            visitorId: l,
            sessionId: e,
            room: y,
            callerInfo: t,
            isAdmin: o
        }))
    }, this.sendCallerBack = function(e, t) {
        r.send(JSON.stringify({
            action: "sendCallerBack",
            visitorId: l,
            room: y,
            access: e,
            sessionId: t
        }))
    }, this.useH264Codec = function(e) {
        var t;
        return t = isFirefox ? e.replace("m=video 9 UDP/TLS/RTP/SAVPF 120 126 97\r\n", "m=video 9 UDP/TLS/RTP/SAVPF 126 120 97\r\n") : e.replace("m=video 9 UDP/TLS/RTP/SAVPF 100 101 107 116 117 96 97 99 98\r\n", "m=video 9 UDP/TLS/RTP/SAVPF 107 101 100 116 117 96 97 99 98\r\n"), t
    }, this.onSetLocalScreenSuccess = function(o) {
        o.sdp = w.useH264Codec(o.sdp), t.setLocalDescription(o);
        var i = jQEngager.Event("LocalScreenStarted", {
            stream: w.getStream()
        });
        jQEngager(document).trigger(i), r.send(JSON.stringify({
            action: "remoteScreenDescription",
            sdp: o,
            room: y
        }))
    }, this.onSetLocalScreenSuccess2 = function(o) {
        o.sdp = w.useH264Codec(o.sdp), t.setLocalDescription(o);
        var i = jQEngager.Event("LocalScreenStarted", {
            stream: w.getStream()
        });
        jQEngager(document).trigger(i), r.send(JSON.stringify({
            action: "localScreenDescription",
            sdp: o,
            room: y
        }))
    }, this.endCall = function(e, t) {
        r.send(JSON.stringify({
            action: "endCall",
            msg: e,
            room: y,
            sessionId: t
        })), clearTimeout(i)
    }, this.toggleVideo = function() {
        var t = w.getStream().getVideoTracks();
        if (0 === t.length) {
            var o = jQEngager.Event("RestartVideo");
            return void jQEngager(document).trigger(o)
        }
        for (var s = 0; s < t.length; ++s) t[s].enabled = !t[s].enabled;
        var n = t[0].enabled ? "VideoUnmuted" : "VideoMuted",
            a = t[0].enabled ? "RemoteVideoUnmuted" : "RemoteVideoMuted",
            o = jQEngager.Event(n);
        jQEngager(document).trigger(o), r.send(JSON.stringify({
            action: a,
            room: y,
            sessionId: w.getSessionId()
        }))
    }, this.toggleAudio = function() {
        var t = w.getStream().getAudioTracks();
        if (0 === t.length) return void console.log("No local audio available.");
        for (var o = 0; o < t.length; ++o) t[o].enabled = !t[o].enabled;
        console.log("Audio " + (t[0].enabled ? "unmuted." : "muted."));
        var s = t[0].enabled ? "AudioUnmuted" : "AudioMuted",
            n = t[0].enabled ? "RemoteAudioUnmuted" : "RemoteAudioMuted",
            a = jQEngager.Event(s);
        jQEngager(document).trigger(a), r.send(JSON.stringify({
            action: n,
            room: y,
            sessionId: c
        }))
    }, this.adminOnline = function() {
        r.send(JSON.stringify({
            action: "imOnline",
            visitorId: "admin",
            room: y,
            pass: L,
            sessionId: w.getSessionId()
        }))
    }, this.adminOffline = function() {
        r.send(JSON.stringify({
            action: "imOffline",
            visitorId: "admin",
            room: y
        }))
    }, this.sendChatToSocket = function(e, t) {
        r.send(JSON.stringify({
            action: "txt",
            msg: e,
            date: 'aaaa' + t,
            room: y,
            sessionId: w.getSessionId()
        }))
    }, this.sendWhiteboardData = function(e) {
        r.send(JSON.stringify({
            action: "whiteboardSync",
            data: JSON.stringify(e),
            room: y,
            sessionId: w.getSessionId()
        }))
    }, this.addStreamStopListener = function(e, t) {
        var o = "ended";
        "oninactive" in e && (o = "inactive"), e.addEventListener(o, function() {
            t(), t = function() {}
        }, !1), e.getAudioTracks().forEach(function(e) {
            e.addEventListener(o, function() {
                t(), t = function() {}
            }, !1)
        }), e.getVideoTracks().forEach(function(e) {
            e.addEventListener(o, function() {
                t(), t = function() {}
            }, !1)
        })
    }, this.stopCall = function(t) {
        callPC[t] && (callPC[t].onicecandidate = null, callPC[t].onsignalingstatechange = null, callPC[t].ontrack = null, callPC[t].oniceconnectionstatechange = null, callPC[t].close(), callPC[t] = null, delete remoteStream[t], delete callPC[t]);
        var o = jQEngager.Event("CallEnded", {
            sessionId: t
        });
        jQEngager(document).trigger(o)
    }, this.handleCallTermination = function(e) {
        if (console.log("handleCallTermination", e), e) w.stopCall(e), w.getVideoSessions() || w.stopMediaStream();
        else {
            for (var t in callPC) w.stopCall(t);
            w.stopMediaStream()
        }
    }, this.handleScreenShareTermination = function() {
        r.send(JSON.stringify({
            action: "endScreenShare",
            msg: "ScreenShare ended",
            room: y
        })), w.stopScreenShareStream()
    }, this.setPing = function(e) {
        r.send(JSON.stringify({
            action: "ping",
            room: _,
            pass: L,
            visitorId: l,
            sessionId: e
        }))
    }, this.setRemoteStatus = function(t, o) {
        if ("online" === t) {
            var i = jQEngager.Event("PopupOnline", {
                sessionId: o
            });
            jQEngager(document).trigger(i)
        } else {
            var i = jQEngager.Event("CallEnded", {
                sessionId: o
            });
            jQEngager(document).trigger(i);
            var i = jQEngager.Event("PopupOffline", {
                sessionId: o
            });
            jQEngager(document).trigger(i)
        }
    }, this.stopMediaStream = function() {
        w.getStream() && w.getStream().getTracks().forEach(function(e) {
            e.stop()
        }), w.setStream(null), myMediaStream = null
    }, this.stopScreenShareStream = function() {
        w.getScreenStream() && w.getScreenStream().getTracks().forEach(function(e) {
            e.stop()
        }), w.setScreenStream(null)
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
        return n
    }, this.setScreenStream = function(e) {
        n = e
    }, this.getVisitorId = function() {
        return l
    }, this.getSessionId = function() {
        return c
    }, this.getRemoteSessionId = function() {
        return d
    }, this.sendFile = function() {
        var e = fileInput.files[0];
        r.send(JSON.stringify({
            action: "startFileTransfer",
            room: y,
            size: e.size,
            name: e.name,
            sessionId: c
        }))
    }, this.createFileConnection = function() {
        m = null, p = new RTCPeerConnection(svConfigs.iceServers, m), console.log("Created local peer connection object localConnection"), h = p.createDataChannel("sendDataChannel", {
            ordered: !0
        }), h.binaryType = "arraybuffer", console.log("Created send data channel"), h.onopen = w.onSendChannelStateChange, h.onclose = w.onSendChannelStateChange, p.onicecandidate = w.iceCallback1, p.createOffer(w.gotDescription1, w.onCreateSessionDescriptionError)
    }, this.fileAccepted = function(t) {
        r.send(JSON.stringify({
            action: "fileAccepted",
            room: y
        })), w.startFileTransfer(t)
    }, this.fileRejected = function() {
        r.send(JSON.stringify({
            action: "fileRejected",
            room: y,
            sessionId: c
        }))
    }, this.startFileTransfer = function(t) {
        progressBar.max = t.size, v = new RTCPeerConnection(svConfigs.iceServers, m), f = {
            name: t.name,
            size: t.size
        }, v.onicecandidate = w.iceCallback2, v.ondatachannel = w.receiveChannelCallback
    }, this.onCreateSessionDescriptionError = function(e) {
        console.log("Failed to create session description: " + e.toString())
    }, this.sendData = function() {
        var t = fileInput.files[0];
        if (V = [], console.log("file is " + [t.name, t.size, t.type, t.lastModifiedDate].join(" ")), downloadAnchor.textContent = "", 0 === t.size) return void w.closeDataChannels();
        progressBar.max = t.size, F = 0 < t.type.length ? t.type : "text/plain";
        var o = 81920,
            i = !0;
        "number" == typeof h.bufferedAmountLowThreshold && (i = !1, o = 8192, h.bufferedAmountLowThreshold = o);
        var s = function() {
                h.removeEventListener("bufferedamountlow", s), n(0)
            },
            n = function(a) {
                var d = new window.FileReader;
                d.onload = function() {
                    return function(d) {
                        var e = new Int8Array(d.target.result, 0, d.target.result.byteLength);
                        return h.bufferedAmount > o ? void(i ? setTimeout(n, 150, a) : h.addEventListener("bufferedamountlow", s)) : void(h.send(e), progressBar.value = a + d.target.result.byteLength, t.size > a + d.target.result.byteLength ? window.setTimeout(n, 0, a + 16384) : g = !1)
                    }
                }(t);
                var r = t.slice(a, a + 16384);
                d.readAsArrayBuffer(r)
            };
        n(0)
    }, this.closeDataChannels = function() {
        h && h.close(), u && u.close(), p && (p.close(), p = null), v && (v.close(), v = null)
    }, this.gotDescription1 = function(e) {
        p.setLocalDescription(e), console.log("Offer from localConnection \n" + e.sdp), r.send(JSON.stringify({
            action: "fileRemoteDescription",
            sdp: e,
            room: y
        }))
    }, this.gotDescription2 = function(e) {
        v.setLocalDescription(e), console.log("Answer from remoteConnection \n" + e.sdp), r.send(JSON.stringify({
            action: "fileLocalDescription",
            sdp: e,
            room: y
        }))
    }, this.iceCallback1 = function(t) {
        console.log("local ice callback"), t.candidate && (r.send(JSON.stringify({
            action: "fileCandidate",
            candidate: t.candidate,
            room: y
        })), console.log("Local ICE candidate: \n" + event.candidate.candidate))
    }, this.iceCallback2 = function(t) {
        console.log("remote ice callback"), t.candidate && r.send(JSON.stringify({
            action: "fileLocalCandidate",
            candidate: t.candidate,
            room: y
        }))
    }, this.onAddIceCandidateSuccess = function() {
        console.log("AddIceCandidate success.")
    }, this.onAddIceCandidateError = function(e) {
        console.log("Failed to add Ice Candidate: " + e.toString())
    }, this.receiveChannelCallback = function(e) {
        console.log("Receive Channel Callback"), u = e.channel, u.binaryType = "arraybuffer", u.onmessage = w.onReceiveMessageCallback, "open" === u.readyState ? w.onReceiveChannelStateChange() : u.onopen = w.onReceiveChannelStateChange, u.onclose = w.onReceiveChannelStateChange, A = 0, M = 0, downloadAnchor.textContent = "", downloadAnchor.removeAttribute("download"), downloadAnchor.href && (URL.revokeObjectURL(downloadAnchor.href), downloadAnchor.removeAttribute("href")), w.trySending()
    }, this.onReceiveMessageCallback = function(e) {
        var t = new Int8Array(e.data);
        if (V.push(t), A += t.byteLength, progressBar.value = A, A >= f.size) {
            var o = new window.Blob(V, {
                type: F
            });
            downloadAnchor.href = URL.createObjectURL(o), downloadAnchor.download = f.name, downloadAnchor.textContent = f.name + " (" + f.size + " bytes)", downloadAnchor.style.display = "block", B && (window.clearInterval(B), B = null), w.closeDataChannels()
        }
    }, this.onSendChannelStateChange = function() {
        var e = h.readyState;
        console.log("Send channel state is: " + e), w.trySending()
    }, this.onReceiveChannelStateChange = function() {
        var e = u.readyState;
        console.log("Receive channel state is: " + e), "open" === e && (S = new Date().getTime(), x = S, B = window.setInterval(w.displayStats, 500)), w.trySending()
    }, this.trySending = function() {
        h && "open" === h.readyState && !g && (g = !0, w.sendData())
    }, this.displayStats = function() {
        v && "connected" === v.iceConnectionState && v.getStats(null, function(e) {
            if (null !== B)
                for (var t in e) {
                    var o = e[t];
                    if ("googCandidatePair" === o.type && "true" === o.googActiveConnection) {
                        var i = o.bytesReceived,
                            s = Math.round(8 * (i - R) / (o.timestamp - x));
                        x = o.timestamp, R = i, s > M && (M = s)
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
        var o = new Notification(t, {
            icon: "/img/logo.png",
            body: "Click to open the page.",
            vibrate: [500, 110, 500, 110, 500]
        });
        o.onclick = function() {
            try {
                window.focus()
            } catch (e) {
                console.log(e)
            }
        }, setTimeout(o.close.bind(o), 1e4)
    } else "denied" !== Notification.permission && Notification.requestPermission().then(function(e) {
        "granted" === e && (o = new Notification("Hi there!"))
    })
}, this.requestPermissions = function() {
    "granted" !== Notification.permission && Notification.requestPermission()
}, this.isNotificationSupported = function() {
    return "Notification" in window
}
};
(function(t) {
var o, i = {
    msgStore: {},
    persistMsgStore: function(i) {
        t.localStorage ? (localStorage.setItem("msgStore", JSON.stringify(i)), this.msgStore = i) : this.msgStore = i;
        var s = o.Event("LSLocaleUpdated");
        o(document).trigger(s)
    },
    setLanguage: function(e, t) {
        o.ajax({
            url: t + "locales/" + e + ".json",
            dataType: "json",
            success: function(e) {
                i.persistMsgStore(e)
            },
            error: function() {
                o.getJSON(t + "locales/en_US.json", function(e) {
                    i.persistMsgStore(e)
                })
            }
        })
    },
    initMsgStore: function(e) {
        var t = e.lang;
        i.setLanguage(t, e.lsRepUrl)
    },
    init: function(e, i) {
        o = i;
        var s = "";
        !t.localStorage ? this.initMsgStore(e) : (s = localStorage.getItem("msgStore"), null === s ? this.initMsgStore(e) : (this.initMsgStore(e), this.msgStore = JSON.parse(s)))
    }
};
t.smartVideoLocale = i
})(window);
var plugin_controller = function() {
function e(e) {
    if ("PermissionDeniedError" == e) {
        if (a = "PermissionDeniedError", n) return n("PermissionDeniedError");
        throw new Error("PermissionDeniedError")
    }
    "rtcmulticonnection-extension-loaded" == e && (a = "desktop"), e.sourceId && n && n(s = e.sourceId, !0 === e.canRequestAudioTrack)
}

function t(e) {
    if (!e) throw "\"callback\" parameter is mandatory.";
    return s ? e(s) : void(n = e, window.postMessage("get-sourceId", "*"))
}

function o(e) {
    if (!e) throw "\"callback\" parameter is mandatory.";
    return s ? e(s) : void(n = e, window.postMessage("audio-plus-tab", "*"))
}
var i;
this.init = function(e, t) {
    e = e, this.getChromeExtensionStatus(e, function(o) {
        if ("installed-enabled" === o || "not-chrome" === o) {
            var i = jQuery.Event("PluginDetected");
            jQuery(t).trigger(i)
        } else {
            var i = jQuery.Event("PluginNotDetected");
            jQuery(t).trigger(i)
        }
    })
}, window.addEventListener("message", function(t) {
    t.origin != window.location.origin || e(t.data)
});
var s, n, a = "screen";
this.isChromeExtensionAvailable = function(e) {
    return e ? "desktop" == a ? e(!0) : void(window.postMessage("are-you-there", "*"), setTimeout(function() {
        "screen" == a ? e(!1) : e(!0)
    }, 2e3)) : void 0
}, this.getChromeExtensionStatus = function(e, t) {
    if (isFirefox || isEdge || isChrome && 72 <= getChromeVersion()) return t("not-chrome");
    2 != arguments.length && (t = e, i = "lnccibcicldllmjjphpacjplnpmjnmab");
    var o = document.createElement("img");
    o.src = "chrome-extension://" + e + "/icon16.png", o.onload = function() {
        a = "screen", window.postMessage("are-you-there", "*"), setTimeout(function() {
            "screen" == a ? t("installed-disabled") : t("installed-enabled")
        }, 2e3)
    }, o.onerror = function() {
        t("not-installed")
    }
}, this.getScreenConstraints = function(e, i) {
    s = null;
    if (isFirefox) return e(null, {
        mozMediaSource: "window",
        mediaSource: "window"
    });
    if (isEdge) return e(null, {
        video: !0
    });
    var n = {
        mandatory: {
            chromeMediaSource: a,
            maxWidth: 1920 < screen.width ? screen.width : 1920,
            maxHeight: 1080 < screen.height ? screen.height : 1080
        },
        optional: []
    };
    return "desktop" != a || s ? void("desktop" == a && (n.mandatory.chromeMediaSourceId = s), e(null, n)) : void(i ? o(function(t, o) {
        n.mandatory.chromeMediaSourceId = t, o && (n.canRequestAudioTrack = !0), e("PermissionDeniedError" == t ? t : null, n)
    }) : t(function(t) {
        n.mandatory.chromeMediaSourceId = t, e("PermissionDeniedError" == t ? t : null, n)
    }))
}
};
var uiHandler = function() {
var e, t, o, i = this;
this.init = function(i, s, n) {
    e = i, t = s, o = n
}, this.setMobileChatOnly = function() {
    (isAndroid || isiPhone) && e(".wd-v-share").hide(), i.displayChatOnly()
}, this.setVideoBoxOff = function(t, o, s) {
    audio_on = !1, video_on = !1, i.setMuteButton(), i.setVideoButton(), o = !!o, e("#wd-widget-content-" + t + " .wd-video-box-on").hide(), e("#wd-call-widget-3").hide(), e("#unsupported_div").show(), s ? (e("#unsupported_pluginless").hide(), isIEA && e("#unsupported_pluginless_ie").show(), isSafariA && e("#unsupported_pluginless_safari").show()) : e("#unsupported_pluginless").show(), e("#wd-widget-content-video-ringing").hide(), e("#wd-widget-content-video-waiting").hide()
}, this.displayVideoOnly = function() {
    e(".wd-chat-box").hide(), e(".wd-video-box").css("width", "100%"), e(".wd-video-box").css("border-right", 0), e("#mainleft_div").show(), e("#wd-widget-content-whiteboard").hide(), e("#wd-widget-content-video").show(), jQuery(".sourcevideo").each(function() {
        var e = jQuery(this).data("id");
        jQuery("#remoteVideo" + e).detach().appendTo("#video_container"), jQuery("#remoteVideo" + e).removeClass("smallvideo")
    })
}, this.displayChatOnly = function() {
    o.getStream(o.getRemoteSessionId()) ? (e("#slide_video").show(), e("#call_audio_video").hide()) : (e("#slide_video").hide(), e("#call_audio_video").show()), e(".wd-v-text").show(), e("#mainleft_div").hide(), e(".wd-chat-box").show(), e(".wd-chat-box").css("width", "100%"), e("#wd-widget-content-whiteboard").hide()
}, this.restoreVideoBox = function() {
    e("#call_audio_video").hide(), isAndroid || isiPhone || (stopFullScreenPopup(), e("#mainleft_div").attr("style", ""), e("#mainleft_div").show()), e("#mainleft_div").show()
}, this.restoreChatBox = function() {
    o.getStream(o.getRemoteSessionId()) ? (e("#slide_video").show(), e("#call_audio_video").hide()) : (e("#slide_video").hide(), e("#call_audio_video").show()), e("#mainleft_div").attr("style", ""), e(".wd-chat-box").show(), e(".wd-chat-box").css("width", "35%"), e(".wd-chat-box").css("border-right", "1px solid #F7F7F7")
}, this.syncVideoChatPanelsPos = function() {
    var t = e("#newdev_video"),
        o = e("#newdev_chat");
    e("#newdev_video").is(":visible") ? (panel_xpos = t.css("left"), panel_ypos = t.css("top"), o.css("left", panel_xpos), o.css("top", panel_ypos)) : e("#newdev_chat").is(":visible") && (panel_xpos = o.css("left"), panel_ypos = o.css("top"), t.css("left", panel_xpos), t.css("top", panel_ypos))
}, this.setDisabled = function(t) {
    t ? (e("#call_video").addClass("disabled"), e("#call_audio").addClass("disabled"), e("#file_transfer").addClass("disabled"), e("#startscreenshare").addClass("disabled"), e("#callButton_1").addClass("disabled"), e("#callAudioButton_1").addClass("disabled"), e("#newdev_chat_message1").addClass("disabled"), e("#whiteboard").addClass("disabled")) : (e("#call_video").removeClass("disabled"), e("#call_audio").removeClass("disabled"), e("#startscreenshare").removeClass("disabled"), e("#file_transfer").removeClass("disabled"), e("#callButton_1").removeClass("disabled"), e("#callAudioButton_1").removeClass("disabled"), e("#newdev_chat_message1").removeClass("disabled"), e("#whiteboard").removeClass("disabled"))
}, this.toggleWidget = function() {
    e("#nd_widget_content").toggle(), e(".agent-address-wd").hide(), e("#peer_email_video").toggle(!1)
}, this.setVideoBox = function() {
    e("#recordingIcon").hide(), e("#newdev_video").show(), e("#mainleft_div").children().hide(), e("#video_container").show(), e("#video_container_oneway").hide(), e("#video_container_oneway_agent").hide(), e(".wd-v-nosound").removeClass("disabledDiv"), e("#video_back").show()
}, this.setOneWay = function() {
    e("#localVideo").hide(), e("#video_container_oneway").show(), e("#local_video_div").hide(), e(".wd-v-video").attr("class", "wd-v-novideo"), e(".wd-v-novideo").addClass("disabledDiv"), e(".wd-v-sound").attr("class", "wd-v-nosound"), e(".wd-v-nosound").addClass("disabledDiv")
}, this.togglePermissionError = function() {
    i.syncVideoChatPanelsPos(), i.togglePermissionWidget(!0), i.setVideoBox(), e("#permission_browsers_error").children().hide(), isChrome && e("#permission_div_error_chrome").show(), isFirefox && e("#permission_div_error_firefox").show(), e("#wd-widget-error").show(), i.setVideoButton()
}, this.toggleInstaWhiteboard = function() {
    window.resizeTo(window.screen.availWidth, window.screen.availHeight), stopIncomingCall(), i.syncVideoChatPanelsPos(), e("#mainleft_div").show(), e(".wd-chat-box").hide(), e(".wd-video-box").css("width", "100%"), e(".wd-video-box").css("border-right", 0), e("#wd-widget-content-whiteboard").show(), e("#wd-widget-content-chat-main").hide(), e("#wd-widget-content-video").hide(), e("#wd-avatar-agent").hide(), e("#video_container_chat").hide(), jQuery(".sourcevideo").each(function() {
        var e = jQuery(this).data("id");
        jQuery("#remoteVideo" + e).detach().appendTo("#whiteboard_video"), jQuery("#remoteVideo" + e).addClass("smallvideo")
    })
}, this.toggleInstaChat = function() {
    stopIncomingCall(), window.outerHeight == screen.availHeight && "undefined" != typeof widgetSize ? stopFullScreenPopup() : stopFullScreen(), i.syncVideoChatPanelsPos(), i.togglePermissionWidget(!0), i.setVideoBox(), e("#recordingIcon").hide(), e("#wd-widget-content-chat-main").show(), e("#wd-avatar-agent").show(), e("#video_container_chat").hide(), e("#wd-widget-content-whiteboard").hide(), audio_on = video_on = !0, i.setVideoButton(), i.setMuteButton()
}, this.toggleInstaChatScreen = function() {
    i.syncVideoChatPanelsPos(), i.togglePermissionWidget(!0), i.setVideoBox(), e("#wd-widget-content-chat-main").show(), e(".wd-avatar-agent").hide(), e("#video_container_chat").show(), e("#wd-widget-content-whiteboard").hide(), i.setVideoButton(), i.setMuteButton()
}, this.onIncomingChat = function() {
    i.restoreVideoBox()
}, this.onIncomingVideo = function() {
    i.restoreVideoBox()
}, this.toggleRinging = function(t) {
    i.setMobileChatOnly(), i.displayVideoOnly(), e("#toggle_icon").removeClass("video"), e("#wd-widget-content-video").hide(), e("#wd-widget-content-chat-main").hide(), e("#wd-widget-content-video-waiting").show(), e("#wd-widget-content-video-waiting").hide(), e("#wd-widget-content-video-ringing").show(), e("#wd-widget-content-whiteboard").hide(), e("#answer_call_button").off(), e("#answer_audiocall_button").off(), e("#reject_call_button").off(), e("#answer_call_button").on("click", function() {
        video_on = !0, i.setVideoButton(), t(!0), i.toggleVideoBox(!1)
    }), e("#answer_audiocall_button").on("click", function() {
        isiPhone ? (video_on = !0, video_iphone_on = !1) : video_on = !1, i.setVideoButton(), t(!0), i.toggleVideoBox(!1)
    }), e("#reject_call_button").on("click", function() {
        t(!1), i.toggleInstaChat()
    })
}, this.toggleVideoBox = function(t) {
    stopIncomingCall(), e("#wd-widget-content-chat-main").hide(), e("#wd-call-widget-3").hide(), e("#wd-widget-content-video-ringing").hide(), e("#wd-widget-content-whiteboard").hide(), !0 === t ? (e(".wd-v-text").show(), e("#wd-widget-content-video").show(), e("#wd-widget-content-video-waiting").hide(), jQuery(".sourcevideo").each(function() {
        var e = jQuery(this).data("id");
        jQuery("#remoteVideo" + e).detach().appendTo("#video_container"), jQuery("#remoteVideo" + e).removeClass("smallvideo")
    })) : 3 == t ? (e("#wd-widget-content-video").hide(), e("#wd-widget-content-video-waiting").hide(), i.setMobileChatOnly(), e("#wd-call-widget-3").show()) : (e("#wd-widget-content-video").hide(), e("#wd-widget-content-video-waiting").show())
}, this.setWidgetValues = function() {
    e("#peer_name_video").html(peer_name), e(".peer_name_video").html(peer_name), e("#peer_name_chat").html(peer_name), e(".dw-chat-avatar").attr("src", peer_avatar), e("#peer_email_video").html(peer_email), e("#peer_email_chat").html(peer_email), e(".agent-address-wd a").attr("href", "mailto:" + peer_email), e("#peer_phone_video").html(peer_phone), e("#peer_phone_chat").html(peer_phone);
    var t = getCurrentTime();
    e("#timestamp").html(t), peer_avatar ? e("#nd_widget_content .peer_avatar").attr("src", peer_avatar) : e("#nd_widget_content .peer_avatar").attr("src", lsRepUrl + "img/small-avatar.jpg");
    var o = document.querySelector(".bg-site4");
    peer_background && o !== void 0 && null !== o && (o.style.background = "url(" + peer_background + ") no-repeat center center", o.style.backgroundSize = "cover"), peer_logo && (jQuery("#nd_widget_content .firm-logo-wd img").attr("src", peer_logo), jQuery("#nd_widget_content .firm-logo-wd img").width(100), jQuery("#nd_widget_content .firm-logo-wd img").height("auto")), jQuery("#popup_widget_text").html(popup_message)
}, this.toggleInstaVideo = function(e) {
    i.syncVideoChatPanelsPos(), i.setMuteButton(), i.setVideoBox(), i.setVideoButton(), i.toggleVideoBox(e)
}, this.togglePermissionWidget = function(t, o) {
    isAndroid || (t ? (o ? e("#wd-widget-content-video-waiting").show() : e("#wd-widget-content-video-waiting").hide(), e("#permission_div").hide()) : isIEA && i.permissionDisplay())
}, this.permissionDisplay = function() {
    var t = video_on ? "video" : "";
    e("#permission_browsers").children().hide(), e("#permission_div_span").show(), isChrome && e("#permission_div_chrome" + t).show(), isFirefox && e("#permission_div_firefox" + t).show(), isIEA && e("#permission_div_ie" + t).show(), e("#wd-widget-content-video-waiting").hide(), e("#permission_div").show()
}, this.resetCallHoldState = function() {
    e("#on_hold").hide()
}, this.setMuteButton = function() {
    audio_on ? e(".wd-v-nosound").attr("class", "wd-v-sound") : e(".wd-v-sound").attr("class", "wd-v-nosound")
}, this.setRecordingUi = function(t) {
    t ? (e(".wd-v-recording").removeClass("recording-off"), e(".wd-v-recording").addClass("recording-on")) : (e(".wd-v-recording").removeClass("recording-on"), e(".wd-v-recording").addClass("recording-off"))
}, this.setScreenButton = function(t) {
    (isChrome || isFirefox) && !isAndroid && !isiPhone && (t ? (e("#startshare").hide(), e("#stopshare").show(), e("#startscreenshare").hide(), e("#screensharestop_div").show()) : (e("#stopshare").hide(), e("#startshare").show(), e("#screensharestop_div").hide(), e("#startscreenshare").show()))
}, this.setVideoButton = function() {
    video_on ? (e("#local_video_div").show(), e(".wd-v-novideo").attr("class", "wd-v-video")) : (e("#local_video_div").hide(), e(".wd-v-video").attr("class", "wd-v-novideo"))
}, this.setLocalRemote = function() {
    jQuery("#localVideo").removeClass("localvideo"), jQuery("#localVideo").addClass("sourcevideo")
}, this.setRemoteLocal = function() {
    jQuery("#localVideo").removeClass("sourcevideo"), jQuery("#localVideo").addClass("localvideo")
}
};
var caller_name, caller_phone, caller_avatar, caller_email, peer_name, peer_phone, peer_avatar, peer_logo, peer_background, peer_email, lsRepUrl, ui_handler, notify_handler, jQEngager, pluginInstalled, pluginController, comm_controller, visitors, queryString, videoDevices, multiStreamRecorder, roomId, fileInput, downloadAnchor, progressBar, popup_instance = null,
names = [],
popup_message = "",
widgetSize = {
    width: 750,
    height: 564
},
video_on = !0,
audio_on = !0,
isOnline = !1,
currentVideoDevice = 0,
receiveBuffer = [],
receivedSize = 0;
let sourceBuffer, passRoom, lsDesigner, visitorName, datetime, duration, requirePass = !1;
var main = function() {
jQEngager = jQuery;
var e = document.currentScript || function() {
    var e = document.getElementById("newdev-embed-script");
    return e
}();
if (null == e || e == null) {
    var t = document.getElementsByTagName("script"),
        o = t.length - 1;
    e = t[o]
}
jQuery(document).ready(function(t) {
    function o() {
        console.log("loadHtml");
        var e = t("<link>", {
                rel: "stylesheet",
                type: "text/css",
                href: lsRepUrl + "css/" + "button.css" + "?v=" + currVersion
            }),
            o = t("<link>", {
                rel: "stylesheet",
                type: "text/css",
                href: lsRepUrl + "css/" + "room.css" + "?v=" + currVersion
            });
        t(document.body).append(i), e.appendTo("head"), o.appendTo("head"), t.get(lsRepUrl + "pages/widget.html?v=" + currVersion, function(e) {
            var o = "pages/widget.agent.new.html?v=" + currVersion;
            t.get(lsRepUrl + o, function(o) {
                i.append(e), t("#agent_widget").append(o), ui_handler.setWidgetValues(), comm_controller.checkMediaDevices(), jQuery(document).on("LSLocaleUpdated", function() {
                    jQuery("#cancel_call_button span").html(smartVideoLocale.msgStore.Cancel), jQuery("#waitingToConnect").html(smartVideoLocale.msgStore.waitingToConnect), jQuery("#answer_audiocall_button").attr("title", smartVideoLocale.msgStore.answerWithAudio), jQuery("#answer_audiocall_button1").attr("title", smartVideoLocale.msgStore.answerWithAudio), jQuery("#callAudioButton_4").attr("title", smartVideoLocale.msgStore.callWithAudio), jQuery("#callAudioButton_1").attr("title", smartVideoLocale.msgStore.callWithAudio), jQuery("#call_audio").attr("title", smartVideoLocale.msgStore.callWithAudio), jQuery("#answer_call_button1").attr("title", smartVideoLocale.msgStore.answerWithVideo), jQuery("#answer_call_button").attr("title", smartVideoLocale.msgStore.answerWithVideo), jQuery("#reject_call_button").attr("title", smartVideoLocale.msgStore.rejectCall);
                    var e = smartVideoLocale.msgStore.incomingText;
                    jQuery("#incoming_text").html(e.replace("{{caller_name}}", peer_name)), jQuery("#callButton_4").attr("title", smartVideoLocale.msgStore.callWithVideo), jQuery("#callButton_1").attr("title", smartVideoLocale.msgStore.callWithVideo), jQuery("#call_video").attr("title", smartVideoLocale.msgStore.callWithVideo), jQuery("#file_transfer").attr("title", smartVideoLocale.msgStore.fileTransfer), jQuery("#showHideVideo").attr("title", smartVideoLocale.msgStore.showHideVideo), jQuery("#showHideAudio").attr("title", smartVideoLocale.msgStore.showHideAudio), jQuery("#startshare").attr("title", smartVideoLocale.msgStore.startShare), jQuery("#startscreenshare").attr("title", smartVideoLocale.msgStore.startShare), jQuery("#stopscreenshare").attr("title", smartVideoLocale.msgStore.stopShare), jQuery("#stopshare").attr("title", smartVideoLocale.msgStore.stopShare), jQuery("#cameraSwitch").attr("title", smartVideoLocale.msgStore.cameraSwitch), jQuery("#hangupButton").attr("title", smartVideoLocale.msgStore.hangupButton), jQuery("#enableScreenShare").html(smartVideoLocale.msgStore.enableScreenShare), jQuery("#screensharelink").attr("src", "https://chrome.google.com/webstore/detail/" + svConfigs.chromePluginId), jQuery(".swipe_text_video").html(smartVideoLocale.msgStore.videoScreen), jQuery(".swipe_text").html(smartVideoLocale.msgStore.chatScreen), jQuery(".login-wd-title").html(smartVideoLocale.msgStore.nameFieldForm), jQuery("#continue-button").html(smartVideoLocale.msgStore.continueButton), jQuery("#ng_caller_name").attr("placeholder", smartVideoLocale.msgStore.namePlaceholder), jQuery("#ng_caller_avatar").attr("placeholder", smartVideoLocale.msgStore.avatarPlaceholder), jQuery("#ng_password").attr("placeholder", smartVideoLocale.msgStore.passwordPlaceholder), jQuery("#answer_audiocall_button span").html(smartVideoLocale.msgStore.audio), jQuery("#answer_call_button span").html(smartVideoLocale.msgStore.video), jQuery("#reject_call_button span").html(smartVideoLocale.msgStore.reject), jQuery(".wd-v-recording recording-on").attr("title", smartVideoLocale.msgStore.stopRecording), jQuery(".wd-v-recording recording-off").attr("title", smartVideoLocale.msgStore.startRecording), jQuery("#recordingIcon").attr("title", smartVideoLocale.msgStore.recording), jQuery("#whiteboard").attr("title", smartVideoLocale.msgStore.whiteboard), jQuery("#recordinglink").html(smartVideoLocale.msgStore.previewRecording), jQuery(".acceptFile").html(smartVideoLocale.msgStore.acceptFile), jQuery(".rejectFile").html(smartVideoLocale.msgStore.rejectFile), jQuery("#cleanCanvas").attr("title", smartVideoLocale.msgStore.wb_clearall)
                });
                var r = {
                    lsRepUrl: lsRepUrl,
                    lang: svConfigs.smartVideoLanguage
                };
                smartVideoLocale.init(r, jQuery), jQuery(document).on("IncomingCall", function(o) {
                    console.log("IncomingCall", o.sessionId), ui_handler.setWidgetValues(), ui_handler.onIncomingVideo(), o.autoaccept || comm_controller.getVideoSessions() ? (t("#wd-widget-content-video-waiting").show(), setTimeout(function() {
                        comm_controller.answerCall(video_on, o.sessionId)
                    }, 1e3)) : (playIncomingCall(), ui_handler.toggleRinging(function(e) {
                        e ? comm_controller.answerCall(video_on, o.sessionId) : comm_controller.rejectCall()
                    }))
                }), jQuery(".wd-v-hangup").on("click", function() {
                    l()
                }), jQuery(document).off("ChatMessage"), jQuery(document).on("ChatMessage", function(t) {
                    var e = names[t.sessionId] ? names[t.sessionId].name : peer_name,
                        o = names[t.sessionId] ? names[t.sessionId].avatar : peer_avatar;
                    showMessage(e, t.msg, null, null, o), jQuery(".new_chat_badge_container").show()
                }), jQuery(document).off("LocalVideoStarted"), jQuery(document).on("LocalVideoStarted", function(t) {
                    jQuery("#localVideo").show(), ui_handler.toggleVideoBox(!0);
                    try {
                        if (isIEA) attachMediaStream(document.querySelector("video#localVideo"), t.stream);
                        else {
                            var e = document.querySelector("video#localVideo");
                            e.srcObject = t.stream, e.autoplay = !0, e.muted = !0
                        }
                    } catch (e) {
                        jQuery("#localVideo").attr("src", window.URL.createObjectURL(t.stream))
                    }
                }), jQuery("#recordingButton").on("click", function() {
                    multiStreamRecorder && "recording" == multiStreamRecorder.getState() ? d() : a()
                }), jQuery("#cancel_call_button").on("click", function() { S(!1),
                    l()
                }), jQuery("#callButton_1").on("click", function() {
                    video_on = video_iphone_on = !0, ui_handler.setVideoButton(), c(!1)
                }), jQuery("#callAudioButton_1").on("click", function() {
                    ringBackStart = !0, video_on = !1, ui_handler.setVideoButton(), c(!1)
                }), jQuery(document).on("RemoteStartRecording", function() {
                    t("#recordingIcon").show()
                }), jQuery(document).on("RemoteStopRecording", function() {
                    t("#recordingIcon").hide()
                }), jQuery(document).off("RemoteVideoStarted"), jQuery(document).on("RemoteVideoStarted", function(o) {
                    console.log("RemoteVideoStarted"), (isChrome || isFirefox) && !isiPhone && !isAndroid && queryString.isAdmin && !0 == svConfigs.recording.enabled && t("#recordingButton").show(), jQuery("#permission_div").hide(), jQuery("#video_back").hide(), stopIncomingCall();
                    try {
                        if (!t("#remoteVideo" + o.sessionId).length) {
                            var e = t("<video />", {
                                    id: "remoteVideo" + o.sessionId,
                                    class: "sourcevideo",
                                    videoautoplay: !0,
                                    playsinline: !0,
                                    muted: !1
                                }),
                                i = t("<span />", {
                                    id: "remoteVideoSpan" + o.sessionId,
                                    class: "sourcevideospan"
                                });
                            e.appendTo(jQuery("#video_container")), jQuery("#remoteVideo" + o.sessionId).data("id", o.sessionId), i.appendTo(jQuery("#video_container"));
                            var s = names[o.sessionId] ? names[o.sessionId].name : peer_name;
                            if (jQuery("#remoteVideoSpan" + o.sessionId).html(s), ui_handler.toggleVideoBox(!0), isIEA) attachMediaStream(document.querySelector("video#remoteVideo" + o.sessionId), o.stream);
                            else {
                                var n = document.querySelector("video#remoteVideo" + o.sessionId);
                                n.srcObject = o.stream, n.autoplay = !0, n.muted = !1, comm_controller.addStreamStopListener(o.stream, function() {})
                            }
                            b()
                        }(isChrome || isFirefox) && !isiPhone && !isAndroid && queryString.isAdmin && svConfigs.recording.enabled && svConfigs.recording.autoStart && !multiStreamRecorder && a()
                    } catch (e) {
                        console.log(e)
                    }
                }), jQuery(document).off("RemoteScreenShareStarted"), jQuery(document).on("RemoteScreenShareStarted", function(t) {
                    console.log("RemoteScreenShareStarted"), comm_controller.getStream(comm_controller.getRemoteSessionId()) ? (I(!0), jQuery("#remoteScreen").show()) : (ui_handler.restoreVideoBox(), ui_handler.displayVideoOnly(), ui_handler.toggleInstaChatScreen(), jQuery("#remoteScreenChat").show());
                    try {
                        if (!comm_controller.getStream(comm_controller.getRemoteSessionId())) setTimeout(function() {
                            if (isIEA) attachMediaStream(document.querySelector("video#remoteScreenChat"), t.stream);
                            else {
                                var e = document.querySelector("video#remoteScreenChat");
                                e.srcObject = t.stream, e.autoplay = !0, e.muted = !1
                            }
                        }, 4e3);
                        else if (isIEA) attachMediaStream(document.querySelector("video#remoteScreen"), t.stream);
                        else {
                            var e = document.querySelector("video#remoteScreen");
                            e.srcObject = t.stream, e.autoplay = !0, e.muted = !1
                        }
                    } catch (e) {
                        comm_controller.getStream(comm_controller.getRemoteSessionId()) ? jQuery("#remoteScreen").attr("src", window.URL.createObjectURL(t.stream)) : jQuery("#remoteScreenChat").attr("src", window.URL.createObjectURL(t.stream))
                    }
                }), jQuery(document).on("IncomingScreenShare", function(t) {
                    console.log("IncomingScreenShare", t)
                }), jQuery(document).off("ScreenShareEnded"), jQuery(document).on("ScreenShareEnded", function() { 
                    if (console.log("ScreenShareEnded"), comm_controller.getStream(comm_controller.getRemoteSessionId())) {
                 
                        jQuery("#remoteScreen").hide(), I(!1);
                        var e = document.querySelector("video#remoteScreen");
                        e && (e.src = "", e.srcObject = null)
                    }
                    var t = document.querySelector("video#remoteScreenChat");
                    t && (t.src = "", t.srcObject = null), jQuery("#remoteScreenChat").hide(), h(!1)
                }), jQuery(document).on("ScreenShareFailed", function() {
                    toggleError("Screen Share failed"), h(!1)
                }), jQuery(document).on("VideoMuted", function() {
                    console.log("VideoMuted"), video_on = !1, ui_handler.setVideoButton()
                }), jQuery(document).on("VideoUnmuted", function() {
                    video_on = !0, ui_handler.setVideoButton()
                }), jQuery(document).on("AudioMuted", function() {
                    audio_on = !1, ui_handler.setMuteButton()
                }), jQuery(document).on("AudioUnmuted", function() {
                    console.log("AudioUnmuted"), audio_on = !0, ui_handler.setMuteButton()
                }), jQuery(document).on("RemoteVideoMuted", function(t) {
                    console.log("RemoteVideoMuted"), jQuery("#remoteVideo" + t.sessionId).hide()
                }), jQuery(document).on("RemoteVideoUnmuted", function(t) {
                    jQuery("#remoteVideo" + t.sessionId).show()
                }), jQuery(document).on("RemoteAudioMuted", function() {
                    console.log("RemoteAudioMuted")
                }), jQuery(document).on("RemoteAudioUnmuted", function() {
                    console.log("RemoteAudioUnmuted")
                }), jQuery("#fullscreenButton").on("click", function() {
                    toggleFullScreen()
                }), jQuery("#exitFullscreenButton").on("click", function() {
                    toggleFullScreen()
                }), jQuery(document).on("WhiteboardSync", function(t) {
                    if (ui_handler.toggleInstaWhiteboard(), !lsDesigner) {
                        lsDesigner = new CanvasDesigner, lsDesigner.widgetHtmlURL = lsRepUrl + "pages/whiteboard.html", lsDesigner.widgetJsURL = lsRepUrl + "js/whiteboard.widget.js", svConfigs.whiteboard.allowAnonymous ? _() : (lsDesigner.setTools({}), lsDesigner.setSelected(""));
                        var e = document.getElementById("whiteboard_canvas");
                        lsDesigner.appendTo(e)
                    }
                    jQuery("#tool-box").hide(), lsDesigner.syncData(JSON.parse(t.whiteboardData))
                }), jQuery("#mainleft_div").hover(function() {
                    jQuery(".wd-video-c").delay(200).show()
                }, function() {
                    jQuery(".wd-video-c").delay(200).hide()
                }), jQuery("#call_video").off(), jQuery("#call_audio").off(), jQuery("#whiteboard").off(), jQuery("#whiteboard").on("click", function() {
                    if (ui_handler.toggleInstaWhiteboard(), jQuery("#cleanCanvas").show(), queryString.isAdmin && !lsDesigner) {
                        lsDesigner = new CanvasDesigner, lsDesigner.widgetHtmlURL = lsRepUrl + "pages/whiteboard.html", lsDesigner.widgetJsURL = lsRepUrl + "js/whiteboard.widget.js", _();
                        var e = document.getElementById("whiteboard_canvas");
                        lsDesigner.appendTo(e), comm_controller.sendWhiteboardData("initial")
                    }
                    setTimeout(function() {
                        lsDesigner.sync()
                    }, 2e3)
                }), jQuery("#call_video").on("click", function() {
                    video_on = !0, S(!0)
                }), jQuery("#call_audio").on("click", function() {
                    isiPhone ? (video_on = !0, video_iphone_on = !1) : video_on = !1, S(!0)
                }), jQuery(".wd-v-text").on("click", function() {
                    S(!1)
                }), jQuery("#cleanCanvas").on("click", function() {
                    lsDesigner && (lsDesigner.clearCanvas(), lsDesigner.sync())
                }), jQuery("#slide_video").on("click", function() {
                    S(!1)
                }), (isAndroid || isiPhone) && (jQuery("#mainleft_div").on("swipe", function() {
                    S(!1)
                }), jQuery(".wd-chat-box").on("swipe", function() {
                    S(!1)
                })), jQuery("#newdev_chat_message1").keyup(function(o) {
                    if (13 == o.keyCode && t("#newdev_chat_message1").text()) {
                        var e = t("#newdev_chat_message1").text();
                        user_act = !0, g(e, !0), t("#newdev_chat_message1").html("")
                    }
                }), jQuery(".wd-v-nosound").on("click", function() {
                    comm_controller.toggleAudio()
                }), jQuery(".wd-v-sound").on("click", function() {
                    comm_controller.toggleAudio()
                }), jQuery(".wd-v-novideo").on("click", function() {
                    comm_controller.toggleVideo()
                }), jQuery(".wd-v-video").on("click", function() {
                    comm_controller.toggleVideo()
                }), jQuery("#newdev_chat_button1").click(function() {
                    m("newdev_chat_message1")
                }), jQuery(document).on("RemoteVideoStopped", function() {
                    I(!0), jQuery("#video_back").show()
                }), jQuery(document).on("MediaDevices", function(o) {
                    videoDevices = o.devices, 1 < videoDevices.length && (t("#cameraSwitch").show(), t("#cameraSwitch").off(), t("#cameraSwitch").click(function() {
                        ++currentVideoDevice, currentVideoDevice === videoDevices.length && (currentVideoDevice = 0), l(), video_on = !0, ui_handler.displayVideoOnly(), setTimeout(function() {
                            c(!0, videoDevices[currentVideoDevice].value)
                        }, 1e3)
                    }))
                }), jQuery(document).on("RestartVideo", function() {
                    l(), video_on = !0, ui_handler.displayVideoOnly(), setTimeout(function() {
                        c(!0)
                    }, 1e3)
                }), jQuery(document).on("CallAccepted", function() {
                    stopIncomingCall()
                }), jQuery(document).on("CallRejected", function() {
                    stopIncomingCall()
                }), jQuery(document).on("CallFailed", function() {
                    stopIncomingCall()
                }), jQuery(document).on("LocalVideoStopped", function() {}), jQuery(document).on("ChatRejected", function() {}), jQuery(document).off("CallEnded"), jQuery(document).on("CallEnded", function(t) {
                    n(t.sessionId)
                }), jQuery(document).on("CheckPopup", function() {
                    comm_controller.setPing(comm_controller.getSessionId())
                }), jQuery(document).on("FileAccepted", function() {
                    comm_controller.createFileConnection()
                }), jQuery(document).on("FileRejected", function(t) {
                    jQuery("li[data-system-attribue=\"fileTransfer\"]").remove();
                    var e = t.sessionId ? names[t.sessionId].name : peer_name,
                        o = smartVideoLocale.msgStore.rejectedFile;
                    o = o.replace("{{caller_name}}", e), showMessage("", o, null, "fileTransfer")
                }), jQuery(document).off("IncomingFileTransfer"), jQuery(document).on("IncomingFileTransfer", function(t) {
                    var e = getGuid(),
                        o = t.sessionId ? names[t.sessionId].name : peer_name,
                        i = smartVideoLocale.msgStore.incomingFile;
                    i = i.replace("{{caller_name}}", o), showMessage("", i + t.name + "<br/><a href=\"javascript:acceptFile();\" class=\"acceptFile\">Accept</a> | <a href=\"javascript:rejectFile();\" class=\"rejectFile\">Reject</a>", null, "acceptReject"), window.acceptFile = function() {
                        var o = {
                            name: t.name,
                            size: t.size
                        };
                        jQuery("li[data-system-attribue=\"acceptReject\"]").remove(), showMessage("", smartVideoLocale.msgStore.receivingFile + t.name + "<br/><div class=\"progress\"><progress id=\"progress" + e + "\" max=\"0\" value=\"0\"></progress></div><a id=\"download" + e + "\"></a>", null, "fileTransfer"), downloadAnchor = document.querySelector("a#download" + e), progressBar = document.querySelector("progress#progress" + e), comm_controller.fileAccepted(o)
                    }, window.rejectFile = function() {
                        jQuery("li[data-system-attribue=\"acceptReject\"]").remove(), comm_controller.fileRejected(e), comm_controller.closeDataChannels()
                    }
                }), queryString.isAdmin && (comm_controller.adminOnline(), (isChrome || isFirefox) && !isiPhone && !isAndroid && !0 == svConfigs.recording.enabled && loadScript("../js/msr.js", function() {})), !0 == svConfigs.whiteboard.enabled && (queryString.isAdmin && t("#whiteboard_div").show(), loadScript("../js/canvas-designer-widget.js", function() {})), isOnline || queryString.isAdmin ? setTimeout(function() {
                    f()
                }, 100) : w(), (isChrome || isFirefox) && !isiPhone && !isAndroid && (t(".wd-v-share").show(), t("#screenshare_div").show(), t(document).on("PluginDetected", function() {
                    pluginInstalled = !0
                }), t(document).on("PluginNotDetected", function() {
                    pluginInstalled = !1
                }), pluginController.init(svConfigs.chromePluginId, document), t("#plugin_message > a").click(function() {
                    jQuery("#plugin_message").hide()
                }));
                var v = function() {
                    pluginController.getChromeExtensionStatus(svConfigs.chromePluginId, function(e) {
                        "installed-enabled" == e || "not-chrome" == e ? (pluginInstalled = !0, t("#plugin_message").hide(), console.log("start screen share"), comm_controller.getScreenStream() && u(), p()) : (pluginInstalled = !1, t("#plugin_message").show(), jQuery(".close-but-wd-small").on("click", function() {
                            t("#plugin_message").hide()
                        }))
                    })
                };
                jQuery("#startshare").on("click", function() {
                    v()
                }), jQuery("#startscreenshare").off("click", function() {}), jQuery("#startscreenshare").on("click", function() {
                    isOnline ? (ui_handler.displayVideoOnly(), v()) : w()
                }), jQuery("#stopshare").on("click", function() {
                    u()
                }), jQuery("#stopscreenshare").on("click", function() {
                    u()
                }), jQuery("#file_transfer").off(), jQuery("#file_transfer").on("click", function() {
                    jQuery("#filetransfer").click()
                }), jQuery("#filetransfer").off("change", function() {}), jQuery("#filetransfer").on("change", function() {
                    if (jQuery("input#filetransfer").val()) {
                        var e = getGuid(),
                            t = fileInput.files[0],
                            o = smartVideoLocale.msgStore.sendingFile;
                        showMessage("", o + t.name + "<br/><div class=\"progress\"><progress id=\"progress" + e + "\" max=\"0\" value=\"0\"></progress></div><a id=\"download" + e + "\"></a>", null, "fileTransfer"), downloadAnchor = document.querySelector("a#download" + e), progressBar = document.querySelector("progress#progress" + e), comm_controller.sendFile()
                    }
                }), jQuery(document).off("AdminPopupOnline"), jQuery(document).on("AdminPopupOnline", function(t) {
                    isOnline = !0, requirePass = t.pass != null && t.pass, f()
                }), jQuery(document).off("PopupOnline"), jQuery(document).on("PopupOnline", function(t) {
                    names[t.sessionId] || (names[t.sessionId] = {
                        avatar: t.avatar ? t.avatar : lsRepUrl + "img/small-avatar.jpg",
                        name: t.name ? t.name : guestName(t.sessionId)
                    }), isOnline = !0, f()
                }), jQuery(document).off("SendCallerBack"), jQuery(document).on("SendCallerBack", function(t) {
                    queryString.isAdmin || t.sessionId != comm_controller.getSessionId() || (toggleNotification("", !1), t.access ? (isOnline = !0, ui_handler.setDisabled(!1), jQuery("#ng_info").hide(), jQuery("#continue-button").off()) : (isOnline = !1, ui_handler.setDisabled(!0), toggleNotification(smartVideoLocale.msgStore.notValidPassword, !0), jQuery("#ng_info").show()))
                }), jQuery(document).off("CallerInfo"), jQuery(document).on("CallerInfo", function(t) {
                    t.callerInfo.name && names[t.sessionId] && (passRoom || t.callerInfo.password ? (queryString.isAdmin && comm_controller.sendCallerBack(t.callerInfo.password == passRoom, t.sessionId), t.callerInfo.password == passRoom && s(t)) : (!svConfigs.serverSide.loginForm && queryString.isAdmin && comm_controller.sendCallerBack(!0, t.sessionId), s(t)))
                }), jQuery(document).off("AdminPopupOffline"), jQuery(document).on("AdminPopupOffline", function() {
                    isOnline = !1, w()
                }), jQuery(document).off("PopupOffline"), jQuery(document).on("PopupOffline", function() {
                    isOnline = !1, w()
                }), jQuery(document).off("PopupLeft"), jQuery(document).on("PopupLeft", function(t) {
                    if (names[t.sessionId] && names[t.sessionId].name && queryString.isAdmin) {
                        var e = smartVideoLocale.msgStore.leftChat,
                            o = e.replace("{{caller_name}}", names[t.sessionId].name);
                        showMessage("", o, null, "leftChat")
                    }
                })
            })
        })
    }
    lsRepUrl = e.getAttribute("data-source_path"), peer_avatar = e.getAttribute("data-avatar") ? e.getAttribute("data-avatar") : lsRepUrl + "img/small-avatar.jpg", peer_name = e.getAttribute("data-names") ? e.getAttribute("data-names") : guestName(getGuid()), passRoom = e.getAttribute("data-pass") ? e.getAttribute("data-pass") : passRoom, visitorName = e.getAttribute("data-visitorName") ? e.getAttribute("data-visitorName") : "", datetime = e.getAttribute("data-datetime") ? e.getAttribute("data-datetime") : "", duration = e.getAttribute("data-duration") ? e.getAttribute("data-duration") : "", names[0] = {
        avatar: peer_avatar,
        name: peer_name
    };
    var i = t("<div>", {
        class: "nd-widget-container_lead",
        id: "newdev-widget"
    });
    jQuery(document).on("AdminPopupOnline", function(t) {
        delete names[0], names[t.sessionId] = {
            avatar: peer_avatar,
            name: peer_name
        }, requirePass = t.pass != null && t.pass, isOnline = !0
    }), jQuery(document).on("PopupOnline", function(t) {
        names[t.sessionId] || (names[t.sessionId] = {
            avatar: t.avatar ? t.avatar : lsRepUrl + "img/small-avatar.jpg",
            name: t.name ? t.name : guestName(t.sessionId)
        }), isOnline = !0
    }), jQuery(document).on("AdminPopupOffline", function() {
        isOnline = !1
    }), jQuery(document).on("VisitorsRoom", function(t) {
        visitors = t.count
    }), comm_controller = new comController, comm_controller.init(passRoom), notify_handler = new notifyHandler, notify_handler.init(), pluginController = new plugin_controller, t(window).on("unload", function() {
        l(), console.log("close the call")
    });
    var s = function(t) {
        if (t.callerInfo.name && names[t.sessionId] && names[t.sessionId].name !== t.callerInfo.name) {
            names[t.sessionId] = {
                name: t.callerInfo.name,
                email: t.callerInfo.email
            }, jQuery("#peer_name_chat").text(names[t.sessionId].name);
            var e = smartVideoLocale.msgStore.incomingText;
            if (jQuery("#incoming_text").html(e.replace("{{caller_name}}", names[t.sessionId].name)), t.sessionId !== comm_controller.getSessionId() && !1 === t.isAdmin) {
                var o = smartVideoLocale.msgStore.joinedChat,
                    i = o.replace("{{caller_name}}", names[t.sessionId].name);
                showMessage("", i, null, "joinedChat")
            }
        }
        var s = t.callerInfo.avatar ? t.callerInfo.avatar : lsRepUrl + "img/small-avatar.jpg";
        names[t.sessionId] && (names[t.sessionId].avatar = s), jQuery(".dw-chat-avatar").attr("src", s), jQuery(".direct-chat-img left " + t.callerInfo.name).attr("src", s)
    };
    jQuery(document).on("CallerInfo", function(t) {
        s(t)
    });
    var n = function(e) {
            stopIncomingCall(), d(), console.log("call ended");
            var t = document.querySelector("video#remoteVideo" + e),
                o = document.querySelector("video#localVideo");
            t && (t.src = "", t.srcObject = null, jQuery("#remoteVideo" + e).remove(), jQuery("#remoteVideoSpan" + e).remove()), b(), comm_controller.getVideoSessions() || (comm_controller.stopMediaStream(e), comm_controller.handleScreenShareTermination(), o && (o.src = "", o.srcObject = null), jQuery("#localVideo").hide(), jQuery("#remoteVideo" + e).remove(), jQuery("#remoteVideoSpan" + e).remove(), jQuery("#video_back").show(), ui_handler.toggleInstaChat())
        },
        a = function() {
            comm_controller.startRecording(), ui_handler.setRecordingUi(!0);
            var e = [comm_controller.getStream()];
            jQuery(".sourcevideo").each(function() {
                if (jQuery(this).is(":visible")) {
                    var t = jQuery(this).data("id");
                    e.push(comm_controller.getRemoteStream(t))
                }
            }), multiStreamRecorder = RecordRTC(e, {
                type: "video",
                mimeType: "video/webm",
                disableLogs: !0
            }), multiStreamRecorder.startRecording()
        },
        d = function() {
            ui_handler.setRecordingUi(!1), comm_controller.stopRecording(), multiStreamRecorder && multiStreamRecorder.stopRecording(r)
        },
        r = function() {
            var e = URL.createObjectURL(multiStreamRecorder.getBlob());
            if (svConfigs.recording.download) {
                const t = document.createElement("a");
                t.style.display = "none", t.href = e, t.download = "record_" + getCurrentDateFormatted() + ".webm", document.body.appendChild(t), t.click(), setTimeout(function() {
                    document.body.removeChild(t), window.URL.revokeObjectURL(e)
                }, 100)
            } else jQuery("#recording_message").show(), jQuery("#recordinglink").attr("href", e), jQuery("#recordinglink > a").click(function() {
                window.URL.revokeObjectURL(e), jQuery("#recording_message").hide()
            }), jQuery(".close-but-wd-small").on("click", function() {
                window.URL.revokeObjectURL(e), t("#recording_message").hide()
            });
            if (svConfigs.recording.saveServer) {
                var o = "record_" + getCurrentDateFormatted() + ".webm",
                    i = new FormData;
                i.append("video-filename", o), i.append("video-blob", multiStreamRecorder.getBlob()),
                    function(e, t) {
                        var o = new XMLHttpRequest;
                        o.onreadystatechange = function() {
                            4 != o.readyState || 200 != o.status
                        }, o.open("POST", e), o.send(t)
                    }(lsRepUrl + "/server/saverecord.php", i)
            }
        },
        l = function() {
            stopIncomingCall(), d(), ui_handler.toggleInstaChat(), comm_controller.endCall("hang up call", comm_controller.getSessionId()), comm_controller.handleCallTermination(), u(), jQuery(".sourcevideo").each(function() {
                if (jQuery(this).is(":visible")) {
                    var e = jQuery(this).data("id");
                    jQuery("#remoteVideoSpan" + e).remove(), jQuery(this).remove()
                }
            });
            var e = document.querySelector("video#localVideo");
            e && (e.src = "", e.srcObject = null)
        },
        c = function(e, t) {
            if (isOnline) {
                ui_handler.restoreVideoBox(), ui_handler.toggleInstaVideo(!1);
                var o = video_on ? "Video" : "Audio";
                comm_controller.initCall(o, e, t, comm_controller.getSessionId())
            } else w()
        },
        g = function(e, t) {
            e = escapeHtmlEntities(e), t && showMessage("Me", e);
            var o = new Date().toLocaleTimeString();
            comm_controller.addLocalChat(e, o, !0)
        },
        m = function(e) {
            if (t("#" + e).text()) {
                var o = t("#" + e).text();
                g(o, !0), t("#" + e).html("")
            }
        },
        h = function(e) {
            e ? (jQuery("#wd-widget-content-video").show(), !video_on && jQuery("#local_video_div").show(), jQuery("#localScreen").show(), jQuery("#localVideo").hide(), jQuery("#showHideVideo").addClass("disabled")) : (jQuery("#remoteScreenChat").hide(), jQuery("#remoteScreen").hide(), jQuery("#localScreen").hide(), video_on ? jQuery("#localVideo").show() : jQuery("#local_video_div").hide(), jQuery("#showHideVideo").removeClass("disabled")), ui_handler.setScreenButton(e)
        },
        u = function() {
            h(!1), comm_controller.handleScreenShareTermination()
        },
        p = function() {
            pluginController.getScreenConstraints(function(e, t) {
                if (e) return console.log(e);
                t.canRequestAudioTrack;
                var o = document.querySelector("video#localScreen");
                isEdge ? navigator.getDisplayMedia(t).then(function(e) {
                    o.srcObject = e, h(!0), comm_controller.startScreenShare(e, !0), comm_controller.addStreamStopListener(e, function() {
                        u()
                    })
                }) : isChrome && 72 <= getChromeVersion() ? navigator.mediaDevices.getDisplayMedia(t).then(function(e) {
                    o.srcObject = e, h(!0), comm_controller.startScreenShare(e, !0), comm_controller.addStreamStopListener(e, function() {
                        u()
                    })
                }) : navigator.mediaDevices.getUserMedia({
                    video: t
                }).then(function(e) {
                    comm_controller.initScreen(!0), o.srcObject = e, o.autoplay = !0, o.muted = !0, h(!0), comm_controller.startScreenShare(e, !0), comm_controller.addStreamStopListener(e, function() {
                        u()
                    })
                }).catch(function(e) {
                    console.log(JSON.stringify(e, null, "\t"))
                })
            })
        },
        v = function(e) {
            toggleNotification("", !1);
            var t = jQuery("#nd_widget_content").is(":visible");
            console.log("openWidget", t, e), caller_name = caller_name ? caller_name : "", caller_email = caller_email ? caller_email : "", caller_phone = caller_phone ? caller_phone : "", t || ui_handler.toggleWidget(), "chat" === e ? ui_handler.toggleInstaChat() : "video" === e ? ui_handler.toggleInstaVideo() : 4 === e && !t && ui_handler.toggleInstaVideo(4), document.getElementById("newdev_chat_message1").focus(), fileInput = document.querySelector("input#filetransfer")
        },
        S = function(e) {
            jQuery(".new_chat_badge_container").hide(), jQuery(".wd-chat-box").is(":visible") ? (ui_handler.displayVideoOnly(), !0 === e && c(!1)) : ui_handler.displayChatOnly()
        },
        f = function() {
            if (!comm_controller.getVideoSessions()) {
                if (v("chat"), !queryString.isAdmin && duration && datetime) {
                    var e = new Date,
                        o = new Date(datetime);
                    if (o.setMinutes(o.getMinutes() + parseInt(duration)), e > new Date(datetime) && o > e);
                    else {
                        var i = new Date,
                            s = new Date(datetime),
                            n = Math.abs(s - i) / 1e3,
                            a = Math.floor(n / 86400);
                        n -= 86400 * a;
                        var d = Math.floor(n / 3600) % 24;
                        n -= 3600 * d;
                        var r = Math.floor(n / 60) % 60;
                        if (n -= 60 * r, diffString = "", console.log(smartVideoLocale.msgStore), 0 < a) {
                            var l = 1 < a ? smartVideoLocale.msgStore.days : smartVideoLocale.msgStore.day;
                            diffString = a + " " + l
                        }
                        if (0 === a && 0 < d) {
                            var c = 1 < d ? smartVideoLocale.msgStore.hours : smartVideoLocale.msgStore.hour;
                            diffString = d + " " + c
                        }
                        if (0 === a && 0 == d && 0 < r && (diffString = r + " " + smartVideoLocale.msgStore.minutes), diffString && new Date(datetime) > e) {
                            var g = smartVideoLocale.msgStore.notexactAppointment,
                                m = g.replace("{{timemeeting}}", datetime),
                                m = m.replace("{{diffString}}", diffString);
                            toggleNotification(m, !0)
                        } else toggleNotification(smartVideoLocale.msgStore.appointmentPast, !0);
                        return ui_handler.displayChatOnly(), void ui_handler.setDisabled(!0)
                    }
                }
                if (!queryString.isAdmin && requirePass) return toggleNotification("", !1), jQuery("#ng_info").show(), ui_handler.displayChatOnly(), ui_handler.setDisabled(!0), visitorName && t("#ng_caller_name").hide(), t("#ng_password").show(), jQuery("#continue-button").on("click", function() {
                    var e = {};
                    e.name = visitorName ? visitorName : jQuery("#ng_caller_name").val(), e.password = jQuery("#ng_password").val(), comm_controller.setCallerInfo(comm_controller.getSessionId(), e, !1)
                }), void localStorage.setItem("prd", JSON.stringify(h));
                if (visitorName && !queryString.isAdmin) {
                    svConfigs.entryForm.enabled = !1;
                    var h = {
                        name: visitorName
                    };
                    localStorage.setItem("prd", JSON.stringify(h))
                }
                if (localStorage.getItem("prd")) {
                    svConfigs.entryForm.enabled = !1;
                    var u = localStorage.getItem("prd");
                    comm_controller.setCallerInfo(comm_controller.getSessionId(), JSON.parse(u), !1)
                }
                if (svConfigs.entryForm.enabled && !queryString.isAdmin) {
                    var p = function() {
                        caller_name = jQuery("#ng_caller_name").val(), caller_email = jQuery("#ng_caller_email").val(), caller_avatar = jQuery("#ng_caller_avatar").val(), toggleNotification("", !1);
                        var e = caller_name ? caller_name : "",
                            o = caller_email ? " (" + caller_email + ")" : "",
                            i = {
                                name: caller_name,
                                email: caller_email,
                                avatar: caller_avatar
                            };
                        svConfigs.serverSide && svConfigs.serverSide.loginForm ? (ui_handler.setDisabled(!0), jQuery("#ng_info").show(), t.ajax({
                            type: "POST",
                            url: lsRepUrl + "/server/script.php",
                            data: {
                                type: "login",
                                email: jQuery("#ng_caller_email").val(),
                                password: jQuery("#ng_password").val()
                            }
                        }).done(function(e) {
                            e ? (ui_handler.setDisabled(!1), jQuery("#ng_info").hide(), comm_controller.setCallerInfo(comm_controller.getSessionId(), i, !1), localStorage.setItem("prd", JSON.stringify(i))) : toggleNotification(smartVideoLocale.msgStore.notValidPassword, !0)
                        }).fail(function() {})) : (localStorage.setItem("prd", JSON.stringify(i)), svConfigs.entryForm.private && requirePass ? i.password = jQuery("#ng_password").val() : (jQuery("#ng_info").hide(), jQuery("#continue-button").off(), ui_handler.setDisabled(!1)), comm_controller.setCallerInfo(comm_controller.getSessionId(), i, !1))
                    };
                    if (svConfigs.entryForm.required || svConfigs.entryForm.private) {
                        var S = function() {
                            var o = function(o) {
                                var e = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                                13 == o.keyCode && "" !== t("#ng_caller_name").val() && "" !== t("#ng_caller_email").val() && e.test(t("#ng_caller_email").val()) && p();
                                var i = !svConfigs.entryForm.showEmail || "" !== t("#ng_caller_email").val() && e.test(t("#ng_caller_email").val()),
                                    s = !svConfigs.entryForm.showAvatar || "" !== t("#ng_caller_avatar").val();
                                "" !== t("#ng_caller_name").val() && i && s ? jQuery("#continue-button").removeClass("disabled") : jQuery("#continue-button").addClass("disabled")
                            };
                            t("#ng_caller_name").keyup(function(t) {
                                o(t)
                            }), t("#ng_caller_email").keyup(function(t) {
                                o(t)
                            }), t("#ng_password").keyup(function(t) {
                                o(t)
                            }), t("#ng_caller_avatar").keyup(function(t) {
                                o(t)
                            }), t("#ng_caller_name").blur(function(t) {
                                o(t)
                            }), t("#ng_caller_email").blur(function(t) {
                                o(t)
                            }), t("#ng_password").blur(function(t) {
                                o(t)
                            }), t("#ng_caller_avatar").blur(function(t) {
                                o(t)
                            })
                        };
                        (svConfigs.entryForm.private && requirePass || svConfigs.serverSide.loginForm) && (isOnline = !1, t("#ng_password").show()), svConfigs.entryForm.showEmail && t("#ng_caller_email").show(), svConfigs.entryForm.showAvatar && t("#ng_caller_avatar").show(), S(), jQuery("#continue-button").addClass("disabled")
                    }
                    ui_handler.displayChatOnly(), ui_handler.setDisabled(!0), jQuery("#ng_info").show(), setTimeout(function() {
                        jQuery("#ng_caller_name").focus()
                    }, 500), jQuery("#continue-button").off(), jQuery("#continue-button").on("click", function() {
                        p()
                    }), svConfigs.showEntryForm = !1
                } else queryString.isAdmin && (delete names[0], names[comm_controller.getSessionId()] = {
                    name: svConfigs.agentName ? svConfigs.agentName : guestName(comm_controller.getSessionId()),
                    avatar: svConfigs.agentAvatar ? svConfigs.agentAvatar : lsRepUrl + "img/small-avatar.jpg"
                }, comm_controller.setCallerInfo(comm_controller.getSessionId(), names[comm_controller.getSessionId()], !0)), ui_handler.displayChatOnly(), toggleNotification("", !1), ui_handler.setDisabled(!1)
            }
        },
        w = function() {
            if (ui_handler.setDisabled(!0), smartVideoLocale.msgStore.waitingOtherParty) var e = smartVideoLocale.msgStore.waitingOtherParty;
            else e = "Waiting for the other party to join";
            toggleNotification(e, !0)
        },
        I = function(e) {
            jQuery(".sourcevideo").each(function() {
                var t = jQuery(this).data("id");
                e ? (jQuery("#remoteVideo" + t).hide(), jQuery("#remoteVideoSpan" + t).hide()) : (jQuery("#remoteVideo" + t).show(), jQuery("#remoteVideoSpan" + t).show())
            })
        },
        b = function() {
            var e = comm_controller.getCountSessions(),
                t = 1 < e ? "50" : "100";
            0 < e ? jQuery(".sourcevideo").each(function() {
                if (jQuery(this).is(":visible")) {
                    jQuery(this).css("position", "static"), jQuery(this).css("width", t + "%"), jQuery(this).css("float", "left"), jQuery(this).css("max-height", jQuery(".wd-video").css("height"));
                    var e = jQuery(this).position(),
                        o = jQuery(this).data("id");
                    jQuery("#remoteVideoSpan" + o).css({
                        top: 10 + e.top + "px",
                        left: 15 + e.left + "px"
                    })
                }
            }) : jQuery(".sourcevideo").each(function() {
                if (jQuery(this).is(":visible")) {
                    var e = jQuery(this).data("id");
                    jQuery("#remoteVideoSpan" + e).remove(), jQuery(this).remove()
                }
            })
        },
        _ = function() {
            lsDesigner.setSelected("pencil"), lsDesigner.setTools({
                line: !0,
                arrow: !0,
                pencil: !0,
                marker: !0,
                dragSingle: !0,
                dragMultiple: !0,
                eraser: !0,
                pdf: !0,
                rectangle: !0,
                arc: !0,
                text: !0,
                image: !0,
                zoom: !0,
                lineWidth: !0,
                colorsPicker: !0,
                extraOptions: !0,
                undo: !0
            }), lsDesigner.icons = {
                pencil: lsRepUrl + "/img/whiteboard/pencil.png",
                marker: lsRepUrl + "/img/whiteboard/brush.png",
                eraser: lsRepUrl + "/img/whiteboard/eraser.png",
                text: lsRepUrl + "/img/whiteboard/text.png",
                image: lsRepUrl + "/img/whiteboard/image.png",
                dragSingle: lsRepUrl + "/img/whiteboard/dragSingle.png",
                dragMultiple: lsRepUrl + "/img/whiteboard/dragMultiple.png",
                line: lsRepUrl + "/img/whiteboard/line.png",
                arrow: lsRepUrl + "/img/whiteboard/arrow.png",
                pdf: lsRepUrl + "/img/whiteboard/pdf.png",
                zoom_in: lsRepUrl + "/img/whiteboard/zoom_in.png",
                zoom_out: lsRepUrl + "/img/whiteboard/zoom_out.png",
                arc: lsRepUrl + "/img/whiteboard/arc.png",
                rectangle: lsRepUrl + "/img/whiteboard/rectangle.png",
                lineWidth: lsRepUrl + "/img/whiteboard/lineWidth.png",
                undo: lsRepUrl + "/img/whiteboard/undo.png",
                colorsPicker: lsRepUrl + "/img/whiteboard/colorsPicker.png",
                extraOptions: lsRepUrl + "/img/whiteboard/extraOptions.png"
            }, lsDesigner.addSyncListener(function(e) {
                comm_controller.sendWhiteboardData(e)
            })
        };
    ui_handler = new uiHandler, ui_handler.init(jQuery, i, comm_controller), jQuery(document).on("CommConnected", function() {
        function e() {
            l(), window.opener && (queryString.isAdmin && (isOnline = !1, comm_controller.adminOffline()), window.opener.postMessage({
                type: "popupClosed"
            }, "*"))
        }
        if (window.addEventListener ? window.addEventListener("beforeunload", e, !1) : window.attachEvent("onbeforeunload", e), isAndroid || isiPhone) {
            var t = function() {
                loadScript("https://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.js", o())
            };
            loadScript("https://webrtc.github.io/adapter/adapter-latest.js", t())
        } else isIEA ? loadScript("https://cdn.temasys.com.sg/adapterjs/0.15.x/adapter.screenshare.js", o()) : loadScript("https://webrtc.github.io/adapter/adapter-latest.js", o())
    })
})
};

function loadScript(e, t) {
var o = document.createElement("script");
o.type = "text/javascript", o.readyState ? o.onreadystatechange = function() {
    ("loaded" == o.readyState || "complete" == o.readyState) && (o.onreadystatechange = null, t && t())
} : o.onload = function() {
    t && t()
}, o.src = e + "?v=" + currVersion, document.getElementsByTagName("head")[0].appendChild(o)
}
var init = new main;