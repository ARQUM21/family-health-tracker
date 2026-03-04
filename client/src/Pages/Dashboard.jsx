import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { UsersIcon, FileTextIcon, ActivityIcon } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const colors = [
  "bg-violet-100 text-violet-600",
  "bg-blue-100 text-blue-600",
  "bg-emerald-100 text-emerald-600",
  "bg-amber-100 text-amber-600",
  "bg-rose-100 text-rose-600",
];

function StatCard({ icon: Icon, label, value, color, bg }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-3 hover:shadow-md transition">
      <div
        className={`w-10 h-10 md:w-12 md:h-12 rounded-lg ${bg} flex items-center justify-center shrink-0`}
      >
        <Icon className={`size-4 md:size-5 ${color}`} />
      </div>
      <div>
        <p className="text-xl md:text-2xl font-bold text-gray-800">{value}</p>
        <p className="text-xs text-gray-500 font-medium">{label}</p>
      </div>
    </div>
  );
}

function MemberCard({
  member,
  index,
  reportCount,
  vitalCount,
  onReportsClick,
  onVitalsClick,
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:shadow-md hover:-translate-y-1 transition-all duration-200">
      <div className="flex items-center gap-3 mb-3">
        <div
          className={`w-10 h-10 rounded-lg ${colors[index % colors.length]} flex items-center justify-center font-bold text-sm shrink-0`}
        >
          {member.name.slice(0, 2).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-800 text-sm truncate">
            {member.name}
          </h3>
          <p className="text-xs text-gray-400">
            {member.relation} · {member.age} yrs
          </p>
        </div>
      </div>

      {/* Stats row */}
      <div className="flex items-center justify-between border-t border-gray-50 pt-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onReportsClick(member);
          }}
          className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-indigo-600 transition"
        >
          <FileTextIcon className="size-3.5 text-indigo-400" />
          {reportCount ?? 0} Reports
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onVitalsClick(member);
          }}
          className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-amber-600 transition"
        >
          <ActivityIcon className="size-3.5 text-amber-400" />
          {vitalCount ?? 0} Vitals
        </button>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { user, token, backendUrl } = useContext(AppContext);
  const navigate = useNavigate();

  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalReports, setTotalReports] = useState(0);
  const [totalVitals, setTotalVitals] = useState(0);
  const [reportCounts, setReportCounts] = useState({});
  const [vitalCounts, setVitalCounts] = useState({});

  useEffect(() => {
    if (!token) return;

    const fetchAll = async () => {
      try {
        const { data: mData } = await axios.get(
          backendUrl + "/api/member/list",
          { headers: { token } },
        );
        if (!mData.success) return toast.error(mData.message);
        const membersList = mData.members;
        setMembers(membersList);

        let rTotal = 0;
        let vTotal = 0;
        const rCounts = {};
        const vCounts = {};

        await Promise.all(
          membersList.map(async (m) => {
            const { data: rData } = await axios.post(
              backendUrl + "/api/report/list",
              { memberId: m._id },
              { headers: { token } },
            );
            if (rData.success) {
              rCounts[m._id] = rData.reports.length;
              rTotal += rData.reports.length;
            }

            const { data: vData } = await axios.post(
              backendUrl + "/api/vitals/list",
              { memberId: m._id },
              { headers: { token } },
            );
            if (vData.success) {
              vCounts[m._id] = vData.vitals.length;
              vTotal += vData.vitals.length;
            }
          }),
        );

        setReportCounts(rCounts);
        setVitalCounts(vCounts);
        setTotalReports(rTotal);
        setTotalVitals(vTotal);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [token]);

  const stats = [
    {
      icon: UsersIcon,
      label: "Total Members",
      value: members.length,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
    {
      icon: FileTextIcon,
      label: "Total Reports",
      value: totalReports,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      icon: ActivityIcon,
      label: "Total Vitals",
      value: totalVitals,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
  ];

  const handleReportsClick = (member) => {
    navigate(`/member/${member._id}`);
  };

  const handleVitalsClick = (member) => {
    navigate("/vitals");
  };

  return (
    <div className="px-4 py-4 md:px-8 md:py-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-xl px-5 py-5 md:px-6 md:py-6 mb-4 md:mb-6 relative overflow-hidden">
        <div className="absolute top-[-30px] right-[-30px] w-32 h-32 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute bottom-[-40px] right-[80px] w-24 h-24 rounded-full bg-white/5 pointer-events-none" />
        <p className="text-indigo-200 text-xs md:text-sm mb-1">
          Welcome back 👋
        </p>
        <h2 className="text-white text-lg md:text-xl font-bold">
          Happy Family — {user?.name || "User"}
        </h2>
        <p className="text-indigo-200 text-xs md:text-sm mt-1">
          You have{" "}
          <strong className="text-white">
            {members.length} family members
          </strong>{" "}
          tracked
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Members */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 md:p-5">
        <div className="mb-4 md:mb-5">
          <h3 className="text-sm md:text-base font-bold text-gray-800">
            Family Members
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Click reports or vitals to view details
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12 md:py-14">
            <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <p className="text-gray-400 text-sm">Loading...</p>
          </div>
        ) : members.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
            {members.map((member, i) => (
              <MemberCard
                key={member._id}
                member={member}
                index={i}
                reportCount={reportCounts[member._id]}
                vitalCount={vitalCounts[member._id]}
                onReportsClick={handleReportsClick}
                onVitalsClick={handleVitalsClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 md:py-14">
            <UsersIcon className="size-10 text-gray-200 mx-auto mb-2" />
            <p className="text-gray-400 text-sm">No members added yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
