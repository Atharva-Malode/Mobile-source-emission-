"use client";

import TeamMemberCard from "@/components/TeamMemberCard";

const TEAM_MEMBERS = [
  {
    name: "K V George",
    designation: "Chief Scientist",
    image: "/team/george_sir.png",
    linkedin:
      "https://www.neeri.res.in/abouts/staff_detail?staff_code=589#googtrans(en|en)",
  },
  {
    name: "Rahul V. Vyawahare",
    designation: "Senior Scientist",
    image: "/team/rahul_sir.png",
    linkedin:
      "https://www.neeri.res.in/abouts/staff_detail?staff_code=917#googtrans(en|en)",
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
    image: "/team/atharva.png",
    linkedin: "https://www.linkedin.com/in/atharva-malode/",
  },
  {
    name: "Raj S. Sonarghare",
    designation: "Project Associate I",
    image: "/team/raj.png",
    linkedin: "https://www.linkedin.com/in/rajsonarghare/",
  },
];

export default function TeamPage() {
  return (
    <section className="w-full px-6 lg:px-12 py-12 space-y-14">
      {/* ================= HEADING ================= */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900">Our Team</h1>
      </div>

      {/* ================= TEAM GRID ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {TEAM_MEMBERS.map((member, idx) => (
          <div
            key={idx}
            role="button"
            tabIndex={0}
            className="cursor-pointer transition-transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl"
            onClick={() =>
              window.open(member.linkedin, "_blank", "noopener,noreferrer")
            }
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                window.open(member.linkedin, "_blank", "noopener,noreferrer");
              }
            }}
          >
            <TeamMemberCard
              name={member.name}
              designation={member.designation}
              image={member.image}
            />
          </div>
        ))}
      </div>

      {/* ================= ACKNOWLEDGEMENT ================= */}
      <div className="max-w-4xl mx-auto pt-10 border-t text-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          Acknowledgement
        </h2>

        <p className="mt-4 text-gray-600 leading-relaxed">
          We sincerely acknowledge Ms. Bhagyashree Wankar, Mr. Pabitra Mondal,
          Mr. Manjot Singh, Mr. Vaibhav Nandgaye, Ms. Dhanashree Gaidhane,
          Mr. Anurag Tingre, Mr. Abhishek Singh, Ms. Prachi Trivedi,
          Mr. Maneet Singh Khurana, Ms. Sweety Suryawanshi, and Mr. Pranav Nair
          for their valuable contributions to this project.
        </p>
      </div>
    </section>
  );
}
