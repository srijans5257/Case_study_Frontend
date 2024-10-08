import React, { useState } from 'react';
import { Box, IconButton, VStack, Button, Text } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

function SidebarAdmin({onDashboardClick,onApplicationsClick,onTasksClick,onEmployeesClick,onRegisterClick}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  
  return (
    <Box position="relative">
      <IconButton
        aria-label="Toggle Sidebar"
        icon={<HamburgerIcon />}
        onClick={toggleSidebar}

        position="fixed"
        top="1rem"
        left="1rem"
        zIndex="1000"
      />

      {isSidebarOpen && (
        <Box
          position="fixed"
          top="0"
          left="0"
          height="100vh"
          width="250px"
          bg="gray.800"
          color="white"
          p="4"
          zIndex="999"
          boxShadow="lg"
        >
          <IconButton
            aria-label="Close Sidebar"
            icon={<CloseIcon />}
            onClick={toggleSidebar}
            bg="transparent"
            color="white"
            position="absolute"
            top="1rem"
            right="1rem"
          />

          <VStack spacing="4" mt="8">
            <Button variant="ghost" colorScheme="teal" onClick={onDashboardClick}>
              Dashboard
            </Button>
            <Button variant="ghost" colorScheme="teal" onClick={onApplicationsClick}>
              Applications
            </Button>
            <Button variant="ghost" colorScheme="teal" onClick={onTasksClick}>
              Tasks
            </Button>
            <Button variant="ghost" colorScheme="teal" onClick={onEmployeesClick}>
              Employees
            </Button>
            <Button variant="ghost" colorScheme="teal" onClick={onRegisterClick}>
              Register New Employees
            </Button>
          </VStack>
        </Box>
      )}
    </Box>
  );
}

export default SidebarAdmin;
