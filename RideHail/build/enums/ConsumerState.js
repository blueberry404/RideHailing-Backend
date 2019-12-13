"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConsumerState;
(function (ConsumerState) {
    ConsumerState[ConsumerState["IDLE"] = 0] = "IDLE";
    ConsumerState[ConsumerState["FINDING_RIDE"] = 1] = "FINDING_RIDE";
    ConsumerState[ConsumerState["WAIT_FOR_RIDE"] = 2] = "WAIT_FOR_RIDE";
    ConsumerState[ConsumerState["IN_RIDE"] = 3] = "IN_RIDE";
})(ConsumerState = exports.ConsumerState || (exports.ConsumerState = {}));
