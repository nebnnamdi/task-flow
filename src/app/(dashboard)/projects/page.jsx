import Link from "next/link";

const ProjectPage = () => {
  return (
    <div>
      <p>Projects</p>
      <Link href="/projects/new">New Project</Link>
    </div>
  );
};

export default ProjectPage;
