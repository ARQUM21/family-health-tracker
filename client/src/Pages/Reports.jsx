import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, PlusIcon, XIcon, LoaderIcon, FileTextIcon, Trash2Icon, EyeIcon, CheckCircleIcon, AlertTriangleIcon, XCircleIcon} from "lucide-react";

const colors = [
  "bg-violet-100 text-violet-600",
  "bg-blue-100 text-blue-600",
  "bg-emerald-100 text-emerald-600",
  "bg-amber-100 text-amber-600",
];

function StatusBadge({ status }) {
  if (!status) return <span className="text-xs text-gray-300">—</span>;
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
  const s = map[status];
  if (!s) return null;
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${s.cls}`}
    >
      <s.Icon className="size-3" />
      {s.label}
    </span>
  );
}

export default function Reports() {
  const { id: memberId } = useParams();
  const { token, backendUrl } = useContext(AppContext);
  const navigate = useNavigate();

  const [member, setMember] = useState(null);
  const [reports, setReports] = useState([]);
  const [insights, setInsights] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState("");
  const [labName, setLabName] = useState("");
  const [hospital, setHospital] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const fetchMember = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/member/list", {
        headers: { token },
      });
      if (data.success) {
        const found = data.members.find((m) => m._id === memberId);
        setMember(found);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchReports = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/report/list",
        { memberId },
        { headers: { token } },
      );
      if (data.success) {
        setReports(data.reports);
        fetchInsights(data.reports);
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchInsights = async (reportsList) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/ai/list",
        { reportIds: reportsList.map((r) => r._id) },
        { headers: { token } },
      );
      if (data.success) {
        const map = {};
        data.insights.forEach((ins) => {
          map[ins.reportId] = ins;
        });
        setInsights(map);
      }
    } catch (error) {
      // Silent
      console.log('Insights fetch failed:', error.message)
    }
  };

  useEffect(() => {
    if (token && memberId) {
      fetchMember();
      fetchReports();
    }
  }, [token, memberId]);

  const resetForm = () => {
    setShowForm(false);
    setTitle("");
    setLabName("");
    setHospital("");
    setDoctor("");
    setDate("");
    setPrice("");
    setImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      toast.error("Please select a file");
      return;
    }
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("labName", labName);
      formData.append("hospital", hospital);
      formData.append("doctor", doctor);
      formData.append("date", date);
      formData.append("price", price);
      formData.append("memberId", memberId);
      formData.append("image", image);

      const { data } = await axios.post(
        backendUrl + "/api/report/upload",
        formData,
        {
          headers: { token, "Content-Type": "multipart/form-data" },
        },
      );
      if (data.success) {
        toast.success("Report uploaded!");
        setReports((prev) => [...prev, data.report]);
        resetForm();
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this report?")) return;
    try {
      const { data } = await axios.delete(backendUrl + "/api/report/delete", {
        headers: { token },
        data: { id },
      });
      if (data.success) {
        toast.success("Report deleted!");
        setReports((prev) => prev.filter((r) => r._id !== id));
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="px-4 py-4 md:px-8 md:py-6">
      <button
        onClick={() => navigate("/members")}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition mb-4"
      >
        <ArrowLeftIcon className="size-4" />
        Back
      </button>

      {/* Member Info */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 md:p-5 mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-12 h-12 md:w-14 md:h-14 rounded-xl ${colors[0]} flex items-center justify-center font-bold text-base md:text-lg shrink-0`}
          >
            {member?.name?.slice(0, 2).toUpperCase() || "??"}
          </div>
          <div>
            <h2 className="text-base md:text-lg font-bold text-gray-800">
              {member?.name || "Loading..."}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-gray-400">Age {member?.age}</span>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-600">
                {member?.relation}
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-5 py-2 rounded-lg transition shadow-md shadow-indigo-200 active:scale-95"
        >
          <PlusIcon className="size-4" />
          Add Report
        </button>
      </div>

      {/* Upload Form */}
      {showForm && (
        <div className="bg-white border border-indigo-100 rounded-xl shadow-sm p-4 md:p-5 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-gray-800">
              Upload New Report
            </h3>
            <button
              onClick={resetForm}
              className="p-1 hover:bg-gray-100 rounded-lg transition"
            >
              <XIcon className="size-4 text-gray-500" />
            </button>
          </div>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
          >
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Blood Test"
                required
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Lab
              </label>
              <input
                type="text"
                value={labName}
                onChange={(e) => setLabName(e.target.value)}
                placeholder="e.g. Chughtai"
                required
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Hospital
              </label>
              <input
                type="text"
                value={hospital}
                onChange={(e) => setHospital(e.target.value)}
                placeholder="e.g. Shaukat Khanum"
                required
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Doctor
              </label>
              <input
                type="text"
                value={doctor}
                onChange={(e) => setDoctor(e.target.value)}
                placeholder="e.g. Dr. Ali"
                required
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Price (Rs.)
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="1500"
                min={0}
                required
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
              />
            </div>
            <div className="sm:col-span-2 lg:col-span-3">
              <label className="block text-xs font-medium text-gray-600 mb-1">
                File (PDF/Image)
              </label>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => setImage(e.target.files[0])}
                required
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 focus:outline-none focus:border-indigo-400 transition file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
              />
            </div>
            <div className="sm:col-span-2 lg:col-span-3 flex flex-col sm:flex-row justify-end gap-2">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex items-center justify-center gap-2 px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition disabled:opacity-60 active:scale-95"
              >
                {submitting ? (
                  <>
                    <LoaderIcon className="size-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  "Upload"
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Reports Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-50">
          <h3 className="text-sm font-bold text-gray-800">Reports</h3>
          <p className="text-xs text-gray-400">{reports.length} reports</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <p className="text-gray-400 text-sm">Loading...</p>
          </div>
        ) : reports.length > 0 ? (
          <>
            {/* Desktop Table with FR Grid */}
            <div className="hidden lg:block overflow-x-auto">
              {/* Header */}
              <div className="grid grid-cols-[0.5fr_2fr_1.5fr_1.5fr_1.5fr_1fr_1fr_1fr_0.8fr_1fr] gap-4 px-4 py-3 bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase">
                <div>#</div>
                <div>Title</div>
                <div>Lab</div>
                <div>Hospital</div>
                <div>Doctor</div>
                <div>Date</div>
                <div>Price</div>
                <div>Status</div>
                <div>Image</div>
                <div className="text-right">Actions</div>
              </div>
              {/* Rows */}
              {reports.map((report, i) => (
                <div
                  key={report._id}
                  className="grid grid-cols-[0.5fr_2fr_1.5fr_1.5fr_1.5fr_1fr_1fr_1fr_0.8fr_1fr] gap-4 px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition items-center"
                >
                  <div className="text-sm text-gray-400">{i + 1}</div>
                  <div className="flex items-center gap-2 truncate">
                    <FileTextIcon className="size-4 text-indigo-400 shrink-0" />
                    <span className="text-sm font-medium text-gray-800 truncate">
                      {report.title}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 truncate">
                    {report.labName}
                  </div>
                  <div className="text-sm text-gray-600 truncate">
                    {report.hospital}
                  </div>
                  <div className="text-sm text-gray-600 truncate">
                    {report.doctor}
                  </div>
                  <div className="text-xs text-gray-600">
                    {new Date(report.date).toLocaleDateString("en-PK")}
                  </div>
                  <div className="text-sm text-gray-600">
                    Rs. {report.price}
                  </div>
                  <div>
                    <StatusBadge status={insights[report._id]?.reportStatus} />
                  </div>
                  <div>
                    <img
                      src={report.image}
                      alt="report"
                      className="w-10 h-10 rounded-lg object-cover border border-gray-100"
                    />
                  </div>
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => navigate(`/report/${report._id}`)}
                      className="p-1.5 rounded-lg text-indigo-500 hover:bg-indigo-50 transition"
                    >
                      <EyeIcon className="size-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(report._id)}
                      className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition"
                    >
                      <Trash2Icon className="size-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden">
              {reports.map((report, i) => (
                <div key={report._id} className="p-4 border-b border-gray-50">
                  <div className="flex items-start gap-3 mb-2">
                    <img
                      src={report.image}
                      alt="report"
                      className="w-12 h-12 rounded-lg object-cover border border-gray-100 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-800 text-sm truncate">
                            {report.title}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {report.labName} • {report.doctor}
                          </p>
                        </div>
                        <StatusBadge
                          status={insights[report._id]?.reportStatus}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                    <span>
                      {new Date(report.date).toLocaleDateString("en-PK")}
                    </span>
                    <span className="font-semibold">Rs. {report.price}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/report/${report._id}`)}
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 text-xs font-semibold"
                    >
                      <EyeIcon className="size-3.5" />
                      View
                    </button>
                    <button
                      onClick={() => handleDelete(report._id)}
                      className="px-3 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                    >
                      <Trash2Icon className="size-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <FileTextIcon className="size-10 text-gray-200 mx-auto mb-2" />
            <p className="text-gray-400 text-sm">No reports yet</p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-2 text-sm text-indigo-600 hover:underline"
            >
              Upload first report
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
