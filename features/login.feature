Feature: User Login

  Scenario Outline: Test login with different credentials
    Given the user is on the login page
    When the user enters credentials with email "<email>" and password "<password>"
    And clicks the login button
    Then the user should be redirected to the my account page

    Examples:
      | email                                 | password  |
      | customer2@practicesoftwaretesting.com | welcome01 |
      | customer3@practicesoftwaretesting.com | pass123   |
      | admin@practicesoftwaretesting.com     | welcome01 |