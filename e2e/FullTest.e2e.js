const home = require("./tests/main/home");
const landing = require("./tests/auth/landing");
const tabs = require("./tests/main/tabs");
const appointments = require("./tests/main/appointments");

describe('Example', () => {
  // it("[SHOULD MOVE TO HOME SCREEN]", landing);
  // it("[SHOUDL SCROLL TO BOTTOM]", home);
  // it('[SHOULD MOVE TO ALL TABS IN THE BOTTOM]', tabs);
  it("[SHOULD BOOK AN APPOINTMENT]", appointments);
});