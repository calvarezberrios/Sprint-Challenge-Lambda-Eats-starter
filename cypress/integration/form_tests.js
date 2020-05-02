describe("Tests the form", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/pizza");
    });
    
    it("Enters my name on the name input", () => {
        cy.get("[data-cy='name']").type("Mannie").should("have.value", "Mannie");
    });

    it("Selects multiple toppings", () => {
        cy.get("#pepperoni").check().should("be.checked");
        cy.get("#extraCheese").check().should("be.checked");
    })

    it("Submits the form", () => {
        cy.get("[data-cy='name']").type("Mannie").should("have.value", "Mannie");
        cy.get("#size").select("Large (14\")");
        cy.get(':nth-child(1) > .form-check-input').check().should("be.checked");
        cy.get(".btn").click();
    })
})