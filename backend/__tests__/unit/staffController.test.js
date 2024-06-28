const { getAllStaff, getStaffById, createStaff, updateStaff, deleteStaff } = require('../../controllers/staffController');
const Staff = require('../../models/staff');
const ContactInfo = require('../../models/contactInfo');
const Department = require('../../models/department');

jest.mock('../../models/staff');
jest.mock('../../models/contactInfo');
jest.mock('../../models/department');

describe('Staff Controller Unit Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should fetch all staff', async () => {
    const mockStaff = [{ id: 1, firstName: 'John', lastName: 'Doe' }];
    Staff.findAll.mockResolvedValue(mockStaff);

    const req = {};
    const res = {
      json: jest.fn()
    };

    await getAllStaff(req, res);

    expect(Staff.findAll).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(mockStaff);
  });

  // Add more unit tests for other methods...
});