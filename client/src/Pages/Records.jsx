import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { SearchIcon, EyeIcon, EyeOffIcon, FileTextIcon, ArrowLeftIcon, CheckCircleIcon, AlertTriangleIcon, XCircleIcon, ShieldQuestionIcon, SparklesIcon, UtensilsIcon, HomeIcon, MessageCircleIcon, AlertCircleIcon} from "lucide-react";

const colors = [
  "bg-violet-100 text-violet-600",
  "bg-blue-100 text-blue-600",
  "bg-emerald-100 text-emerald-600",
  "bg-amber-100 text-amber-600",
  "bg-rose-100 text-rose-600",
];

function StatusBadge({ status }) {
  const map = {
    normal: {
      label: "Normal",
      cls: "bg-emerald-100 text-emerald-700",
      Icon: CheckCircleIcon,
    },
    warning: {
      label: "Warning",
      cls: "bg-amber-100 text-amber-700",
      Icon: AlertTriangleIcon,
    },
    critical: {
      label: "Critical",
      cls: "bg-red-100 text-red-700",
      Icon: XCircleIcon,
    },
  };
  const s = status ? map[status] : null;
  if (!s)
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-400">
        <ShieldQuestionIcon className="size-3" />
        Not Analyzed
      </span>
    );
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${s.cls}`}
    >
      <s.Icon className="size-3" />
      {s.label}
    </span>
  );
}

function SummaryCard({ icon: Icon, label, count, bg, color }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
      <div
        className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center shrink-0`}
      >
        <Icon className={`size-4 ${color}`} />
      </div>
      <div>
        <p className="text-xl font-bold text-gray-800">{count}</p>
        <p className="text-xs text-gray-500 font-medium">{label}</p>
      </div>
    </div>
  );
}

// Detail View
function DetailView({ record, insight, onBack }) {
  const isPdf = record?.image?.toLowerCase().includes(".pdf");
  return (
    <div className="px-4 py-4 md:px-8 md:py-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 mb-4 px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition font-medium text-sm"
      >
        <ArrowLeftIcon className="size-4" />
        Back
      </button>

      <div className="mb-4">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">
          {record.title}
        </h1>
        <p className="text-sm text-gray-500">Report Analysis</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* LEFT */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-3">
            {isPdf ? (
              <iframe
                src={record.image}
                className="w-full h-64 md:h-80 rounded-lg border border-gray-100"
                title="Report"
              />
            ) : (
              <img
                src={record.image}
                alt="Report"
                className="w-full rounded-lg border border-gray-100 object-contain h-64 md:h-80"
              />
            )}
          </div>
          <div className="px-3 pb-3 grid grid-cols-2 gap-2">
            {[
              { label: "Doctor", value: record.doctor },
              {
                label: "Date",
                value: new Date(record.date).toLocaleDateString("en-PK"),
              },
              { label: "Lab", value: record.labName },
              { label: "Hospital", value: record.hospital },
              { label: "Price", value: `Rs. ${record.price}` },
              {
                label: "Status",
                value: <StatusBadge status={record.reportStatus} />,
              },
            ].map((item) => (
              <div key={item.label} className="bg-gray-50 rounded-lg p-2">
                <p className="text-xs text-gray-500">{item.label}</p>
                <p className="text-sm font-medium text-gray-800 mt-0.5">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col gap-3 overflow-y-auto max-h-[500px] md:max-h-[600px]">
          <div className="bg-indigo-50 rounded-xl p-3 border border-indigo-100">
            <div className="flex items-center gap-2 mb-2">
              <FileTextIcon className="size-4 text-indigo-600" />
              <h4 className="text-sm font-bold text-indigo-700">
                English Summary
              </h4>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              {insight.englishSummary}
            </p>
          </div>

          <div className="bg-violet-50 rounded-xl p-3 border border-violet-100">
            <div className="flex items-center gap-2 mb-2">
              <FileTextIcon className="size-4 text-violet-600" />
              <h4 className="text-sm font-bold text-violet-700">
                Urdu Summary
              </h4>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              {insight.urduSummary}
            </p>
          </div>

          <div className="bg-blue-50 rounded-xl p-3 border border-blue-100">
            <div className="flex items-center gap-2 mb-2">
              <MessageCircleIcon className="size-4 text-blue-600" />
              <h4 className="text-sm font-bold text-blue-700">
                Doctor Questions
              </h4>
            </div>
            <ul className="flex flex-col gap-1.5">
              {insight.doctorQuestions?.map((q, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-gray-700"
                >
                  <span className="w-5 h-5 rounded-full bg-blue-500 text-white text-xs font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <span>{q}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-100">
            <div className="flex items-center gap-2 mb-2">
              <UtensilsIcon className="size-4 text-emerald-600" />
              <h4 className="text-sm font-bold text-emerald-700">
                Food Advice
              </h4>
            </div>
            <ul className="flex flex-col gap-1.5">
              {insight.foodAdvice?.map((f, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-gray-700"
                >
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-amber-50 rounded-xl p-3 border border-amber-100">
            <div className="flex items-center gap-2 mb-2">
              <HomeIcon className="size-4 text-amber-600" />
              <h4 className="text-sm font-bold text-amber-700">
                Home Remedies
              </h4>
            </div>
            <ul className="flex flex-col gap-1.5">
              {insight.homeRemedies?.map((h, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-gray-700"
                >
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-white text-xs font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-red-50 rounded-xl p-3 border border-red-100 flex items-start gap-2">
            <AlertCircleIcon className="size-4 text-red-500 shrink-0" />
            <p className="text-xs text-red-600 font-medium">
              {insight.disclaimer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Records() {
  const { token, backendUrl } = useContext(AppContext);

  const [records, setRecords] = useState([]);
  const [insights, setInsights] = useState({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    if (!token) return;
    const fetchAll = async () => {
      try {
        const { data: mData } = await axios.get(
          backendUrl + "/api/member/list",
          { headers: { token } },
        );
        if (!mData.success) return;
        const members = mData.members;

        const allRecords = [];
        const allInsights = {};

        await Promise.all(
          members.map(async (m, mi) => {
            const { data: rData } = await axios.post(
              backendUrl + "/api/report/list",
              { memberId: m._id },
              { headers: { token } },
            );
            if (!rData.success) return;

            const { data: iData } = await axios.post(
              backendUrl + "/api/ai/list",
              { reportIds: rData.reports.map((r) => r._id) },
              { headers: { token } },
            );
            if (iData.success)
              iData.insights.forEach((ins) => {
                allInsights[ins.reportId] = ins;
              });

            rData.reports.forEach((r) => {
              allRecords.push({
                ...r,
                memberName: m.name,
                memberColor: colors[mi % colors.length],
                reportStatus: allInsights[r._id]?.reportStatus || null,
                analyzed: !!allInsights[r._id],
              });
            });
          }),
        );

        allRecords.sort((a, b) => new Date(b.date) - new Date(a.date));
        setRecords(allRecords);
        setInsights(allInsights);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [token]);

  const handleViewClick = (r) => {
    if (!r.analyzed) return;
    setSelectedRecord(r);
  };

  const handleBack = () => {
    setSelectedRecord(null);
  };

  const normal = records.filter((r) => r.reportStatus === "normal").length;
  const warning = records.filter((r) => r.reportStatus === "warning").length;
  const critical = records.filter((r) => r.reportStatus === "critical").length;

  const filtered = records.filter((r) => {
    const matchSearch =
      r.memberName?.toLowerCase().includes(search.toLowerCase()) ||
      r.title?.toLowerCase().includes(search.toLowerCase()) ||
      r.labName?.toLowerCase().includes(search.toLowerCase()) ||
      r.hospital?.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      filterStatus === "all" ||
      r.reportStatus === filterStatus ||
      (filterStatus === "unanalyzed" && !r.reportStatus);
    return matchSearch && matchStatus;
  });

  if (selectedRecord && insights[selectedRecord._id]) {
    return (
      <DetailView
        record={selectedRecord}
        insight={insights[selectedRecord._id]}
        onBack={handleBack}
      />
    );
  }

  return (
    <div className="px-4 py-4 md:px-8 md:py-6">
      <div className="mb-4">
        <h1 className="text-lg md:text-xl font-bold text-gray-800">Records</h1>
        <p className="text-xs md:text-sm text-gray-400">
          All family health records
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        <SummaryCard
          icon={FileTextIcon}
          label="Total"
          count={records.length}
          bg="bg-indigo-50"
          color="text-indigo-600"
        />
        <SummaryCard
          icon={CheckCircleIcon}
          label="Normal"
          count={normal}
          bg="bg-emerald-50"
          color="text-emerald-600"
        />
        <SummaryCard
          icon={AlertTriangleIcon}
          label="Warning"
          count={warning}
          bg="bg-amber-50"
          color="text-amber-600"
        />
        <SummaryCard
          icon={XCircleIcon}
          label="Critical"
          count={critical}
          bg="bg-red-50"
          color="text-red-600"
        />
      </div>

      <div className="flex flex-col gap-3 mb-4">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 bg-white"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { key: "all", label: "All" },
            { key: "normal", label: "🟢 Normal" },
            { key: "warning", label: "🟡 Warning" },
            { key: "critical", label: "🔴 Critical" },
            { key: "unanalyzed", label: "⚪ Not" },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilterStatus(f.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${filterStatus === f.key ? "bg-indigo-600 text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-50">
          <p className="text-sm font-semibold text-gray-700">
            {filtered.length} records
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <p className="text-gray-400 text-sm">Loading...</p>
          </div>
        ) : filtered.length > 0 ? (
          <div>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <div className="grid grid-cols-[0.5fr_1.5fr_2fr_1.5fr_1.5fr_1fr_1fr_1fr] gap-4 px-4 py-3 bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase">
                <div>#</div>
                <div>Member</div>
                <div>Title</div>
                <div>Lab</div>
                <div>Hospital</div>
                <div>Date</div>
                <div>Status</div>
                <div className="text-right">View</div>
              </div>
              {filtered.map((r, i) => (
                <div
                  key={r._id}
                  className="grid grid-cols-[0.5fr_1.5fr_2fr_1.5fr_1.5fr_1fr_1fr_1fr] gap-4 px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition items-center text-sm"
                >
                  <div className="text-gray-400">{i + 1}</div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-7 h-7 rounded-lg ${r.memberColor} flex items-center justify-center font-bold text-xs shrink-0`}
                    >
                      {r.memberName?.slice(0, 2).toUpperCase()}
                    </div>
                    <span className="font-medium text-gray-800 truncate">
                      {r.memberName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 truncate">
                    <FileTextIcon className="size-4 text-indigo-400 shrink-0" />
                    <span className="text-gray-700 truncate">{r.title}</span>
                  </div>
                  <div className="text-gray-600 truncate">{r.labName}</div>
                  <div className="text-gray-600 truncate">{r.hospital}</div>
                  <div className="text-gray-600">
                    {new Date(r.date).toLocaleDateString("en-PK")}
                  </div>
                  <div>
                    <StatusBadge status={r.reportStatus} />
                  </div>
                  <div className="flex justify-end">
                    {r.analyzed ? (
                      <button
                        onClick={() => handleViewClick(r)}
                        className="flex items-center gap-1 px-2 py-1 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition text-xs font-semibold"
                      >
                        <SparklesIcon className="size-3" />
                        View
                        <EyeIcon className="size-3" />
                      </button>
                    ) : (
                      <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-100 text-gray-400 text-xs cursor-not-allowed">
                        <EyeOffIcon className="size-3" />
                        N/A
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden">
              {filtered.map((r, i) => (
                <div
                  key={r._id}
                  className="p-4 border-b border-gray-50 hover:bg-gray-50"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-8 h-8 rounded-lg ${r.memberColor} flex items-center justify-center font-bold text-xs`}
                      >
                        {r.memberName?.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 text-sm">
                          {r.memberName}
                        </p>
                        <p className="text-xs text-gray-500">{r.title}</p>
                      </div>
                    </div>
                    <StatusBadge status={r.reportStatus} />
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                    <span>{r.labName}</span>
                    <span>{new Date(r.date).toLocaleDateString("en-PK")}</span>
                  </div>
                  {r.analyzed ? (
                    <button
                      onClick={() => handleViewClick(r)}
                      className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition text-xs font-semibold"
                    >
                      <SparklesIcon className="size-3.5" />
                      View Analysis
                      <EyeIcon className="size-3.5" />
                    </button>
                  ) : (
                    <div className="w-full flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-gray-100 text-gray-400 text-xs">
                      <EyeOffIcon className="size-3.5" />
                      Not Analyzed
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <FileTextIcon className="size-10 text-gray-200 mx-auto mb-2" />
            <p className="text-gray-400 text-sm">
              {search ? "No records found" : "No records yet"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
