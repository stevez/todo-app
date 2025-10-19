import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddTask from '@/app/components/AddTask';
import { addTodo } from '@/api/api';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

jest.mock('@/api/api', () => ({
  addTodo: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('uuid', () => ({
  v4: jest.fn(),
}));

describe('AddTask', () => {
  const mockRouter = { refresh: jest.fn() };
  const mockUuid = 'test-uuid';

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (uuidv4 as jest.Mock).mockReturnValue(mockUuid);
    jest.clearAllMocks();
  });

  it('should render the add task button and the modal should be closed', () => {
    render(<AddTask />);
    expect(screen.getByRole('button', { name: /add new task/i })).toBeInTheDocument();
    expect(document.querySelector('.modal.modal-open')).not.toBeInTheDocument();
  });

  it('should update the new task value on input change', async () => {
    render(<AddTask />);
    const button = screen.getByRole('button', { name: /add new task/i });
    fireEvent.click(button);
    const input = screen.getByPlaceholderText('Type here');
    fireEvent.change(input, { target: { value: 'New test task' } });
    expect(input).toHaveValue('New test task');
  });

  it('should submit the new task and close the modal', async () => {
    render(<AddTask />);
    const button = screen.getByRole('button', { name: /add new task/i });
    fireEvent.click(button);

    const input = screen.getByPlaceholderText('Type here');
    fireEvent.change(input, { target: { value: 'New test task' } });

    const submitButton = screen.getByRole('button', { name: 'Submit' });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(addTodo).toHaveBeenCalledWith({
        id: mockUuid,
        text: 'New test task',
      });
    });

    await waitFor(() => {
      expect(document.querySelector('.modal.modal-open')).not.toBeInTheDocument();
    });

    expect(mockRouter.refresh).toHaveBeenCalled();
  });
});
