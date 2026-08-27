import Link from "next/link";

const ProjectPage = () => {
  return (
    <div className="flex flex-col">
      <p className="text-2xl font-bold mb-4">Projects</p>

      <section className="flex flex-col w-full bg-white p-4 gap-4">
        <div>
          <Link
            href="/projects/new"
            className="text-sm bg-purple-100 rounded-2xl py-2 px-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl active:translate-y-0 active:shadow-md hover:bg-purple-200"
          >
            Create project
          </Link>
        </div>

        <div></div>
      </section>
    </div>
  );
};

export default ProjectPage;
