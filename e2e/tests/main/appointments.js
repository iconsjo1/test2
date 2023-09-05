const ids = require("../../../ids");
const { introduceDelay } = require("../../helpers");

module.exports = async () => {
    // TEST STARTS AT THE FIRST SCREEN OF THE APP, MOVE TO APPOITNMENTS TAB
    await (element(by.id(ids.bottomTabIds.appointments))).tap();


    // SPECIALITY SELECT TEST
    await runSearchTest(ids.selectSpeciality);
    const urology = element(by.id(ids.selectSpeciality.urology));
    await expect(urology).toExist();
    await urology.tap();
    console.log("[AT THIS POINT YOU SHOULD MOVE TO THE NEXT SCREEN]");


    // SELECT DOCTOR TO APPOINT TEST
    await runSearchTest(ids.selectDoc);
    await (element(by.id(ids.selectDoc.docCode))).tap();
    console.log('[AT THIS POINT, A REQUEST SHOULD BE GONE TO FETCH DATES]');
    await runDateTests();
    await pickRandomTimeForAppointment();
    await introduceDelay();
    console.log('[AT THIS POINT, YOU SHOULD BE AT THE BOOK APPOINTMENT SCREEN]');

    // BOOK APPOINTMENT SCREEN TEST
    await (element(by.id(ids.bookAppointment.nameField))).clearText();
    await (element(by.id(ids.bookAppointment.numberField))).clearText();
    await (element(by.id(ids.bookAppointment.nameField))).typeText("Muhammad Ali");
    await device.pressBack();
    await (element(by.id(ids.bookAppointment.numberField))).typeText("0535353404");
    await (element(by.id(ids.bookAppointment.numberField))).tapReturnKey();
    await (element(by.id(ids.bookAppointment.mainContainer))).scroll(100, 'down');
    await introduceDelay();
    await (element(by.id(ids.bookAppointment.confirmButton))).tap();
    console.log('[AT THIS POINT, A MODAL SHOULD SHOW UP]');
    await introduceDelay();
    await (element(by.id(ids.bookAppointment.returnHome))).tap();
    await (element(by.id(ids.bookAppointment.later))).tap();
    await introduceDelay(3000);
}

const pickRandomTimeForAppointment = async () => {
    let i = 100;
    let testTime;

    while (true) {
        try {
            testTime = ids.selectDoc.timePrecessor + parseInt(Math.random() * i);
            await (element(by.id(testTime))).tap();
            break;
        } catch (e) {
            console.log('[COULD NOT GET AN ELEMENT WITH ID]', testTime);
        }
    }
    return;
}

const runSearchTest = async (refObj) => {
    const scrollUpToDown = async () => {
        await element(by.id(refObj.scrollContianer)).scrollTo('bottom');
        await element(by.id(refObj.scrollContianer)).scrollTo('top');
        return;
    }
    await scrollUpToDown();
    await element(by.id(refObj.searchField)).typeText("OR");
    await element(by.id(refObj.searchField)).tapReturnKey();
    await scrollUpToDown();
    await element(by.id(refObj.searchField)).clearText();
    await element(by.id(refObj.searchField)).typeText("DE");
    await element(by.id(refObj.searchField)).tapReturnKey();
    await scrollUpToDown();
    await element(by.id(refObj.searchField)).clearText();
    await element(by.id(refObj.searchField)).tapReturnKey();
    return;
}

const runDateTests = async () => {
    await expect(element(by.id(ids.selectDoc.schedulesContainer))).toBeVisible();
    await (element(by.id(ids.selectDoc.nextMonth))).tap();
    await (element(by.id(ids.selectDoc.nextDay))).tap();
    const testDateId = ids.selectDoc.testDate;
    while (true) {
        try {
            await element(by.id(testDateId)).tap();
            break;
        } catch (e) {
            await (element(by.id(ids.selectDoc.dateScrollList))).scroll(100, 'right');
        }
    }
    await (element(by.id(ids.selectDoc.prevDay))).tap();
    await (element(by.id(ids.selectDoc.prevMonth))).tap();
    return;
}