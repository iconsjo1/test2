const ids = require("../../../ids");
const { introduceDelay } = require("../../helpers");

module.exports = async () => {
    const continueButton = element(by.id(ids.landingIds.continue));
    await expect(continueButton).toExist();
    await continueButton.tap();
    await continueButton.tap();
    await continueButton.tap();
    await continueButton.tap();
    await introduceDelay();

    console.log('[LANDING SCREEN TEST PASSED]');
}

