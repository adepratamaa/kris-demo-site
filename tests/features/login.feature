Feature: Verify user is able to create and terminated the approval

  Scenario: Create new for approval submission to be terminated by a requester
    Given I navigate to landing page
    When I input user id user_id_1
    And I input password password_1
    And I click on login button
    And I see dashboard page
    And I open submission page
    And I create new approval submission
    And I submit the approval submission
    Then I terminate the approval submission



