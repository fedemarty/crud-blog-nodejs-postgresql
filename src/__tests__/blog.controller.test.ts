import { Request, Response } from 'express';
import {
  createBlogController,
  updateBlogController,
  findBlogController,
  findAllBlogsController,
  deleteBlogController,
} from '../controller/blog.controller';
import BlogModel from '../model/model';

// Mock del modelo BlogModel
jest.mock('../model/model');
const mockedBlogModel = BlogModel as jest.Mocked<typeof BlogModel>;

// Helper para crear mock de Request y Response
const mockRequest = (params: any = {}, body: any = {}, query: any = {}): any => ({
  params,
  body,
  query,
});

const mockResponse = (): Partial<Response> => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('Blog Controllers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createBlogController', () => {
    it('debería crear un blog exitosamente', async () => {
      // Arrange
      const req = mockRequest({}, {
        title: 'Test Blog',
        description: 'Test Description',
        category: 'Tech',
        published: true,
      });
      const res = mockResponse();

      const mockBlog = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        title: 'Test Blog',
        description: 'Test Description',
        category: 'Tech',
        published: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockedBlogModel.create.mockResolvedValue(mockBlog as any);

      // Act
      await createBlogController(req, res as Response);

      // Assert
      expect(mockedBlogModel.create).toHaveBeenCalledWith({
        title: 'Test Blog',
        description: 'Test Description',
        category: 'Tech',
        published: true,
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        data: {
          blog: mockBlog,
        },
      });
    });

    it('debería manejar error de título duplicado', async () => {
      // Arrange
      const req = mockRequest({}, {
        title: 'Duplicate Blog',
        description: 'Test Description',
      });
      const res = mockResponse();

      const duplicateError = new Error('Duplicate entry');
      duplicateError.name = 'SequelizeUniqueConstraintError';

      mockedBlogModel.create.mockRejectedValue(duplicateError);

      // Act
      await createBlogController(req, res as Response);

      // Assert
      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Duplicate entry',
      });
    });

    it('debería manejar errores generales', async () => {
      // Arrange
      const req = mockRequest({}, {
        title: 'Test Blog',
        description: 'Test Description',
      });
      const res = mockResponse();

      const genericError = new Error('Database connection error');
      mockedBlogModel.create.mockRejectedValue(genericError);

      // Act
      await createBlogController(req, res as Response);

      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Database connection error',
      });
    });
  });

  describe('updateBlogController', () => {
    it('debería actualizar un blog exitosamente', async () => {
      // Arrange
      const blogId = '123e4567-e89b-12d3-a456-426614174000';
      const req = mockRequest(
        { blogId },
        { title: 'Updated Blog', description: 'Updated Description' }
      );
      const res = mockResponse();

      const updatedBlog = {
        id: blogId,
        title: 'Updated Blog',
        description: 'Updated Description',
        category: 'Tech',
        published: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockedBlogModel.update.mockResolvedValue([1] as any);
      mockedBlogModel.findByPk.mockResolvedValue(updatedBlog as any);

      // Act
      await updateBlogController(req, res as Response);

      // Assert
      expect(mockedBlogModel.update).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Updated Blog',
          description: 'Updated Description',
          updatedAt: expect.any(Number),
        }),
        { where: { id: blogId } }
      );
      expect(mockedBlogModel.findByPk).toHaveBeenCalledWith(blogId);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        data: {
          blog: updatedBlog,
        },
      });
    });

    it('debería retornar 404 si el blog no existe', async () => {
      // Arrange
      const blogId = '123e4567-e89b-12d3-a456-426614174000';
      const req = mockRequest(
        { blogId },
        { title: 'Updated Blog' }
      );
      const res = mockResponse();

      mockedBlogModel.update.mockResolvedValue([0] as any);

      // Act
      await updateBlogController(req, res as Response);

      // Assert
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        status: 'fail',
        message: 'Blog not found',
      });
    });

    it('debería manejar errores de base de datos', async () => {
      // Arrange
      const blogId = '123e4567-e89b-12d3-a456-426614174000';
      const req = mockRequest(
        { blogId },
        { title: 'Updated Blog' }
      );
      const res = mockResponse();

      const dbError = new Error('Database error');
      mockedBlogModel.update.mockRejectedValue(dbError);

      // Act
      await updateBlogController(req, res as Response);

      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Database error',
      });
    });
  });

  describe('findBlogController', () => {
    it('debería encontrar un blog exitosamente', async () => {
      // Arrange
      const blogId = '123e4567-e89b-12d3-a456-426614174000';
      const req = mockRequest({ blogId });
      const res = mockResponse();

      const mockBlog = {
        id: blogId,
        title: 'Test Blog',
        description: 'Test Description',
        category: 'Tech',
        published: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockedBlogModel.findByPk.mockResolvedValue(mockBlog as any);

      // Act
      await findBlogController(req, res as Response);

      // Assert
      expect(mockedBlogModel.findByPk).toHaveBeenCalledWith(blogId);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        data: {
          blog: mockBlog,
        },
      });
    });

    it('debería retornar 404 si el blog no existe', async () => {
      // Arrange
      const blogId = '123e4567-e89b-12d3-a456-426614174000';
      const req = mockRequest({ blogId });
      const res = mockResponse();

      mockedBlogModel.findByPk.mockResolvedValue(null);

      // Act
      await findBlogController(req, res as Response);

      // Assert
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        status: 'fail',
        message: 'Blog not found',
      });
    });

    it('debería manejar errores de base de datos', async () => {
      // Arrange
      const blogId = '123e4567-e89b-12d3-a456-426614174000';
      const req = mockRequest({ blogId });
      const res = mockResponse();

      const dbError = new Error('Database error');
      mockedBlogModel.findByPk.mockRejectedValue(dbError);

      // Act
      await findBlogController(req, res as Response);

      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Database error',
      });
    });
  });

  describe('findAllBlogsController', () => {
    it('debería obtener todos los blogs con paginación por defecto', async () => {
      // Arrange
      const req = mockRequest({}, {}, {});
      const res = mockResponse();

      const mockBlogs = [
        {
          id: '123e4567-e89b-12d3-a456-426614174000',
          title: 'Blog 1',
          description: 'Description 1',
          category: 'Tech',
          published: true,
        },
        {
          id: '123e4567-e89b-12d3-a456-426614174001',
          title: 'Blog 2',
          description: 'Description 2',
          category: 'Science',
          published: false,
        },
      ];

      mockedBlogModel.findAll.mockResolvedValue(mockBlogs as any);

      // Act
      await findAllBlogsController(req, res as Response);

      // Assert
      expect(mockedBlogModel.findAll).toHaveBeenCalledWith({
        limit: 10,
        offset: 0,
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        results: 2,
        blogs: mockBlogs,
      });
    });

    it('debería obtener blogs con paginación personalizada', async () => {
      // Arrange
      const req = mockRequest({}, {}, { page: 2, limit: 5 });
      const res = mockResponse();

      const mockBlogs: any[] = [];
      mockedBlogModel.findAll.mockResolvedValue(mockBlogs as any);

      // Act
      await findAllBlogsController(req, res as Response);

      // Assert
      expect(mockedBlogModel.findAll).toHaveBeenCalledWith({
        limit: 5,
        offset: 5,
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        results: 0,
        blogs: mockBlogs,
      });
    });

    it('debería manejar errores de base de datos', async () => {
      // Arrange
      const req = mockRequest({}, {}, {});
      const res = mockResponse();

      const dbError = new Error('Database error');
      mockedBlogModel.findAll.mockRejectedValue(dbError);

      // Act
      await findAllBlogsController(req, res as Response);

      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Database error',
      });
    });
  });

  describe('deleteBlogController', () => {
    it('debería eliminar un blog exitosamente', async () => {
      // Arrange
      const blogId = '123e4567-e89b-12d3-a456-426614174000';
      const req = mockRequest({ blogId });
      const res = mockResponse();

      mockedBlogModel.destroy.mockResolvedValue(1);

      // Act
      await deleteBlogController(req, res as Response);

      // Assert
      expect(mockedBlogModel.destroy).toHaveBeenCalledWith({
        where: { id: blogId },
        force: true,
      });
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.json).toHaveBeenCalledWith();
    });

    it('debería retornar 404 si el blog no existe', async () => {
      // Arrange
      const blogId = '123e4567-e89b-12d3-a456-426614174000';
      const req = mockRequest({ blogId });
      const res = mockResponse();

      mockedBlogModel.destroy.mockResolvedValue(0);

      // Act
      await deleteBlogController(req, res as Response);

      // Assert
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        status: 'fail',
        message: 'Blog not found',
      });
    });

    it('debería manejar errores de base de datos', async () => {
      // Arrange
      const blogId = '123e4567-e89b-12d3-a456-426614174000';
      const req = mockRequest({ blogId });
      const res = mockResponse();

      const dbError = new Error('Database error');
      mockedBlogModel.destroy.mockRejectedValue(dbError);

      // Act
      await deleteBlogController(req, res as Response);

      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Database error',
      });
    });
  });
});