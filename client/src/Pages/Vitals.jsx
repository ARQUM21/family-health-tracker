import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";
import { PlusIcon, XIcon, LoaderIcon, Trash2Icon, ActivityIcon, UserIcon, SearchIcon, EyeIcon} from "lucide-react";

const vitalTypes = [
  "Blood Pressure",
  "Heart Rate",
  "Blood Sugar",
  "Weight",
  "Temperature",
  "Oxygen Level (SpO2)",
];

const typeUnits = {
    "Blood Pressure":      "e.g. 120/80 mmHg",
    "Heart Rate":          "e.g. 72 bpm",
    "Blood Sugar":         "e.g. 95 mg/dL",
    "Weight":              "e.g. 70 kg",
    "Temperature":         "e.g. 98.6 F",
    "Oxygen Level (SpO2)": "e.g. 98 %",
}

const colors = [
  "bg-violet-100 text-violet-600",
  "bg-blue-100 text-blue-600",
  "bg-emerald-100 text-emerald-600",
  "bg-amber-100 text-amber-600",
  "bg-rose-100 text-rose-600",
];

function formatDateTime(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleString("en-PK", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

// Notes Modal
function NotesModal({ vital, onClose }) {
  if (!vital) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-bold text-gray-800">Vital Details</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition"
          >
            <XIcon className="size-4 text-gray-500" />
          </button>
        </div>

        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-9 h-9 rounded-lg ${vital.memberColor} flex items-center justify-center font-bold text-sm shrink-0`}
            >
              {vital.memberName?.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-sm">
                {vital.memberName}
              </p>
              <p className="text-xs text-gray-400">{vital.type}</p>
            </div>
          </div>

          <div className="bg-indigo-50 rounded-lg p-2.5">
            <p className="text-xs text-gray-400 mb-0.5">Value</p>
            <p className="text-base font-bold text-indigo-700">{vital.value}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-2.5">
            <p className="text-xs text-gray-400 mb-0.5">Date & Time</p>
            <p className="text-sm font-medium text-gray-700">
              {formatDateTime(vital.date)}
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-2.5">
            <p className="text-xs text-gray-400 mb-0.5">Notes</p>
            <p className="text-sm text-gray-700">
              {vital.notes || "No notes added"}
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default function Vitals() {
  const { token, backendUrl } = useContext(AppContext);

  const [members, setMembers] = useState([]);
  const [vitals, setVitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedVital, setSelectedVital] = useState(null);

  const [memberId, setMemberId] = useState("");
  const [type, setType] = useState("");
  const [value, setValue] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");

  const fetchMembers = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/member/list", {
        headers: { token },
      });
      if (data.success) setMembers(data.members);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchAllVitals = async (membersList) => {
    try {
      const allVitals = [];
      await Promise.all(
        membersList.map(async (m) => {
          const { data } = await axios.post(
            backendUrl + "/api/vitals/list",
            { memberId: m._id },
            { headers: { token } },
          );
          if (data.success) {
            data.vitals.forEach((v) => {
              allVitals.push({
                ...v,
                memberName: m.name,
                memberColor: colors[membersList.indexOf(m) % colors.length],
              });
            });
          }
        }),
      );
      allVitals.sort((a, b) => new Date(b.date) - new Date(a.date));
      setVitals(allVitals);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchMembers();
  }, [token]);
  useEffect(() => {
    if (members.length > 0) fetchAllVitals(members);
  }, [members]);

  const resetForm = () => {
    setShowForm(false);
    setMemberId("");
    setType("");
    setValue("");
    setDate("");
    setTime("");
    setNotes("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const combinedDate = time ? `${date}T${time}` : date;

      const { data } = await axios.post(
        backendUrl + "/api/vitals/add",
        { memberId, type, value, date: combinedDate, notes },
        { headers: { token } },
      );
      if (data.success) {
        toast.success("Vital added!");
        const member = members.find((m) => m._id === memberId);
        setVitals((prev) => [
          {
            ...data.vitals,
            memberName: member?.name,
            memberColor: colors[members.indexOf(member) % colors.length],
          },
          ...prev,
        ]);
        resetForm();
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this vital?")) return;
    try {
      const { data } = await axios.delete(backendUrl + "/api/vitals/delete", {
        headers: { token },
        data: { id },
      });
      if (data.success) {
        toast.success("Vital deleted!");
        setVitals((prev) => prev.filter((v) => v._id !== id));
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const filtered = vitals.filter(
    (v) =>
      v.memberName?.toLowerCase().includes(search.toLowerCase()) ||
      v.type?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="px-4 py-4 md:px-8 md:py-6">
      <NotesModal
        vital={selectedVital}
        onClose={() => setSelectedVital(null)}
      />

      {/* Header */}
      <div className="mb-4">
        <h1 className="text-lg md:text-xl font-bold text-gray-800">Vitals</h1>
        <p className="text-xs md:text-sm text-gray-400">Track health vitals</p>
      </div>

      {/* Search + Add */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-4">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition bg-white"
          />
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-5 py-2 rounded-lg transition shadow-md shadow-indigo-200 active:scale-95"
        >
          <PlusIcon className="size-4" />
          Add Vital
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white border border-indigo-100 rounded-xl shadow-sm p-4 md:p-5 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-gray-800">Add New Vital</h3>
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
                Member
              </label>
              <div className="relative">
                <UserIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                <select
                  value={memberId}
                  onChange={(e) => setMemberId(e.target.value)}
                  required
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition appearance-none bg-white"
                >
                  <option value="">Select member...</option>
                  {members.map((m) => (
                    <option key={m._id} value={m._id}>
                      {m.name} ({m.relation})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Type
              </label>
              <div className="relative">
                <ActivityIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  required
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition appearance-none bg-white"
                >
                  <option value="">Select...</option>
                  {vitalTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Value
              </label>
              <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={typeUnits[type] || "Value"}
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
                Time
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Notes
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Optional"
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
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
                    Adding...
                  </>
                ) : (
                  "Add Vital"
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table/Cards */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-50">
          <h3 className="text-sm font-bold text-gray-800">All Vitals</h3>
          <p className="text-xs text-gray-400">{filtered.length} records</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <p className="text-gray-400 text-sm">Loading...</p>
          </div>
        ) : filtered.length > 0 ? (
          <>
            {/* Desktop Table with FR Grid */}
            <div className="hidden md:block overflow-x-auto">
              {/* Header */}
              <div className="grid grid-cols-[0.5fr_1.5fr_1.5fr_2fr_2fr_1fr] gap-4 px-4 py-3 bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase">
                <div>#</div>
                <div>Member</div>
                <div>Type</div>
                <div>Value</div>
                <div>Date & Time</div>
                <div className="text-right">Actions</div>
              </div>
              {/* Rows */}
              {filtered.map((vital, i) => (
                <div
                  key={vital._id}
                  className="grid grid-cols-[0.5fr_1.5fr_1.5fr_2fr_2fr_1fr] gap-4 px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition items-center"
                >
                  <div className="text-sm text-gray-400">{i + 1}</div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-7 h-7 rounded-lg ${vital.memberColor} flex items-center justify-center font-bold text-xs shrink-0`}
                    >
                      {vital.memberName?.slice(0, 2).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-gray-800 truncate">
                      {vital.memberName}
                    </span>
                  </div>
                  <div>
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-600">
                      {vital.type}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-gray-800">
                    {vital.value}
                  </div>
                  <div className="text-xs text-gray-600">
                    {formatDateTime(vital.date)}
                  </div>
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => setSelectedVital(vital)}
                      className="p-1.5 rounded-lg text-indigo-500 hover:bg-indigo-50 transition"
                    >
                      <EyeIcon className="size-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(vital._id)}
                      className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition"
                    >
                      <Trash2Icon className="size-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden">
              {filtered.map((vital, i) => (
                <div key={vital._id} className="p-4 border-b border-gray-50">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-8 h-8 rounded-lg ${vital.memberColor} flex items-center justify-center font-bold text-xs`}
                      >
                        {vital.memberName?.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 text-sm">
                          {vital.memberName}
                        </p>
                        <p className="text-xs text-gray-500">{vital.type}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => setSelectedVital(vital)}
                        className="p-1.5 rounded-lg text-indigo-500 hover:bg-indigo-50"
                      >
                        <EyeIcon className="size-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(vital._id)}
                        className="p-1.5 rounded-lg text-red-500 hover:bg-red-50"
                      >
                        <Trash2Icon className="size-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-bold text-indigo-600">
                      {vital.value}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatDateTime(vital.date)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <ActivityIcon className="size-10 text-gray-200 mx-auto mb-2" />
            <p className="text-gray-400 text-sm">
              {search ? "No vitals found" : "No vitals yet"}
            </p>
            {!search && (
              <button
                onClick={() => setShowForm(true)}
                className="mt-2 text-sm text-indigo-600 hover:underline"
              >
                Add first vital
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
