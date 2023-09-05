const ids = require("../../../ids");
const { introduceDelay } = require("../../helpers");

const testIDs = [
    ids.bottomTabIds.home,
    ids.bottomTabIds.appointments,
    ids.bottomTabIds.udh_live,
    ids.bottomTabIds.reports,
    ids.bottomTabIds.invoice_1,
    ids.bottomTabIds.menu,
]
module.exports = async () => {
    for (let i = 0; i < testIDs.length; i++) {
        const tabButton = element(by.id(testIDs[i]));
        await tabButton.tap();
        await introduceDelay();
    }
    console.log('[ALL BUTTONS PRESSED. YOU SHOULD BE ON THE LAST TAB NOW]');
}