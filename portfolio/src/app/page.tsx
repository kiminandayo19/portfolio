import { Navbar } from '@/components/organisms/Navbar';
import { HeroSection } from '@/components/organisms/HeroSection';
import { ExperienceSection } from '@/components/organisms/ExperienceSection';
import { ProjectsSection } from '@/components/organisms/ProjectsSection';
import { SkillsSection } from '@/components/organisms/SkillsSection';
import { ContactSection } from '@/components/organisms/ContactSection';
import { Footer } from '@/components/organisms/Footer';
import * as portfolioService from '@/services/portfolio-service';

export default async function Home() {
  const [profile, experiences, projects, skills] = await Promise.all([
    portfolioService.getProfile(),
    portfolioService.getExperiences(),
    portfolioService.getProjects(),
    portfolioService.getSkills(),
  ]);

  return (
    <>
      <Navbar />
      <main>
        <HeroSection profile={profile} />
        <ExperienceSection experience={experiences} />
        <ProjectsSection projects={projects} />
        <SkillsSection skills={skills} />
        <ContactSection profile={profile} />
      </main>
      <Footer profile={profile} />
    </>
  );
}
