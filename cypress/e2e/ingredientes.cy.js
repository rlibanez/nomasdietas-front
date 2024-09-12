describe('IngredientsView', () => {

    beforeEach(() => {
        // Visita la vista de ingredientes antes de cada prueba
        cy.visit('/ingredients');
    });

    it('Verifica que la tabla de ingredientes esté visible', () => {
        cy.get('.ingredients-table').should('be.visible');
    });

    it('Añadir un nuevo ingrediente', () => {
        // Abre el formulario para agregar un ingrediente
        cy.get('button.create-button').click();

        // Completa el formulario
        cy.get('input#nombre').type('Tomate');
        cy.get('input#descripcion').type('Tomate fresco de Cantabria');
        cy.get('input#calorias').type('18');

        // Guarda el nuevo ingrediente
        cy.get('button.save-button').click();

        // Verifica que el ingrediente aparece en la tabla
        cy.get('tbody tr').contains('Tomate');
    });

    it('Editar un ingrediente existente', () => {
        // Selecciona un ingrediente existente (deberás ajustar el texto del ingrediente si es diferente)
        cy.get('tbody tr').contains('Tomate').click();

        // Abre el formulario para editar el ingrediente
        cy.get('button.edit-button').click();

        // Cambia el nombre del ingrediente
        cy.get('input#nombre').clear().type('Tomate Cherry');
        cy.get('button.save-button').click();

        // Verifica que el nombre del ingrediente ha sido actualizado en la tabla
        cy.get('tbody tr').contains('Tomate Cherry');
    });

    it('Eliminar un ingrediente', () => {
        // Selecciona un ingrediente existente (deberás ajustar el texto del ingrediente si es diferente)
        cy.get('tbody tr').contains('Tomate Cherry').click();

        // Abre el modal de eliminación
        cy.get('button.delete-button').click();

        // Confirma la eliminación
        cy.get('button').contains('Sí').click();

        // Verifica que el ingrediente ha sido eliminado de la tabla
        cy.get('tbody tr').should('not.contain', 'Tomate Cherry');
    });
});
