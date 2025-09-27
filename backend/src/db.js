import mongoose from 'mongoose'

export const connectDB = async()=> {
  try {
    // 👇 Pon los listeners primero
    mongoose.connection.on("connected", () => {
      console.log("🔥 Conectado a Mongo Atlas en DB:", mongoose.connection.name);
    });

    mongoose.connection.on("error", (err) => {
      console.error("❌ Error de conexión:", err);
    });

    // 👇 Luego haz la conexión
    await mongoose.connect(
      "mongodb+srv://laplacita2345dbUser:hUxSL6UmFXyB7PUR@fruver.tihasbp.mongodb.net/fruver?retryWrites=true&w=majority&appName=fruver"
    );
    console.log("✅ DB connected");

  } catch(error) {
    console.log("❌ Error en connectDB:", error);
  }
}
