var countdownStatus = "init";
var autoSaveStatus = "init";
var EXAM_TOTAL_TIME_LIMIT_TYPE = "0";
var EXAM_START_END_TIME_LIMIT_TYPE = "1";
$(document).ready(function () {
    for (var a in document.images) {
        document.images[a].ondragstart = function () {
            return false
        }
    }
    browserPatch(["png", "hover"]);
    preventDefaultEvent([window], [KEY_CODE.K_F5], [KEY_CODE.K_F4], [KEY_CODE.K_F5, KEY_CODE.K_C, KEY_CODE.K_V, KEY_CODE.K_A]);
    preventContextMenu([window])
});

function autoSaveAnswer() {
    if (autoSaveStatus == "stop") {
        return
    }
    if (autoSaveStatus != "init") {
        saveCurrentAnswer(true, true, false, true)
    }
    autoSaveStatus = "doing";
    setTimeout(autoSaveAnswer, 5000)
}

function initTimeArea() {
    var c = examCache.getExamTimeLimitType();
    if (c == EXAM_TOTAL_TIME_LIMIT_TYPE) {
        var a = examCache.getPlanCloseTime();
        var e = examCache.getTimeLeft();
        var d = examCache.getServerDate();
        var b = Math.floor((a - d) / 1000);
        if (e > b && b >= 0) {
            e = b;
            examCache.setTimeLeft(e)
        }
    }
    refreshServerTime();
    drawTimeArea()
}
var examTimeTimer;

function refreshServerTime() {
    examTimeTimer = setTimeout(updateCurrentTime, 1000)
}

function updateCurrentTime() {
    var a = parseInt(examCache.getServerDate()) + 1000;
    examCache.setServerDate(a);
    refreshServerTime()
}

function getCurrentTimeFromServer() {
    var a = getUserLeftTime();
    if (a <= 0) {
        return
    }
    exam.sync("/exam/examflow_getCurrentTimeFromServer.action", null, function (d) {
        if (exam.isRequestSuccess(d)) {
            var b = d.retMsg;
            if (!b) {
                return
            }
            var c = examCache.getServerDate();
            if (c != "") {
                examCache.setServerDate(b);
                clearTimeout(examTimeTimer);
                refreshServerTime()
            }
        }
    }, {
        dataType: "json"
    });
    setTimeout(getCurrentTimeFromServer, 1000 * 60 * 5)
}
var leftMin = 0;

function displayLeftTime() {
    if (countdownStatus == "stop") {
        return
    }
    var f = getUserLeftTime();
    if (f < 0) {
        f = 0
    }
    $(".leftH").html(Math.floor(f / 3600) + "");
    var e = f % 3600;
    $(".leftM").html(Math.floor(e / 60) + "");
    $(".leftS").html(e % 60 + "");
    $("#time_min").text(secondsToTimeStr(f));
    $("#timeUsed").html(Math.floor(secondsUsed / 60));
    var d = Math.floor(f / 60);
    if (d != leftMin) {
        saveLeftTime(f);
        leftMin = d
    }
    if (f <= 903 && f > 900 && (examCache.getExamTimeRemind() == true)) {
        examCache.setExamTimeRemind(false);
        var a = showInfo({
            firstLine: "请合理分配时间",
            secondLine: "距离考试结束还有<span style='color:red;font-size:20px;'>15</span>分钟!",
            icon: "warn",
            lineFontSame: false
        });
        setTimeout(function () {
            a.close()
        }, 30000)
    }
    var b = examCache.getTakePhotoCount();
    var c = examCache.getHasFaceDetection();
    if (c == null || c == undefined || c == "") {
        c = "0"
    }
    if (f <= 0) {
        forceSubmitExam();
        return
    }
    if (b > 0 && c == "0") {
        startPhotoMonitor()
    }
    if (b > 0 && c == "1") {
        startFaceDetectionOrFindFace()
    }
    setTimeout(displayLeftTime, 1000)
}

function saveLeftTime(b) {
    try {
        if (b < 0) {
            b = 0
        }
        exam.async("/exam/examflow_saveCountDown.action", {
            countDown: b,
            examRecordId: examCache.getExamRecordId()
        }, function (d) {
            var c = $.parseJSON(d);
            if (c.retCode == "0") {
                if (b == 0) {
                    examCache.setExamFinished(true)
                }
            }
        }, {
            hideError: true
        })
    } catch (a) {
        log(a.message)
    }
}

function autoSaveLeftTime() {
    var a = getUserLeftTime();
    saveLeftTime(a)
}

function drawTimeArea() {
    var b = examCache.getExamTime();
    if (b <= 0) {
        countdownStatus = "stop";
        $("#examTime").parent().remove();
        $("#timerContainer").remove();
        return
    }
    var c = $("#examTime").parent().parent().css("min-height");
    c = parseInt(c) + 20;
    $("#examTime").parent().parent().css("min-height", c + "px");
    $("#examTime").parent().show();
    $("#timerContainer").show();
    $("#examTime").html(examCache.getExamTime() + "分钟");
    var a = examCache.getExamTimeLimitType();
    if (a == EXAM_TOTAL_TIME_LIMIT_TYPE) {
        $("#timeUsedContent").html("我已经使用<b id='timeUsed'></b>分钟了")
    } else {
        if (a == EXAM_START_END_TIME_LIMIT_TYPE) {
            $("#timeUsedContent").html("考试已经开始<b id='timeUsed'></b>分钟了")
        }
    }
}
var secondsUsed = 0;

function getUserLeftTime() {
    var e = examCache.getExamTimeLimitType();
    var f = examCache.getServerDate();
    var a = Math.floor((f - examCache.getUserInitDate()) / 1000);
    if (e == EXAM_TOTAL_TIME_LIMIT_TYPE) {
        secondsUsed = examCache.getTimeSpent() + a;
        var b = examCache.getTimeLeft();
        return b - a
    } else {
        if (e == EXAM_START_END_TIME_LIMIT_TYPE) {
            var d = examCache.getExamStartDate();
            var c = examCache.getExamEndDate();
            secondsUsed = Math.floor((f - d) / 1000);
            return Math.floor((c - f) / 1000)
        }
    }
}

function forceSubmitExam() {
    saveCurrentAnswer(false, false, true);
    autoSaveLeftTime();
    sendExamFinishRequest([function () {
        layer.msg("考试结束，系统自动提交试卷", {
            shift: 2,
            time: "3000"
        })
    }, afterCompleteExam], true)
}

function confirmSubmitExam() {
    if (getStudentConnectStatus() === "lostConnect") {
        return
    }
    saveCurrentAnswer(false, false, true);
    var a = examCache.getMinSubmitTime();
    if (a > 0) {
        exam.post("/exam/examflow_getTimeSpent.action", {
            examRecordId: examCache.getExamRecordId()
        }, function (e) {
            var c = $.parseJSON(e);
            if (exam.isRequestSuccess(c)) {
                var d = c.data.timeSpent;
                if (countdownStatus != "stop") {
                    var b = secondsUsed;
                    if (Math.abs(d - b) > 30) {
                        d = b
                    }
                }
                if (d < a * 60) {
                    showInfo({
                        firstLine: "不可交卷",
                        secondLine: "作答时间不足" + a + "分钟",
                        icon: "warn",
                        lineFontSame: false
                    }, "不允许交卷", {
                        actionName: "继续答题"
                    })
                } else {
                    userConfirmSubmit()
                }
            }
        }, false, false, null, function () {
            try {
                var b = [];
                examOfflineDBObj.getDataStrByKey("handSubmitPaperError", function (d) {
                    b.push(d.split(",")).push(dateTimeToStr(new Date()));
                    examOfflineDBObj.saveDataStr("handSubmitPaperError", b.join(","))
                }, function () {
                    b.push(dateTimeToStr(new Date()));
                    examOfflineDBObj.saveDataStr("handSubmitPaperError", b.join(","))
                })
            } catch (c) {}
            layer.msg("网络异常，请稍后再试", {
                shift: 2,
                time: "2500"
            })
        })
    } else {
        userConfirmSubmit()
    }
}

function userConfirmSubmit() {
    requestCompleteQSeq(null, function (d) {
        var h = examCache.getNoCheckQuesList();
        for (var c = 0; c < h.length; c++) {
            var g = h[c];
            removeArrayItem(d, g)
        }
        var f = !d ? 0 : d.length;
        if (f == 0) {
            var e = true;
            if (!!window.checkUploadCount && typeof (checkUploadCount) == "function") {
                e = checkUploadCount()
            }
            if (e) {
                $("#undoConfirm").html('<div class="win_info_long" style="margin-top:30px;"><div class="win_info_in_twoline"><i class="exam icon-exclam win_confirm_ico win_ico_twoline"></i><h2>题目已答完，确定要交卷吗？</h2><h3>交卷后，您将无法修改本次提交记录</h3></div></div>')
            }
        } else {
            var c = 1;
            var b = $.map(d, function (k) {
                var j = d.length;
                var i = "<span>" + k;
                if (j > c) {
                    i = i + ", </span>"
                } else {
                    i = i + " </span>"
                }
                c++;
                return i
            });
            for (var c in d) {
                var a = d[c];
                $("#sheetSeq" + a).removeClass().addClass("num");
                examCache.setUserAnswerToSave(a)
            }
            $("#undoConfirm").html('<div class="win_hand"><h2>您还有<span class="red">' + f + '</span>道题目未做，确认交卷吗？</h2><h3>交卷后，您将无法修改本次提交记录</h3><p class="undo_question_list"><span>未作答题目：</span>' + b.join("") + "</p></div>")
        }
        $("#submitConfirmWin").show()
    })
}

function submitExam() {
    $("#submitConfirmWin").hide();
    autoSaveLeftTime();
    sendExamFinishRequest(afterCompleteExam)
}

function continueExam() {
    $("#submitConfirmWin").hide()
}

function afterCompleteExam() {
    if (autoSaveStatus == "stop") {
        return
    }
    autoSaveStatus = "stop";
    countdownStatus = "stop";
    autoClosePage = false;
    if (!!imageAnswerTimer) {
        clearTimeout(imageAnswerTimer)
    }
    var a = $("input[name='clientFlag']").val();
    if (a === "isClient") {
        closeWindow()
    } else {
        window.showInfo({
            firstLine: "交卷成功",
            secondLine: "您现在可以安全的关闭页面了",
            icon: "success",
            lineFontSame: false
        }, null, null, function () {
            if (examCache.getSiteCode() == "betace") {
                window.location.href = "/exam/examflow_finishScanUploadAnswer.action?batchId=" + examCache.getBatchId() + "&examRecordId=" + examCache.getExamRecordId()
            } else {
                closeWindow()
            }
        }, true)
    }
}

function closeWindow(a) {
    beforeCloseWindow();
    if (!!a && a > 0) {
        setTimeout(function () {
            closeAndRedirect()
        }, a)
    } else {
        closeAndRedirect()
    }
}

function beforeCloseWindow() {
    autoSaveStatus = "stop";
    countdownStatus = "stop";
    autoClosePage = false;
    if (!!imageAnswerTimer) {
        clearTimeout(imageAnswerTimer)
    }
}

function closeAndRedirect() {
    var i = $("input[name='clientFlag']").val();
    if (i == "isClient") {
        var b = examCache.getExamName();
        var g = examCache.getSerialNumber();
        var a = examCache.getExamRecordId();
        var d = "/client/clientExam_finishExam.action?params.examName=" + b + "&params.serialNumber=" + g + "&params.examRecordId=" + a;
        var f = $("input[name='singleExam']").val();
        if (f === "1") {
            d += "&params.singleExam=" + f
        }
        clientRedirect(d)
    } else {
        try {
            reloadParentPage()
        } catch (h) {}
        var c = window.open("", "_parent", "");
        c.close();
        window.location.href = basePath + "/sso/ssoLogin_goToMainPage.action"
    }
}

function reloadParentPage() {
    if (!!window.opener && !!window.opener.reloadPage) {
        window.opener.reloadPage()
    }
}

function reloadExamPage() {
    exam.async("/exam/examflow_getCurrentTimeFromServer.action", null, function (a) {
        if (exam.isRequestSuccess(a)) {
            showConfirm({
                firstLine: "确定要重新加载题目吗？",
                icon: "warn"
            }, "刷新确认", function (i) {
                if (i == "0") {
                    try {
                        autoSaveLeftTime()
                    } catch (d) {}
                    autoClosePage = false;
                    var c = {};
                    var j = examCache.getBatchId();
                    c.batchId = j;
                    c.examRecordId = examCache.getExamRecordId();
                    var k = $("input[name='clientFlag']").val();
                    var f = false;
                    if ("isClient" == k) {
                        var g = "";
                        var h = $("[name='singleExam']").val();
                        try {
                            g = examClientApi.examServer.getExamServer();
                            if (g != "" && initDomain != "" && initDomain != g) {
                                f = true
                            }
                        } catch (d) {
                            g = "";
                            f = false
                        }
                        var b = "/exam/examflow_index.action?batchId=" + j + "&params.showMask=0";
                        if (h === "1") {
                            b += "&params.singleExam=" + h
                        }
                        if (f) {
                            resetAllAnswers();
                            saveCurrentPageAnswerToCache();
                            saveAnswerToServer(function () {
                                initDomain = g;
                                window.location.href = g + b
                            }, false)
                        } else {
                            try {
                                saveCurrentAnswer(true, true)
                            } catch (d) {}
                            window.location.href = b
                        }
                    } else {
                        try {
                            saveCurrentAnswer(true, true)
                        } catch (d) {}
                        window.location.reload(true)
                    }
                }
            }, 440)
        } else {
            layer.msg("服务器异常，请稍后再试", {
                shift: 2,
                time: "2500"
            })
        }
    }, {
        dataType: "json",
        errorProgress: function () {
            layer.msg("网络异常，请稍后再试", {
                shift: 2,
                time: "2500"
            })
        }
    })
}

function removeSessionIdFromCache() {
    try {
        exam.async("/exam/examflow_removeSessionIdFromCache.action", null, function (b) {}, {
            dataType: "json",
            hideError: true
        })
    } catch (a) {
        log(a.message)
    }
}

function clearUserInExam() {
    try {
        exam.async("/exam/examflow_clearUserInExam.action", null, function (b) {}, {
            dataType: "json",
            hideError: true
        })
    } catch (a) {
        log(a.message)
    }
}

function hideExitConfirm() {
    $("#exitConfirm").hide()
};