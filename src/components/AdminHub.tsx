import React, { useState, useEffect } from "react";
import { Users, FileText, BarChart3, Mail, RefreshCw, Layers, CheckCircle2, AlertCircle, TrendingUp, DollarSign } from "lucide-react";

interface Lead {
  id: string;
  name: string;
  businessName: string;
  email: string;
  phone: string;
  serviceNeeded: string;
  budget: string;
  message: string;
  createdAt: string;
  status: "New" | "Contacted" | "In Progress" | "Invoiced" | "Closed";
  source?: string;
}

interface Subscriber {
  email: string;
  subscribedAt: string;
}

export default function AdminHub() {
  const [activeTab, setActiveTab] = useState<"leads" | "subscribers" | "analytics">("analytics");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [metrics, setMetrics] = useState<any>({
    pageViews: { total: 0, leadsConverted: 0, activeCampaigns: 0, roiAverage: "0%" }
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const renderSourceBadge = (source?: string) => {
    switch (source) {
      case "WhatsApp":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold shadow-[0_0_8px_rgba(16,185,129,0.1)]">
            💬 WhatsApp
          </span>
        );
      case "Cal.com":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono bg-[#36ADA3]/10 text-[#36ADA3] border border-[#36ADA3]/20 font-semibold">
            🗓 Cal.com
          </span>
        );
      case "Calendly":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20 font-semibold">
            🔗 Calendly
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-semibold">
            🌐 Web Form
          </span>
        );
    }
  };

  const refreshData = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      // 1. Fetch leads
      const leadsRes = await fetch("/api/leads");
      if (leadsRes.ok) {
        const leadsData = await leadsRes.json();
        setLeads(leadsData);
      }

      // 2. Fetch subscribers
      const subRes = await fetch("/api/newsletter");
      if (subRes.ok) {
        const subData = await subRes.json();
        setSubscribers(subData);
      }

      // 3. Fetch general telemetry metrics
      const metricRes = await fetch("/api/analytics");
      if (metricRes.ok) {
        const metricData = await metricRes.json();
        setMetrics(metricData);
      }
    } catch (e) {
      console.error(e);
      setErrorMsg("Failed to synchronize with local CRM. Admin module running in simulated database state.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) {
        setSuccessMsg("Lead pipeline status updated successfully.");
        setTimeout(() => setSuccessMsg(""), 3000);
        refreshData();
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Error committing pipeline changes.");
    }
  };

  return (
    <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-6 font-sans select-text" id="aim_admin_hub_main">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-white/5" id="aim_admin_header_section">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-[#36ADA3]/20 text-[#36ADA3] text-[10px] font-mono tracking-wider uppercase rounded">Agency Core</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#36ADA3] animate-ping" />
            <h2 className="text-xl font-bold text-white tracking-tight">Nexora CRM & Analytics Hub</h2>
          </div>
          <p className="text-xs text-gray-400">Live campaign tracking, lead pipeline management, and client attribution ledger.</p>
        </div>
        <button
          onClick={refreshData}
          disabled={loading}
          className="bg-zinc-900 border border-white/10 hover:border-white/20 text-gray-300 hover:text-white px-3.5 py-2 rounded-xl text-xs font-medium flex items-center gap-2 transition cursor-pointer"
          id="aim_admin_refresh_btn"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          {loading ? "Syncing..." : "Sync CRM"}
        </button>
      </div>

      {successMsg && (
        <div className="bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 px-4 py-2.5 rounded-xl text-xs flex items-center gap-2" id="aim_admin_success">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          {successMsg}
        </div>
      )}

      {errorMsg && (
        <div className="bg-red-950/40 border border-red-500/20 text-red-400 px-4 py-2.5 rounded-xl text-xs flex items-center gap-2" id="aim_admin_error">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {errorMsg}
        </div>
      )}

      {/* Internal Navigation Tabs */}
      <div className="flex bg-black/60 p-1 rounded-xl border border-white/5" id="aim_admin_tabs">
        <button
          onClick={() => setActiveTab("analytics")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer ${
            activeTab === "analytics" ? "bg-[#121358] text-white shadow-md" : "text-gray-400 hover:text-white"
          }`}
          id="aim_admin_tab_analytics"
        >
          <BarChart3 className="w-3.5 h-3.5" />
          Analytics Dashboard
        </button>
        <button
          onClick={() => setActiveTab("leads")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer ${
            activeTab === "leads" ? "bg-[#121358] text-white shadow-md" : "text-gray-400 hover:text-white"
          }`}
          id="aim_admin_tab_leads"
        >
          <Users className="w-3.5 h-3.5" />
          Leads Pipeline ({leads.length})
        </button>
        <button
          onClick={() => setActiveTab("subscribers")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer ${
            activeTab === "subscribers" ? "bg-[#121358] text-white shadow-md" : "text-gray-400 hover:text-white"
          }`}
          id="aim_admin_tab_subs"
        >
          <Mail className="w-3.5 h-3.5" />
          Newsletter Contacts ({subscribers.length})
        </button>
      </div>

      {/* Analytics Tab Content */}
      {activeTab === "analytics" && (
        <div className="space-y-6" id="aim_admin_analytics_view">
          {/* Bento grid stats cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" id="aim_admin_bento_stats">
            <div className="bg-gradient-to-tr from-[#121358]/20 to-[#101010] border border-white/5 p-4 rounded-xl flex items-center gap-4">
              <div className="p-3 bg-[#36ADA3]/10 text-[#36ADA3] rounded-lg">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-mono">Website Impressions</span>
                <h3 className="text-xl font-bold text-white mt-1">12,489</h3>
              </div>
            </div>

            <div className="bg-gradient-to-tr from-[#121358]/20 to-[#101010] border border-white/5 p-4 rounded-xl flex items-center gap-4">
              <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-lg">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-mono">Total Leads Collected</span>
                <h3 className="text-xl font-bold text-white mt-1">{leads.length}</h3>
              </div>
            </div>

            <div className="bg-gradient-to-tr from-[#121358]/20 to-[#101010] border border-white/5 p-4 rounded-xl flex items-center gap-4">
              <div className="p-3 bg-amber-500/10 text-amber-400 rounded-lg">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-mono">Attributed ROI Indices</span>
                <h3 className="text-xl font-bold text-white mt-1">320%</h3>
              </div>
            </div>

            <div className="bg-gradient-to-tr from-[#121358]/20 to-[#101010] border border-white/5 p-4 rounded-xl flex items-center gap-4">
              <div className="p-3 bg-rose-500/10 text-rose-400 rounded-lg">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-mono">Active Client Budget</span>
                <h3 className="text-xl font-bold text-white mt-1">$120,400</h3>
              </div>
            </div>
          </div>

          {/* Telemetry charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="aim_admin_charts_layout">
            <div className="bg-black/40 border border-white/5 p-5 rounded-xl lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Attribution ROI Chart</h4>
                  <p className="text-[11px] text-gray-400">Quarterly growth velocity compared to targeted client acquisitions.</p>
                </div>
                <span className="text-emerald-400 text-xs px-2 py-0.5 bg-emerald-500/10 rounded-full font-mono">+18% MoM</span>
              </div>

              {/* Custom SVG Line Chart */}
              <div className="h-56 relative w-full pt-4 flex items-end">
                <svg viewBox="0 0 400 150" className="w-full h-full text-[#36ADA3]" fill="none">
                  {/* Grid lines */}
                  <line x1="0" y1="30" x2="400" y2="30" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  <line x1="0" y1="75" x2="400" y2="75" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  <line x1="0" y1="120" x2="400" y2="120" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

                  {/* Area fill */}
                  <path
                    d="M 10 140 L 70 120 L 140 100 L 210 60 L 280 40 L 350 20 L 390 10 L 390 148 L 10 148 Z"
                    fill="url(#chart_grad)"
                    opacity="0.12"
                  />

                  {/* Main Line path */}
                  <path
                    d="M 10 140 Q 70 120 140 100 T 280 40 T 390 10"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />

                  {/* Target reference dashed path */}
                  <path
                    d="M 10 145 Q 70 135 140 120 T 280 90 T 390 60"
                    stroke="#2F578A"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />

                  {/* Dynamic Gradient definition */}
                  <defs>
                    <linearGradient id="chart_grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#36ADA3" />
                      <stop offset="100%" stopColor="#121358" />
                    </linearGradient>
                  </defs>

                  {/* Points */}
                  <circle cx="140" cy="100" r="5" fill="#36ADA3" stroke="black" strokeWidth="2" />
                  <circle cx="280" cy="40" r="5" fill="#36ADA3" stroke="black" strokeWidth="2" />
                  <circle cx="390" cy="10" r="5" fill="#FF5722" stroke="black" strokeWidth="2" />
                </svg>

                <div className="absolute bottom-2 left-0 right-0 flex justify-between px-2 text-[9px] font-mono text-gray-500">
                  <span>JAN (Ad Starts)</span>
                  <span>FEB (Optimized)</span>
                  <span>MAR (Campaign Peak)</span>
                  <span>APR (Target Scale)</span>
                  <span>MAY (Active)</span>
                </div>
              </div>
            </div>

            <div className="bg-black/40 border border-white/5 p-5 rounded-xl space-y-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Platform Budget Split</h4>
              <p className="text-[11px] text-gray-400">Current allocation of client ad budget managed across networks.</p>

              <div className="space-y-3.5 pt-2" id="aim_admin_progress_split">
                <div>
                  <div className="flex justify-between items-center text-xs text-gray-300 mb-1 font-mono">
                    <span>Google Search & Display</span>
                    <span>45% ($54K)</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-[#121358] h-full rounded-full" style={{ width: "45%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs text-gray-300 mb-1 font-mono">
                    <span>Meta Channels (FB/IG)</span>
                    <span>30% ($36K)</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-[#36ADA3] h-full rounded-full" style={{ width: "30%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs text-gray-300 mb-1 font-mono">
                    <span>LinkedIn High-Ticket B2B</span>
                    <span>15% ($18K)</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-[#2F578A] h-full rounded-full" style={{ width: "15%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs text-gray-300 mb-1 font-mono">
                    <span>YouTube & Creators</span>
                    <span>10% ($12K)</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-rose-500 h-full rounded-full" style={{ width: "10%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Leads Tab Content */}
      {activeTab === "leads" && (
        <div className="space-y-4" id="aim_admin_leads_view">
          <div className="overflow-x-auto border border-white/5 rounded-xl">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-[#101010] text-[#36ADA3] font-mono tracking-widest uppercase text-[10px]">
                <tr>
                  <th className="p-4 border-b border-white/5">Prospect Details</th>
                  <th className="p-4 border-b border-white/5">Desired Service</th>
                  <th className="p-4 border-b border-white/5">Budget Allocation</th>
                  <th className="p-4 border-b border-white/5">Submitted At</th>
                  <th className="p-4 border-b border-white/5 text-right">CRM Status Control</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-gray-300 bg-black/20">
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-500">
                      No prospect leads captured via website form yet. Try submitting a query on the Contact page link structure!
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-white/5 transition-all">
                      <td className="p-4 max-w-xs">
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <div className="font-bold text-white text-sm">{lead.name}</div>
                          {renderSourceBadge(lead.source)}
                        </div>
                        <div className="text-gray-400 font-medium text-xs">{lead.businessName}</div>
                        <div className="text-[10px] text-[#36ADA3] mt-1 font-mono">{lead.email} • {lead.phone}</div>
                        <p className="text-gray-400 mt-2 bg-black/40 p-2.5 rounded-lg border border-white/5 text-[11px] leading-relaxed italic">{lead.message}</p>
                      </td>
                      <td className="p-4 align-top">
                        <span className="px-2.5 py-1 bg-[#121358] text-white rounded-md border border-white/10 font-medium">
                          {lead.serviceNeeded}
                        </span>
                      </td>
                      <td className="p-4 align-top font-mono text-white text-sm">{lead.budget}</td>
                      <td className="p-4 align-top font-mono text-gray-400 text-[11px]">
                        {new Date(lead.createdAt).toLocaleString()}
                      </td>
                      <td className="p-4 text-right align-top">
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                          className="bg-black text-[#36ADA3] border border-[#36ADA3]/40 rounded-lg p-2 font-mono text-xs focus:ring-1 focus:ring-[#36ADA3] focus:outline-none cursor-pointer"
                        >
                          <option value="New">🟢 New Lead</option>
                          <option value="Contacted">🟡 Contacted</option>
                          <option value="In Progress">🔵 In Progress</option>
                          <option value="Invoiced">⚡ Invoiced</option>
                          <option value="Closed">❌ Closed/Won</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Subscribers Tab Content */}
      {activeTab === "subscribers" && (
        <div className="space-y-4" id="aim_admin_subs_view">
          <div className="overflow-x-auto border border-white/5 rounded-xl">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-[#101010] text-[#36ADA3] font-mono tracking-widest uppercase text-[10px]">
                <tr>
                  <th className="p-4 border-b border-white/5">Registered Newsletter Email</th>
                  <th className="p-4 border-b border-white/5">Subscription At</th>
                  <th className="p-4 border-b border-white/5 text-right">Integrations Connected</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-gray-300 bg-black/20">
                {subscribers.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="p-8 text-center text-gray-500">
                      No active newsletter requests on file.
                    </td>
                  </tr>
                ) : (
                  subscribers.map((sub, index) => (
                    <tr key={index} className="hover:bg-white/5 transition-all">
                      <td className="p-4 font-medium text-white text-sm">{sub.email}</td>
                      <td className="p-4 font-mono text-gray-400">
                        {new Date(sub.subscribedAt).toLocaleString()}
                      </td>
                      <td className="p-4 text-right">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#36ADA3]/10 text-[#36ADA3] text-[9px] font-mono uppercase tracking-widest">
                          ✓ Sync Active
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
