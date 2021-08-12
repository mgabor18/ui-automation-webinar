Feature: EPAM job searching
  As a Job searcher
  I want to browser through EPAM Job offers by various criteria
  So I can find to best fitting offer for me

Scenario Outline: Search for <PositionName> in <City>
  Given the career page is opened
  Then the cookie bar should be closed
  And the logo should be visible
  And the searchform should be visible
  
  When <Country> and <City> selected in the location filter box
  Then the <City> location should be selected

  When <Department> selected in the department filter box
  Then the <Department> department should be selected

  When the search button is clicked
  Then should have a proper job found for <PositionName> position
  And the proper location in the first result should be <Country>
  And description should be visible in the first result
  And apply button should be visible for <PositionName> position
  
  When the apply button for <PositionName> is clicked
  Then should have <PositionName> position name in the job description
  And should have <Country> country in the job description
  
  Examples:
    | Country | City     | Department                | PositionName                     |
    | Hungary | Debrecen | Software Test Engineering | Lead Test Automation Engineer    |
    | Belarus | Minsk    | Software Architecture     | DevOps Architect                 |