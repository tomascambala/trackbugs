Feature: Bug Tracking

    Scenario: Fetching all issues
        Given there are issues in the system
        When I fetch all issues
        Then I should see a list of issues

    Scenario: Creating a new issue
        Given I have a bug description "Page crashes on load" and a log link "http://example.com/log"
        When I create the issue
        Then the issue should appear in the list of issues