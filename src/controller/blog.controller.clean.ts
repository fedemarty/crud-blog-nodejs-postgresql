/**
 * 🚀 Blog API Controllers - Operaciones CRUD
 * Controladores principales para la gestión de blogs
 * Incluye: CREATE, READ, UPDATE, DELETE y LIST
 */

import { Request, Response } from "express";
import BlogModel from "../model/model";
import {
    CreateBlogInput, 
    FilterQueryInput, 
    ParamsInput, 
    UpdateBlogInput
} from "./blog.schema";

// ✅ CREATE - Crear un nuevo blog
export const createBlogController = async (
    req: Request<{}, {}, CreateBlogInput>,
    res: Response
) => {
    try {
        // 📋 Extraer datos del request
        const { title, description, category, published } = req.body;

        // 🚀 Crear blog en la base de datos
        const blog = await BlogModel.create({
            title, 
            description, 
            category, 
            published,
        });

        // ✅ Respuesta exitosa
        res.status(201).json({
            status: "success",
            data: { blog },
        });

    } catch (error: any) {
        // ❌ Manejo de errores específicos
        if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(409).json({
                status: "error",
                message: "El título del blog ya existe",
            });
        }

        // ❌ Error genérico
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};

// 🔍 READ - Obtener un blog por ID
export const findBlogController = async (
    req: Request<ParamsInput>,
    res: Response
) => {
    try {
        // 📋 Obtener ID del parámetro
        const { blogId } = req.params;

        // 🔍 Buscar blog en la base de datos
        const blog = await BlogModel.findByPk(blogId);

        // ❌ Blog no encontrado
        if (!blog) {
            return res.status(404).json({
                status: "fail",
                message: "Blog no encontrado",
            });
        }

        // ✅ Blog encontrado
        res.status(200).json({
            status: "success",
            data: { blog },
        });

    } catch (error: any) {
        // ❌ Error del servidor
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};

// 📋 LIST - Obtener todos los blogs con paginación
export const findAllBlogsController = async (
    req: Request<{}, {}, {}, FilterQueryInput>,
    res: Response
) => {
    try {
        // 📋 Parámetros de paginación
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const offset = (page - 1) * limit;

        // 🔍 Buscar blogs con paginación
        const blogs = await BlogModel.findAll({ 
            limit, 
            offset,
            order: [['createdAt', 'DESC']]
        });

        // ✅ Respuesta con resultados
        res.status(200).json({
            status: "success",
            results: blogs.length,
            data: { blogs },
        });

    } catch (error: any) {
        // ❌ Error del servidor
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};

// 📝 UPDATE - Actualizar un blog existente
export const updateBlogController = async (
    req: Request<UpdateBlogInput["params"], {}, UpdateBlogInput["body"]>,
    res: Response
) => {
    try {
        // 📋 Obtener datos del request
        const { blogId } = req.params;
        const updateData = { ...req.body, updatedAt: Date.now() };

        // 🔄 Actualizar blog en la base de datos
        const [affectedRows] = await BlogModel.update(updateData, {
            where: { id: blogId }
        });

        // ❌ Blog no encontrado
        if (affectedRows === 0) {
            return res.status(404).json({
                status: "fail",
                message: "Blog no encontrado",
            });
        }

        // 🔍 Obtener blog actualizado
        const updatedBlog = await BlogModel.findByPk(blogId);

        // ✅ Respuesta exitosa
        res.status(200).json({
            status: "success",
            data: { blog: updatedBlog },
        });

    } catch (error: any) {
        // ❌ Error del servidor
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};

// 🗑️ DELETE - Eliminar un blog
export const deleteBlogController = async (
    req: Request<ParamsInput>,
    res: Response
) => {
    try {
        // 📋 Obtener ID del parámetro
        const { blogId } = req.params;

        // 🗑️ Eliminar blog de la base de datos
        const deletedRows = await BlogModel.destroy({
            where: { id: blogId },
            force: true,
        });

        // ❌ Blog no encontrado
        if (deletedRows === 0) {
            return res.status(404).json({
                status: "fail",
                message: "Blog no encontrado",
            });
        }

        // ✅ Eliminación exitosa (204 No Content)
        res.status(204).json();

    } catch (error: any) {
        // ❌ Error del servidor
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};