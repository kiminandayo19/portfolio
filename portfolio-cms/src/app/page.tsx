import React from 'react';
import { Box } from '@mui/material';
import DashboardWidgets from '@/components/dashboard/DashboardWidgets';
import { getExperiences } from '@/actions/experience';
import { getProjects } from '@/actions/project';
import { getSkills } from '@/actions/skill';

export default async function Home() {
  const [experiencesRes, projectsRes, skillsRes] = await Promise.all([
    getExperiences(),
    getProjects(),
    getSkills()
  ]);

  const stats = {
    experiences: experiencesRes.data?.length || 0,
    projects: projectsRes.data?.length || 0,
    skills: skillsRes.data?.length || 0,
  };

  return (
    <Box>
      <DashboardWidgets stats={stats} />
    </Box>
  );
}
