import * as allure from "allure-js-commons"
import { Severity } from "allure-js-commons";

it("Test Authentication", async () => {
    await allure.displayName("Test Authentication");
    await allure.displayName("Test Authentication");
    await allure.description(
      "This test attempts to log into the website using a login and a password. Fails if any error happens.\n\nNote that this test does not test 2-Factor Authentication.",
    );
    await allure.owner("John Doe");
    await allure.link("https://dev.example.com/", "Website");
    await allure.issue("AUTH-123");
    await allure.tms("TMS-456");
    // ...
  });

  it("Test Authentication", async () => {
    await allure.epic("Web interface");
    await allure.feature("Essential features");
    await allure.story("Authentication");
    // ...
  });

  it("Test Authentication", async () => {
    await allure.parentSuite("Tests for web interface");
    await allure.suite("Tests for essential features");
    await allure.subSuite("Tests for authentication");
    // ...
  });