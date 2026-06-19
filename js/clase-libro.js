class Libro {
  #isbn; #titulo; #autor; #stock; #precio;

  constructor(isbn, titulo, autor, stock, precio) {
    this.#isbn = isbn.trim();
    this.#titulo = titulo;
    this.#autor = autor;
    this.#stock = parseInt(stock);
    this.#precio = parseFloat(precio);
  }

  getIsbn() { return this.#isbn; }
  getTitulo() { return this.#titulo; }
  getAutor() { return this.#autor; }
  getStock() { return this.#stock; }
  getPrecio() { return this.#precio; }

  actualizarStockYPrecio(nuevoStock, nuevoPrecio) {
    this.#stock = parseInt(nuevoStock);
    this.#precio = parseFloat(nuevoPrecio);
  }
}