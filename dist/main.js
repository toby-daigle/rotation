"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.splitUsernameList = void 0;
const github_1 = require("@actions/github");
const core_1 = require("@actions/core");
function splitUsernameList(text) {
    return text.split(/\s+/).filter((el) => el != '');
}
exports.splitUsernameList = splitUsernameList;
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const members = core_1.getInput('members', { required: true });
            const prNumber = github_1.context.issue.number;
            const usernames = splitUsernameList(members);
            core_1.debug(`Pr Number: ${prNumber}`);
            const nextAssigneeIndex = prNumber % usernames.length;
            const nextAssignee = usernames[nextAssigneeIndex];
            core_1.debug(`Next assignee: ${usernames}`);
            core_1.setOutput('next', nextAssignee);
        }
        catch (e) {
            core_1.error(e);
            core_1.setFailed(e.message);
        }
    });
}
exports.run = run;
run();
