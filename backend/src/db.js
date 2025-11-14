import mongoose from 'mongoose'

export const connectDB = async()=> {
  try {
    mongoose.connection.on("connected", () => {
      console.log("🔥 Conectado a Mongo Atlas en DB:", mongoose.connection.name);
    });

    mongoose.connection.on("error", (err) => {
      console.error("❌ Error de conexión:", err);
    });

    await mongoose.connect(
  "mongodb+srv://laplacita2345dbUser:hUxSL6UmFXyB7PUR@fruver.tihasbp.mongodb.net/fruver?retryWrites=true&w=majority"
);
    console.log("✅ DB connected");

  } catch(error) {
    console.log("❌ Error en connectDB:", error);
  }
}