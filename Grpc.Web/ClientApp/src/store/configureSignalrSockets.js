"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var signalR = require("@aspnet/signalr");
var es6_promise_1 = require("es6-promise");
exports.configureSignalrSockets = function () {
    return new es6_promise_1.Promise(function (resolve) {
        var connection = new signalR.HubConnectionBuilder()
            .withUrl("/hub")
            .build();
        var receive = function (onMessageCb) {
            connection.on("messageReceived", function (message) {
                console.log(message);
                onMessageCb({ type: 'RECEIVE_POINT', point: message });
            });
        };
        connection.start().then(function () { return resolve({ receive: receive }); }).catch(function (err) { return console.log(err); });
    });
};
//# sourceMappingURL=configureSignalrSockets.js.map