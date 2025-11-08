/**
 * 🧪 Tests Unitarios - Blog API Controllers
 * Pruebas simplificadas y bien documentadas para operaciones CRUD
 */

import { Request, Response } from 'express';

// 🔧 Configuración de Mocks
jest.mock('../db', () => ({
  sequelize: {
    define: jest.fn().mockReturnValue({
      create: jest.fn(),
      update: jest.fn(),
      findByPk: jest.fn(),
      findAll: jest.fn(),
      destroy: jest.fn(),
    }),
  },
  DataTypes: {
    UUID: 'UUID',
    UUIDV4: 'UUIDV4',
    STRING: jest.fn().mockReturnValue('STRING'),
    TEXT: 'TEXT',
    BOOLEAN: 'BOOLEAN',
  },
}));

jest.mock('../model/model');

import {
  createBlogController,
  updateBlogController,
  findBlogController,
  findAllBlogsController,
  deleteBlogController,
} from '../controller/blog.controller.clean';
import BlogModel from '../model/model';

const mockedBlogModel = BlogModel as jest.Mocked<typeof BlogModel>;

// Helpers para crear mocks de Request y Response
const createMockRequest = (params = {}, body = {}, query = {}): any => ({ params, body, query });

const createMockResponse = (): Partial<Response> => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('Blog API - Tests Unitarios', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Operaciones CRUD', () => {
    
    it('CREATE - Debería crear un nuevo blog exitosamente', async () => {
      // 📋 Datos de entrada
      const blogData = {
        title: 'Mi Nuevo Blog',
        description: 'Descripción del blog de prueba',
        category: 'Tecnología',
        published: true
      };

      const expectedBlog = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        ...blogData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Setup del mock
      mockedBlogModel.create.mockResolvedValue(expectedBlog as any);

      const req = createMockRequest({}, blogData);
      const res = createMockResponse();

      // Ejecutar
      await createBlogController(req, res as Response);

      // Verificaciones
      expect(mockedBlogModel.create).toHaveBeenCalledWith(blogData);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        data: { blog: expectedBlog },
      });
    });

    it('🔍 READ - Debería obtener un blog por ID', async () => {
      // Datos de prueba
      const blogId = '123e4567-e89b-12d3-a456-426614174000';
      const expectedBlog = {
        id: blogId,
        title: 'Blog Encontrado',
        description: 'Descripción del blog',
        category: 'DevOps',
        published: true,
      };

      // Setup del mock
      mockedBlogModel.findByPk.mockResolvedValue(expectedBlog as any);

      const req = createMockRequest({ blogId });
      const res = createMockResponse();

      // Ejecutar
      await findBlogController(req, res as Response);

      // Verificaciones
      expect(mockedBlogModel.findByPk).toHaveBeenCalledWith(blogId);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        data: { blog: expectedBlog },
      });
    });

    it('📋LIST - Debería listar todos los blogs', async () => {
      // 📋 Datos de prueba
      const mockBlogs = [
        { id: '1', title: 'Blog Uno', description: 'Primer blog', published: true },
        { id: '2', title: 'Blog Dos', description: 'Segundo blog', published: false }
      ];

      // 🎯 Setup del mock
      mockedBlogModel.findAll.mockResolvedValue(mockBlogs as any);

      const req = createMockRequest({}, {}, { page: 1, limit: 10 });
      const res = createMockResponse();

      // 🚀 Ejecutar
      await findAllBlogsController(req, res as Response);

      // ✅ Verificaciones
      expect(mockedBlogModel.findAll).toHaveBeenCalledWith({
        limit: 10,
        offset: 0,
        order: [['createdAt', 'DESC']]
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        results: 2,
        data: { blogs: mockBlogs },
      });
    });

    it('📝 UPDATE - Debería actualizar un blog existente', async () => {
      // 📋 Datos de prueba
      const blogId = '123e4567-e89b-12d3-a456-426614174000';
      const updateData = {
        title: 'Blog Actualizado',
        description: 'Nueva descripción'
      };

      const updatedBlog = {
        id: blogId,
        ...updateData,
        category: 'Tech',
        published: true,
        updatedAt: new Date(),
      };

      // 🎯 Setup del mock
      mockedBlogModel.update.mockResolvedValue([1] as any);
      mockedBlogModel.findByPk.mockResolvedValue(updatedBlog as any);

      const req = createMockRequest({ blogId }, updateData);
      const res = createMockResponse();

      // 🚀 Ejecutar
      await updateBlogController(req, res as Response);

      // ✅ Verificaciones
      expect(mockedBlogModel.update).toHaveBeenCalled();
      expect(mockedBlogModel.findByPk).toHaveBeenCalledWith(blogId);
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('🗑️ DELETE - Debería eliminar un blog correctamente', async () => {
      // 📋 Datos de prueba
      const blogId = '123e4567-e89b-12d3-a456-426614174000';

      // 🎯 Setup del mock
      mockedBlogModel.destroy.mockResolvedValue(1 as any);

      const req = createMockRequest({ blogId });
      const res = createMockResponse();

      // 🚀 Ejecutar
      await deleteBlogController(req, res as Response);

      // ✅ Verificaciones
      expect(mockedBlogModel.destroy).toHaveBeenCalledWith({
        where: { id: blogId },
        force: true
      });
      expect(res.status).toHaveBeenCalledWith(204);
    });

    it('ERROR - Debería manejar errores de validación', async () => {
      // 📋 Datos de prueba (título duplicado)
      const duplicateError = new Error('El título ya existe');
      duplicateError.name = 'SequelizeUniqueConstraintError';

      // 🎯 Setup del mock
      mockedBlogModel.create.mockRejectedValue(duplicateError);

      const req = createMockRequest({}, {
        title: 'Blog Duplicado',
        description: 'Descripción'
      });
      const res = createMockResponse();

      // 🚀 Ejecutar
      await createBlogController(req, res as Response);

      // ✅ Verificaciones
      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'El título del blog ya existe',
      });
    });
  });
});