const staffController = require('../../controllers/staffController');
const { models, sequelize } = require('../../database');

jest.mock('../../database', () => {
  const mockTransaction = {
    commit: jest.fn(),
    rollback: jest.fn(),
  };
  return {
    models: {
      Staff: {
        findAll: jest.fn(),
        findByPk: jest.fn(),
        create: jest.fn(),
      },
      ContactInfo: {
        create: jest.fn(),
      },
      Department: {},
    },
    sequelize: {
      transaction: jest.fn(() => mockTransaction),
    },
  };
});

describe('Staff Controller Unit Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ... other tests remain the same ...

  test('should create a new staff member', async () => {
    const mockTransaction = { commit: jest.fn(), rollback: jest.fn() };
    sequelize.transaction.mockResolvedValue(mockTransaction);

    const mockContactInfo = { id: 1, email: 'john@example.com' };
    const mockStaff = { id: 1, firstName: 'John', lastName: 'Doe', ContactInfoId: 1 };
    models.ContactInfo.create.mockResolvedValue(mockContactInfo);
    models.Staff.create.mockResolvedValue(mockStaff);
    models.Staff.findByPk.mockResolvedValue({ ...mockStaff, ContactInfo: mockContactInfo });

    const req = {
      body: {
        contactInfo: { email: 'john@example.com' },
        firstName: 'John',
        lastName: 'Doe'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await staffController.createStaff(req, res);

    expect(sequelize.transaction).toHaveBeenCalled();
    expect(models.ContactInfo.create).toHaveBeenCalledWith(
      { email: 'john@example.com' },
      { transaction: mockTransaction }
    );
    expect(models.Staff.create).toHaveBeenCalledWith(
      {
        firstName: 'John',
        lastName: 'Doe',
        ContactInfoId: 1
      },
      { transaction: mockTransaction }
    );
    expect(models.Staff.findByPk).toHaveBeenCalledWith(
      1,
      {
        include: [models.ContactInfo, models.Department],
        transaction: mockTransaction
      }
    );
    expect(mockTransaction.commit).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      ContactInfo: expect.objectContaining({ id: 1, email: 'john@example.com' })
    }));
  });
});