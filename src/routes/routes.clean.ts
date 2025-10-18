/**
 * 🛣️ Blog Routes - Definición de Endpoints API
 * Configuración de rutas REST para operaciones CRUD de blogs
 */

import express from "express";
import { validate } from "../middleware/validate";
import { 
    createBlogController, 
    deleteBlogController, 
    findAllBlogsController, 
    findBlogController, 
    updateBlogController 
} from "../controller/blog.controller.clean";
import { createBlogSchema, updateBlogSchema } from "../controller/blog.schema";

const router = express.Router();

/**
 * 📋 Rutas para /api/blogs/
 * GET    /api/blogs/          - Listar todos los blogs
 * POST   /api/blogs/          - Crear un nuevo blog
 */
router
    .route("/")
    .get(findAllBlogsController)                          // 📋 LIST - Obtener todos los blogs
    .post(validate(createBlogSchema), createBlogController); // ✅ CREATE - Crear nuevo blog

/**
 * 🔍 Rutas para /api/blogs/:blogId
 * GET    /api/blogs/:blogId   - Obtener blog específico
 * PATCH  /api/blogs/:blogId   - Actualizar blog existente  
 * DELETE /api/blogs/:blogId   - Eliminar blog
 */
router
    .route("/:blogId")
    .get(findBlogController)                              // 🔍 READ - Obtener blog por ID
    .patch(validate(updateBlogSchema), updateBlogController) // 📝 UPDATE - Actualizar blog
    .delete(deleteBlogController);                        // 🗑️ DELETE - Eliminar blog

export default router;