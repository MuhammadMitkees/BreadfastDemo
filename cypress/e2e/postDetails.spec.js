describe("Post Details Screen Tests", () => {
  beforeEach(() => {
    // Navigate directly to the post details page
    cy.visit("/postdetails/1"); // Assuming this is the correct URL pattern
  });

  it("should display the post details", () => {
    cy.contains("Test User").should("be.visible");
    cy.contains("Test Post").should("be.visible");
    cy.contains("This is a test post body").should("be.visible");
  });

  it('should display "No comments yet" when there are no comments', () => {
    // Mock the API response to return no comments
    cy.intercept("GET", "**/comments", { body: [] });
    cy.visit("/postdetails/1"); // Reload the page after mocking

    cy.contains("No comments yet").should("be.visible");
  });

  it("should display comments correctly", () => {
    // Assuming "Sample Comment" is the body of a comment
    cy.contains("Sample Comment").should("be.visible");
  });
});
