import React from 'react';
import { Card, CardContent, Typography, Avatar } from '@mui/material';

// Define the shape of the staff member object
interface StaffMember {
  id: number;
  firstName: string;
  lastName: string;
  position: string;
  department: string;
  email: string;
}

// Define the props for the StaffCard component
interface StaffCardProps {
  staff: StaffMember;
}

const StaffCard: React.FC<StaffCardProps> = ({ staff }) => {
  return (
    <Card>
      <CardContent>
        {/* Avatar with initials */}
        <Avatar sx={{ width: 60, height: 60, mb: 2 }}>
          {staff.firstName[0]}{staff.lastName[0]}
        </Avatar>

        {/* Staff name */}
        <Typography variant="h6" component="div">
          {staff.firstName} {staff.lastName}
        </Typography>

        {/* Staff position */}
        <Typography variant="body2" color="text.secondary">
          {staff.position}
        </Typography>

        {/* Staff department */}
        <Typography variant="body2" color="text.secondary">
          {staff.department}
        </Typography>

        {/* Staff email */}
        <Typography variant="body2">
          {staff.email}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StaffCard;