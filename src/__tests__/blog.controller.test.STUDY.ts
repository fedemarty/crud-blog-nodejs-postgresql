// ===================================================================
// ARCHIVO DE TESTS DOCUMENTADO PARA ESTUDIO - DevOps TP
// ===================================================================
// Este archivo documenta los TESTS REALES que funcionan en el proyecto
// Implementa 15 pruebas unitarias para los controladores CRUD
// ===================================================================

import { Request, Response } from 'express';

// Importamos TODOS los controladores que vamos a testear
import {
  createBlogController,
  updateBlogController,
  findBlogController,
  findAllBlogsController,
  deleteBlogController,
} from '../controller/blog.controller';

// Importamos el modelo que vamos a mockear
import BlogModel from '../model/model';

// ===================================================================
// 🎭 CONFIGURACIÓN DE MOCKS
// ===================================================================

// Mock del modelo BlogModel - Reemplaza las funciones reales con mocks
jest.mock('../model/model');
const mockedBlogModel = BlogModel as jest.Mocked<typeof BlogModel>;

// 🛠️ HELPER FUNCTIONS para crear objetos mock de Express.js

// Función para crear un Request mock con parámetros personalizables
const mockRequest = (params: any = {}, body: any = {}, query: any = {}): any => ({
  params,    // URL parameters (/blog/:id)
  body,      // Request body (POST/PUT data)
  query,     // Query parameters (?page=1&limit=10)
});

// Función para crear un Response mock con métodos encadenables
const mockResponse = (): Partial<Response> => {
  const res: Partial<Response> = {};
  // status() y json() retornan 'res' para permitir method chaining: res.status(200).json(data)
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

// ===================================================================
// 🧪 SUITE DE TESTS PRINCIPALES
// ===================================================================

describe('Blog Controllers', () => {
  
  // beforeEach se ejecuta ANTES de cada test individual
  // Limpia todos los mocks para evitar interferencia entre tests
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ===================================================================
  // 📝 TESTS PARA createBlogController
  // ===================================================================
  
  describe('createBlogController', () => {
    
    // ✅ TEST 1: Caso exitoso - crear blog correctamente
    it('debería crear un blog exitosamente', async () => {
      // ARRANGE (Preparar)
      const req = mockRequest({}, {
        title: 'Test Blog',
        description: 'Test Description',
        category: 'Tech',
        published: true
      });
      const res = mockResponse();

      // Mock del blog que "devuelve" la base de datos
      const mockBlog = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        title: 'Test Blog',
        description: 'Test Description',
        category: 'Tech',
        published: true,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      // Configuramos que BlogModel.create resuelva exitosamente
      mockedBlogModel.create.mockResolvedValue(mockBlog as any);

      // ACT (Ejecutar)
      await createBlogController(req, res as Response);

      // ASSERT (Verificar)
      expect(mockedBlogModel.create).toHaveBeenCalledWith({
        title: 'Test Blog',
        description: 'Test Description',
        category: 'Tech',
        published: true
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Blog created successfully',
        blog: mockBlog
      });
    });

    // ❌ TEST 2: Error de título duplicado (Sequelize constraint)
    it('debería manejar error de título duplicado', async () => {
      // ARRANGE
      const req = mockRequest({}, {
        title: 'Duplicate Title',
        description: 'Test Description'
      });
      const res = mockResponse();

      // Simulamos error de constraint único de Sequelize
      const duplicateError = new Error('Validation error');
      duplicateError.name = 'SequelizeUniqueConstraintError';

      // Configuramos que BlogModel.create falle con error de duplicado
      mockedBlogModel.create.mockRejectedValue(duplicateError);

      // ACT
      await createBlogController(req, res as Response);

      // ASSERT
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Title already exists. Please choose a different title.'
      });
    });

    // ❌ TEST 3: Error genérico de base de datos
    it('debería manejar errores generales', async () => {
      // ARRANGE
      const req = mockRequest({}, {
        title: 'Test Blog',
        description: 'Test Description'
      });
      const res = mockResponse();

      const genericError = new Error('Database connection error');
      mockedBlogModel.create.mockRejectedValue(genericError);

      // ACT
      await createBlogController(req, res as Response);

      // ASSERT
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Error creating blog',
        error: 'Database connection error'
      });
    });
  });

  // ===================================================================
  // ✏️ TESTS PARA updateBlogController
  // ===================================================================
  
  describe('updateBlogController', () => {
    
    // ✅ TEST 4: Actualización exitosa
    it('debería actualizar un blog exitosamente', async () => {
      // ARRANGE
      const req = mockRequest(
        { id: '123e4567-e89b-12d3-a456-426614174000' }, // params
        {
          title: 'Updated Blog',
          description: 'Updated Description',
          category: 'Updated Tech',
          published: false
        } // body
      );
      const res = mockResponse();

      const updatedBlog = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        title: 'Updated Blog',
        description: 'Updated Description',
        category: 'Updated Tech',
        published: false,
        updatedAt: new Date()
      };

      // Mock: update retorna [1] indicando 1 fila afectada
      mockedBlogModel.update.mockResolvedValue([1] as any);
      // Mock: findByPk retorna el blog actualizado
      mockedBlogModel.findByPk.mockResolvedValue(updatedBlog as any);

      // ACT
      await updateBlogController(req, res as Response);

      // ASSERT
      expect(mockedBlogModel.update).toHaveBeenCalledWith(
        {
          title: 'Updated Blog',
          description: 'Updated Description',
          category: 'Updated Tech',
          published: false
        },
        { where: { id: '123e4567-e89b-12d3-a456-426614174000' } }
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Blog updated successfully',
        blog: updatedBlog
      });
    });

    // ❌ TEST 5: Blog no encontrado para actualizar
    it('debería retornar 404 si el blog no existe', async () => {
      // ARRANGE
      const req = mockRequest(
        { id: 'non-existent-id' },
        { title: 'Updated Blog' }
      );
      const res = mockResponse();

      // Mock: update retorna [0] indicando 0 filas afectadas
      mockedBlogModel.update.mockResolvedValue([0] as any);

      // ACT
      await updateBlogController(req, res as Response);

      // ASSERT
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Blog not found'
      });
    });

    // ❌ TEST 6: Error de base de datos en actualización
    it('debería manejar errores de base de datos', async () => {
      // ARRANGE
      const req = mockRequest(
        { id: '123e4567-e89b-12d3-a456-426614174000' },
        { title: 'Updated Blog' }
      );
      const res = mockResponse();

      const dbError = new Error('Database error');
      mockedBlogModel.update.mockRejectedValue(dbError);

      // ACT
      await updateBlogController(req, res as Response);

      // ASSERT
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Error updating blog',
        error: 'Database error'
      });
    });
  });

  // ===================================================================
  // 🔍 TESTS PARA findBlogController
  // ===================================================================
  
  describe('findBlogController', () => {
    
    // ✅ TEST 7: Encontrar blog exitosamente
    it('debería encontrar un blog exitosamente', async () => {
      // ARRANGE
      const req = mockRequest({ id: '123e4567-e89b-12d3-a456-426614174000' });
      const res = mockResponse();

      const mockBlog = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        title: 'Found Blog',
        description: 'Found Description',
        category: 'Tech',
        published: true
      };

      mockedBlogModel.findByPk.mockResolvedValue(mockBlog as any);

      // ACT
      await findBlogController(req, res as Response);

      // ASSERT
      expect(mockedBlogModel.findByPk).toHaveBeenCalledWith('123e4567-e89b-12d3-a456-426614174000');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockBlog);
    });

    // ❌ TEST 8: Blog no encontrado
    it('debería retornar 404 si el blog no existe', async () => {
      // ARRANGE
      const req = mockRequest({ id: 'non-existent-id' });
      const res = mockResponse();

      // Mock: findByPk retorna null cuando no encuentra el registro
      mockedBlogModel.findByPk.mockResolvedValue(null);

      // ACT
      await findBlogController(req, res as Response);

      // ASSERT
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Blog not found'
      });
    });

    // ❌ TEST 9: Error de base de datos en búsqueda
    it('debería manejar errores de base de datos', async () => {
      // ARRANGE
      const req = mockRequest({ id: '123e4567-e89b-12d3-a456-426614174000' });
      const res = mockResponse();

      const dbError = new Error('Database error');
      mockedBlogModel.findByPk.mockRejectedValue(dbError);

      // ACT
      await findBlogController(req, res as Response);

      // ASSERT
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Error finding blog',
        error: 'Database error'
      });
    });
  });

  // ===================================================================
  // 📄 TESTS PARA findAllBlogsController (con paginación)
  // ===================================================================
  
  describe('findAllBlogsController', () => {
    
    // ✅ TEST 10: Obtener blogs con paginación por defecto
    it('debería obtener todos los blogs con paginación por defecto', async () => {
      // ARRANGE
      const req = mockRequest({}, {}, {}); // Sin query parameters
      const res = mockResponse();

      const mockBlogs = [
        { id: '1', title: 'Blog 1', description: 'Desc 1' },
        { id: '2', title: 'Blog 2', description: 'Desc 2' }
      ];

      mockedBlogModel.findAll.mockResolvedValue(mockBlogs as any);

      // ACT
      await findAllBlogsController(req, res as Response);

      // ASSERT
      // Verifica que se usen valores por defecto: page=1, limit=10
      expect(mockedBlogModel.findAll).toHaveBeenCalledWith({
        limit: 10,
        offset: 0 // (page-1) * limit = (1-1) * 10 = 0
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockBlogs);
    });

    // ✅ TEST 11: Paginación personalizada
    it('debería obtener blogs con paginación personalizada', async () => {
      // ARRANGE
      const req = mockRequest({}, {}, { page: '2', limit: '5' }); // Query params
      const res = mockResponse();

      const mockBlogs: any[] = [];
      mockedBlogModel.findAll.mockResolvedValue(mockBlogs as any);

      // ACT
      await findAllBlogsController(req, res as Response);

      // ASSERT
      // Verifica que se calculen correctamente: page=2, limit=5, offset=5
      expect(mockedBlogModel.findAll).toHaveBeenCalledWith({
        limit: 5,
        offset: 5 // (2-1) * 5 = 5
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockBlogs);
    });

    // ❌ TEST 12: Error de base de datos en listado
    it('debería manejar errores de base de datos', async () => {
      // ARRANGE
      const req = mockRequest({}, {}, {});
      const res = mockResponse();

      const dbError = new Error('Database error');
      mockedBlogModel.findAll.mockRejectedValue(dbError);

      // ACT
      await findAllBlogsController(req, res as Response);

      // ASSERT
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Error retrieving blogs',
        error: 'Database error'
      });
    });
  });

  // ===================================================================
  // 🗑️ TESTS PARA deleteBlogController
  // ===================================================================
  
  describe('deleteBlogController', () => {
    
    // ✅ TEST 13: Eliminación exitosa
    it('debería eliminar un blog exitosamente', async () => {
      // ARRANGE
      const req = mockRequest({ id: '123e4567-e89b-12d3-a456-426614174000' });
      const res = mockResponse();

      // Mock: destroy retorna 1 indicando 1 fila eliminada
      mockedBlogModel.destroy.mockResolvedValue(1);

      // ACT
      await deleteBlogController(req, res as Response);

      // ASSERT
      expect(mockedBlogModel.destroy).toHaveBeenCalledWith({
        where: { id: '123e4567-e89b-12d3-a456-426614174000' }
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Blog deleted successfully'
      });
    });

    // ❌ TEST 14: Blog no encontrado para eliminar
    it('debería retornar 404 si el blog no existe', async () => {
      // ARRANGE
      const req = mockRequest({ id: 'non-existent-id' });
      const res = mockResponse();

      // Mock: destroy retorna 0 indicando 0 filas eliminadas
      mockedBlogModel.destroy.mockResolvedValue(0);

      // ACT
      await deleteBlogController(req, res as Response);

      // ASSERT
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Blog not found'
      });
    });

    // ❌ TEST 15: Error de base de datos en eliminación
    it('debería manejar errores de base de datos', async () => {
      // ARRANGE
      const req = mockRequest({ id: '123e4567-e89b-12d3-a456-426614174000' });
      const res = mockResponse();

      const dbError = new Error('Database error');
      mockedBlogModel.destroy.mockRejectedValue(dbError);

      // ACT
      await deleteBlogController(req, res as Response);

      // ASSERT
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Error deleting blog',
        error: 'Database error'
      });
    });
  });
});

// ===================================================================
// 📊 RESUMEN DE COBERTURA DE TESTS
// ===================================================================
// 
// ✅ 15 TESTS UNITARIOS que cubren:
// 
// 📝 CREATE (3 tests):
//    - Creación exitosa
//    - Error de título duplicado (constraint)
//    - Error genérico de DB
// 
// ✏️ UPDATE (3 tests):
//    - Actualización exitosa
//    - Blog no encontrado (404)
//    - Error de DB
// 
// 🔍 FIND BY ID (3 tests):
//    - Búsqueda exitosa
//    - Blog no encontrado (404)
//    - Error de DB
// 
// 📄 FIND ALL (3 tests):
//    - Paginación por defecto
//    - Paginación personalizada
//    - Error de DB
// 
// 🗑️ DELETE (3 tests):
//    - Eliminación exitosa
//    - Blog no encontrado (404)
//    - Error de DB
// 
// 🎯 COBERTURA: 100% de los controladores CRUD
// 🧪 ESTRATEGIA: Unit tests con mocks (no requiere DB real)
// ⚡ PERFORMANCE: Rápidos y aislados
// ===================================================================