const { it } = require("jest-circus")
const ids = require("../../../ids");
const { introduceDelay } = require("../../helpers");

module.exports = homeScreen = async () => {
    const scroller = element(by.id(ids.homeIds.scrollerId));
    await expect(scroller).toExist();
    await scroller.scrollTo('bottom');
    await introduceDelay();
    console.log('[HOME SCREEN TEST PASSED]');
}