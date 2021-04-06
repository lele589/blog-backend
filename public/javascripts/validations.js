document.addEventListener("DOMContentLoaded", function() {

    const elements = document.querySelectorAll("input, select, textarea");
    
    for (let i = 0; i < elements.length; i++) {
        elements[i].oninvalid = function(e) {
            e.target.setCustomValidity("");
            if (!e.target.validity.valid) {
                let errorMsg;
                switch (e.target.name) {
                    case 'title':
                        errorMsg = 'El campo "Título" es obligatorio';
                        break;
                    case 'category':
                        errorMsg = 'El campo "Categoría" es obligatorio';
                        break;
                    case 'image':
                        errorMsg = 'El campo "Imagen" debe tener formato de url (http://www.url.com)';
                        break;
                    case 'location':
                        errorMsg = 'El campo "Localización" es obligatorio y debe tener formato de url (http://www.url.com)';
                        break;
                    case 'price':
                        errorMsg = 'El campo "Precio" es obligatorio y debe ser un número entre 0.00 y 10000.00';
                        break;
                    case 'description':
                        errorMsg = 'El campo "Descripción" es obligatorio';
                        break;
                    default:
                        errorMsg = 'Ha habido un error';
                  }
                e.target.setCustomValidity(errorMsg);
            }
        };
        elements[i].oninput = function(e) {
            e.target.setCustomValidity("");
        };
    }
});
