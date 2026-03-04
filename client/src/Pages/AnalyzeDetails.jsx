import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, SparklesIcon, LoaderIcon, FileTextIcon, UtensilsIcon, HomeIcon, MessageCircleIcon, AlertCircleIcon, CheckCircleIcon, AlertTriangleIcon, XCircleIcon } from "lucide-react";

// Report status badge
function StatusBadge({ status }) {
  if (!status) return null;
  const map = {
    normal: {
      label: "Normal",
      bg: "bg-emerald-100",
      text: "text-emerald-700",
      icon: CheckCircleIcon,
    },
    warning: {
      label: "Warning",
      bg: "bg-amber-100",
      text: "text-amber-700",
      icon: AlertTriangleIcon,
    },
    critical: {
      label: "Critical",
      bg: "bg-red-100",
      text: "text-red-700",
      icon: XCircleIcon,
    },
  };
  const s = map[status];
  if (!s) return null;
  const Icon = s.icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${s.bg} ${s.text}`}
    >
      <Icon className="size-3.5" />
      {s.label}
    </span>
  );
}


// Points list — food advice & home remedies
function PointsList({ items, color }) {
  if (!items || items.length === 0)
    return <p className="text-sm text-gray-400">No data available</p>;
  return (
    <ul className="flex flex-col gap-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
          <span
            className={`w-5 h-5 rounded-full ${color} flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5`}
          >
            {i + 1}
          </span>
          <span className="leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function AnalyzeDetails() {
  const { id: reportId } = useParams();
  const { token, backendUrl } = useContext(AppContext);
  const navigate = useNavigate();

  const [report, setReport] = useState(null);
  const [insight, setInsight] = useState(null);
  const [loadingReport, setLoadingReport] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);

  const fetchReport = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/report/get",
        { reportId },
        { headers: { token } },
      );
      if (data.success) setReport(data.report);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingReport(false);
    }
  };

  useEffect(() => {
    if (token && reportId) fetchReport();
  }, [token, reportId]);

  const handleAnalyze = async () => {
    setAnalyzing(true);
    try {
      const { data } = await axios.post(
        backendUrl + "/api/ai/analyze",
        { reportId },
        { headers: { token } },
      );
      if (data.success) {
        setInsight(data.insight);
        toast.success("Analysis complete!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setAnalyzing(false);
    }
  };

  if (loadingReport)
    return (
      <div className="flex items-center justify-center py-32">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-gray-400 text-sm">Loading report...</p>
        </div>
      </div>
    );

  const isPdf = report?.image?.toLowerCase().includes(".pdf");

  return (
    <div className="px-4 py-4 md:px-8 md:py-6">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition mb-4"
      >
        <ArrowLeftIcon className="size-4" />
        Back
      </button>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
        <div>
          <h1 className="text-lg md:text-xl font-bold text-gray-800">
            {report?.title}
          </h1>
          <p className="text-xs md:text-sm text-gray-400 mt-1">
            {report?.labName} — {report?.hospital}
          </p>
        </div>
        {insight?.reportStatus && <StatusBadge status={insight.reportStatus} />}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* LEFT — Report File */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-50">
            <h3 className="text-sm font-bold text-gray-800">Report File</h3>
          </div>

          <div className="p-3 md:p-4">
            {isPdf ? (
              <iframe
                src={report?.image}
                className="w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-xl border border-gray-100"
                title="Report PDF"
              />
            ) : (
              <img
                src={report?.image}
                alt="Report"
                className="w-full rounded-xl border border-gray-100 object-contain h-[300px] md:h-[400px] lg:h-[500px]"
              />
            )}
          </div>

          {/* Report Meta */}
          <div className="px-3 md:px-4 pb-3 md:pb-4 grid grid-cols-2 gap-2">
            {[
              { label: "Doctor", value: report?.doctor },
              {
                label: "Date",
                value: new Date(report?.date).toLocaleDateString("en-PK"),
              },
              { label: "Lab", value: report?.labName },
              { label: "Price", value: `Rs. ${report?.price}` },
            ].map((item) => (
              <div key={item.label} className="bg-gray-50 rounded-lg p-2">
                <p className="text-xs text-gray-400">{item.label}</p>
                <p className="text-sm font-medium text-gray-700 mt-0.5 truncate">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — AI Analysis */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="px-4 py-3 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-gray-800">AI Analysis</h3>
              <p className="text-xs text-gray-400 mt-0.5">Powered by Gemini</p>
            </div>
            <button
              onClick={handleAnalyze}
              disabled={analyzing}
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition shadow-md shadow-indigo-200 disabled:opacity-60 active:scale-95"
            >
              {analyzing ? (
                <>
                  <LoaderIcon className="size-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <SparklesIcon className="size-4" />
                  {insight ? "Re-analyze" : "Analyze"}
                </>
              )}
            </button>
          </div>

          <div className="p-4 flex flex-col gap-3 overflow-y-auto flex-1 max-h-[500px] lg:max-h-[600px]">
            {/* Not analyzed */}
            {!insight && !analyzing && (
              <div className="text-center py-12">
                <SparklesIcon className="size-10 text-gray-200 mx-auto mb-2" />
                <p className="text-gray-400 text-sm font-medium">
                  Not analyzed yet
                </p>
                <p className="text-gray-300 text-xs mt-1">
                  Click Analyze to get AI insights
                </p>
              </div>
            )}

            {/* Analyzing */}
            {analyzing && (
              <div className="text-center py-12">
                <div className="w-10 h-10 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-gray-600 text-sm font-medium">
                  Analyzing report...
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  This may take a few seconds
                </p>
              </div>
            )}

            {/* Results */}
            {insight && !analyzing && (
              <>
                {/* English Summary */}
                <div className="bg-indigo-50 rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <FileTextIcon className="size-4 text-indigo-600 shrink-0" />
                    <h4 className="text-sm font-bold text-indigo-700">
                      English Summary
                    </h4>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {insight.englishSummary}
                  </p>
                </div>

                {/* Urdu Summary */}
                <div className="bg-violet-50 rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <FileTextIcon className="size-4 text-violet-600 shrink-0" />
                    <h4 className="text-sm font-bold text-violet-700">
                      Urdu Summary
                    </h4>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {insight.urduSummary}
                  </p>
                </div>

                {/* Doctor Questions */}
                <div className="bg-blue-50 rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageCircleIcon className="size-4 text-blue-600 shrink-0" />
                    <h4 className="text-sm font-bold text-blue-700">
                      Questions for Doctor
                    </h4>
                  </div>
                  <ul className="flex flex-col gap-2">
                    {insight.doctorQuestions?.map((q, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-sm text-gray-700"
                      >
                        <span className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span className="leading-relaxed">{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Food Advice */}
                <div className="bg-emerald-50 rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <UtensilsIcon className="size-4 text-emerald-600 shrink-0" />
                    <h4 className="text-sm font-bold text-emerald-700">
                      Food Advice
                    </h4>
                  </div>
                  <PointsList
                    items={insight.foodAdvice}
                    color="bg-emerald-500"
                  />
                </div>

                {/* Home Remedies */}
                <div className="bg-amber-50 rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <HomeIcon className="size-4 text-amber-600 shrink-0" />
                    <h4 className="text-sm font-bold text-amber-700">
                      Home Remedies
                    </h4>
                  </div>
                  <PointsList
                    items={insight.homeRemedies}
                    color="bg-amber-500"
                  />
                </div>

                {/* Disclaimer */}
                <div className="bg-red-50 rounded-xl p-3 flex items-start gap-2">
                  <AlertCircleIcon className="size-4 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-red-600 leading-relaxed">
                    {insight.disclaimer}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
