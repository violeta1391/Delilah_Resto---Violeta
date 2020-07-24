const express = require('express');
const Sequelize = require('sequelize');
const bodyparser = require('body-parser');
const jwt = require('jsonwebtoken');
const sequelize = new Sequelize('mysql://root:@localhost:3306/delilah_resto');


///* SERVIDOR */// 

const server = express();
server.listen(4000, function (request, response) { console.log("Servidor corriendo") });
server.use(bodyparser.json());


///* RUTAS *///

/* PRODUTOS */

// Get productos - Los usuarios pueden consultar los productos disponibles

server.get('/api/productos', esUser, (req, res) => {

    const query = 'SELECT * FROM productos';

    sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT
    })
        .then((response) => {
            res.json(response);
            console.log(response);
        })
        .catch(e => console.error(e).res.status(400).json("No se encuentran productos"));
});

// Post productos 

server.post('/api/productos', esAdmin, (req, res) => {

    const query = 'INSERT INTO productos VALUES (NULL, ?, ?, ?)';
    const { detalle, precio, imagen } = req.body;

    sequelize.query(query, {
        replacements: [detalle, precio, imagen]
    })
        .then((response) => {
            res.json({
                status: 'Producto insertado',
                productos: req.body
            });
        })
        .catch(e => console.error(e).res.status(400).json('No pudo registrarse el nuevo producto')
        );
});

// Get productos por id

server.get('/api/productos/:id', esUser, (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM productos WHERE id = ?';

    sequelize.query(query, {
        replacements: [id],
        type: sequelize.QueryTypes.SELECT
    })
        .then(data => {
            res.json(data);
        })
        .catch(e => console.error(e).res.status(400).json('No se encuentran los productos')
        );
});

// Delete productos por id

server.delete('/api/productos/:id', esAdmin, (req, res) => {

    const id = req.params.id;
    const query = 'DELETE FROM productos WHERE id = ?';

    sequelize.query(query, {
        replacements: [id]
    })
        .then((data) => {
            res.json({ status: 'Producto borrado' });
        })
        .catch(e => console.error(e).res.status(400).json('No pudo realizarse la eliminación del producto')
        );
});

// Patch productos por id

server.patch('/api/productos/:id', esAdmin, (req, res) => {

    const id = req.params.id;
    const detalle = req.body.detalle;
    const precio = req.body.precio;
    const imagen = req.body.imagen;
    const query = `UPDATE productos SET detalle = ?, precio = ?, imagen = ? WHERE id = ?`;

    sequelize.query(query, {
        replacements: [detalle, precio, imagen, id]
    })
        .then((response) => {
            res.json({
                status: 'Se modificó el producto'
            });
        })
        .catch(e => console.error(e).res.status(400).json('No pudo realizarse la actualización del producto')
        );
});


/* USUARIOS */

// Post usuarios - Registro de un nuevo usuario  

server.post("/api/usuarios", async (req, res, next) => {

    const { usuario, nombre_apellido, email, telefono, direccion, pass, admin } = req.body;

    try {
        const existeUsuario = await get_by_param("usuarios", "usuario", usuario);
        const existEmail = await get_by_param("usuarios", "email", email);
        if (existeUsuario) {
            res.status(409).json("Ya existe un usuario con este nombre");
            return;
        }
        if (existEmail) {
            res.status(400).json("Ya existe un usuario con este mail");
            return;
        } else {
            const query = 'INSERT INTO usuarios VALUES (NULL, ?, ?, ?, ?, ?, ?, ?)';
            sequelize.query(query, {
                replacements: [usuario, nombre_apellido, email, telefono, direccion, pass, admin]
            })
            res.json({ status: 'Se ha registrado correctamente' });
        }
    } catch (error) {
		next(new Error(error));
	}
});

async function get_by_param(table, tableParam = "TRUE", inputParam = "TRUE", all = false) {
    const searchResults = await sequelize.query(`SELECT * FROM ${table} WHERE ${tableParam} = :replacementParam`, {
        replacements: { replacementParam: inputParam },
        type: sequelize.QueryTypes.SELECT,
    });
    return !!searchResults.length ? (all ? searchResults : searchResults[0]) : false;
}

// Get usuarios

server.get('/api/usuarios', esAdmin, (req, res) => {

    const query = 'SELECT * FROM usuarios';

    sequelize.query(query, { type: sequelize.QueryTypes.SELECT })
        .then((response) => {
            res.json(response); console.log(response);
        })
        .catch(e => console.error(e).res.status(400).json('No se encuentran los usuarios')
        );
});

// Get usuarios por id 

server.get('/api/usuarios/:id', esAdmin, (req, res) => {

    const id = req.params.id;
    const query = 'SELECT * FROM usuarios WHERE id = ?';

    sequelize.query(query, {
        replacements: [id],
        type: sequelize.QueryTypes.SELECT
    })
        .then(data => {
            res.json(data);
        })
        .catch(e => console.error('No se encuentra el usuario', e).res.status(400).json("No se encuentra el usuario")
        );
});

// Delete usuarios por id 

server.delete('/api/usuarios/:id', esAdmin, (req, res) => {

    const id = req.params.id;
    const myQuery = 'DELETE FROM usuarios WHERE id = ?';

    sequelize.query(myQuery, { replacements: [id] })
        .then((data) => {
            res.json({ status: 'Usuario borrado' });
        })
        .catch(e => console.error(e).res.status(400).json('No pudo eliminarse el usuario')
        );
});

// Patch usuarios por id

server.patch('/api/usuarios/:id', esAdmin, (req, res) => {

    const id = req.params.id;
    const { usuario, nombre_apellido, email, telefono, direccion, pass, admin } = req.body;
    const myQuery = `UPDATE usuarios SET usuario = ?, nombre_apellido = ?, email = ?, telefono = ?, direccion = ?, pass = ?, admin = ? WHERE id = ?`;

    sequelize.query(myQuery, {
        replacements: [usuario, nombre_apellido, email, telefono, direccion, pass, admin, id]
    })
        .then((data) => {
            res.json({ status: 'usuario modificado', usuarios: req.body });
        })
        .catch(e => console.error(e).res.status(400).json('No se modifico usuario')
        );
})


/* PEDIDOS */

// Get api pedidos

server.get('/api/pedidos', esAdmin, (req, res) => {

    const query = 'SELECT * FROM usuarios JOIN pedidos ON pedidos.usuarioID = usuarios.id';

    sequelize.query(query, { type: sequelize.QueryTypes.SELECT })
        .then((data) => {
            return res.json(data)
        })
        .catch(e => console.error(e).res.status(400).json('No se encuentran los pedidos')
        );
})

// Post api pedidos - Los usuarios pueden realizar pedidos 

server.post('/api/pedidos', esUser, (req, res) => {

    const query = 'INSERT INTO pedidos VALUES (NULL, ?, ?, ?, ?, ?, ?)';
    const { estado, hora, descripcion, metodo_pago, usuarioID, total } = req.body;

    sequelize.query(query, { replacements: [estado, hora, descripcion, metodo_pago, usuarioID, total] })
        .then((response) => {
            res.json({ status: 'Pedido agregado', pedidos: req.body });
        })
        .catch(e => console.error(e).res.status(400).json('No pudo realizarse el pedido'));
});

// Get api pedidos por ID

server.get('/api/pedidos/:id', esAdmin, (req, res) => {

    const id = req.params.id;
    const query = 'SELECT * FROM pedidos JOIN usuarios ON pedidos.usuarioID = usuarios.id WHERE pedidos.id = ?';

    sequelize.query(query, { replacements: [id], type: sequelize.QueryTypes.SELECT })
        .then((data) => {
            return res.json(data)
        })
        .catch(e => console.error(e).res.status(400).json('No se encuentra el pedido')
        );
})

//Delete pedidos por ID

server.delete('/api/pedidos/:id', esAdmin, (req, res) => {

    const id = req.params.id;
    const myQuery = 'DELETE FROM pedidos WHERE id = ?';

    sequelize.query(myQuery, { replacements: [id] })
        .then((data) => {
            res.json({ status: 'Pedido borrado' });
        })
        .catch(e => console.error(e).res.status(400).json('No pudo eliminarse el pedido')
        );
});


// Patch pedidos por ID - El administrador puede realizar una actualización del estado del pedido

server.patch('/api/pedidos/:id', esAdmin, (req, res) => {

    const id = req.params.id;
    const { estado, hora, metodo_pago, usuarioID, total } = req.body;
    const myQuery = `UPDATE pedidos SET estado = ?, hora = ?, metodo_pago = ?, usuarioID = ?, total = ? WHERE id = ?`;

    sequelize.query(myQuery, { replacements: [estado, hora, metodo_pago, usuarioID, total, id] })
        .then((data) => {
            res.json({ status: 'Se modificó el pedido' });
        })
        .catch(e => console.error(e).res.status(400).json('No se modifico el pedido')
        );
})


/* DETALLES - Productos por pedido */

// Get api detalles

server.get('/api/detalles', esAdmin, (req, res) => {

    const query = 'SELECT * FROM pedidos JOIN prod_por_pedido ON pedidos.id = prod_por_pedido.ID_PEDIDO JOIN productos ON prod_por_pedido.ID_PRODUCTO = productos.id';

    sequelize.query(query, { type: sequelize.QueryTypes.SELECT })
        .then((data) => {
            return res.json(data)
        })
        .catch(e => console.error(e).res.status(400).json('No se encuentran los detalles')
        );
})

// Post api detalles 

server.post('/api/detalles', esAdmin, (req, res) => {

    const query = 'INSERT INTO prod_por_pedido VALUES (?, ?, ?)';
    const { ID_PRODUCTO, ID_PEDIDO, cantidad_producto } = req.body;

    sequelize.query(query, { replacements: [ID_PRODUCTO, ID_PEDIDO, cantidad_producto] })
        .then((response) => {
            res.json({ status: 'Detalle agregado', detalles: req.body });
        })
        .catch(e => console.error(e).res.status(400).json('No se agregó el detalle'));
});

//  Get api detalles por id 

server.get('/api/detalles/:id', esAdmin, (req, res) => {

    const id = req.params.id;
    const query = 'SELECT * FROM prod_por_pedido WHERE ID_PEDIDO = ?';

    sequelize.query(query, { replacements: [id], type: sequelize.QueryTypes.SELECT })
        .then((data) => {
            return res.json(data)
        })
        .catch(e => console.error(e).res.status(400).json('No se encuentra el detalle')
        );
})

// Delete api detalles por id 

server.delete('/api/detalles/:id', esAdmin, (req, res) => {

    const id = req.params.id;
    const myQuery = 'DELETE FROM prod_por_pedido WHERE ID_PEDIDO = ?';

    sequelize.query(myQuery, { replacements: [id] })
        .then((data) => {
            res.json({ status: 'Pedido borrado' });
        })
        .catch(e => console.error(e).res.status(400).json('No pudo realizarse la eliminación')
        );
});


// Ruta para realizar el loguin 

server.post('/api/usuarios/login', async (req, res) => {
    const { email, pass } = req.body;
    await sequelize
        .query('SELECT * FROM usuarios WHERE email = ? and pass = ?', {
            type: sequelize.QueryTypes.SELECT,
            replacements: [email, pass],
        })
        .then(async (user) => {
            let usuario = user[0]
            if (usuario === undefined) {
                res.status(403).send('Email o contraseña incorrectos');
            } else {
                const token = jwt.sign(usuario, 'secret_key')
                res.status(200).json({ token: token })
            }
        })
})


// Verifica si es un usuario logueado - token 

function esUser(req, res, next) {
    const autorizacion = req.headers['authorization'];
    const token = autorizacion && autorizacion.split(' ')[1];
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, 'secret_key', error => {
        if (error) {
            return res.sendStatus(403).send('No estas registrado');
        } else {
            next()
        }
    })
}


// Verifica si el usuario está logueado y es administrador 

// Es administrador el usuario en el que admin = 1

function esAdmin(req, res, next) {
    const autorizacion = req.headers['authorization'];
    const token = autorizacion && autorizacion.split(' ')[1];
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, 'secret_key', (err, usuario) => {
        if (err) {
            return res.sendStatus(403);
        }
        console.log(usuario)
        sequelize
            .query('SELECT * FROM usuarios WHERE id = ? ', {
                type: sequelize.QueryTypes.SELECT,
                replacements: [usuario.id],
            })
            .then((usuarios) => {
                if (usuarios[0].admin === 1) {
                    next();
                } else {
                    res.status(403).send('No tienes permisos');
                }
            });
    })
}



