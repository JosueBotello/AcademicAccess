import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  TextField, 
  Grid, 
  CircularProgress,
  Pagination
} from '@mui/material';
import { getStaffMembers } from '../services/api';
import StaffCard from '../components/StaffCard';
import ErrorBoundary from '../components/ErrorBoundary';

// Define the shape of a staff member object
interface StaffMember {
  id: number;
  firstName: string;
  lastName: string;
  position: string;
  department: string;
  email: string;
}

const StaffDirectory: React.FC = () => {
  // State variables
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const itemsPerPage = 10; // Number of staff members per page

  // Function to fetch staff members from the API
  const fetchStaff = async (page: number) => {
    try {
      setLoading(true);
      const response = await getStaffMembers(page, itemsPerPage);
      setStaff(response.data);
      setTotalPages(Math.ceil(response.total / itemsPerPage));
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch staff members. Please try again later.');
      setLoading(false);
    }
  };

  // Effect hook to fetch staff members when the component mounts or page changes
  useEffect(() => {
    fetchStaff(currentPage);
  }, [currentPage]);

  // Function to handle search input changes
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page when search term changes
  };

  // Function to handle pagination changes
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  // Filter staff members based on search term
  const filteredStaff = staff.filter(member => 
    `${member.firstName} ${member.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Render loading state
  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  // Render error state
  if (error) {
    return (
      <Container>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <ErrorBoundary>
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          Staff Directory
        </Typography>

        {/* Search input */}
        <TextField
          fullWidth
          variant="outlined"
          label="Search staff"
          value={searchTerm}
          onChange={handleSearchChange}
          margin="normal"
        />

        {/* Staff members grid */}
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {filteredStaff.map((member) => (
            <Grid item xs={12} sm={6} md={4} key={member.id}>
              <StaffCard staff={member} />
            </Grid>
          ))}
        </Grid>

        {/* Pagination */}
        <Pagination 
          count={totalPages} 
          page={currentPage} 
          onChange={handlePageChange} 
          sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}
        />
      </Container>
    </ErrorBoundary>
  );
};

export default StaffDirectory;