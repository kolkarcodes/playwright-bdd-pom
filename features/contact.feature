Feature: User Contact form

  Scenario Outline: Test user is able to add contacts
    Given the user is on the Toolshop page
    When the user click on Contact link
    Then the user should be navigated to the contact page
    When the user fills the contact form with firstname "<firstname>", lastname "<lastname>", email "<email>" and message "<message>"
    And set the subject option from the subject dropdown
    And clicks the send button
    Then the user should be able to see the alert contact message

    Examples:
      | firstname | lastname | email | message |
      | John      | Doe      | john.doe@example.com | This is for testing purpose only. Adding the message.|

