/**
 * 🎯 CONTROLADOR PRINCIPAL - blog.controller.ts
 * 
 * Este archivo contiene toda la lógica de negocio para el CRUD de blogs.
 * Cada función maneja un endpoint específico de la API REST.
 * 
 * 📚 CONCEPTOS QUE VAS A APRENDER:
 * - Controladores en arquitectura MVC
 * - Manejo de Request/Response de Express
 * - Interacción con base de datos usando Sequelize
 * - Manejo de errores robusto
 * - Paginación de resultados
 * - Códigos de estado HTTP apropiados
 */

import { Request, Response } from 'express';
import BlogModel from '../model/model';

/**
 * 📝 CREATE BLOG CONTROLLER
 * 
 * Endpoint: POST /api/blogs
 * Propósito: Crear un nuevo blog en la base de datos
 * 
 * 🔄 Flujo:
 * 1. Recibe datos del body del request
 * 2. Intenta crear el blog en la BD
 * 3. Maneja errores específicos (título duplicado)
 * 4. Retorna respuesta apropiada
 */
export const createBlogController = async (req: Request, res: Response) => {
  try {
    // 📥 Extraer datos del request body
    // Los datos ya fueron validados por el middleware de Zod
    const blogData = req.body;
    
    // 💾 Crear blog en la base de datos
    // Sequelize se encarga de generar el UUID y timestamps
    const newBlog = await BlogModel.create(blogData);
    
    // ✅ Respuesta exitosa con código 201 (Created)
    res.status(201).json({
      status: 'success',
      message: 'Blog creado exitosamente',
      data: newBlog
    });
    
  } catch (error: any) {
    // 🚫 MANEJO DE ERRORES ESPECÍFICOS
    
    // Error de título duplicado (constraint UNIQUE)
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({
        status: 'error',
        message: 'Ya existe un blog con ese título',
        error: 'DUPLICATE_TITLE'
      });
    }
    
    // Error genérico de servidor
    console.error('Error creating blog:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error interno del servidor',
      error: 'INTERNAL_SERVER_ERROR'
    });
  }
};

/**
 * ✏️ UPDATE BLOG CONTROLLER
 * 
 * Endpoint: PUT /api/blogs/:id
 * Propósito: Actualizar un blog existente
 * 
 * 🔄 Flujo:
 * 1. Extrae ID de los parámetros de la URL
 * 2. Intenta actualizar el blog
 * 3. Verifica si se encontró y actualizó el blog
 * 4. Obtiene y retorna el blog actualizado
 */
export const updateBlogController = async (req: Request, res: Response) => {
  try {
    // 🆔 Extraer ID del parámetro de la URL
    const { id } = req.params;
    const updateData = req.body;
    
    // 🔄 Actualizar blog en la BD
    // update() retorna [affectedRows] - array con número de filas afectadas
    const [affectedRows] = await BlogModel.update(updateData, {
      where: { id }
    });
    
    // 🔍 Verificar si se encontró el blog
    if (affectedRows === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Blog no encontrado',
        error: 'BLOG_NOT_FOUND'
      });
    }
    
    // 📖 Obtener el blog actualizado para retornarlo
    const updatedBlog = await BlogModel.findByPk(id);
    
    // ✅ Respuesta exitosa
    res.status(200).json({
      status: 'success',
      message: 'Blog actualizado exitosamente',
      data: updatedBlog
    });
    
  } catch (error: any) {
    console.error('Error updating blog:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error interno del servidor',
      error: 'INTERNAL_SERVER_ERROR'
    });
  }
};

/**
 * 🔍 FIND BLOG BY ID CONTROLLER
 * 
 * Endpoint: GET /api/blogs/:id
 * Propósito: Obtener un blog específico por su ID
 * 
 * 🔄 Flujo:
 * 1. Extrae ID de los parámetros
 * 2. Busca el blog en la BD
 * 3. Verifica si existe
 * 4. Retorna el blog o error 404
 */
export const findBlogController = async (req: Request, res: Response) => {
  try {
    // 🆔 Extraer ID del parámetro
    const { id } = req.params;
    
    // 🔍 Buscar blog por primary key (ID)
    const blog = await BlogModel.findByPk(id);
    
    // ❌ Verificar si el blog existe
    if (!blog) {
      return res.status(404).json({
        status: 'error',
        message: 'Blog no encontrado',
        error: 'BLOG_NOT_FOUND'
      });
    }
    
    // ✅ Retornar blog encontrado
    res.status(200).json({
      status: 'success',
      data: blog
    });
    
  } catch (error: any) {
    console.error('Error finding blog:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error interno del servidor',
      error: 'INTERNAL_SERVER_ERROR'
    });
  }
};

/**
 * 📋 FIND ALL BLOGS CONTROLLER
 * 
 * Endpoint: GET /api/blogs?page=1&limit=10
 * Propósito: Obtener lista paginada de blogs
 * 
 * 🔄 Flujo:
 * 1. Extrae parámetros de paginación del query
 * 2. Calcula offset para la paginación
 * 3. Ejecuta query con límite y offset
 * 4. Retorna blogs con información de paginación
 * 
 * 📊 PAGINACIÓN:
 * - page: Número de página (default: 1)
 * - limit: Elementos por página (default: 10)
 * - offset: Elementos a saltar (calculado)
 */
export const findAllBlogsController = async (req: Request, res: Response) => {
  try {
    // 📄 Extraer parámetros de paginación del query string
    const page = parseInt(req.query.page as string) || 1;      // Default: página 1
    const limit = parseInt(req.query.limit as string) || 10;   // Default: 10 elementos
    
    // 🧮 Calcular offset (elementos a saltar)
    // Ejemplo: página 2 con limit 10 = offset 10
    const offset = (page - 1) * limit;
    
    // 📊 Obtener blogs con paginación
    const blogs = await BlogModel.findAll({
      limit,    // Máximo elementos a retornar
      offset,   // Elementos a saltar
      order: [['createdAt', 'DESC']]  // Ordenar por fecha (más recientes primero)
    });
    
    // 🔢 Contar total de blogs para información de paginación
    const totalBlogs = await BlogModel.count();
    const totalPages = Math.ceil(totalBlogs / limit);
    
    // ✅ Respuesta con datos y metadata de paginación
    res.status(200).json({
      status: 'success',
      data: blogs,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: totalBlogs,
        itemsPerPage: limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });
    
  } catch (error: any) {
    console.error('Error finding blogs:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error interno del servidor',
      error: 'INTERNAL_SERVER_ERROR'
    });
  }
};

/**
 * 🗑️ DELETE BLOG CONTROLLER
 * 
 * Endpoint: DELETE /api/blogs/:id
 * Propósito: Eliminar un blog específico
 * 
 * 🔄 Flujo:
 * 1. Extrae ID de los parámetros
 * 2. Intenta eliminar el blog
 * 3. Verifica si se eliminó algo
 * 4. Retorna confirmación o error 404
 */
export const deleteBlogController = async (req: Request, res: Response) => {
  try {
    // 🆔 Extraer ID del parámetro
    const { id } = req.params;
    
    // 🗑️ Eliminar blog de la BD
    // destroy() retorna el número de filas eliminadas
    const deletedRows = await BlogModel.destroy({
      where: { id }
    });
    
    // ❌ Verificar si se encontró y eliminó el blog
    if (deletedRows === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Blog no encontrado',
        error: 'BLOG_NOT_FOUND'
      });
    }
    
    // ✅ Confirmación de eliminación exitosa
    res.status(200).json({
      status: 'success',
      message: 'Blog eliminado exitosamente'
    });
    
  } catch (error: any) {
    console.error('Error deleting blog:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error interno del servidor',
      error: 'INTERNAL_SERVER_ERROR'
    });
  }
};

/**
 * 🎯 PUNTOS CLAVE PARA ESTUDIAR:
 * 
 * 1. 📱 CÓDIGOS DE ESTADO HTTP:
 *    - 200: OK (lectura/actualización exitosa)
 *    - 201: Created (creación exitosa)
 *    - 404: Not Found (recurso no encontrado)
 *    - 409: Conflict (conflicto como título duplicado)
 *    - 500: Internal Server Error (error del servidor)
 * 
 * 2. 🔄 OPERACIONES SEQUELIZE:
 *    - create(): Crear nuevo registro
 *    - findByPk(): Buscar por primary key
 *    - findAll(): Obtener múltiples registros
 *    - update(): Actualizar registros existentes
 *    - destroy(): Eliminar registros
 *    - count(): Contar registros
 * 
 * 3. 🛡️ MANEJO DE ERRORES:
 *    - Try-catch para capturar errores
 *    - Verificación de tipos de error específicos
 *    - Mensajes de error claros para el cliente
 *    - Logging de errores para debugging
 * 
 * 4. 📊 PAGINACIÓN:
 *    - Parámetros page y limit del query string
 *    - Cálculo de offset
 *    - Metadata de paginación en la respuesta
 * 
 * 5. 🏗️ ESTRUCTURA DE RESPUESTA:
 *    - status: Indica éxito o error
 *    - message: Descripción legible
 *    - data: Datos solicitados
 *    - error: Código de error específico
 */