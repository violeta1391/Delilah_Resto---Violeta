
-- Creación de tablas 

-- Usuarios

CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario VARCHAR(60) NOT NULL,
    nombre_apellido VARCHAR (60) NOT NULL,
    email VARCHAR (60) NOT NULL,
    telefono BIGINT(11) NOT NULL,
    direccion VARCHAR(200) NOT NULL,
    pass VARCHAR(100) NOT NULL,
    admin INT(11) NOT NULL
);

-- Productos

CREATE TABLE productos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    detalle VARCHAR(60),
    precio INT NOT NULL,
    imagen VARCHAR(100)
);

-- Pedidos  AGREGAR DESCRIPCION / CAMBIAR LAS RUTAS 

CREATE TABLE pedidos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    estado VARCHAR(60) NOT NULL,
    hora DATETIME NOT NULL,
    descripcion VARCHAR(150) NOT NULL,
    metodo_pago VARCHAR(100) NOT NULL,
    usuarioID INT NOT NULL,    
    total INT NOT NULL,
    FOREIGN KEY(usuarioID) REFERENCES usuarios(id) --revisar si no funciona por eso 
);

-- Productos por pedidos 

CREATE TABLE prod_por_pedido (
ID_PRODUCTO INT(11) NOT NULL,
ID_PEDIDO INT(11) NOT NULL,
cantidad_producto INT NOT NULL,
FOREIGN KEY (ID_PRODUCTO) REFERENCES productos(id),
FOREIGN KEY (ID_PEDIDO) REFERENCES pedidos(id)
);


-- Insercción de datos 

-- Usuarios --

INSERT INTO usuarios
VALUES (NULL, 'usuario1', 'Violeta Rodriguez', 'vio.ayelen@gmail.com', 3513904127, 'alberdi', 'pass123', 1);

INSERT INTO usuarios
VALUES (NULL, 'usuario2', 'Mica Asato', 'mica@gmail.com', 3513902020, '27 de abril', 'pass1234', 0);

INSERT INTO usuarios
VALUES (NULL, 'usuario3', 'romina dias', 'ro@gmail.com', 3513904455, 'la plata', 'ro1234', 0);


-- Productos -- 

INSERT INTO productos
VALUES (NULL, 'Hamburguesa', '250', 'url.a');

INSERT INTO productos
VALUES (NULL, 'Pizza', '400', 'url.b');

INSERT INTO productos
VALUES (NULL, 'Papas', '100', 'url.c');

INSERT INTO productos
VALUES (NULL, 'Tarta', '500', 'url.d');


-- Pedidos --  

-- id pedido: 1, estado: nuevo, hora: 2020-06-25 21:46:36, descripcion: pizza, pago: efectivo, id usuario: 3, total: 400

INSERT INTO pedidos
VALUES (NULL, 'Nuevo', '2020-06-25 21:46:36', 'Pizza', 'Efectivo', 3, 400); 

INSERT INTO pedidos
VALUES (NULL, 'Nuevo', '2020-06-25 22:00:00', 'Tarta', 'Tarjeta', 2, 500); 


-- Productos por pedidos --

-- id de producto: 2, id de pedido: 1, cantidad: 1

INSERT INTO prod_por_pedido
VALUES (2, 1, 1); 

INSERT INTO prod_por_pedido
VALUES (4, 2, 1);