"use client";
import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import ConfirmationModal from "@/components/ui/ConfirmationModal";
import {
  MessageSquare,
  Users,
  LogOut,
  Calendar,
  Search,
  Filter,
  Edit,
  Trash2,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import GoldenButton from "@/components/ui/golden_button";
import EditRsvpModal from "./EditRsvpModal";
import { Toast, useToast } from "@/components/Toast";

interface Message {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

interface RSVP {
  id: string;
  attendance: string;
  guests: string | string[];
  created_at: string;
}

export default function AdminDashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [rsvps, setRSVPs] = useState<RSVP[]>([]);
  const [activeTab, setActiveTab] = useState<"messages" | "rsvps">("messages");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [attendanceFilter, setAttendanceFilter] = useState<
    "all" | "yes" | "no"
  >("all");
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editingRsvp, setEditingRsvp] = useState<RSVP | null>(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingRsvpId, setDeletingRsvpId] = useState<string | null>(null);
  const router = useRouter();
  const { toast, showToast, hideToast } = useToast();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      router.push("/admin/login");
      return;
    }

    fetchData();
  };

  const fetchData = async () => {
    try {
      const [messagesRes, rsvpsRes] = await Promise.all([
        fetch("/api/admin/messages"),
        fetch("/api/admin/rsvp"),
      ]);

      if (!messagesRes.ok || !rsvpsRes.ok) {
        router.push("/admin/login");
        return;
      }

      const messagesData = await messagesRes.json();
      const rsvpsData = await rsvpsRes.json();

      setMessages(messagesData.data || []);
      setRSVPs(rsvpsData.data || []);
    } catch (error) {
      router.push("/admin/login");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    document.cookie = "sb-access-token=; path=/; max-age=0";
    document.cookie = "sb-refresh-token=; path=/; max-age=0";
    router.push("/admin/login");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const parseGuests = (guests: string | string[]) => {
    if (Array.isArray(guests)) return guests;
    try {
      return JSON.parse(guests);
    } catch {
      return [guests];
    }
  };

  const handleDeleteClick = (id: string) => {
    setDeletingRsvpId(id);
    setDeleteModalOpen(true);
  };

  const confirmDeleteRSVP = async () => {
    if (!deletingRsvpId) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/admin/rsvp", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: deletingRsvpId }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete RSVP");
      }

      setRSVPs((prevRsvps) =>
        prevRsvps.filter((rsvp) => rsvp.id !== deletingRsvpId)
      );
      showToast("RSVP deleted successfully!", "success");
    } catch (error) {
      console.error("Error deleting RSVP:", error);
      showToast("Failed to delete RSVP.", "error");
    } finally {
      setIsSubmitting(false);
      setDeleteModalOpen(false);
      setDeletingRsvpId(null);
    }
  };

  const handleEditClick = (rsvp: RSVP) => {
    setEditingRsvp(rsvp);
    setEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingRsvp(null);
    setEditModalOpen(false);
  };

  const handleSaveRsvp = async (updatedRsvp: RSVP) => {
    if (!updatedRsvp) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/admin/rsvp", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedRsvp),
      });

      if (!response.ok) {
        throw new Error("Failed to update RSVP");
      }

      setRSVPs((prevRsvps) =>
        prevRsvps.map((rsvp) =>
          rsvp.id === updatedRsvp.id ? updatedRsvp : rsvp
        )
      );
      showToast("RSVP updated successfully!", "success");
      handleCloseModal();
    } catch (error) {
      console.error("Error updating RSVP:", error);
      showToast("Failed to update RSVP.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate guest counts
  const { attendingGuestsCount, notAttendingGuestsCount } = useMemo(() => {
    let attending = 0;
    let notAttending = 0;

    rsvps.forEach((rsvp) => {
      const guestList = parseGuests(rsvp.guests);
      if (rsvp.attendance === "yes") {
        attending += guestList.length;
      } else {
        notAttending += guestList.length;
      }
    });

    return {
      attendingGuestsCount: attending,
      notAttendingGuestsCount: notAttending,
    };
  }, [rsvps]);

  // Filter and search messages
  const filteredMessages = useMemo(() => {
    return messages.filter((msg) => {
      const query = searchQuery.toLowerCase();
      return (
        msg.name.toLowerCase().includes(query) ||
        msg.message.toLowerCase().includes(query)
      );
    });
  }, [messages, searchQuery]);

  // Filter and search RSVPs
  const filteredRSVPs = useMemo(() => {
    return rsvps.filter((rsvp) => {
      // Filter by attendance
      if (attendanceFilter !== "all" && rsvp.attendance !== attendanceFilter) {
        return false;
      }

      // Search in guest names
      if (searchQuery) {
        const guestList = parseGuests(rsvp.guests);
        const query = searchQuery.toLowerCase();
        return guestList.some((guest: string) =>
          guest.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [rsvps, searchQuery, attendanceFilter]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a0f2e] flex items-center justify-center">
        <p className="text-amber-300 text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a0f2e] py-8 px-4 md:px-6">
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl  md:text-5xl font-script leading-[1.3] bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-amber-100/70 mt-2">
              Tracey&apos;s Victory Party
            </p>
          </div>
          <GoldenButton onClick={handleLogout}>
            <LogOut className="w-5 h-5 text-primary" />
            Logout
          </GoldenButton>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-amber-500/30">
            <div className="flex items-center gap-3 mb-2">
              <MessageSquare className="w-6 h-6 text-amber-400" />
              <h3 className="text-lg font-semibold text-amber-200">Messages</h3>
            </div>
            <p className="text-3xl font-bold text-amber-300">
              {messages.length}
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-amber-500/30">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-6 h-6 text-amber-400" />
              <h3 className="text-lg font-semibold text-amber-200">
                Attending Guests
              </h3>
            </div>
            <p className="text-3xl font-bold text-amber-300">
              {attendingGuestsCount}
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-amber-500/30">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-6 h-6 text-red-400" />
              <h3 className="text-lg font-semibold text-amber-200">
                Not Attending
              </h3>
            </div>
            <p className="text-3xl font-bold text-red-300">
              {notAttendingGuestsCount}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => {
              setActiveTab("messages");
              setSearchQuery("");
            }}
            className={`px-6 py-3 rounded-xl font-semibold transition-all cursor-pointer ${
              activeTab === "messages"
                ? "bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 text-primary"
                : "bg-white/5 text-amber-100 hover:bg-white/10"
            }`}
          >
            Messages ({messages.length})
          </button>
          <button
            onClick={() => {
              setActiveTab("rsvps");
              setSearchQuery("");
              setAttendanceFilter("all");
            }}
            className={`px-6 py-3 rounded-xl cursor-pointer font-semibold transition-all ${
              activeTab === "rsvps"
                ? "bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 text-primary"
                : "bg-white/5 text-amber-100 hover:bg-white/10"
            }`}
          >
            RSVPs ({rsvps.length})
          </button>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                activeTab === "messages"
                  ? "Search messages by name or content..."
                  : "Search RSVPs by guest name..."
              }
              className="w-full pl-12 pr-4 py-3 bg-white/10 border-2 border-amber-500/30 rounded-xl text-amber-100 placeholder-amber-100/40 focus:outline-none focus:border-amber-500/60 transition-all"
            />
          </div>

          {/* Attendance Filter (only for RSVPs) */}
          {activeTab === "rsvps" && (
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400" />
              <select
                value={attendanceFilter}
                onChange={(e) =>
                  setAttendanceFilter(e.target.value as "all" | "yes" | "no")
                }
                className="pl-12 pr-8 py-3 bg-white/10 border-2 border-amber-500/30 rounded-xl text-amber-100 focus:outline-none focus:border-amber-500/60 transition-all cursor-pointer appearance-none"
              >
                <option value="all" className="bg-primary">
                  All
                </option>
                <option value="yes" className="bg-primary">
                  Attending
                </option>
                <option value="no" className="bg-primary">
                  Not Attending
                </option>
              </select>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-amber-500/30">
          {activeTab === "messages" ? (
            <div className="space-y-4">
              {filteredMessages.length === 0 ? (
                <p className="text-amber-100/60 text-center py-8">
                  {searchQuery ? "No messages found" : "No messages yet"}
                </p>
              ) : (
                filteredMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className="bg-white/5 rounded-xl p-4 border border-amber-500/20"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-amber-200">
                        {msg.name}
                      </h4>
                      <span className="text-sm text-amber-100/60 flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(msg.created_at)}
                      </span>
                    </div>
                    <p className="text-amber-100/80">{msg.message}</p>
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredRSVPs.length === 0 ? (
                <p className="text-amber-100/60 text-center py-8">
                  {searchQuery || attendanceFilter !== "all"
                    ? "No RSVPs found"
                    : "No RSVPs yet"}
                </p>
              ) : (
                filteredRSVPs.map((rsvp) => {
                  const guestList = parseGuests(rsvp.guests);
                  return (
                    <div
                      key={rsvp.id}
                      className="bg-white/5 rounded-xl p-4 border border-amber-500/20"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                              rsvp.attendance === "yes"
                                ? "bg-amber-500/20 text-amber-300"
                                : "bg-red-500/20 text-red-300"
                            }`}
                          >
                            {rsvp.attendance === "yes"
                              ? "✓ Attending"
                              : "✗ Not Attending"}
                          </span>
                          <span className="ml-3 text-sm text-amber-100/70">
                            ({guestList.length}{" "}
                            {guestList.length === 1 ? "guest" : "guests"})
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-amber-100/60 flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(rsvp.created_at)}
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleEditClick(rsvp)}
                              disabled={isSubmitting}
                              className="p-1 rounded-full hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                              aria-label="Edit RSVP"
                            >
                              <Edit className="w-4 h-4 text-amber-300" />
                            </button>
                            <button
                              onClick={() => handleDeleteClick(rsvp.id)}
                              disabled={isSubmitting}
                              className="p-1 rounded-full hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                              aria-label="Delete RSVP"
                            >
                              <Trash2 className="w-4 h-4 text-red-400" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="text-amber-100/80">
                        <p className="font-semibold mb-1">Guests:</p>
                        <ul className="list-disc list-inside space-y-1">
                          {guestList.map((guest: string, idx: number) => (
                            <li key={idx}>{guest}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>

        {isEditModalOpen && editingRsvp && (
          <EditRsvpModal
            rsvp={editingRsvp}
            onClose={handleCloseModal}
            onSave={handleSaveRsvp}
            isSubmitting={isSubmitting}
          />
        )}

        <ConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={confirmDeleteRSVP}
          title="Confirm Deletion"
          message="Are you sure you want to delete this RSVP? This action cannot be undone."
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
}
