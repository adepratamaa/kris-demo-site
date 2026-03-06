Feature: Scenario 2

    Scenario: Terminated a newly created submission
    Given the user login with user id "USER_ID_1" and password "PASSWORD_1"
    And the user opens the E-submission module

    When the user creates a new for approval submission
    And fills the title
    And uploads the required documents
    And adds a folder from the recent tab
    And assigns user as the action officer
    And submits the "Submission"

    Then the system should display "Submitted successfully"

    When the user "Terminates" the submission with a valid reason
    Then the submission should be "Terminated Successfully"
    
    And the submission title should match the entered title
    And the submission should have an ID containing "A23"
    And the submission status should be "Terminated"

    When the user go to Participated > Completed tab
    Then the submission is listed there
    And  It has "Terminated" status in the status column

  