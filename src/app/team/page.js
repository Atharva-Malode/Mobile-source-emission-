"use client";
import TeamMemberCard from "@/components/TeamMemberCard";

const TEAM_MEMBERS = [
  {
    name: "K V George",
    designation: "Chief Scientist",
    image: "/team/george_sir.png",
    linkedin: "https://www.neeri.res.in/abouts/staff_detail?staff_code=589#googtrans(en|en)",
  },
  {
    name: "Rahul V. Vyawahare",
    designation: "Senior Scientist",
    image: "/team/rahul_sir.png",
    linkedin: "https://www.neeri.res.in/abouts/staff_detail?staff_code=917#googtrans(en|en)",
  },
  {
    name: "Jay Singh Rajput",
    designation: "Project Scientist II",
    image: "/team/jay.jpg",
    linkedin: "https://www.linkedin.com/in/jayrajputairpollution/",
  },
  {
    name: "Atharva A. Malode",
    designation: "Project Associate I",
    role: "AI Engineer",
    image: "/team/atharva.png",
    linkedin: "https://www.linkedin.com/in/atharva-malode/",
  },
  {
    name: "Raj S. Sonarghare",
    designation: "Project Associate I",
    role: "AI Engineer",
    image: "/team/raj.png",
    linkedin: "https://www.linkedin.com/in/rajsonarghare/",
  },
];

export default function TeamPage() {
  return (
    <section className="w-full px-6 lg:px-12 py-10 space-y-10">

      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900">
          Our Team
        </h1>
        <p className="text-gray-600 mt-3 text-lg">
          Research & Development Team
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {TEAM_MEMBERS.map((member, idx) => (
          <TeamMemberCard key={idx} {...member} />
        ))}
      </div>

    </section>
  );
}
