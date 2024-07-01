import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  List, 
  ListItem, 
  ListItemText 
} from '@mui/material';

interface StaffMember {
  id: number;
  firstName: string;
  lastName: string;
  position: string;
}

const StaffDirectory: React.FC = () => {
  const [staff, setStaff] = useState<StaffMember[]>([]);

  useEffect(() => {
    // TODO: Replace with actual API call
    const mockStaff: StaffMember[] = [
      { id: 1, firstName: 'John', lastName: 'Doe', position: 'Professor' },
      { id: 2, firstName: 'Jane', lastName: 'Smith', position: 'Assistant Professor' },
    ];
    setStaff(mockStaff);
  }, []);

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Staff Directory
      </Typography>
      <List>
        {staff.map((member) => (
          <ListItem key={member.id}>
            <ListItemText 
              primary={`${member.firstName} ${member.lastName}`}
              secondary={member.position}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default StaffDirectory;