describe("Home Screen Tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display the list of posts", () => {
    cy.contains("Posts").should("be.visible");

    // Assuming "Test Post" is a title of one of the posts
    cy.contains("Test Post").should("be.visible");
  });

  it('should display "No posts yet" when there are no posts', () => {
    // To test this scenario, you might need to mock the API response or manipulate the state.
    cy.intercept("GET", "**/posts", { body: [] });
    cy.visit("/"); // Reload the page after mocking

    cy.contains("No posts yet").should("be.visible");
  });

  it("should navigate to post details when a post is clicked", () => {
    cy.contains("Test Post").click(); // Click on a post

    // Check if the post details page is displayed
    cy.contains("Test User").should("be.visible");
    cy.contains("This is a test post body").should("be.visible");
  });
});
