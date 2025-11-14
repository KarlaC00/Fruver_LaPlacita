import Venta from '../models/Venta.js';
import Cliente from '../models/Usuario.js';
import Product from '../models/Product.js';


export const createVenta = async (req, res) => {
  try {
    const { id_cliente, productos, metodo_pago } = req.body;


    const cliente = await Cliente.findById(id_cliente);
    if (!cliente) return res.status(404).json({ message: "Cliente no encontrado" });

    let total = 0;
    const detalles = [];

    for (const item of productos) {
      const producto = await Product.findById(item.product_id);
      if (!producto) {
        return res.status(404).json({ message: `Producto con ID ${item.product_id} no encontrado` });
      }

      if (producto.stock < item.cantidad) {
        return res.status(400).json({ message: `Stock insuficiente para ${producto.name}` });
      }

      const subtotal = producto.price * item.cantidad;
      total += subtotal;

      detalles.push({
        product_id: producto._id,
        nombre: producto.name,
        cantidad: item.cantidad,
        precio_unitario: producto.price,
        subtotal
      });

      producto.stock -= item.cantidad;
      await producto.save();
    }

    const newVenta = new Venta({
      id_cliente,
      productos: detalles,
      total,
      metodo_pago
    });

    const ventaSaved = await newVenta.save();
    res.status(201).json(ventaSaved);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear la venta" });
  }
};



export const getVentas = async (req, res) => {
  try {
    const ventas = await Venta.find()
      .populate("id_cliente", "nombre telefono correo")
      .populate("productos.product_id", "name price")
      .sort({ id_venta: -1 });

    res.json(ventas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener las ventas" });
  }
};


export const getVenta = async (req, res) => {
  try {
    const venta = await Venta.findById(req.params.id)
      .populate("id_cliente", "nombre telefono correo")
      .populate("productos.product_id", "name price");

    if (!venta)
      return res.status(404).json({ message: "Venta no encontrada" });

    res.json(venta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener la venta" });
  }
};


export const updateVenta = async (req, res) => {
  try {
    const { productos, metodo_pago } = req.body;

    const venta = await Venta.findById(req.params.id);
    if (!venta) return res.status(404).json({ message: "Venta no encontrada" });


    for (const item of venta.productos) {
      const producto = await Product.findById(item.product_id);
      if (producto) {
        producto.stock += item.cantidad; 
        await producto.save();
      }
    }


    let total = 0;
    const detalles = [];

    for (const item of productos) {
      const producto = await Product.findById(item.product_id);
      if (!producto) {
        return res.status(404).json({ message: `Producto con ID ${item.product_id} no encontrado` });
      }

      if (producto.stock < item.cantidad) {
        return res.status(400).json({ message: `Stock insuficiente para ${producto.name}` });
      }

      const subtotal = producto.price * item.cantidad;
      total += subtotal;

      detalles.push({
        product_id: producto._id,
        nombre: producto.name,
        cantidad: item.cantidad,
        precio_unitario: producto.price,
        subtotal
      });

      producto.stock -= item.cantidad;
      await producto.save();
    }


    venta.productos = detalles;
    venta.total = total;
    if (metodo_pago) venta.metodo_pago = metodo_pago;

    const ventaUpdated = await venta.save();
    res.json(ventaUpdated);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar la venta" });
  }
};



export const deleteVenta = async (req, res) => {
  try {
    const venta = await Venta.findById(req.params.id);
    if (!venta) return res.status(404).json({ message: "Venta no encontrada" });

    // 🔄 Restaurar el stock antes de eliminar
    for (const item of venta.productos) {
      const producto = await Product.findById(item.product_id);
      if (producto) {
        producto.stock += item.cantidad;
        await producto.save();
      }
    }

    await venta.deleteOne();
    res.json({ message: "Venta eliminada correctamente" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar la venta" });
  }
};
