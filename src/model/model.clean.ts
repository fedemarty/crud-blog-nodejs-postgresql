/**
 * 🗄️ Blog Model - Definición del Modelo de Datos
 * Modelo Sequelize para la entidad Blog con PostgreSQL
 */

import { sequelize, DataTypes } from "../db";

/**
 * 📋 Modelo de Blog. 
 * Campos: ID, Título, Descripción, Categoría, Estado de Publicación, Fechas
 */
const BlogModel = sequelize.define("blogs", {
    // 🔑 ID único del blog (UUID)
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        comment: "Identificador único del blog"
    },

    // 📝 Título del blog (requerido y único)
    title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        comment: "Título del blog - debe ser único"
    },

    // 📄 Descripción detallada del blog
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: "Contenido principal del blog"
    },

    // 🏷️ Categoría del blog (opcional)
    category: {
        type: DataTypes.STRING(50),
        allowNull: true,
        comment: "Categoría para clasificar el blog"
    },

    // 🚀 Estado de publicación
    published: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
        comment: "Indica si el blog está publicado"
    },

    // 📅 Fecha de creación
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
        comment: "Fecha y hora de creación"
    },

    // 🔄 Fecha de última actualización
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
        comment: "Fecha y hora de última modificación"
    },
});

export default BlogModel;