import { getAllTodos, addTodo, editTodo, deleteTodo, getHeaders } from '../api';

jest.mock('next/headers');
import { headers } from 'next/headers';

global.fetch = jest.fn();

describe('API functions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('with x-parallel-index header', () => {
    beforeEach(() => {
      (headers as jest.Mock).mockReturnValue({
        get: (key: string) => {
          if (key === 'x-parallel-index') {
            return '1';
          }
          return null;
        },
      });
    });

    describe('getAllTodos', () => {
      it('should return a list of todos', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
          json: () => Promise.resolve([{ id: '1', text: 'Test task' }]),
        } as Response);

        const todos = await getAllTodos();
        expect(todos).toEqual([{ id: '1', text: 'Test task' }]);
        expect(fetch).toHaveBeenCalledWith('http://localhost:3001/tasks', {
          method: 'GET',
          headers: expect.any(Headers),
          cache: 'no-store',
        });
      });
    });

    describe('addTodo', () => {
      it('should add a new todo', async () => {
        const newTodo = { id: '2', text: 'New task' };
        (fetch as jest.Mock).mockResolvedValueOnce({
          json: () => Promise.resolve(newTodo),
        } as Response);

        const result = await addTodo(newTodo);
        expect(result).toEqual(newTodo);
        expect(fetch).toHaveBeenCalledWith('http://localhost:3001/tasks', {
          method: 'POST',
          headers: expect.any(Headers),
          body: JSON.stringify(newTodo),
        });
      });
    });

    describe('editTodo', () => {
      it('should edit an existing todo', async () => {
        const updatedTodo = { id: '1', text: 'Updated task' };
        (fetch as jest.Mock).mockResolvedValueOnce({
          json: () => Promise.resolve(updatedTodo),
        } as Response);

        const result = await editTodo(updatedTodo);
        expect(result).toEqual(updatedTodo);
        expect(fetch).toHaveBeenCalledWith('http://localhost:3001/tasks/1', {
          method: 'PUT',
          headers: expect.any(Headers),
          body: JSON.stringify(updatedTodo),
        });
      });
    });

    describe('deleteTodo', () => {
      it('should delete an existing todo', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({} as Response);

        await deleteTodo('1');
        expect(fetch).toHaveBeenCalledWith('http://localhost:3001/tasks/1', {
          method: 'DELETE',
          headers: expect.any(Headers),
        });
      });
    });

    describe('getHeaders', () => {
      it('should return headers with x-parallel-index', async () => {
        const headers = await getHeaders();
        expect(headers.get('x-parallel-index')).toBe('1');
      });
    });
  });

  describe('without x-parallel-index header', () => {
    beforeEach(() => {
      (headers as jest.Mock).mockReturnValue({
        get: () => {
          return null;
        },
      });
    });

    it('should return headers with x-parallel-index set to 0', async () => {
      const headers = await getHeaders();
      expect(headers.get('x-parallel-index')).toBe('0');
    });
  });

  describe('with empty x-parallel-index header', () => {
    beforeEach(() => {
      (headers as jest.Mock).mockReturnValue({
        get: (key: string) => {
          if (key === 'x-parallel-index') {
            return '';
          }
          return null;
        },
      });
    });

    it('should return headers with x-parallel-index set to empty string', async () => {
      const headers = await getHeaders();
      expect(headers.get('x-parallel-index')).toBe('');
    });
  });
});