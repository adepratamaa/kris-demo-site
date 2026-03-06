Feature: Scenario 3

    Scenario: Approve a newly created submission
    Given the user login with user id "USER_ID_1" and password "PASSWORD_1"
    And the user opens the E-submission module

    When the user creates a new for approval submission
    And fills the title
    And uploads the required documents
    And adds a folder from the recent tab
    And assigns user as the action officer
    And submits the "Submission"

    Then the system should display "Submitted successfully"

    When the user logout
    Then the user should on login page

    Given the user login with user id "USER_ID_2" and password "PASSWORD_2"
    And the user opens the E-submission module

    When the user selects the submission created earlier
    And clicks the "Approve" button
    When the user "Approves" the submission with a valid reason
    And submits the "Approval"

    Then the system should display "Approved Successfully."
    And the submission should have an ID containing "A23"
    And the submission status should be "Approved"

    When the user go to Participated > Completed tab

    Then the submission is listed there
    And  It has "Approved" status in the status column