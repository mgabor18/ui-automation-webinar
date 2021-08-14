Feature: EPAM job searching
  As a Job searcher
  I want to browse through EPAM Job offers by various criteria
  So I can find to best fitting offer for me

Scenario Outline: <Tnum>. Search for <PositionName> in <City>
  Given the career page is opened
  When the cookie bar is closed
  Then the logo should be visible
  And the searchform should be visible
  
  When <Country> and <City> selected in the location filter box
  Then the <City> location should be selected

  When <Department> selected in the department filter box
  Then the <Department> department should be selected

  When the search button is clicked
  Then the correct url should be present for the search results page
  And should have a proper job found for <PositionName> on the <NthJob>. position
  And the proper location in the <NthJob>. result should be <Country>
  And description should be visible in the <NthJob>. result
  And apply button should be visible for the <PositionName> position
  
  When the apply button for <PositionName> is clicked
  Then the correct url should be present for the job details page
  And should have <PositionName> position name in the job description
  And should have <Country> country in the job description

  Examples:
    | Country | City     | Department                | PositionName                     | Tnum | NthJob |
    | Hungary | Debrecen | Software Test Engineering | Test Automation Engineer         | 1    | 5      |
    | Belarus | Minsk    | Software Architecture     | DevOps Architect                 | 2    | 1      |