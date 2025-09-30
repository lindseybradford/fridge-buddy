import React, { useState, useEffect } from "react";
import {
  Calendar,
  MapPin,
  Plus,
  AlertCircle,
  CheckCircle,
  Package,
  Droplets,
  Heart,
  Wrench,
} from "lucide-react";

// Mock data to demonstrate the concept
const mockUpdates = [
  {
    id: 1,
    date: "2025-09-16T10:30:00Z",
    type: "fridge_update",
    subtype: "fixed",
    description: "Fixed door seal and replaced temperature sensor",
    author: "Eleanor M.",
  },
  {
    id: 2,
    date: "2025-09-15T16:20:00Z",
    type: "stock_update",
    subtype: "cold_food",
    description:
      "Added 2 gallons milk, yogurt cups, and leftover lasagna portions",
    author: "Mike R.",
  },
  {
    id: 3,
    date: "2025-09-15T14:15:00Z",
    type: "stock_update",
    subtype: "dry_food",
    description: "Restocked rice, beans, and canned tomatoes",
    author: "Community Gardens Collective",
  },
  {
    id: 4,
    date: "2025-09-13T09:00:00Z",
    type: "stock_update",
    subtype: "general_hygiene",
    description: "Soap, toothbrushes, and shampoo bottles added",
    author: "Sarah K.",
  },
  {
    id: 5,
    date: "2025-09-10T11:45:00Z",
    type: "stock_update",
    subtype: "femme_hygiene",
    description: "Tampons and pads restocked",
    author: "Anonymous",
  },
];

const mockFridge = {
  id: 1,
  name: "Downtown Community Fridge",
  location: "1234 Main St, Denver, CO",
  status: "operational",
};

// AI-powered bulletin generator (mocked for now)
const generateBulletin = (updates) => {
  const lastWeek = updates.filter((update) => {
    const updateDate = new Date(update.date);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return updateDate >= weekAgo;
  });

  const bulletin = [];

  // Check for fridge status
  const fridgeUpdates = lastWeek.filter((u) => u.type === "fridge_update");
  if (fridgeUpdates.length > 0) {
    const latest = fridgeUpdates[0];
    if (latest.subtype === "fixed") {
      bulletin.push({
        type: "status",
        message: `Fridge is fixed!`,
        detail: `${latest.author} reported: "${latest.description}"`,
        icon: CheckCircle,
        color: "text-green-600",
      });
    } else if (latest.subtype === "broken") {
      bulletin.push({
        type: "alert",
        message: "Fridge needs repair",
        detail: latest.description,
        icon: AlertCircle,
        color: "text-red-600",
      });
    }
  }

  // Stock summary
  const stockUpdates = lastWeek.filter((u) => u.type === "stock_update");
  const stockCounts = {
    cold_food: stockUpdates.filter((u) => u.subtype === "cold_food").length,
    dry_food: stockUpdates.filter((u) => u.subtype === "dry_food").length,
    general_hygiene: stockUpdates.filter((u) => u.subtype === "general_hygiene")
      .length,
    femme_hygiene: stockUpdates.filter((u) => u.subtype === "femme_hygiene")
      .length,
  };

  let stockMessage = "This week: ";
  const stockParts = [];
  if (stockCounts.cold_food + stockCounts.dry_food > 0) {
    stockParts.push(
      `${stockCounts.cold_food + stockCounts.dry_food} food drops`,
    );
  }
  if (stockCounts.general_hygiene > 0) {
    stockParts.push(`${stockCounts.general_hygiene} hygiene drops`);
  }
  if (stockCounts.femme_hygiene === 0) {
    stockParts.push("no femme hygiene drops");
    bulletin.push({
      type: "need",
      message: "Need: Feminine hygiene products",
      detail: "No tampons or pads dropped this week",
      icon: Heart,
      color: "text-orange-600",
    });
  } else {
    stockParts.push(`${stockCounts.femme_hygiene} femme hygiene drops`);
  }

  if (stockParts.length > 0) {
    bulletin.push({
      type: "summary",
      message: stockMessage + stockParts.join(", "),
      icon: Package,
      color: "text-blue-600",
    });
  }

  return bulletin;
};

const getUpdateIcon = (type, subtype) => {
  if (type === "fridge_update") {
    return subtype === "fixed" ? CheckCircle : AlertCircle;
  }
  switch (subtype) {
    case "cold_food":
    case "dry_food":
      return Package;
    case "general_hygiene":
      return Droplets;
    case "femme_hygiene":
      return Heart;
    default:
      return Package;
  }
};

const getUpdateColor = (type, subtype) => {
  if (type === "fridge_update") {
    return subtype === "fixed" ? "text-green-600" : "text-red-600";
  }
  switch (subtype) {
    case "cold_food":
    case "dry_food":
      return "text-blue-600";
    case "general_hygiene":
      return "text-purple-600";
    case "femme_hygiene":
      return "text-pink-600";
    default:
      return "text-gray-600";
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString();
};

function AddUpdateForm({ onAdd, onClose }) {
  const [formData, setFormData] = useState({
    type: "stock_update",
    subtype: "cold_food",
    description: "",
  });

  const handleSubmit = () => {
    if (formData.description.trim()) {
      onAdd({
        ...formData,
        date: new Date().toISOString(),
        author: "You",
        id: Date.now(),
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Add Fridge Update</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Update Type
            </label>
            <select
              value={formData.type}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  type: e.target.value,
                  subtype:
                    e.target.value === "stock_update" ? "cold_food" : "fixed",
                })
              }
              className="w-full border rounded-md px-3 py-2"
            >
              <option value="stock_update">Stock Update</option>
              <option value="fridge_update">Fridge Update</option>
            </select>
          </div>

          {formData.type === "stock_update" && (
            <div>
              <label className="block text-sm font-medium mb-1">
                Stock Type
              </label>
              <select
                value={formData.subtype}
                onChange={(e) =>
                  setFormData({ ...formData, subtype: e.target.value })
                }
                className="w-full border rounded-md px-3 py-2"
              >
                <option value="cold_food">Cold Food</option>
                <option value="dry_food">Dry Food</option>
                <option value="general_hygiene">General Hygiene</option>
                <option value="femme_hygiene">Feminine Hygiene</option>
              </select>
            </div>
          )}

          {formData.type === "fridge_update" && (
            <div>
              <label className="block text-sm font-medium mb-1">
                Fridge Status
              </label>
              <select
                value={formData.subtype}
                onChange={(e) =>
                  setFormData({ ...formData, subtype: e.target.value })
                }
                className="w-full border rounded-md px-3 py-2"
              >
                <option value="fixed">Fixed</option>
                <option value="broken">Broken</option>
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="What did you add or fix?"
              className="w-full border rounded-md px-3 py-2 h-20 resize-none"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              Add Update
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CommunityFridgeApp() {
  const [updates, setUpdates] = useState(mockUpdates);
  const [showForm, setShowForm] = useState(false);
  const [bulletin, setBulletin] = useState([]);

  useEffect(() => {
    setBulletin(generateBulletin(updates));
  }, [updates]);

  const addUpdate = (newUpdate) => {
    setUpdates([newUpdate, ...updates]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Community Fridge Network
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Fridge Info */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold">{mockFridge.name}</h2>
              <div className="flex items-center text-gray-600 mt-1">
                <MapPin className="w-4 h-4 mr-1" />
                <span className="text-sm">{mockFridge.location}</span>
              </div>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Update
            </button>
          </div>

          {/* AI-Powered Bulletin */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-blue-900 mb-3">
              📋 Fridge Bulletin
            </h3>
            {bulletin.length > 0 ? (
              <div className="space-y-2">
                {bulletin.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="flex items-start gap-2">
                      <Icon className={`w-4 h-4 mt-0.5 ${item.color}`} />
                      <div>
                        <div className={`font-medium ${item.color}`}>
                          {item.message}
                        </div>
                        {item.detail && (
                          <div className="text-sm text-gray-600">
                            {item.detail}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-blue-700">
                All caught up! Check back later for updates.
              </p>
            )}
          </div>
        </div>

        {/* Updates Table */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold">Recent Updates</h3>
          </div>
          <div className="overflow-hidden">
            {updates.map((update) => {
              const Icon = getUpdateIcon(update.type, update.subtype);
              const color = getUpdateColor(update.type, update.subtype);

              return (
                <div
                  key={update.id}
                  className="border-b last:border-b-0 p-4 hover:bg-gray-50"
                >
                  <div className="flex items-start gap-3">
                    <Icon className={`w-5 h-5 mt-0.5 ${color}`} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium capitalize">
                          {update.subtype.replace("_", " ")}
                        </span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500">
                          {formatDate(update.date)}
                        </span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500">
                          {update.author}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm">
                        {update.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {showForm && (
        <AddUpdateForm onAdd={addUpdate} onClose={() => setShowForm(false)} />
      )}
    </div>
  );
}

export default CommunityFridgeApp;
