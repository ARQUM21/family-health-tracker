import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";
import { SearchIcon, PlusIcon, PencilIcon, Trash2Icon, XIcon, UserIcon, HashIcon, UsersIcon, LoaderIcon } from "lucide-react";

const relations = [
  "Self",
  "Mother",
  "Father",
  "Sister",
  "Brother",
  "Wife",
  "Husband",
  "Son",
  "Daughter",
  "Grandfather",
  "Grandmother",
  "Other",
];

const colors = [
  "bg-violet-100 text-violet-600",
  "bg-blue-100 text-blue-600",
  "bg-emerald-100 text-emerald-600",
  "bg-amber-100 text-amber-600",
  "bg-rose-100 text-rose-600",
];

export default function Members() {
  const { token, backendUrl } = useContext(AppContext);
  const navigate = useNavigate();

  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [relation, setRelation] = useState("");

  const fetchMembers = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/member/list", {
        headers: { token },
      });
      if (data.success) setMembers(data.members);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchMembers();
  }, [token]);

  const resetForm = () => {
    setShowForm(false);
    setEditId(null);
    setName("");
    setAge("");
    setRelation("");
  };

  const handleEditClick = (e, member) => {
    e.stopPropagation();
    setEditId(member._id);
    setName(member.name);
    setAge(member.age);
    setRelation(member.relation);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editId) {
        const { data } = await axios.put(
          backendUrl + "/api/member/edit",
          { id: editId, name, age: Number(age), relation },
          { headers: { token } },
        );
        if (data.success) {
          toast.success("Member updated!");
          setMembers((prev) =>
            prev.map((m) => (m._id === editId ? data.member : m)),
          );
          resetForm();
        } else toast.error(data.message);
      } else {
        const { data } = await axios.post(
          backendUrl + "/api/member/add",
          { name, age: Number(age), relation },
          { headers: { token } },
        );
        if (data.success) {
          toast.success("Member added!");
          setMembers((prev) => [...prev, data.member]);
          resetForm();
        } else toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (!window.confirm("Delete this member?")) return;
    try {
      const { data } = await axios.delete(backendUrl + "/api/member/delete", {
        headers: { token },
        data: { id },
      });
      if (data.success) {
        toast.success("Member deleted!");
        setMembers((prev) => prev.filter((m) => m._id !== id));
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const filtered = members.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.relation.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="px-4 py-4 md:px-8 md:py-6">
      <div className="mb-4">
        <h1 className="text-lg md:text-xl font-bold text-gray-800">
          Family Members
        </h1>
        <p className="text-xs md:text-sm text-gray-400">
          Manage all your family members
        </p>
      </div>

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
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-5 py-2 rounded-lg transition shadow-md shadow-indigo-200 active:scale-95"
        >
          <PlusIcon className="size-4" />
          Add Member
        </button>
      </div>

      {showForm && (
        <div className="bg-white border border-indigo-100 rounded-xl shadow-sm p-4 md:p-5 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-gray-800">
              {editId ? "Edit Member" : "Add New Member"}
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
            className="grid grid-cols-1 sm:grid-cols-3 gap-3"
          >
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Name
              </label>
              <div className="relative">
                <UserIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ali Hassan"
                  required
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Age
              </label>
              <div className="relative">
                <HashIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="e.g. 45"
                  min={1}
                  max={120}
                  required
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Relation
              </label>
              <div className="relative">
                <UsersIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                <select
                  value={relation}
                  onChange={(e) => setRelation(e.target.value)}
                  required
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition appearance-none bg-white"
                >
                  <option value="">Select...</option>
                  {relations.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="sm:col-span-3 flex flex-col sm:flex-row justify-end gap-2">
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
                    {editId ? "Updating..." : "Adding..."}
                  </>
                ) : editId ? (
                  "Update"
                ) : (
                  "Add Member"
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
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
              <div className="grid grid-cols-[2fr_1.5fr_1fr_1fr] gap-4 px-4 py-3 bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase">
                <div>Member</div>
                <div>Relation</div>
                <div>Age</div>
                <div className="text-right">Actions</div>
              </div>
              {/* Rows */}
              {filtered.map((member, i) => (
                <div
                  key={member._id}
                  onClick={() => navigate(`/member/${member._id}`)}
                  className="grid grid-cols-[2fr_1.5fr_1fr_1fr] gap-4 px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition cursor-pointer items-center"
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-8 h-8 rounded-lg ${colors[i % colors.length]} flex items-center justify-center font-bold text-xs shrink-0`}
                    >
                      {member.name.slice(0, 2).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-gray-800 truncate">
                      {member.name}
                    </span>
                  </div>
                  <div>
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-600">
                      {member.relation}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">{member.age} yrs</div>
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={(e) => handleEditClick(e, member)}
                      className="p-1.5 rounded-lg text-indigo-500 hover:bg-indigo-50 transition"
                    >
                      <PencilIcon className="size-4" />
                    </button>
                    <button
                      onClick={(e) => handleDelete(e, member._id)}
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
              {filtered.map((member, i) => (
                <div
                  key={member._id}
                  onClick={() => navigate(`/member/${member._id}`)}
                  className="p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-9 h-9 rounded-lg ${colors[i % colors.length]} flex items-center justify-center font-bold text-xs shrink-0`}
                      >
                        {member.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 text-sm">
                          {member.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {member.relation} • {member.age} yrs
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={(e) => handleEditClick(e, member)}
                        className="p-1.5 rounded-lg text-indigo-500 hover:bg-indigo-50"
                      >
                        <PencilIcon className="size-4" />
                      </button>
                      <button
                        onClick={(e) => handleDelete(e, member._id)}
                        className="p-1.5 rounded-lg text-red-500 hover:bg-red-50"
                      >
                        <Trash2Icon className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <UsersIcon className="size-10 text-gray-200 mx-auto mb-2" />
            <p className="text-gray-400 text-sm">
              {search ? "No members found" : "No members yet"}
            </p>
            {!search && (
              <button
                onClick={() => setShowForm(true)}
                className="mt-2 text-sm text-indigo-600 hover:underline"
              >
                Add first member
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
