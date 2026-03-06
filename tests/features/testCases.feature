Feature: E-submission module

  Scenario: Create new a for approval submission to be terminated by a requester
    Given the user login with user id "USER_ID_1" and password "PASSWORD_1"
    And the user opens the E-submission module

    When the user creates a new for approval submission
    And fills all mandatory fields with valid data
    And uploads the required documents
    And adds a folder from the recent tab
    And assigns user as the action officer
    And submits the "Submission"

    Then the system should display "Submitted successfully"

    And the submission title should match the entered title
    And the submission should have an ID containing "A23"
    And the submission status should be "Pending Approval"

    When the user "Terminates" the submission with a valid reason
    Then the submission should be "Terminated Successfully"

  Scenario: Terminated a newly created submission
    Given the user login with user id "USER_ID_1" and password "PASSWORD_1"
    And the user opens the E-submission module

    When the user creates a new for approval submission
    And fills all mandatory fields with valid data
    And uploads the required documents
    And adds a folder from the recent tab
    And assigns user as the action officer
    And submits the "Submission"

    Then the system should display "Submitted successfully"

    When the user "Terminates" the submission with a valid reason
    Then the submission should be "Terminated Successfully"

    And the submission should have an ID containing "A23"
    And the submission status should be "Terminated"

    When the user go to Participated > Completed tab
    Then terminated submission is listed there
    And  It has "Terminated" status in the status column

  Scenario: Approve a newly created submission
    Given the user login with user id "USER_ID_1" and password "PASSWORD_1"
    And the user opens the E-submission module

    When the user creates a new for approval submission
    And fills all mandatory fields with valid data
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

    Then terminated submission is listed there
    And  It has "Approved" status in the status column
